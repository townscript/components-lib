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
const algoliasearch = algoliaSearchImported;
let SearchComponent = class SearchComponent {
    constructor(headerService, placeService, timeService, datepipe) {
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
        this.cityQueryChanged = new Subject();
        this.router = config.router;
        this.host = config.baseUrl;
        this.callAlgolia = (text) => {
            this.index.search({
                query: text,
                hitsPerPage: 6
            }).then((data) => {
                this.filterDataForSearchResult(data);
            });
        };
        this.filterDataForSearchResult = (data) => {
            const results = data.hits;
            const interests = results.filter(ele => {
                return ele.objType === 'keyword' ||
                    ele.objType === 'eventtype' ||
                    ele.objType === 'category';
            });
            const organizers = results.filter(ele => ele.objType === 'organizer');
            const events = results.filter(ele => ele.objType === 'event');
            interests.map(interest => {
                interest.name = interest.name + ' Events';
                interest.location = this.activePlace;
            });
            organizers.map(organizer => {
                if (!organizer.imageUrl) {
                    organizer.imageUrl = 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/search-empty-organizer.png';
                }
                if (organizer.secondaryTextProperties && organizer.secondaryTextProperties.country) {
                    organizer.location = organizer.secondaryTextProperties.country;
                }
            });
            events.map(event => {
                if (!event.imageUrl) {
                    event.imageUrl = 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/search-empty-event.png';
                }
                if (event.secondaryTextProperties && event.secondaryTextProperties.city) {
                    event.location = event.secondaryTextProperties.city;
                }
                if (event.secondaryTextProperties && event.secondaryTextProperties.startTime) {
                    let startDateTime = event.secondaryTextProperties.startTime;
                    startDateTime = this.timeService.convertDateToTimezone(startDateTime, event.secondaryTextProperties.eventTimeZone);
                    event.secondaryTextProperties.startTime = this.datepipe.transform(startDateTime, 'd MMM yyyy, \' \'h:mma');
                }
            });
            this.searchResults = { 'interests': interests, 'organizers': organizers, 'events': events };
        };
        this.navigateToListing = (interest) => {
            console.log(this.homeUrl + '/' + interest);
            this.router.navigate([this.homeUrl + '/' + interest]);
            this.searchActive = false;
        };
        this.navigateToEventPage = (eventCode) => {
            this.router.navigate(['/e/' + eventCode]);
            this.searchActive = false;
        };
        this.search = (text) => {
            if (text !== undefined && text.length > 0) {
                this.searchTextChanged.next(text);
            }
        };
        this.getPopularPlaces = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.placeService.place.subscribe((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (res) {
                    let country = '';
                    try {
                        country = JSON.parse(res)['country'];
                    }
                    catch (e) {
                        country = this.urlArray[0];
                    }
                    const data = yield this.headerService.getPopularCities(country);
                    this.popularPlaces = data['data'].slice(0, 6).map(ele => {
                        ele.type = 'city';
                        ele.cityCode = ele.code;
                        return ele;
                    });
                    console.log(this.popularPlaces);
                }
            }));
        });
        this.searchTextChanged.pipe(debounceTime(300)).subscribe(text => this.callAlgolia(text));
        this.client = algoliasearch('AT5UB8FMSR', 'c7e946f5b740ef035bd824f69dcc1612');
        this.index = this.client.initIndex(this.algoliaIndexName);
        if (this.router.url) {
            this.urlArray = this.router.url.replace('/', '').split('/');
        }
        else {
            this.urlArray = ['in'];
        }
    }
    clickout(event) {
        if (!this.citySuggestions.nativeElement.contains(event.target)) {
            this.cityPopupActive = false;
        }
        if (this.searchResultsEle && !this.searchResultsEle.nativeElement.contains(event.target)) {
            this.searchActive = false;
        }
    }
    ngOnInit() {
        this.getPopularPlaces();
        this.placeService.place.subscribe(res => {
            if (res) {
                const data = JSON.parse(res);
                this.activePlace = data['currentPlace'];
                this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
            }
        });
    }
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
        template: "<div class=\"w-full lg:flex search-container relative\" [class.active]=\"searchActive\">\n    <div #searchResultsEle class=\"w-2/3 p-2 flex items-center relative left-section\">\n        <i class=\"mdi mdi-magnify text-2xl color-blue p-2\"></i>\n        <input appDataAnalytics eventLabel=\"search\" clickLocation=\"\" [(ngModel)]=\"searchText\"\n            (ngModelChange)=\"search($event)\" (focus)=\"searchActive = true;citySearchActive=false\"\n            class=\"text-sm w-full h-full bg-transparent  p-2\" type=\"text\"\n            placeholder=\"Search for an Event, Interest or Organizer\" />\n        <div class=\"suggestions enter-slide-bottom w-full p-2 absolute\" *ngIf=\"searchResults && searchActive\">\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.interests.length>0\">\n                <li class=\"list-head\">\n                    INTERESTS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" (click)=\"navigateToListing(interest.urlCode)\"\n                    *ngFor=\"let interest of searchResults.interests\">\n                    <div class=\"flex items-center\">\n                        <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ interest.imageUrl +')'\">\n                        </div>\n                        <div>\n                            <span class=\"mb-1 block\">{{interest.name | titlecase}} </span>\n                            <div class=\"flex items-center\" *ngIf=\"interest.location\">\n                                <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                <small class=\"capitalize\">{{interest.location}}</small>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.events.length>0\">\n                <li class=\"list-head\">\n                    EVENTS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" *ngFor=\"let event of searchResults.events\"\n                    (click)=\"navigateToEventPage(event.urlCode)\">\n                    <div class=\"flex items-center\">\n                        <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ event.imageUrl +')'\"></div>\n                        <div>\n                            <span class=\"mb-1 block\">{{event.name | titlecase}} </span>\n                            <div class=\"flex items-center\">\n                                <div class=\"flex items-center\" *ngIf=\"event.location\">\n                                    <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                    <small>{{event.location}}</small>\n                                </div>\n                                <div class=\"flex items-center ml-2\" *ngIf=\"event?.secondaryTextProperties?.startTime\">\n                                    <i class=\"mdi mdi-calendar-today color-blue mr-1\"></i>\n                                    <small>{{event.secondaryTextProperties.startTime}}</small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.organizers.length>0\">\n                <li class=\"list-head\">\n                    ORGANIZERS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" *ngFor=\"let organizer of searchResults.organizers\">\n                    <a [href]=\"host+'o/'+organizer.urlCode\">\n                        <div class=\"flex items-center\">\n                            <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ organizer.imageUrl +')'\">\n                            </div>\n                            <div>\n                                <span class=\"mb-1 block\">{{organizer.name | titlecase}} </span>\n                                <div class=\"flex items-center\" *ngIf=\"organizer.location\">\n                                    <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                    <small>{{organizer.location}}</small>\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div appDataAnalytics eventLabel=\"location\" clickLocation=\"\" #citySuggestions\n        class=\"w-auto flex items-center py-2  px-4 cursor-pointer relative city-search-container\"\n        [class.active]=\"cityPopupActive\" (click)=\"cityPopupActive = true\">\n        <div class=\"flex items-center w-10/12 mr-2 \" [title]=\" activePlace\">\n            <i class=\"mdi mdi-map-marker text-2xl color-blue\"></i>\n            <span class=\"truncate capitalize\">{{activePlace}}</span>\n        </div>\n        <i class=\"mdi mdi-chevron-down text-2xl\"></i>\n        <app-city-search-popup [popularPlaces]=\"popularPlaces\" class=\"popup\" [(cityPopupActive)]=\"cityPopupActive\"\n            [(activePlace)]=\"activePlace\" *ngIf=\"cityPopupActive\">\n        </app-city-search-popup>\n    </div>\n</div>",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}@media (min-width:991px){.search-container{height:42px;border-radius:2px;-webkit-transition:.3s;transition:.3s}.search-container .left-section{background-color:#ededed;border-radius:4px}.search-container .left-section input{-webkit-transition:.3s;transition:.3s}.search-container .left-section input:focus{background:#fafafa}.search-container .left-section .suggestions{top:100%;left:0;background:#fafafa;border-top:1px solid rgba(151,151,151,.4)}.search-container .left-section .suggestions ul{margin:2% 0}.search-container .left-section .suggestions ul li{color:#636363;-webkit-transition:.15s;transition:.15s;border-bottom:1px solid rgba(151,151,151,.25)}.search-container .left-section .suggestions ul li.list-head{font-size:10px;color:#636363;border:none;font-weight:400}.search-container .left-section .suggestions ul li.list-head:hover{background:#fafafa}.search-container .left-section .suggestions ul li .avatar{border-radius:50%;height:41px;width:41px}.search-container .left-section .suggestions ul li:hover{background:#ededed}.search-container .city-search-container{-webkit-transition:.3s;transition:.3s;max-width:33.33%}.search-container .city-search-container.active{background:#fafafa;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .city-search-container .popup{position:absolute;top:135%;width:135%;left:-34%}.search-container.active .left-section{background:#fafafa;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container.active .suggestions{box-shadow:0 11px 15px 0 rgba(0,0,0,.15)}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [HeaderService, PlaceService, TimeService, DatePipe])
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sS0FBSyxxQkFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRCxNQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQztBQU81QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBMEJ4QixZQUFvQixhQUE0QixFQUFVLFlBQTBCLEVBQVUsV0FBd0IsRUFBUyxRQUFrQjtRQUE3SCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBcEJqSixxQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFFM0Msc0JBQWlCLEdBQW9CLElBQUksT0FBTyxFQUFVLENB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LENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzdFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUosQ0FBQTtBQTlJOEM7SUFBMUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FBWSxVQUFVO2tEQUFDO0FBQ2hCO0lBQWhELFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzQ0FBa0IsVUFBVTt3REFBQztBQUMzQjtJQUFqRCxTQUFTLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7c0NBQW1CLFVBQVU7eURBQUM7QUFxRi9FO0lBREMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7K0NBUTFDO0FBaEdRLGVBQWU7SUFMM0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsd3NLQUFzQzs7S0FFekMsQ0FBQzs2Q0EyQnFDLGFBQWEsRUFBd0IsWUFBWSxFQUF1QixXQUFXLEVBQW1CLFFBQVE7R0ExQnhJLGVBQWUsQ0FnSjNCO1NBaEpZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGFsZ29saWFTZWFyY2hJbXBvcnRlZCBmcm9tICdhbGdvbGlhc2VhcmNoJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3RpbWUuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdHMtaGVhZGVyLnNlcnZpY2UnO1xuXG5jb25zdCBhbGdvbGlhc2VhcmNoID0gYWxnb2xpYVNlYXJjaEltcG9ydGVkO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1zZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlYXJjaC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdjaXR5SW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSkgY2l0eUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2NpdHlTdWdnZXN0aW9ucycsIHsgc3RhdGljOiBmYWxzZSB9KSBjaXR5U3VnZ2VzdGlvbnM6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoUmVzdWx0c0VsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hSZXN1bHRzRWxlOiBFbGVtZW50UmVmO1xuXG4gICAgYWxnb2xpYUluZGV4TmFtZSA9IGNvbmZpZy5hbGdvbGlhSW5kZXhOYW1lO1xuICAgIHNlYXJjaFRleHQ6IHN0cmluZztcbiAgICBzZWFyY2hUZXh0Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIGNpdHlTZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICBjaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICBwbGFjZVNlYXJjaFJlc3VsdHM6IGFueTtcbiAgICBzZWFyY2hSZXN1bHRzOiBhbnk7XG4gICAgYWN0aXZlUGxhY2UgPSAnUHVuZSc7XG4gICAgY2l0eVF1ZXJ5OiBzdHJpbmc7XG4gICAgY2l0eVF1ZXJ5Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGFjdGl2ZVBsYWNlQmFja3VwOiBzdHJpbmc7XG4gICAgY2xpZW50OiBhbnk7XG4gICAgaW5kZXg6IGFueTtcbiAgICBob21lVXJsOiBzdHJpbmc7XG4gICAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICAgIHVybEFycmF5O1xuICAgIGhvc3QgPSBjb25maWcuYmFzZVVybDtcbiAgICBwb3B1bGFyUGxhY2VzOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhlYWRlclNlcnZpY2U6IEhlYWRlclNlcnZpY2UsIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgdGltZVNlcnZpY2U6IFRpbWVTZXJ2aWNlLCBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dENoYW5nZWQucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApKS5zdWJzY3JpYmUodGV4dCA9PiB0aGlzLmNhbGxBbGdvbGlhKHRleHQpKTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBhbGdvbGlhc2VhcmNoKCdBVDVVQjhGTVNSJywgJ2M3ZTk0NmY1Yjc0MGVmMDM1YmQ4MjRmNjlkY2MxNjEyJyk7XG4gICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmNsaWVudC5pbml0SW5kZXgodGhpcy5hbGdvbGlhSW5kZXhOYW1lKTtcbiAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCkge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IHRoaXMucm91dGVyLnVybC5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbEFsZ29saWEgPSAodGV4dCkgPT4ge1xuICAgICAgICB0aGlzLmluZGV4LnNlYXJjaCh7XG4gICAgICAgICAgICBxdWVyeTogdGV4dCxcbiAgICAgICAgICAgIGhpdHNQZXJQYWdlOiA2XG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlsdGVyRGF0YUZvclNlYXJjaFJlc3VsdCA9IChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBkYXRhLmhpdHM7XG4gICAgICAgIGNvbnN0IGludGVyZXN0cyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZWxlLm9ialR5cGUgPT09ICdrZXl3b3JkJyB8fFxuICAgICAgICAgICAgICAgIGVsZS5vYmpUeXBlID09PSAnZXZlbnR0eXBlJyB8fFxuICAgICAgICAgICAgICAgIGVsZS5vYmpUeXBlID09PSAnY2F0ZWdvcnknO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb3JnYW5pemVycyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiBlbGUub2JqVHlwZSA9PT0gJ29yZ2FuaXplcicpO1xuICAgICAgICBjb25zdCBldmVudHMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4gZWxlLm9ialR5cGUgPT09ICdldmVudCcpO1xuXG4gICAgICAgIGludGVyZXN0cy5tYXAoaW50ZXJlc3QgPT4ge1xuICAgICAgICAgICAgaW50ZXJlc3QubmFtZSA9IGludGVyZXN0Lm5hbWUgKyAnIEV2ZW50cyc7XG4gICAgICAgICAgICBpbnRlcmVzdC5sb2NhdGlvbiA9IHRoaXMuYWN0aXZlUGxhY2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9yZ2FuaXplcnMubWFwKG9yZ2FuaXplciA9PiB7XG4gICAgICAgICAgICBpZiAoIW9yZ2FuaXplci5pbWFnZVVybCkge1xuICAgICAgICAgICAgICAgIG9yZ2FuaXplci5pbWFnZVVybCA9ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvc2VhcmNoLWVtcHR5LW9yZ2FuaXplci5wbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY291bnRyeSkge1xuICAgICAgICAgICAgICAgIG9yZ2FuaXplci5sb2NhdGlvbiA9IG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5jb3VudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudHMubWFwKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghZXZlbnQuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICBldmVudC5pbWFnZVVybCA9ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvc2VhcmNoLWVtcHR5LWV2ZW50LnBuZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY2l0eSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmxvY2F0aW9uID0gZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY2l0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5zdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlVGltZSA9IGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLnN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICBzdGFydERhdGVUaW1lID0gdGhpcy50aW1lU2VydmljZS5jb252ZXJ0RGF0ZVRvVGltZXpvbmUoc3RhcnREYXRlVGltZSwgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuZXZlbnRUaW1lWm9uZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuc3RhcnRUaW1lID0gdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0oc3RhcnREYXRlVGltZSwgJ2QgTU1NIHl5eXksIFxcJyBcXCdoOm1tYScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB7ICdpbnRlcmVzdHMnOiBpbnRlcmVzdHMsICdvcmdhbml6ZXJzJzogb3JnYW5pemVycywgJ2V2ZW50cyc6IGV2ZW50cyB9O1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja291dChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY2l0eVN1Z2dlc3Rpb25zLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHRzRWxlICYmICF0aGlzLnNlYXJjaFJlc3VsdHNFbGUubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0xpc3RpbmcgPSAoaW50ZXJlc3QpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ob21lVXJsICsgJy8nICsgaW50ZXJlc3QpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lVXJsICsgJy8nICsgaW50ZXJlc3RdKTtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvRXZlbnRQYWdlID0gKGV2ZW50Q29kZSkgPT4ge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9lLycgKyBldmVudENvZGVdKTtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWFyY2ggPSAodGV4dCkgPT4ge1xuICAgICAgICBpZiAodGV4dCAhPT0gdW5kZWZpbmVkICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0Q2hhbmdlZC5uZXh0KHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFBvcHVsYXJQbGFjZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50cnkgPSAnJztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gSlNPTi5wYXJzZSg8YW55PnJlcylbJ2NvdW50cnknXTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnkgPSB0aGlzLnVybEFycmF5WzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGFyUGxhY2VzID0gZGF0YVsnZGF0YSddLnNsaWNlKDAsIDYpLm1hcChlbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbGUudHlwZSA9ICdjaXR5JztcbiAgICAgICAgICAgICAgICAgICAgZWxlLmNpdHlDb2RlID0gZWxlLmNvZGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wb3B1bGFyUGxhY2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICAgICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBkYXRhWydjdXJyZW50UGxhY2UnXTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbWVVcmwgPSAoJy8nICsgZGF0YVsnY291bnRyeSddICsgJy8nICsgZGF0YVsnY2l0eSddKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==