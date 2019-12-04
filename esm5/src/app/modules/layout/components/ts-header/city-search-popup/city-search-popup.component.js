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
        this.citySearchActive = true;
        this.router = config.router;
        this.cityQueryChanged = new Subject();
        this.cityLoading = false;
        this.callSearchCity = function (query) {
            _this.cityLoading = true;
            _this.headerService.getplaceSearchResults(query).subscribe(function (res) {
                _this.placeSearchResults = res['data'];
                _this.cityLoading = false;
            });
        };
        this.placeChanged = function (place) {
            if (place.type === 'country') {
                _this.router.navigate(['/' + place.twoDigitCode.toLowerCase()], { state: { place: place } });
            }
            if (place.type === 'city') {
                _this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.cityCode], { state: { place: place } });
            }
            if (place.type === 'locality') {
                _this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.localityCode + '--' + place.cityCode], { state: { place: place } });
            }
            if (place.type === 'unstructured') {
                var name_1 = place.name.replace(/,/g, '').replace(/ /g, '-');
                var secondaryText = place.secondaryText.replace(/,/g, '').replace(/ /g, '-');
                _this.router.navigate(['/s/' + name_1 + '--' + secondaryText], { state: { place: place } });
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
        };
        this.cityQueryChanged.pipe(debounceTime(300)).subscribe(function (text) { return _this.callSearchCity(text); });
        if (this.router.url) {
            this.urlArray = this.router.url.replace('/', '').split('/');
        }
        else {
            this.urlArray = ['in'];
        }
    }
    CitySearchPopupComponent.prototype.ngAfterViewInit = function () {
        this.citySearchActive = true;
        this.cityInput.nativeElement.focus();
    };
    CitySearchPopupComponent.prototype.ngOnInit = function () {
        console.log(this.popularPlaces);
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
            template: "<div class=\"city-suggestions enter-slide-bottom\" [class.arrow]=\"showArrow\">\n    <div class=\"suggestions-container\">\n        <ul>\n            <li [class.active]=\"citySearchActive\" class=\"p-2 capitalize cursor-pointer flex items-center truncate\">\n                <i class=\"mdi mdi-magnify mr-2\"></i>\n                <input appDataAnalytics eventLabel=\"location-dropdown-search\" clickLocation=\"\" #cityInput autocomplete=\"off\" id=\"cityInput\" type=\"text\" placeholder=\"Type here to search...\"\n                    [(ngModel)]=\"cityQuery\" (ngModelChange)=\"searchCity($event)\" (focus)=\"citySearchActive=true\"\n                    class=\"w-full bg-transparent text-sm\" />\n                <i *ngIf=\"cityLoading\" class=\"mdi mdi-loading mdi-spin\"></i>\n            </li>\n            <li matRipple (click)=\"placeChanged(place);\"\n                class=\"p-2 capitalize cursor-pointer flex items-center truncate\"\n                *ngFor=\"let place of placeSearchResults\">\n                <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                <span class=\"text-sm flex items-end truncate\">\n                    <span class=\"mr-1 whitespace-no-wrap\">{{place.name}} </span>\n                    <small class=\"text-2xs text-gray-600\"\n                        *ngIf=\"place.city && place?.city.length>0 && place?.type!='city'\">\n                        {{place.city}},\n                    </small>\n                    <small class=\"text-2xs text-gray-600\"\n                        *ngIf=\"place.country && place?.country.length>0 && place?.type!='country'\">{{place.country}}\n                    </small>\n                    <small class=\"text-2xs truncate text-gray-600\">{{place.secondaryText}}</small>\n                </span>\n            </li>\n            <ng-container matRipple *ngIf=\"!placeSearchResults || placeSearchResults.length==0\">\n                <li appDataAnalytics eventLabel=\"location-dropdown-item\" clickLocation=\"\"  (click)=\"placeChanged(city);\" class=\"p-2 px-4 cursor-pointer capitalize\"\n                    *ngFor=\"let city of popularPlaces\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                    <span class=\"text-base\">{{city.name}}</span>\n                </li>\n            </ng-container>\n        </ul>\n    </div>\n</div>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.city-suggestions{width:100%;background:#fafafa;position:absolute;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.city-suggestions .mdi-spin::before{-webkit-animation-duration:.5s;animation-duration:.5s}.city-suggestions li.active,.city-suggestions li:hover{background:#ededed}.city-suggestions.arrow{border-top:3px solid #3782c4}.city-suggestions.arrow:before{content:\" \";width:10px;position:absolute;top:-7px;left:88%;height:10px;-webkit-filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));background:#ededed;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-top:3px solid #3782c4;border-left:3px solid #3782c4}@media (min-width:991px){.city-suggestions{width:140%;left:-40%}}"]
        }),
        tslib_1.__metadata("design:paramtypes", [PlaceService, HeaderService, DatePipe])
    ], CitySearchPopupComponent);
    return CitySearchPopupComponent;
}());
export { CitySearchPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvY2l0eS1zZWFyY2gtcG9wdXAvY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXJILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU9oRDtJQXVCSSxrQ0FBb0IsWUFBMEIsRUFBVSxhQUE0QixFQUFTLFFBQWtCO1FBQS9HLGlCQU9DO1FBUG1CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBcEJ0RyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWhCLHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELDBCQUFxQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRzVFLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUd4QixXQUFNLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUcvQixxQkFBZ0IsR0FBb0Is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QWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOztpRUFBcUI7SUFDbkI7UUFBVCxNQUFNLEVBQUU7MENBQW9CLFlBQVk7dUVBQThCO0lBQzlEO1FBQVIsS0FBSyxFQUFFOztxRUFBMEI7SUFDeEI7UUFBVCxNQUFNLEVBQUU7MENBQXdCLFlBQVk7MkVBQStCO0lBQ25FO1FBQVIsS0FBSyxFQUFFOzttRUFBb0I7SUFSbkIsd0JBQXdCO1FBTHBDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsaTJFQUFpRDs7U0FFcEQsQ0FBQztpREF3Qm9DLFlBQVksRUFBeUIsYUFBYSxFQUFtQixRQUFRO09BdkJ0Ryx3QkFBd0IsQ0FtRnBDO0lBQUQsK0JBQUM7Q0FBQSxBQW5GRCxJQW1GQztTQW5GWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdHMtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uL3BsYWNlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1jaXR5LXNlYXJjaC1wb3B1cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NpdHktc2VhcmNoLXBvcHVwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jaXR5LXNlYXJjaC1wb3B1cC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENpdHlTZWFyY2hQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdjaXR5SW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjaXR5SW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQElucHV0KCkgc2hvd0Fycm93ID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBhY3RpdmVQbGFjZTogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBhY3RpdmVQbGFjZUNoYW5nZTogRXZlbnRFbWl0dGVyPFN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQElucHV0KCkgY2l0eVBvcHVwQWN0aXZlOiBib29sZWFuO1xuICAgIEBPdXRwdXQoKSBjaXR5UG9wdXBBY3RpdmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBASW5wdXQoKSBwb3B1bGFyUGxhY2VzOiBhbnk7XG5cbiAgICBjaXR5U2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICBwbGFjZVNlYXJjaFJlc3VsdHM6IGFueTtcblxuICAgIHJvdXRlcjogUm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgICB1cmxBcnJheTogYW55O1xuICAgIGNpdHlRdWVyeTogc3RyaW5nO1xuICAgIGNpdHlRdWVyeUNoYW5nZWQ6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBjbGllbnQ6IGFueTtcbiAgICBjaXR5TG9hZGluZyA9IGZhbHNlO1xuICAgIGluZGV4OiBhbnk7XG5cblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSwgcHJpdmF0ZSBoZWFkZXJTZXJ2aWNlOiBIZWFkZXJTZXJ2aWNlLCBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG4gICAgICAgIHRoaXMuY2l0eVF1ZXJ5Q2hhbmdlZC5waXBlKGRlYm91bmNlVGltZSgzMDApKS5zdWJzY3JpYmUodGV4dCA9PiB0aGlzLmNhbGxTZWFyY2hDaXR5KHRleHQpKTtcbiAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCkge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IHRoaXMucm91dGVyLnVybC5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhbGxTZWFyY2hDaXR5ID0gKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHRoaXMuY2l0eUxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0cGxhY2VTZWFyY2hSZXN1bHRzKHF1ZXJ5KS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VTZWFyY2hSZXN1bHRzID0gcmVzWydkYXRhJ107XG4gICAgICAgICAgICB0aGlzLmNpdHlMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYWNlQ2hhbmdlZCA9IChwbGFjZSkgPT4ge1xuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ2NvdW50cnknKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nICsgcGxhY2UudHdvRGlnaXRDb2RlLnRvTG93ZXJDYXNlKCldLCB7IHN0YXRlOiB7IHBsYWNlOiBwbGFjZSB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAnY2l0eScpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLycgKyBwbGFjZS5jb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgcGxhY2UuY2l0eUNvZGVdLCB7IHN0YXRlOiB7IHBsYWNlOiBwbGFjZSB9IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGFjZS50eXBlID09PSAnbG9jYWxpdHknKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nICsgcGxhY2UuY291bnRyeUNvZGUudG9Mb3dlckNhc2UoKSArICcvJyArIHBsYWNlLmxvY2FsaXR5Q29kZSArICctLScgKyBwbGFjZS5jaXR5Q29kZV0sXG4gICAgICAgICAgICAgICAgeyBzdGF0ZTogeyBwbGFjZTogcGxhY2UgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ3Vuc3RydWN0dXJlZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwbGFjZS5uYW1lLnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZGFyeVRleHQgPSBwbGFjZS5zZWNvbmRhcnlUZXh0LnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3MvJyArIG5hbWUgKyAnLS0nICsgc2Vjb25kYXJ5VGV4dF0sIHsgc3RhdGU6IHsgcGxhY2U6IHBsYWNlIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5wbGFjZVNlcnZpY2UudXBkYXRlUGxhY2UocGxhY2UubmFtZSk7XG4gICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBwbGFjZS5uYW1lO1xuICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlQ2hhbmdlLmVtaXQocGxhY2UubmFtZSk7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgIH1cblxuICAgIG9wZW5DaXR5UG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaXR5SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHNlYXJjaENpdHkgPSAodGV4dCkgPT4ge1xuICAgICAgICBpZiAoIXRleHQgfHwgdGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VTZWFyY2hSZXN1bHRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHQgIT0gdW5kZWZpbmVkICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaXR5UXVlcnlDaGFuZ2VkLm5leHQodGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY2l0eVNlYXJjaEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2l0eUlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucG9wdWxhclBsYWNlcyk7XG4gICAgfVxufVxuXG5cbiJdfQ==