import { __awaiter, __decorate } from "tslib";
import { Component, Input, ViewChild, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
        this.getPopularPlaces = () => __awaiter(this, void 0, void 0, function* () {
            this.placeService.place.subscribe((res) => __awaiter(this, void 0, void 0, function* () {
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
            var _a;
            if (this.utilityService.IsJsonString(res)) {
                const data = JSON.parse(res);
                if (data && Object.keys(data).length > 0) {
                    this.activePlace = data['currentPlace'];
                    this.activeCountryCode = data['country'];
                    this.activeCity = (_a = data['city']) === null || _a === void 0 ? void 0 : _a.replace(' ', '-');
                    if (this.activeCountryCode != undefined && this.activeCity != undefined) {
                        this.homePageUrl = '/' + this.activeCountryCode.toLowerCase() + '/' + this.activeCity.toLowerCase();
                    }
                    else if (this.activeCountryCode !== undefined) {
                        this.homePageUrl = `/${this.activeCountryCode.toLowerCase()}/online`;
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
export { TsHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBYyxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQU8vRSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQXdCNUIsWUFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUM5RSxZQUEwQixFQUFVLE1BQWlCLEVBQVUsV0FBd0I7UUFEN0UsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDOUUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUF2QnhGLGVBQVUsR0FBa0IsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsYUFB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QyxRQUFRLENBQUMsQ0FBQzttREFRMUM7QUE3Q1UsaUJBQWlCO0lBTDdCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLDZyT0FBeUM7O0tBRTFDLENBQUM7R0FDVyxpQkFBaUIsQ0F3STdCO1NBeElZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IEhlYWRlclNlcnZpY2UgfSBmcm9tICcuL3RzLWhlYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0hlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgQ29tcG9uZW50czogQXJyYXk8U3RyaW5nPiA9IFsnaWNvbicsICdjcmVhdGVFdmVudEJ0bicsICdldmVudFNlYXJjaCcsXG4gICAgJ3VzZXJNZW51JywgJ21vYmlsZVNlYXJjaCcsICdtb2JpbGVQcm9maWxlJywgJ21vYmlsZUNpdHlTZWFyY2gnLCAnbW9iaWxlQmFjayddO1xuXG4gIEBJbnB1dCgpIGJhY2tTdGF0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBzb3VyY2UgPSAnbWFya2V0cGxhY2UnO1xuICBASW5wdXQoKSBzZWFyY2hUZXh0ID0gJyc7XG4gIEBWaWV3Q2hpbGQoJ2NpdHlTdWdnZXN0aW9ucycpIGNpdHlTdWdnZXN0aW9uczogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndXNlck1lbnVFbGUnKSB1c2VyTWVudUVsZTogRWxlbWVudFJlZjtcblxuICB1c2VyOiBhbnk7XG4gIHJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG4gIHVybEFycmF5O1xuICB1c2VyTWVudTogYW55O1xuICBob3N0OiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgYWN0aXZlUGxhY2U6IHN0cmluZztcbiAgYWN0aXZlQ2l0eTogc3RyaW5nO1xuICBhY3RpdmVDb3VudHJ5Q29kZTogc3RyaW5nO1xuICBob21lUGFnZVVybDogc3RyaW5nO1xuICBzM0J1Y2tldFVybCA9IGNvbmZpZy5zM0Jhc2VVcmwgKyBjb25maWcuczNCdWNrZXQ7XG4gIGNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICBwb3B1bGFyUGxhY2VzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgaGVhZGVyU2VydmljZTogSGVhZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLCBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICB9XG5cbiAgYnVpbGRVcmxBcnJheSA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KFwiP1wiKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja291dCA9IChldmVudCkgPT4ge1xuICAgIGlmICh0aGlzLmNpdHlTdWdnZXN0aW9ucyAmJiAhdGhpcy5jaXR5U3VnZ2VzdGlvbnMubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmNpdHlQb3B1cEFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudXNlck1lbnVFbGUubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLnVzZXJNZW51ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb3BlbkxvZ2luID0gKGNhbGxiYWNrPyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgZGlhbG9nQ29uZmlnLmF1dG9Gb2N1cyA9IHRydWU7XG4gICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICBjb25zdCBsb2dpbkRpYWxvZyA9IHRoaXMuZGlhbG9nLm9wZW4oTG9naW5Nb2RhbENvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGxvZ2luRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuYXZpZ2F0ZVRvRGFzaGJvYXJkID0gKCkgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5ob3N0ICsgJ2Rhc2hib2FyZC9jcmVhdGUtZXZlbnQnO1xuICB9XG4gIGNyZWF0ZUV2ZW50Q2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMudXNlclNlcnZpY2UudXNlci5zb3VyY2VbJ3ZhbHVlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5hdmlnYXRlVG9EYXNoYm9hcmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuTG9naW4odGhpcy5uYXZpZ2F0ZVRvRGFzaGJvYXJkKTtcbiAgICB9XG4gIH1cbiAgbmF2aWdhdGVUb01vYmlsZVNlYXJjaCA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9tb2JpbGUvc2VhcmNoJ10pO1xuICB9XG4gIG9wZW5NeVByb2ZpbGVDb21wb25lbnQgPSAoKTogdm9pZCA9PiB7XG4gICAgLy8gaWYgKHRoaXMudXNlclNlcnZpY2UudXNlci5zb3VyY2VbJ3ZhbHVlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wcm9maWxlJ10pO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0aGlzLm9wZW5Mb2dpbigpO1xuICAgIC8vIH1cbiAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvcHJvZmlsZSddKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3BlbkxvZ2luKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgY2xvc2VNeVByb2ZpbGUgPSAoZXZlbnQpOiB2b2lkID0+IHtcbiAgICB0aGlzLnVzZXJNZW51ID0gIXRoaXMudXNlck1lbnU7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50Wydsb2dvdXQnXSlcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuICBnb0JhY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaG9tZVBhZ2VVcmxdKTtcbiAgfVxuICBnb1RvSG9tZVBhZ2UgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaG9tZVBhZ2VVcmxdKTtcbiAgfVxuXG4gIGdldFBvcHVsYXJQbGFjZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKGFzeW5jIChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICBjb25zdCBjb3VudHJ5ID0gSlNPTi5wYXJzZSg8YW55PnJlcylbJ2NvdW50cnknXTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSB8fCB0aGlzLnVybEFycmF5WzBdKTtcbiAgICAgICAgICB0aGlzLnBvcHVsYXJQbGFjZXMgPSBkYXRhWydkYXRhJ10uc2xpY2UoMCwgNikubWFwKGVsZSA9PiB7XG4gICAgICAgICAgICBlbGUudHlwZSA9ICdjaXR5JztcbiAgICAgICAgICAgIGVsZS5jaXR5Q29kZSA9IGVsZS5jb2RlO1xuICAgICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgIH0pO1xuICAgIHRoaXMuZ2V0UG9wdWxhclBsYWNlcygpO1xuICAgIHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzIGFzIGFueSk7XG4gICAgICAgIGlmIChkYXRhICYmIE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVBsYWNlID0gZGF0YVsnY3VycmVudFBsYWNlJ107XG4gICAgICAgICAgdGhpcy5hY3RpdmVDb3VudHJ5Q29kZSA9IGRhdGFbJ2NvdW50cnknXTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZUNpdHkgPSBkYXRhWydjaXR5J10/LnJlcGxhY2UoJyAnLCAnLScpO1xuICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNvdW50cnlDb2RlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmFjdGl2ZUNpdHkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhvbWVQYWdlVXJsID0gJy8nICsgdGhpcy5hY3RpdmVDb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgdGhpcy5hY3RpdmVDaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZUNvdW50cnlDb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaG9tZVBhZ2VVcmwgPSBgLyR7dGhpcy5hY3RpdmVDb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpfS9vbmxpbmVgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==