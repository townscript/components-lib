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
            var _a;
            if (_this.utilityService.IsJsonString(res)) {
                var data = JSON.parse(res);
                if (data && Object.keys(data).length > 0) {
                    _this.activePlace = data['currentPlace'];
                    _this.activeCountryCode = data['country'];
                    _this.activeCity = (_a = data['city']) === null || _a === void 0 ? void 0 : _a.replace(' ', '-');
                    if (_this.activeCountryCode != undefined && _this.activeCity != undefined) {
                        _this.homePageUrl = '/' + _this.activeCountryCode.toLowerCase() + '/' + _this.activeCity.toLowerCase();
                    }
                    else if (_this.activeCountryCode !== undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBYyxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQU8vRTtJQXdCRSwyQkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUM5RSxZQUEwQixFQUFVLE1BQWlCLEVBQVUsV0FBd0I7UUFEakcsaUJBR0M7UUFIbUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDOUUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUF2QnhGLGVBQVUsR0FBa0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYTtZQUMzRSxVQUFVLEVBQUUs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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9tb2R1bGVzL2xvZ2luU2lnbnVwL3RzLWxvZ2luLXNpZ251cC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4vcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi90cy1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cy1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdHMtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHMtaGVhZGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHNIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIENvbXBvbmVudHM6IEFycmF5PFN0cmluZz4gPSBbJ2ljb24nLCAnY3JlYXRlRXZlbnRCdG4nLCAnZXZlbnRTZWFyY2gnLFxuICAgICd1c2VyTWVudScsICdtb2JpbGVTZWFyY2gnLCAnbW9iaWxlUHJvZmlsZScsICdtb2JpbGVDaXR5U2VhcmNoJywgJ21vYmlsZUJhY2snXTtcblxuICBASW5wdXQoKSBiYWNrU3RhdGUgPSBmYWxzZTtcbiAgQElucHV0KCkgc291cmNlID0gJ21hcmtldHBsYWNlJztcbiAgQElucHV0KCkgc2VhcmNoVGV4dCA9ICcnO1xuICBAVmlld0NoaWxkKCdjaXR5U3VnZ2VzdGlvbnMnKSBjaXR5U3VnZ2VzdGlvbnM6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3VzZXJNZW51RWxlJykgdXNlck1lbnVFbGU6IEVsZW1lbnRSZWY7XG5cbiAgdXNlcjogYW55O1xuICByb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICB1cmxBcnJheTtcbiAgdXNlck1lbnU6IGFueTtcbiAgaG9zdDogc3RyaW5nID0gY29uZmlnLmJhc2VVcmw7XG4gIGFjdGl2ZVBsYWNlOiBzdHJpbmc7XG4gIGFjdGl2ZUNpdHk6IHN0cmluZztcbiAgYWN0aXZlQ291bnRyeUNvZGU6IHN0cmluZztcbiAgaG9tZVBhZ2VVcmw6IHN0cmluZztcbiAgczNCdWNrZXRVcmwgPSBjb25maWcuczNCYXNlVXJsICsgY29uZmlnLnMzQnVja2V0O1xuICBjaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgcG9wdWxhclBsYWNlczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLCBwcml2YXRlIGhlYWRlclNlcnZpY2U6IEhlYWRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSwgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZywgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcbiAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgfVxuXG4gIGJ1aWxkVXJsQXJyYXkgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMucm91dGVyLnVybCkge1xuICAgICAgdGhpcy51cmxBcnJheSA9IHRoaXMucm91dGVyLnVybC5zcGxpdChcIj9cIilbMF0ucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2tvdXQgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAodGhpcy5jaXR5U3VnZ2VzdGlvbnMgJiYgIXRoaXMuY2l0eVN1Z2dlc3Rpb25zLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnVzZXJNZW51RWxlLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy51c2VyTWVudSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5Mb2dpbiA9IChjYWxsYmFjaz8pOiB2b2lkID0+IHtcbiAgICBjb25zdCBkaWFsb2dDb25maWcgPSBuZXcgTWF0RGlhbG9nQ29uZmlnKCk7XG4gICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgIGRpYWxvZ0NvbmZpZy5hdXRvRm9jdXMgPSB0cnVlO1xuICAgIGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzID0gJ21hdC1kaWFsb2ctYmtnLWNvbnRhaW5lcic7XG4gICAgY29uc3QgbG9naW5EaWFsb2cgPSB0aGlzLmRpYWxvZy5vcGVuKExvZ2luTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBsb2dpbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmF2aWdhdGVUb0Rhc2hib2FyZCA9ICgpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaG9zdCArICdkYXNoYm9hcmQvY3JlYXRlLWV2ZW50JztcbiAgfVxuICBjcmVhdGVFdmVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc291cmNlWyd2YWx1ZSddICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5uYXZpZ2F0ZVRvRGFzaGJvYXJkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbkxvZ2luKHRoaXMubmF2aWdhdGVUb0Rhc2hib2FyZCk7XG4gICAgfVxuICB9XG4gIG5hdmlnYXRlVG9Nb2JpbGVTZWFyY2ggPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbW9iaWxlL3NlYXJjaCddKTtcbiAgfVxuICBvcGVuTXlQcm9maWxlQ29tcG9uZW50ID0gKCk6IHZvaWQgPT4ge1xuICAgIC8vIGlmICh0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc291cmNlWyd2YWx1ZSddICE9IHVuZGVmaW5lZCkge1xuICAgIC8vICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcHJvZmlsZSddKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgdGhpcy5vcGVuTG9naW4oKTtcbiAgICAvLyB9XG4gICAgdGhpcy51c2VyU2VydmljZS51c2VyLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Byb2ZpbGUnXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW5Mb2dpbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGNsb3NlTXlQcm9maWxlID0gKGV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy51c2VyTWVudSA9ICF0aGlzLnVzZXJNZW51O1xuICAgIGlmIChldmVudCAmJiBldmVudFsnbG9nb3V0J10pXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cbiAgZ29CYWNrID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmhvbWVQYWdlVXJsXSk7XG4gIH1cbiAgZ29Ub0hvbWVQYWdlID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLmhvbWVQYWdlVXJsXSk7XG4gIH1cblxuICBnZXRQb3B1bGFyUGxhY2VzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShhc3luYyAocmVzKSA9PiB7XG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgY29uc3QgY291bnRyeSA9IEpTT04ucGFyc2UoPGFueT5yZXMpWydjb3VudHJ5J107XG4gICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuaGVhZGVyU2VydmljZS5nZXRQb3B1bGFyQ2l0aWVzKGNvdW50cnkgfHwgdGhpcy51cmxBcnJheVswXSk7XG4gICAgICAgICAgdGhpcy5wb3B1bGFyUGxhY2VzID0gZGF0YVsnZGF0YSddLnNsaWNlKDAsIDYpLm1hcChlbGUgPT4ge1xuICAgICAgICAgICAgZWxlLnR5cGUgPSAnY2l0eSc7XG4gICAgICAgICAgICBlbGUuY2l0eUNvZGUgPSBlbGUuY29kZTtcbiAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICB9KTtcbiAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHJlcyBhcyBhbnkpO1xuICAgICAgICBpZiAoZGF0YSAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5hY3RpdmVQbGFjZSA9IGRhdGFbJ2N1cnJlbnRQbGFjZSddO1xuICAgICAgICAgIHRoaXMuYWN0aXZlQ291bnRyeUNvZGUgPSBkYXRhWydjb3VudHJ5J107XG4gICAgICAgICAgdGhpcy5hY3RpdmVDaXR5ID0gZGF0YVsnY2l0eSddPy5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICAgICAgICBpZiAodGhpcy5hY3RpdmVDb3VudHJ5Q29kZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5hY3RpdmVDaXR5ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ob21lUGFnZVVybCA9ICcvJyArIHRoaXMuYWN0aXZlQ291bnRyeUNvZGUudG9Mb3dlckNhc2UoKSArICcvJyArIHRoaXMuYWN0aXZlQ2l0eS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVDb3VudHJ5Q29kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhvbWVQYWdlVXJsID0gYC8ke3RoaXMuYWN0aXZlQ291bnRyeUNvZGUudG9Mb3dlckNhc2UoKX0vb25saW5lYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=