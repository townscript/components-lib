import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HeaderService } from '../../../modules/layout/components/ts-header/ts-header.service';
import { config } from '../../../core/app-config';
import { PlaceService } from '../../../modules/layout/components/ts-header/place.service';
let CitySearchPopupComponent = class CitySearchPopupComponent {
    constructor(placeService, headerService, datepipe) {
        this.placeService = placeService;
        this.headerService = headerService;
        this.datepipe = datepipe;
        this.showArrow = true;
        this.activePlaceChange = new EventEmitter();
        this.cityPopupActiveChange = new EventEmitter();
        this.closeSuggestions = false;
        this.closeSuggestionsChange = new EventEmitter();
        this.citySearchActive = true;
        this.router = config.router;
        this.cityQueryChanged = new Subject();
        this.cityLoading = false;
        this.buildUrlArray = () => {
            if (this.router.url) {
                this.urlArray = this.router.url.split('?')[0].replace('/', '').split('/');
            }
            else {
                this.urlArray = ['in'];
            }
        };
        this.callSearchCity = (query) => {
            this.cityLoading = true;
            this.headerService.getplaceSearchResults(query).subscribe(res => {
                this.placeSearchResults = res['data'];
                this.cityLoading = false;
            });
        };
        this.placeChanged = (place) => {
            const tsType = this.urlArray[2];
            let tsTypeUrl = '';
            if (tsType !== 'upcoming-events') {
                tsTypeUrl = tsType && tsType.length > 0 ? '/' + tsType.toLowerCase() : '';
            }
            let finalUrl = '';
            if (place.type === 'country') {
                finalUrl = '/' + place.twoDigitCode.toLowerCase() +
                    '/' + place.country.split(' ').join('-').toLowerCase() + tsTypeUrl;
            }
            if (place.type === 'city') {
                finalUrl = '/' + place.countryCode.toLowerCase() + '/' + place.cityCode + tsTypeUrl;
            }
            if (place.type === 'locality') {
                finalUrl = '/' + place.countryCode.toLowerCase() + '/' + place.localityCode + '--' + place.cityCode + tsTypeUrl;
            }
            if (place.type === 'unstructured') {
                const name = place.name.replace(/,/g, '').replace(/ /g, '-');
                let secondaryText = '';
                if (place.secondaryText) {
                    secondaryText = '--' + place.secondaryText.replace(/,/g, '').replace(/ /g, '-');
                }
                finalUrl = '/s/' + name + secondaryText + tsTypeUrl;
            }
            console.log(finalUrl);
            this.router.navigate([finalUrl], { state: { place: place } });
            // this.placeService.updatePlace(place.name);
            this.activePlace = place.name;
            this.activePlaceChange.emit(place.name);
            this.cityPopupActive = false;
            this.cityPopupActiveChange.emit(false);
        };
        this.openCityPopup = () => {
            this.cityPopupActive = true;
            this.cityInput.nativeElement.focus();
        };
        this.searchCity = (text) => {
            if (!text || text.length === 0) {
                this.placeSearchResults = [];
            }
            if (text != undefined && text.length > 0) {
                this.cityQueryChanged.next(text);
            }
            this.updateAndEmitCloseCitySuggestion(false);
        };
        this.updateAndEmitCloseCitySuggestion = (val) => {
            this.closeSuggestions = val;
            this.closeSuggestionsChange.emit(this.closeSuggestions);
        };
        this.cityQueryChanged.pipe(debounceTime(300)).subscribe(text => this.callSearchCity(text));
        this.buildUrlArray();
    }
    ngAfterViewInit() {
        this.citySearchActive = true;
        this.cityInput.nativeElement.focus();
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    ViewChild('cityInput', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], CitySearchPopupComponent.prototype, "cityInput", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CitySearchPopupComponent.prototype, "showArrow", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CitySearchPopupComponent.prototype, "activePlace", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], CitySearchPopupComponent.prototype, "activePlaceChange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], CitySearchPopupComponent.prototype, "cityPopupActive", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], CitySearchPopupComponent.prototype, "cityPopupActiveChange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CitySearchPopupComponent.prototype, "popularPlaces", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CitySearchPopupComponent.prototype, "closeSuggestions", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], CitySearchPopupComponent.prototype, "closeSuggestionsChange", void 0);
CitySearchPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-city-search-popup',
        template: "<div class=\"city-suggestions enter-slide-bottom\" [class.arrow]=\"showArrow\">\n    <div class=\"suggestions-container\">\n        <ul>\n            <li [class.active]=\"citySearchActive\" class=\"p-2 capitalize cursor-pointer flex items-center truncate\">\n                <i class=\"mdi mdi-magnify color-blue mr-2 text-base\"></i>\n                <input appDataAnalytics eventLabel=\"locationDropdownSearch\" clickLocation=\"\" #cityInput autocomplete=\"off\" id=\"cityInput\" type=\"text\" placeholder=\"Search for city or area...\" [(ngModel)]=\"cityQuery\" (ngModelChange)=\"searchCity($event)\" (focus)=\"citySearchActive=true\"\n                    class=\"w-full bg-transparent text-sm\" />\n                <i *ngIf=\"cityLoading\" class=\"mdi mdi-loading mdi-spin\"></i>\n            </li>\n            <div *ngIf=\"!closeSuggestions\">\n                <li matRipple (click)=\"placeChanged(place);\" class=\"p-2 capitalize cursor-pointer flex items-center truncate\" *ngFor=\"let place of placeSearchResults\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                    <span class=\"text-sm flex items-baseline truncate\">\n                      <span class=\"text-gray-800 mr-1 whitespace-no-wrap\">{{place.name}} </span>\n                      <small class=\"text-2xs text-gray-600\" *ngIf=\"place.city && place?.city.length>0 && place?.type!='city'\">\n                        {{place.city}},\n                      </small>\n                      <small class=\"text-2xs text-gray-600\" *ngIf=\"place.country && place?.country.length>0 && place?.type!='country'\">{{place.country}}\n                      </small>\n                      <small class=\"text-2xs truncate text-gray-600\">{{place.secondaryText}}</small>\n                    </span>\n                </li>\n            </div>\n            <ng-container matRipple *ngIf=\"!placeSearchResults || placeSearchResults.length==0\">\n                <li appDataAnalytics eventLabel=\"locationDropdownItem\" clickLocation=\"\" (click)=\"placeChanged(city);\" class=\"p-2 cursor-pointer capitalize\" *ngFor=\"let city of popularPlaces\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                    <span class=\"text-gray-800 capitalize text-sm\">{{city.name}}</span>\n                </li>\n            </ng-container>\n        </ul>\n    </div>\n</div>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.city-suggestions{width:100%;background:#fafafa;position:absolute;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.city-suggestions .mdi-spin::before{-webkit-animation-duration:.5s;animation-duration:.5s}.city-suggestions li.active,.city-suggestions li:hover{background:#ededed}.city-suggestions.arrow{border-top:3px solid #3782c4}.city-suggestions.arrow:before{content:\" \";width:10px;position:absolute;top:-7px;left:88%;height:10px;-webkit-filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));background:#ededed;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-top:3px solid #3782c4;border-left:3px solid #3782c4}@media (min-width:991px){.city-suggestions{width:140%;left:-40%}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [PlaceService, HeaderService, DatePipe])
], CitySearchPopupComponent);
export { CitySearchPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWFyY2gtcG9wdXAvY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXJILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDL0YsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQU8xRixJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQXlCakMsWUFBb0IsWUFBMEIsRUFBVSxhQUE0QixFQUFTLFFBQWtCO1FBQTNGLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBdEJ0RyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWhCLHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELDBCQUFxQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5FLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN4QiwyQkFBc0IsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3RSxxQkFBZ0IsR0FB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LHdCQUF3QjtJQUxwQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLGk0RUFBaUQ7O0tBRXBELENBQUM7NkNBMEJvQyxZQUFZLEVBQXlCLGFBQWEsRUFBbUIsUUFBUTtHQXpCdEcsd0JBQXdCLENBMEdwQztTQTFHWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvdHMtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1jaXR5LXNlYXJjaC1wb3B1cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NpdHktc2VhcmNoLXBvcHVwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jaXR5LXNlYXJjaC1wb3B1cC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENpdHlTZWFyY2hQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdjaXR5SW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjaXR5SW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQElucHV0KCkgc2hvd0Fycm93ID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBhY3RpdmVQbGFjZTogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBhY3RpdmVQbGFjZUNoYW5nZTogRXZlbnRFbWl0dGVyPFN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQElucHV0KCkgY2l0eVBvcHVwQWN0aXZlOiBib29sZWFuO1xuICAgIEBPdXRwdXQoKSBjaXR5UG9wdXBBY3RpdmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBASW5wdXQoKSBwb3B1bGFyUGxhY2VzOiBhbnk7XG4gICAgQElucHV0KCkgY2xvc2VTdWdnZXN0aW9ucyA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBjbG9zZVN1Z2dlc3Rpb25zQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjaXR5U2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICBwbGFjZVNlYXJjaFJlc3VsdHM6IGFueTtcblxuICAgIHJvdXRlcjogUm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgICB1cmxBcnJheTogYW55O1xuICAgIGNpdHlRdWVyeTogc3RyaW5nO1xuICAgIGNpdHlRdWVyeUNoYW5nZWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBjbGllbnQ6IGFueTtcbiAgICBjaXR5TG9hZGluZyA9IGZhbHNlO1xuICAgIGluZGV4OiBhbnk7XG5cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSwgcHJpdmF0ZSBoZWFkZXJTZXJ2aWNlOiBIZWFkZXJTZXJ2aWNlLCBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG4gICAgICAgIHRoaXMuY2l0eVF1ZXJ5Q2hhbmdlZC5waXBlKGRlYm91bmNlVGltZSgzMDApKS5zdWJzY3JpYmUodGV4dCA9PiB0aGlzLmNhbGxTZWFyY2hDaXR5KHRleHQpKTtcbiAgICAgICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gICAgfVxuXG4gICAgYnVpbGRVcmxBcnJheSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCkge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IHRoaXMucm91dGVyLnVybC5zcGxpdCgnPycpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsU2VhcmNoQ2l0eSA9IChxdWVyeSkgPT4ge1xuICAgICAgICB0aGlzLmNpdHlMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldHBsYWNlU2VhcmNoUmVzdWx0cyhxdWVyeSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlU2VhcmNoUmVzdWx0cyA9IHJlc1snZGF0YSddO1xuICAgICAgICAgICAgdGhpcy5jaXR5TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwbGFjZUNoYW5nZWQgPSAocGxhY2UpID0+IHtcbiAgICAgICAgY29uc3QgdHNUeXBlID0gdGhpcy51cmxBcnJheVsyXTtcbiAgICAgICAgbGV0IHRzVHlwZVVybCA9ICcnO1xuICAgICAgICBpZiAodHNUeXBlICE9PSAndXBjb21pbmctZXZlbnRzJykge1xuICAgICAgICAgICAgdHNUeXBlVXJsID0gdHNUeXBlICYmIHRzVHlwZS5sZW5ndGggPiAwID8gJy8nICsgdHNUeXBlLnRvTG93ZXJDYXNlKCkgOiAnJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmluYWxVcmwgPSAnJztcbiAgICAgICAgaWYgKHBsYWNlLnR5cGUgPT09ICdjb3VudHJ5Jykge1xuICAgICAgICAgICAgZmluYWxVcmwgPSAnLycgKyBwbGFjZS50d29EaWdpdENvZGUudG9Mb3dlckNhc2UoKSArXG4gICAgICAgICAgICAgICAgJy8nICsgcGxhY2UuY291bnRyeS5zcGxpdCgnICcpLmpvaW4oJy0nKS50b0xvd2VyQ2FzZSgpICsgdHNUeXBlVXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAnY2l0eScpIHtcbiAgICAgICAgICAgIGZpbmFsVXJsID0gJy8nICsgcGxhY2UuY291bnRyeUNvZGUudG9Mb3dlckNhc2UoKSArICcvJyArIHBsYWNlLmNpdHlDb2RlICsgdHNUeXBlVXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAnbG9jYWxpdHknKSB7XG4gICAgICAgICAgICBmaW5hbFVybCA9ICcvJyArIHBsYWNlLmNvdW50cnlDb2RlLnRvTG93ZXJDYXNlKCkgKyAnLycgKyBwbGFjZS5sb2NhbGl0eUNvZGUgKyAnLS0nICsgcGxhY2UuY2l0eUNvZGUgKyB0c1R5cGVVcmw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYWNlLnR5cGUgPT09ICd1bnN0cnVjdHVyZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcGxhY2UubmFtZS5yZXBsYWNlKC8sL2csICcnKS5yZXBsYWNlKC8gL2csICctJyk7XG4gICAgICAgICAgICBsZXQgc2Vjb25kYXJ5VGV4dCA9ICcnO1xuICAgICAgICAgICAgaWYgKHBsYWNlLnNlY29uZGFyeVRleHQpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0ID0gJy0tJyArIHBsYWNlLnNlY29uZGFyeVRleHQucmVwbGFjZSgvLC9nLCAnJykucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxVcmwgPSAnL3MvJyArIG5hbWUgKyBzZWNvbmRhcnlUZXh0ICsgdHNUeXBlVXJsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGZpbmFsVXJsKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2ZpbmFsVXJsXSwgeyBzdGF0ZTogeyBwbGFjZTogcGxhY2UgfSB9KTtcbiAgICAgICAgLy8gdGhpcy5wbGFjZVNlcnZpY2UudXBkYXRlUGxhY2UocGxhY2UubmFtZSk7XG4gICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBwbGFjZS5uYW1lO1xuICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlQ2hhbmdlLmVtaXQocGxhY2UubmFtZSk7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgIH1cblxuICAgIG9wZW5DaXR5UG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaXR5SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHNlYXJjaENpdHkgPSAodGV4dCkgPT4ge1xuICAgICAgICBpZiAoIXRleHQgfHwgdGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VTZWFyY2hSZXN1bHRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHQgIT0gdW5kZWZpbmVkICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaXR5UXVlcnlDaGFuZ2VkLm5leHQodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVBbmRFbWl0Q2xvc2VDaXR5U3VnZ2VzdGlvbihmYWxzZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQW5kRW1pdENsb3NlQ2l0eVN1Z2dlc3Rpb24gPSAodmFsOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2VTdWdnZXN0aW9ucyA9IHZhbDtcbiAgICAgICAgdGhpcy5jbG9zZVN1Z2dlc3Rpb25zQ2hhbmdlLmVtaXQodGhpcy5jbG9zZVN1Z2dlc3Rpb25zKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY2l0eVNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2l0eUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxufVxuIl19