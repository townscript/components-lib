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
                    else if (data['countryName'] !== undefined) {
                        _this.activePlace = data['countryName'];
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
            template: "<div class=\"w-full lg:flex search-container relative\" [class.active]=\"searchActive\">\n    <div #searchResultsEle class=\"w-2/3 lg:w-full px-2 flex items-center relative left-section\">\n        <i class=\"mdi mdi-magnify text-2xl md:text-xl color-blue p-2 cursor-pointer\" (click)=\"chooseSuggestion(this.searchText)\"></i>\n        <input appDataAnalytics eventLabel=\"search\" clickLocation=\"\" (keyup)=\"handleKeydown($event)\" [(ngModel)]=\"searchText\" (ngModelChange)=\"search($event)\" (focus)=\"searchActive = true;\" class=\"font-normal text-gray-800 w-full h-full bg-transparent  p-2\" type=\"text\" placeholder=\"Search for events, interests or activities\"\n            aria-label=\"Search for events, interests or activities\" />\n        <i *ngIf=\"searchText && searchText.length > 0\" class=\"mdi cursor-pointer mdi-close text-2xl md:text-xl color-blue p-2\" (click)=\"this.searchText = '';\"></i>\n        <div class=\"suggestions enter-slide-bottom w-full absolute\" [ngClass]=\"intentSelected?'visibility: hidden':''\" *ngIf=\"searchResults && searchActive && searchText !== ''\">\n            <app-search-suggestion class=\"cursor-pointer\" *ngFor=\"let searchedItem of searchResults; let i = index\" [item]=\"searchedItem\" [searchText]=\"searchText\"\n            (itemSelected)=\"suggestionSelected(searchedItem)\" (mouseenter)=\"hoverOnSuggestion(i)\" (click)=\"suggestionSelected(searchedItem)\"></app-search-suggestion>\n            <!-- <div class=\"no-result flex flex-col text-center p-4 fadeIn\"\n                *ngIf=\"searchResults == undefined || searchResults.length == 0\">\n                <img alt=\"No Results Found\" class=\"m-auto w-40 pt-4 mb-2\"\n                [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ListingsStatic/calendar-min.png'\" />\n                <div class=\"flex flex-col\">\n                    <label class=\"text-gray-600 font-bold\">No results found</label>\n                    <span class=\"text-gray-600 text-sm pb-10\">We couldn\u2019t find what you\u2019re looking for</span>\n                </div>\n            </div> -->\n        </div>\n    </div>\n    <div appDataAnalytics eventLabel=\"location\" clickLocation=\"\" #citySuggestions class=\"w-auto flex items-center py-2  px-4 cursor-pointer relative city-search-container\" [class.active]=\"cityPopupActive\" (click)=\"cityPopupActive = true\">\n        <div class=\"flex items-center w-10/12 mr-2 \" [title]=\" activePlace\">\n            <i class=\"mdi mdi-map-marker text-lg md:text-xl color-blue\"></i>\n            <span class=\"truncate capitalize text-gray-800\">{{activePlace}}</span>\n        </div>\n        <i class=\"mdi mdi-chevron-down text-lg md:text-xl\"></i>\n        <app-city-search-popup [popularPlaces]=\"popularPlaces\" class=\"popup\" [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" *ngIf=\"cityPopupActive\">\n        </app-city-search-popup>\n    </div>\n</div>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}@media (min-width:991px){.search-container{height:42px;border-radius:2px;-webkit-transition:.3s;transition:.3s}.search-container .left-section{background-color:#ededed;border-radius:4px}.search-container .left-section:focus{background:#fff}.search-container .left-section input{-webkit-transition:.3s;transition:.3s}.search-container .left-section .suggestions{top:100%;left:0;background:#fff;border-top:1px solid rgba(151,151,151,.4)}.search-container .left-section .suggestions ul li{-webkit-transition:.15s;transition:.15s}.search-container .left-section .suggestions ul li:hover{background:#ededed;cursor:pointer}.search-container .city-search-container{-webkit-transition:.3s;transition:.3s;max-width:33.33%}.search-container .city-search-container.active{background:#fff;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .city-search-container .popup{position:absolute;top:135%;width:135%;left:-34%}.search-container.active .left-section{background:#fff;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container.active .suggestions{box-shadow:0 11px 15px 0 rgba(0,0,0,.15)}}::-webkit-input-placeholder{font-size:small}::-moz-placeholder{font-size:small}::-ms-input-placeholder{font-size:small}::placeholder{font-size:small}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService, HeaderService, PlaceService, TimeService, DatePipe])
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9ILE9BQU8sS0FBSyxxQkFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUc3RixJQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQztBQU81QztJQWdDSSx5QkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUFVLFlBQTBCLEVBQVUsV0FBd0IsRUFBUyxRQUFrQjtRQUF6TCxpQkFNQztRQU5tQixtQkFBYyxHQUFkLGNBQWMs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ZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgYWxnb2xpYVNlYXJjaEltcG9ydGVkIGZyb20gJ2FsZ29saWFzZWFyY2gnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBUaW1lU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uL3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVhZGVyU2VydmljZSB9IGZyb20gJy4uL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgU2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NlYXJjaC1zdWdnZXN0aW9uL3NlYXJjaC1zdWdnZXN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdwcm90cmFjdG9yJztcblxuY29uc3QgYWxnb2xpYXNlYXJjaCA9IGFsZ29saWFTZWFyY2hJbXBvcnRlZDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWFyY2guY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQFZpZXdDaGlsZCgnY2l0eUlucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNpdHlJbnB1dDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdjaXR5U3VnZ2VzdGlvbnMnLCB7IHN0YXRpYzogZmFsc2UgfSkgY2l0eVN1Z2dlc3Rpb25zOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaFJlc3VsdHNFbGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoUmVzdWx0c0VsZTogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdzZWFyY2hUZXh0SW5wdXRFbGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoVGV4dElucHV0RWxlOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGRyZW4oU2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudCkgbGlzdEl0ZW1zITogUXVlcnlMaXN0PFNlYXJjaFN1Z2dlc3Rpb25Db21wb25lbnQ+O1xuICAgIEBJbnB1dCgpIHNlYXJjaFRleHQ6IHN0cmluZyA9ICcnO1xuICAgIGFsZ29saWFJbmRleE5hbWUgPSBjb25maWcuYWxnb2xpYUluZGV4TmFtZTtcbiAgICAvLyBzZWFyY2hUZXh0OiBzdHJpbmcgPSBcIlwiO1xuICAgIGtleWJvYXJkRXZlbnRzTWFuYWdlcjogTGlzdEtleU1hbmFnZXI8YW55PjtcbiAgICB0eXBlZFNlYXJjaFRleHQ6IHN0cmluZyA9IFwiXCI7XG4gICAgc2VhcmNoVGV4dENoYW5nZWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBzZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICBjaXR5U2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgcGxhY2VTZWFyY2hSZXN1bHRzOiBhbnk7XG4gICAgc2VhcmNoUmVzdWx0czogYW55O1xuICAgIGFjdGl2ZVBsYWNlID0gJ1B1bmUnO1xuICAgIGVtcHR5UmVzdWx0ID0gZmFsc2U7XG4gICAgY2l0eVF1ZXJ5OiBzdHJpbmc7XG4gICAgY2l0eVF1ZXJ5Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGFjdGl2ZVBsYWNlQmFja3VwOiBzdHJpbmc7XG4gICAgY2xpZW50OiBhbnk7XG4gICAgaW5kZXg6IGFueTtcbiAgICBob21lVXJsOiBzdHJpbmc7XG4gICAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICAgIHVybEFycmF5O1xuICAgIGhvc3QgPSBjb25maWcuYmFzZVVybDtcbiAgICBwb3B1bGFyUGxhY2VzOiBhbnk7XG4gICAgaW50ZW50U2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLCBwcml2YXRlIGhlYWRlclNlcnZpY2U6IEhlYWRlclNlcnZpY2UsIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgdGltZVNlcnZpY2U6IFRpbWVTZXJ2aWNlLCBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dENoYW5nZWQucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApKS5zdWJzY3JpYmUodGV4dCA9PiB0aGlzLmZldGNoU3VnZ2VzdGlvbnModGV4dCkpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGFsZ29saWFzZWFyY2goJ0FUNVVCOEZNU1InLCAnYzdlOTQ2ZjViNzQwZWYwMzViZDgyNGY2OWRjYzE2MTInKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuY2xpZW50LmluaXRJbmRleCh0aGlzLmFsZ29saWFJbmRleE5hbWUpO1xuICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICB9XG5cbiAgICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KFwiP1wiKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbEFsZ29saWEgPSAodGV4dCkgPT4ge1xuICAgICAgICB0aGlzLmluZGV4LnNlYXJjaCh7XG4gICAgICAgICAgICBxdWVyeTogdGV4dCxcbiAgICAgICAgICAgIGhpdHNQZXJQYWdlOiA2XG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmV0Y2hTdWdnZXN0aW9ucyA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMuaW50ZW50U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFN1Z2dlc3Rpb25zKHRleHQpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyID0gbmV3IExpc3RLZXlNYW5hZ2VyPGFueT4odGhpcy5saXN0SXRlbXMpO1xuICAgICAgICAgICAgdGhpcy5pbml0S2V5TWFuYWdlckhhbmRsZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1Z2dlc3Rpb25TZWxlY3RlZCA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNob29zZVN1Z2dlc3Rpb24oZXZlbnQuc3VnZ2VzdGlvbik7XG4gICAgfVxuXG4gICAgaW5pdEtleU1hbmFnZXJIYW5kbGVycyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXJcbiAgICAgICAgICAgIC5jaGFuZ2VcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGFjdGl2ZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNldEFjdGl2ZShhY3RpdmVJbmRleCA9PT0gaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZihpdGVtLmlzQWN0aXZlID09IHRydWUgJiYgaW5kZXggIT09IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpdGVtLnNldEFjdGl2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBob3Zlck9uU3VnZ2VzdGlvbiA9IChpbmRleE9mSXRlbWhvdmVyZWRPbikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleE9mSXRlbWhvdmVyZWRPbik7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFjdGl2ZUl0ZW0gPSB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtO1xuICAgICAgICBpZiAoYWN0aXZlSXRlbSkgYWN0aXZlSXRlbS5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4T2ZJdGVtaG92ZXJlZE9uKTtcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIuYWN0aXZlSXRlbS5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2hvb3NlU3VnZ2VzdGlvbiA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zZWFyY2hUZXh0KSByZXR1cm47XG4gICAgICAgIHRoaXMudHlwZWRTZWFyY2hUZXh0ID0gdGhpcy5zZWFyY2hUZXh0O1xuICAgICAgICB0aGlzLnNlYXJjaFRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlVFNTdWdnZXN0aW9ucygpO1xuICAgICAgICB0aGlzLmdvVG9TZWFyY2hSZXN1bHRzUGFnZSgpO1xuICAgIH1cblxuICAgIGFkZE9yVXBkYXRlVFNTdWdnZXN0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5oZWFkZXJTZXJ2aWNlLnBvc3RTdWdnZXN0aW9ucyh0aGlzLnNlYXJjaFRleHQpO1xuICAgIH1cblxuXG4gICAgZ29Ub1NlYXJjaFJlc3VsdHNQYWdlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmludGVudFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGVuY29kZWRTZWFyY2hUZXh0ID0gdGhpcy5zZWFyY2hUZXh0LnJlcGxhY2UoLyArL2csICctJyk7XG4gICAgICAgIHZhciBlbmNvZGVkQ3VycmVudFBsYWNlID0gdGhpcy5hY3RpdmVQbGFjZS5yZXBsYWNlKC8gKy9nLCAnLScpXG4gICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IHt9O1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVQbGFjZSkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ3BsYWNlJ10gPSBlbmNvZGVkQ3VycmVudFBsYWNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmNvZGVkU2VhcmNoVGV4dCkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ3EnXSA9IGVuY29kZWRTZWFyY2hUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHR5cGVkVGV4dDogdGhpcy50eXBlZFNlYXJjaFRleHQsXG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHRoaXMuc2VhcmNoUmVzdWx0c1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zZWFyY2gnXSwgbmF2aWdhdGlvbkV4dHJhcyk7XG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdCA9IChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBkYXRhLmhpdHM7XG4gICAgICAgIHRoaXMuZW1wdHlSZXN1bHQgPSBkYXRhLmhpdHMubGVuZ3RoID09PSAwO1xuICAgICAgICBjb25zdCBpbnRlcmVzdHMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVsZS5vYmpUeXBlID09PSAna2V5d29yZCcgfHxcbiAgICAgICAgICAgICAgICBlbGUub2JqVHlwZSA9PT0gJ2V2ZW50dHlwZScgfHxcbiAgICAgICAgICAgICAgICBlbGUub2JqVHlwZSA9PT0gJ2NhdGVnb3J5JztcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG9yZ2FuaXplcnMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4gZWxlLm9ialR5cGUgPT09ICdvcmdhbml6ZXInKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gcmVzdWx0cy5maWx0ZXIoZWxlID0+IGVsZS5vYmpUeXBlID09PSAnZXZlbnQnKTtcblxuICAgICAgICBpbnRlcmVzdHMubWFwKGludGVyZXN0ID0+IHtcbiAgICAgICAgICAgIGludGVyZXN0Lm5hbWUgPSBpbnRlcmVzdC5uYW1lICsgJyBFdmVudHMnO1xuICAgICAgICAgICAgaW50ZXJlc3QubG9jYXRpb24gPSB0aGlzLmFjdGl2ZVBsYWNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBvcmdhbml6ZXJzLm1hcChvcmdhbml6ZXIgPT4ge1xuICAgICAgICAgICAgaWYgKCFvcmdhbml6ZXIuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICBvcmdhbml6ZXIuaW1hZ2VVcmwgPSAnaHR0cHM6Ly9zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vdG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL3NlYXJjaC1lbXB0eS1vcmdhbml6ZXIucG5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgb3JnYW5pemVyLnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNvdW50cnkpIHtcbiAgICAgICAgICAgICAgICBvcmdhbml6ZXIubG9jYXRpb24gPSBvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY291bnRyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnRzLm1hcChldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LmltYWdlVXJsKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuaW1hZ2VVcmwgPSAnaHR0cHM6Ly9zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vdG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL3NlYXJjaC1lbXB0eS1ldmVudC5wbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzICYmIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNpdHkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5sb2NhdGlvbiA9IGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZVRpbWUgPSBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5zdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgc3RhcnREYXRlVGltZSA9IHRoaXMudGltZVNlcnZpY2UuY29udmVydERhdGVUb1RpbWV6b25lKHN0YXJ0RGF0ZVRpbWUsIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmV2ZW50VGltZVpvbmUpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLnN0YXJ0VGltZSA9IHRoaXMuZGF0ZXBpcGUudHJhbnNmb3JtKHN0YXJ0RGF0ZVRpbWUsICdkIE1NTSB5eXl5LCBcXCcgXFwnaDptbWEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0geyAnaW50ZXJlc3RzJzogaW50ZXJlc3RzLCAnb3JnYW5pemVycyc6IG9yZ2FuaXplcnMsICdldmVudHMnOiBldmVudHMgfTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgY2xpY2tvdXQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNpdHlTdWdnZXN0aW9ucy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0c0VsZSAmJiAhdGhpcy5zZWFyY2hSZXN1bHRzRWxlLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRlVG9MaXN0aW5nID0gKGludGVyZXN0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKGludGVyZXN0WydzZWNvbmRhcnlUZXh0UHJvcGVydGllcyddICYmIGludGVyZXN0WydzZWNvbmRhcnlUZXh0UHJvcGVydGllcyddWydpc09ubGluZSddKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vbmxpbmUnXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gICAgICAgIGNvbnN0IHN0b3BXb3JkcyA9IFsnZScsICdvJ107XG4gICAgICAgIGxldCBsaXN0aW5nVXJsID0gdGhpcy51cmxBcnJheVswXSArICcvJyArIHRoaXMudXJsQXJyYXlbMV07XG4gICAgICAgIGlmICh0aGlzLnVybEFycmF5ICYmIHRoaXMudXJsQXJyYXkubGVuZ3RoID4gMSAmJiBzdG9wV29yZHMuaW5kZXhPZih0aGlzLnVybEFycmF5WzBdKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtsaXN0aW5nVXJsICsgJy8nICsgaW50ZXJlc3RbJ3VybENvZGUnXV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaG9tZVVybCArICcvJyArIGludGVyZXN0Wyd1cmxDb2RlJ11dKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FdmVudFBhZ2UgPSAoZXZlbnRDb2RlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZS8nICsgZXZlbnRDb2RlXSk7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VhcmNoID0gKHRleHQpID0+IHtcbiAgICAgICAgaWYgKHRleHQgIT09IHVuZGVmaW5lZCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGV4dENoYW5nZWQubmV4dCh0ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlU3VnZ2VzdGlvbih0aGlzLnNlYXJjaFRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQb3B1bGFyUGxhY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBKU09OLnBhcnNlKDxhbnk+cmVzKVsnY291bnRyeSddO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSB8fCB0aGlzLnVybEFycmF5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGFyUGxhY2VzID0gZGF0YVsnZGF0YSddLnNsaWNlKDAsIDYpLm1hcChlbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnR5cGUgPSAnY2l0eSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuY2l0eUNvZGUgPSBlbGUuY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICAgICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVsnY3VycmVudFBsYWNlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gZGF0YVsnY3VycmVudFBsYWNlJ107XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVsnY291bnRyeU5hbWUnXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gZGF0YVsnY291bnRyeU5hbWUnXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWydjb3VudHJ5J10gJiYgZGF0YVsnY2l0eSddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvbWVVcmwgPSAoJy8nICsgZGF0YVsnY291bnRyeSddICsgJy8nICsgZGF0YVsnY2l0eSddKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19