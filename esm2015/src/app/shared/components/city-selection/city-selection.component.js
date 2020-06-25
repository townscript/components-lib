import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { config } from '../../../core/app-config';
import { CookieService } from '../../../core/cookie.service';
import { SharedService } from '../../../shared/services/shared.service';
let CitySelectionModalComponent = class CitySelectionModalComponent {
    constructor(data, dialogRef, dialog, sharedService, cookieService) {
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
        this.close = () => {
            this.dialogRef.close();
        };
        this.getCities = (code) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.sharedService.getPopularCitiesByCountryCode(code);
            this.popularCities = data['data'];
            setTimeout(() => {
                this.showLoader = false;
            }, 500);
        });
        this.getCityFromLatAndLong = (lat, long) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.sharedService.getNearbyCity(lat, long);
            const city = result['data'];
            if (city) {
                this.showLoader = true;
                this.loaderText = "Redirecting to " + city.name;
                setTimeout(() => {
                    this.close();
                    this.router.navigate([city.countryCode.toLowerCase() + '/' + city.code.toLowerCase()], {});
                }, 500);
            }
        });
        this.detectLocation = () => {
            navigator.geolocation.getCurrentPosition((location) => {
                const latitude = location.coords.latitude;
                const longitude = location.coords.longitude;
                this.getCityFromLatAndLong(latitude, longitude);
            });
        };
        this.setCloseSuggestions = (val) => {
            this.closeSuggestions = val;
        };
    }
    ngOnInit() {
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
    }
};
CitySelectionModalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-city-selection',
        template: "<div class=\"city-selection-popup md:px-5\" (click)=\"setCloseSuggestions(true)\">\n  <div class=\"view-header flex flex-col md:items-center justify-center fadeIn\">\n    <div class=\"back-button text-gray-700 text-2xl -ml-1 md:hidden\">\n      <i appDataAnalytics eventLabel=\"city-selection-back\" clickLocation=\"\" class=\"mdi mdi-arrow-left cursor-pointer\"\n        (click)=\"close()\"></i>\n    </div>\n    <div class=\"text-lg md:text-xl lg:text-2xl font-semibold text-gray-800\">Select Your City</div>\n    <div class=\"text-xs md:text-sm text-gray-600 md:text-center\">\n      Knowing your city helps us define your experience better on Townscript\n    </div>\n  </div>\n\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10 my-20 md:m-5 fadeIn\" *ngIf=\"showLoader\">\n    <mat-spinner strokeWidth=5></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\" *ngIf=\"loaderText\">{{loaderText}}</div>\n  </div>\n\n  <div class=\"view-body my-5 md:m-5\" *ngIf=\"!showLoader\" [ngClass]=\"popularCities && popularCities.length > 0 ? '' : 'md:pb-40'\">\n    <div class=\"flex justify-center search-container relative z-50 fadeIn\">\n      <div class=\"relative flex flex-auto md:block md:flex-none w-full md:w-2/5 city-search z-50\">\n        <app-city-search-popup (activePlaceChange)=\"close()\" [(closeSuggestions)]=\"closeSuggestions\"\n          [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\">\n        </app-city-search-popup>\n      </div>\n\n      <div matRipple\n        class=\"fadeIn animation-delay transition detect-location rounded-sm flex ml-1 px-2 items-center cursor-pointer py-2 flex-none\"\n        (click)=\"detectLocation()\">\n        <i class=\"mdi mdi-crosshairs-gps px-1 color-blue\"></i>\n        <div class=\"text-gray-800 text-xs md:text-sm\">Detect Location</div>\n      </div>\n    </div>\n\n    <div class=\"popular-cities my-5 fadeIn animation-delay relative z-10\" *ngIf=\"popularCities && popularCities.length > 0\">\n      <div class=\"text-lg md:text-xl lg:text-2xl font-semibold md:text-center py-5 text-gray-800\">Popular Cities in\n        {{popularCities[0].country}}</div>\n      <div class=\"city-list flex flex-wrap justify-between md:justify-around\">\n        <div *ngFor=\"let city of popularCities | slice:0:7\">\n          <div class=\"flex-auto p-2 px-5 md:mx-2 cursor-pointer w-24\" matRipple (click)=\"close()\">\n            <a [href]=\"countryCode.toLowerCase() + '/'+ city.code.toLowerCase()\">\n              <div class=\"flex flex-col items-center justify-center\">\n                <div class=\"image-container h-16 w-16 md:h-20 md:w-20 overflow-hidden\">\n                  <div class=\"city-image\" [style.backgroundImage]=\"'url('+popularCityImageLink + city.cityImage+')'\">\n                  </div>\n                </div>\n                <div class=\"cityName my-1 md:m-2 text-sm md:text-base whitespace-no-wrap\">{{city.name}}</div>\n              </div>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}::ng-deep .city-suggestions{box-shadow:0 1px 2px 0 rgba(0,0,0,.1)!important}.city-selection-popup .transition{-webkit-transition:.2s;transition:.2s}@media (min-width:992px){.city-selection-popup .city-search{margin-left:15%}}.city-selection-popup .detect-location{background:#ededed;box-shadow:0 1px 2px 0 rgba(0,0,0,.1)!important}.city-selection-popup .detect-location:hover{background:#e1e1e1}.city-selection-popup .popular-cities .image-container{border-radius:50%}.city-selection-popup .popular-cities .image-container .city-image{height:100px;background-color:#3782c4;background-size:contain;background-blend-mode:multiply;-webkit-transition:.15s;transition:.15s}.city-selection-popup .popular-cities .image-container .city-image:hover{background-color:#6c3b8f}"]
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object, MatDialogRef,
        MatDialog,
        SharedService,
        CookieService])
], CitySelectionModalComponent);
export { CitySelectionModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWxlY3Rpb24vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVF4RSxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQVl0QyxZQUNrQyxJQUFTLEVBQ2xDLFNBQW9ELEVBQ3BELE1BQWlCLEVBQ2pCLGFBQTRCLEVBQzNCLGFBQTRCO1FBSkosU0FBSSxHQUFKLElBQUksQ0FBSztRQUNsQyxjQUFTLEdBQVQsU0FBUyxDQUEyQztRQUNwRCxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBZnRDLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLG9CQUFlLEdBQVEsSUFBSSxDQUFDO1FBRzVCLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLHlCQUFvQixHQUFXLE1BQU0sQ0FBQywyQkFBMkIsR0FBRyw4QkFBOEIsQ0FBQztRQUNuRyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWxCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQVd6QixVQUFLLEdBQUcsR0FBRyxFQUFFO1lB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QixzaUdBQThDOztLQUUvQyxDQUFDO0lBY0csbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO3FEQUNOLFlBQVk7UUFDZixTQUFTO1FBQ0YsYUFBYTtRQUNaLGFBQWE7R0FqQjNCLDJCQUEyQixDQXdFdkM7U0F4RVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY2l0eS1zZWxlY3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jaXR5LXNlbGVjdGlvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENpdHlTZWxlY3Rpb25Nb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY291bnRyeUNvZGU6IHN0cmluZyA9ICdpbic7XG4gIGNpdHlQb3B1cEFjdGl2ZTogYW55ID0gdHJ1ZTtcbiAgYWN0aXZlUGxhY2U6IGFueTtcbiAgcG9wdWxhckNpdGllczogYW55O1xuICByb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICBwb3B1bGFyQ2l0eUltYWdlTGluazogc3RyaW5nID0gY29uZmlnLmltYWdlQ29tbW9uUmVzb3VyY2VzQmFzZVVybCArICcvTWFya2V0cGxhY2UvcG9wdWxhci1jaXRpZXMvJztcbiAgc2hvd0xvYWRlciA9IHRydWU7XG4gIGxvYWRlclRleHQ6IHN0cmluZztcbiAgY2xvc2VTdWdnZXN0aW9ucyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQ+LFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwdWJsaWMgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcbiAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UpIHtcblxuICB9XG5cbiAgY2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIGdldENpdGllcyA9IGFzeW5jIChjb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNoYXJlZFNlcnZpY2UuZ2V0UG9wdWxhckNpdGllc0J5Q291bnRyeUNvZGUoY29kZSk7XG4gICAgdGhpcy5wb3B1bGFyQ2l0aWVzID0gZGF0YVsnZGF0YSddO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIGdldENpdHlGcm9tTGF0QW5kTG9uZyA9IGFzeW5jIChsYXQ6IHN0cmluZywgbG9uZzogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnNoYXJlZFNlcnZpY2UuZ2V0TmVhcmJ5Q2l0eShsYXQsIGxvbmcpO1xuICAgIGNvbnN0IGNpdHkgPSByZXN1bHRbJ2RhdGEnXTtcbiAgICBpZiAoY2l0eSkge1xuICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9hZGVyVGV4dCA9IFwiUmVkaXJlY3RpbmcgdG8gXCIgKyBjaXR5Lm5hbWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbY2l0eS5jb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgY2l0eS5jb2RlLnRvTG93ZXJDYXNlKCldLCB7fSk7XG4gICAgICB9LCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdExvY2F0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKGxvY2F0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGxhdGl0dWRlID0gbG9jYXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgY29uc3QgbG9uZ2l0dWRlID0gbG9jYXRpb24uY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgIHRoaXMuZ2V0Q2l0eUZyb21MYXRBbmRMb25nKGxhdGl0dWRlLCBsb25naXR1ZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0Q2xvc2VTdWdnZXN0aW9ucyA9ICh2YWwpOiB2b2lkID0+IHtcbiAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnMgPSB2YWw7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5kaXNhYmxlQ2xvc2UgPSB0cnVlO1xuICAgIGlmKHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEuY291bnRyeUNvZGUpXG4gICAgICB0aGlzLmNvdW50cnlDb2RlID0gdGhpcy5kYXRhLmNvdW50cnlDb2RlO1xuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmNpdGllcykge1xuICAgICAgdGhpcy5wb3B1bGFyQ2l0aWVzID0gdGhpcy5kYXRhLmNpdGllcztcbiAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldENpdGllcyh0aGlzLmNvdW50cnlDb2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0Q29va2llKCdjaXR5UG9wdXBEaXNwbGF5ZWQnLCAndHJ1ZScsIDkwLCAnLycpO1xuICB9XG5cbn1cbiJdfQ==