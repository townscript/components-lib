import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, HostListener, Input, ViewChildren, QueryList } from '@angular/core';
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
                queryParams['currentplace'] = encodedCurrentPlace;
            }
            if (encodedSearchText) {
                queryParams['searchtext'] = encodedSearchText;
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
    tslib_1.__decorate([
        ViewChild('cityInput', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], SearchComponent.prototype, "cityInput", void 0);
    tslib_1.__decorate([
        ViewChild('citySuggestions', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], SearchComponent.prototype, "citySuggestions", void 0);
    tslib_1.__decorate([
        ViewChild('searchResultsEle', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], SearchComponent.prototype, "searchResultsEle", void 0);
    tslib_1.__decorate([
        ViewChild('searchTextInputEle', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], SearchComponent.prototype, "searchTextInputEle", void 0);
    tslib_1.__decorate([
        ViewChildren(SearchSuggestionComponent),
        tslib_1.__metadata("design:type", QueryList)
    ], SearchComponent.prototype, "listItems", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], SearchComponent.prototype, "searchText", void 0);
    tslib_1.__decorate([
        HostListener('document:click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SearchComponent.prototype, "clickout", null);
    SearchComponent = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            template: "<div class=\"w-full lg:flex search-container relative\" [class.active]=\"searchActive\">\n    <div #searchResultsEle class=\"w-2/3 lg:w-full px-2 flex items-center relative left-section\">\n        <i class=\"mdi mdi-magnify text-2xl md:text-xl color-blue p-2 cursor-pointer\" (click)=\"chooseSuggestion(this.searchText)\"></i>\n        <input appDataAnalytics eventLabel=\"search\" clickLocation=\"\" (keyup)=\"handleKeydown($event)\" [(ngModel)]=\"searchText\" (ngModelChange)=\"search($event)\" (focus)=\"searchActive = true;\" class=\"w-full h-full bg-transparent  p-2\" type=\"text\" placeholder=\"Search for an Event, Interest or Organizer\"\n            aria-label=\"Search for an Event, Interest or Organizer\" />\n        <i *ngIf=\"searchText && searchText.length > 0\" class=\"mdi cursor-pointer mdi-close text-2xl md:text-xl color-blue p-2\" (click)=\"this.searchText = '';\"></i>\n        <div class=\"suggestions enter-slide-bottom w-full absolute\" [ngClass]=\"intentSelected?'visibility: hidden':''\" *ngIf=\"searchResults && searchActive && searchText !== ''\">\n            <app-search-suggestion class=\"cursor-pointer\" *ngFor=\"let searchedItem of searchResults; let i = index\" [item]=\"searchedItem\" [searchText]=\"searchText\"\n            (itemSelected)=\"suggestionSelected(searchedItem)\" (mouseenter)=\"hoverOnSuggestion(i)\" (click)=\"suggestionSelected(searchedItem)\"></app-search-suggestion>\n            <div class=\"no-result flex flex-col text-center p-4 fadeIn\"\n                *ngIf=\"searchResults == undefined || searchResults.length == 0\">\n                <img alt=\"No Results Found\" class=\"m-auto w-40 pt-4 mb-2\"\n                [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ListingsStatic/calendar-min.png'\" />\n                <div class=\"flex flex-col\">\n                    <label class=\"text-gray-600 font-bold\">No results found</label>\n                    <span class=\"text-gray-600 text-sm pb-10\">We couldn\u2019t find what you\u2019re looking for</span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div appDataAnalytics eventLabel=\"location\" clickLocation=\"\" #citySuggestions class=\"w-auto flex items-center py-2  px-4 cursor-pointer relative city-search-container\" [class.active]=\"cityPopupActive\" (click)=\"cityPopupActive = true\">\n        <div class=\"flex items-center w-10/12 mr-2 \" [title]=\" activePlace\">\n            <i class=\"mdi mdi-map-marker text-lg md:text-xl color-blue\"></i>\n            <span class=\"truncate capitalize text-gray-800\">{{activePlace}}</span>\n        </div>\n        <i class=\"mdi mdi-chevron-down text-lg md:text-xl\"></i>\n        <app-city-search-popup [popularPlaces]=\"popularPlaces\" class=\"popup\" [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" *ngIf=\"cityPopupActive\">\n        </app-city-search-popup>\n    </div>\n</div>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}@media (min-width:991px){.search-container{height:42px;border-radius:2px;-webkit-transition:.3s;transition:.3s}.search-container .left-section{background-color:#fff;border-radius:4px}.search-container .left-section input{-webkit-transition:.3s;transition:.3s}.search-container .left-section input:focus{background:#fff}.search-container .left-section:hover{box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .left-section .suggestions{top:100%;left:0;background:#fff;border-top:1px solid rgba(151,151,151,.4)}.search-container .left-section .suggestions ul li{-webkit-transition:.15s;transition:.15s}.search-container .left-section .suggestions ul li:hover{background:#ededed;cursor:pointer}.search-container .city-search-container{-webkit-transition:.3s;transition:.3s;max-width:33.33%}.search-container .city-search-container.active{background:#fff;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .city-search-container .popup{position:absolute;top:135%;width:135%;left:-34%}.search-container.active .left-section{background:#fff;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container.active .suggestions{box-shadow:0 11px 15px 0 rgba(0,0,0,.15)}}::-webkit-input-placeholder{font-size:small}::-moz-placeholder{font-size:small}::-ms-input-placeholder{font-size:small}::placeholder{font-size:small}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService, HeaderService, PlaceService, TimeService, DatePipe])
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9ILE9BQU8sS0FBSyxxQkFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUc3RixJQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQztBQU81QztJQWdDSSx5QkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUFVLFlBQTBCLEVBQVUsV0FBd0IsRUFBUyxRQUFrQjtRQUF6TCxpQkFNQztRQU5tQixtQkFBYyxHQUFkLGNBQWMs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RyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUM3RTtpQkFFSjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBN1AwQztRQUExQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUFZLFVBQVU7c0RBQUM7SUFDaEI7UUFBaEQsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUFrQixVQUFVOzREQUFDO0lBQzNCO1FBQWpELFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FBbUIsVUFBVTs2REFBQztJQUMxQjtRQUFwRCxTQUFTLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUcsS0FBSyxFQUFFLENBQUM7MENBQXFCLFVBQVU7K0RBQUM7SUFDM0M7UUFBeEMsWUFBWSxDQUFDLHlCQUF5QixDQUFDOzBDQUFhLFNBQVM7c0RBQTRCO0lBQ2xGO1FBQVAsS0FBSyxFQUFFOzt1REFBd0I7SUFvS2hDO1FBREMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7bURBUTFDO0lBbExRLGVBQWU7UUFMM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsdzRGQUFzQzs7U0FFekMsQ0FBQztpREFpQ3NDLGNBQWMsRUFBeUIsYUFBYSxFQUF3QixZQUFZLEVBQXVCLFdBQVcsRUFBbUIsUUFBUTtPQWhDaEwsZUFBZSxDQWlRM0I7SUFBRCxzQkFBQztDQUFBLEFBalFELElBaVFDO1NBalFZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBhbGdvbGlhU2VhcmNoSW1wb3J0ZWQgZnJvbSAnYWxnb2xpYXNlYXJjaCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3RpbWUuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdHMtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGlzdEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBTZWFyY2hTdWdnZXN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vc2VhcmNoLXN1Z2dlc3Rpb24vc2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ3Byb3RyYWN0b3InO1xuXG5jb25zdCBhbGdvbGlhc2VhcmNoID0gYWxnb2xpYVNlYXJjaEltcG9ydGVkO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1zZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlYXJjaC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdjaXR5SW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSkgY2l0eUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2NpdHlTdWdnZXN0aW9ucycsIHsgc3RhdGljOiBmYWxzZSB9KSBjaXR5U3VnZ2VzdGlvbnM6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoUmVzdWx0c0VsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hSZXN1bHRzRWxlOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaFRleHRJbnB1dEVsZScsIHsgc3RhdGljIDogZmFsc2UgfSkgc2VhcmNoVGV4dElucHV0RWxlOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGRyZW4oU2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudCkgbGlzdEl0ZW1zITogUXVlcnlMaXN0PFNlYXJjaFN1Z2dlc3Rpb25Db21wb25lbnQ+O1xuICAgIEBJbnB1dCgpc2VhcmNoVGV4dDogc3RyaW5nID0gJyc7XG4gICAgYWxnb2xpYUluZGV4TmFtZSA9IGNvbmZpZy5hbGdvbGlhSW5kZXhOYW1lO1xuICAgIC8vIHNlYXJjaFRleHQ6IHN0cmluZyA9IFwiXCI7XG4gICAga2V5Ym9hcmRFdmVudHNNYW5hZ2VyOiBMaXN0S2V5TWFuYWdlcjxhbnk+O1xuICAgIHR5cGVkU2VhcmNoVGV4dDogc3RyaW5nID0gXCJcIjtcbiAgICBzZWFyY2hUZXh0Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIGNpdHlTZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICBjaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICBwbGFjZVNlYXJjaFJlc3VsdHM6IGFueTtcbiAgICBzZWFyY2hSZXN1bHRzOiBhbnk7XG4gICAgYWN0aXZlUGxhY2UgPSAnUHVuZSc7XG4gICAgZW1wdHlSZXN1bHQgPSBmYWxzZTtcbiAgICBjaXR5UXVlcnk6IHN0cmluZztcbiAgICBjaXR5UXVlcnlDaGFuZ2VkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgYWN0aXZlUGxhY2VCYWNrdXA6IHN0cmluZztcbiAgICBjbGllbnQ6IGFueTtcbiAgICBpbmRleDogYW55O1xuICAgIGhvbWVVcmw6IHN0cmluZztcbiAgICByb3V0ZXI6IFJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG4gICAgdXJsQXJyYXk7XG4gICAgaG9zdCA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIHBvcHVsYXJQbGFjZXM6IGFueTtcbiAgICBpbnRlbnRTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgaGVhZGVyU2VydmljZTogSGVhZGVyU2VydmljZSwgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSwgcHJpdmF0ZSB0aW1lU2VydmljZTogVGltZVNlcnZpY2UsIHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXh0Q2hhbmdlZC5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZSh0ZXh0ID0+IHRoaXMuZmV0Y2hTdWdnZXN0aW9ucyh0ZXh0KSk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gYWxnb2xpYXNlYXJjaCgnQVQ1VUI4Rk1TUicsICdjN2U5NDZmNWI3NDBlZjAzNWJkODI0ZjY5ZGNjMTYxMicpO1xuICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5jbGllbnQuaW5pdEluZGV4KHRoaXMuYWxnb2xpYUluZGV4TmFtZSk7XG4gICAgICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICAgIH1cblxuICAgIGJ1aWxkVXJsQXJyYXkgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsQWxnb2xpYSA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMuaW5kZXguc2VhcmNoKHtcbiAgICAgICAgICAgIHF1ZXJ5OiB0ZXh0LFxuICAgICAgICAgICAgaGl0c1BlclBhZ2U6IDZcbiAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhRm9yU2VhcmNoUmVzdWx0KGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmZXRjaFN1Z2dlc3Rpb25zID0gKHRleHQpID0+IHtcbiAgICAgICAgdGhpcy5pbnRlbnRTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0U3VnZ2VzdGlvbnModGV4dCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIgPSBuZXcgTGlzdEtleU1hbmFnZXI8YW55Pih0aGlzLmxpc3RJdGVtcyk7XG4gICAgICAgICAgICB0aGlzLmluaXRLZXlNYW5hZ2VySGFuZGxlcnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3VnZ2VzdGlvblNlbGVjdGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2hvb3NlU3VnZ2VzdGlvbihldmVudC5zdWdnZXN0aW9uKTtcbiAgICB9XG5cbiAgICBpbml0S2V5TWFuYWdlckhhbmRsZXJzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlclxuICAgICAgICAgICAgLmNoYW5nZVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoYWN0aXZlSW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdEl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLnNldEFjdGl2ZShhY3RpdmVJbmRleCA9PT0gaW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vIGlmKGl0ZW0uaXNBY3RpdmUgPT0gdHJ1ZSAmJiBpbmRleCAhPT0gYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaXRlbS5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBob3Zlck9uU3VnZ2VzdGlvbiA9IChpbmRleE9mSXRlbWhvdmVyZWRPbikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleE9mSXRlbWhvdmVyZWRPbik7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFjdGl2ZUl0ZW0gPSB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtO1xuICAgICAgICBpZihhY3RpdmVJdGVtKWFjdGl2ZUl0ZW0uc2V0QWN0aXZlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleE9mSXRlbWhvdmVyZWRPbik7XG4gICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2V0QWN0aXZlKHRydWUpO1xuICAgIH1cblxuICAgIGNob29zZVN1Z2dlc3Rpb24gPSAodGV4dCkgPT4ge1xuICAgICAgICBpZighdGhpcy5zZWFyY2hUZXh0KXJldHVybjtcbiAgICAgICAgdGhpcy50eXBlZFNlYXJjaFRleHQgPSB0aGlzLnNlYXJjaFRleHQ7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVUU1N1Z2dlc3Rpb25zKCk7XG4gICAgICAgIHRoaXMuZ29Ub1NlYXJjaFJlc3VsdHNQYWdlKCk7XG4gICAgfVxuXG4gICAgYWRkT3JVcGRhdGVUU1N1Z2dlc3Rpb25zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2UucG9zdFN1Z2dlc3Rpb25zKHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgfVxuXG5cbiAgICBnb1RvU2VhcmNoUmVzdWx0c1BhZ2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW50ZW50U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZW5jb2RlZFNlYXJjaFRleHQgPSB0aGlzLnNlYXJjaFRleHQucmVwbGFjZSgvICsvZywnLScpO1xuICAgICAgICB2YXIgZW5jb2RlZEN1cnJlbnRQbGFjZSA9IHRoaXMuYWN0aXZlUGxhY2UucmVwbGFjZSgvICsvZywnLScpXG4gICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IHt9O1xuICAgICAgICBpZih0aGlzLmFjdGl2ZVBsYWNlKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtc1snY3VycmVudHBsYWNlJ10gPSBlbmNvZGVkQ3VycmVudFBsYWNlO1xuICAgICAgICB9IFxuICAgICAgICBpZihlbmNvZGVkU2VhcmNoVGV4dCkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ3NlYXJjaHRleHQnXSA9IGVuY29kZWRTZWFyY2hUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hdmlnYXRpb25FeHRyYXMgOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xuICAgICAgICAgICAgc3RhdGUgOiB7XG4gICAgICAgICAgICAgICAgdHlwZWRUZXh0IDogdGhpcy50eXBlZFNlYXJjaFRleHQsXG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHRoaXMuc2VhcmNoUmVzdWx0c1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zIDogcXVlcnlQYXJhbXNcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvc2VhcmNoJ10sIG5hdmlnYXRpb25FeHRyYXMpO1xuICAgIH1cblxuICAgIGZpbHRlckRhdGFGb3JTZWFyY2hSZXN1bHQgPSAoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gZGF0YS5oaXRzO1xuICAgICAgICB0aGlzLmVtcHR5UmVzdWx0ID0gZGF0YS5oaXRzLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgY29uc3QgaW50ZXJlc3RzID0gcmVzdWx0cy5maWx0ZXIoZWxlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbGUub2JqVHlwZSA9PT0gJ2tleXdvcmQnIHx8XG4gICAgICAgICAgICAgICAgZWxlLm9ialR5cGUgPT09ICdldmVudHR5cGUnIHx8XG4gICAgICAgICAgICAgICAgZWxlLm9ialR5cGUgPT09ICdjYXRlZ29yeSc7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBvcmdhbml6ZXJzID0gcmVzdWx0cy5maWx0ZXIoZWxlID0+IGVsZS5vYmpUeXBlID09PSAnb3JnYW5pemVyJyk7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiBlbGUub2JqVHlwZSA9PT0gJ2V2ZW50Jyk7XG5cbiAgICAgICAgaW50ZXJlc3RzLm1hcChpbnRlcmVzdCA9PiB7XG4gICAgICAgICAgICBpbnRlcmVzdC5uYW1lID0gaW50ZXJlc3QubmFtZSArICcgRXZlbnRzJztcbiAgICAgICAgICAgIGludGVyZXN0LmxvY2F0aW9uID0gdGhpcy5hY3RpdmVQbGFjZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb3JnYW5pemVycy5tYXAob3JnYW5pemVyID0+IHtcbiAgICAgICAgICAgIGlmICghb3JnYW5pemVyLmltYWdlVXJsKSB7XG4gICAgICAgICAgICAgICAgb3JnYW5pemVyLmltYWdlVXJsID0gJ2h0dHBzOi8vczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9zZWFyY2gtZW1wdHktb3JnYW5pemVyLnBuZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3JnYW5pemVyLnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzICYmIG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5jb3VudHJ5KSB7XG4gICAgICAgICAgICAgICAgb3JnYW5pemVyLmxvY2F0aW9uID0gb3JnYW5pemVyLnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNvdW50cnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50cy5tYXAoZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCFldmVudC5pbWFnZVVybCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmltYWdlVXJsID0gJ2h0dHBzOi8vczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9zZWFyY2gtZW1wdHktZXZlbnQucG5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5jaXR5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQubG9jYXRpb24gPSBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5jaXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzICYmIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLnN0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGVUaW1lID0gZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZVRpbWUgPSB0aGlzLnRpbWVTZXJ2aWNlLmNvbnZlcnREYXRlVG9UaW1lem9uZShzdGFydERhdGVUaW1lLCBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5ldmVudFRpbWVab25lKTtcbiAgICAgICAgICAgICAgICBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5zdGFydFRpbWUgPSB0aGlzLmRhdGVwaXBlLnRyYW5zZm9ybShzdGFydERhdGVUaW1lLCAnZCBNTU0geXl5eSwgXFwnIFxcJ2g6bW1hJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IHsgJ2ludGVyZXN0cyc6IGludGVyZXN0cywgJ29yZ2FuaXplcnMnOiBvcmdhbml6ZXJzLCAnZXZlbnRzJzogZXZlbnRzIH07XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrb3V0KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5jaXR5U3VnZ2VzdGlvbnMubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFJlc3VsdHNFbGUgJiYgIXRoaXMuc2VhcmNoUmVzdWx0c0VsZS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvTGlzdGluZyA9IChpbnRlcmVzdDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChpbnRlcmVzdFsnc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMnXSAmJiBpbnRlcmVzdFsnc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMnXVsnaXNPbmxpbmUnXSkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb25saW5lJ10pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICAgICAgICBjb25zdCBzdG9wV29yZHMgPSBbJ2UnLCAnbyddO1xuICAgICAgICBsZXQgbGlzdGluZ1VybCA9IHRoaXMudXJsQXJyYXlbMF0gKyAnLycgKyB0aGlzLnVybEFycmF5WzFdO1xuICAgICAgICBpZiAodGhpcy51cmxBcnJheSAmJiB0aGlzLnVybEFycmF5Lmxlbmd0aCA+IDEgJiYgc3RvcFdvcmRzLmluZGV4T2YodGhpcy51cmxBcnJheVswXSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbbGlzdGluZ1VybCArICcvJyArIGludGVyZXN0Wyd1cmxDb2RlJ11dKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmhvbWVVcmwgKyAnLycgKyBpbnRlcmVzdFsndXJsQ29kZSddXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvRXZlbnRQYWdlID0gKGV2ZW50Q29kZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2UvJyArIGV2ZW50Q29kZV0pO1xuICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNlYXJjaCA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIGlmICh0ZXh0ICE9PSB1bmRlZmluZWQgJiYgdGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRleHRDaGFuZ2VkLm5leHQodGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93RG93blwiIHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlU3VnZ2VzdGlvbih0aGlzLnNlYXJjaFRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQb3B1bGFyUGxhY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBKU09OLnBhcnNlKDxhbnk+cmVzKVsnY291bnRyeSddO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSB8fCB0aGlzLnVybEFycmF5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGFyUGxhY2VzID0gZGF0YVsnZGF0YSddLnNsaWNlKDAsIDYpLm1hcChlbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnR5cGUgPSAnY2l0eSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuY2l0eUNvZGUgPSBlbGUuY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICAgICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVsnY3VycmVudFBsYWNlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gZGF0YVsnY3VycmVudFBsYWNlJ107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVsnY291bnRyeSddICYmIGRhdGFbJ2NpdHknXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob21lVXJsID0gKCcvJyArIGRhdGFbJ2NvdW50cnknXSArICcvJyArIGRhdGFbJ2NpdHknXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19