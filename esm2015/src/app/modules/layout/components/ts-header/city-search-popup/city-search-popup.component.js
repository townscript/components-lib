import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HeaderService } from '../ts-header.service';
import { config } from '../../../../../core/app-config';
import { PlaceService } from '../place.service';
let CitySearchPopupComponent = class CitySearchPopupComponent {
    constructor(placeService, headerService, datepipe) {
        this.placeService = placeService;
        this.headerService = headerService;
        this.datepipe = datepipe;
        this.showArrow = true;
        this.activePlaceChange = new EventEmitter();
        this.cityPopupActiveChange = new EventEmitter();
        this.citySearchActive = true;
        this.router = config.router;
        this.cityQueryChanged = new Subject();
        this.cityLoading = false;
        this.callSearchCity = (query) => {
            this.cityLoading = true;
            this.headerService.getplaceSearchResults(query).subscribe(res => {
                this.placeSearchResults = res['data'];
                this.cityLoading = false;
            });
        };
        this.placeChanged = (place) => {
            let tsType = this.urlArray[2];
            const tsTypeUrl = tsType && tsType.length > 0 ? '/' + tsType.toLowerCase() : '';
            if (place.type === 'country') {
                this.router.navigate(['/' + place.twoDigitCode.toLowerCase() +
                        '/' + place.country.split(' ').join('-').toLowerCase() + tsTypeUrl], { state: { place: place } });
            }
            if (place.type === 'city') {
                this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.cityCode + tsTypeUrl], { state: { place: place } });
            }
            if (place.type === 'locality') {
                this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.localityCode + '--' + place.cityCode + tsTypeUrl], { state: { place: place } });
            }
            if (place.type === 'unstructured') {
                const name = place.name.replace(/,/g, '').replace(/ /g, '-');
                let secondaryText = '';
                if (place.secondaryText) {
                    secondaryText = '--' + place.secondaryText.replace(/,/g, '').replace(/ /g, '-');
                }
                this.router.navigate(['/s/' + name + secondaryText + tsTypeUrl], { state: { place: place } });
            }
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
        };
        this.cityQueryChanged.pipe(debounceTime(300)).subscribe(text => this.callSearchCity(text));
        if (this.router.url) {
            this.urlArray = this.router.url.replace('/', '').split('/');
        }
        else {
            this.urlArray = ['in'];
        }
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
CitySearchPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-city-search-popup',
        template: "<div class=\"city-suggestions enter-slide-bottom\" [class.arrow]=\"showArrow\">\n    <div class=\"suggestions-container\">\n        <ul>\n            <li [class.active]=\"citySearchActive\" class=\"p-2 capitalize cursor-pointer flex items-center truncate\">\n                <i class=\"mdi mdi-magnify mr-2\"></i>\n                <input appDataAnalytics eventLabel=\"location-dropdown-search\" clickLocation=\"\" #cityInput\n                    autocomplete=\"off\" id=\"cityInput\" type=\"text\" placeholder=\"Type here to search...\"\n                    [(ngModel)]=\"cityQuery\" (ngModelChange)=\"searchCity($event)\" (focus)=\"citySearchActive=true\"\n                    class=\"w-full bg-transparent text-sm\" />\n                <i *ngIf=\"cityLoading\" class=\"mdi mdi-loading mdi-spin\"></i>\n            </li>\n            <li matRipple (click)=\"placeChanged(place);\"\n                class=\"p-2 capitalize cursor-pointer flex items-center truncate\"\n                *ngFor=\"let place of placeSearchResults\">\n                <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                <span class=\"text-sm flex items-end truncate\">\n                    <span class=\"mr-1 whitespace-no-wrap\">{{place.name}} </span>\n                    <small class=\"text-2xs text-gray-600\"\n                        *ngIf=\"place.city && place?.city.length>0 && place?.type!='city'\">\n                        {{place.city}},\n                    </small>\n                    <small class=\"text-2xs text-gray-600\"\n                        *ngIf=\"place.country && place?.country.length>0 && place?.type!='country'\">{{place.country}}\n                    </small>\n                    <small class=\"text-2xs truncate text-gray-600\">{{place.secondaryText}}</small>\n                </span>\n            </li>\n            <ng-container matRipple *ngIf=\"!placeSearchResults || placeSearchResults.length==0\">\n                <li appDataAnalytics eventLabel=\"location-dropdown-item\" clickLocation=\"\" (click)=\"placeChanged(city);\"\n                    class=\"p-2 px-4 cursor-pointer capitalize\" *ngFor=\"let city of popularPlaces\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                    <span class=\"text-base capitalize\">{{city.name}}</span>\n                </li>\n            </ng-container>\n        </ul>\n    </div>\n</div>",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.city-suggestions{width:100%;background:#fafafa;position:absolute;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.city-suggestions .mdi-spin::before{-webkit-animation-duration:.5s;animation-duration:.5s}.city-suggestions li.active,.city-suggestions li:hover{background:#ededed}.city-suggestions.arrow{border-top:3px solid #3782c4}.city-suggestions.arrow:before{content:\" \";width:10px;position:absolute;top:-7px;left:88%;height:10px;-webkit-filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));background:#ededed;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-top:3px solid #3782c4;border-left:3px solid #3782c4}@media (min-width:991px){.city-suggestions{width:140%;left:-40%}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [PlaceService, HeaderService, DatePipe])
], CitySearchPopupComponent);
export { CitySearchPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvY2l0eS1zZWFyY2gtcG9wdXAvY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXJILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU9oRCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQXVCakMsWUFBb0IsWUFBMEIsRUFBVSxhQUE0QixFQUFTLFFBQWtCO1FBQTNGLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBcEJ0RyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWhCLHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELDBCQUFxQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRzVFLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUd4QixXQUFNLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQztR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RyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBb0RELGVBQWU7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFDRCxRQUFRO0lBQ1IsQ0FBQztDQUNKLENBQUE7QUF0RjZDO0lBQXpDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7c0NBQVksVUFBVTsyREFBQztBQUN2RDtJQUFSLEtBQUssRUFBRTs7MkRBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOzs2REFBcUI7QUFDbkI7SUFBVCxNQUFNLEVBQUU7c0NBQW9CLFlBQVk7bUVBQThCO0FBQzlEO0lBQVIsS0FBSyxFQUFFOztpRUFBMEI7QUFDeEI7SUFBVCxNQUFNLEVBQUU7c0NBQXdCLFlBQVk7dUVBQStCO0FBQ25FO0lBQVIsS0FBSyxFQUFFOzsrREFBb0I7QUFSbkIsd0JBQXdCO0lBTHBDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsZzRFQUFpRDs7S0FFcEQsQ0FBQzs2Q0F3Qm9DLFlBQVksRUFBeUIsYUFBYSxFQUFtQixRQUFRO0dBdkJ0Ryx3QkFBd0IsQ0F3RnBDO1NBeEZZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi90cy1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vcGxhY2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWNpdHktc2VhcmNoLXBvcHVwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NpdHktc2VhcmNoLXBvcHVwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2l0eVNlYXJjaFBvcHVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2NpdHlJbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIGNpdHlJbnB1dDogRWxlbWVudFJlZjtcbiAgICBASW5wdXQoKSBzaG93QXJyb3cgPSB0cnVlO1xuICAgIEBJbnB1dCgpIGFjdGl2ZVBsYWNlOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIGFjdGl2ZVBsYWNlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBASW5wdXQoKSBjaXR5UG9wdXBBY3RpdmU6IGJvb2xlYW47XG4gICAgQE91dHB1dCgpIGNpdHlQb3B1cEFjdGl2ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBJbnB1dCgpIHBvcHVsYXJQbGFjZXM6IGFueTtcblxuICAgIGNpdHlTZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgIHBsYWNlU2VhcmNoUmVzdWx0czogYW55O1xuXG4gICAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICAgIHVybEFycmF5OiBhbnk7XG4gICAgY2l0eVF1ZXJ5OiBzdHJpbmc7XG4gICAgY2l0eVF1ZXJ5Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGNsaWVudDogYW55O1xuICAgIGNpdHlMb2FkaW5nID0gZmFsc2U7XG4gICAgaW5kZXg6IGFueTtcblxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLCBwcml2YXRlIGhlYWRlclNlcnZpY2U6IEhlYWRlclNlcnZpY2UsIHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUpIHtcbiAgICAgICAgdGhpcy5jaXR5UXVlcnlDaGFuZ2VkLnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZSh0ZXh0ID0+IHRoaXMuY2FsbFNlYXJjaENpdHkodGV4dCkpO1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FsbFNlYXJjaENpdHkgPSAocXVlcnkpID0+IHtcbiAgICAgICAgdGhpcy5jaXR5TG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGVhZGVyU2VydmljZS5nZXRwbGFjZVNlYXJjaFJlc3VsdHMocXVlcnkpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbGFjZVNlYXJjaFJlc3VsdHMgPSByZXNbJ2RhdGEnXTtcbiAgICAgICAgICAgIHRoaXMuY2l0eUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGxhY2VDaGFuZ2VkID0gKHBsYWNlKSA9PiB7XG4gICAgICAgIGxldCB0c1R5cGUgPSB0aGlzLnVybEFycmF5WzJdO1xuICAgICAgICBjb25zdCB0c1R5cGVVcmwgPSB0c1R5cGUgJiYgdHNUeXBlLmxlbmd0aCA+IDAgPyAnLycgKyB0c1R5cGUudG9Mb3dlckNhc2UoKSA6ICcnO1xuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ2NvdW50cnknKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nICsgcGxhY2UudHdvRGlnaXRDb2RlLnRvTG93ZXJDYXNlKCkgK1xuICAgICAgICAgICAgICAgICcvJyArIHBsYWNlLmNvdW50cnkuc3BsaXQoJyAnKS5qb2luKCctJykudG9Mb3dlckNhc2UoKSArIHRzVHlwZVVybF0sIHsgc3RhdGU6IHsgcGxhY2U6IHBsYWNlIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYWNlLnR5cGUgPT09ICdjaXR5Jykge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJyArIHBsYWNlLmNvdW50cnlDb2RlLnRvTG93ZXJDYXNlKCkgKyAnLycgKyBwbGFjZS5jaXR5Q29kZSArIHRzVHlwZVVybF0sIHsgc3RhdGU6IHsgcGxhY2U6IHBsYWNlIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYWNlLnR5cGUgPT09ICdsb2NhbGl0eScpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycgKyBwbGFjZS5jb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgcGxhY2UubG9jYWxpdHlDb2RlICsgJy0tJyArIHBsYWNlLmNpdHlDb2RlICsgdHNUeXBlVXJsXSxcbiAgICAgICAgICAgICAgICB7IHN0YXRlOiB7IHBsYWNlOiBwbGFjZSB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAndW5zdHJ1Y3R1cmVkJykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBsYWNlLm5hbWUucmVwbGFjZSgvLC9nLCAnJykucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgICAgICAgICAgbGV0IHNlY29uZGFyeVRleHQgPSAnJztcbiAgICAgICAgICAgIGlmIChwbGFjZS5zZWNvbmRhcnlUZXh0KSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dCA9ICctLScgKyBwbGFjZS5zZWNvbmRhcnlUZXh0LnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3MvJyArIG5hbWUgKyBzZWNvbmRhcnlUZXh0ICsgdHNUeXBlVXJsXSwgeyBzdGF0ZTogeyBwbGFjZTogcGxhY2UgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnBsYWNlU2VydmljZS51cGRhdGVQbGFjZShwbGFjZS5uYW1lKTtcbiAgICAgICAgdGhpcy5hY3RpdmVQbGFjZSA9IHBsYWNlLm5hbWU7XG4gICAgICAgIHRoaXMuYWN0aXZlUGxhY2VDaGFuZ2UuZW1pdChwbGFjZS5uYW1lKTtcbiAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgfVxuXG4gICAgb3BlbkNpdHlQb3B1cCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNpdHlJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc2VhcmNoQ2l0eSA9ICh0ZXh0KSA9PiB7XG4gICAgICAgIGlmICghdGV4dCB8fCB0ZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wbGFjZVNlYXJjaFJlc3VsdHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGV4dCAhPSB1bmRlZmluZWQgJiYgdGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmNpdHlRdWVyeUNoYW5nZWQubmV4dCh0ZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaXR5U2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaXR5SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG59XG4iXX0=