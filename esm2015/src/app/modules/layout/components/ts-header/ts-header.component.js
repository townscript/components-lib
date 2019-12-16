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
            if (!this.citySuggestions.nativeElement.contains(event.target)) {
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
            this.router.navigate(['../']);
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
        template: "<nav class=\"ts-header flex align-items-center\" *ngIf=\"source!='marketplace'\">\n    <div class=\"container flex align-items-center\">\n        <div class=\"navbar-header\">\n            <a appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" class=\"navbar-brand flex align-items-center\"\n                href=\"/\">\n                <img src=\"assets/images/ts-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                    title=\"Townscript Event Ticketing Logo\" />\n            </a>\n        </div>\n        <div id=\"navbar\" class=\"nav-right hidden-xs\">\n            <ul>\n                <li>\n                    <a href=\"/signup\" ts-data-analytics prop-event=\"click\" eventLabel=\"Get Started\"\n                        prop-clicked-location=\"Animated Header\">\n                        <!-- <ts-button text=\"Create Event\"></ts-button> -->\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n\n<nav class=\"ts-header-new max-w-full w-screen fixed flex items-center\" [class.shadow]=\"shadow\"\n    *ngIf=\"source=='marketplace'\">\n    <div class=\"ts-container flex items-center w-full\">\n        <div class=\"hidden md:block lg:w-1/6\">\n            <a [href]=\"homePageUrl\">\n                <img appDataAnalytics eventLabel=\"logo\" clickLocation=\"\" (click)=\"goToHomePage()\"\n                    *ngIf=\"Components.indexOf('icon')>-1\" class=\"ts-logo cursor-pointer\" src=\"assets/images/ts-logo.svg\"\n                    alt=\"Townscript Event Ticketing Logo\" title=\"Townscript Event Ticketing Logo\" />\n            </a>\n        </div>\n        <div class=\"sm:w-1/4 max-50 flex md:hidden lg:hidden items-center\">\n            <!-- <i class=\"mdi mdi-menu mr-3 text-3xl color-blue\"></i> -->\n            <!-- <app-hamburger-menu class=\"mr-3\"></app-hamburger-menu> -->\n            <!-- <img class=\"ts-logo mr-3\" src=\"assets/images/ts-icon.svg\" alt=\"Townscript Event Ticketing Logo\"\n                title=\"Townscript Event Ticketing Logo\" /> -->\n            <div *ngIf=\"backState\" (click)=\"goBack()\"\n                class=\"rounded-full flex py-1 px-3 mr-1 justify-center items-center\" matRipple>\n                <i class=\"mdi mdi-arrow-left text-2xl color-blue\"></i>\n            </div>\n            <i *ngIf=\"Components.indexOf('mobileCitySearch')>-1 && !backState\"\n                class=\"mdi mdi-map-marker color-blue text-2xl mr-2\"></i>\n            <div *ngIf=\"Components.indexOf('mobileCitySearch')>-1\" #citySuggestions\n                class=\"city-selection text-lg cursor-pointer w-full\" (click)=\"cityPopupActive=true\">\n                <div class=\"flex items-center w-full\" matRipple>\n                    <span class=\"mr-1 text-gray-700 truncate capitalize\">{{activePlace}}</span>\n                    <i class=\"mdi mdi-menu-down color-blue\"></i>\n                </div>\n                <app-city-search-popup appDataAnalytics eventLabel=\"location-dropdown-search\" clickLocation=\"\"\n                    [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\" [showArrow]=\"false\"\n                    class=\"popup\" *ngIf=\"cityPopupActive\" [popularPlaces]=\"popularPlaces\">\n                </app-city-search-popup>\n\n            </div>\n        </div>\n        <div class=\"lg:w-5/12 ml-3 hidden sm:hidden md:hidden lg:flex\">\n            <app-search *ngIf=\"Components.indexOf('eventSearch')>-1\" class=\"w-full\"></app-search>\n        </div>\n        <div class=\"invisible sm:w-1/4 lg:w-1/12 flex items-center ml-6 view-type text-xl color-blue\">\n            <!-- <i class=\"active text-xl mdi mdi-book-open mr-4\"></i>\n            <i class=\"mdi mdi-map-legend mr-4\"></i>\n            <i class=\"mdi mdi-calendar-today mr-4\"></i> -->\n        </div>\n        <div class=\"lg:w-1/6 hidden sm:hidden md:hidden h-full lg:flex items-center pr-8\">\n            <a [href]=\"host + 'dashboard/create-event'\" appDataAnalytics eventLabel=\"create-event\" clickLocation=\"\"\n                *ngIf=\"Components.indexOf('createEventBtn')>-1\"\n                class=\"create-btn cursor-pointer flex h-full justify-center items-center\">\n                <span class=\"text-base mr-2\">CREATE EVENT</span>\n                <i class=\"mdi mdi-ticket text-2xl\"></i>\n            </a>\n        </div>\n        <div #userMenuEle *ngIf=\"Components.indexOf('userMenu')>-1\"\n            class=\"position-relative sm:w-1/1 lg:w-1/6 justify-end hidden sm:hidden md:hidden lg:flex items-center\">\n            <div appDataAnalytics eventLabel=\"login-signup\" clickLocation=\"\"\n                class=\"flex items-center cursor-pointer px-2\" (click)=\"openLogin()\" *ngIf=\"!user\" matRipple>\n                <i class=\"mdi mdi-account-circle text-4xl mr-2 color-blue\"></i>\n                <span>Login | Signup</span>\n            </div>\n            <div class=\"flex items-center cursor-pointer\" (click)=\"userMenu=!userMenu\" *ngIf=\"user\" matRipple>\n                <img class=\"rounded-full mr-2\" width=\"36\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n                <i class=\"mdi mdi-chevron-down text-xl text-gray-700\" [class.rotate-180]=\"userMenu\"></i>\n                <!-- <span>{{user.user}}</span> -->\n            </div>\n            <div class=\"user-menu position-absolute shadow-md px-2 enter-slide-bottom\" *ngIf=\"userMenu\">\n                <app-user-menu [user]=\"user\" (close)=\"closeMyProfile($event)\"></app-user-menu>\n            </div>\n            <!-- <ts-button text=\"Login | Signup\" class=\"text-base\"></ts-button> -->\n        </div>\n\n        <!-- Mobile Menu -->\n        <div class=\"sm:w-1/1 ml-auto mr-2 flex  sm:flex md:flex lg:hidden items-center\">\n            <div *ngIf=\"Components.indexOf('mobileSearch')>-1\" class=\"rounded-full flex items-center\" matRipple\n                (click)=\"navigateToMobileSearch()\">\n                <i class=\"mdi mdi-magnify text-2xl ml-2 mr-2 color-blue\"></i>\n            </div>\n            <div *ngIf=\"Components.indexOf('mobileProfile')>-1\" class=\"rounded-full flex items-center\" matRipple>\n                <i class=\"mdi mdi-account text-2xl  ml-2 color-blue\" matRipple (click)=\"openMyProfileComponent()\"></i>\n            </div>\n        </div>\n    </div>\n</nav>\n<nav class=\"ts-header-new max-w-full w-screen flex items-center\" [class.shadow]=\"shadow\" *ngIf=\"source=='marketplace'\">\n\n</nav>",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.ts-header{min-height:85px;background-color:#fff;width:100%;position:fixed;top:0;z-index:1000;box-shadow:0 15px 40px -20px rgba(40,44,63,.2)}.ts-header .container{display:-webkit-box;display:flex;width:100%;padding:0 10%}.ts-header .container .navbar-header .navbar-brand img{width:165px}.ts-header .container .nav-right{margin-left:auto}.ts-header .container .nav-right li,.ts-header .container .nav-right ul{margin-bottom:0}.ts-header-new{min-height:56px;background-color:#f7f7f7;top:0;z-index:1000}.ts-header-new .shadow{box-shadow:0 2px 4px 0 rgba(0,0,0,.11)}.ts-header-new .ts-logo{height:28px}.ts-header-new .popup{position:absolute;top:90%;width:100%;left:0}.ts-header-new .max-50{max-width:50%}@media (min-width:991px){.ts-container{padding:0 80px!important}.ts-header-new{min-height:68px}.ts-header-new .ts-logo{height:35px}.ts-header-new .view-type i{opacity:.8;padding:3px 9px}.ts-header-new .view-type i.active{opacity:1;background:#3782c4;border-radius:50%;color:#fff;box-shadow:0 0 5px 0 #8ec0ec}.ts-header-new .create-btn{width:100%;min-width:200px;border-radius:20.5px;color:#fff;white-space:nowrap;background:linear-gradient(138.55deg,#a165c4 0,#4d2370 100%);box-shadow:0 2px 4px 0 #d4b1f0;-webkit-transition:.1s;transition:.1s}.ts-header-new .create-btn:hover{box-shadow:0 4px 6px 0 #d4b1f0;-webkit-transform:translateY(-2px);transform:translateY(-2px)}.ts-header-new .user-menu{position:absolute;top:145%;width:142%;left:-33%;background:#fff}.ts-header-new .user-menu:before{content:\" \";width:0;height:0;position:absolute;top:-11px;left:84%;border-left:15px solid transparent;border-right:15px solid transparent;border-bottom:15px solid #fff;-webkit-filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09));filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09))}}:host ::ng-deep .mat-button-wrapper{font-size:16px!important}"]
    }),
    tslib_1.__metadata("design:paramtypes", [UtilityService, HeaderService, PlaceService, MatDialog, UserService])
], TsHeaderComponent);
export { TsHeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDeEgsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFPL0UsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUF3QjVCLFlBQW9CLGNBQThCLEVBQVUsYUFBNEIsRUFBVSxZQUEwQixFQUFVLE1BQWlCLEVBQVUsV0FBd0I7UUFBckssbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXRCaEwsZUFBVSxHQUFrQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0Is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LEVBQXlCLGFBQWEsRUFBd0IsWUFBWSxFQUFrQixTQUFTLEVBQXVCLFdBQVc7R0F4QjlLLGlCQUFpQixDQXFJN0I7U0FySVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9tb2R1bGVzL2xvZ2luU2lnbnVwL3RzLWxvZ2luLXNpZ251cC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4vcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIZWFkZXJTZXJ2aWNlIH0gZnJvbSAnLi90cy1oZWFkZXIuc2VydmljZSc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cy1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdHMtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHMtaGVhZGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHNIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIENvbXBvbmVudHM6IEFycmF5PFN0cmluZz4gPSBbJ2ljb24nLCAnY3JlYXRlRXZlbnRCdG4nLCAnZXZlbnRTZWFyY2gnLFxuICAgICd1c2VyTWVudScsICdtb2JpbGVTZWFyY2gnLCAnbW9iaWxlUHJvZmlsZScsICdtb2JpbGVDaXR5U2VhcmNoJywgJ21vYmlsZUJhY2snXTtcblxuICBASW5wdXQoKSBiYWNrU3RhdGUgPSBmYWxzZTtcbiAgQElucHV0KCkgc291cmNlID0gJ21hcmtldHBsYWNlJztcbiAgQElucHV0KCkgc2hhZG93ID0gdHJ1ZTtcbiAgQFZpZXdDaGlsZCgnY2l0eVN1Z2dlc3Rpb25zJywgeyBzdGF0aWM6IGZhbHNlIH0pIGNpdHlTdWdnZXN0aW9uczogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndXNlck1lbnVFbGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgdXNlck1lbnVFbGU6IEVsZW1lbnRSZWY7XG5cbiAgdXNlcjogYW55O1xuICByb3V0ZXIgPSBjb25maWcucm91dGVyO1xuICB1cmxBcnJheTtcbiAgdXNlck1lbnU6IGFueTtcbiAgaG9zdDogc3RyaW5nID0gY29uZmlnLmJhc2VVcmw7XG4gIGFjdGl2ZVBsYWNlOiBzdHJpbmc7XG4gIGFjdGl2ZUNpdHk6IHN0cmluZztcbiAgYWN0aXZlQ291bnRyeUNvZGU6IHN0cmluZztcbiAgaG9tZVBhZ2VVcmw6IHN0cmluZztcbiAgczNCdWNrZXRVcmwgPSBjb25maWcuczNCYXNlVXJsICsgY29uZmlnLnMzQnVja2V0O1xuICBjaXR5UG9wdXBBY3RpdmUgPSBmYWxzZTtcbiAgcG9wdWxhclBsYWNlczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLCBwcml2YXRlIGhlYWRlclNlcnZpY2U6IEhlYWRlclNlcnZpY2UsIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gIH1cblxuICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrb3V0ID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKCF0aGlzLmNpdHlTdWdnZXN0aW9ucy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuY2l0eVBvcHVwQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICghdGhpcy51c2VyTWVudUVsZS5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMudXNlck1lbnUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvcGVuTG9naW4gPSAoY2FsbGJhY2s/KTogdm9pZCA9PiB7XG4gICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgIGRpYWxvZ0NvbmZpZy5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgIGNvbnN0IGxvZ2luRGlhbG9nID0gdGhpcy5kaWFsb2cub3BlbihMb2dpbk1vZGFsQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgbG9naW5EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5hdmlnYXRlVG9EYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmhvc3QgKyAnZGFzaGJvYXJkL2NyZWF0ZS1ldmVudCc7XG4gIH1cbiAgY3JlYXRlRXZlbnRDbGljayA9ICgpID0+IHtcbiAgICBpZiAodGhpcy51c2VyU2VydmljZS51c2VyLnNvdXJjZVsndmFsdWUnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubmF2aWdhdGVUb0Rhc2hib2FyZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5Mb2dpbih0aGlzLm5hdmlnYXRlVG9EYXNoYm9hcmQpO1xuICAgIH1cbiAgfVxuICBuYXZpZ2F0ZVRvTW9iaWxlU2VhcmNoID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL21vYmlsZS9zZWFyY2gnXSk7XG4gIH1cbiAgb3Blbk15UHJvZmlsZUNvbXBvbmVudCA9ICgpOiB2b2lkID0+IHtcbiAgICAvLyBpZiAodGhpcy51c2VyU2VydmljZS51c2VyLnNvdXJjZVsndmFsdWUnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAvLyAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3Byb2ZpbGUnXSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRoaXMub3BlbkxvZ2luKCk7XG4gICAgLy8gfVxuICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5waXBlKHRha2UoMSkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9wcm9maWxlJ10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcGVuTG9naW4oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBjbG9zZU15UHJvZmlsZSA9IChldmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMudXNlck1lbnUgPSAhdGhpcy51c2VyTWVudTtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnRbJ2xvZ291dCddKVxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG4gIGdvQmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy4uLyddKTtcbiAgfVxuICBnb1RvSG9tZVBhZ2UgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaG9tZVBhZ2VVcmxdKTtcbiAgfVxuXG4gIGdldFBvcHVsYXJQbGFjZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKGFzeW5jIChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICBjb25zdCBjb3VudHJ5ID0gSlNPTi5wYXJzZSg8YW55PnJlcylbJ2NvdW50cnknXTtcbiAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZWFkZXJTZXJ2aWNlLmdldFBvcHVsYXJDaXRpZXMoY291bnRyeSB8fCB0aGlzLnVybEFycmF5WzBdKTtcbiAgICAgICAgICB0aGlzLnBvcHVsYXJQbGFjZXMgPSBkYXRhWydkYXRhJ10uc2xpY2UoMCwgNikubWFwKGVsZSA9PiB7XG4gICAgICAgICAgICBlbGUudHlwZSA9ICdjaXR5JztcbiAgICAgICAgICAgIGVsZS5jaXR5Q29kZSA9IGVsZS5jb2RlO1xuICAgICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgIH0pO1xuICAgIHRoaXMuZ2V0UG9wdWxhclBsYWNlcygpO1xuICAgIHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKDxhbnk+cmVzKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuYWN0aXZlUGxhY2UgPSBkYXRhWydjdXJyZW50UGxhY2UnXTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZUNpdHkgPSBkYXRhWydjaXR5J10ucmVwbGFjZSgnICcsJy0nKTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZUNvdW50cnlDb2RlID0gZGF0YVsnY291bnRyeSddO1xuICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUNvdW50cnlDb2RlICE9IHVuZGVmaW5lZCAmJiB0aGlzLmFjdGl2ZUNpdHkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhvbWVQYWdlVXJsID0gJy8nICsgdGhpcy5hY3RpdmVDb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpICsgJy8nICsgdGhpcy5hY3RpdmVDaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIl19