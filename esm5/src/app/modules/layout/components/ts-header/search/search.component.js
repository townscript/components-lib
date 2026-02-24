import { __awaiter, __decorate, __generator } from "tslib";
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
        this.urlArray = [];
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
        this.navigateToEventPage = function (eventCode) {
            _this.router.navigate(['/e/' + eventCode]);
            _this.searchActive = false;
        };
        this.search = function (text) {
            if (text !== undefined && text.length > 0) {
                _this.searchTextChanged.next(text);
            }
        };
        this.getPopularPlaces = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.placeService.place.subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var country, data;
                    return __generator(this, function (_a) {
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
            _this.buildUrlArray();
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
    SearchComponent.ctorParameters = function () { return [
        { type: UtilityService },
        { type: HeaderService },
        { type: PlaceService },
        { type: TimeService },
        { type: DatePipe }
    ]; };
    __decorate([
        ViewChild('cityInput')
    ], SearchComponent.prototype, "cityInput", void 0);
    __decorate([
        ViewChild('citySuggestions')
    ], SearchComponent.prototype, "citySuggestions", void 0);
    __decorate([
        ViewChild('searchResultsEle')
    ], SearchComponent.prototype, "searchResultsEle", void 0);
    __decorate([
        ViewChild('searchTextInputEle')
    ], SearchComponent.prototype, "searchTextInputEle", void 0);
    __decorate([
        ViewChildren(SearchSuggestionComponent)
    ], SearchComponent.prototype, "listItems", void 0);
    __decorate([
        Input()
    ], SearchComponent.prototype, "searchText", void 0);
    __decorate([
        HostListener('document:click', ['$event'])
    ], SearchComponent.prototype, "clickout", null);
    SearchComponent = __decorate([
        Component({
            selector: 'app-search',
            template: "<div class=\"w-full lg:flex search-container relative\" [class.active]=\"searchActive\">\n    <div #searchResultsEle\n        class=\"w-2/3 lg:w-full px-2 flex items-center relative left-section border border-gray-600 rounded-full\">\n        <i class=\"mdi mdi-magnify text-2xl md:text-xl text-primary p-2 cursor-pointer\"\n            (click)=\"chooseSuggestion(this.searchText)\"></i>\n        <input appDataAnalytics eventLabel=\"search\" clickLocation=\"\" (keyup)=\"handleKeydown($event)\"\n            [(ngModel)]=\"searchText\" (ngModelChange)=\"search($event)\" (focus)=\"searchActive = true;\"\n            class=\"font-normal text-gray-800 w-full h-full bg-transparent  p-2\" type=\"text\"\n            placeholder=\"Search for events, interests or activities\"\n            aria-label=\"Search for events, interests or activities\" />\n        <i *ngIf=\"searchText && searchText.length > 0\"\n            class=\"mdi cursor-pointer mdi-close text-2xl md:text-xl text-primary p-2\"\n            (click)=\"this.searchText = '';\"></i>\n        <div class=\"suggestions rounded-lg py-2 enter-slide-bottom w-full absolute\"\n            [ngClass]=\"intentSelected?'visibility: hidden':''\"\n            *ngIf=\"searchResults && searchActive && searchText !== ''\">\n            <app-search-suggestion class=\"cursor-pointer\" *ngFor=\"let searchedItem of searchResults; let i = index\"\n                [item]=\"searchedItem\" [searchText]=\"searchText\" (itemSelected)=\"suggestionSelected(searchedItem)\"\n                (mouseenter)=\"hoverOnSuggestion(i)\" (click)=\"suggestionSelected(searchedItem)\"></app-search-suggestion>\n            <!-- <div class=\"no-result flex flex-col text-center p-4 fadeIn\"\n                *ngIf=\"searchResults == undefined || searchResults.length == 0\">\n                <img alt=\"No Results Found\" class=\"m-auto w-40 pt-4 mb-2\"\n                [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ListingsStatic/calendar-min.png'\" />\n                <div class=\"flex flex-col\">\n                    <label class=\"text-gray-600 font-bold\">No results found</label>\n                    <span class=\"text-gray-600 text-sm pb-10\">We couldn\u2019t find what you\u2019re looking for</span>\n                </div>\n            </div> -->\n        </div>\n    </div>\n    <div appDataAnalytics eventLabel=\"location\" clickLocation=\"\" #citySuggestions\n        class=\"w-auto flex items-center py-2  px-4 cursor-pointer relative city-search-container\"\n        [class.active]=\"cityPopupActive\" (click)=\"cityPopupActive = true\">\n        <div class=\"flex items-center w-10/12 mr-2 \" [title]=\"urlArray[1] === 'online' ? 'Online' : activePlace\">\n            <i class=\"mdi text-lg md:text-xl text-primary\"\n                [ngClass]=\"urlArray[1] === 'online' ? 'mdi-earth' : 'mdi-map-marker'\"></i>\n            <span class=\"truncate capitalize text-gray-800\">{{urlArray[1] === 'online' ? 'Online' : activePlace}}</span>\n        </div>\n        <i class=\"mdi mdi-menu-down text-xl md:text-2xl\"></i>\n        <app-city-search-popup [popularPlaces]=\"popularPlaces\" class=\"popup\" [(cityPopupActive)]=\"cityPopupActive\"\n            [(activePlace)]=\"activePlace\" [showArrow]=\"false\" *ngIf=\"cityPopupActive\">\n        </app-city-search-popup>\n    </div>\n</div>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.bg-primary{background-color:#563de1}@media (min-width:991px){.search-container{height:42px;transition:.3s}.search-container .left-section:focus{background:#fff}.search-container .left-section input{transition:.3s}.search-container .left-section .suggestions{top:120%;left:0;background:#fff}.search-container .left-section .suggestions ul li{transition:.15s}.search-container .left-section .suggestions ul li:hover{background:#ededed;cursor:pointer}.search-container .city-search-container{transition:.3s;max-width:33.33%}.search-container .city-search-container .popup{position:absolute;top:120%;width:135%;left:-34%}.search-container.active .left-section{background:#fff}.search-container.active .suggestions{box-shadow:0 0 8px rgba(0,0,0,.25)}}::-moz-placeholder{font-size:small}::placeholder{font-size:small}"]
        })
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN2SCxPQUFPLEtBQUsscUJBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUU3RixJQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQztBQU81QztJQWdDSSx5QkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUFVLFlBQTBCLEVBQVUsV0FBd0IsRUFBUyxRQUFrQjtRQUF6TCxpQkFNQztRQU5tQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFi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ZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIFZpZXdDaGlsZHJlbiwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBhbGdvbGlhU2VhcmNoSW1wb3J0ZWQgZnJvbSAnYWxnb2xpYXNlYXJjaCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBUaW1lU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uL3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVhZGVyU2VydmljZSB9IGZyb20gJy4uL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgU2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NlYXJjaC1zdWdnZXN0aW9uL3NlYXJjaC1zdWdnZXN0aW9uLmNvbXBvbmVudCc7XG5cbmNvbnN0IGFsZ29saWFzZWFyY2ggPSBhbGdvbGlhU2VhcmNoSW1wb3J0ZWQ7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXNlYXJjaCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2NpdHlJbnB1dCcpIGNpdHlJbnB1dDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdjaXR5U3VnZ2VzdGlvbnMnKSBjaXR5U3VnZ2VzdGlvbnM6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoUmVzdWx0c0VsZScpIHNlYXJjaFJlc3VsdHNFbGU6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoVGV4dElucHV0RWxlJykgc2VhcmNoVGV4dElucHV0RWxlOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGRyZW4oU2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudCkgbGlzdEl0ZW1zITogUXVlcnlMaXN0PFNlYXJjaFN1Z2dlc3Rpb25Db21wb25lbnQ+O1xuICAgIEBJbnB1dCgpIHNlYXJjaFRleHQ6IHN0cmluZyA9ICcnO1xuICAgIGFsZ29saWFJbmRleE5hbWUgPSBjb25maWcuYWxnb2xpYUluZGV4TmFtZTtcbiAgICAvLyBzZWFyY2hUZXh0OiBzdHJpbmcgPSBcIlwiO1xuICAgIGtleWJvYXJkRXZlbnRzTWFuYWdlcjogTGlzdEtleU1hbmFnZXI8YW55PjtcbiAgICB0eXBlZFNlYXJjaFRleHQ6IHN0cmluZyA9IFwiXCI7XG4gICAgc2VhcmNoVGV4dENoYW5nZWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBzZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICBjaXR5U2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgcGxhY2VTZWFyY2hSZXN1bHRzOiBhbnk7XG4gICAgc2VhcmNoUmVzdWx0czogYW55O1xuICAgIGFjdGl2ZVBsYWNlID0gJ1B1bmUnO1xuICAgIGVtcHR5UmVzdWx0ID0gZmFsc2U7XG4gICAgY2l0eVF1ZXJ5OiBzdHJpbmc7XG4gICAgY2l0eVF1ZXJ5Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGFjdGl2ZVBsYWNlQmFja3VwOiBzdHJpbmc7XG4gICAgY2xpZW50OiBhbnk7XG4gICAgaW5kZXg6IGFueTtcbiAgICBob21lVXJsOiBzdHJpbmc7XG4gICAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICAgIHVybEFycmF5OiBzdHJpbmdbXSA9IFtdO1xuICAgIGhvc3QgPSBjb25maWcuYmFzZVVybDtcbiAgICBwb3B1bGFyUGxhY2VzOiBhbnk7XG4gICAgaW50ZW50U2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLCBwcml2YXRlIGhlYWRlclNlcnZpY2U6IEhlYWRlclNlcnZpY2UsIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgdGltZVNlcnZpY2U6IFRpbWVTZXJ2aWNlLCBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dENoYW5nZWQucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApKS5zdWJzY3JpYmUodGV4dCA9PiB0aGlzLmZldGNoU3VnZ2VzdGlvbnModGV4dCkpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGFsZ29saWFzZWFyY2goJ0FUNVVCOEZNU1InLCAnYzdlOTQ2ZjViNzQwZWYwMzViZDgyNGY2OWRjYzE2MTInKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuY2xpZW50LmluaXRJbmRleCh0aGlzLmFsZ29saWFJbmRleE5hbWUpO1xuICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICB9XG5cbiAgICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KFwiP1wiKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbEFsZ29saWEgPSAodGV4dCkgPT4ge1xuICAgICAgICB0aGlzLmluZGV4LnNlYXJjaCh7XG4gICAgICAgICAgICBxdWVyeTogdGV4dCxcbiAgICAgICAgICAgIGhpdHNQZXJQYWdlOiA2XG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmV0Y2hTdWdnZXN0aW9ucyA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMuaW50ZW50U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFN1Z2dlc3Rpb25zKHRleHQpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyID0gbmV3IExpc3RLZXlNYW5hZ2VyPGFueT4odGhpcy5saXN0SXRlbXMpO1xuICAgICAgICAgICAgdGhpcy5pbml0S2V5TWFuYWdlckhhbmRsZXJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN1Z2dlc3Rpb25TZWxlY3RlZCA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmNob29zZVN1Z2dlc3Rpb24oZXZlbnQuc3VnZ2VzdGlvbik7XG4gICAgfVxuXG4gICAgaW5pdEtleU1hbmFnZXJIYW5kbGVycyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXJcbiAgICAgICAgICAgIC5jaGFuZ2VcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGFjdGl2ZUluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNldEFjdGl2ZShhY3RpdmVJbmRleCA9PT0gaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZihpdGVtLmlzQWN0aXZlID09IHRydWUgJiYgaW5kZXggIT09IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpdGVtLnNldEFjdGl2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBob3Zlck9uU3VnZ2VzdGlvbiA9IChpbmRleE9mSXRlbWhvdmVyZWRPbikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleE9mSXRlbWhvdmVyZWRPbik7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGFjdGl2ZUl0ZW0gPSB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtO1xuICAgICAgICBpZiAoYWN0aXZlSXRlbSkgYWN0aXZlSXRlbS5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4T2ZJdGVtaG92ZXJlZE9uKTtcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIuYWN0aXZlSXRlbS5zZXRBY3RpdmUodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2hvb3NlU3VnZ2VzdGlvbiA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zZWFyY2hUZXh0KSByZXR1cm47XG4gICAgICAgIHRoaXMudHlwZWRTZWFyY2hUZXh0ID0gdGhpcy5zZWFyY2hUZXh0O1xuICAgICAgICB0aGlzLnNlYXJjaFRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlVFNTdWdnZXN0aW9ucygpO1xuICAgICAgICB0aGlzLmdvVG9TZWFyY2hSZXN1bHRzUGFnZSgpO1xuICAgIH1cblxuICAgIGFkZE9yVXBkYXRlVFNTdWdnZXN0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5oZWFkZXJTZXJ2aWNlLnBvc3RTdWdnZXN0aW9ucyh0aGlzLnNlYXJjaFRleHQpO1xuICAgIH1cblxuXG4gICAgZ29Ub1NlYXJjaFJlc3VsdHNQYWdlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmludGVudFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGVuY29kZWRTZWFyY2hUZXh0ID0gdGhpcy5zZWFyY2hUZXh0LnJlcGxhY2UoLyArL2csICctJyk7XG4gICAgICAgIHZhciBlbmNvZGVkQ3VycmVudFBsYWNlID0gdGhpcy5hY3RpdmVQbGFjZS5yZXBsYWNlKC8gKy9nLCAnLScpXG4gICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IHt9O1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVQbGFjZSkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ3BsYWNlJ10gPSBlbmNvZGVkQ3VycmVudFBsYWNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmNvZGVkU2VhcmNoVGV4dCkge1xuICAgICAgICAgICAgcXVlcnlQYXJhbXNbJ3EnXSA9IGVuY29kZWRTZWFyY2hUZXh0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIHR5cGVkVGV4dDogdGhpcy50eXBlZFNlYXJjaFRleHQsXG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHRoaXMuc2VhcmNoUmVzdWx0c1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiBxdWVyeVBhcmFtc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zZWFyY2gnXSwgbmF2aWdhdGlvbkV4dHJhcyk7XG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdCA9IChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBkYXRhLmhpdHM7XG4gICAgICAgIHRoaXMuZW1wdHlSZXN1bHQgPSBkYXRhLmhpdHMubGVuZ3RoID09PSAwO1xuICAgICAgICBjb25zdCBpbnRlcmVzdHMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVsZS5vYmpUeXBlID09PSAna2V5d29yZCcgfHxcbiAgICAgICAgICAgICAgICBlbGUub2JqVHlwZSA9PT0gJ2V2ZW50dHlwZScgfHxcbiAgICAgICAgICAgICAgICBlbGUub2JqVHlwZSA9PT0gJ2NhdGVnb3J5JztcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG9yZ2FuaXplcnMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4gZWxlLm9ialR5cGUgPT09ICdvcmdhbml6ZXInKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gcmVzdWx0cy5maWx0ZXIoZWxlID0+IGVsZS5vYmpUeXBlID09PSAnZXZlbnQnKTtcblxuICAgICAgICBpbnRlcmVzdHMubWFwKGludGVyZXN0ID0+IHtcbiAgICAgICAgICAgIGludGVyZXN0Lm5hbWUgPSBpbnRlcmVzdC5uYW1lICsgJyBFdmVudHMnO1xuICAgICAgICAgICAgaW50ZXJlc3QubG9jYXRpb24gPSB0aGlzLmFjdGl2ZVBsYWNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBvcmdhbml6ZXJzLm1hcChvcmdhbml6ZXIgPT4ge1xuICAgICAgICAgICAgaWYgKCFvcmdhbml6ZXIuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICBvcmdhbml6ZXIuaW1hZ2VVcmwgPSAnaHR0cHM6Ly9zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vdG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL3NlYXJjaC1lbXB0eS1vcmdhbml6ZXIucG5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgb3JnYW5pemVyLnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNvdW50cnkpIHtcbiAgICAgICAgICAgICAgICBvcmdhbml6ZXIubG9jYXRpb24gPSBvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY291bnRyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnRzLm1hcChldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LmltYWdlVXJsKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuaW1hZ2VVcmwgPSAnaHR0cHM6Ly9zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vdG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL3NlYXJjaC1lbXB0eS1ldmVudC5wbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzICYmIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNpdHkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5sb2NhdGlvbiA9IGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZVRpbWUgPSBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5zdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgc3RhcnREYXRlVGltZSA9IHRoaXMudGltZVNlcnZpY2UuY29udmVydERhdGVUb1RpbWV6b25lKHN0YXJ0RGF0ZVRpbWUsIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmV2ZW50VGltZVpvbmUpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLnN0YXJ0VGltZSA9IHRoaXMuZGF0ZXBpcGUudHJhbnNmb3JtKHN0YXJ0RGF0ZVRpbWUsICdkIE1NTSB5eXl5LCBcXCcgXFwnaDptbWEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0geyAnaW50ZXJlc3RzJzogaW50ZXJlc3RzLCAnb3JnYW5pemVycyc6IG9yZ2FuaXplcnMsICdldmVudHMnOiBldmVudHMgfTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgY2xpY2tvdXQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNpdHlTdWdnZXN0aW9ucy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0c0VsZSAmJiAhdGhpcy5zZWFyY2hSZXN1bHRzRWxlLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FdmVudFBhZ2UgPSAoZXZlbnRDb2RlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZS8nICsgZXZlbnRDb2RlXSk7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VhcmNoID0gKHRleHQpID0+IHtcbiAgICAgICAgaWYgKHRleHQgIT09IHVuZGVmaW5lZCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGV4dENoYW5nZWQubmV4dCh0ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgfHwgZXZlbnQua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLmFjdGl2ZUl0ZW0uc2VsZWN0SXRlbSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlU3VnZ2VzdGlvbih0aGlzLnNlYXJjaFRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQb3B1bGFyUGxhY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBKU09OLnBhcnNlKDxhbnk+cmVzKVsnY291bnRyeSddO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSB8fCB0aGlzLnVybEFycmF5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGFyUGxhY2VzID0gZGF0YVsnZGF0YSddLnNsaWNlKDAsIDYpLm1hcChlbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnR5cGUgPSAnY2l0eSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuY2l0eUNvZGUgPSBlbGUuY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICAgICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSg8YW55PnJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhWydjdXJyZW50UGxhY2UnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBkYXRhWydjdXJyZW50UGxhY2UnXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhWydjb3VudHJ5TmFtZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBkYXRhWydjb3VudHJ5TmFtZSddO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGFbJ2NvdW50cnknXSAmJiBkYXRhWydjaXR5J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9tZVVybCA9ICgnLycgKyBkYXRhWydjb3VudHJ5J10gKyAnLycgKyBkYXRhWydjaXR5J10pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=