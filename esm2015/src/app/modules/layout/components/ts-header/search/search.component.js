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
const algoliasearch = algoliaSearchImported;
let SearchComponent = class SearchComponent {
    constructor(utilityService, headerService, placeService, timeService, datepipe) {
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
        this.buildUrlArray = () => {
            if (this.router.url) {
                this.urlArray = this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                this.urlArray = ['in'];
            }
        };
        this.callAlgolia = (text) => {
            this.index.search({
                query: text,
                hitsPerPage: 6
            }).then((data) => {
                this.filterDataForSearchResult(data);
            });
        };
        this.fetchSuggestions = (text) => {
            this.intentSelected = false;
            this.headerService.getSuggestions(text).then((data) => {
                this.searchResults = data.data;
                this.keyboardEventsManager = new ListKeyManager(this.listItems);
                this.initKeyManagerHandlers();
            });
        };
        this.suggestionSelected = (event) => {
            this.chooseSuggestion(event.suggestion);
        };
        this.initKeyManagerHandlers = () => {
            this.keyboardEventsManager
                .change
                .subscribe((activeIndex) => {
                this.listItems.map((item, index) => {
                    item.setActive(activeIndex === index);
                    // if(item.isActive == true && index !== activeIndex) {
                    //     item.setActive(false);
                    // }
                    return item;
                });
            });
        };
        this.hoverOnSuggestion = (indexOfItemhoveredOn) => {
            console.log(indexOfItemhoveredOn);
            this.searchActive = true;
            var activeItem = this.keyboardEventsManager.activeItem;
            if (activeItem)
                activeItem.setActive(false);
            this.keyboardEventsManager.setActiveItem(indexOfItemhoveredOn);
            this.keyboardEventsManager.activeItem.setActive(true);
        };
        this.chooseSuggestion = (text) => {
            if (!this.searchText)
                return;
            this.typedSearchText = this.searchText;
            this.searchText = text;
            this.addOrUpdateTSSuggestions();
            this.goToSearchResultsPage();
        };
        this.addOrUpdateTSSuggestions = () => {
            this.headerService.postSuggestions(this.searchText);
        };
        this.goToSearchResultsPage = () => {
            this.searchActive = false;
            this.intentSelected = true;
            var encodedSearchText = this.searchText.replace(/ +/g, '-');
            var encodedCurrentPlace = this.activePlace.replace(/ +/g, '-');
            var queryParams = {};
            if (this.activePlace) {
                queryParams['place'] = encodedCurrentPlace;
            }
            if (encodedSearchText) {
                queryParams['q'] = encodedSearchText;
            }
            const navigationExtras = {
                state: {
                    typedText: this.typedSearchText,
                    suggestions: this.searchResults
                },
                queryParams: queryParams
            };
            this.router.navigate(['/search'], navigationExtras);
        };
        this.filterDataForSearchResult = (data) => {
            const results = data.hits;
            this.emptyResult = data.hits.length === 0;
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
            if (interest['secondaryTextProperties'] && interest['secondaryTextProperties']['isOnline']) {
                this.router.navigate(['/online']);
                return;
            }
            this.buildUrlArray();
            const stopWords = ['e', 'o'];
            let listingUrl = this.urlArray[0] + '/' + this.urlArray[1];
            if (this.urlArray && this.urlArray.length > 1 && stopWords.indexOf(this.urlArray[0]) === -1) {
                this.router.navigate([listingUrl + '/' + interest['urlCode']]);
            }
            else {
                this.router.navigate([this.homeUrl + '/' + interest['urlCode']]);
            }
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
                    if (this.utilityService.IsJsonString(res)) {
                        const country = JSON.parse(res)['country'];
                        const data = yield this.headerService.getPopularCities(country || this.urlArray[0]);
                        this.popularPlaces = data['data'].slice(0, 6).map(ele => {
                            ele.type = 'city';
                            ele.cityCode = ele.code;
                            return ele;
                        });
                    }
                }
            }));
        });
        this.searchTextChanged.pipe(debounceTime(300)).subscribe(text => this.fetchSuggestions(text));
        this.client = algoliasearch('AT5UB8FMSR', 'c7e946f5b740ef035bd824f69dcc1612');
        this.index = this.client.initIndex(this.algoliaIndexName);
        this.buildUrlArray();
    }
    clickout(event) {
        if (!this.citySuggestions.nativeElement.contains(event.target)) {
            this.cityPopupActive = false;
        }
        if (this.searchResultsEle && !this.searchResultsEle.nativeElement.contains(event.target)) {
            this.searchActive = false;
        }
    }
    handleKeydown(event) {
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
    }
    ngOnInit() {
        this.getPopularPlaces();
        this.placeService.place.subscribe(res => {
            if (res) {
                if (this.utilityService.IsJsonString(res)) {
                    const data = JSON.parse(res);
                    if (data['currentPlace'] != undefined) {
                        this.activePlace = data['currentPlace'];
                    }
                    else if (data['countryName'] !== undefined) {
                        this.activePlace = data['countryName'];
                    }
                    if (data && data['country'] && data['city']) {
                        this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
                    }
                }
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
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3NlYXJjaC9zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQy9ILE9BQU8sS0FBSyxxQkFBcUIsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUc3RixNQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQztBQU81QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBZ0N4QixZQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQVUsWUFBMEIsRUFBVSxXQUF3QixFQUFTLFFBQWtCO1FBQXJLLG1C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QVEsRUFBRSxZQUFZO1FBQ3RCLDI2RkFBc0M7O0tBRXpDLENBQUM7NkNBaUNzQyxjQUFjLEVBQXlCLGFBQWEsRUFBd0IsWUFBWSxFQUF1QixXQUFXLEVBQW1CLFFBQVE7R0FoQ2hMLGVBQWUsQ0FtUTNCO1NBblFZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBhbGdvbGlhU2VhcmNoSW1wb3J0ZWQgZnJvbSAnYWxnb2xpYXNlYXJjaCc7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3RpbWUuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdHMtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGlzdEtleU1hbmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBTZWFyY2hTdWdnZXN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vc2VhcmNoLXN1Z2dlc3Rpb24vc2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ3Byb3RyYWN0b3InO1xuXG5jb25zdCBhbGdvbGlhc2VhcmNoID0gYWxnb2xpYVNlYXJjaEltcG9ydGVkO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1zZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlYXJjaC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdjaXR5SW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSkgY2l0eUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2NpdHlTdWdnZXN0aW9ucycsIHsgc3RhdGljOiBmYWxzZSB9KSBjaXR5U3VnZ2VzdGlvbnM6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoUmVzdWx0c0VsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hSZXN1bHRzRWxlOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaFRleHRJbnB1dEVsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hUZXh0SW5wdXRFbGU6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZHJlbihTZWFyY2hTdWdnZXN0aW9uQ29tcG9uZW50KSBsaXN0SXRlbXMhOiBRdWVyeUxpc3Q8U2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudD47XG4gICAgQElucHV0KCkgc2VhcmNoVGV4dDogc3RyaW5nID0gJyc7XG4gICAgYWxnb2xpYUluZGV4TmFtZSA9IGNvbmZpZy5hbGdvbGlhSW5kZXhOYW1lO1xuICAgIC8vIHNlYXJjaFRleHQ6IHN0cmluZyA9IFwiXCI7XG4gICAga2V5Ym9hcmRFdmVudHNNYW5hZ2VyOiBMaXN0S2V5TWFuYWdlcjxhbnk+O1xuICAgIHR5cGVkU2VhcmNoVGV4dDogc3RyaW5nID0gXCJcIjtcbiAgICBzZWFyY2hUZXh0Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgIGNpdHlTZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICBjaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICBwbGFjZVNlYXJjaFJlc3VsdHM6IGFueTtcbiAgICBzZWFyY2hSZXN1bHRzOiBhbnk7XG4gICAgYWN0aXZlUGxhY2UgPSAnUHVuZSc7XG4gICAgZW1wdHlSZXN1bHQgPSBmYWxzZTtcbiAgICBjaXR5UXVlcnk6IHN0cmluZztcbiAgICBjaXR5UXVlcnlDaGFuZ2VkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgYWN0aXZlUGxhY2VCYWNrdXA6IHN0cmluZztcbiAgICBjbGllbnQ6IGFueTtcbiAgICBpbmRleDogYW55O1xuICAgIGhvbWVVcmw6IHN0cmluZztcbiAgICByb3V0ZXI6IFJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG4gICAgdXJsQXJyYXk7XG4gICAgaG9zdCA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIHBvcHVsYXJQbGFjZXM6IGFueTtcbiAgICBpbnRlbnRTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgaGVhZGVyU2VydmljZTogSGVhZGVyU2VydmljZSwgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSwgcHJpdmF0ZSB0aW1lU2VydmljZTogVGltZVNlcnZpY2UsIHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXh0Q2hhbmdlZC5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZSh0ZXh0ID0+IHRoaXMuZmV0Y2hTdWdnZXN0aW9ucyh0ZXh0KSk7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gYWxnb2xpYXNlYXJjaCgnQVQ1VUI4Rk1TUicsICdjN2U5NDZmNWI3NDBlZjAzNWJkODI0ZjY5ZGNjMTYxMicpO1xuICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5jbGllbnQuaW5pdEluZGV4KHRoaXMuYWxnb2xpYUluZGV4TmFtZSk7XG4gICAgICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICAgIH1cblxuICAgIGJ1aWxkVXJsQXJyYXkgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsQWxnb2xpYSA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIHRoaXMuaW5kZXguc2VhcmNoKHtcbiAgICAgICAgICAgIHF1ZXJ5OiB0ZXh0LFxuICAgICAgICAgICAgaGl0c1BlclBhZ2U6IDZcbiAgICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhRm9yU2VhcmNoUmVzdWx0KGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmZXRjaFN1Z2dlc3Rpb25zID0gKHRleHQpID0+IHtcbiAgICAgICAgdGhpcy5pbnRlbnRTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0U3VnZ2VzdGlvbnModGV4dCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gZGF0YS5kYXRhO1xuICAgICAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIgPSBuZXcgTGlzdEtleU1hbmFnZXI8YW55Pih0aGlzLmxpc3RJdGVtcyk7XG4gICAgICAgICAgICB0aGlzLmluaXRLZXlNYW5hZ2VySGFuZGxlcnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3VnZ2VzdGlvblNlbGVjdGVkID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2hvb3NlU3VnZ2VzdGlvbihldmVudC5zdWdnZXN0aW9uKTtcbiAgICB9XG5cbiAgICBpbml0S2V5TWFuYWdlckhhbmRsZXJzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlclxuICAgICAgICAgICAgLmNoYW5nZVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoYWN0aXZlSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0QWN0aXZlKGFjdGl2ZUluZGV4ID09PSBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGl0ZW0uaXNBY3RpdmUgPT0gdHJ1ZSAmJiBpbmRleCAhPT0gYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGl0ZW0uc2V0QWN0aXZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhvdmVyT25TdWdnZXN0aW9uID0gKGluZGV4T2ZJdGVtaG92ZXJlZE9uKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4T2ZJdGVtaG92ZXJlZE9uKTtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgICAgICB2YXIgYWN0aXZlSXRlbSA9IHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgICAgIGlmIChhY3RpdmVJdGVtKSBhY3RpdmVJdGVtLnNldEFjdGl2ZShmYWxzZSk7XG4gICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oaW5kZXhPZkl0ZW1ob3ZlcmVkT24pO1xuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlci5hY3RpdmVJdGVtLnNldEFjdGl2ZSh0cnVlKTtcbiAgICB9XG5cbiAgICBjaG9vc2VTdWdnZXN0aW9uID0gKHRleHQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnNlYXJjaFRleHQpIHJldHVybjtcbiAgICAgICAgdGhpcy50eXBlZFNlYXJjaFRleHQgPSB0aGlzLnNlYXJjaFRleHQ7XG4gICAgICAgIHRoaXMuc2VhcmNoVGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVUU1N1Z2dlc3Rpb25zKCk7XG4gICAgICAgIHRoaXMuZ29Ub1NlYXJjaFJlc3VsdHNQYWdlKCk7XG4gICAgfVxuXG4gICAgYWRkT3JVcGRhdGVUU1N1Z2dlc3Rpb25zID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2UucG9zdFN1Z2dlc3Rpb25zKHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgfVxuXG5cbiAgICBnb1RvU2VhcmNoUmVzdWx0c1BhZ2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW50ZW50U2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZW5jb2RlZFNlYXJjaFRleHQgPSB0aGlzLnNlYXJjaFRleHQucmVwbGFjZSgvICsvZywgJy0nKTtcbiAgICAgICAgdmFyIGVuY29kZWRDdXJyZW50UGxhY2UgPSB0aGlzLmFjdGl2ZVBsYWNlLnJlcGxhY2UoLyArL2csICctJylcbiAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVBsYWNlKSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtc1sncGxhY2UnXSA9IGVuY29kZWRDdXJyZW50UGxhY2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuY29kZWRTZWFyY2hUZXh0KSB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtc1sncSddID0gZW5jb2RlZFNlYXJjaFRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgdHlwZWRUZXh0OiB0aGlzLnR5cGVkU2VhcmNoVGV4dCxcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uczogdGhpcy5zZWFyY2hSZXN1bHRzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHF1ZXJ5UGFyYW1zXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3NlYXJjaCddLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhRm9yU2VhcmNoUmVzdWx0ID0gKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGRhdGEuaGl0cztcbiAgICAgICAgdGhpcy5lbXB0eVJlc3VsdCA9IGRhdGEuaGl0cy5sZW5ndGggPT09IDA7XG4gICAgICAgIGNvbnN0IGludGVyZXN0cyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZWxlLm9ialR5cGUgPT09ICdrZXl3b3JkJyB8fFxuICAgICAgICAgICAgICAgIGVsZS5vYmpUeXBlID09PSAnZXZlbnR0eXBlJyB8fFxuICAgICAgICAgICAgICAgIGVsZS5vYmpUeXBlID09PSAnY2F0ZWdvcnknO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb3JnYW5pemVycyA9IHJlc3VsdHMuZmlsdGVyKGVsZSA9PiBlbGUub2JqVHlwZSA9PT0gJ29yZ2FuaXplcicpO1xuICAgICAgICBjb25zdCBldmVudHMgPSByZXN1bHRzLmZpbHRlcihlbGUgPT4gZWxlLm9ialR5cGUgPT09ICdldmVudCcpO1xuXG4gICAgICAgIGludGVyZXN0cy5tYXAoaW50ZXJlc3QgPT4ge1xuICAgICAgICAgICAgaW50ZXJlc3QubmFtZSA9IGludGVyZXN0Lm5hbWUgKyAnIEV2ZW50cyc7XG4gICAgICAgICAgICBpbnRlcmVzdC5sb2NhdGlvbiA9IHRoaXMuYWN0aXZlUGxhY2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9yZ2FuaXplcnMubWFwKG9yZ2FuaXplciA9PiB7XG4gICAgICAgICAgICBpZiAoIW9yZ2FuaXplci5pbWFnZVVybCkge1xuICAgICAgICAgICAgICAgIG9yZ2FuaXplci5pbWFnZVVybCA9ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvc2VhcmNoLWVtcHR5LW9yZ2FuaXplci5wbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBvcmdhbml6ZXIuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY291bnRyeSkge1xuICAgICAgICAgICAgICAgIG9yZ2FuaXplci5sb2NhdGlvbiA9IG9yZ2FuaXplci5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5jb3VudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudHMubWFwKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmICghZXZlbnQuaW1hZ2VVcmwpIHtcbiAgICAgICAgICAgICAgICBldmVudC5pbWFnZVVybCA9ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvc2VhcmNoLWVtcHR5LWV2ZW50LnBuZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMgJiYgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY2l0eSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmxvY2F0aW9uID0gZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuY2l0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcyAmJiBldmVudC5zZWNvbmRhcnlUZXh0UHJvcGVydGllcy5zdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlVGltZSA9IGV2ZW50LnNlY29uZGFyeVRleHRQcm9wZXJ0aWVzLnN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICBzdGFydERhdGVUaW1lID0gdGhpcy50aW1lU2VydmljZS5jb252ZXJ0RGF0ZVRvVGltZXpvbmUoc3RhcnREYXRlVGltZSwgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuZXZlbnRUaW1lWm9uZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc2Vjb25kYXJ5VGV4dFByb3BlcnRpZXMuc3RhcnRUaW1lID0gdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0oc3RhcnREYXRlVGltZSwgJ2QgTU1NIHl5eXksIFxcJyBcXCdoOm1tYScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB7ICdpbnRlcmVzdHMnOiBpbnRlcmVzdHMsICdvcmdhbml6ZXJzJzogb3JnYW5pemVycywgJ2V2ZW50cyc6IGV2ZW50cyB9O1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja291dChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY2l0eVN1Z2dlc3Rpb25zLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHRzRWxlICYmICF0aGlzLnNlYXJjaFJlc3VsdHNFbGUubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0xpc3RpbmcgPSAoaW50ZXJlc3Q6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoaW50ZXJlc3RbJ3NlY29uZGFyeVRleHRQcm9wZXJ0aWVzJ10gJiYgaW50ZXJlc3RbJ3NlY29uZGFyeVRleHRQcm9wZXJ0aWVzJ11bJ2lzT25saW5lJ10pIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL29ubGluZSddKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICAgICAgY29uc3Qgc3RvcFdvcmRzID0gWydlJywgJ28nXTtcbiAgICAgICAgbGV0IGxpc3RpbmdVcmwgPSB0aGlzLnVybEFycmF5WzBdICsgJy8nICsgdGhpcy51cmxBcnJheVsxXTtcbiAgICAgICAgaWYgKHRoaXMudXJsQXJyYXkgJiYgdGhpcy51cmxBcnJheS5sZW5ndGggPiAxICYmIHN0b3BXb3Jkcy5pbmRleE9mKHRoaXMudXJsQXJyYXlbMF0pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2xpc3RpbmdVcmwgKyAnLycgKyBpbnRlcmVzdFsndXJsQ29kZSddXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lVXJsICsgJy8nICsgaW50ZXJlc3RbJ3VybENvZGUnXV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0V2ZW50UGFnZSA9IChldmVudENvZGU6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9lLycgKyBldmVudENvZGVdKTtcbiAgICAgICAgdGhpcy5zZWFyY2hBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWFyY2ggPSAodGV4dCkgPT4ge1xuICAgICAgICBpZiAodGV4dCAhPT0gdW5kZWZpbmVkICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUZXh0Q2hhbmdlZC5uZXh0KHRleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmtleWJvYXJkRXZlbnRzTWFuYWdlcikge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fCBldmVudC5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5Ym9hcmRFdmVudHNNYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50c01hbmFnZXIuYWN0aXZlSXRlbS5zZWxlY3RJdGVtKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9vc2VTdWdnZXN0aW9uKHRoaXMuc2VhcmNoVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBvcHVsYXJQbGFjZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnRyeSA9IEpTT04ucGFyc2UoPGFueT5yZXMpWydjb3VudHJ5J107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0UG9wdWxhckNpdGllcyhjb3VudHJ5IHx8IHRoaXMudXJsQXJyYXlbMF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXJQbGFjZXMgPSBkYXRhWydkYXRhJ10uc2xpY2UoMCwgNikubWFwKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUudHlwZSA9ICdjaXR5JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5jaXR5Q29kZSA9IGVsZS5jb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZ2V0UG9wdWxhclBsYWNlcygpO1xuICAgICAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSg8YW55PnJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhWydjdXJyZW50UGxhY2UnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBkYXRhWydjdXJyZW50UGxhY2UnXTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhWydjb3VudHJ5TmFtZSddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBkYXRhWydjb3VudHJ5TmFtZSddO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGFbJ2NvdW50cnknXSAmJiBkYXRhWydjaXR5J10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9tZVVybCA9ICgnLycgKyBkYXRhWydjb3VudHJ5J10gKyAnLycgKyBkYXRhWydjaXR5J10pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=