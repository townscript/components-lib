import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginModalComponent } from '../../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { UserService } from '../../../../shared/services/user-service';
import { config } from '../../.././../core/app-config';
import { PlaceService } from './place.service';
import { HeaderService } from './ts-header.service';
import { take } from 'rxjs/operators';
import { UtilityService } from '../../../../shared/services/utilities.service';
var TsHeaderComponent = /** @class */ (function () {
    function TsHeaderComponent(utilityService, headerService, placeService, dialog, userService) {
        var _this = this;
        this.utilityService = utilityService;
        this.headerService = headerService;
        this.placeService = placeService;
        this.dialog = dialog;
        this.userService = userService;
        this.Components = ['icon', 'createEventBtn', 'eventSearch',
            'userMenu', 'mobileSearch', 'mobileProfile', 'mobileCitySearch', 'mobileBack'];
        this.backState = false;
        this.source = 'marketplace';
        this.shadow = true;
        this.searchText = '';
        this.router = config.router;
        this.host = config.baseUrl;
        this.s3BucketUrl = config.s3BaseUrl + config.s3Bucket;
        this.cityPopupActive = false;
        this.buildUrlArray = function () {
            if (_this.router.url) {
                _this.urlArray = _this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                _this.urlArray = ['in'];
            }
        };
        this.clickout = function (event) {
            if (_this.citySuggestions && !_this.citySuggestions.nativeElement.contains(event.target)) {
                _this.cityPopupActive = false;
            }
            if (!_this.userMenuEle.nativeElement.contains(event.target)) {
                _this.userMenu = false;
            }
        };
        this.openLogin = function (callback) {
            var dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            var loginDialog = _this.dialog.open(LoginModalComponent, dialogConfig);
            if (callback) {
                loginDialog.afterClosed().subscribe(function (result) {
                    callback();
                });
            }
        };
        this.navigateToDashboard = function () {
            window.location.href = _this.host + 'dashboard/create-event';
        };
        this.createEventClick = function () {
            if (_this.userService.user.source['value'] != undefined) {
                _this.navigateToDashboard();
            }
            else {
                _this.openLogin(_this.navigateToDashboard);
            }
        };
        this.navigateToMobileSearch = function () {
            _this.router.navigate(['/mobile/search']);
        };
        this.openMyProfileComponent = function () {
            // if (this.userService.user.source['value'] != undefined) {
            //   this.router.navigate(['/profile']);
            // } else {
            //   this.openLogin();
            // }
            _this.userService.user.pipe(take(1)).subscribe(function (data) {
                if (data != undefined) {
                    _this.router.navigate(['/profile']);
                }
                else {
                    _this.openLogin();
                }
            });
        };
        this.closeMyProfile = function (event) {
            _this.userMenu = !_this.userMenu;
            if (event && event['logout'])
                window.location.reload();
        };
        this.goBack = function () {
            _this.router.navigate([_this.homePageUrl]);
        };
        this.goToHomePage = function () {
            _this.router.navigate([_this.homePageUrl]);
        };
        this.getPopularPlaces = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.placeService.place.subscribe(function (res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var country, data;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!res) return [3 /*break*/, 2];
                                if (!this.utilityService.IsJsonString(res)) return [3 /*break*/, 2];
                                country = JSON.parse(res)['country'];
                                return [4 /*yield*/, this.headerService.getPopularCities(country || this.urlArray[0])];
                            case 1:
                                data = _a.sent();
                                this.popularPlaces = data['data'].slice(0, 6).map(function (ele) {
                                    ele.type = 'city';
                                    ele.cityCode = ele.code;
                                    return ele;
                                });
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.buildUrlArray();
    }
    TsHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.user.subscribe(function (data) {
            _this.user = data;
        });
        this.getPopularPlaces();
        this.placeService.place.subscribe(function (res) {
            if (_this.utilityService.IsJsonString(res)) {
                var data = JSON.parse(res);
                if (data && Object.keys(data).length > 0) {
                    _this.activePlace = data['currentPlace'];
                    // this.activeCity = data['city'].replace(' ', '-');
                    // if (this.activeCountryCode != undefined && this.activeCity != undefined) {
                    //   this.homePageUrl = '/' + this.activeCountryCode.toLowerCase() + '/' + this.activeCity.toLowerCase();
                    // }
                    _this.activeCountryCode = data['country'];
                    if (_this.activeCountryCode !== undefined) {
                        _this.homePageUrl = "/" + _this.activeCountryCode.toLowerCase() + "/online";
                    }
                }
            }
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], TsHeaderComponent.prototype, "Components", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsHeaderComponent.prototype, "backState", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsHeaderComponent.prototype, "source", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsHeaderComponent.prototype, "shadow", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsHeaderComponent.prototype, "searchText", void 0);
    tslib_1.__decorate([
        ViewChild('citySuggestions', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], TsHeaderComponent.prototype, "citySuggestions", void 0);
    tslib_1.__decorate([
        ViewChild('userMenuEle', { static: false }),
        tslib_1.__metadata("design:type", ElementRef)
    ], TsHeaderComponent.prototype, "userMenuEle", void 0);
    tslib_1.__decorate([
        HostListener('document:click', ['$event']),
        tslib_1.__metadata("design:type", Object)
    ], TsHeaderComponent.prototype, "clickout", void 0);
    TsHeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'ts-header',
            template: "<nav class=\"ts-header flex align-items-center\" *ngIf=\"source!='marketplace'\">\n    <div class=\"container flex align-items-center\">\n        <div class=\"navbar-header\">\n            <a appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" class=\"navbar-brand flex align-items-center\"\n                href=\"/\">\n                <img src=\"assets/images/ts-bms-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                    title=\"Townscript Event Ticketing Logo\" />\n            </a>\n        </div>\n        <div id=\"navbar\" class=\"nav-right hidden-xs\">\n            <ul>\n                <li>\n                    <a href=\"/signup\" ts-data-analytics prop-event=\"click\" eventLabel=\"Get Started\"\n                        prop-clicked-location=\"Animated Header\">\n                        <!-- <ts-button text=\"Create Event\"></ts-button> -->\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n\n<nav class=\"ts-header-new max-w-full w-screen fixed flex items-center\" [class.shadow]=\"shadow\"\n    *ngIf=\"source=='marketplace'\">\n    <div class=\"ts-container flex items-center w-full\">\n        <div class=\"hidden md:block pr-10\">\n            <a [href]=\"homePageUrl\" class=\"flex items-center\">\n                <img appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" (click)=\"goToHomePage()\"\n                    *ngIf=\"Components.indexOf('icon')>-1\" class=\"ts-logo cursor-pointer\"\n                    src=\"assets/images/ts-bms-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                    title=\"Townscript Event Ticketing Logo\" />\n                <div class=\"live  items-center hidden lg:flex border-l-2 ml-4 pl-4 \"\n                    *ngIf=\"Components.indexOf('live')>-1\">\n                    <span class=\"h-4 w-4 block rounded-full bg-red-500 mr-2 border-2 border-red-300\"></span>\n                    <span class=\"text-sm text-red-500 mr-2\">LIVE </span>\n                    <!-- <span class=\"text-sm text-gray-400\"> | BETA</span> -->\n                </div>\n            </a>\n        </div>\n        <div class=\"sm:w-1/4 max-50 flex md:hidden lg:hidden items-center\">\n            <!-- <i class=\"mdi mdi-menu mr-3 text-3xl color-blue\"></i> -->\n            <app-hamburger-menu [user]=\"user\" [countryCode]=\"activeCountryCode\" [activePlace]=\"activePlace\"\n                class=\"mr-3\">\n            </app-hamburger-menu>\n            <img *ngIf=\"Components.indexOf('icon')>-1\" appDataAnalytics eventLabel=\"logo\" clickLocation=\"\"\n                (click)=\"goToHomePage()\" class=\"ts-logo mr-3 fixed ml-8\" src=\"assets/images/ts-bms-logo.svg\"\n                alt=\"Townscript Event Ticketing Logo\" title=\"Townscript Event Ticketing Logo\" />\n            <!-- <div *ngIf=\"backState\" (click)=\"goBack()\"\n                class=\"rounded-full flex py-1 px-3 mr-1 justify-center items-center\" matRipple>\n                <i class=\"mdi mdi-arrow-left text-2xl color-blue\"></i>\n            </div>\n            <i *ngIf=\"Components.indexOf('mobileCitySearch')>-1 && !backState\"\n                class=\"mdi mdi-map-marker color-blue text-2xl mr-2\"></i>\n            <div *ngIf=\"Components.indexOf('mobileCitySearch')>-1\" #citySuggestions\n                class=\"city-selection text-lg cursor-pointer w-full\" (click)=\"cityPopupActive=true\">\n                <div class=\"flex items-center w-full\" matRipple>\n                    <span class=\"mr-1 text-gray-700 truncate capitalize\">{{activePlace}}</span>\n                    <i class=\"mdi mdi-menu-down color-blue\"></i>\n                </div>\n                <app-city-search-popup appDataAnalytics eventLabel=\"locationDropdownSearch\" clickLocation=\"\"\n                    [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\"\n                    class=\"popup\" *ngIf=\"cityPopupActive\" [popularPlaces]=\"popularPlaces\">\n                </app-city-search-popup>\n\n            </div> -->\n        </div>\n        <div class=\"lg:w-5/12 ml-3 hidden sm:hidden md:hidden lg:flex\">\n            <app-search [searchText]=\"searchText\" *ngIf=\"Components.indexOf('eventSearch')>-1\" class=\"w-full\"></app-search>\n        </div>\n        <div class=\"invisible sm:w-1/4 lg:w-1/12 flex items-center ml-6 view-type text-xl color-blue\">\n            <!-- <i class=\"active text-xl mdi mdi-book-open mr-4\"></i>\n            <i class=\"mdi mdi-map-legend mr-4\"></i>\n            <i class=\"mdi mdi-calendar-today mr-4\"></i> -->\n        </div>\n        <div class=\"hidden sm:hidden md:hidden h-full lg:flex items-center pr-8\">\n            <a [href]=\"host + 'dashboard/create-event'\" appDataAnalytics eventLabel=\"createEvent\" clickLocation=\"\"\n                *ngIf=\"Components.indexOf('createEventBtn')>-1\"\n                class=\"create-btn cursor-pointer flex h-full justify-center items-center\">\n                <span class=\"font-semibold text-sm tracking-wide leading-loose mr-2\">CREATE EVENT</span>\n                <i class=\"mdi mdi-ticket text-xl md:text-2xl\"></i>\n            </a>\n        </div>\n        <div #userMenuEle *ngIf=\"Components.indexOf('userMenu')>-1\"\n            class=\"position-relative sm:w-1/1 justify-end hidden sm:hidden md:hidden lg:flex items-center ml-auto\">\n            <div appDataAnalytics eventLabel=\"loginSignup\" clickLocation=\"\"\n                class=\"flex items-center cursor-pointer px-2\" (click)=\"openLogin()\" *ngIf=\"!user\" matRipple>\n                <i class=\"mdi mdi-account-circle text-2xl md:text-4xl mr-2 color-blue\"></i>\n                <span class=\"text-gray-800 whitespace-no-wrap\">Login | Signup</span>\n            </div>\n            <div class=\"flex items-center cursor-pointer\" (click)=\"userMenu=!userMenu\" *ngIf=\"user\" matRipple>\n                <img class=\"rounded-full mr-2\" width=\"36\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n                <i class=\"mdi mdi-chevron-down text-xl text-gray-700\" [class.rotate-180]=\"userMenu\"></i>\n                <!-- <span>{{user.user}}</span> -->\n            </div>\n            <div class=\"user-menu position-absolute shadow-md px-2 enter-slide-bottom\" *ngIf=\"userMenu\">\n                <app-user-menu [user]=\"user\" (close)=\"closeMyProfile($event)\"></app-user-menu>\n            </div>\n            <!-- <ts-button text=\"Login | Signup\" class=\"text-base\"></ts-button> -->\n        </div>\n\n        <!-- Mobile Menu -->\n        <div class=\"sm:w-1/1 ml-auto flex  sm:flex md:flex lg:hidden items-center\">\n            <div *ngIf=\"Components.indexOf('mobileSearch')>-1\" class=\"rounded-full flex items-center\" matRipple\n                (click)=\"navigateToMobileSearch()\">\n                <i class=\"mdi mdi-magnify text-2xl md:mx-2 color-blue\"></i>\n            </div>\n            <!-- <div *ngIf=\"Components.indexOf('mobileProfile')>-1\" class=\"rounded-full flex items-center\" matRipple>\n                <i class=\"mdi mdi-account text-2xl  ml-2 color-blue\" matRipple (click)=\"openMyProfileComponent()\"></i>\n            </div> -->\n        </div>\n    </div>\n</nav>\n<nav class=\"ts-header-new max-w-full w-screen flex items-center\" [class.shadow]=\"shadow\" *ngIf=\"source=='marketplace'\">\n\n</nav>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.ts-header{min-height:85px;background-color:#fff;width:100%;position:fixed;top:0;z-index:1000;box-shadow:0 15px 40px -20px rgba(40,44,63,.2)}.ts-header .container{display:-webkit-box;display:flex;width:100%;padding:0 10%}.ts-header .container .navbar-header .navbar-brand img{width:10.5rem}.ts-header .container .nav-right{margin-left:auto}.ts-header .container .nav-right li,.ts-header .container .nav-right ul{margin-bottom:0}.ts-header-new{min-height:56px;background-color:#f7f7f7;top:0;z-index:1000}.ts-header-new .shadow{box-shadow:0 2px 4px 0 rgba(0,0,0,.11)}.ts-header-new .ts-logo{height:28px}.ts-header-new .popup{position:absolute;top:90%;width:100%;left:0}.ts-header-new .max-50{max-width:50%}@media (min-width:991px){.ts-container{padding:0 40px!important}.ts-header-new{min-height:65px}.ts-header-new .ts-logo{height:2.5rem}.ts-header-new .view-type i{opacity:.8;padding:3px 9px}.ts-header-new .view-type i.active{opacity:1;background:#3782c4;border-radius:50%;color:#fff;box-shadow:0 0 5px 0 #8ec0ec}.ts-header-new .create-btn{width:100%;min-width:11.5rem;border-radius:20.5px;color:#fff;white-space:nowrap;background:linear-gradient(138.55deg,#a165c4 0,#4d2370 100%);box-shadow:0 2px 4px 0 #d4b1f0;-webkit-transition:.1s;transition:.1s}.ts-header-new .create-btn:hover{box-shadow:0 4px 6px 0 #d4b1f0;-webkit-transform:translateY(-2px);transform:translateY(-2px)}.ts-header-new .user-menu{position:absolute;top:145%;width:400%;left:-275%;background:#fff}.ts-header-new .user-menu:before{content:\" \";width:0;height:0;position:absolute;top:-11px;left:84%;border-left:15px solid transparent;border-right:15px solid transparent;border-bottom:15px solid #fff;-webkit-filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09));filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09))}}:host ::ng-deep .mat-button-wrapper{font-size:16px!important}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService, HeaderService,
            PlaceService, MatDialog, UserService])
    ], TsHeaderComponent);
    return TsHeaderComponent;
}());
export { TsHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDeEgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFPL0U7SUF5QkUsMkJBQW9CLGNBQThCLEVBQVUsYUFBNEIsRUFDOUUsWUFBMEIsRUFBVSxNQUFpQixFQUFVLFdBQXdCO1FBRGpHLGlCQUdDO1FBSG1CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzlFLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBeEJ4RixlQUFVLEdBQWtCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLGFBQWE7WUFDM0Us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O29CQUM3RSx5R0FBeUc7b0JBQ3pHLElBQUk7b0JBRUosS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDekMsSUFBSSxLQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxFQUFFO3dCQUN4QyxLQUFJLENBQUMsV0FBVyxHQUFHLE1BQUksS0FBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxZQUFTLENBQUM7cUJBQ3RFO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF2SVE7UUFBUixLQUFLLEVBQUU7MENBQWEsS0FBSzt5REFDdUQ7SUFFeEU7UUFBUixLQUFLLEVBQUU7O3dEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7cURBQXdCO0lBQ3ZCO1FBQVIsS0FBSyxFQUFFOztxREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzt5REFBaUI7SUFDd0I7UUFBaEQsU0FBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOzBDQUFrQixVQUFVOzhEQUFDO0lBQ2hDO1FBQTVDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQWMsVUFBVTswREFBQztJQTZCckU7UUFEQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7dURBUTFDO0lBOUNVLGlCQUFpQjtRQUw3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixxdU9BQXlDOztTQUUxQyxDQUFDO2lEQTBCb0MsY0FBYyxFQUF5QixhQUFhO1lBQ2hFLFlBQVksRUFBa0IsU0FBUyxFQUF1QixXQUFXO09BMUJ0RixpQkFBaUIsQ0EySTdCO0lBQUQsd0JBQUM7Q0FBQSxBQTNJRCxJQTJJQztTQTNJWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0hlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgQ29tcG9uZW50czogQXJyYXk8U3RyaW5nPiA9IFsnaWNvbicsICdjcmVhdGVFdmVudEJ0bicsICdldmVudFNlYXJjaCcsXG4gICAgJ3VzZXJNZW51JywgJ21vYmlsZVNlYXJjaCcsICdtb2JpbGVQcm9maWxlJywgJ21vYmlsZUNpdHlTZWFyY2gnLCAnbW9iaWxlQmFjayddO1xuXG4gIEBJbnB1dCgpIGJhY2tTdGF0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzb3VyY2UgPSAnbWFya2V0cGxhY2UnO1xuICBASW5wdXQoKSBzaGFkb3cgPSB0cnVlO1xuICBASW5wdXQoKSBzZWFyY2hUZXh0ID0gJyc7XG4gIEBWaWV3Q2hpbGQoJ2NpdHlTdWdnZXN0aW9ucycsIHsgc3RhdGljOiBmYWxzZSB9KSBjaXR5U3VnZ2VzdGlvbnM6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3VzZXJNZW51RWxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHVzZXJNZW51RWxlOiBFbGVtZW50UmVmO1xuXG4gIHVzZXI6IGFueTtcbiAgcm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgdXJsQXJyYXk7XG4gIHVzZXJNZW51OiBhbnk7XG4gIGhvc3Q6IHN0cmluZyA9IGNvbmZpZy5iYXNlVXJsO1xuICBhY3RpdmVQbGFjZTogc3RyaW5nO1xuICBhY3RpdmVDaXR5OiBzdHJpbmc7XG4gIGFjdGl2ZUNvdW50cnlDb2RlOiBzdHJpbmc7XG4gIGhvbWVQYWdlVXJsOiBzdHJpbmc7XG4gIHMzQnVja2V0VXJsID0gY29uZmlnLnMzQmFzZVVybCArIGNvbmZpZy5zM0J1Y2tldDtcbiAgY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gIHBvcHVsYXJQbGFjZXM6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSwgcHJpdmF0ZSBoZWFkZXJTZXJ2aWNlOiBIZWFkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gIH1cblxuICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrb3V0ID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMuY2l0eVN1Z2dlc3Rpb25zICYmICF0aGlzLmNpdHlTdWdnZXN0aW9ucy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy51c2VyTWVudUVsZS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMudXNlck1lbnUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvcGVuTG9naW4gPSAoY2FsbGJhY2s/KTogdm9pZCA9PiB7XG4gICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgIGRpYWxvZ0NvbmZpZy5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgIGNvbnN0IGxvZ2luRGlhbG9nID0gdGhpcy5kaWFsb2cub3BlbihMb2dpbk1vZGFsQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgbG9naW5EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5hdmlnYXRlVG9EYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmhvc3QgKyAnZGFzaGJvYXJkL2NyZWF0ZS1ldmVudCc7XG4gIH1cbiAgY3JlYXRlRXZlbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy51c2VyU2VydmljZS51c2VyLnNvdXJjZVsndmFsdWUnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubmF2aWdhdGVUb0Rhc2hib2FyZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5Mb2dpbih0aGlzLm5hdmlnYXRlVG9EYXNoYm9hcmQpO1xuICAgIH1cbiAgfVxuICBuYXZpZ2F0ZVRvTW9iaWxlU2VhcmNoID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL21vYmlsZS9zZWFyY2gnXSk7XG4gIH1cbiAgb3Blbk15UHJvZmlsZUNvbXBvbmVudCA9ICgpOiB2b2lkID0+IHtcbiAgICAvLyBpZiAodGhpcy51c2VyU2VydmljZS51c2VyLnNvdXJjZVsndmFsdWUnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAvLyAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Byb2ZpbGUnXSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRoaXMub3BlbkxvZ2luKCk7XG4gICAgLy8gfVxuICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5waXBlKHRha2UoMSkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wcm9maWxlJ10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcGVuTG9naW4oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBjbG9zZU15UHJvZmlsZSA9IChldmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMudXNlck1lbnUgPSAhdGhpcy51c2VyTWVudTtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnRbJ2xvZ291dCddKVxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG4gIGdvQmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lUGFnZVVybF0pO1xuICB9XG4gIGdvVG9Ib21lUGFnZSA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lUGFnZVVybF0pO1xuICB9XG5cbiAgZ2V0UG9wdWxhclBsYWNlcyA9IGFzeW5jICgpID0+IHtcbiAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcykge1xuICAgICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBKU09OLnBhcnNlKDxhbnk+cmVzKVsnY291bnRyeSddO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0UG9wdWxhckNpdGllcyhjb3VudHJ5IHx8IHRoaXMudXJsQXJyYXlbMF0pO1xuICAgICAgICAgIHRoaXMucG9wdWxhclBsYWNlcyA9IGRhdGFbJ2RhdGEnXS5zbGljZSgwLCA2KS5tYXAoZWxlID0+IHtcbiAgICAgICAgICAgIGVsZS50eXBlID0gJ2NpdHknO1xuICAgICAgICAgICAgZWxlLmNpdHlDb2RlID0gZWxlLmNvZGU7XG4gICAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgfSk7XG4gICAgdGhpcy5nZXRQb3B1bGFyUGxhY2VzKCk7XG4gICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMgYXMgYW55KTtcbiAgICAgICAgaWYgKGRhdGEgJiYgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBkYXRhWydjdXJyZW50UGxhY2UnXTtcbiAgICAgICAgICAvLyB0aGlzLmFjdGl2ZUNpdHkgPSBkYXRhWydjaXR5J10ucmVwbGFjZSgnICcsICctJyk7XG4gICAgICAgICAgLy8gaWYgKHRoaXMuYWN0aXZlQ291bnRyeUNvZGUgIT0gdW5kZWZpbmVkICYmIHRoaXMuYWN0aXZlQ2l0eSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyAgIHRoaXMuaG9tZVBhZ2VVcmwgPSAnLycgKyB0aGlzLmFjdGl2ZUNvdW50cnlDb2RlLnRvTG93ZXJDYXNlKCkgKyAnLycgKyB0aGlzLmFjdGl2ZUNpdHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICB0aGlzLmFjdGl2ZUNvdW50cnlDb2RlID0gZGF0YVsnY291bnRyeSddO1xuICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNvdW50cnlDb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaG9tZVBhZ2VVcmwgPSBgLyR7dGhpcy5hY3RpdmVDb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpfS9vbmxpbmVgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==