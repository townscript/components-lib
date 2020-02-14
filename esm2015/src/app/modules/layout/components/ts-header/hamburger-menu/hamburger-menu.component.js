import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { CitySelectionModalComponent } from '../../../../../shared/components/city-selection/city-selection.component';
let HamburgerMenuComponent = class HamburgerMenuComponent {
    constructor(dialog, datepipe) {
        this.dialog = dialog;
        this.datepipe = datepipe;
        this.countryCode = 'IN';
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
        this.reloadOnLogout = (event) => {
            if (event && event['logout']) {
                window.location.reload();
            }
        };
        this.openCityPopup = () => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            dialogConfig.data = { 'countryCode': this.countryCode };
            this.dialog.open(CitySelectionModalComponent, dialogConfig);
        };
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], HamburgerMenuComponent.prototype, "user", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HamburgerMenuComponent.prototype, "activePlace", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], HamburgerMenuComponent.prototype, "countryCode", void 0);
HamburgerMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-hamburger-menu',
        template: "<nav role=\"navigation\">\n    <div class=\"ham-container position-relative cursor-pointer\">\n        <div class=\"hamburger position-relative\">\n            <!-- <input type=\"checkbox\" /> -->\n            <div class=\"spans\" (click)=\"active=!active\" appDataAnalytics eventLabel=\"toggle\"\n                clickLocation=\"hamburgerMenu\">\n                <span class=\"block background-blue\" [class.active]=\"active\"></span>\n                <span class=\"block background-blue\" [class.active]=\"active\"></span>\n                <span class=\"block background-blue\" [class.active]=\"active\"></span>\n            </div>\n            <div (click)=\"active=!active\" class=\"overlay fixed bg-black w-full h-full\" *ngIf=\"active\"></div>\n            <ul class=\"menu fixed h-full px-4\" [class.active]=\"active\">\n                <li class=\"\">\n                    <img class=\"ts-logo mr-3 px-2\" src=\"assets/images/ts-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                        title=\"Townscript Event Ticketing Logo\" />\n                    <div (click)=\"openCityPopup()\" matRipple appDataAnalytics eventLabel=\"location\"\n                        clickLocation=\"hamburgerMenu\"\n                        class=\"location-section px-2 mt-6 pb-2 border-b border-gray-300 flex items-center\">\n                        <i class=\"mdi mdi-map-marker color-blue text-2xl mr-2\"></i>\n                        <div class=\"flex items-end\">\n                            <span\n                                class=\"mr-1 font-bold text-lg leading-tight text-gray-700 capitalize\">{{activePlace}}</span>\n                            <span class=\"ml-2 color-blue font-bold text-xs\">Change</span>\n                        </div>\n                    </div>\n                    <div class=\"user-menu mt-3\">\n                        <app-user-menu [user]=\"user\" (close)=\"reloadOnLogout($event)\" *ngIf=\"user\"></app-user-menu>\n                        <div (click)=\"openLogin()\" matRipple class=\"flex px-2 items-center justify-between w-full\"\n                            *ngIf=\"!user\" appDataAnalytics eventLabel=\"loginSignup\" clickLocation=\"hamburgerMenu\">\n                            <div>\n                                <span class=\"text-lg block text-gray-800\">Login/Signup</span>\n                                <span class=\"text-xs text-gray-700\">To personalize your experience!</span>\n                            </div>\n                            <i class=\"mdi mdi-chevron-right text-4xl color-blue\"></i>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.ham-container{z-index:1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ham-container .ts-logo{height:30px}.ham-container .hamburger .spans span{width:20px;height:3px;margin-bottom:3px;position:relative;border-radius:3px;z-index:1;-webkit-transform-origin:4px 0;transform-origin:4px 0;-webkit-transition:background .45s,margin .45s,opacity .5s,-webkit-transform .45s;transition:transform .45s,background .45s,margin .45s,opacity .5s,-webkit-transform .45s}.ham-container .hamburger .spans span:first-child{-webkit-transform-origin:0 0;transform-origin:0 0;width:16px}.ham-container .hamburger .spans span:last-child{margin-bottom:0;width:13px}.ham-container .hamburger .spans span:nth-last-child(2){-webkit-transform-origin:0 100%;transform-origin:0 100%;width:20px}.ham-container .hamburger .spans span.active{opacity:1;margin-left:252px;-webkit-transform:rotate(45deg) translate(-11px,0) scaleX(1.54);transform:rotate(45deg) translate(-11px,0) scaleX(1.54);background:#8c8c8c}.ham-container .hamburger .spans span.active:nth-last-child(3){opacity:0;-webkit-transform:rotate(0) scale(.2,.2);transform:rotate(0) scale(.2,.2)}.ham-container .hamburger .spans span.active:nth-last-child(2){-webkit-transform:rotate(-45deg) translate(-10px,-1px);transform:rotate(-45deg) translate(-10px,-1px)}.ham-container .hamburger .spans span.active~ul{-webkit-transform:none;transform:none}.ham-container .overlay{top:0;left:0;opacity:.5;-webkit-animation-name:overlay;animation-name:overlay;-webkit-animation-duration:.5s;animation-duration:.5s}.ham-container .menu{top:0;left:0;width:300px;padding-top:15px;background:#fafafa;box-shadow:0 2px 4px 0 rgba(0,0,0,.11);list-style-type:none;-webkit-font-smoothing:antialiased;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translate(-100%,0);transform:translate(-100%,0);-webkit-transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.ham-container .menu .logo{height:40px}.ham-container .menu.active{-webkit-transform:none;transform:none}.ham-container .menu li{padding:10px 0}::ng-deep .user-menu .user-menu{padding-left:0!important;padding-right:0!important}"]
    }),
    tslib_1.__metadata("design:paramtypes", [MatDialog,
        DatePipe])
], HamburgerMenuComponent);
export { HamburgerMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvaGFtYnVyZ2VyLW1lbnUvaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzRkFBc0YsQ0FBQztBQUUzSCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQVF2SCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQU0vQixZQUFvQixNQUFpQixFQUMxQixRQUFrQjtRQURULFdBQU0sR0FBTixNQUFNLENBQVc7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUhwQixnQkFBVyxHQUFXLElBQUksQ0FBQztRQU9wQyxjQUFTLEdBQUcsQ0FBQyxRQUFTLEVBQVEsRUFBRTtZQUM1QixNQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFlBQVksQ0FBQyxhQUFhLEdBQUcsMEJBQTBCLENBQUM7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDeEUsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDekMsUUFBUSxFQUFFLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQTtRQUNELG1CQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQVEsRUFBRTtZQUM3QixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDLENBQUE7UUFDRCxrQkFBYSxHQUFHLEdBQUcsRUFBRTtZQUNqQixNQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFlBQVksQ0FBQyxhQUFhLEdBQUcsMEJBQTBCLENBQUM7WUFDeEQsWUFBWSxDQUFDLElBQUksR0FBRyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFBO0lBMUJELENBQUM7SUEyQkQsZUFBZTtJQUVmLENBQUM7SUFDRCxRQUFRO0lBQ1IsQ0FBQztDQUVKLENBQUE7QUF4Q1k7SUFBUixLQUFLLEVBQUU7O29EQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7c0NBQWMsTUFBTTsyREFBQztBQUNwQjtJQUFSLEtBQUssRUFBRTtzQ0FBYyxNQUFNOzJEQUFRO0FBSjNCLHNCQUFzQjtJQUxsQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLHFxRkFBOEM7O0tBRWpELENBQUM7NkNBTzhCLFNBQVM7UUFDaEIsUUFBUTtHQVBwQixzQkFBc0IsQ0EwQ2xDO1NBMUNZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXREaWFsb2dDb25maWcsIE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9jaXR5LXNlbGVjdGlvbi9jaXR5LXNlbGVjdGlvbi5jb21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWhhbWJ1cmdlci1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2hhbWJ1cmdlci1tZW51LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSGFtYnVyZ2VyTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSB1c2VyOiBhbnk7XG4gICAgQElucHV0KCkgYWN0aXZlUGxhY2U6IFN0cmluZztcbiAgICBASW5wdXQoKSBjb3VudHJ5Q29kZTogU3RyaW5nID0gJ0lOJztcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgICAgcHVibGljIGRhdGVwaXBlOiBEYXRlUGlwZSkge1xuXG4gICAgfVxuXG4gICAgb3BlbkxvZ2luID0gKGNhbGxiYWNrPyk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBkaWFsb2dDb25maWcgPSBuZXcgTWF0RGlhbG9nQ29uZmlnKCk7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmF1dG9Gb2N1cyA9IHRydWU7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzID0gJ21hdC1kaWFsb2ctYmtnLWNvbnRhaW5lcic7XG4gICAgICAgIGNvbnN0IGxvZ2luRGlhbG9nID0gdGhpcy5kaWFsb2cub3BlbihMb2dpbk1vZGFsQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGxvZ2luRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbG9hZE9uTG9nb3V0ID0gKGV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChldmVudCAmJiBldmVudFsnbG9nb3V0J10pIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvcGVuQ2l0eVBvcHVwID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkaWFsb2dDb25maWcgPSBuZXcgTWF0RGlhbG9nQ29uZmlnKCk7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmF1dG9Gb2N1cyA9IHRydWU7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzID0gJ21hdC1kaWFsb2ctYmtnLWNvbnRhaW5lcic7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5kYXRhID0geyAnY291bnRyeUNvZGUnOiB0aGlzLmNvdW50cnlDb2RlIH07XG4gICAgICAgIHRoaXMuZGlhbG9nLm9wZW4oQ2l0eVNlbGVjdGlvbk1vZGFsQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICAgIH1cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG59XG4iXX0=