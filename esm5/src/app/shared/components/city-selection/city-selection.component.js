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
                                _this.router.navigate([city.countryCode.toLowerCase() + '/' + city.code.toLowerCase()], {});
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
    CitySelectionModalComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
        { type: MatDialogRef },
        { type: MatDialog },
        { type: SharedService },
        { type: CookieService }
    ]; };
    CitySelectionModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-city-selection',
            template: "<div class=\"city-selection-popup md:px-5\" (click)=\"setCloseSuggestions(true)\">\n  <div class=\"view-header flex flex-col md:items-center justify-center fadeIn\">\n    <div class=\"back-button text-gray-700 text-2xl -ml-1 md:hidden\">\n      <i appDataAnalytics eventLabel=\"city-selection-back\" clickLocation=\"\" class=\"mdi mdi-arrow-left cursor-pointer\"\n        (click)=\"close()\"></i>\n    </div>\n    <div class=\"text-lg md:text-xl lg:text-2xl font-semibold text-gray-800\">Select Your City</div>\n    <div class=\"text-xs md:text-sm text-gray-600 md:text-center\">\n      Knowing your city helps us define your experience better on Townscript\n    </div>\n  </div>\n\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10 my-20 md:m-5 fadeIn\" *ngIf=\"showLoader\">\n    <mat-spinner strokeWidth=5></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\" *ngIf=\"loaderText\">{{loaderText}}</div>\n  </div>\n\n  <div class=\"view-body my-5 md:m-5\" *ngIf=\"!showLoader\" [ngClass]=\"popularCities && popularCities.length > 0 ? '' : 'md:pb-40'\">\n    <div class=\"flex justify-center search-container relative z-50 fadeIn\">\n      <div class=\"relative flex flex-auto md:block md:flex-none w-full md:w-2/5 city-search z-50\">\n        <app-city-search-popup (activePlaceChange)=\"close()\" [(closeSuggestions)]=\"closeSuggestions\"\n          [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\">\n        </app-city-search-popup>\n      </div>\n\n      <div matRipple\n        class=\"fadeIn animation-delay transition detect-location rounded-sm flex ml-1 px-2 items-center cursor-pointer py-2 flex-none\"\n        (click)=\"detectLocation()\">\n        <i class=\"mdi mdi-crosshairs-gps px-1 color-blue\"></i>\n        <div class=\"text-gray-800 text-xs md:text-sm\">Detect Location</div>\n      </div>\n    </div>\n\n    <div class=\"popular-cities my-5 fadeIn animation-delay relative z-10\" *ngIf=\"popularCities && popularCities.length > 0\">\n      <div class=\"text-lg md:text-xl lg:text-2xl font-semibold md:text-center py-5 text-gray-800\">Popular Cities in\n        {{popularCities[0].country}}</div>\n      <div class=\"city-list flex flex-wrap justify-between md:justify-around\">\n        <div *ngFor=\"let city of popularCities | slice:0:7\">\n          <div class=\"flex-auto p-2 px-5 md:mx-2 cursor-pointer w-24\" matRipple (click)=\"close()\">\n            <a [href]=\"countryCode.toLowerCase() + '/'+ city.code.toLowerCase()\">\n              <div class=\"flex flex-col items-center justify-center\">\n                <div class=\"image-container h-16 w-16 md:h-20 md:w-20 overflow-hidden\">\n                  <div class=\"city-image\" [style.backgroundImage]=\"'url('+popularCityImageLink + city.cityImage+')'\">\n                  </div>\n                </div>\n                <div class=\"cityName my-1 md:m-2 text-sm md:text-base whitespace-no-wrap\">{{city.name}}</div>\n              </div>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}::ng-deep .city-suggestions{box-shadow:0 1px 2px 0 rgba(0,0,0,.1)!important}.city-selection-popup .transition{-webkit-transition:.2s;transition:.2s}@media (min-width:992px){.city-selection-popup .city-search{margin-left:15%}}.city-selection-popup .detect-location{background:#ededed;box-shadow:0 1px 2px 0 rgba(0,0,0,.1)!important}.city-selection-popup .detect-location:hover{background:#e1e1e1}.city-selection-popup .popular-cities .image-container{border-radius:50%}.city-selection-popup .popular-cities .image-container .city-image{height:100px;background-color:#3782c4;background-size:contain;background-blend-mode:multiply;-webkit-transition:.15s;transition:.15s}.city-selection-popup .popular-cities .image-container .city-image:hover{background-color:#6c3b8f}"]
        }),
        tslib_1.__param(0, Inject(MAT_DIALOG_DATA))
    ], CitySelectionModalComponent);
    return CitySelectionModalComponent;
}());
export { CitySelectionModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWxlY3Rpb24vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVF4RTtJQVlFLHFDQUNrQyxJQUFTLEVBQ2xDLFNBQW9ELEVBQ3BELE1BQWlCLEVBQ2pCLGFBQTRCLEVBQzNCLGFBQTRCO1FBTHRDLGlCQU9DO1FBTmlDLFNBQUksR0FBSixJQUFJLENBQUs7UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBMkM7UUFDcEQsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWZ0QyxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixvQkFBZSxHQUFRLElBQUksQ0FBQztRQUc1QixXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2Qix5QkFBb0IsR0FBVyxNQUFNLENBQUMsMkJBQTJCLEdBQUcsOEJBQThCLENBQUM7UUFDbkcsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVsQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFXekIsVUFBSyxHQUFHO1lBQ04sS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFL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QUFDO1FBY0csbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO09BYmYsMkJBQTJCLENBd0V2QztJQUFELGtDQUFDO0NBQUEsQUF4RUQsSUF3RUM7U0F4RVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY2l0eS1zZWxlY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaXR5LXNlbGVjdGlvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENpdHlTZWxlY3Rpb25Nb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY291bnRyeUNvZGU6IHN0cmluZyA9ICdpbic7XG4gIGNpdHlQb3B1cEFjdGl2ZTogYW55ID0gdHJ1ZTtcbiAgYWN0aXZlUGxhY2U6IGFueTtcbiAgcG9wdWxhckNpdGllczogYW55O1xuICByb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICBwb3B1bGFyQ2l0eUltYWdlTGluazogc3RyaW5nID0gY29uZmlnLmltYWdlQ29tbW9uUmVzb3VyY2VzQmFzZVVybCArICcvTWFya2V0cGxhY2UvcG9wdWxhci1jaXRpZXMvJztcbiAgc2hvd0xvYWRlciA9IHRydWU7XG4gIGxvYWRlclRleHQ6IHN0cmluZztcbiAgY2xvc2VTdWdnZXN0aW9ucyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQ+LFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwdWJsaWMgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcbiAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UpIHtcblxuICB9XG5cbiAgY2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIGdldENpdGllcyA9IGFzeW5jIChjb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNoYXJlZFNlcnZpY2UuZ2V0UG9wdWxhckNpdGllc0J5Q291bnRyeUNvZGUoY29kZSk7XG4gICAgdGhpcy5wb3B1bGFyQ2l0aWVzID0gZGF0YVsnZGF0YSddO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIGdldENpdHlGcm9tTGF0QW5kTG9uZyA9IGFzeW5jIChsYXQ6IHN0cmluZywgbG9uZzogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnNoYXJlZFNlcnZpY2UuZ2V0TmVhcmJ5Q2l0eShsYXQsIGxvbmcpO1xuICAgIGNvbnN0IGNpdHkgPSByZXN1bHRbJ2RhdGEnXTtcbiAgICBpZiAoY2l0eSkge1xuICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9hZGVyVGV4dCA9IFwiUmVkaXJlY3RpbmcgdG8gXCIgKyBjaXR5Lm5hbWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbY2l0eS5jb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgY2l0eS5jb2RlLnRvTG93ZXJDYXNlKCldLCB7fSk7XG4gICAgICB9LCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdExvY2F0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKGxvY2F0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGxhdGl0dWRlID0gbG9jYXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgY29uc3QgbG9uZ2l0dWRlID0gbG9jYXRpb24uY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgIHRoaXMuZ2V0Q2l0eUZyb21MYXRBbmRMb25nKGxhdGl0dWRlLCBsb25naXR1ZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0Q2xvc2VTdWdnZXN0aW9ucyA9ICh2YWwpOiB2b2lkID0+IHtcbiAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnMgPSB2YWw7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xuICAgIGlmKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEuY291bnRyeUNvZGUpXG4gICAgICB0aGlzLmNvdW50cnlDb2RlID0gdGhpcy5kYXRhLmNvdW50cnlDb2RlO1xuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmNpdGllcykge1xuICAgICAgdGhpcy5wb3B1bGFyQ2l0aWVzID0gdGhpcy5kYXRhLmNpdGllcztcbiAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldENpdGllcyh0aGlzLmNvdW50cnlDb2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0Q29va2llKCdjaXR5UG9wdXBEaXNwbGF5ZWQnLCAndHJ1ZScsIDkwLCAnLycpO1xuICB9XG5cbn1cbiJdfQ==