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
        this.searchText = "";
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
        this.chooseSuggestion = function (text) {
            _this.typedSearchText = _this.searchText;
            _this.searchText = text;
            _this.goToSearchResultsPage();
        };
        this.goToSearchResultsPage = function () {
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
    SearchComponent.prototype.initKeyManagerHandlers = function () {
        var _this = this;
        this.keyboardEventsManager
            .change
            .subscribe(function (activeIndex) {
            _this.listItems.map(function (item, index) {
                item.setActive(activeIndex === index);
                return item;
            });
        });
    };
    SearchComponent.prototype.clickout = function (event) {
        if (!this.citySuggestions.nativeElement.contains(event.target)) {
            this.cityPopupActive = false;
        }
        if (this.searchResultsEle && !this.searchResultsEle.nativeElement.contains(event.target)) {
            this.searchActive = false;
        }
    };
    SearchComponent.prototype.handleKeydown = function (event) {
        event.stopImmediatePropagation();
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
            template: "<div class=\"w-full lg:flex search-container relative\" [class.active]=\"searchActive\">\n    <div #searchResultsEle class=\"w-2/3 lg:w-full px-2 flex items-center relative left-section\">\n        <i class=\"mdi mdi-magnify text-2xl md:text-xl color-blue p-2\"></i>\n        <input appDataAnalytics eventLabel=\"search\" clickLocation=\"\" (keyup)=\"handleKeydown($event)\" [(ngModel)]=\"searchText\" (ngModelChange)=\"search($event)\" (focus)=\"searchActive = true;citySearchActive=false\" class=\"w-full h-full bg-transparent  p-2\" type=\"text\" placeholder=\"Search for an Event, Interest or Organizer\"\n            aria-label=\"Search for an Event, Interest or Organizer\" />\n        <i *ngIf=\"searchText && searchText.length > 0\" class=\"mdi cursor-pointer mdi-close text-2xl md:text-xl color-blue p-2\" (click)=\"this.searchText = '';\"></i>\n        <div class=\"suggestions enter-slide-bottom w-full absolute\" [ngClass]=\"intentSelected?'visibility: hidden':''\" *ngIf=\"searchResults && searchActive\">\n            <app-search-suggestion class=\"cursor-pointer\" *ngFor=\"let searchedItem of searchResults\" [item]=\"searchedItem\" [searchText]=\"searchText\"\n            (itemSelected)=\"suggestionSelected($event)\" (click)=\"suggestionSelected($event)\"></app-search-suggestion>\n            <div class=\"no-result flex flex-col text-center p-10 fadeIn\"\n                *ngIf=\"searchResults == undefined || searchResults.length == 0\">\n                <img alt=\"No Results Found\" class=\"mb-2\"\n                    [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ListingsStatic/calendar-min.png'\" />\n                <label class=\"text-gray-600 text-sm\">No Results found</label>\n                <span class=\"text-gray-500 text-xs\">We couldn\u2019t find what you\u2019re looking for</span>\n            </div>\n        </div>\n    </div>\n    <div appDataAnalytics eventLabel=\"location\" clickLocation=\"\" #citySuggestions class=\"w-auto flex items-center py-2  px-4 cursor-pointer relative city-search-container\" [class.active]=\"cityPopupActive\" (click)=\"cityPopupActive = true\">\n        <div class=\"flex items-center w-10/12 mr-2 \" [title]=\" activePlace\">\n            <i class=\"mdi mdi-map-marker text-lg md:text-xl color-blue\"></i>\n            <span class=\"truncate capitalize text-gray-800\">{{activePlace}}</span>\n        </div>\n        <i class=\"mdi mdi-chevron-down text-lg md:text-xl\"></i>\n        <app-city-search-popup [popularPlaces]=\"popularPlaces\" class=\"popup\" [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" *ngIf=\"cityPopupActive\">\n        </app-city-search-popup>\n    </div>\n</div>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}@media (min-width:991px){.search-container{height:42px;border-radius:2px;-webkit-transition:.3s;transition:.3s}.search-container .left-section{background-color:#fff;border-radius:4px}.search-container .left-section input{-webkit-transition:.3s;transition:.3s}.search-container .left-section input:focus{background:#fff}.search-container .left-section:hover{box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .left-section .suggestions{top:100%;left:0;background:#fff;border-top:1px solid rgba(151,151,151,.4)}.search-container .left-section .suggestions ul li{-webkit-transition:.15s;transition:.15s}.search-container .left-section .suggestions ul li:hover{background:#ededed;cursor:pointer}.search-container .city-search-container{-webkit-transition:.3s;transition:.3s;max-width:33.33%}.search-container .city-search-container.active{background:#fff;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .city-search-container .popup{position:absolute;top:135%;width:135%;left:-34%}.search-container.active .left-section{background:#fff;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container.active .suggestions{box-shadow:0 11px 15px 0 rgba(0,0,0,.15)}}::-webkit-input-placeholder{font-size:small}::-moz-placeholder{font-size:small}::-ms-input-placeholder{font-size:small}::placeholder{font-size:small}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService, HeaderService, PlaceService, TimeService, DatePipe])
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sS0FBSyxxQkFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUU3RixJQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQztBQU81QztJQStCSSx5QkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUFVLFlBQTBCLEVBQVUsV0FBd0IsRUFBUyxRQUFrQjtRQUF6TCxpQkFNQztRQU5tQixtQkFBYyxHQUFkLGNBQWMs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LEVBQXVCLFdBQVcsRUFBbUIsUUFBUTtPQS9CaEwsZUFBZSxDQTRPM0I7SUFBRCxzQkFBQztDQUFBLEFBNU9ELElBNE9DO1NBNU9ZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgYWxnb2xpYVNlYXJjaEltcG9ydGVkIGZyb20gJ2FsZ29saWFzZWFyY2gnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBUaW1lU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uL3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVhZGVyU2VydmljZSB9IGZyb20gJy4uL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgU2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NlYXJjaC1zdWdnZXN0aW9uL3NlYXJjaC1zdWdnZXN0aW9uLmNvbXBvbmVudCc7XG5cbmNvbnN0IGFsZ29saWFzZWFyY2ggPSBhbGdvbGlhU2VhcmNoSW1wb3J0ZWQ7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXNlYXJjaCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2NpdHlJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjaXR5SW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnY2l0eVN1Z2dlc3Rpb25zJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNpdHlTdWdnZXN0aW9uczogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdzZWFyY2hSZXN1bHRzRWxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlYXJjaFJlc3VsdHNFbGU6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZHJlbihTZWFyY2hTdWdnZXN0aW9uQ29tcG9uZW50KSBsaXN0SXRlbXMhOiBRdWVyeUxpc3Q8U2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudD47XG4gICAgQElucHV0KClzZWFyY2hUZXh0OiBzdHJpbmcgPSBcIlwiO1xuICAgIGFsZ29saWFJbmRleE5hbWUgPSBjb25maWcuYWxnb2xpYUluZGV4TmFtZTtcbiAgICAvLyBzZWFyY2hUZXh0OiBzdHJpbmcgPSBcIlwiO1xuICAgIGtleWJvYXJkRXZlbnRzTWFuYWdlcjogTGlzdEtleU1hbmFnZXI8YW55PjtcbiAgICB0eXBlZFNlYXJjaFRleHQ6IHN0cmluZyA9IFwiXCI7XG4gICAgc2VhcmNoVGV4dENoYW5nZWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBzZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICBjaXR5U2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgcGxhY2VTZWFyY2hSZXN1bHRzOiBhbnk7XG4gICAgc2VhcmNoUmVzdWx0czogYW55O1xuICAgIGFjdGl2ZVBsYWNlID0gJ1B1bmUnO1xuICAgIGVtcHR5UmVzdWx0ID0gZmFsc2U7XG4gICAgY2l0eVF1ZXJ5OiBzdHJpbmc7XG4gICAgY2l0eVF1ZXJ5Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGFjdGl2ZVBsYWNlQmFja3VwOiBzdHJpbmc7XG4gICAgY2xpZW50OiBhbnk7XG4gICAgaW5kZXg6IGFueTtcbiAgICBob21lVXJsOiBzdHJpbmc7XG4gICAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICAgIHVybEFycmF5O1xuICAgIGhvc3QgPSBjb25maWcuYmFzZVVybDtcbiAgICBwb3B1bGFyUGxhY2VzOiBhbnk7XG4gICAgaW50ZW50U2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLCBwcml2YXRlIGhlYWRlclNlcnZpY2U6IEhlYWRlclNlcnZpY2UsIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgdGltZVNlcnZpY2U6IFRpbWVTZXJ2aWNlLCBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dENoYW5nZWQucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApKS5zdWJzY3JpYmUodGV4dCA9PiB0aGlzLmZldGNoU3VnZ2VzdGlvbnModGV4dCkpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGFsZ29saWFzZWFyY2goJ0FUNVVCOEZNU1InLCAnYzdlOTQ2ZjViNzQwZWYwMzViZDgyNGY2OWRjYzE2MTInKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuY2xpZW50LmluaXRJbmRleCh0aGlzLmFsZ29saWFJbmRleE5hbWUpO1xuICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICB9XG5cbiAgICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KFwiP1wiKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbEFsZ29saWEgPSAodGV4dCkgPT4ge1xuICAgICAgICB0aGlzLmluZGV4LnNlYXJjaCh7XG4gICAgICAgICAgICBxdWVyeTogdGV4dCxcbiAgICAgICAgICAgIGhpdHNQZXJQYWdlOiA2XG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmV0Y2hTdWdnZXN0aW9ucyA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMuaW50ZW50U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFN1Z2dlc3Rpb25zKHRleHQpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyID0gbmV3IExpc3RLZXlNYW5hZ2VyPGFueT4odGhpcy5saXN0SXRlbXMpO1xuICAgICAgICAgICAgdGhpcy5pbml0S2V5TWFuYWdlckhhbmRsZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1Z2dlc3Rpb25TZWxlY3RlZCA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNob29zZVN1Z2dlc3Rpb24oZXZlbnQuc3VnZ2VzdGlvbik7XG4gICAgfVxuXG4gICAgaW5pdEtleU1hbmFnZXJIYW5kbGVycygpIHtcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXJcbiAgICAgICAgICAgIC5jaGFuZ2VcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGFjdGl2ZUluZGV4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxpc3RJdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXRBY3RpdmUoYWN0aXZlSW5kZXggPT09IGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaG9vc2VTdWdnZXN0aW9uID0gKHRleHQpID0+IHtcbiAgICAgICAgdGhpcy50eXBlZFNlYXJjaFRleHQgPSB0aGlzLnNlYXJjaFRleHQ7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMuZ29Ub1NlYXJjaFJlc3VsdHNQYWdlKCk7XG4gICAgfVxuXG4gICAgZ29Ub1NlYXJjaFJlc3VsdHNQYWdlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmludGVudFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGVuY29kZWRTZWFyY2hUZXh0ID0gdGhpcy5zZWFyY2hUZXh0LnJlcGxhY2UoLyArL2csJy0nKTtcbiAgICAgICAgdmFyIGVuY29kZWRDdXJyZW50UGxhY2UgPSB0aGlzLmFjdGl2ZVBsYWNlLnJlcGxhY2UoLyArL2csJy0nKVxuICAgICAgICB2YXIgcXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgaWYodGhpcy5hY3RpdmVQbGFjZSkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ2N1cnJlbnRwbGFjZSddID0gZW5jb2RlZEN1cnJlbnRQbGFjZTtcbiAgICAgICAgfSBcbiAgICAgICAgaWYoZW5jb2RlZFNlYXJjaFRleHQpIHtcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zWydzZWFyY2h0ZXh0J10gPSBlbmNvZGVkU2VhcmNoVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuYXZpZ2F0aW9uRXh0cmFzIDogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHN0YXRlIDoge1xuICAgICAgICAgICAgICAgIHR5cGVkVGV4dCA6IHRoaXMudHlwZWRTZWFyY2hUZXh0LFxuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zOiB0aGlzLnNlYXJjaFJlc3VsdHNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWVyeVBhcmFtcyA6IHF1ZXJ5UGFyYW1zXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3NlYXJjaCddLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhRm9yU2VhcmNoUmVzdWx0ID0gKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGRhdGEuaGl0cztcbiAgICAgICAgdGhpcy5lbXB0eVJlc3VsdCA9IGRhdGEuaGl0cy5sZW5ndGggPT09IDA7XG4gICAgICAgIGNvbnN0IGludGVyZXN0cyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZWxlLm9ialR5cGUgPT09ICdrZXl3b3JkJyB8fFxuICAgICAgICAgICAgICAgIGVsZS5vYmpUeXBlID09PSAnZXZlbnR0eXBlJyB8fFxuICAgICAgICAgICAgICAgIGVsZS5vYmpUeXBlID09PSAnY2F0ZWdvcnknO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb3JnYW5pemVycyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiBlbGUub2JqVHlwZSA9PT0gJ29yZ2FuaXplcicpO1xuICAgICAgICBjb25zdCBldmVudHMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4gZWxlLm9ialR5cGUgPT09ICdldmVudCcpO1xuXG4gICAgICAgIGludGVyZXN0cy5tYXAoaW50ZXJlc3QgPT4ge1xuICAgICAgICAgICAgaW50ZXJlc3QubmFtZSA9IGludGVyZXN0Lm5hbWUgKyAnIEV2ZW50cyc7XG4gICAgICAgICAgICBpbnRlcmVzdC5sb2NhdGlvbiA9IHRoaXMuYWN0aXZlUGxhY2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9yZ2FuaXplcnMubWFwKG9yZ2FuaXplciA9PiB7XG4gICAgICAgICAgICBpZiAoIW9yZ2FuaXplci5pbWFnZVVybCkge1xuICAgICAgICAgICAgICAgIG9yZ2FuaXplci5pbWFnZVVybCA9ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvc2VhcmNoLWVtcHR5LW9yZ2FuaXplci5wbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY291bnRyeSkge1xuICAgICAgICAgICAgICAgIG9yZ2FuaXplci5sb2NhdGlvbiA9IG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5jb3VudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudHMubWFwKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghZXZlbnQuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICBldmVudC5pbWFnZVVybCA9ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvc2VhcmNoLWVtcHR5LWV2ZW50LnBuZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY2l0eSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmxvY2F0aW9uID0gZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY2l0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5zdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlVGltZSA9IGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLnN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICBzdGFydERhdGVUaW1lID0gdGhpcy50aW1lU2VydmljZS5jb252ZXJ0RGF0ZVRvVGltZXpvbmUoc3RhcnREYXRlVGltZSwgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuZXZlbnRUaW1lWm9uZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuc3RhcnRUaW1lID0gdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0oc3RhcnREYXRlVGltZSwgJ2QgTU1NIHl5eXksIFxcJyBcXCdoOm1tYScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB7ICdpbnRlcmVzdHMnOiBpbnRlcmVzdHMsICdvcmdhbml6ZXJzJzogb3JnYW5pemVycywgJ2V2ZW50cyc6IGV2ZW50cyB9O1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja291dChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY2l0eVN1Z2dlc3Rpb25zLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHRzRWxlICYmICF0aGlzLnNlYXJjaFJlc3VsdHNFbGUubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0xpc3RpbmcgPSAoaW50ZXJlc3Q6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoaW50ZXJlc3RbJ3NlY29uZGFyeVRleHRQcm9wZXJ0aWVzJ10gJiYgaW50ZXJlc3RbJ3NlY29uZGFyeVRleHRQcm9wZXJ0aWVzJ11bJ2lzT25saW5lJ10pIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL29ubGluZSddKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICAgICAgY29uc3Qgc3RvcFdvcmRzID0gWydlJywgJ28nXTtcbiAgICAgICAgbGV0IGxpc3RpbmdVcmwgPSB0aGlzLnVybEFycmF5WzBdICsgJy8nICsgdGhpcy51cmxBcnJheVsxXTtcbiAgICAgICAgaWYgKHRoaXMudXJsQXJyYXkgJiYgdGhpcy51cmxBcnJheS5sZW5ndGggPiAxICYmIHN0b3BXb3Jkcy5pbmRleE9mKHRoaXMudXJsQXJyYXlbMF0pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2xpc3RpbmdVcmwgKyAnLycgKyBpbnRlcmVzdFsndXJsQ29kZSddXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lVXJsICsgJy8nICsgaW50ZXJlc3RbJ3VybENvZGUnXV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0V2ZW50UGFnZSA9IChldmVudENvZGU6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9lLycgKyBldmVudENvZGVdKTtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWFyY2ggPSAodGV4dCkgPT4ge1xuICAgICAgICBpZiAodGV4dCAhPT0gdW5kZWZpbmVkICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0Q2hhbmdlZC5uZXh0KHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93RG93blwiIHx8IGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlU3VnZ2VzdGlvbih0aGlzLnNlYXJjaFRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQb3B1bGFyUGxhY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBKU09OLnBhcnNlKDxhbnk+cmVzKVsnY291bnRyeSddO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSB8fCB0aGlzLnVybEFycmF5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGFyUGxhY2VzID0gZGF0YVsnZGF0YSddLnNsaWNlKDAsIDYpLm1hcChlbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnR5cGUgPSAnY2l0eSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuY2l0eUNvZGUgPSBlbGUuY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICAgICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVsnY3VycmVudFBsYWNlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gZGF0YVsnY3VycmVudFBsYWNlJ107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVsnY291bnRyeSddICYmIGRhdGFbJ2NpdHknXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob21lVXJsID0gKCcvJyArIGRhdGFbJ2NvdW50cnknXSArICcvJyArIGRhdGFbJ2NpdHknXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19