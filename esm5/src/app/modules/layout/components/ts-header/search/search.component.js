import * as tslib_1 from "tslib";
import { Component, ViewChild, HostListener, Input, ViewChildren } from '@angular/core';
import * as algoliaSearchImported from 'algoliasearch';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TimeService } from '../../../../../shared/services/time.service';
import { config } from '../../../../../core/app-config';
import { PlaceService } from '../place.service';
import { HeaderService } from '../ts-header.service';
import { UtilityService } from '../../../../../shared/services/utilities.service';
import { ListKeyManager } from '@angular/cdk/a11y';
import { SearchSuggestionComponent } from '../search-suggestion/search-suggestion.component';
var algoliasearch = algoliaSearchImported;
var SearchComponent = /** @class */ (function () {
    function SearchComponent(utilityService, headerService, placeService, timeService, datepipe) {
        var _this = this;
        this.utilityService = utilityService;
        this.headerService = headerService;
        this.placeService = placeService;
        this.timeService = timeService;
        this.datepipe = datepipe;
        this.searchText = '';
        this.algoliaIndexName = config.algoliaIndexName;
        this.typedSearchText = "";
        this.searchTextChanged = new Subject();
        this.searchActive = false;
        this.citySearchActive = false;
        this.cityPopupActive = false;
        this.activePlace = 'Pune';
        this.emptyResult = false;
        this.cityQueryChanged = new Subject();
        this.router = config.router;
        this.host = config.baseUrl;
        this.intentSelected = false;
        this.buildUrlArray = function () {
            if (_this.router.url) {
                _this.urlArray = _this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                _this.urlArray = ['in'];
            }
        };
        this.callAlgolia = function (text) {
            _this.index.search({
                query: text,
                hitsPerPage: 6
            }).then(function (data) {
                _this.filterDataForSearchResult(data);
            });
        };
        this.fetchSuggestions = function (text) {
            _this.intentSelected = false;
            _this.headerService.getSuggestions(text).then(function (data) {
                _this.searchResults = data.data;
                _this.keyboardEventsManager = new ListKeyManager(_this.listItems);
                _this.initKeyManagerHandlers();
            });
        };
        this.suggestionSelected = function (event) {
            _this.chooseSuggestion(event.suggestion);
        };
        this.initKeyManagerHandlers = function () {
            _this.keyboardEventsManager
                .change
                .subscribe(function (activeIndex) {
                _this.listItems.map(function (item, index) {
                    item.setActive(activeIndex === index);
                    // if(item.isActive == true && index !== activeIndex) {
                    //     item.setActive(false);
                    // }
                    return item;
                });
            });
        };
        this.hoverOnSuggestion = function (indexOfItemhoveredOn) {
            console.log(indexOfItemhoveredOn);
            _this.searchActive = true;
            var activeItem = _this.keyboardEventsManager.activeItem;
            if (activeItem)
                activeItem.setActive(false);
            _this.keyboardEventsManager.setActiveItem(indexOfItemhoveredOn);
            _this.keyboardEventsManager.activeItem.setActive(true);
        };
        this.chooseSuggestion = function (text) {
            if (!_this.searchText)
                return;
            _this.typedSearchText = _this.searchText;
            _this.searchText = text;
            _this.addOrUpdateTSSuggestions();
            _this.goToSearchResultsPage();
        };
        this.addOrUpdateTSSuggestions = function () {
            _this.headerService.postSuggestions(_this.searchText);
        };
        this.goToSearchResultsPage = function () {
            _this.searchActive = false;
            _this.intentSelected = true;
            var encodedSearchText = _this.searchText.replace(/ +/g, '-');
            var encodedCurrentPlace = _this.activePlace.replace(/ +/g, '-');
            var queryParams = {};
            if (_this.activePlace) {
                queryParams['place'] = encodedCurrentPlace;
            }
            if (encodedSearchText) {
                queryParams['q'] = encodedSearchText;
            }
            var navigationExtras = {
                state: {
                    typedText: _this.typedSearchText,
                    suggestions: _this.searchResults
                },
                queryParams: queryParams
            };
            _this.router.navigate(['/search'], navigationExtras);
        };
        this.filterDataForSearchResult = function (data) {
            var results = data.hits;
            _this.emptyResult = data.hits.length === 0;
            var interests = results.filter(function (ele) {
                return ele.objType === 'keyword' ||
                    ele.objType === 'eventtype' ||
                    ele.objType === 'category';
            });
            var organizers = results.filter(function (ele) { return ele.objType === 'organizer'; });
            var events = results.filter(function (ele) { return ele.objType === 'event'; });
            interests.map(function (interest) {
                interest.name = interest.name + ' Events';
                interest.location = _this.activePlace;
            });
            organizers.map(function (organizer) {
                if (!organizer.imageUrl) {
                    organizer.imageUrl = 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/search-empty-organizer.png';
                }
                if (organizer.secondaryTextProperties && organizer.secondaryTextProperties.country) {
                    organizer.location = organizer.secondaryTextProperties.country;
                }
            });
            events.map(function (event) {
                if (!event.imageUrl) {
                    event.imageUrl = 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/search-empty-event.png';
                }
                if (event.secondaryTextProperties && event.secondaryTextProperties.city) {
                    event.location = event.secondaryTextProperties.city;
                }
                if (event.secondaryTextProperties && event.secondaryTextProperties.startTime) {
                    var startDateTime = event.secondaryTextProperties.startTime;
                    startDateTime = _this.timeService.convertDateToTimezone(startDateTime, event.secondaryTextProperties.eventTimeZone);
                    event.secondaryTextProperties.startTime = _this.datepipe.transform(startDateTime, 'd MMM yyyy, \' \'h:mma');
                }
            });
            _this.searchResults = { 'interests': interests, 'organizers': organizers, 'events': events };
        };
        this.navigateToListing = function (interest) {
            if (interest['secondaryTextProperties'] && interest['secondaryTextProperties']['isOnline']) {
                _this.router.navigate(['/online']);
                return;
            }
            _this.buildUrlArray();
            var stopWords = ['e', 'o'];
            var listingUrl = _this.urlArray[0] + '/' + _this.urlArray[1];
            if (_this.urlArray && _this.urlArray.length > 1 && stopWords.indexOf(_this.urlArray[0]) === -1) {
                _this.router.navigate([listingUrl + '/' + interest['urlCode']]);
            }
            else {
                _this.router.navigate([_this.homeUrl + '/' + interest['urlCode']]);
            }
            _this.searchActive = false;
        };
        this.navigateToEventPage = function (eventCode) {
            _this.router.navigate(['/e/' + eventCode]);
            _this.searchActive = false;
        };
        this.search = function (text) {
            if (text !== undefined && text.length > 0) {
                _this.searchTextChanged.next(text);
            }
        };
        this.getPopularPlaces = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.placeService.place.subscribe(function (res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var country, data;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!res) return [3 /*break*/, 2];
                                if (!this.utilityService.IsJsonString(res)) return [3 /*break*/, 2];
                                country = JSON.parse(res)['country'];
                                return [4 /*yield*/, this.headerService.getPopularCities(country || this.urlArray[0])];
                            case 1:
                                data = _a.sent();
                                this.popularPlaces = data['data'].slice(0, 6).map(function (ele) {
                                    ele.type = 'city';
                                    ele.cityCode = ele.code;
                                    return ele;
                                });
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.searchTextChanged.pipe(debounceTime(300)).subscribe(function (text) { return _this.fetchSuggestions(text); });
        this.client = algoliasearch('AT5UB8FMSR', 'c7e946f5b740ef035bd824f69dcc1612');
        this.index = this.client.initIndex(this.algoliaIndexName);
        this.buildUrlArray();
    }
    SearchComponent.prototype.clickout = function (event) {
        if (!this.citySuggestions.nativeElement.contains(event.target)) {
            this.cityPopupActive = false;
        }
        if (this.searchResultsEle && !this.searchResultsEle.nativeElement.contains(event.target)) {
            this.searchActive = false;
        }
    };
    SearchComponent.prototype.handleKeydown = function (event) {
        this.searchActive = true;
        if (this.keyboardEventsManager) {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                this.keyboardEventsManager.onKeydown(event);
                return false;
            }
            else if (event.key === "Enter") {
                if (this.keyboardEventsManager.activeItem) {
                    this.keyboardEventsManager.activeItem.selectItem();
                }
                else {
                    this.chooseSuggestion(this.searchText);
                }
                return false;
            }
        }
    };
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPopularPlaces();
        this.placeService.place.subscribe(function (res) {
            if (res) {
                if (_this.utilityService.IsJsonString(res)) {
                    var data = JSON.parse(res);
                    if (data['currentPlace'] != undefined) {
                        _this.activePlace = data['currentPlace'];
                    }
                    if (data && data['country'] && data['city']) {
                        _this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
                    }
                }
            }
        });
    };
    SearchComponent.ctorParameters = function () { return [
        { type: UtilityService },
        { type: HeaderService },
        { type: PlaceService },
        { type: TimeService },
        { type: DatePipe }
    ]; };
    tslib_1.__decorate([
        ViewChild('cityInput', { static: false })
    ], SearchComponent.prototype, "cityInput", void 0);
    tslib_1.__decorate([
        ViewChild('citySuggestions', { static: false })
    ], SearchComponent.prototype, "citySuggestions", void 0);
    tslib_1.__decorate([
        ViewChild('searchResultsEle', { static: false })
    ], SearchComponent.prototype, "searchResultsEle", void 0);
    tslib_1.__decorate([
        ViewChild('searchTextInputEle', { static: false })
    ], SearchComponent.prototype, "searchTextInputEle", void 0);
    tslib_1.__decorate([
        ViewChildren(SearchSuggestionComponent)
    ], SearchComponent.prototype, "listItems", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchComponent.prototype, "searchText", void 0);
    tslib_1.__decorate([
        HostListener('document:click', ['$event'])
    ], SearchComponent.prototype, "clickout", null);
    SearchComponent = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            template: "<div class=\"w-full lg:flex search-container relative\" [class.active]=\"searchActive\">\n    <div #searchResultsEle class=\"w-2/3 lg:w-full px-2 flex items-center relative left-section\">\n        <i class=\"mdi mdi-magnify text-2xl md:text-xl color-blue p-2 cursor-pointer\" (click)=\"chooseSuggestion(this.searchText)\"></i>\n        <input appDataAnalytics eventLabel=\"search\" clickLocation=\"\" (keyup)=\"handleKeydown($event)\" [(ngModel)]=\"searchText\" (ngModelChange)=\"search($event)\" (focus)=\"searchActive = true;\" class=\"font-normal text-gray-800 w-full h-full bg-transparent  p-2\" type=\"text\" placeholder=\"Search for events, interests or activities\"\n            aria-label=\"Search for events, interests or activities\" />\n        <i *ngIf=\"searchText && searchText.length > 0\" class=\"mdi cursor-pointer mdi-close text-2xl md:text-xl color-blue p-2\" (click)=\"this.searchText = '';\"></i>\n        <div class=\"suggestions enter-slide-bottom w-full absolute\" [ngClass]=\"intentSelected?'visibility: hidden':''\" *ngIf=\"searchResults && searchActive && searchText !== ''\">\n            <app-search-suggestion class=\"cursor-pointer\" *ngFor=\"let searchedItem of searchResults; let i = index\" [item]=\"searchedItem\" [searchText]=\"searchText\"\n            (itemSelected)=\"suggestionSelected(searchedItem)\" (mouseenter)=\"hoverOnSuggestion(i)\" (click)=\"suggestionSelected(searchedItem)\"></app-search-suggestion>\n            <!-- <div class=\"no-result flex flex-col text-center p-4 fadeIn\"\n                *ngIf=\"searchResults == undefined || searchResults.length == 0\">\n                <img alt=\"No Results Found\" class=\"m-auto w-40 pt-4 mb-2\"\n                [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ListingsStatic/calendar-min.png'\" />\n                <div class=\"flex flex-col\">\n                    <label class=\"text-gray-600 font-bold\">No results found</label>\n                    <span class=\"text-gray-600 text-sm pb-10\">We couldn\u2019t find what you\u2019re looking for</span>\n                </div>\n            </div> -->\n        </div>\n    </div>\n    <div appDataAnalytics eventLabel=\"location\" clickLocation=\"\" #citySuggestions class=\"w-auto flex items-center py-2  px-4 cursor-pointer relative city-search-container\" [class.active]=\"cityPopupActive\" (click)=\"cityPopupActive = true\">\n        <div class=\"flex items-center w-10/12 mr-2 \" [title]=\" activePlace\">\n            <i class=\"mdi mdi-map-marker text-lg md:text-xl color-blue\"></i>\n            <span class=\"truncate capitalize text-gray-800\">{{activePlace}}</span>\n        </div>\n        <i class=\"mdi mdi-chevron-down text-lg md:text-xl\"></i>\n        <app-city-search-popup [popularPlaces]=\"popularPlaces\" class=\"popup\" [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" *ngIf=\"cityPopupActive\">\n        </app-city-search-popup>\n    </div>\n</div>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}@media (min-width:991px){.search-container{height:42px;border-radius:2px;-webkit-transition:.3s;transition:.3s}.search-container .left-section{background-color:#ededed;border-radius:4px}.search-container .left-section:focus{background:#fff}.search-container .left-section input{-webkit-transition:.3s;transition:.3s}.search-container .left-section .suggestions{top:100%;left:0;background:#fff;border-top:1px solid rgba(151,151,151,.4)}.search-container .left-section .suggestions ul li{-webkit-transition:.15s;transition:.15s}.search-container .left-section .suggestions ul li:hover{background:#ededed;cursor:pointer}.search-container .city-search-container{-webkit-transition:.3s;transition:.3s;max-width:33.33%}.search-container .city-search-container.active{background:#fff;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .city-search-container .popup{position:absolute;top:135%;width:135%;left:-34%}.search-container.active .left-section{background:#fff;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container.active .suggestions{box-shadow:0 11px 15px 0 rgba(0,0,0,.15)}}::-webkit-input-placeholder{font-size:small}::-moz-placeholder{font-size:small}::-ms-input-placeholder{font-size:small}::placeholder{font-size:small}"]
        })
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxLQUFLLHFCQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDbEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBRzdGLElBQU0sYUFBYSxHQUFHLHFCQUFxQixDQUFDO0FBTzVDO0lBZ0NJLHlCQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQVUsWUFBMEIsRUFBVSxXQUF3QixFQUFTLFFBQWtCO1FBQXpMLGlCQU1DO1FBTm1CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdB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QU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQzdFO2lCQUVKO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQS9ObUMsY0FBYztnQkFBeUIsYUFBYTtnQkFBd0IsWUFBWTtnQkFBdUIsV0FBVztnQkFBbUIsUUFBUTs7SUE5QjlJO1FBQTFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7c0RBQXVCO0lBQ2hCO1FBQWhELFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzs0REFBNkI7SUFDM0I7UUFBakQsU0FBUyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzZEQUE4QjtJQUMxQjtRQUFwRCxTQUFTLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUcsS0FBSyxFQUFFLENBQUM7K0RBQWdDO0lBQzNDO1FBQXhDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQztzREFBa0Q7SUFDbEY7UUFBUCxLQUFLLEVBQUU7dURBQXdCO0lBb0toQztRQURDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO21EQVExQztJQWxMUSxlQUFlO1FBTDNCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLDI2RkFBc0M7O1NBRXpDLENBQUM7T0FDVyxlQUFlLENBaVEzQjtJQUFELHNCQUFDO0NBQUEsQUFqUUQsSUFpUUM7U0FqUVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGFsZ29saWFTZWFyY2hJbXBvcnRlZCBmcm9tICdhbGdvbGlhc2VhcmNoJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgVGltZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdGltZS5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi90cy1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBMaXN0S2V5TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFNlYXJjaFN1Z2dlc3Rpb25Db21wb25lbnQgfSBmcm9tICcuLi9zZWFyY2gtc3VnZ2VzdGlvbi9zZWFyY2gtc3VnZ2VzdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAncHJvdHJhY3Rvcic7XG5cbmNvbnN0IGFsZ29saWFzZWFyY2ggPSBhbGdvbGlhU2VhcmNoSW1wb3J0ZWQ7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXNlYXJjaCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2NpdHlJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjaXR5SW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnY2l0eVN1Z2dlc3Rpb25zJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNpdHlTdWdnZXN0aW9uczogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdzZWFyY2hSZXN1bHRzRWxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlYXJjaFJlc3VsdHNFbGU6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoVGV4dElucHV0RWxlJywgeyBzdGF0aWMgOiBmYWxzZSB9KSBzZWFyY2hUZXh0SW5wdXRFbGU6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZHJlbihTZWFyY2hTdWdnZXN0aW9uQ29tcG9uZW50KSBsaXN0SXRlbXMhOiBRdWVyeUxpc3Q8U2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudD47XG4gICAgQElucHV0KClzZWFyY2hUZXh0OiBzdHJpbmcgPSAnJztcbiAgICBhbGdvbGlhSW5kZXhOYW1lID0gY29uZmlnLmFsZ29saWFJbmRleE5hbWU7XG4gICAgLy8gc2VhcmNoVGV4dDogc3RyaW5nID0gXCJcIjtcbiAgICBrZXlib2FyZEV2ZW50c01hbmFnZXI6IExpc3RLZXlNYW5hZ2VyPGFueT47XG4gICAgdHlwZWRTZWFyY2hUZXh0OiBzdHJpbmcgPSBcIlwiO1xuICAgIHNlYXJjaFRleHRDaGFuZ2VkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgY2l0eVNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIGNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICAgIHBsYWNlU2VhcmNoUmVzdWx0czogYW55O1xuICAgIHNlYXJjaFJlc3VsdHM6IGFueTtcbiAgICBhY3RpdmVQbGFjZSA9ICdQdW5lJztcbiAgICBlbXB0eVJlc3VsdCA9IGZhbHNlO1xuICAgIGNpdHlRdWVyeTogc3RyaW5nO1xuICAgIGNpdHlRdWVyeUNoYW5nZWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBhY3RpdmVQbGFjZUJhY2t1cDogc3RyaW5nO1xuICAgIGNsaWVudDogYW55O1xuICAgIGluZGV4OiBhbnk7XG4gICAgaG9tZVVybDogc3RyaW5nO1xuICAgIHJvdXRlcjogUm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgICB1cmxBcnJheTtcbiAgICBob3N0ID0gY29uZmlnLmJhc2VVcmw7XG4gICAgcG9wdWxhclBsYWNlczogYW55O1xuICAgIGludGVudFNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSwgcHJpdmF0ZSBoZWFkZXJTZXJ2aWNlOiBIZWFkZXJTZXJ2aWNlLCBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLCBwcml2YXRlIHRpbWVTZXJ2aWNlOiBUaW1lU2VydmljZSwgcHVibGljIGRhdGVwaXBlOiBEYXRlUGlwZSkge1xuICAgICAgICB0aGlzLnNlYXJjaFRleHRDaGFuZ2VkLnBpcGUoXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSkuc3Vic2NyaWJlKHRleHQgPT4gdGhpcy5mZXRjaFN1Z2dlc3Rpb25zKHRleHQpKTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBhbGdvbGlhc2VhcmNoKCdBVDVVQjhGTVNSJywgJ2M3ZTk0NmY1Yjc0MGVmMDM1YmQ4MjRmNjlkY2MxNjEyJyk7XG4gICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmNsaWVudC5pbml0SW5kZXgodGhpcy5hbGdvbGlhSW5kZXhOYW1lKTtcbiAgICAgICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gICAgfVxuXG4gICAgYnVpbGRVcmxBcnJheSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCkge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IHRoaXMucm91dGVyLnVybC5zcGxpdChcIj9cIilbMF0ucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGxBbGdvbGlhID0gKHRleHQpID0+IHtcbiAgICAgICAgdGhpcy5pbmRleC5zZWFyY2goe1xuICAgICAgICAgICAgcXVlcnk6IHRleHQsXG4gICAgICAgICAgICBoaXRzUGVyUGFnZTogNlxuICAgICAgICB9KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGFGb3JTZWFyY2hSZXN1bHQoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZldGNoU3VnZ2VzdGlvbnMgPSAodGV4dCkgPT4ge1xuICAgICAgICB0aGlzLmludGVudFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGVhZGVyU2VydmljZS5nZXRTdWdnZXN0aW9ucyh0ZXh0KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSBkYXRhLmRhdGE7XG4gICAgICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlciA9IG5ldyBMaXN0S2V5TWFuYWdlcjxhbnk+KHRoaXMubGlzdEl0ZW1zKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEtleU1hbmFnZXJIYW5kbGVycygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdWdnZXN0aW9uU2VsZWN0ZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jaG9vc2VTdWdnZXN0aW9uKGV2ZW50LnN1Z2dlc3Rpb24pO1xuICAgIH1cblxuICAgIGluaXRLZXlNYW5hZ2VySGFuZGxlcnMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyXG4gICAgICAgICAgICAuY2hhbmdlXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChhY3RpdmVJbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5saXN0SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uc2V0QWN0aXZlKGFjdGl2ZUluZGV4ID09PSBpbmRleCk7XG4gICAgICAgICAgICAgICAgLy8gaWYoaXRlbS5pc0FjdGl2ZSA9PSB0cnVlICYmIGluZGV4ICE9PSBhY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIC8vICAgICBpdGVtLnNldEFjdGl2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhvdmVyT25TdWdnZXN0aW9uID0gKGluZGV4T2ZJdGVtaG92ZXJlZE9uKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4T2ZJdGVtaG92ZXJlZE9uKTtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgYWN0aXZlSXRlbSA9IHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgICAgIGlmKGFjdGl2ZUl0ZW0pYWN0aXZlSXRlbS5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4T2ZJdGVtaG92ZXJlZE9uKTtcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIuYWN0aXZlSXRlbS5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2hvb3NlU3VnZ2VzdGlvbiA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIGlmKCF0aGlzLnNlYXJjaFRleHQpcmV0dXJuO1xuICAgICAgICB0aGlzLnR5cGVkU2VhcmNoVGV4dCA9IHRoaXMuc2VhcmNoVGV4dDtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVRTU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgdGhpcy5nb1RvU2VhcmNoUmVzdWx0c1BhZ2UoKTtcbiAgICB9XG5cbiAgICBhZGRPclVwZGF0ZVRTU3VnZ2VzdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGVhZGVyU2VydmljZS5wb3N0U3VnZ2VzdGlvbnModGhpcy5zZWFyY2hUZXh0KTtcbiAgICB9XG5cblxuICAgIGdvVG9TZWFyY2hSZXN1bHRzUGFnZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbnRlbnRTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHZhciBlbmNvZGVkU2VhcmNoVGV4dCA9IHRoaXMuc2VhcmNoVGV4dC5yZXBsYWNlKC8gKy9nLCctJyk7XG4gICAgICAgIHZhciBlbmNvZGVkQ3VycmVudFBsYWNlID0gdGhpcy5hY3RpdmVQbGFjZS5yZXBsYWNlKC8gKy9nLCctJylcbiAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIGlmKHRoaXMuYWN0aXZlUGxhY2UpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWydwbGFjZSddID0gZW5jb2RlZEN1cnJlbnRQbGFjZTtcbiAgICAgICAgfSBcbiAgICAgICAgaWYoZW5jb2RlZFNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWydxJ10gPSBlbmNvZGVkU2VhcmNoVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYXZpZ2F0aW9uRXh0cmFzIDogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHN0YXRlIDoge1xuICAgICAgICAgICAgICAgIHR5cGVkVGV4dCA6IHRoaXMudHlwZWRTZWFyY2hUZXh0LFxuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zOiB0aGlzLnNlYXJjaFJlc3VsdHNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWVyeVBhcmFtcyA6IHF1ZXJ5UGFyYW1zXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3NlYXJjaCddLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhRm9yU2VhcmNoUmVzdWx0ID0gKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGRhdGEuaGl0cztcbiAgICAgICAgdGhpcy5lbXB0eVJlc3VsdCA9IGRhdGEuaGl0cy5sZW5ndGggPT09IDA7XG4gICAgICAgIGNvbnN0IGludGVyZXN0cyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZWxlLm9ialR5cGUgPT09ICdrZXl3b3JkJyB8fFxuICAgICAgICAgICAgICAgIGVsZS5vYmpUeXBlID09PSAnZXZlbnR0eXBlJyB8fFxuICAgICAgICAgICAgICAgIGVsZS5vYmpUeXBlID09PSAnY2F0ZWdvcnknO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb3JnYW5pemVycyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiBlbGUub2JqVHlwZSA9PT0gJ29yZ2FuaXplcicpO1xuICAgICAgICBjb25zdCBldmVudHMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4gZWxlLm9ialR5cGUgPT09ICdldmVudCcpO1xuXG4gICAgICAgIGludGVyZXN0cy5tYXAoaW50ZXJlc3QgPT4ge1xuICAgICAgICAgICAgaW50ZXJlc3QubmFtZSA9IGludGVyZXN0Lm5hbWUgKyAnIEV2ZW50cyc7XG4gICAgICAgICAgICBpbnRlcmVzdC5sb2NhdGlvbiA9IHRoaXMuYWN0aXZlUGxhY2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9yZ2FuaXplcnMubWFwKG9yZ2FuaXplciA9PiB7XG4gICAgICAgICAgICBpZiAoIW9yZ2FuaXplci5pbWFnZVVybCkge1xuICAgICAgICAgICAgICAgIG9yZ2FuaXplci5pbWFnZVVybCA9ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvc2VhcmNoLWVtcHR5LW9yZ2FuaXplci5wbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY291bnRyeSkge1xuICAgICAgICAgICAgICAgIG9yZ2FuaXplci5sb2NhdGlvbiA9IG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5jb3VudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudHMubWFwKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghZXZlbnQuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICBldmVudC5pbWFnZVVybCA9ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvc2VhcmNoLWVtcHR5LWV2ZW50LnBuZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY2l0eSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmxvY2F0aW9uID0gZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY2l0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5zdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlVGltZSA9IGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLnN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICBzdGFydERhdGVUaW1lID0gdGhpcy50aW1lU2VydmljZS5jb252ZXJ0RGF0ZVRvVGltZXpvbmUoc3RhcnREYXRlVGltZSwgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuZXZlbnRUaW1lWm9uZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuc3RhcnRUaW1lID0gdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0oc3RhcnREYXRlVGltZSwgJ2QgTU1NIHl5eXksIFxcJyBcXCdoOm1tYScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB7ICdpbnRlcmVzdHMnOiBpbnRlcmVzdHMsICdvcmdhbml6ZXJzJzogb3JnYW5pemVycywgJ2V2ZW50cyc6IGV2ZW50cyB9O1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja291dChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY2l0eVN1Z2dlc3Rpb25zLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHRzRWxlICYmICF0aGlzLnNlYXJjaFJlc3VsdHNFbGUubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0xpc3RpbmcgPSAoaW50ZXJlc3Q6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoaW50ZXJlc3RbJ3NlY29uZGFyeVRleHRQcm9wZXJ0aWVzJ10gJiYgaW50ZXJlc3RbJ3NlY29uZGFyeVRleHRQcm9wZXJ0aWVzJ11bJ2lzT25saW5lJ10pIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL29ubGluZSddKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICAgICAgY29uc3Qgc3RvcFdvcmRzID0gWydlJywgJ28nXTtcbiAgICAgICAgbGV0IGxpc3RpbmdVcmwgPSB0aGlzLnVybEFycmF5WzBdICsgJy8nICsgdGhpcy51cmxBcnJheVsxXTtcbiAgICAgICAgaWYgKHRoaXMudXJsQXJyYXkgJiYgdGhpcy51cmxBcnJheS5sZW5ndGggPiAxICYmIHN0b3BXb3Jkcy5pbmRleE9mKHRoaXMudXJsQXJyYXlbMF0pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2xpc3RpbmdVcmwgKyAnLycgKyBpbnRlcmVzdFsndXJsQ29kZSddXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lVXJsICsgJy8nICsgaW50ZXJlc3RbJ3VybENvZGUnXV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0V2ZW50UGFnZSA9IChldmVudENvZGU6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9lLycgKyBldmVudENvZGVdKTtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWFyY2ggPSAodGV4dCkgPT4ge1xuICAgICAgICBpZiAodGV4dCAhPT0gdW5kZWZpbmVkICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0Q2hhbmdlZC5uZXh0KHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlcikge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtLnNlbGVjdEl0ZW0oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNob29zZVN1Z2dlc3Rpb24odGhpcy5zZWFyY2hUZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UG9wdWxhclBsYWNlcyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5ID0gSlNPTi5wYXJzZSg8YW55PnJlcylbJ2NvdW50cnknXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuaGVhZGVyU2VydmljZS5nZXRQb3B1bGFyQ2l0aWVzKGNvdW50cnkgfHwgdGhpcy51cmxBcnJheVswXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdWxhclBsYWNlcyA9IGRhdGFbJ2RhdGEnXS5zbGljZSgwLCA2KS5tYXAoZWxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS50eXBlID0gJ2NpdHknO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLmNpdHlDb2RlID0gZWxlLmNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZXRQb3B1bGFyUGxhY2VzKCk7XG4gICAgICAgIHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKDxhbnk+cmVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbJ2N1cnJlbnRQbGFjZSddICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVQbGFjZSA9IGRhdGFbJ2N1cnJlbnRQbGFjZSddO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGFbJ2NvdW50cnknXSAmJiBkYXRhWydjaXR5J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9tZVVybCA9ICgnLycgKyBkYXRhWydjb3VudHJ5J10gKyAnLycgKyBkYXRhWydjaXR5J10pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==