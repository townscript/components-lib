import { __decorate } from "tslib";
import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
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
        this.placeChangedToOnline = () => {
            const finalUrl = `/${this.urlArray[0]}/online`;
            console.log(finalUrl);
            window.location.href = finalUrl;
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
CitySearchPopupComponent.ctorParameters = () => [
    { type: PlaceService },
    { type: HeaderService },
    { type: DatePipe }
];
__decorate([
    ViewChild('cityInput', { static: true })
], CitySearchPopupComponent.prototype, "cityInput", void 0);
__decorate([
    Input()
], CitySearchPopupComponent.prototype, "showArrow", void 0);
__decorate([
    Input()
], CitySearchPopupComponent.prototype, "activePlace", void 0);
__decorate([
    Output()
], CitySearchPopupComponent.prototype, "activePlaceChange", void 0);
__decorate([
    Input()
], CitySearchPopupComponent.prototype, "cityPopupActive", void 0);
__decorate([
    Output()
], CitySearchPopupComponent.prototype, "cityPopupActiveChange", void 0);
__decorate([
    Input()
], CitySearchPopupComponent.prototype, "popularPlaces", void 0);
__decorate([
    Input()
], CitySearchPopupComponent.prototype, "closeSuggestions", void 0);
__decorate([
    Output()
], CitySearchPopupComponent.prototype, "closeSuggestionsChange", void 0);
CitySearchPopupComponent = __decorate([
    Component({
        selector: 'app-city-search-popup',
        template: "<div class=\"city-suggestions enter-slide-bottom rounded-lg\" [class.arrow]=\"showArrow\">\n    <div class=\"suggestions-container\">\n        <ul class=\"mb-1\">\n            <li [class.active]=\"citySearchActive\"\n                class=\"p-2 rounded-t-lg capitalize cursor-pointer flex items-center truncate\">\n                <i class=\"mdi mdi-magnify text-primary mr-2 text-base\"></i>\n                <input appDataAnalytics eventLabel=\"locationDropdownSearch\" clickLocation=\"\" #cityInput\n                    autocomplete=\"off\" id=\"cityInput\" type=\"text\" placeholder=\"Browse events...\" [(ngModel)]=\"cityQuery\"\n                    (ngModelChange)=\"searchCity($event)\" (focus)=\"citySearchActive=true\"\n                    class=\"w-full bg-transparent text-sm\" />\n                <i *ngIf=\"cityLoading\" class=\"mdi mdi-loading mdi-spin\"></i>\n            </li>\n            <div *ngIf=\"!closeSuggestions\">\n                <li matRipple (click)=\"placeChanged(place);\"\n                    class=\"p-2 capitalize cursor-pointer flex items-center truncate\"\n                    *ngFor=\"let place of placeSearchResults\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 text-primary\"></i>\n                    <span class=\"text-sm flex items-baseline truncate\">\n                        <span class=\"text-gray-800 mr-1 whitespace-no-wrap\">{{place.name}} </span>\n                        <small class=\"text-2xs text-gray-600\"\n                            *ngIf=\"place.city && place?.city.length>0 && place?.type!='city'\">\n                            {{place.city}},\n                        </small>\n                        <small class=\"text-2xs text-gray-600\"\n                            *ngIf=\"place.country && place?.country.length>0 && place?.type!='country'\">{{place.country}}\n                        </small>\n                        <small class=\"text-2xs truncate text-gray-600\">{{place.secondaryText}}</small>\n                    </span>\n                </li>\n            </div>\n            <ng-container matRipple *ngIf=\"!placeSearchResults || placeSearchResults.length==0\">\n                <li appDataAnalytics eventLabel=\"locationDropdownItem\" clickLocation=\"\"\n                    (click)=\"placeChangedToOnline();\" class=\"border-b p-2 cursor-pointer capitalize\">\n                    <i class=\"mdi mdi-earth text-base mr-1 text-primary\"></i>\n                    <span class=\"text-gray-800 capitalize text-sm\">Online</span>\n                </li>\n                <li appDataAnalytics eventLabel=\"locationDropdownItem\" clickLocation=\"\" (click)=\"placeChanged(city);\"\n                    class=\"p-2 cursor-pointer capitalize\" *ngFor=\"let city of popularPlaces\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 text-primary\"></i>\n                    <span class=\"text-gray-800 capitalize text-sm\">{{city.name}}</span>\n                </li>\n            </ng-container>\n        </ul>\n    </div>\n</div>",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.bg-primary{background-color:#563de1}.city-suggestions{width:100%;background:#fafafa;position:absolute;box-shadow:0 0 8px rgba(0,0,0,.25)}.city-suggestions .mdi-spin::before{-webkit-animation-duration:.5s;animation-duration:.5s}.city-suggestions li.active,.city-suggestions li:hover{background:#ededed}.city-suggestions.arrow{border-top:3px solid #3782c4}.city-suggestions.arrow:before{content:\" \";width:10px;position:absolute;top:-7px;left:88%;height:10px;filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));background:#ededed;transform:rotate(45deg);border-top:3px solid #3782c4;border-left:3px solid #3782c4}@media (min-width:991px){.city-suggestions{width:140%;left:-40%}}"]
    })
], CitySearchPopupComponent);
export { CitySearchPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWFyY2gtcG9wdXAvY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFckgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUMvRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBTzFGLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBeUJqQyxZQUFvQixZQUEwQixFQUFVLGFBQTRCLEVBQVMsUUFBa0I7UUFBM0YsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUF0QnRHLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFaEIsc0JBQWlCLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0QsMEJBQXFCLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkUscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLDJCQUFzQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdFLHFCQUFnQixHQUFHLElBQUksQ0FB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Q25CO0lBQVQsTUFBTSxFQUFFO21FQUE4RDtBQUM5RDtJQUFSLEtBQUssRUFBRTtpRUFBMEI7QUFDeEI7SUFBVCxNQUFNLEVBQUU7dUVBQW1FO0FBQ25FO0lBQVIsS0FBSyxFQUFFOytEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtrRUFBMEI7QUFDeEI7SUFBVCxNQUFNLEVBQUU7d0VBQW9FO0FBVnBFLHdCQUF3QjtJQUxwQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLDArRkFBaUQ7O0tBRXBELENBQUM7R0FDVyx3QkFBd0IsQ0FnSHBDO1NBaEhZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci90cy1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWNpdHktc2VhcmNoLXBvcHVwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2NpdHktc2VhcmNoLXBvcHVwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2l0eVNlYXJjaFBvcHVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2NpdHlJbnB1dCcsIHsgc3RhdGljOiB0cnVlIH0pIGNpdHlJbnB1dDogRWxlbWVudFJlZjtcbiAgICBASW5wdXQoKSBzaG93QXJyb3cgPSB0cnVlO1xuICAgIEBJbnB1dCgpIGFjdGl2ZVBsYWNlOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIGFjdGl2ZVBsYWNlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBASW5wdXQoKSBjaXR5UG9wdXBBY3RpdmU6IGJvb2xlYW47XG4gICAgQE91dHB1dCgpIGNpdHlQb3B1cEFjdGl2ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBJbnB1dCgpIHBvcHVsYXJQbGFjZXM6IGFueTtcbiAgICBASW5wdXQoKSBjbG9zZVN1Z2dlc3Rpb25zID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIGNsb3NlU3VnZ2VzdGlvbnNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNpdHlTZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgIHBsYWNlU2VhcmNoUmVzdWx0czogYW55O1xuXG4gICAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICAgIHVybEFycmF5OiBhbnk7XG4gICAgY2l0eVF1ZXJ5OiBzdHJpbmc7XG4gICAgY2l0eVF1ZXJ5Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGNsaWVudDogYW55O1xuICAgIGNpdHlMb2FkaW5nID0gZmFsc2U7XG4gICAgaW5kZXg6IGFueTtcblxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLCBwcml2YXRlIGhlYWRlclNlcnZpY2U6IEhlYWRlclNlcnZpY2UsIHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUpIHtcbiAgICAgICAgdGhpcy5jaXR5UXVlcnlDaGFuZ2VkLnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpLnN1YnNjcmliZSh0ZXh0ID0+IHRoaXMuY2FsbFNlYXJjaENpdHkodGV4dCkpO1xuICAgICAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICB9XG5cbiAgICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KCc/JylbMF0ucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGxTZWFyY2hDaXR5ID0gKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHRoaXMuY2l0eUxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0cGxhY2VTZWFyY2hSZXN1bHRzKHF1ZXJ5KS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VTZWFyY2hSZXN1bHRzID0gcmVzWydkYXRhJ107XG4gICAgICAgICAgICB0aGlzLmNpdHlMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYWNlQ2hhbmdlZFRvT25saW5lID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBmaW5hbFVybCA9IGAvJHt0aGlzLnVybEFycmF5WzBdfS9vbmxpbmVgO1xuICAgICAgICBjb25zb2xlLmxvZyhmaW5hbFVybCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZmluYWxVcmw7XG4gICAgfVxuXG4gICAgcGxhY2VDaGFuZ2VkID0gKHBsYWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRzVHlwZSA9IHRoaXMudXJsQXJyYXlbMl07XG4gICAgICAgIGxldCB0c1R5cGVVcmwgPSAnJztcbiAgICAgICAgaWYgKHRzVHlwZSAhPT0gJ3VwY29taW5nLWV2ZW50cycpIHtcbiAgICAgICAgICAgIHRzVHlwZVVybCA9IHRzVHlwZSAmJiB0c1R5cGUubGVuZ3RoID4gMCA/ICcvJyArIHRzVHlwZS50b0xvd2VyQ2FzZSgpIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZpbmFsVXJsID0gJyc7XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAnY291bnRyeScpIHtcbiAgICAgICAgICAgIGZpbmFsVXJsID0gJy8nICsgcGxhY2UudHdvRGlnaXRDb2RlLnRvTG93ZXJDYXNlKCkgK1xuICAgICAgICAgICAgICAgICcvJyArIHBsYWNlLmNvdW50cnkuc3BsaXQoJyAnKS5qb2luKCctJykudG9Mb3dlckNhc2UoKSArIHRzVHlwZVVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ2NpdHknKSB7XG4gICAgICAgICAgICBmaW5hbFVybCA9ICcvJyArIHBsYWNlLmNvdW50cnlDb2RlLnRvTG93ZXJDYXNlKCkgKyAnLycgKyBwbGFjZS5jaXR5Q29kZSArIHRzVHlwZVVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ2xvY2FsaXR5Jykge1xuICAgICAgICAgICAgZmluYWxVcmwgPSAnLycgKyBwbGFjZS5jb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgcGxhY2UubG9jYWxpdHlDb2RlICsgJy0tJyArIHBsYWNlLmNpdHlDb2RlICsgdHNUeXBlVXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAndW5zdHJ1Y3R1cmVkJykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBsYWNlLm5hbWUucmVwbGFjZSgvLC9nLCAnJykucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgICAgICAgICAgbGV0IHNlY29uZGFyeVRleHQgPSAnJztcbiAgICAgICAgICAgIGlmIChwbGFjZS5zZWNvbmRhcnlUZXh0KSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dCA9ICctLScgKyBwbGFjZS5zZWNvbmRhcnlUZXh0LnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsVXJsID0gJy9zLycgKyBuYW1lICsgc2Vjb25kYXJ5VGV4dCArIHRzVHlwZVVybDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhmaW5hbFVybCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtmaW5hbFVybF0sIHsgc3RhdGU6IHsgcGxhY2U6IHBsYWNlIH0gfSk7XG4gICAgICAgIC8vIHRoaXMucGxhY2VTZXJ2aWNlLnVwZGF0ZVBsYWNlKHBsYWNlLm5hbWUpO1xuICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gcGxhY2UubmFtZTtcbiAgICAgICAgdGhpcy5hY3RpdmVQbGFjZUNoYW5nZS5lbWl0KHBsYWNlLm5hbWUpO1xuICAgICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICB9XG5cbiAgICBvcGVuQ2l0eVBvcHVwID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2l0eUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBzZWFyY2hDaXR5ID0gKHRleHQpID0+IHtcbiAgICAgICAgaWYgKCF0ZXh0IHx8IHRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlU2VhcmNoUmVzdWx0cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2l0eVF1ZXJ5Q2hhbmdlZC5uZXh0KHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlQW5kRW1pdENsb3NlQ2l0eVN1Z2dlc3Rpb24oZmFsc2UpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFuZEVtaXRDbG9zZUNpdHlTdWdnZXN0aW9uID0gKHZhbDogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnMgPSB2YWw7XG4gICAgICAgIHRoaXMuY2xvc2VTdWdnZXN0aW9uc0NoYW5nZS5lbWl0KHRoaXMuY2xvc2VTdWdnZXN0aW9ucyk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNpdHlTZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNpdHlJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cbn1cbiJdfQ==