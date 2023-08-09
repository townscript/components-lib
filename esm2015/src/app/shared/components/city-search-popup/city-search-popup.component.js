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
            const tsType = this.urlArray[2];
            let tsTypeUrl = '';
            if (tsType !== 'upcoming-events') {
                tsTypeUrl = tsType && tsType.length > 0 ? '/' + tsType.toLowerCase() : '';
            }
            const finalUrl = `/${this.urlArray[0]}/online${tsTypeUrl}`;
            console.log(finalUrl);
            this.router.navigate([finalUrl], { state: { place: { twoDigitCode: this.urlArray[0] } } });
            this.activePlace = 'Online';
            this.activePlaceChange.emit('Online');
            this.cityPopupActive = false;
            this.cityPopupActiveChange.emit(false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWFyY2gtcG9wdXAvY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFckgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUMvRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBTzFGLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBeUJqQyxZQUFvQixZQUEwQixFQUFVLGFBQTRCLEVBQVMsUUFBa0I7UUFBM0YsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUF0QnRHLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFaEIsc0JBQWlCLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0QsMEJBQXFCLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkUscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLDJCQUFzQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdFLHFCQUFnQixHQUFHLElBQUksQ0FB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c0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFBO1FBdkZHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBdUZELGVBQWU7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFDRCxRQUFRO0lBQ1IsQ0FBQztDQUNKLENBQUE7O1lBaEdxQyxZQUFZO1lBQXlCLGFBQWE7WUFBbUIsUUFBUTs7QUF2QnJFO0lBQXpDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7MkRBQXVCO0FBQ3ZEO0lBQVIsS0FBSyxFQUFFOzJEQUFrQjtBQUNqQjtJQUFSLEtBQUssRUFBRTs2REFBcUI7QUFDbkI7SUFBVCxNQUFNLEVBQUU7bUVBQThEO0FBQzlEO0lBQVIsS0FBSyxFQUFFO2lFQUEwQjtBQUN4QjtJQUFULE1BQU0sRUFBRTt1RUFBbUU7QUFDbkU7SUFBUixLQUFLLEVBQUU7K0RBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFO2tFQUEwQjtBQUN4QjtJQUFULE1BQU0sRUFBRTt3RUFBb0U7QUFWcEUsd0JBQXdCO0lBTHBDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsMCtGQUFpRDs7S0FFcEQsQ0FBQztHQUNXLHdCQUF3QixDQXlIcEM7U0F6SFksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSGVhZGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci9wbGFjZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtY2l0eS1zZWFyY2gtcG9wdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jaXR5LXNlYXJjaC1wb3B1cC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaXR5U2VhcmNoUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQFZpZXdDaGlsZCgnY2l0eUlucHV0JywgeyBzdGF0aWM6IHRydWUgfSkgY2l0eUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dCgpIHNob3dBcnJvdyA9IHRydWU7XG4gICAgQElucHV0KCkgYWN0aXZlUGxhY2U6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgYWN0aXZlUGxhY2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBJbnB1dCgpIGNpdHlQb3B1cEFjdGl2ZTogYm9vbGVhbjtcbiAgICBAT3V0cHV0KCkgY2l0eVBvcHVwQWN0aXZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQElucHV0KCkgcG9wdWxhclBsYWNlczogYW55O1xuICAgIEBJbnB1dCgpIGNsb3NlU3VnZ2VzdGlvbnMgPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgY2xvc2VTdWdnZXN0aW9uc0NoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY2l0eVNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgcGxhY2VTZWFyY2hSZXN1bHRzOiBhbnk7XG5cbiAgICByb3V0ZXI6IFJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG4gICAgdXJsQXJyYXk6IGFueTtcbiAgICBjaXR5UXVlcnk6IHN0cmluZztcbiAgICBjaXR5UXVlcnlDaGFuZ2VkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgY2xpZW50OiBhbnk7XG4gICAgY2l0eUxvYWRpbmcgPSBmYWxzZTtcbiAgICBpbmRleDogYW55O1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgaGVhZGVyU2VydmljZTogSGVhZGVyU2VydmljZSwgcHVibGljIGRhdGVwaXBlOiBEYXRlUGlwZSkge1xuICAgICAgICB0aGlzLmNpdHlRdWVyeUNoYW5nZWQucGlwZShkZWJvdW5jZVRpbWUoMzAwKSkuc3Vic2NyaWJlKHRleHQgPT4gdGhpcy5jYWxsU2VhcmNoQ2l0eSh0ZXh0KSk7XG4gICAgICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICAgIH1cblxuICAgIGJ1aWxkVXJsQXJyYXkgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoJz8nKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbFNlYXJjaENpdHkgPSAocXVlcnkpID0+IHtcbiAgICAgICAgdGhpcy5jaXR5TG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGVhZGVyU2VydmljZS5nZXRwbGFjZVNlYXJjaFJlc3VsdHMocXVlcnkpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbGFjZVNlYXJjaFJlc3VsdHMgPSByZXNbJ2RhdGEnXTtcbiAgICAgICAgICAgIHRoaXMuY2l0eUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGxhY2VDaGFuZ2VkVG9PbmxpbmUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRzVHlwZSA9IHRoaXMudXJsQXJyYXlbMl07XG4gICAgICAgIGxldCB0c1R5cGVVcmwgPSAnJztcbiAgICAgICAgaWYgKHRzVHlwZSAhPT0gJ3VwY29taW5nLWV2ZW50cycpIHtcbiAgICAgICAgICAgIHRzVHlwZVVybCA9IHRzVHlwZSAmJiB0c1R5cGUubGVuZ3RoID4gMCA/ICcvJyArIHRzVHlwZS50b0xvd2VyQ2FzZSgpIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmluYWxVcmwgPSBgLyR7dGhpcy51cmxBcnJheVswXX0vb25saW5lJHt0c1R5cGVVcmx9YDtcbiAgICAgICAgY29uc29sZS5sb2coZmluYWxVcmwpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbZmluYWxVcmxdLCB7IHN0YXRlOiB7IHBsYWNlOiB7IHR3b0RpZ2l0Q29kZTogdGhpcy51cmxBcnJheVswXSB9IH0gfSk7XG4gICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSAnT25saW5lJztcbiAgICAgICAgdGhpcy5hY3RpdmVQbGFjZUNoYW5nZS5lbWl0KCdPbmxpbmUnKTtcbiAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgfVxuXG4gICAgcGxhY2VDaGFuZ2VkID0gKHBsYWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRzVHlwZSA9IHRoaXMudXJsQXJyYXlbMl07XG4gICAgICAgIGxldCB0c1R5cGVVcmwgPSAnJztcbiAgICAgICAgaWYgKHRzVHlwZSAhPT0gJ3VwY29taW5nLWV2ZW50cycpIHtcbiAgICAgICAgICAgIHRzVHlwZVVybCA9IHRzVHlwZSAmJiB0c1R5cGUubGVuZ3RoID4gMCA/ICcvJyArIHRzVHlwZS50b0xvd2VyQ2FzZSgpIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZpbmFsVXJsID0gJyc7XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAnY291bnRyeScpIHtcbiAgICAgICAgICAgIGZpbmFsVXJsID0gJy8nICsgcGxhY2UudHdvRGlnaXRDb2RlLnRvTG93ZXJDYXNlKCkgK1xuICAgICAgICAgICAgICAgICcvJyArIHBsYWNlLmNvdW50cnkuc3BsaXQoJyAnKS5qb2luKCctJykudG9Mb3dlckNhc2UoKSArIHRzVHlwZVVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ2NpdHknKSB7XG4gICAgICAgICAgICBmaW5hbFVybCA9ICcvJyArIHBsYWNlLmNvdW50cnlDb2RlLnRvTG93ZXJDYXNlKCkgKyAnLycgKyBwbGFjZS5jaXR5Q29kZSArIHRzVHlwZVVybDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ2xvY2FsaXR5Jykge1xuICAgICAgICAgICAgZmluYWxVcmwgPSAnLycgKyBwbGFjZS5jb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgcGxhY2UubG9jYWxpdHlDb2RlICsgJy0tJyArIHBsYWNlLmNpdHlDb2RlICsgdHNUeXBlVXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAndW5zdHJ1Y3R1cmVkJykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBsYWNlLm5hbWUucmVwbGFjZSgvLC9nLCAnJykucmVwbGFjZSgvIC9nLCAnLScpO1xuICAgICAgICAgICAgbGV0IHNlY29uZGFyeVRleHQgPSAnJztcbiAgICAgICAgICAgIGlmIChwbGFjZS5zZWNvbmRhcnlUZXh0KSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dCA9ICctLScgKyBwbGFjZS5zZWNvbmRhcnlUZXh0LnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsVXJsID0gJy9zLycgKyBuYW1lICsgc2Vjb25kYXJ5VGV4dCArIHRzVHlwZVVybDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhmaW5hbFVybCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtmaW5hbFVybF0sIHsgc3RhdGU6IHsgcGxhY2U6IHBsYWNlIH0gfSk7XG4gICAgICAgIC8vIHRoaXMucGxhY2VTZXJ2aWNlLnVwZGF0ZVBsYWNlKHBsYWNlLm5hbWUpO1xuICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gcGxhY2UubmFtZTtcbiAgICAgICAgdGhpcy5hY3RpdmVQbGFjZUNoYW5nZS5lbWl0KHBsYWNlLm5hbWUpO1xuICAgICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICB9XG5cbiAgICBvcGVuQ2l0eVBvcHVwID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2l0eUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBzZWFyY2hDaXR5ID0gKHRleHQpID0+IHtcbiAgICAgICAgaWYgKCF0ZXh0IHx8IHRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlU2VhcmNoUmVzdWx0cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZXh0ICE9IHVuZGVmaW5lZCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2l0eVF1ZXJ5Q2hhbmdlZC5uZXh0KHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlQW5kRW1pdENsb3NlQ2l0eVN1Z2dlc3Rpb24oZmFsc2UpO1xuICAgIH1cblxuICAgIHVwZGF0ZUFuZEVtaXRDbG9zZUNpdHlTdWdnZXN0aW9uID0gKHZhbDogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnMgPSB2YWw7XG4gICAgICAgIHRoaXMuY2xvc2VTdWdnZXN0aW9uc0NoYW5nZS5lbWl0KHRoaXMuY2xvc2VTdWdnZXN0aW9ucyk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNpdHlTZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNpdHlJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cbn1cbiJdfQ==