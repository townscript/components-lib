import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as algoliaSearchImported from 'algoliasearch';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TimeService } from '../../../../../shared/services/time.service';
import { config } from '../../../../../core/app-config';
import { PlaceService } from '../place.service';
import { HeaderService } from '../ts-header.service';
import { UtilityService } from '../../../../../shared/services/utilities.service';
var algoliasearch = algoliaSearchImported;
var SearchComponent = /** @class */ (function () {
    function SearchComponent(utilityService, headerService, placeService, timeService, datepipe) {
        var _this = this;
        this.utilityService = utilityService;
        this.headerService = headerService;
        this.placeService = placeService;
        this.timeService = timeService;
        this.datepipe = datepipe;
        this.algoliaIndexName = config.algoliaIndexName;
        this.searchTextChanged = new Subject();
        this.searchActive = false;
        this.citySearchActive = false;
        this.cityPopupActive = false;
        this.activePlace = 'Pune';
        this.emptyResult = false;
        this.cityQueryChanged = new Subject();
        this.router = config.router;
        this.host = config.baseUrl;
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
        this.searchTextChanged.pipe(debounceTime(300)).subscribe(function (text) { return _this.callAlgolia(text); });
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
        HostListener('document:click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SearchComponent.prototype, "clickout", null);
    SearchComponent = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            template: "<div class=\"w-full lg:flex search-container relative\" [class.active]=\"searchActive\">\n    <div #searchResultsEle class=\"w-2/3 lg:w-full px-2 flex items-center relative left-section\">\n        <i class=\"mdi mdi-magnify text-2xl md:text-xl color-blue p-2\"></i>\n        <input appDataAnalytics eventLabel=\"search\" clickLocation=\"\" [(ngModel)]=\"searchText\" (ngModelChange)=\"search($event)\" (focus)=\"searchActive = true;citySearchActive=false\" class=\"text-sm w-full h-full bg-transparent  p-2\" type=\"text\" placeholder=\"Search for an Event, Interest or Organizer\"\n            aria-label=\"Search for an Event, Interest or Organizer\" />\n        <div class=\"suggestions enter-slide-bottom w-full p-2 absolute\" *ngIf=\"searchResults && searchActive\">\n            <ul class=\"ts-enter text-center my-4\" *ngIf=\"emptyResult\">\n                <img class=\"mx-auto mb-2\" width=\"200\" src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ListingsStatic/calendar-min.png\">\n                <span class=\"mx-auto block text-sm text-gray-600\">No results found</span>\n                <span class=\"mx-auto block text-xs text-gray-500 mb-4\">We couldn\u2019t find what you\u2019re looking for</span>\n            </ul>\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.interests.length>0\">\n                <li class=\"list-head\">\n                    INTERESTS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" (click)=\"navigateToListing(interest)\" *ngFor=\"let interest of searchResults.interests\">\n                    <div class=\"flex items-center\">\n                        <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ interest.imageUrl +')'\">\n                        </div>\n                        <div>\n                            <span class=\"mb-1 block\">{{interest.name | titlecase}} </span>\n                            <div class=\"flex items-center\" *ngIf=\"interest.location\">\n                                <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                <small class=\"capitalize\">{{interest.location}}</small>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.events.length>0\">\n                <li class=\"list-head\">\n                    EVENTS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" *ngFor=\"let event of searchResults.events\" (click)=\"navigateToEventPage(event.urlCode)\">\n                    <div class=\"flex items-center\">\n                        <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ event.imageUrl +')'\"></div>\n                        <div>\n                            <span class=\"mb-1 block\">{{event.name | titlecase}} </span>\n                            <div class=\"flex items-center\">\n                                <div class=\"flex items-center\" *ngIf=\"event.location\">\n                                    <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                    <small>{{event.location}}</small>\n                                </div>\n                                <div class=\"flex items-center ml-2\" *ngIf=\"event?.secondaryTextProperties?.startTime\">\n                                    <i class=\"mdi mdi-calendar-today color-blue mr-1\"></i>\n                                    <small>{{event.secondaryTextProperties.startTime}}</small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.organizers.length>0\">\n                <li class=\"list-head\">\n                    ORGANIZERS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" *ngFor=\"let organizer of searchResults.organizers\">\n                    <a [href]=\"host+'o/'+organizer.urlCode\">\n                        <div class=\"flex items-center\">\n                            <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ organizer.imageUrl +')'\">\n                            </div>\n                            <div>\n                                <span class=\"mb-1 block\">{{organizer.name | titlecase}} </span>\n                                <div class=\"flex items-center\" *ngIf=\"organizer.location\">\n                                    <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                    <small>{{organizer.location}}</small>\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div appDataAnalytics eventLabel=\"location\" clickLocation=\"\" #citySuggestions class=\"w-auto flex items-center py-2  px-4 cursor-pointer relative city-search-container\" [class.active]=\"cityPopupActive\" (click)=\"cityPopupActive = true\">\n        <div class=\"flex items-center w-10/12 mr-2 \" [title]=\" activePlace\">\n            <i class=\"mdi mdi-map-marker text-lg md:text-xl color-blue\"></i>\n            <span class=\"truncate capitalize text-gray-800\">{{activePlace}}</span>\n        </div>\n        <i class=\"mdi mdi-chevron-down text-lg md:text-xl\"></i>\n        <app-city-search-popup [popularPlaces]=\"popularPlaces\" class=\"popup\" [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" *ngIf=\"cityPopupActive\">\n        </app-city-search-popup>\n    </div>\n</div>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}@media (min-width:991px){.search-container{height:42px;border-radius:2px;-webkit-transition:.3s;transition:.3s}.search-container .left-section{background-color:#ededed;border-radius:4px}.search-container .left-section input{-webkit-transition:.3s;transition:.3s}.search-container .left-section input:focus{background:#fafafa}.search-container .left-section .suggestions{top:100%;left:0;background:#fafafa;border-top:1px solid rgba(151,151,151,.4)}.search-container .left-section .suggestions ul{margin:2% 0}.search-container .left-section .suggestions ul li{color:#636363;-webkit-transition:.15s;transition:.15s;border-bottom:1px solid rgba(151,151,151,.25)}.search-container .left-section .suggestions ul li.list-head{font-size:10px;color:#636363;border:none;font-weight:400}.search-container .left-section .suggestions ul li.list-head:hover{background:#fafafa}.search-container .left-section .suggestions ul li .avatar{border-radius:50%;height:41px;width:41px}.search-container .left-section .suggestions ul li:hover{background:#ededed}.search-container .city-search-container{-webkit-transition:.3s;transition:.3s;max-width:33.33%}.search-container .city-search-container.active{background:#fafafa;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .city-search-container .popup{position:absolute;top:135%;width:135%;left:-34%}.search-container.active .left-section{background:#fafafa;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container.active .suggestions{box-shadow:0 11px 15px 0 rgba(0,0,0,.15)}}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService, HeaderService, PlaceService, TimeService, DatePipe])
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sS0FBSyxxQkFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFFbEYsSUFBTSxhQUFhLEdBQUcscUJBQXFCLENBQUM7QUFPNUM7SUEyQkkseUJBQW9CLGNBQThCLEVBQVUsYUFBNEIsRUFBVSxZQUEwQixFQUFVLFdBQXdCLEVBQVMsUUFBa0I7UUFBekwsaUJBTUM7UUFObUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXJCekwscUJB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QUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBOUowQztRQUExQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUFZLFVBQVU7c0RBQUM7SUFDaEI7UUFBaEQsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUFrQixVQUFVOzREQUFDO0lBQzNCO1FBQWpELFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FBbUIsVUFBVTs2REFBQztJQTJGL0U7UUFEQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OzttREFRMUM7SUF0R1EsZUFBZTtRQUwzQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixtckxBQXNDOztTQUV6QyxDQUFDO2lEQTRCc0MsY0FBYyxFQUF5QixhQUFhLEVBQXdCLFlBQVksRUFBdUIsV0FBVyxFQUFtQixRQUFRO09BM0JoTCxlQUFlLENBa0szQjtJQUFELHNCQUFDO0NBQUEsQUFsS0QsSUFrS0M7U0FsS1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgYWxnb2xpYVNlYXJjaEltcG9ydGVkIGZyb20gJ2FsZ29saWFzZWFyY2gnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgVGltZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdGltZS5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi90cy1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5cbmNvbnN0IGFsZ29saWFzZWFyY2ggPSBhbGdvbGlhU2VhcmNoSW1wb3J0ZWQ7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXNlYXJjaCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2NpdHlJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjaXR5SW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnY2l0eVN1Z2dlc3Rpb25zJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNpdHlTdWdnZXN0aW9uczogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdzZWFyY2hSZXN1bHRzRWxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlYXJjaFJlc3VsdHNFbGU6IEVsZW1lbnRSZWY7XG5cbiAgICBhbGdvbGlhSW5kZXhOYW1lID0gY29uZmlnLmFsZ29saWFJbmRleE5hbWU7XG4gICAgc2VhcmNoVGV4dDogc3RyaW5nO1xuICAgIHNlYXJjaFRleHRDaGFuZ2VkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgY2l0eVNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIGNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICAgIHBsYWNlU2VhcmNoUmVzdWx0czogYW55O1xuICAgIHNlYXJjaFJlc3VsdHM6IGFueTtcbiAgICBhY3RpdmVQbGFjZSA9ICdQdW5lJztcbiAgICBlbXB0eVJlc3VsdCA9IGZhbHNlO1xuICAgIGNpdHlRdWVyeTogc3RyaW5nO1xuICAgIGNpdHlRdWVyeUNoYW5nZWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBhY3RpdmVQbGFjZUJhY2t1cDogc3RyaW5nO1xuICAgIGNsaWVudDogYW55O1xuICAgIGluZGV4OiBhbnk7XG4gICAgaG9tZVVybDogc3RyaW5nO1xuICAgIHJvdXRlcjogUm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgICB1cmxBcnJheTtcbiAgICBob3N0ID0gY29uZmlnLmJhc2VVcmw7XG4gICAgcG9wdWxhclBsYWNlczogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgaGVhZGVyU2VydmljZTogSGVhZGVyU2VydmljZSwgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSwgcHJpdmF0ZSB0aW1lU2VydmljZTogVGltZVNlcnZpY2UsIHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXh0Q2hhbmdlZC5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZSh0ZXh0ID0+IHRoaXMuY2FsbEFsZ29saWEodGV4dCkpO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGFsZ29saWFzZWFyY2goJ0FUNVVCOEZNU1InLCAnYzdlOTQ2ZjViNzQwZWYwMzViZDgyNGY2OWRjYzE2MTInKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuY2xpZW50LmluaXRJbmRleCh0aGlzLmFsZ29saWFJbmRleE5hbWUpO1xuICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICB9XG5cbiAgICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KFwiP1wiKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbEFsZ29saWEgPSAodGV4dCkgPT4ge1xuICAgICAgICB0aGlzLmluZGV4LnNlYXJjaCh7XG4gICAgICAgICAgICBxdWVyeTogdGV4dCxcbiAgICAgICAgICAgIGhpdHNQZXJQYWdlOiA2XG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdCA9IChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBkYXRhLmhpdHM7XG4gICAgICAgIHRoaXMuZW1wdHlSZXN1bHQgPSBkYXRhLmhpdHMubGVuZ3RoID09PSAwO1xuICAgICAgICBjb25zdCBpbnRlcmVzdHMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVsZS5vYmpUeXBlID09PSAna2V5d29yZCcgfHxcbiAgICAgICAgICAgICAgICBlbGUub2JqVHlwZSA9PT0gJ2V2ZW50dHlwZScgfHxcbiAgICAgICAgICAgICAgICBlbGUub2JqVHlwZSA9PT0gJ2NhdGVnb3J5JztcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG9yZ2FuaXplcnMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4gZWxlLm9ialR5cGUgPT09ICdvcmdhbml6ZXInKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gcmVzdWx0cy5maWx0ZXIoZWxlID0+IGVsZS5vYmpUeXBlID09PSAnZXZlbnQnKTtcblxuICAgICAgICBpbnRlcmVzdHMubWFwKGludGVyZXN0ID0+IHtcbiAgICAgICAgICAgIGludGVyZXN0Lm5hbWUgPSBpbnRlcmVzdC5uYW1lICsgJyBFdmVudHMnO1xuICAgICAgICAgICAgaW50ZXJlc3QubG9jYXRpb24gPSB0aGlzLmFjdGl2ZVBsYWNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBvcmdhbml6ZXJzLm1hcChvcmdhbml6ZXIgPT4ge1xuICAgICAgICAgICAgaWYgKCFvcmdhbml6ZXIuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICBvcmdhbml6ZXIuaW1hZ2VVcmwgPSAnaHR0cHM6Ly9zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vdG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL3NlYXJjaC1lbXB0eS1vcmdhbml6ZXIucG5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgb3JnYW5pemVyLnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNvdW50cnkpIHtcbiAgICAgICAgICAgICAgICBvcmdhbml6ZXIubG9jYXRpb24gPSBvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY291bnRyeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnRzLm1hcChldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50LmltYWdlVXJsKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuaW1hZ2VVcmwgPSAnaHR0cHM6Ly9zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vdG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL3NlYXJjaC1lbXB0eS1ldmVudC5wbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzICYmIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNpdHkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5sb2NhdGlvbiA9IGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZVRpbWUgPSBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5zdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgc3RhcnREYXRlVGltZSA9IHRoaXMudGltZVNlcnZpY2UuY29udmVydERhdGVUb1RpbWV6b25lKHN0YXJ0RGF0ZVRpbWUsIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLmV2ZW50VGltZVpvbmUpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLnN0YXJ0VGltZSA9IHRoaXMuZGF0ZXBpcGUudHJhbnNmb3JtKHN0YXJ0RGF0ZVRpbWUsICdkIE1NTSB5eXl5LCBcXCcgXFwnaDptbWEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0geyAnaW50ZXJlc3RzJzogaW50ZXJlc3RzLCAnb3JnYW5pemVycyc6IG9yZ2FuaXplcnMsICdldmVudHMnOiBldmVudHMgfTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgY2xpY2tvdXQoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNpdHlTdWdnZXN0aW9ucy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0c0VsZSAmJiAhdGhpcy5zZWFyY2hSZXN1bHRzRWxlLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdmlnYXRlVG9MaXN0aW5nID0gKGludGVyZXN0OiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKGludGVyZXN0WydzZWNvbmRhcnlUZXh0UHJvcGVydGllcyddICYmIGludGVyZXN0WydzZWNvbmRhcnlUZXh0UHJvcGVydGllcyddWydpc09ubGluZSddKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9vbmxpbmUnXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gICAgICAgIGNvbnN0IHN0b3BXb3JkcyA9IFsnZScsICdvJ107XG4gICAgICAgIGxldCBsaXN0aW5nVXJsID0gdGhpcy51cmxBcnJheVswXSArICcvJyArIHRoaXMudXJsQXJyYXlbMV07XG4gICAgICAgIGlmICh0aGlzLnVybEFycmF5ICYmIHRoaXMudXJsQXJyYXkubGVuZ3RoID4gMSAmJiBzdG9wV29yZHMuaW5kZXhPZih0aGlzLnVybEFycmF5WzBdKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtsaXN0aW5nVXJsICsgJy8nICsgaW50ZXJlc3RbJ3VybENvZGUnXV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaG9tZVVybCArICcvJyArIGludGVyZXN0Wyd1cmxDb2RlJ11dKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FdmVudFBhZ2UgPSAoZXZlbnRDb2RlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvZS8nICsgZXZlbnRDb2RlXSk7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VhcmNoID0gKHRleHQpID0+IHtcbiAgICAgICAgaWYgKHRleHQgIT09IHVuZGVmaW5lZCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGV4dENoYW5nZWQubmV4dCh0ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRQb3B1bGFyUGxhY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBKU09OLnBhcnNlKDxhbnk+cmVzKVsnY291bnRyeSddO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSB8fCB0aGlzLnVybEFycmF5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGFyUGxhY2VzID0gZGF0YVsnZGF0YSddLnNsaWNlKDAsIDYpLm1hcChlbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLnR5cGUgPSAnY2l0eSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUuY2l0eUNvZGUgPSBlbGUuY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICAgICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVsnY3VycmVudFBsYWNlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gZGF0YVsnY3VycmVudFBsYWNlJ107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVsnY291bnRyeSddICYmIGRhdGFbJ2NpdHknXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob21lVXJsID0gKCcvJyArIGRhdGFbJ2NvdW50cnknXSArICcvJyArIGRhdGFbJ2NpdHknXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=