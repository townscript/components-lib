import { __awaiter, __decorate, __generator } from "tslib";
import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
        this.getPopularPlaces = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.placeService.place.subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                    var country, data;
                    return __generator(this, function (_a) {
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
    TsHeaderComponent.ctorParameters = function () { return [
        { type: UtilityService },
        { type: HeaderService },
        { type: PlaceService },
        { type: MatDialog },
        { type: UserService }
    ]; };
    __decorate([
        Input()
    ], TsHeaderComponent.prototype, "Components", void 0);
    __decorate([
        Input()
    ], TsHeaderComponent.prototype, "backState", void 0);
    __decorate([
        Input()
    ], TsHeaderComponent.prototype, "source", void 0);
    __decorate([
        Input()
    ], TsHeaderComponent.prototype, "searchText", void 0);
    __decorate([
        ViewChild('citySuggestions')
    ], TsHeaderComponent.prototype, "citySuggestions", void 0);
    __decorate([
        ViewChild('userMenuEle')
    ], TsHeaderComponent.prototype, "userMenuEle", void 0);
    __decorate([
        HostListener('document:click', ['$event'])
    ], TsHeaderComponent.prototype, "clickout", void 0);
    TsHeaderComponent = __decorate([
        Component({
            selector: 'ts-header',
            template: "<nav class=\"ts-header flex align-items-center\" *ngIf=\"source!='marketplace'\">\n    <div class=\"container flex align-items-center\">\n        <div class=\"navbar-header\">\n            <a appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" class=\"navbar-brand flex align-items-center\"\n                href=\"/\">\n                <img src=\"assets/images/ts-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                    title=\"Townscript Event Ticketing Logo\" />\n            </a>\n        </div>\n        <div id=\"navbar\" class=\"nav-right hidden-xs\">\n            <ul>\n                <li>\n                    <a href=\"/signup\" ts-data-analytics prop-event=\"click\" eventLabel=\"Get Started\"\n                        prop-clicked-location=\"Animated Header\">\n                        <!-- <ts-button text=\"Create Event\"></ts-button> -->\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n\n<nav class=\"ts-header-new max-w-full w-screen fixed flex items-center\" *ngIf=\"source=='marketplace'\">\n    <div class=\"backdrop\"></div>\n    <div class=\"ts-container flex items-center w-full\">\n        <div class=\"hidden lg:block pr-10\">\n            <a [href]=\"homePageUrl\" class=\"flex items-center\">\n                <img appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" (click)=\"goToHomePage()\"\n                    *ngIf=\"Components.indexOf('icon')>-1\" class=\"ts-logo cursor-pointer\" src=\"assets/images/ts-logo.svg\"\n                    alt=\"Townscript Event Ticketing Logo\" title=\"Townscript Event Ticketing Logo\" />\n                <div class=\"live  items-center hidden lg:flex border-l-2 ml-4 pl-4 \"\n                    *ngIf=\"Components.indexOf('live')>-1\">\n                    <span class=\"h-4 w-4 block rounded-full bg-red-500 mr-2 border-2 border-red-300\"></span>\n                    <span class=\"text-sm text-red-500 mr-2\">LIVE </span>\n                    <!-- <span class=\"text-sm text-gray-400\"> | BETA</span> -->\n                </div>\n            </a>\n        </div>\n        <div class=\"sm:w-1/4 max-50 flex lg:hidden items-center\">\n            <!-- <i class=\"mdi mdi-menu mr-3 text-3xl color-blue\"></i> -->\n            <app-hamburger-menu [user]=\"user\" [countryCode]=\"activeCountryCode\" [activePlace]=\"activePlace\"\n                class=\"mr-3\">\n            </app-hamburger-menu>\n            <img *ngIf=\"Components.indexOf('icon')>-1\" appDataAnalytics eventLabel=\"logo\" clickLocation=\"\"\n                (click)=\"goToHomePage()\" class=\"ts-logo mr-3 fixed ml-8\" src=\"assets/images/ts-logo.svg\"\n                alt=\"Townscript Event Ticketing Logo\" title=\"Townscript Event Ticketing Logo\" />\n            <!-- <div *ngIf=\"backState\" (click)=\"goBack()\"\n                class=\"rounded-full flex py-1 px-3 mr-1 justify-center items-center\" matRipple>\n                <i class=\"mdi mdi-arrow-left text-2xl color-blue\"></i>\n            </div>\n            <i *ngIf=\"Components.indexOf('mobileCitySearch')>-1 && !backState\"\n                class=\"mdi mdi-map-marker color-blue text-2xl mr-2\"></i>\n            <div *ngIf=\"Components.indexOf('mobileCitySearch')>-1\" #citySuggestions\n                class=\"city-selection text-lg cursor-pointer w-full\" (click)=\"cityPopupActive=true\">\n                <div class=\"flex items-center w-full\" matRipple>\n                    <span class=\"mr-1 text-gray-700 truncate capitalize\">{{activePlace}}</span>\n                    <i class=\"mdi mdi-menu-down color-blue\"></i>\n                </div>\n                <app-city-search-popup appDataAnalytics eventLabel=\"locationDropdownSearch\" clickLocation=\"\"\n                    [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\"\n                    class=\"popup\" *ngIf=\"cityPopupActive\" [popularPlaces]=\"popularPlaces\">\n                </app-city-search-popup>\n\n            </div> -->\n        </div>\n        <div class=\"lg:w-5/12 ml-3 hidden sm:hidden md:hidden lg:flex\">\n            <app-search [searchText]=\"searchText\" *ngIf=\"Components.indexOf('eventSearch')>-1\" class=\"w-full\">\n            </app-search>\n        </div>\n        <div class=\"invisible sm:w-1/4 lg:w-1/6 flex items-center ml-6 view-type text-xl color-blue\">\n            <!-- <i class=\"active text-xl mdi mdi-book-open mr-4\"></i>\n            <i class=\"mdi mdi-map-legend mr-4\"></i>\n            <i class=\"mdi mdi-calendar-today mr-4\"></i> -->\n        </div>\n        <div class=\"hidden sm:hidden md:hidden h-full lg:flex items-center pr-8\">\n            <a [href]=\"host + 'dashboard/create-event'\" appDataAnalytics eventLabel=\"createEvent\" clickLocation=\"\"\n                *ngIf=\"Components.indexOf('createEventBtn')>-1\"\n                class=\"btn-cta create-btn cursor-pointer flex h-full justify-center items-center\">\n                <i class=\"mdi mdi-ticket text-xl md:text-2xl mr-2\"></i>\n                <span class=\"font-semibold text-sm tracking-wide leading-loose\">CREATE EVENT</span>\n            </a>\n        </div>\n        <div #userMenuEle *ngIf=\"Components.indexOf('userMenu')>-1\"\n            class=\"position-relative sm:w-1/1 justify-end hidden sm:hidden md:hidden lg:flex items-center ml-auto\">\n            <div appDataAnalytics eventLabel=\"loginSignup\" clickLocation=\"\"\n                class=\"flex items-center cursor-pointer px-2\" (click)=\"openLogin()\" *ngIf=\"!user\" matRipple>\n                <i class=\"mdi mdi-account-circle text-2xl md:text-4xl mr-2 text-primary\"></i>\n                <span class=\"text-gray-800 whitespace-no-wrap\">Login | Signup</span>\n            </div>\n            <div class=\"flex items-center cursor-pointer\" (click)=\"userMenu=!userMenu\" *ngIf=\"user\" matRipple>\n                <img class=\"rounded-full mr-2\" width=\"36\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n                <i class=\"mdi mdi-chevron-down text-xl text-gray-700\" [class.rotate-180]=\"userMenu\"></i>\n                <!-- <span>{{user.user}}</span> -->\n            </div>\n            <div class=\"user-menu position-absolute rounded-lg px-2 enter-slide-bottom\" *ngIf=\"userMenu\">\n                <app-user-menu [user]=\"user\" (close)=\"closeMyProfile($event)\"></app-user-menu>\n            </div>\n            <!-- <ts-button text=\"Login | Signup\" class=\"text-base\"></ts-button> -->\n        </div>\n\n        <!-- Mobile Menu -->\n        <div class=\"sm:w-1/1 ml-auto flex  sm:flex md:flex lg:hidden items-center\">\n            <div *ngIf=\"Components.indexOf('mobileSearch')>-1\" class=\"rounded-full flex items-center\" matRipple\n                (click)=\"navigateToMobileSearch()\">\n                <i class=\"mdi mdi-magnify text-2xl md:mx-2 text-primary\"></i>\n            </div>\n            <!-- <div *ngIf=\"Components.indexOf('mobileProfile')>-1\" class=\"rounded-full flex items-center\" matRipple>\n                <i class=\"mdi mdi-account text-2xl  ml-2 color-blue\" matRipple (click)=\"openMyProfileComponent()\"></i>\n            </div> -->\n        </div>\n    </div>\n</nav>\n<nav class=\"ts-header-new max-w-full w-screen flex items-center\" *ngIf=\"source=='marketplace'\">\n</nav>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.bg-primary{background-color:#563de1}.ts-header{min-height:85px;background-color:#fff;width:100%;position:fixed;top:0;z-index:1000;box-shadow:0 15px 40px -20px rgba(40,44,63,.2)}.ts-header .container{display:flex;width:100%;padding:0 10%}.ts-header .container .navbar-header .navbar-brand img{width:10.5rem}.ts-header .container .nav-right{margin-left:auto}.ts-header .container .nav-right li,.ts-header .container .nav-right ul{margin-bottom:0}.ts-header-new{min-height:56px;background:rgba(255,255,255,.6);top:0;z-index:1000}.ts-header-new .backdrop{-webkit-backdrop-filter:saturate(100%) blur(50px);backdrop-filter:saturate(100%) blur(50px);position:absolute;width:100%;height:100%;z-index:-1}.ts-header-new .ts-logo{height:20px}.ts-header-new .popup{position:absolute;top:90%;width:100%;left:0}.ts-header-new .max-50{max-width:50%}@media (min-width:991px){.ts-container{padding:0 40px!important}.ts-header-new{min-height:65px}.ts-header-new .ts-logo{height:1.5rem}.ts-header-new .view-type i{opacity:.8;padding:3px 9px}.ts-header-new .view-type i.active{opacity:1;background:#3782c4;border-radius:50%;color:#fff;box-shadow:0 0 5px 0 #8ec0ec}.ts-header-new .create-btn{width:100%;min-width:11.5rem}.ts-header-new .user-menu{position:absolute;top:120%;width:400%;left:-275%;background:#fff;box-shadow:0 0 8px rgba(0,0,0,.25)}}:host ::ng-deep .mat-button-wrapper{font-size:16px!important}"]
        })
    ], TsHeaderComponent);
    return TsHeaderComponent;
}());
export { TsHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBYyxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQU8vRTtJQXdCRSwyQkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUM5RSxZQUEwQixFQUFVLE1BQWlCLEVBQVUsV0FBd0I7UUFEakcsaUJBR0M7UUFIbUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDOUUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUF2QnhGLGVBQVUsR0FBa0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYTtZQUMzRSxVQUFVLEVBQUUs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QUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3pDLElBQUksS0FBSSxDQUFDLGlCQUFpQixLQUFLLFNBQVMsRUFBRTt3QkFDeEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFJLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsWUFBUyxDQUFDO3FCQUN0RTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFoSG1DLGNBQWM7Z0JBQXlCLGFBQWE7Z0JBQ2hFLFlBQVk7Z0JBQWtCLFNBQVM7Z0JBQXVCLFdBQVc7O0lBdkJ4RjtRQUFSLEtBQUssRUFBRTt5REFDeUU7SUFFeEU7UUFBUixLQUFLLEVBQUU7d0RBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFO3FEQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTt5REFBaUI7SUFDSztRQUE3QixTQUFTLENBQUMsaUJBQWlCLENBQUM7OERBQTZCO0lBQ2hDO1FBQXpCLFNBQVMsQ0FBQyxhQUFhLENBQUM7MERBQXlCO0lBNkJsRDtRQURDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3VEQVExQztJQTdDVSxpQkFBaUI7UUFMN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsNnJPQUF5Qzs7U0FFMUMsQ0FBQztPQUNXLGlCQUFpQixDQTBJN0I7SUFBRCx3QkFBQztDQUFBLEFBMUlELElBMElDO1NBMUlZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0hlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgQ29tcG9uZW50czogQXJyYXk8U3RyaW5nPiA9IFsnaWNvbicsICdjcmVhdGVFdmVudEJ0bicsICdldmVudFNlYXJjaCcsXG4gICAgJ3VzZXJNZW51JywgJ21vYmlsZVNlYXJjaCcsICdtb2JpbGVQcm9maWxlJywgJ21vYmlsZUNpdHlTZWFyY2gnLCAnbW9iaWxlQmFjayddO1xuXG4gIEBJbnB1dCgpIGJhY2tTdGF0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzb3VyY2UgPSAnbWFya2V0cGxhY2UnO1xuICBASW5wdXQoKSBzZWFyY2hUZXh0ID0gJyc7XG4gIEBWaWV3Q2hpbGQoJ2NpdHlTdWdnZXN0aW9ucycpIGNpdHlTdWdnZXN0aW9uczogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndXNlck1lbnVFbGUnKSB1c2VyTWVudUVsZTogRWxlbWVudFJlZjtcblxuICB1c2VyOiBhbnk7XG4gIHJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG4gIHVybEFycmF5O1xuICB1c2VyTWVudTogYW55O1xuICBob3N0OiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgYWN0aXZlUGxhY2U6IHN0cmluZztcbiAgYWN0aXZlQ2l0eTogc3RyaW5nO1xuICBhY3RpdmVDb3VudHJ5Q29kZTogc3RyaW5nO1xuICBob21lUGFnZVVybDogc3RyaW5nO1xuICBzM0J1Y2tldFVybCA9IGNvbmZpZy5zM0Jhc2VVcmwgKyBjb25maWcuczNCdWNrZXQ7XG4gIGNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICBwb3B1bGFyUGxhY2VzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgaGVhZGVyU2VydmljZTogSGVhZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLCBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICB9XG5cbiAgYnVpbGRVcmxBcnJheSA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KFwiP1wiKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja291dCA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLmNpdHlTdWdnZXN0aW9ucyAmJiAhdGhpcy5jaXR5U3VnZ2VzdGlvbnMubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudXNlck1lbnVFbGUubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLnVzZXJNZW51ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb3BlbkxvZ2luID0gKGNhbGxiYWNrPyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgZGlhbG9nQ29uZmlnLmF1dG9Gb2N1cyA9IHRydWU7XG4gICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICBjb25zdCBsb2dpbkRpYWxvZyA9IHRoaXMuZGlhbG9nLm9wZW4oTG9naW5Nb2RhbENvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGxvZ2luRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuYXZpZ2F0ZVRvRGFzaGJvYXJkID0gKCkgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5ob3N0ICsgJ2Rhc2hib2FyZC9jcmVhdGUtZXZlbnQnO1xuICB9XG4gIGNyZWF0ZUV2ZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMudXNlclNlcnZpY2UudXNlci5zb3VyY2VbJ3ZhbHVlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5hdmlnYXRlVG9EYXNoYm9hcmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuTG9naW4odGhpcy5uYXZpZ2F0ZVRvRGFzaGJvYXJkKTtcbiAgICB9XG4gIH1cbiAgbmF2aWdhdGVUb01vYmlsZVNlYXJjaCA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9tb2JpbGUvc2VhcmNoJ10pO1xuICB9XG4gIG9wZW5NeVByb2ZpbGVDb21wb25lbnQgPSAoKTogdm9pZCA9PiB7XG4gICAgLy8gaWYgKHRoaXMudXNlclNlcnZpY2UudXNlci5zb3VyY2VbJ3ZhbHVlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wcm9maWxlJ10pO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0aGlzLm9wZW5Mb2dpbigpO1xuICAgIC8vIH1cbiAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcHJvZmlsZSddKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3BlbkxvZ2luKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgY2xvc2VNeVByb2ZpbGUgPSAoZXZlbnQpOiB2b2lkID0+IHtcbiAgICB0aGlzLnVzZXJNZW51ID0gIXRoaXMudXNlck1lbnU7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50Wydsb2dvdXQnXSlcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICBnb0JhY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaG9tZVBhZ2VVcmxdKTtcbiAgfVxuICBnb1RvSG9tZVBhZ2UgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaG9tZVBhZ2VVcmxdKTtcbiAgfVxuXG4gIGdldFBvcHVsYXJQbGFjZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKGFzeW5jIChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICBjb25zdCBjb3VudHJ5ID0gSlNPTi5wYXJzZSg8YW55PnJlcylbJ2NvdW50cnknXTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSB8fCB0aGlzLnVybEFycmF5WzBdKTtcbiAgICAgICAgICB0aGlzLnBvcHVsYXJQbGFjZXMgPSBkYXRhWydkYXRhJ10uc2xpY2UoMCwgNikubWFwKGVsZSA9PiB7XG4gICAgICAgICAgICBlbGUudHlwZSA9ICdjaXR5JztcbiAgICAgICAgICAgIGVsZS5jaXR5Q29kZSA9IGVsZS5jb2RlO1xuICAgICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgIH0pO1xuICAgIHRoaXMuZ2V0UG9wdWxhclBsYWNlcygpO1xuICAgIHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzIGFzIGFueSk7XG4gICAgICAgIGlmIChkYXRhICYmIE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gZGF0YVsnY3VycmVudFBsYWNlJ107XG4gICAgICAgICAgLy8gdGhpcy5hY3RpdmVDaXR5ID0gZGF0YVsnY2l0eSddLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgICAgICAgIC8vIGlmICh0aGlzLmFjdGl2ZUNvdW50cnlDb2RlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmFjdGl2ZUNpdHkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gICB0aGlzLmhvbWVQYWdlVXJsID0gJy8nICsgdGhpcy5hY3RpdmVDb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgdGhpcy5hY3RpdmVDaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgdGhpcy5hY3RpdmVDb3VudHJ5Q29kZSA9IGRhdGFbJ2NvdW50cnknXTtcbiAgICAgICAgICBpZiAodGhpcy5hY3RpdmVDb3VudHJ5Q29kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhvbWVQYWdlVXJsID0gYC8ke3RoaXMuYWN0aXZlQ291bnRyeUNvZGUudG9Mb3dlckNhc2UoKX0vb25saW5lYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=