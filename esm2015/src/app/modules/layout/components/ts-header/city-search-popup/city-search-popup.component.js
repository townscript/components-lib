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
            if (place.type === 'country') {
                this.router.navigate(['/' + place.twoDigitCode.toLowerCase()], { state: { place: place } });
            }
            if (place.type === 'city') {
                this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.cityCode], { state: { place: place } });
            }
            if (place.type === 'locality') {
                this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.cityCode + '/' + place.localityCode], { state: { place: place } });
            }
            if (place.type === 'unstructured') {
                const name = place.name.replace(/,/g, '').replace(/ /g, '-');
                const secondaryText = place.secondaryText.replace(/,/g, '').replace(/ /g, '-');
                this.router.navigate(['/s/' + name + '--' + secondaryText], { state: { place: place } });
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
        this.getPopularPlaces = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.placeService.place.subscribe((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (res) {
                    const country = JSON.parse(res)['country'];
                    const data = yield this.headerService.getPopularCities(country);
                    this.popularPlaces = data['data'].slice(0, 6).map(ele => {
                        ele.type = 'city';
                        ele.cityCode = ele.code;
                        return ele;
                    });
                }
            }));
        });
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
        this.getPopularPlaces();
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
CitySearchPopupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-city-search-popup',
        template: "<div class=\"city-suggestions enter-slide-bottom\" [class.arrow]=\"showArrow\">\n    <div class=\"suggestions-container\">\n        <ul>\n            <li [class.active]=\"citySearchActive\" class=\"p-2 capitalize cursor-pointer flex items-center truncate\">\n                <i class=\"mdi mdi-magnify mr-2\"></i>\n                <input #cityInput autocomplete=\"off\" id=\"cityInput\" type=\"text\" placeholder=\"Type here to search...\"\n                    [(ngModel)]=\"cityQuery\" (ngModelChange)=\"searchCity($event)\" (focus)=\"citySearchActive=true\"\n                    class=\"w-full bg-transparent text-sm\" />\n                <i *ngIf=\"cityLoading\" class=\"mdi mdi-loading mdi-spin\"></i>\n            </li>\n            <li matRipple (click)=\"placeChanged(place);\"\n                class=\"p-2 capitalize cursor-pointer flex items-center truncate\"\n                *ngFor=\"let place of placeSearchResults\">\n                <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                <span class=\"text-sm flex items-end truncate\">\n                    <span class=\"mr-1 whitespace-no-wrap\">{{place.name}} </span>\n                    <small class=\"text-2xs text-gray-600\"\n                        *ngIf=\"place.city && place?.city.length>0 && place?.type!='city'\">\n                        {{place.city}},\n                    </small>\n                    <small class=\"text-2xs text-gray-600\"\n                        *ngIf=\"place.country && place?.country.length>0 && place?.type!='country'\">{{place.country}}\n                    </small>\n                    <small class=\"text-2xs truncate text-gray-600\">{{place.secondaryText}}</small>\n                </span>\n            </li>\n            <ng-container matRipple *ngIf=\"!placeSearchResults || placeSearchResults.length==0\">\n                <li (click)=\"placeChanged(city);\" class=\"p-2 px-4 cursor-pointer capitalize\"\n                    *ngFor=\"let city of popularPlaces\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                    <span class=\"text-base\">{{city.name}}</span>\n                </li>\n            </ng-container>\n        </ul>\n    </div>\n</div>",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.city-suggestions{width:100%;background:#fafafa;position:absolute;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.city-suggestions .mdi-spin::before{-webkit-animation-duration:.5s;animation-duration:.5s}.city-suggestions li.active,.city-suggestions li:hover{background:#ededed}.city-suggestions.arrow{border-top:3px solid #3782c4}.city-suggestions.arrow:before{content:\" \";width:10px;position:absolute;top:-7px;left:88%;height:10px;-webkit-filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));background:#ededed;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-top:3px solid #3782c4;border-left:3px solid #3782c4}@media (min-width:991px){.city-suggestions{width:140%;left:-40%}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [PlaceService, HeaderService, DatePipe])
], CitySearchPopupComponent);
export { CitySearchPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvY2l0eS1zZWFyY2gtcG9wdXAvY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXJILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU9oRCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQXVCakMsWUFBb0IsWUFBMEIsRUFBVSxhQUE0QixFQUFTLFFBQWtCO1FBQTNGLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBcEJ0RyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWhCLHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdELDBCQUFxQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRzVFLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUd4QixXQUFNLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQztR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Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSGVhZGVyU2VydmljZSB9IGZyb20gJy4uL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi9wbGFjZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtY2l0eS1zZWFyY2gtcG9wdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jaXR5LXNlYXJjaC1wb3B1cC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2l0eS1zZWFyY2gtcG9wdXAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaXR5U2VhcmNoUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gICAgQFZpZXdDaGlsZCgnY2l0eUlucHV0JywgeyBzdGF0aWM6IHRydWUgfSkgY2l0eUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBJbnB1dCgpIHNob3dBcnJvdyA9IHRydWU7XG4gICAgQElucHV0KCkgYWN0aXZlUGxhY2U6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgYWN0aXZlUGxhY2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBJbnB1dCgpIGNpdHlQb3B1cEFjdGl2ZTogYm9vbGVhbjtcbiAgICBAT3V0cHV0KCkgY2l0eVBvcHVwQWN0aXZlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIGNpdHlTZWFyY2hBY3RpdmUgPSB0cnVlO1xuICAgIHBsYWNlU2VhcmNoUmVzdWx0czogYW55O1xuXG4gICAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICAgIHVybEFycmF5OiBhbnk7XG4gICAgY2l0eVF1ZXJ5OiBzdHJpbmc7XG4gICAgY2l0eVF1ZXJ5Q2hhbmdlZDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGNsaWVudDogYW55O1xuICAgIGNpdHlMb2FkaW5nID0gZmFsc2U7XG4gICAgaW5kZXg6IGFueTtcblxuICAgIHBvcHVsYXJQbGFjZXM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgaGVhZGVyU2VydmljZTogSGVhZGVyU2VydmljZSwgcHVibGljIGRhdGVwaXBlOiBEYXRlUGlwZSkge1xuICAgICAgICB0aGlzLmNpdHlRdWVyeUNoYW5nZWQucGlwZShkZWJvdW5jZVRpbWUoMzAwKSkuc3Vic2NyaWJlKHRleHQgPT4gdGhpcy5jYWxsU2VhcmNoQ2l0eSh0ZXh0KSk7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYWxsU2VhcmNoQ2l0eSA9IChxdWVyeSkgPT4ge1xuICAgICAgICB0aGlzLmNpdHlMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldHBsYWNlU2VhcmNoUmVzdWx0cyhxdWVyeSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlU2VhcmNoUmVzdWx0cyA9IHJlc1snZGF0YSddO1xuICAgICAgICAgICAgdGhpcy5jaXR5TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwbGFjZUNoYW5nZWQgPSAocGxhY2UpID0+IHtcbiAgICAgICAgaWYgKHBsYWNlLnR5cGUgPT09ICdjb3VudHJ5Jykge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJyArIHBsYWNlLnR3b0RpZ2l0Q29kZS50b0xvd2VyQ2FzZSgpXSwgeyBzdGF0ZTogeyBwbGFjZTogcGxhY2UgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ2NpdHknKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nICsgcGxhY2UuY291bnRyeUNvZGUudG9Mb3dlckNhc2UoKSArICcvJyArIHBsYWNlLmNpdHlDb2RlXSwgeyBzdGF0ZTogeyBwbGFjZTogcGxhY2UgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ2xvY2FsaXR5Jykge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvJyArIHBsYWNlLmNvdW50cnlDb2RlLnRvTG93ZXJDYXNlKCkgKyAnLycgKyBwbGFjZS5jaXR5Q29kZSArICcvJyArIHBsYWNlLmxvY2FsaXR5Q29kZV0sXG4gICAgICAgICAgICAgICAgeyBzdGF0ZTogeyBwbGFjZTogcGxhY2UgfSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2UudHlwZSA9PT0gJ3Vuc3RydWN0dXJlZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwbGFjZS5uYW1lLnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZGFyeVRleHQgPSBwbGFjZS5zZWNvbmRhcnlUZXh0LnJlcGxhY2UoLywvZywgJycpLnJlcGxhY2UoLyAvZywgJy0nKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3MvJyArIG5hbWUgKyAnLS0nICsgc2Vjb25kYXJ5VGV4dF0sIHsgc3RhdGU6IHsgcGxhY2U6IHBsYWNlIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5wbGFjZVNlcnZpY2UudXBkYXRlUGxhY2UocGxhY2UubmFtZSk7XG4gICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBwbGFjZS5uYW1lO1xuICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlQ2hhbmdlLmVtaXQocGxhY2UubmFtZSk7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgIH1cblxuICAgIG9wZW5DaXR5UG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaXR5SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHNlYXJjaENpdHkgPSAodGV4dCkgPT4ge1xuICAgICAgICBpZiAoIXRleHQgfHwgdGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VTZWFyY2hSZXN1bHRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHQgIT0gdW5kZWZpbmVkICYmIHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaXR5UXVlcnlDaGFuZ2VkLm5leHQodGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQb3B1bGFyUGxhY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBKU09OLnBhcnNlKDxhbnk+cmVzKVsnY291bnRyeSddO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0UG9wdWxhckNpdGllcyhjb3VudHJ5KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXJQbGFjZXMgPSBkYXRhWydkYXRhJ10uc2xpY2UoMCwgNikubWFwKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsZS50eXBlID0gJ2NpdHknO1xuICAgICAgICAgICAgICAgICAgICBlbGUuY2l0eUNvZGUgPSBlbGUuY29kZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaXR5U2VhcmNoQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaXR5SW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICB9XG59XG5cblxuIl19