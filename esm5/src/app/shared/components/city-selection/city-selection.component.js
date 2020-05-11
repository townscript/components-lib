import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { config } from '../../../core/app-config';
import { CookieService } from '../../../core/cookie.service';
import { SharedService } from '../../../shared/services/shared.service';
var CitySelectionModalComponent = /** @class */ (function () {
    function CitySelectionModalComponent(data, dialogRef, dialog, sharedService, cookieService) {
        var _this = this;
        this.data = data;
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.sharedService = sharedService;
        this.cookieService = cookieService;
        this.countryCode = 'in';
        this.cityPopupActive = true;
        this.router = config.router;
        this.popularCityImageLink = config.imageCommonResourcesBaseUrl + '/Marketplace/popular-cities/';
        this.showLoader = true;
        this.closeSuggestions = false;
        this.close = function () {
            _this.dialogRef.close();
        };
        this.getCities = function (code) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.getPopularCitiesByCountryCode(code)];
                    case 1:
                        data = _a.sent();
                        this.popularCities = data['data'];
                        setTimeout(function () {
                            _this.showLoader = false;
                        }, 500);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getCityFromLatAndLong = function (lat, long) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result, city;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.getNearbyCity(lat, long)];
                    case 1:
                        result = _a.sent();
                        city = result['data'];
                        if (city) {
                            this.showLoader = true;
                            this.loaderText = "Redirecting to " + city.name;
                            setTimeout(function () {
                                _this.close();
                                _this.router.navigate([_this.countryCode.toLowerCase() + '/' + city.code.toLowerCase()], {});
                            }, 500);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.detectLocation = function () {
            navigator.geolocation.getCurrentPosition(function (location) {
                var latitude = location.coords.latitude;
                var longitude = location.coords.longitude;
                _this.getCityFromLatAndLong(latitude, longitude);
            });
        };
        this.setCloseSuggestions = function (val) {
            _this.closeSuggestions = val;
        };
    }
    CitySelectionModalComponent.prototype.ngOnInit = function () {
        this.dialogRef.disableClose = true;
        if (this.data && this.data.countryCode)
            this.countryCode = this.data.countryCode;
        if (this.data && this.data.cities) {
            this.popularCities = this.data.cities;
            this.showLoader = false;
        }
        else {
            this.getCities(this.countryCode);
        }
        this.cookieService.setCookie('cityPopupDisplayed', 'true', 90, '/');
    };
    CitySelectionModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-city-selection',
            template: "<div class=\"city-selection-popup md:px-5\" (click)=\"setCloseSuggestions(true)\">\n  <div class=\"view-header flex flex-col md:items-center justify-center fadeIn\">\n    <div class=\"back-button text-gray-700 text-2xl -ml-1 md:hidden\">\n      <i appDataAnalytics eventLabel=\"city-selection-back\" clickLocation=\"\" class=\"mdi mdi-arrow-left cursor-pointer\"\n        (click)=\"close()\"></i>\n    </div>\n    <div class=\"text-lg md:text-xl lg:text-2xl font-semibold text-gray-800\">Select Your City</div>\n    <div class=\"text-xs md:text-sm text-gray-600 md:text-center\">\n      Knowing your city helps us define your experience better on Townscript\n    </div>\n  </div>\n\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10 my-20 md:m-5 fadeIn\" *ngIf=\"showLoader\">\n    <mat-spinner strokeWidth=5></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\" *ngIf=\"loaderText\">{{loaderText}}</div>\n  </div>\n\n  <div class=\"view-body my-5 md:m-5\" *ngIf=\"!showLoader\" [ngClass]=\"popularCities && popularCities.length > 0 ? '' : 'md:pb-40'\">\n    <div class=\"flex justify-center search-container relative z-50 fadeIn\">\n      <div class=\"relative flex flex-auto md:block md:flex-none w-full md:w-2/5 city-search z-50\">\n        <app-city-search-popup (activePlaceChange)=\"close()\" [(closeSuggestions)]=\"closeSuggestions\"\n          [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\">\n        </app-city-search-popup>\n      </div>\n\n      <div matRipple\n        class=\"fadeIn animation-delay transition detect-location rounded-sm flex ml-1 px-2 items-center cursor-pointer py-2 flex-none\"\n        (click)=\"detectLocation()\">\n        <i class=\"mdi mdi-crosshairs-gps px-1 color-blue\"></i>\n        <div class=\"text-gray-800 text-xs md:text-sm\">Detect Location</div>\n      </div>\n    </div>\n\n    <div class=\"popular-cities my-5 fadeIn animation-delay relative z-10\" *ngIf=\"popularCities && popularCities.length > 0\">\n      <div class=\"text-lg md:text-xl lg:text-2xl font-semibold md:text-center py-5 text-gray-800\">Popular Cities in\n        {{popularCities[0].country}}</div>\n      <div class=\"city-list flex flex-wrap justify-between md:justify-around\">\n        <div *ngFor=\"let city of popularCities | slice:0:7\">\n          <div class=\"flex-auto p-2 px-5 md:mx-2 cursor-pointer w-24\" matRipple (click)=\"close()\">\n            <a [href]=\"city.countryCode.toLowerCase() + '/'+ city.code.toLowerCase()\">\n              <div class=\"flex flex-col items-center justify-center\">\n                <div class=\"image-container h-16 w-16 md:h-20 md:w-20 overflow-hidden\">\n                  <div class=\"city-image\" [style.backgroundImage]=\"'url('+popularCityImageLink + city.cityImage+')'\">\n                  </div>\n                </div>\n                <div class=\"cityName my-1 md:m-2 text-sm md:text-base whitespace-no-wrap\">{{city.name}}</div>\n              </div>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}::ng-deep .city-suggestions{box-shadow:0 1px 2px 0 rgba(0,0,0,.1)!important}.city-selection-popup .transition{-webkit-transition:.2s;transition:.2s}@media (min-width:992px){.city-selection-popup .city-search{margin-left:15%}}.city-selection-popup .detect-location{background:#ededed;box-shadow:0 1px 2px 0 rgba(0,0,0,.1)!important}.city-selection-popup .detect-location:hover{background:#e1e1e1}.city-selection-popup .popular-cities .image-container{border-radius:50%}.city-selection-popup .popular-cities .image-container .city-image{height:100px;background-color:#3782c4;background-size:contain;background-blend-mode:multiply;-webkit-transition:.15s;transition:.15s}.city-selection-popup .popular-cities .image-container .city-image:hover{background-color:#6c3b8f}"]
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [Object, MatDialogRef,
            MatDialog,
            SharedService,
            CookieService])
    ], CitySelectionModalComponent);
    return CitySelectionModalComponent;
}());
export { CitySelectionModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWxlY3Rpb24vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVF4RTtJQVlFLHFDQUNrQyxJQUFTLEVBQ2xDLFNBQW9ELEVBQ3BELE1BQWlCLEVBQ2pCLGFBQTRCLEVBQzNCLGFBQTRCO1FBTHRDLGlCQU9DO1FBTmlDLFNBQUksR0FBSixJQUFJLENBQUs7UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBMkM7UUFDcEQsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWZ0QyxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixvQkFBZSxHQUFRLElBQUksQ0FBQztRQUc1QixXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2Qix5QkFBb0IsR0FBVyxNQUFNLENBQUMsMkJBQTJCLEdBQUcsOEJBQThCLENBQUM7UUFDbkcsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVsQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFXekIsVUFBSyxHQUFHO1lBQ04sS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFL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YTtZQUNaLGFBQWE7T0FqQjNCLDJCQUEyQixDQXdFdkM7SUFBRCxrQ0FBQztDQUFBLEFBeEVELElBd0VDO1NBeEVZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNpdHktc2VsZWN0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NpdHktc2VsZWN0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvdW50cnlDb2RlOiBzdHJpbmcgPSAnaW4nO1xuICBjaXR5UG9wdXBBY3RpdmU6IGFueSA9IHRydWU7XG4gIGFjdGl2ZVBsYWNlOiBhbnk7XG4gIHBvcHVsYXJDaXRpZXM6IGFueTtcbiAgcm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgcG9wdWxhckNpdHlJbWFnZUxpbms6IHN0cmluZyA9IGNvbmZpZy5pbWFnZUNvbW1vblJlc291cmNlc0Jhc2VVcmwgKyAnL01hcmtldHBsYWNlL3BvcHVsYXItY2l0aWVzLyc7XG4gIHNob3dMb2FkZXIgPSB0cnVlO1xuICBsb2FkZXJUZXh0OiBzdHJpbmc7XG4gIGNsb3NlU3VnZ2VzdGlvbnMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q2l0eVNlbGVjdGlvbk1vZGFsQ29tcG9uZW50PixcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHVibGljIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIGNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICBnZXRDaXRpZXMgPSBhc3luYyAoY29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zaGFyZWRTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXNCeUNvdW50cnlDb2RlKGNvZGUpO1xuICAgIHRoaXMucG9wdWxhckNpdGllcyA9IGRhdGFbJ2RhdGEnXTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBnZXRDaXR5RnJvbUxhdEFuZExvbmcgPSBhc3luYyAobGF0OiBzdHJpbmcsIGxvbmc6IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5zaGFyZWRTZXJ2aWNlLmdldE5lYXJieUNpdHkobGF0LCBsb25nKTtcbiAgICBjb25zdCBjaXR5ID0gcmVzdWx0WydkYXRhJ107XG4gICAgaWYgKGNpdHkpIHtcbiAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICB0aGlzLmxvYWRlclRleHQgPSBcIlJlZGlyZWN0aW5nIHRvIFwiICsgY2l0eS5uYW1lO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuY291bnRyeUNvZGUudG9Mb3dlckNhc2UoKSArICcvJyArIGNpdHkuY29kZS50b0xvd2VyQ2FzZSgpXSwge30pO1xuICAgICAgfSwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBkZXRlY3RMb2NhdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChsb2NhdGlvbjogYW55KSA9PiB7XG4gICAgICBjb25zdCBsYXRpdHVkZSA9IGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgIGNvbnN0IGxvbmdpdHVkZSA9IGxvY2F0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICB0aGlzLmdldENpdHlGcm9tTGF0QW5kTG9uZyhsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldENsb3NlU3VnZ2VzdGlvbnMgPSAodmFsKTogdm9pZCA9PiB7XG4gICAgdGhpcy5jbG9zZVN1Z2dlc3Rpb25zID0gdmFsO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcbiAgICBpZih0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmNvdW50cnlDb2RlKVxuICAgICAgdGhpcy5jb3VudHJ5Q29kZSA9IHRoaXMuZGF0YS5jb3VudHJ5Q29kZTtcbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5jaXRpZXMpIHtcbiAgICAgIHRoaXMucG9wdWxhckNpdGllcyA9IHRoaXMuZGF0YS5jaXRpZXM7XG4gICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRDaXRpZXModGhpcy5jb3VudHJ5Q29kZSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldENvb2tpZSgnY2l0eVBvcHVwRGlzcGxheWVkJywgJ3RydWUnLCA5MCwgJy8nKTtcbiAgfVxuXG59XG4iXX0=