import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginModalComponent } from '../../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { UserService } from '../../../../shared/services/user-service';
import { config } from '../../.././../core/app-config';
import { PlaceService } from './place.service';
import { HeaderService } from './ts-header.service';
import { take } from 'rxjs/operators';
var TsHeaderComponent = /** @class */ (function () {
    function TsHeaderComponent(headerService, placeService, dialog, userService) {
        var _this = this;
        this.headerService = headerService;
        this.placeService = placeService;
        this.dialog = dialog;
        this.userService = userService;
        this.Components = ['icon', 'createEventBtn', 'eventSearch',
            'userMenu', 'mobileSearch', 'mobileProfile', 'mobileCitySearch', 'mobileBack'];
        this.backState = false;
        this.source = 'marketplace';
        this.shadow = true;
        this.router = config.router;
        this.host = config.baseUrl;
        this.s3BucketUrl = config.s3BaseUrl + config.s3Bucket;
        this.cityPopupActive = false;
        this.clickout = function (event) {
            if (!_this.citySuggestions.nativeElement.contains(event.target)) {
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
            _this.router.navigate(['../']);
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
        if (this.router.url) {
            this.urlArray = this.router.url.replace('/', '').split('/');
        }
        else {
            this.urlArray = ['in'];
        }
    }
    TsHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.user.subscribe(function (data) {
            _this.user = data;
        });
        this.getPopularPlaces();
        this.placeService.place.subscribe(function (res) {
            var data = JSON.parse(res);
            if (data && Object.keys(data).length > 0) {
                _this.activePlace = data['currentPlace'];
                _this.activeCity = data['city'];
                _this.activeCountryCode = data['country'];
                if (_this.activeCountryCode != undefined && _this.activeCity != undefined) {
                    _this.homePageUrl = '/' + _this.activeCountryCode.toLowerCase() + '/' + _this.activeCity.toLowerCase();
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
            template: "<nav class=\"ts-header flex align-items-center\" *ngIf=\"source!='marketplace'\">\n    <div class=\"container flex align-items-center\">\n        <div class=\"navbar-header\">\n            <a appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" class=\"navbar-brand flex align-items-center\"\n                href=\"/\">\n                <img src=\"assets/images/ts-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                    title=\"Townscript Event Ticketing Logo\" />\n            </a>\n        </div>\n        <div id=\"navbar\" class=\"nav-right hidden-xs\">\n            <ul>\n                <li>\n                    <a href=\"/signup\" ts-data-analytics prop-event=\"click\" eventLabel=\"Get Started\"\n                        prop-clicked-location=\"Animated Header\">\n                        <!-- <ts-button text=\"Create Event\"></ts-button> -->\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n\n<nav class=\"ts-header-new max-w-full w-screen fixed flex items-center\" [class.shadow]=\"shadow\"\n    *ngIf=\"source=='marketplace'\">\n    <div class=\"ts-container flex items-center w-full\">\n        <div class=\"hidden md:block lg:w-1/6\">\n            <a [href]=\"homePageUrl\">\n                <img appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" (click)=\"goToHomePage()\"\n                    *ngIf=\"Components.indexOf('icon')>-1\" class=\"ts-logo cursor-pointer\" src=\"assets/images/ts-logo.svg\"\n                    alt=\"Townscript Event Ticketing Logo\" title=\"Townscript Event Ticketing Logo\" />\n            </a>\n        </div>\n        <div class=\"sm:w-1/4 max-50 flex md:hidden lg:hidden items-center\">\n            <!-- <i class=\"mdi mdi-menu mr-3 text-3xl color-blue\"></i> -->\n            <!-- <app-hamburger-menu class=\"mr-3\"></app-hamburger-menu> -->\n            <!-- <img class=\"ts-logo mr-3\" src=\"assets/images/ts-icon.svg\" alt=\"Townscript Event Ticketing Logo\"\n                title=\"Townscript Event Ticketing Logo\" /> -->\n            <div *ngIf=\"backState\" (click)=\"goBack()\"\n                class=\"rounded-full flex py-1 px-3 mr-1 justify-center items-center\" matRipple>\n                <i class=\"mdi mdi-arrow-left text-2xl color-blue\"></i>\n            </div>\n            <i *ngIf=\"Components.indexOf('mobileCitySearch')>-1 && !backState\"\n                class=\"mdi mdi-map-marker color-blue text-2xl mr-2\"></i>\n            <div *ngIf=\"Components.indexOf('mobileCitySearch')>-1\" #citySuggestions\n                class=\"city-selection text-lg cursor-pointer w-full\" (click)=\"cityPopupActive=true\">\n                <div class=\"flex items-center w-full\" matRipple>\n                    <span class=\"mr-1 text-gray-700 truncate capitalize\">{{activePlace}}</span>\n                    <i class=\"mdi mdi-menu-down color-blue\"></i>\n                </div>\n                <app-city-search-popup appDataAnalytics eventLabel=\"location-dropdown-search\" clickLocation=\"\"\n                    [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\"\n                    class=\"popup\" *ngIf=\"cityPopupActive\">\n                </app-city-search-popup>\n\n            </div>\n        </div>\n        <div class=\"lg:w-5/12 ml-3 hidden sm:hidden md:hidden lg:flex\">\n            <app-search *ngIf=\"Components.indexOf('eventSearch')>-1\" class=\"w-full\"></app-search>\n        </div>\n        <div class=\"invisible sm:w-1/4 lg:w-1/12 flex items-center ml-6 view-type text-xl color-blue\">\n            <!-- <i class=\"active text-xl mdi mdi-book-open mr-4\"></i>\n            <i class=\"mdi mdi-map-legend mr-4\"></i>\n            <i class=\"mdi mdi-calendar-today mr-4\"></i> -->\n        </div>\n        <div class=\"lg:w-1/6 hidden sm:hidden md:hidden h-full lg:flex items-center pr-8\">\n            <a [href]=\"host + 'dashboard/create-event'\" appDataAnalytics eventLabel=\"create-event\" clickLocation=\"\"\n                *ngIf=\"Components.indexOf('createEventBtn')>-1\"\n                class=\"create-btn cursor-pointer flex h-full justify-center items-center\">\n                <span class=\"text-base mr-2\">CREATE EVENT</span>\n                <i class=\"mdi mdi-ticket text-2xl\"></i>\n            </a>\n        </div>\n        <div #userMenuEle *ngIf=\"Components.indexOf('userMenu')>-1\"\n            class=\"position-relative sm:w-1/1 lg:w-1/6 justify-end hidden sm:hidden md:hidden lg:flex items-center\">\n            <div appDataAnalytics eventLabel=\"login-signup\" clickLocation=\"\"\n                class=\"flex items-center cursor-pointer px-2\" (click)=\"openLogin()\" *ngIf=\"!user\" matRipple>\n                <i class=\"mdi mdi-account-circle text-4xl mr-2 color-blue\"></i>\n                <span>Login | Signup</span>\n            </div>\n            <div class=\"flex items-center cursor-pointer\" (click)=\"userMenu=!userMenu\" *ngIf=\"user\" matRipple>\n                <img class=\"rounded-full mr-2\" width=\"36\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n                <i class=\"mdi mdi-chevron-down text-xl text-gray-700\" [class.rotate-180]=\"userMenu\"></i>\n                <!-- <span>{{user.user}}</span> -->\n            </div>\n            <div class=\"user-menu position-absolute shadow-md px-2 enter-slide-bottom\" *ngIf=\"userMenu\">\n                <app-user-menu [user]=\"user\" (close)=\"closeMyProfile($event)\"></app-user-menu>\n            </div>\n            <!-- <ts-button text=\"Login | Signup\" class=\"text-base\"></ts-button> -->\n        </div>\n\n        <!-- Mobile Menu -->\n        <div class=\"sm:w-1/1 ml-auto mr-2 flex  sm:flex md:flex lg:hidden items-center\">\n            <div *ngIf=\"Components.indexOf('mobileSearch')>-1\" class=\"rounded-full flex items-center\" matRipple\n                (click)=\"navigateToMobileSearch()\">\n                <i class=\"mdi mdi-magnify text-2xl ml-2 mr-2 color-blue\"></i>\n            </div>\n            <div *ngIf=\"Components.indexOf('mobileProfile')>-1\" class=\"rounded-full flex items-center\" matRipple>\n                <i class=\"mdi mdi-account text-2xl  ml-2 color-blue\" matRipple (click)=\"openMyProfileComponent()\"></i>\n            </div>\n        </div>\n    </div>\n</nav>\n<nav class=\"ts-header-new max-w-full w-screen flex items-center\" [class.shadow]=\"shadow\" *ngIf=\"source=='marketplace'\">\n\n</nav>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.ts-header{min-height:85px;background-color:#fff;width:100%;position:fixed;top:0;z-index:1000;box-shadow:0 15px 40px -20px rgba(40,44,63,.2)}.ts-header .container{display:-webkit-box;display:flex;width:100%;padding:0 10%}.ts-header .container .navbar-header .navbar-brand img{width:165px}.ts-header .container .nav-right{margin-left:auto}.ts-header .container .nav-right li,.ts-header .container .nav-right ul{margin-bottom:0}.ts-header-new{min-height:56px;background-color:#f7f7f7;top:0;z-index:1000}.ts-header-new .shadow{box-shadow:0 2px 4px 0 rgba(0,0,0,.11)}.ts-header-new .ts-logo{height:28px}.ts-header-new .popup{position:absolute;top:90%;width:100%;left:0}.ts-header-new .max-50{max-width:50%}@media (min-width:991px){.ts-container{padding:0 80px!important}.ts-header-new{min-height:68px}.ts-header-new .ts-logo{height:35px}.ts-header-new .view-type i{opacity:.8;padding:3px 9px}.ts-header-new .view-type i.active{opacity:1;background:#3782c4;border-radius:50%;color:#fff;box-shadow:0 0 5px 0 #8ec0ec}.ts-header-new .create-btn{width:100%;min-width:200px;border-radius:20.5px;color:#fff;white-space:nowrap;background:linear-gradient(138.55deg,#a165c4 0,#4d2370 100%);box-shadow:0 2px 4px 0 #d4b1f0;-webkit-transition:.1s;transition:.1s}.ts-header-new .create-btn:hover{box-shadow:0 4px 6px 0 #d4b1f0;-webkit-transform:translateY(-2px);transform:translateY(-2px)}.ts-header-new .user-menu{position:absolute;top:145%;width:142%;left:-33%;background:#fff}.ts-header-new .user-menu:before{content:\" \";width:0;height:0;position:absolute;top:-11px;left:84%;border-left:15px solid transparent;border-right:15px solid transparent;border-bottom:15px solid #fff;-webkit-filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09));filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09))}}:host ::ng-deep .mat-button-wrapper{font-size:16px!important}"]
        }),
        tslib_1.__metadata("design:paramtypes", [HeaderService, PlaceService, MatDialog, UserService])
    ], TsHeaderComponent);
    return TsHeaderComponent;
}());
export { TsHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDeEgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU90QztJQXdCRSwyQkFBb0IsYUFBNEIsRUFBVSxZQUEwQixFQUFVLE1BQWlCLEVBQVUsV0FBd0I7UUFBakosaUJBTUM7UUFObUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXRCeEksZUFBVSxHQUFrQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhO1lBQzNFLFVBQVUsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXhFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsV0FBTSxHQUFHLGFBQWEsQ0FBQztRQUN2QixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBS3ZCLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBR3ZCLFNBQUksR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBSzlCLGdCQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2pELG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBWXhCLGFBQVEsR0FBRyxVQUFDLEtBQUs7WUFDZixJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDOUQsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDMUQsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUE7UUFFRCxjQUFTLEdBQUcsVUFBQyxRQUFTO1lBQ3BCLElBQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDM0MsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDbEMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDOUIsWUFBWSxDQUFDLGFBQWEsR0FBRywwQkFBMEIsQ0FBQztZQUN4RCxJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN4RSxJQUFJLFFBQVEsRUFBRTtnQkFDWixXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtvQkFDeEMsUUFBUSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQTtRQUVELHdCQUFtQixHQUFHO1lBQ3BCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxJQUFJLEdBQUcsd0JBQXdCLENBQUM7UUFDOUQsQ0FBQyxDQUFBO1FBQ0QscUJBQWdCLEdBQUc7WUFDakIsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUN0RCxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQzFDO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsMkJBQXNCLEdBQUc7WUFDdkIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFBO1FBQ0QsMkJBQXNCLEdBQUc7WUFDdkIsNERBQTREO1lBQzVELHdDQUF3QztZQUN4QyxXQUFXO1lBQ1gsc0JBQXNCO1lBQ3RCLElBQUk7WUFDSixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtnQkFDaEQsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO29CQUNyQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDbEI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUNELG1CQUFjLEdBQUcsVUFBQyxLQUFLO1lBQ3JCLEtBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDO1lBQzdCLElBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFBO1FBQ0QsV0FBTSxHQUFHO1lBQ1AsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQTtRQUNELGlCQUFZLEdBQUc7WUFDYixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQTtRQUVELHFCQUFnQixHQUFHOzs7Z0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFPLEdBQUc7Ozs7O3FDQUN0QyxHQUFHLEVBQUgsd0JBQUc7Z0NBQ0MsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ25DLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQTs7Z0NBQTdFLElBQUksR0FBRyxTQUFzRTtnQ0FDbkYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO29DQUNuRCxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztvQ0FDbEIsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO29DQUN4QixPQUFPLEdBQUcsQ0FBQztnQ0FDYixDQUFDLENBQUMsQ0FBQzs7Ozs7cUJBRU4sQ0FBQyxDQUFDOzs7YUFDSixDQUFBO1FBakZDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3RDthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQTZFRCxvQ0FBUSxHQUFSO1FBQUEsaUJBZ0JDO1FBZkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNsQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBTSxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekMsSUFBSSxLQUFJLENBQUMsaUJBQWlCLElBQUksU0FBUyxJQUFJLEtBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFFO29CQUN2RSxLQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3JHO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF6SFE7UUFBUixLQUFLLEVBQUU7MENBQWEsS0FBSzt5REFDdUQ7SUFFeEU7UUFBUixLQUFLLEVBQUU7O3dEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7cURBQXdCO0lBQ3ZCO1FBQVIsS0FBSyxFQUFFOztxREFBZTtJQUMwQjtRQUFoRCxTQUFTLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7MENBQWtCLFVBQVU7OERBQUM7SUFDaEM7UUFBNUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswQ0FBYyxVQUFVOzBEQUFDO0lBd0JyRTtRQURDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzt1REFRMUM7SUF4Q1UsaUJBQWlCO1FBTDdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLG0xTUFBeUM7O1NBRTFDLENBQUM7aURBeUJtQyxhQUFhLEVBQXdCLFlBQVksRUFBa0IsU0FBUyxFQUF1QixXQUFXO09BeEJ0SSxpQkFBaUIsQ0E2SDdCO0lBQUQsd0JBQUM7Q0FBQSxBQTdIRCxJQTZIQztTQTdIWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0hlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgQ29tcG9uZW50czogQXJyYXk8U3RyaW5nPiA9IFsnaWNvbicsICdjcmVhdGVFdmVudEJ0bicsICdldmVudFNlYXJjaCcsXG4gICAgJ3VzZXJNZW51JywgJ21vYmlsZVNlYXJjaCcsICdtb2JpbGVQcm9maWxlJywgJ21vYmlsZUNpdHlTZWFyY2gnLCAnbW9iaWxlQmFjayddO1xuXG4gIEBJbnB1dCgpIGJhY2tTdGF0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzb3VyY2UgPSAnbWFya2V0cGxhY2UnO1xuICBASW5wdXQoKSBzaGFkb3cgPSB0cnVlO1xuICBAVmlld0NoaWxkKCdjaXR5U3VnZ2VzdGlvbnMnLCB7IHN0YXRpYzogZmFsc2UgfSkgY2l0eVN1Z2dlc3Rpb25zOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd1c2VyTWVudUVsZScsIHsgc3RhdGljOiBmYWxzZSB9KSB1c2VyTWVudUVsZTogRWxlbWVudFJlZjtcblxuICB1c2VyOiBhbnk7XG4gIHJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG4gIHVybEFycmF5O1xuICB1c2VyTWVudTogYW55O1xuICBob3N0OiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgYWN0aXZlUGxhY2U6IHN0cmluZztcbiAgYWN0aXZlQ2l0eTogc3RyaW5nO1xuICBhY3RpdmVDb3VudHJ5Q29kZTogc3RyaW5nO1xuICBob21lUGFnZVVybDogc3RyaW5nO1xuICBzM0J1Y2tldFVybCA9IGNvbmZpZy5zM0Jhc2VVcmwgKyBjb25maWcuczNCdWNrZXQ7XG4gIGNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICBwb3B1bGFyUGxhY2VzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBoZWFkZXJTZXJ2aWNlOiBIZWFkZXJTZXJ2aWNlLCBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLCBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgY2xpY2tvdXQgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuY2l0eVN1Z2dlc3Rpb25zLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5jaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnVzZXJNZW51RWxlLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy51c2VyTWVudSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5Mb2dpbiA9IChjYWxsYmFjaz8pOiB2b2lkID0+IHtcbiAgICBjb25zdCBkaWFsb2dDb25maWcgPSBuZXcgTWF0RGlhbG9nQ29uZmlnKCk7XG4gICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgIGRpYWxvZ0NvbmZpZy5hdXRvRm9jdXMgPSB0cnVlO1xuICAgIGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzID0gJ21hdC1kaWFsb2ctYmtnLWNvbnRhaW5lcic7XG4gICAgY29uc3QgbG9naW5EaWFsb2cgPSB0aGlzLmRpYWxvZy5vcGVuKExvZ2luTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBsb2dpbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmF2aWdhdGVUb0Rhc2hib2FyZCA9ICgpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRoaXMuaG9zdCArICdkYXNoYm9hcmQvY3JlYXRlLWV2ZW50JztcbiAgfVxuICBjcmVhdGVFdmVudENsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc291cmNlWyd2YWx1ZSddICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5uYXZpZ2F0ZVRvRGFzaGJvYXJkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbkxvZ2luKHRoaXMubmF2aWdhdGVUb0Rhc2hib2FyZCk7XG4gICAgfVxuICB9XG4gIG5hdmlnYXRlVG9Nb2JpbGVTZWFyY2ggPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbW9iaWxlL3NlYXJjaCddKTtcbiAgfVxuICBvcGVuTXlQcm9maWxlQ29tcG9uZW50ID0gKCk6IHZvaWQgPT4ge1xuICAgIC8vIGlmICh0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc291cmNlWyd2YWx1ZSddICE9IHVuZGVmaW5lZCkge1xuICAgIC8vICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcHJvZmlsZSddKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgdGhpcy5vcGVuTG9naW4oKTtcbiAgICAvLyB9XG4gICAgdGhpcy51c2VyU2VydmljZS51c2VyLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgaWYgKGRhdGEgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Byb2ZpbGUnXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW5Mb2dpbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGNsb3NlTXlQcm9maWxlID0gKGV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy51c2VyTWVudT0hdGhpcy51c2VyTWVudTtcbiAgICBpZihldmVudCAmJiBldmVudFsnbG9nb3V0J10pXG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cbiAgZ29CYWNrID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJ10pO1xuICB9XG4gIGdvVG9Ib21lUGFnZSA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lUGFnZVVybF0pO1xuICB9XG5cbiAgZ2V0UG9wdWxhclBsYWNlcyA9IGFzeW5jICgpID0+IHtcbiAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcykge1xuICAgICAgICBjb25zdCBjb3VudHJ5ID0gSlNPTi5wYXJzZSg8YW55PnJlcylbJ2NvdW50cnknXTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuaGVhZGVyU2VydmljZS5nZXRQb3B1bGFyQ2l0aWVzKGNvdW50cnkgfHwgdGhpcy51cmxBcnJheVswXSk7XG4gICAgICAgIHRoaXMucG9wdWxhclBsYWNlcyA9IGRhdGFbJ2RhdGEnXS5zbGljZSgwLCA2KS5tYXAoZWxlID0+IHtcbiAgICAgICAgICBlbGUudHlwZSA9ICdjaXR5JztcbiAgICAgICAgICBlbGUuY2l0eUNvZGUgPSBlbGUuY29kZTtcbiAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICB9KTtcbiAgICB0aGlzLmdldFBvcHVsYXJQbGFjZXMoKTtcbiAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSg8YW55PnJlcyk7XG4gICAgICBpZiAoZGF0YSAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBkYXRhWydjdXJyZW50UGxhY2UnXTtcbiAgICAgICAgdGhpcy5hY3RpdmVDaXR5ID0gZGF0YVsnY2l0eSddO1xuICAgICAgICB0aGlzLmFjdGl2ZUNvdW50cnlDb2RlID0gZGF0YVsnY291bnRyeSddO1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVDb3VudHJ5Q29kZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5hY3RpdmVDaXR5ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuaG9tZVBhZ2VVcmwgPSAnLycgKyB0aGlzLmFjdGl2ZUNvdW50cnlDb2RlLnRvTG93ZXJDYXNlKCkgKyAnLycgKyB0aGlzLmFjdGl2ZUNpdHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==