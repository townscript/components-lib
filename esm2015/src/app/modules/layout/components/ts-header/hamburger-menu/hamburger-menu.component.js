import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { CitySelectionModalComponent } from '../../../../../shared/components/city-selection/city-selection.component';
import { Router } from '@angular/router';
let HamburgerMenuComponent = class HamburgerMenuComponent {
    constructor(dialog, datepipe, router) {
        this.dialog = dialog;
        this.datepipe = datepipe;
        this.router = router;
        this.countryCode = 'IN';
        this.urlArray = [];
        this.buildUrlArray = () => {
            if (this.router.url) {
                this.urlArray = this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                this.urlArray = ['in'];
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
        this.buildUrlArray();
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
    }
};
HamburgerMenuComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: DatePipe },
    { type: Router }
];
__decorate([
    Input()
], HamburgerMenuComponent.prototype, "user", void 0);
__decorate([
    Input()
], HamburgerMenuComponent.prototype, "activePlace", void 0);
__decorate([
    Input()
], HamburgerMenuComponent.prototype, "countryCode", void 0);
HamburgerMenuComponent = __decorate([
    Component({
        selector: 'app-hamburger-menu',
        template: "<nav role=\"navigation\">\n    <div class=\"ham-container position-relative cursor-pointer\">\n        <div class=\"hamburger position-relative\">\n            <!-- <input type=\"checkbox\" /> -->\n            <div class=\"spans\" (click)=\"active=!active\" appDataAnalytics eventLabel=\"toggle\"\n                clickLocation=\"hamburgerMenu\">\n                <span class=\"block bg-primary\" [class.active]=\"active\"></span>\n                <span class=\"block bg-primary\" [class.active]=\"active\"></span>\n                <span class=\"block bg-primary\" [class.active]=\"active\"></span>\n            </div>\n            <div (click)=\"active=!active\" class=\"overlay fixed bg-black w-full h-full\" *ngIf=\"active\"></div>\n            <ul class=\"menu fixed h-full px-4\" [class.active]=\"active\">\n                <li class=\"\">\n                    <img class=\"ts-logo mr-3 px-2\" src=\"assets/images/ts-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                        title=\"Townscript Event Ticketing Logo\" />\n                    <div (click)=\"openCityPopup()\" matRipple appDataAnalytics eventLabel=\"location\"\n                        clickLocation=\"hamburgerMenu\"\n                        class=\"location-section px-2 mt-6 pb-2 border-b border-gray-300 flex items-center\">\n                        <i class=\"mdi text-primary text-2xl mr-2\"\n                            [ngClass]=\"urlArray[1] === 'online' ? 'mdi-earth' : 'mdi-map-marker'\"></i>\n                        <div class=\"flex items-end\">\n                            <span class=\"mr-1 font-bold text-lg leading-tight text-gray-700 capitalize\">{{urlArray[1]\n                                === 'online' ? 'Online' : activePlace}}</span>\n                            <span class=\"ml-2 text-primary font-bold text-xs\">Change</span>\n                        </div>\n                    </div>\n                    <div class=\"user-menu mt-3\">\n                        <app-user-menu [user]=\"user\" [showMobilePopup]=\"true\" (close)=\"reloadOnLogout($event)\"\n                            *ngIf=\"user\"></app-user-menu>\n                        <div (click)=\"openLogin()\" matRipple class=\"flex px-2 items-center justify-between w-full\"\n                            *ngIf=\"!user\" appDataAnalytics eventLabel=\"loginSignup\" clickLocation=\"hamburgerMenu\">\n                            <div>\n                                <span class=\"text-lg block text-gray-800\">Login/Signup</span>\n                                <span class=\"text-xs text-gray-700\">To personalize your experience!</span>\n                            </div>\n                            <i class=\"mdi mdi-chevron-right text-4xl text-primary\"></i>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.bg-primary{background-color:#563de1}.ham-container{z-index:1;-webkit-user-select:none;-moz-user-select:none;user-select:none}.ham-container .ts-logo{height:30px}.ham-container .hamburger .spans span{width:20px;height:3px;margin-bottom:3px;position:relative;border-radius:3px;z-index:1;transform-origin:4px 0;transition:transform .45s,background .45s,margin .45s,opacity .5s}.ham-container .hamburger .spans span:first-child{transform-origin:0 0;width:16px}.ham-container .hamburger .spans span:last-child{margin-bottom:0;width:13px}.ham-container .hamburger .spans span:nth-last-child(2){transform-origin:0 100%;width:20px}.ham-container .hamburger .spans span.active{opacity:1;margin-left:252px;transform:rotate(45deg) translate(-11px,0) scaleX(1.54);background:#8c8c8c}.ham-container .hamburger .spans span.active:nth-last-child(3){opacity:0;transform:rotate(0) scale(.2,.2)}.ham-container .hamburger .spans span.active:nth-last-child(2){transform:rotate(-45deg) translate(-10px,-1px)}.ham-container .hamburger .spans span.active~ul{transform:none}.ham-container .overlay{top:0;left:0;opacity:.5;-webkit-animation-name:overlay;animation-name:overlay;-webkit-animation-duration:.5s;animation-duration:.5s}.ham-container .menu{top:0;left:0;width:300px;padding-top:15px;background:#fafafa;box-shadow:0 2px 4px 0 rgba(0,0,0,.11);list-style-type:none;-webkit-font-smoothing:antialiased;transform-origin:0 0;transform:translate(-100%,0);transition:transform .3s}.ham-container .menu .logo{height:40px}.ham-container .menu.active{transform:none}.ham-container .menu li{padding:10px 0}::ng-deep .user-menu .user-menu{padding-left:0!important;padding-right:0!important}"]
    })
], HamburgerMenuComponent);
export { HamburgerMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvaGFtYnVyZ2VyLW1lbnUvaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzRkFBc0YsQ0FBQztBQUUzSCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFRekMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFPL0IsWUFBb0IsTUFBaUIsRUFDMUIsUUFBa0IsRUFBbUIsTUFBYztRQUQxQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBbUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUpyRCxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUNwQyxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBT3hCLGtCQUFhLEdBQUcsR0FBUyxFQUFFO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdFO2lCQUFNO2dCQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQjtRQUNMLENBQUMsQ0FBQTtRQUVELGNBQVMsR0FBRyxDQUFDLFFBQVMsRUFBUSxFQUFFO1lBQzVCLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDM0MsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDbEMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDOUIsWUFBWSxDQUFDLGFBQWEsR0FBRywwQkFBMEIsQ0FBQztZQUN4RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN4RSxJQUFJLFFBQVEsRUFBRTtnQkFDVixXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUN6QyxRQUFRLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxDQUFBO1FBQ0QsbUJBQWMsR0FBRyxDQUFDLEtBQUssRUFBUSxFQUFFO1lBQzdCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQTtRQUNELGtCQUFhLEdBQUcsR0FBRyxFQUFFO1lBQ2pCLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDM0MsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDbEMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDOUIsWUFBWSxDQUFDLGFBQWEsR0FBRywwQkFBMEIsQ0FBQztZQUN4RCxZQUFZLENBQUMsSUFBSSxHQUFHLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUE7UUFuQ0csSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFtQ0QsZUFBZTtJQUVmLENBQUM7SUFDRCxRQUFRO0lBQ1IsQ0FBQztDQUVKLENBQUE7O1lBNUMrQixTQUFTO1lBQ2hCLFFBQVE7WUFBMkIsTUFBTTs7QUFOckQ7SUFBUixLQUFLLEVBQUU7b0RBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTsyREFBcUI7QUFDcEI7SUFBUixLQUFLLEVBQUU7MkRBQTRCO0FBSjNCLHNCQUFzQjtJQUxsQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLDgwRkFBOEM7O0tBRWpELENBQUM7R0FDVyxzQkFBc0IsQ0FtRGxDO1NBbkRZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXREaWFsb2dDb25maWcsIE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9jaXR5LXNlbGVjdGlvbi9jaXR5LXNlbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1oYW1idXJnZXItbWVudScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hhbWJ1cmdlci1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9oYW1idXJnZXItbWVudS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhhbWJ1cmdlck1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgdXNlcjogYW55O1xuICAgIEBJbnB1dCgpIGFjdGl2ZVBsYWNlOiBTdHJpbmc7XG4gICAgQElucHV0KCkgY291bnRyeUNvZGU6IFN0cmluZyA9ICdJTic7XG4gICAgdXJsQXJyYXk6IHN0cmluZ1tdID0gW107XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgICAgIHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUsIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gICAgfVxuXG4gICAgYnVpbGRVcmxBcnJheSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMucm91dGVyLnVybCkge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IHRoaXMucm91dGVyLnVybC5zcGxpdChcIj9cIilbMF0ucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5Mb2dpbiA9IChjYWxsYmFjaz8pOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgICAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5hdXRvRm9jdXMgPSB0cnVlO1xuICAgICAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgICAgICBjb25zdCBsb2dpbkRpYWxvZyA9IHRoaXMuZGlhbG9nLm9wZW4oTG9naW5Nb2RhbENvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBsb2dpbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWxvYWRPbkxvZ291dCA9IChldmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnRbJ2xvZ291dCddKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3BlbkNpdHlQb3B1cCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgICAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5hdXRvRm9jdXMgPSB0cnVlO1xuICAgICAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgICAgICBkaWFsb2dDb25maWcuZGF0YSA9IHsgJ2NvdW50cnlDb2RlJzogdGhpcy5jb3VudHJ5Q29kZSB9O1xuICAgICAgICB0aGlzLmRpYWxvZy5vcGVuKENpdHlTZWxlY3Rpb25Nb2RhbENvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICB9XG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxufVxuIl19