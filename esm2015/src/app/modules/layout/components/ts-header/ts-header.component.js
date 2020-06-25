import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginModalComponent } from '../../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { UserService } from '../../../../shared/services/user-service';
import { config } from '../../.././../core/app-config';
import { PlaceService } from './place.service';
import { HeaderService } from './ts-header.service';
import { take } from 'rxjs/operators';
import { UtilityService } from '../../../../shared/services/utilities.service';
let TsHeaderComponent = class TsHeaderComponent {
    constructor(utilityService, headerService, placeService, dialog, userService) {
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
        this.buildUrlArray = () => {
            if (this.router.url) {
                this.urlArray = this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                this.urlArray = ['in'];
            }
        };
        this.clickout = (event) => {
            if (this.citySuggestions && !this.citySuggestions.nativeElement.contains(event.target)) {
                this.cityPopupActive = false;
            }
            if (!this.userMenuEle.nativeElement.contains(event.target)) {
                this.userMenu = false;
            }
        };
        this.openLogin = (callback) => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            const loginDialog = this.dialog.open(LoginModalComponent, dialogConfig);
            if (callback) {
                loginDialog.afterClosed().subscribe(result => {
                    callback();
                });
            }
        };
        this.navigateToDashboard = () => {
            window.location.href = this.host + 'dashboard/create-event';
        };
        this.createEventClick = () => {
            if (this.userService.user.source['value'] != undefined) {
                this.navigateToDashboard();
            }
            else {
                this.openLogin(this.navigateToDashboard);
            }
        };
        this.navigateToMobileSearch = () => {
            this.router.navigate(['/mobile/search']);
        };
        this.openMyProfileComponent = () => {
            // if (this.userService.user.source['value'] != undefined) {
            //   this.router.navigate(['/profile']);
            // } else {
            //   this.openLogin();
            // }
            this.userService.user.pipe(take(1)).subscribe(data => {
                if (data != undefined) {
                    this.router.navigate(['/profile']);
                }
                else {
                    this.openLogin();
                }
            });
        };
        this.closeMyProfile = (event) => {
            this.userMenu = !this.userMenu;
            if (event && event['logout'])
                window.location.reload();
        };
        this.goBack = () => {
            this.router.navigate([this.homePageUrl]);
        };
        this.goToHomePage = () => {
            this.router.navigate([this.homePageUrl]);
        };
        this.getPopularPlaces = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.placeService.place.subscribe((res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (res) {
                    if (this.utilityService.IsJsonString(res)) {
                        const country = JSON.parse(res)['country'];
                        const data = yield this.headerService.getPopularCities(country || this.urlArray[0]);
                        this.popularPlaces = data['data'].slice(0, 6).map(ele => {
                            ele.type = 'city';
                            ele.cityCode = ele.code;
                            return ele;
                        });
                    }
                }
            }));
        });
        this.buildUrlArray();
    }
    ngOnInit() {
        this.userService.user.subscribe(data => {
            this.user = data;
        });
        this.getPopularPlaces();
        this.placeService.place.subscribe(res => {
            if (this.utilityService.IsJsonString(res)) {
                let data = JSON.parse(res);
                if (data && Object.keys(data).length > 0) {
                    this.activePlace = data['currentPlace'];
                    this.activeCity = data['city'].replace(' ', '-');
                    this.activeCountryCode = data['country'];
                    if (this.activeCountryCode != undefined && this.activeCity != undefined) {
                        this.homePageUrl = '/' + this.activeCountryCode.toLowerCase() + '/' + this.activeCity.toLowerCase();
                    }
                }
            }
        });
    }
};
TsHeaderComponent.ctorParameters = () => [
    { type: UtilityService },
    { type: HeaderService },
    { type: PlaceService },
    { type: MatDialog },
    { type: UserService }
];
tslib_1.__decorate([
    Input()
], TsHeaderComponent.prototype, "Components", void 0);
tslib_1.__decorate([
    Input()
], TsHeaderComponent.prototype, "backState", void 0);
tslib_1.__decorate([
    Input()
], TsHeaderComponent.prototype, "source", void 0);
tslib_1.__decorate([
    Input()
], TsHeaderComponent.prototype, "shadow", void 0);
tslib_1.__decorate([
    Input()
], TsHeaderComponent.prototype, "searchText", void 0);
tslib_1.__decorate([
    ViewChild('citySuggestions', { static: false })
], TsHeaderComponent.prototype, "citySuggestions", void 0);
tslib_1.__decorate([
    ViewChild('userMenuEle', { static: false })
], TsHeaderComponent.prototype, "userMenuEle", void 0);
tslib_1.__decorate([
    HostListener('document:click', ['$event'])
], TsHeaderComponent.prototype, "clickout", void 0);
TsHeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'ts-header',
        template: "<nav class=\"ts-header flex align-items-center\" *ngIf=\"source!='marketplace'\">\n    <div class=\"container flex align-items-center\">\n        <div class=\"navbar-header\">\n            <a appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" class=\"navbar-brand flex align-items-center\"\n                href=\"/\">\n                <img src=\"assets/images/ts-bms-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                    title=\"Townscript Event Ticketing Logo\" />\n            </a>\n        </div>\n        <div id=\"navbar\" class=\"nav-right hidden-xs\">\n            <ul>\n                <li>\n                    <a href=\"/signup\" ts-data-analytics prop-event=\"click\" eventLabel=\"Get Started\"\n                        prop-clicked-location=\"Animated Header\">\n                        <!-- <ts-button text=\"Create Event\"></ts-button> -->\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n\n<nav class=\"ts-header-new max-w-full w-screen fixed flex items-center\" [class.shadow]=\"shadow\"\n    *ngIf=\"source=='marketplace'\">\n    <div class=\"ts-container flex items-center w-full\">\n        <div class=\"hidden md:block pr-10\">\n            <a [href]=\"homePageUrl\" class=\"flex items-center\">\n                <img appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" (click)=\"goToHomePage()\"\n                    *ngIf=\"Components.indexOf('icon')>-1\" class=\"ts-logo cursor-pointer\"\n                    src=\"assets/images/ts-bms-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                    title=\"Townscript Event Ticketing Logo\" />\n                <div class=\"live  items-center hidden lg:flex border-l-2 ml-4 pl-4 \"\n                    *ngIf=\"Components.indexOf('live')>-1\">\n                    <span class=\"h-4 w-4 block rounded-full bg-red-500 mr-2 border-2 border-red-300\"></span>\n                    <span class=\"text-sm text-red-500 mr-2\">LIVE </span>\n                    <!-- <span class=\"text-sm text-gray-400\"> | BETA</span> -->\n                </div>\n            </a>\n        </div>\n        <div class=\"sm:w-1/4 max-50 flex md:hidden lg:hidden items-center\">\n            <!-- <i class=\"mdi mdi-menu mr-3 text-3xl color-blue\"></i> -->\n            <app-hamburger-menu [user]=\"user\" [countryCode]=\"activeCountryCode\" [activePlace]=\"activePlace\"\n                class=\"mr-3\">\n            </app-hamburger-menu>\n            <img *ngIf=\"Components.indexOf('icon')>-1\" appDataAnalytics eventLabel=\"logo\" clickLocation=\"\"\n                (click)=\"goToHomePage()\" class=\"ts-logo mr-3 fixed ml-8\" src=\"assets/images/ts-bms-logo.svg\"\n                alt=\"Townscript Event Ticketing Logo\" title=\"Townscript Event Ticketing Logo\" />\n            <!-- <div *ngIf=\"backState\" (click)=\"goBack()\"\n                class=\"rounded-full flex py-1 px-3 mr-1 justify-center items-center\" matRipple>\n                <i class=\"mdi mdi-arrow-left text-2xl color-blue\"></i>\n            </div>\n            <i *ngIf=\"Components.indexOf('mobileCitySearch')>-1 && !backState\"\n                class=\"mdi mdi-map-marker color-blue text-2xl mr-2\"></i>\n            <div *ngIf=\"Components.indexOf('mobileCitySearch')>-1\" #citySuggestions\n                class=\"city-selection text-lg cursor-pointer w-full\" (click)=\"cityPopupActive=true\">\n                <div class=\"flex items-center w-full\" matRipple>\n                    <span class=\"mr-1 text-gray-700 truncate capitalize\">{{activePlace}}</span>\n                    <i class=\"mdi mdi-menu-down color-blue\"></i>\n                </div>\n                <app-city-search-popup appDataAnalytics eventLabel=\"locationDropdownSearch\" clickLocation=\"\"\n                    [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\"\n                    class=\"popup\" *ngIf=\"cityPopupActive\" [popularPlaces]=\"popularPlaces\">\n                </app-city-search-popup>\n\n            </div> -->\n        </div>\n        <div class=\"lg:w-5/12 ml-3 hidden sm:hidden md:hidden lg:flex\">\n            <app-search [searchText]=\"searchText\" *ngIf=\"Components.indexOf('eventSearch')>-1\" class=\"w-full\"></app-search>\n        </div>\n        <div class=\"invisible sm:w-1/4 lg:w-1/12 flex items-center ml-6 view-type text-xl color-blue\">\n            <!-- <i class=\"active text-xl mdi mdi-book-open mr-4\"></i>\n            <i class=\"mdi mdi-map-legend mr-4\"></i>\n            <i class=\"mdi mdi-calendar-today mr-4\"></i> -->\n        </div>\n        <div class=\"hidden sm:hidden md:hidden h-full lg:flex items-center pr-8\">\n            <a [href]=\"host + 'dashboard/create-event'\" appDataAnalytics eventLabel=\"createEvent\" clickLocation=\"\"\n                *ngIf=\"Components.indexOf('createEventBtn')>-1\"\n                class=\"create-btn cursor-pointer flex h-full justify-center items-center\">\n                <span class=\"font-semibold text-sm tracking-wide leading-loose mr-2\">CREATE EVENT</span>\n                <i class=\"mdi mdi-ticket text-xl md:text-2xl\"></i>\n            </a>\n        </div>\n        <div #userMenuEle *ngIf=\"Components.indexOf('userMenu')>-1\"\n            class=\"position-relative sm:w-1/1 justify-end hidden sm:hidden md:hidden lg:flex items-center ml-auto\">\n            <div appDataAnalytics eventLabel=\"loginSignup\" clickLocation=\"\"\n                class=\"flex items-center cursor-pointer px-2\" (click)=\"openLogin()\" *ngIf=\"!user\" matRipple>\n                <i class=\"mdi mdi-account-circle text-2xl md:text-4xl mr-2 color-blue\"></i>\n                <span class=\"text-gray-800 whitespace-no-wrap\">Login | Signup</span>\n            </div>\n            <div class=\"flex items-center cursor-pointer\" (click)=\"userMenu=!userMenu\" *ngIf=\"user\" matRipple>\n                <img class=\"rounded-full mr-2\" width=\"36\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n                <i class=\"mdi mdi-chevron-down text-xl text-gray-700\" [class.rotate-180]=\"userMenu\"></i>\n                <!-- <span>{{user.user}}</span> -->\n            </div>\n            <div class=\"user-menu position-absolute shadow-md px-2 enter-slide-bottom\" *ngIf=\"userMenu\">\n                <app-user-menu [user]=\"user\" (close)=\"closeMyProfile($event)\"></app-user-menu>\n            </div>\n            <!-- <ts-button text=\"Login | Signup\" class=\"text-base\"></ts-button> -->\n        </div>\n\n        <!-- Mobile Menu -->\n        <div class=\"sm:w-1/1 ml-auto flex  sm:flex md:flex lg:hidden items-center\">\n            <div *ngIf=\"Components.indexOf('mobileSearch')>-1\" class=\"rounded-full flex items-center\" matRipple\n                (click)=\"navigateToMobileSearch()\">\n                <i class=\"mdi mdi-magnify text-2xl md:mx-2 color-blue\"></i>\n            </div>\n            <!-- <div *ngIf=\"Components.indexOf('mobileProfile')>-1\" class=\"rounded-full flex items-center\" matRipple>\n                <i class=\"mdi mdi-account text-2xl  ml-2 color-blue\" matRipple (click)=\"openMyProfileComponent()\"></i>\n            </div> -->\n        </div>\n    </div>\n</nav>\n<nav class=\"ts-header-new max-w-full w-screen flex items-center\" [class.shadow]=\"shadow\" *ngIf=\"source=='marketplace'\">\n\n</nav>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.ts-header{min-height:85px;background-color:#fff;width:100%;position:fixed;top:0;z-index:1000;box-shadow:0 15px 40px -20px rgba(40,44,63,.2)}.ts-header .container{display:-webkit-box;display:flex;width:100%;padding:0 10%}.ts-header .container .navbar-header .navbar-brand img{width:10.5rem}.ts-header .container .nav-right{margin-left:auto}.ts-header .container .nav-right li,.ts-header .container .nav-right ul{margin-bottom:0}.ts-header-new{min-height:56px;background-color:#f7f7f7;top:0;z-index:1000}.ts-header-new .shadow{box-shadow:0 2px 4px 0 rgba(0,0,0,.11)}.ts-header-new .ts-logo{height:28px}.ts-header-new .popup{position:absolute;top:90%;width:100%;left:0}.ts-header-new .max-50{max-width:50%}@media (min-width:991px){.ts-container{padding:0 40px!important}.ts-header-new{min-height:65px}.ts-header-new .ts-logo{height:2.5rem}.ts-header-new .view-type i{opacity:.8;padding:3px 9px}.ts-header-new .view-type i.active{opacity:1;background:#3782c4;border-radius:50%;color:#fff;box-shadow:0 0 5px 0 #8ec0ec}.ts-header-new .create-btn{width:100%;min-width:11.5rem;border-radius:20.5px;color:#fff;white-space:nowrap;background:linear-gradient(138.55deg,#a165c4 0,#4d2370 100%);box-shadow:0 2px 4px 0 #d4b1f0;-webkit-transition:.1s;transition:.1s}.ts-header-new .create-btn:hover{box-shadow:0 4px 6px 0 #d4b1f0;-webkit-transform:translateY(-2px);transform:translateY(-2px)}.ts-header-new .user-menu{position:absolute;top:145%;width:400%;left:-275%;background:#fff}.ts-header-new .user-menu:before{content:\" \";width:0;height:0;position:absolute;top:-11px;left:84%;border-left:15px solid transparent;border-right:15px solid transparent;border-bottom:15px solid #fff;-webkit-filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09));filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09))}}:host ::ng-deep .mat-button-wrapper{font-size:16px!important}"]
    })
], TsHeaderComponent);
export { TsHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBYyxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQU8vRSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQXlCNUIsWUFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUM5RSxZQUEwQixFQUFVLE1BQWlCLEVBQVUsV0FBd0I7UUFEN0UsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDOUUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUF4QnhGLGVBQVUsR0FBa0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYTtZQUMzRSxVQUFVLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV4RSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFdBQU0sR0FBRyxhQUFhLENBQUM7UUFDdkIsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNkLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFLekIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFHdkIsU0FBSSxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFLOUIsZ0JBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakQsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFReEIsa0JBQWEsR0FBRyxHQUFTLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0U7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFBO1FBR0QsYUFBUSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDdEYsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7YUFDOUI7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUE7UUFFRCxjQUFTLEdBQUcsQ0FBQyxRQUFTLEVBQVEsRUFBRTtZQUM5QixNQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFlBQVksQ0FBQyxhQUFhLEdBQUcsMEJBQTBCLENBQUM7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDeEUsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDM0MsUUFBUSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQTtRQUVELHdCQUFtQixHQUFHLEdBQUcsRUFBRTtZQUN6QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO1FBQzlELENBQUMsQ0FBQTtRQUNELHFCQUFnQixHQUFHLEdBQUcsRUFBRTtZQUN0QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzVCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDMUM7UUFDSCxDQUFDLENBQUE7UUFDRCwyQkFBc0IsR0FBRyxHQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFBO1FBQ0QsMkJBQXNCLEdBQUcsR0FBUyxFQUFFO1lBQ2xDLDREQUE0RDtZQUM1RCx3Q0FBd0M7WUFDeEMsV0FBVztZQUNYLHNCQUFzQjtZQUN0QixJQUFJO1lBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbkQsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO29CQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDbEI7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUNELG1CQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQTtRQUNELFdBQU0sR0FBRyxHQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUE7UUFDRCxpQkFBWSxHQUFHLEdBQVMsRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQTtRQUVELHFCQUFnQixHQUFHLEdBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBTyxHQUFHLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDekMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDaEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUN0RCxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQzs0QkFDbEIsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDOzRCQUN4QixPQUFPLEdBQUcsQ0FBQzt3QkFDYixDQUFDLENBQUMsQ0FBQztxQkFDSjtpQkFDRjtZQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUEsQ0FBQTtRQXZGQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQXVGRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3pDLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBRTt3QkFDdkUsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUNyRztpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBRUYsQ0FBQTs7WUE5R3FDLGNBQWM7WUFBeUIsYUFBYTtZQUNoRSxZQUFZO1lBQWtCLFNBQVM7WUFBdUIsV0FBVzs7QUF4QnhGO0lBQVIsS0FBSyxFQUFFO3FEQUN5RTtBQUV4RTtJQUFSLEtBQUssRUFBRTtvREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7aURBQXdCO0FBQ3ZCO0lBQVIsS0FBSyxFQUFFO2lEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7cURBQWlCO0FBQ3dCO0lBQWhELFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQzswREFBNkI7QUFDaEM7SUFBNUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztzREFBeUI7QUE2QnJFO0lBREMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7bURBUTFDO0FBOUNVLGlCQUFpQjtJQUw3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixxdU9BQXlDOztLQUUxQyxDQUFDO0dBQ1csaUJBQWlCLENBdUk3QjtTQXZJWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0hlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgQ29tcG9uZW50czogQXJyYXk8U3RyaW5nPiA9IFsnaWNvbicsICdjcmVhdGVFdmVudEJ0bicsICdldmVudFNlYXJjaCcsXG4gICAgJ3VzZXJNZW51JywgJ21vYmlsZVNlYXJjaCcsICdtb2JpbGVQcm9maWxlJywgJ21vYmlsZUNpdHlTZWFyY2gnLCAnbW9iaWxlQmFjayddO1xuXG4gIEBJbnB1dCgpIGJhY2tTdGF0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzb3VyY2UgPSAnbWFya2V0cGxhY2UnO1xuICBASW5wdXQoKSBzaGFkb3cgPSB0cnVlO1xuICBASW5wdXQoKSBzZWFyY2hUZXh0ID0gJyc7XG4gIEBWaWV3Q2hpbGQoJ2NpdHlTdWdnZXN0aW9ucycsIHsgc3RhdGljOiBmYWxzZSB9KSBjaXR5U3VnZ2VzdGlvbnM6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3VzZXJNZW51RWxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHVzZXJNZW51RWxlOiBFbGVtZW50UmVmO1xuXG4gIHVzZXI6IGFueTtcbiAgcm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgdXJsQXJyYXk7XG4gIHVzZXJNZW51OiBhbnk7XG4gIGhvc3Q6IHN0cmluZyA9IGNvbmZpZy5iYXNlVXJsO1xuICBhY3RpdmVQbGFjZTogc3RyaW5nO1xuICBhY3RpdmVDaXR5OiBzdHJpbmc7XG4gIGFjdGl2ZUNvdW50cnlDb2RlOiBzdHJpbmc7XG4gIGhvbWVQYWdlVXJsOiBzdHJpbmc7XG4gIHMzQnVja2V0VXJsID0gY29uZmlnLnMzQmFzZVVybCArIGNvbmZpZy5zM0J1Y2tldDtcbiAgY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gIHBvcHVsYXJQbGFjZXM6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSwgcHJpdmF0ZSBoZWFkZXJTZXJ2aWNlOiBIZWFkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gIH1cblxuICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrb3V0ID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKHRoaXMuY2l0eVN1Z2dlc3Rpb25zICYmICF0aGlzLmNpdHlTdWdnZXN0aW9ucy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy51c2VyTWVudUVsZS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMudXNlck1lbnUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvcGVuTG9naW4gPSAoY2FsbGJhY2s/KTogdm9pZCA9PiB7XG4gICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgIGRpYWxvZ0NvbmZpZy5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgIGNvbnN0IGxvZ2luRGlhbG9nID0gdGhpcy5kaWFsb2cub3BlbihMb2dpbk1vZGFsQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgbG9naW5EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5hdmlnYXRlVG9EYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmhvc3QgKyAnZGFzaGJvYXJkL2NyZWF0ZS1ldmVudCc7XG4gIH1cbiAgY3JlYXRlRXZlbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy51c2VyU2VydmljZS51c2VyLnNvdXJjZVsndmFsdWUnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubmF2aWdhdGVUb0Rhc2hib2FyZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5Mb2dpbih0aGlzLm5hdmlnYXRlVG9EYXNoYm9hcmQpO1xuICAgIH1cbiAgfVxuICBuYXZpZ2F0ZVRvTW9iaWxlU2VhcmNoID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL21vYmlsZS9zZWFyY2gnXSk7XG4gIH1cbiAgb3Blbk15UHJvZmlsZUNvbXBvbmVudCA9ICgpOiB2b2lkID0+IHtcbiAgICAvLyBpZiAodGhpcy51c2VyU2VydmljZS51c2VyLnNvdXJjZVsndmFsdWUnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAvLyAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Byb2ZpbGUnXSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRoaXMub3BlbkxvZ2luKCk7XG4gICAgLy8gfVxuICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5waXBlKHRha2UoMSkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wcm9maWxlJ10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcGVuTG9naW4oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBjbG9zZU15UHJvZmlsZSA9IChldmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMudXNlck1lbnUgPSAhdGhpcy51c2VyTWVudTtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnRbJ2xvZ291dCddKVxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG4gIGdvQmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lUGFnZVVybF0pO1xuICB9XG4gIGdvVG9Ib21lUGFnZSA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5ob21lUGFnZVVybF0pO1xuICB9XG5cbiAgZ2V0UG9wdWxhclBsYWNlcyA9IGFzeW5jICgpID0+IHtcbiAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcykge1xuICAgICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBKU09OLnBhcnNlKDxhbnk+cmVzKVsnY291bnRyeSddO1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmhlYWRlclNlcnZpY2UuZ2V0UG9wdWxhckNpdGllcyhjb3VudHJ5IHx8IHRoaXMudXJsQXJyYXlbMF0pO1xuICAgICAgICAgIHRoaXMucG9wdWxhclBsYWNlcyA9IGRhdGFbJ2RhdGEnXS5zbGljZSgwLCA2KS5tYXAoZWxlID0+IHtcbiAgICAgICAgICAgIGVsZS50eXBlID0gJ2NpdHknO1xuICAgICAgICAgICAgZWxlLmNpdHlDb2RlID0gZWxlLmNvZGU7XG4gICAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgfSk7XG4gICAgdGhpcy5nZXRQb3B1bGFyUGxhY2VzKCk7XG4gICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICBpZiAoZGF0YSAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5hY3RpdmVQbGFjZSA9IGRhdGFbJ2N1cnJlbnRQbGFjZSddO1xuICAgICAgICAgIHRoaXMuYWN0aXZlQ2l0eSA9IGRhdGFbJ2NpdHknXS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZUNvdW50cnlDb2RlID0gZGF0YVsnY291bnRyeSddO1xuICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNvdW50cnlDb2RlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmFjdGl2ZUNpdHkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhvbWVQYWdlVXJsID0gJy8nICsgdGhpcy5hY3RpdmVDb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgdGhpcy5hY3RpdmVDaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIl19