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
                                _this.router.navigate([_this.countryCode + '/' + city.code], {});
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
        if (this.data && this.data.cities) {
            this.popularCities = this.data.cities;
            this.showLoader = false;
        }
        else {
            this.getCities(this.countryCode);
        }
        this.cookieService.setCookie('cityPopupDisplayed', 'true', 1200, '/');
    };
    CitySelectionModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-city-selection',
            template: "<div class=\"city-selection-popup md:px-5\" (click)=\"setCloseSuggestions(true)\">\n  <div class=\"view-header flex flex-col md:items-center justify-center fadeIn\">\n    <div class=\"back-button text-gray-700 text-2xl -ml-1 md:hidden\">\n      <i appDataAnalytics eventLabel=\"city-selection-back\" clickLocation=\"\" class=\"mdi mdi-arrow-left cursor-pointer\"\n        (click)=\"close()\"></i>\n    </div>\n    <div class=\"text-lg md:text-xl lg:text-2xl font-semibold text-gray-800\">Select Your City</div>\n    <div class=\"text-xs md:text-sm text-gray-600 md:text-center\">\n      Knowing your city helps us define your experience on Townscript\n    </div>\n  </div>\n\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10 my-20 md:m-5 fadeIn\" *ngIf=\"showLoader\">\n    <mat-spinner strokeWidth=5></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\" *ngIf=\"loaderText\">{{loaderText}}</div>\n  </div>\n\n  <div class=\"view-body my-5 md:m-5\" *ngIf=\"!showLoader\">\n    <div class=\"flex justify-center search-container relative z-50 fadeIn\">\n      <div class=\"relative flex flex-auto md:block md:flex-none w-full md:w-2/5 md:ml-32 z-50\">\n        <app-city-search-popup (activePlaceChange)=\"close()\" [(closeSuggestions)]=\"closeSuggestions\"\n          [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\">\n        </app-city-search-popup>\n      </div>\n\n      <div matRipple\n        class=\"fadeIn animation-delay transition detect-location rounded-sm flex ml-1 px-2 items-center cursor-pointer py-2 flex-none\"\n        (click)=\"detectLocation()\">\n        <i class=\"mdi mdi-crosshairs-gps px-1 color-blue\"></i>\n        <div class=\"text-gray-800 text-xs md:text-sm\">Detect Location</div>\n      </div>\n    </div>\n\n    <div class=\"popular-cities my-5 fadeIn animation-delay relative z-10\" *ngIf=\"popularCities\">\n      <div class=\"text-base md:text-lg lf:text-xl font-semibold text-center py-5 text-gray-800\">Popular Cities in\n        {{popularCities[0].country}}</div>\n      <div class=\"city-list flex flex-wrap justify-between\">\n        <div *ngFor=\"let city of popularCities | slice:0:7\">\n          <div class=\"flex-auto p-2 px-5 md:mx-2 cursor-pointer w-24\" matRipple (click)=\"close()\">\n            <a [href]=\"countryCode + '/'+ city.code\">\n              <div class=\"flex flex-col items-center justify-center\">\n                <div class=\"image-container h-16 w-16 md:h-20 md:w-20 overflow-hidden\">\n                  <div class=\"city-image\" [style.backgroundImage]=\"'url('+popularCityImageLink + city.cityImage+')'\">\n                  </div>\n                </div>\n                <div class=\"cityName my-1 md:m-2 text-sm md:text-base\">{{city.name}}</div>\n              </div>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>",
            styles: [".city-selection-popup .transition{-webkit-transition:.2s;transition:.2s}.city-selection-popup .detect-location{background:#ededed;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.city-selection-popup .detect-location:hover{background:#e1e1e1}.city-selection-popup .popular-cities .image-container{border-radius:50%}.city-selection-popup .popular-cities .image-container .city-image{height:100px;background-color:#3782c4;background-size:contain;background-blend-mode:multiply;-webkit-transition:.15s;transition:.15s}.city-selection-popup .popular-cities .image-container .city-image:hover{background-color:#6c3b8f}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWxlY3Rpb24vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVF4RTtJQVlFLHFDQUNrQyxJQUFTLEVBQ2xDLFNBQW9ELEVBQ3BELE1BQWlCLEVBQ2pCLGFBQTRCLEVBQzNCLGFBQTRCO1FBTHRDLGlCQU9DO1FBTmlDLFNBQUksR0FBSixJQUFJLENBQUs7UUFDbEMsY0FBUyxHQUFULFNBQVMsQ0FBMkM7UUFDcEQsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWZ0QyxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUMzQixvQkFBZSxHQUFRLElBQUksQ0FBQztRQUc1QixXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2Qix5QkFBb0IsR0FBVyxNQUFNLENBQUMsMkJBQTJCLEdBQUcsOEJBQThCLENBQUM7UUFDbkcsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVsQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFXekIsVUFBSyxHQUFHO1lBQ04sS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUE7UUFFRCxjQUFTLEdBQUcsVUFBTyxJQUFZOzs7Ozs0QkFDaEIscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQW5FLElBQUksR0FBRyxTQUE0RDt3QkFDekUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2xDLFVBQVUsQ0FBQzs0QkFDVCxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzt3QkFDMUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7O2FBQ1QsQ0FBQTtRQUVELDBCQUFxQixHQUFHLFVBQU8sR0FBVyxFQUFFLElBQVk7Ozs7OzRCQUN2QyxxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUExRCxNQUFNLEdBQUcsU0FBaUQ7d0JBQzFELElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzVCLElBQUksSUFBSSxFQUFFOzRCQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ2hELFVBQVUsQ0FBQztnQ0FDVCxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0NBQ2IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ2pFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzt5QkFDVDs7OzthQUNGLENBQUE7UUFFRCxtQkFBYyxHQUFHO1lBQ2YsU0FBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFDLFFBQWE7Z0JBQ3JELElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUMxQyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVELHdCQUFtQixHQUFHLFVBQUMsR0FBRztZQUN4QixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBQzlCLENBQUMsQ0FBQTtJQXJDRCxDQUFDO0lBdUNELDhDQUFRLEdBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztTQUN6QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFuRVUsMkJBQTJCO1FBTHZDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsaTNGQUE4Qzs7U0FFL0MsQ0FBQztRQWNHLG1CQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTt5REFDTixZQUFZO1lBQ2YsU0FBUztZQUNGLGFBQWE7WUFDWixhQUFhO09BakIzQiwyQkFBMkIsQ0FxRXZDO0lBQUQsa0NBQUM7Q0FBQSxBQXJFRCxJQXFFQztTQXJFWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2Nvb2tpZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jaXR5LXNlbGVjdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaXR5LXNlbGVjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NpdHktc2VsZWN0aW9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2l0eVNlbGVjdGlvbk1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb3VudHJ5Q29kZTogc3RyaW5nID0gJ2luJztcbiAgY2l0eVBvcHVwQWN0aXZlOiBhbnkgPSB0cnVlO1xuICBhY3RpdmVQbGFjZTogYW55O1xuICBwb3B1bGFyQ2l0aWVzOiBhbnk7XG4gIHJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG4gIHBvcHVsYXJDaXR5SW1hZ2VMaW5rOiBzdHJpbmcgPSBjb25maWcuaW1hZ2VDb21tb25SZXNvdXJjZXNCYXNlVXJsICsgJy9NYXJrZXRwbGFjZS9wb3B1bGFyLWNpdGllcy8nO1xuICBzaG93TG9hZGVyID0gdHJ1ZTtcbiAgbG9hZGVyVGV4dDogc3RyaW5nO1xuICBjbG9zZVN1Z2dlc3Rpb25zID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENpdHlTZWxlY3Rpb25Nb2RhbENvbXBvbmVudD4sXG4gICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgIHB1YmxpYyBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSkge1xuXG4gIH1cblxuICBjbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgZ2V0Q2l0aWVzID0gYXN5bmMgKGNvZGU6IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuc2hhcmVkU2VydmljZS5nZXRQb3B1bGFyQ2l0aWVzQnlDb3VudHJ5Q29kZShjb2RlKTtcbiAgICB0aGlzLnBvcHVsYXJDaXRpZXMgPSBkYXRhWydkYXRhJ107XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgZ2V0Q2l0eUZyb21MYXRBbmRMb25nID0gYXN5bmMgKGxhdDogc3RyaW5nLCBsb25nOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hhcmVkU2VydmljZS5nZXROZWFyYnlDaXR5KGxhdCwgbG9uZyk7XG4gICAgY29uc3QgY2l0eSA9IHJlc3VsdFsnZGF0YSddO1xuICAgIGlmIChjaXR5KSB7XG4gICAgICB0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xuICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gXCJSZWRpcmVjdGluZyB0byBcIiArIGNpdHkubmFtZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmNvdW50cnlDb2RlICsgJy8nICsgY2l0eS5jb2RlXSwge30pO1xuICAgICAgfSwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBkZXRlY3RMb2NhdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChsb2NhdGlvbjogYW55KSA9PiB7XG4gICAgICBjb25zdCBsYXRpdHVkZSA9IGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgIGNvbnN0IGxvbmdpdHVkZSA9IGxvY2F0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgICB0aGlzLmdldENpdHlGcm9tTGF0QW5kTG9uZyhsYXRpdHVkZSwgbG9uZ2l0dWRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldENsb3NlU3VnZ2VzdGlvbnMgPSAodmFsKTogdm9pZCA9PiB7XG4gICAgdGhpcy5jbG9zZVN1Z2dlc3Rpb25zID0gdmFsO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEuY2l0aWVzKSB7XG4gICAgICB0aGlzLnBvcHVsYXJDaXRpZXMgPSB0aGlzLmRhdGEuY2l0aWVzO1xuICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0Q2l0aWVzKHRoaXMuY291bnRyeUNvZGUpO1xuICAgIH1cblxuICAgIHRoaXMuY29va2llU2VydmljZS5zZXRDb29raWUoJ2NpdHlQb3B1cERpc3BsYXllZCcsICd0cnVlJywgMTIwMCwgJy8nKTtcbiAgfVxuXG59XG4iXX0=