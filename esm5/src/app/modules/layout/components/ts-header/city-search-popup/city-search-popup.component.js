import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HeaderService } from '../ts-header.service';
import { config } from '../../../../../core/app-config';
import { PlaceService } from '../place.service';
var CitySearchPopupComponent = /** @class */ (function () {
    function CitySearchPopupComponent(placeService, headerService, datepipe) {
        var _this = this;
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
        this.buildUrlArray = function () {
            if (_this.router.url) {
                _this.urlArray = _this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                _this.urlArray = ['in'];
            }
        };
        this.callSearchCity = function (query) {
            _this.cityLoading = true;
            _this.headerService.getplaceSearchResults(query).subscribe(function (res) {
                _this.placeSearchResults = res['data'];
                _this.cityLoading = false;
            });
        };
        this.placeChanged = function (place) {
            var tsType = _this.urlArray[2];
            var tsTypeUrl = tsType && tsType.length > 0 ? '/' + tsType.toLowerCase() : '';
            if (place.type === 'country') {
                _this.router.navigate(['/' + place.twoDigitCode.toLowerCase() +
                        '/' + place.country.split(' ').join('-').toLowerCase() + tsTypeUrl], { state: { place: place } });
            }
            if (place.type === 'city') {
                _this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.cityCode + tsTypeUrl], { state: { place: place } });
            }
            if (place.type === 'locality') {
                _this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.localityCode + '--' + place.cityCode + tsTypeUrl], { state: { place: place } });
            }
            if (place.type === 'unstructured') {
                var name_1 = place.name.replace(/,/g, '').replace(/ /g, '-');
                var secondaryText = '';
                if (place.secondaryText) {
                    secondaryText = '--' + place.secondaryText.replace(/,/g, '').replace(/ /g, '-');
                }
                _this.router.navigate(['/s/' + name_1 + secondaryText + tsTypeUrl], { state: { place: place } });
            }
            // this.placeService.updatePlace(place.name);
            _this.activePlace = place.name;
            _this.activePlaceChange.emit(place.name);
            _this.cityPopupActive = false;
            _this.cityPopupActiveChange.emit(false);
        };
        this.openCityPopup = function () {
            _this.cityPopupActive = true;
            _this.cityInput.nativeElement.focus();
        };
        this.searchCity = function (text) {
            if (!text || text.length === 0) {
                _this.placeSearchResults = [];
            }
            if (text != undefined && text.length > 0) {
                _this.cityQueryChanged.next(text);
            }
            _this.updateAndEmitCloseCitySuggestion(false);
        };
        this.updateAndEmitCloseCitySuggestion = function (val) {
            _this.closeSuggestions = val;
            _this.closeSuggestionsChange.emit(_this.closeSuggestions);
        };
        this.cityQueryChanged.pipe(debounceTime(300)).subscribe(function (text) { return _this.callSearchCity(text); });
        this.buildUrlArray();
    }
    CitySearchPopupComponent.prototype.ngAfterViewInit = function () {
        this.citySearchActive = true;
        this.cityInput.nativeElement.focus();
    };
    CitySearchPopupComponent.prototype.ngOnInit = function () {
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
        tslib_1.__metadata("design:type", Boolean)
    ], CitySearchPopupComponent.prototype, "closeSuggestions", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CitySearchPopupComponent.prototype, "closeSuggestionsChange", void 0);
    CitySearchPopupComponent = tslib_1.__decorate([
        Component({
            selector: 'app-city-search-popup',
            template: "<div class=\"city-suggestions enter-slide-bottom\" [class.arrow]=\"showArrow\">\n    <div class=\"suggestions-container\">\n        <ul>\n            <li [class.active]=\"citySearchActive\" class=\"p-2 capitalize cursor-pointer flex items-center truncate\">\n                <i class=\"mdi mdi-magnify mr-2\"></i>\n                <input appDataAnalytics eventLabel=\"location-dropdown-search\" clickLocation=\"\" #cityInput\n                    autocomplete=\"off\" id=\"cityInput\" type=\"text\" placeholder=\"Type here to search...\"\n                    [(ngModel)]=\"cityQuery\" (ngModelChange)=\"searchCity($event)\" (focus)=\"citySearchActive=true\"\n                    class=\"w-full bg-transparent text-sm\" />\n                <i *ngIf=\"cityLoading\" class=\"mdi mdi-loading mdi-spin\"></i>\n            </li>\n            <div *ngIf=\"!closeSuggestions\">\n              <li matRipple (click)=\"placeChanged(place);\"\n                class=\"p-2 capitalize cursor-pointer flex items-center truncate\"\n                *ngFor=\"let place of placeSearchResults\">\n                <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                <span class=\"text-sm flex items-end truncate\">\n                  <span class=\"mr-1 whitespace-no-wrap\">{{place.name}} </span>\n                  <small class=\"text-2xs text-gray-600\"\n                    *ngIf=\"place.city && place?.city.length>0 && place?.type!='city'\">\n                    {{place.city}},\n                  </small>\n                  <small class=\"text-2xs text-gray-600\"\n                    *ngIf=\"place.country && place?.country.length>0 && place?.type!='country'\">{{place.country}}\n                  </small>\n                  <small class=\"text-2xs truncate text-gray-600\">{{place.secondaryText}}</small>\n                </span>\n              </li>\n            </div>\n            <ng-container matRipple *ngIf=\"!placeSearchResults || placeSearchResults.length==0\">\n                <li appDataAnalytics eventLabel=\"location-dropdown-item\" clickLocation=\"\" (click)=\"placeChanged(city);\"\n                    class=\"p-2 px-4 cursor-pointer capitalize\" *ngFor=\"let city of popularPlaces\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                    <span class=\"text-base capitalize\">{{city.name}}</span>\n                </li>\n            </ng-container>\n        </ul>\n    </div>\n</div>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.city-suggestions{width:100%;background:#fafafa;position:absolute;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.city-suggestions .mdi-spin::before{-webkit-animation-duration:.5s;animation-duration:.5s}.city-suggestions li.active,.city-suggestions li:hover{background:#ededed}.city-suggestions.arrow{border-top:3px solid #3782c4}.city-suggestions.arrow:before{content:\" \";width:10px;position:absolute;top:-7px;left:88%;height:10px;-webkit-filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));background:#ededed;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-top:3px solid #3782c4;border-left:3px solid #3782c4}@media (min-width:991px){.city-suggestions{width:140%;left:-40%}}"]
        }),
        tslib_1.__metadata("design:paramtypes", [PlaceService, HeaderService, DatePipe])
    ], CitySearchPopupComponent);
    return CitySearchPopupComponent;
}());
export { CitySearchPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvY2l0eS1zZWFyY2gtcG9wdXAvY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXJILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU9oRDtJQXlCSSxrQ0FBb0IsWUFBMEIsRUFBVSxhQUE0QixFQUFTLFFBQWtCO1FBQS9HLGlCQUdDO1FBSG1CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBdEJ0RyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWhCLHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELDBCQUFxQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5FLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNqQywyQkFBc0IsR0FBMEIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3RSxxQkFBZ0IsR0FB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UUFBVCxNQUFNLEVBQUU7MENBQXlCLFlBQVk7NEVBQStCO0lBVnBFLHdCQUF3QjtRQUxwQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLGk3RUFBaUQ7O1NBRXBELENBQUM7aURBMEJvQyxZQUFZLEVBQXlCLGFBQWEsRUFBbUIsUUFBUTtPQXpCdEcsd0JBQXdCLENBcUdwQztJQUFELCtCQUFDO0NBQUEsQUFyR0QsSUFxR0M7U0FyR1ksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSGVhZGVyU2VydmljZSB9IGZyb20gJy4uL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi9wbGFjZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtY2l0eS1zZWFyY2gtcG9wdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jaXR5LXNlYXJjaC1wb3B1cC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaXR5U2VhcmNoUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQFZpZXdDaGlsZCgnY2l0eUlucHV0JywgeyBzdGF0aWM6IHRydWUgfSkgY2l0eUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dCgpIHNob3dBcnJvdyA9IHRydWU7XG4gICAgQElucHV0KCkgYWN0aXZlUGxhY2U6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgYWN0aXZlUGxhY2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBJbnB1dCgpIGNpdHlQb3B1cEFjdGl2ZTogYm9vbGVhbjtcbiAgICBAT3V0cHV0KCkgY2l0eVBvcHVwQWN0aXZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQElucHV0KCkgcG9wdWxhclBsYWNlczogYW55O1xuICAgIEBJbnB1dCgpIGNsb3NlU3VnZ2VzdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgY2xvc2VTdWdnZXN0aW9uc0NoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY2l0eVNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgcGxhY2VTZWFyY2hSZXN1bHRzOiBhbnk7XG5cbiAgICByb3V0ZXI6IFJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG4gICAgdXJsQXJyYXk6IGFueTtcbiAgICBjaXR5UXVlcnk6IHN0cmluZztcbiAgICBjaXR5UXVlcnlDaGFuZ2VkOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgY2xpZW50OiBhbnk7XG4gICAgY2l0eUxvYWRpbmcgPSBmYWxzZTtcbiAgICBpbmRleDogYW55O1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgaGVhZGVyU2VydmljZTogSGVhZGVyU2VydmljZSwgcHVibGljIGRhdGVwaXBlOiBEYXRlUGlwZSkge1xuICAgICAgICB0aGlzLmNpdHlRdWVyeUNoYW5nZWQucGlwZShkZWJvdW5jZVRpbWUoMzAwKSkuc3Vic2NyaWJlKHRleHQgPT4gdGhpcy5jYWxsU2VhcmNoQ2l0eSh0ZXh0KSk7XG4gICAgICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICAgIH1cblxuICAgIGJ1aWxkVXJsQXJyYXkgPSAoKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICAgICAgdGhpcy51cmxBcnJheSA9IHRoaXMucm91dGVyLnVybC5zcGxpdChcIj9cIilbMF0ucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNhbGxTZWFyY2hDaXR5ID0gKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHRoaXMuY2l0eUxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0cGxhY2VTZWFyY2hSZXN1bHRzKHF1ZXJ5KS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VTZWFyY2hSZXN1bHRzID0gcmVzWydkYXRhJ107XG4gICAgICAgICAgICB0aGlzLmNpdHlMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYWNlQ2hhbmdlZCA9IChwbGFjZSkgPT4ge1xuICAgICAgICBsZXQgdHNUeXBlID0gdGhpcy51cmxBcnJheVsyXTtcbiAgICAgICAgY29uc3QgdHNUeXBlVXJsID0gdHNUeXBlICYmIHRzVHlwZS5sZW5ndGggPiAwID8gJy8nICsgdHNUeXBlLnRvTG93ZXJDYXNlKCkgOiAnJztcbiAgICAgICAgaWYgKHBsYWNlLnR5cGUgPT09ICdjb3VudHJ5Jykge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJyArIHBsYWNlLnR3b0RpZ2l0Q29kZS50b0xvd2VyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICAnLycgKyBwbGFjZS5jb3VudHJ5LnNwbGl0KCcgJykuam9pbignLScpLnRvTG93ZXJDYXNlKCkgKyB0c1R5cGVVcmxdLCB7IHN0YXRlOiB7IHBsYWNlOiBwbGFjZSB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAnY2l0eScpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycgKyBwbGFjZS5jb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgcGxhY2UuY2l0eUNvZGUgKyB0c1R5cGVVcmxdLCB7IHN0YXRlOiB7IHBsYWNlOiBwbGFjZSB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAnbG9jYWxpdHknKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nICsgcGxhY2UuY291bnRyeUNvZGUudG9Mb3dlckNhc2UoKSArICcvJyArIHBsYWNlLmxvY2FsaXR5Q29kZSArICctLScgKyBwbGFjZS5jaXR5Q29kZSArIHRzVHlwZVVybF0sXG4gICAgICAgICAgICAgICAgeyBzdGF0ZTogeyBwbGFjZTogcGxhY2UgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ3Vuc3RydWN0dXJlZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwbGFjZS5uYW1lLnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAgICAgICAgIGxldCBzZWNvbmRhcnlUZXh0ID0gJyc7XG4gICAgICAgICAgICBpZiAocGxhY2Uuc2Vjb25kYXJ5VGV4dCkge1xuICAgICAgICAgICAgICAgIHNlY29uZGFyeVRleHQgPSAnLS0nICsgcGxhY2Uuc2Vjb25kYXJ5VGV4dC5yZXBsYWNlKC8sL2csICcnKS5yZXBsYWNlKC8gL2csICctJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zLycgKyBuYW1lICsgc2Vjb25kYXJ5VGV4dCArIHRzVHlwZVVybF0sIHsgc3RhdGU6IHsgcGxhY2U6IHBsYWNlIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5wbGFjZVNlcnZpY2UudXBkYXRlUGxhY2UocGxhY2UubmFtZSk7XG4gICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBwbGFjZS5uYW1lO1xuICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlQ2hhbmdlLmVtaXQocGxhY2UubmFtZSk7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgIH1cblxuICAgIG9wZW5DaXR5UG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaXR5SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHNlYXJjaENpdHkgPSAodGV4dCkgPT4ge1xuICAgICAgICBpZiAoIXRleHQgfHwgdGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VTZWFyY2hSZXN1bHRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHQgIT0gdW5kZWZpbmVkICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaXR5UXVlcnlDaGFuZ2VkLm5leHQodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVBbmRFbWl0Q2xvc2VDaXR5U3VnZ2VzdGlvbihmYWxzZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQW5kRW1pdENsb3NlQ2l0eVN1Z2dlc3Rpb24gPSAodmFsOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnMgPSB2YWw7XG4gICAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnNDaGFuZ2UuZW1pdCh0aGlzLmNsb3NlU3VnZ2VzdGlvbnMpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaXR5U2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaXR5SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG59XG4iXX0=