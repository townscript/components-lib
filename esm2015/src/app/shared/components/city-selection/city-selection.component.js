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
                    this.router.navigate([this.countryCode + '/' + city.code], {});
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
        if (this.data && this.data.cities) {
            this.popularCities = this.data.cities;
            this.showLoader = false;
        }
        else {
            this.getCities(this.countryCode);
        }
        this.cookieService.setCookie('cityPopupDisplayed', 'true', 1200, '/');
    }
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
export { CitySelectionModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWxlY3Rpb24vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVF4RSxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQVl0QyxZQUNrQyxJQUFTLEVBQ2xDLFNBQW9ELEVBQ3BELE1BQWlCLEVBQ2pCLGFBQTRCLEVBQzNCLGFBQTRCO1FBSkosU0FBSSxHQUFKLElBQUksQ0FBSztRQUNsQyxjQUFTLEdBQVQsU0FBUyxDQUEyQztRQUNwRCxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBZnRDLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLG9CQUFlLEdBQVEsSUFBSSxDQUFDO1FBRzVCLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLHlCQUFvQixHQUFXLE1BQU0sQ0FBQywyQkFBMkIsR0FBRyw4QkFBOEIsQ0FBQztRQUNuRyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWxCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQVd6QixVQUFLLEdBQUcsR0FBRyxFQUFFO1lB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fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNpdHktc2VsZWN0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NpdHktc2VsZWN0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvdW50cnlDb2RlOiBzdHJpbmcgPSAnaW4nO1xuICBjaXR5UG9wdXBBY3RpdmU6IGFueSA9IHRydWU7XG4gIGFjdGl2ZVBsYWNlOiBhbnk7XG4gIHBvcHVsYXJDaXRpZXM6IGFueTtcbiAgcm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgcG9wdWxhckNpdHlJbWFnZUxpbms6IHN0cmluZyA9IGNvbmZpZy5pbWFnZUNvbW1vblJlc291cmNlc0Jhc2VVcmwgKyAnL01hcmtldHBsYWNlL3BvcHVsYXItY2l0aWVzLyc7XG4gIHNob3dMb2FkZXIgPSB0cnVlO1xuICBsb2FkZXJUZXh0OiBzdHJpbmc7XG4gIGNsb3NlU3VnZ2VzdGlvbnMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q2l0eVNlbGVjdGlvbk1vZGFsQ29tcG9uZW50PixcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHVibGljIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIGNsb3NlID0gKCkgPT4ge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICBnZXRDaXRpZXMgPSBhc3luYyAoY29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zaGFyZWRTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXNCeUNvdW50cnlDb2RlKGNvZGUpO1xuICAgIHRoaXMucG9wdWxhckNpdGllcyA9IGRhdGFbJ2RhdGEnXTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBnZXRDaXR5RnJvbUxhdEFuZExvbmcgPSBhc3luYyAobGF0OiBzdHJpbmcsIGxvbmc6IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5zaGFyZWRTZXJ2aWNlLmdldE5lYXJieUNpdHkobGF0LCBsb25nKTtcbiAgICBjb25zdCBjaXR5ID0gcmVzdWx0WydkYXRhJ107XG4gICAgaWYgKGNpdHkpIHtcbiAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICB0aGlzLmxvYWRlclRleHQgPSBcIlJlZGlyZWN0aW5nIHRvIFwiICsgY2l0eS5uYW1lO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuY291bnRyeUNvZGUgKyAnLycgKyBjaXR5LmNvZGVdLCB7fSk7XG4gICAgICB9LCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdExvY2F0aW9uID0gKCk6IHZvaWQgPT4ge1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKGxvY2F0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGxhdGl0dWRlID0gbG9jYXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgY29uc3QgbG9uZ2l0dWRlID0gbG9jYXRpb24uY29vcmRzLmxvbmdpdHVkZTtcbiAgICAgIHRoaXMuZ2V0Q2l0eUZyb21MYXRBbmRMb25nKGxhdGl0dWRlLCBsb25naXR1ZGUpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0Q2xvc2VTdWdnZXN0aW9ucyA9ICh2YWwpOiB2b2lkID0+IHtcbiAgICB0aGlzLmNsb3NlU3VnZ2VzdGlvbnMgPSB2YWw7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5jaXRpZXMpIHtcbiAgICAgIHRoaXMucG9wdWxhckNpdGllcyA9IHRoaXMuZGF0YS5jaXRpZXM7XG4gICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRDaXRpZXModGhpcy5jb3VudHJ5Q29kZSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldENvb2tpZSgnY2l0eVBvcHVwRGlzcGxheWVkJywgJ3RydWUnLCAxMjAwLCAnLycpO1xuICB9XG5cbn1cbiJdfQ==