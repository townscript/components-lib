import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { CitySelectionModalComponent } from '../../../../../shared/components/city-selection/city-selection.component';
import { Router } from '@angular/router';
var HamburgerMenuComponent = /** @class */ (function () {
    function HamburgerMenuComponent(dialog, datepipe, router) {
        var _this = this;
        this.dialog = dialog;
        this.datepipe = datepipe;
        this.router = router;
        this.countryCode = 'IN';
        this.urlArray = [];
        this.buildUrlArray = function () {
            if (_this.router.url) {
                _this.urlArray = _this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                _this.urlArray = ['in'];
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
        this.reloadOnLogout = function (event) {
            if (event && event['logout']) {
                window.location.reload();
            }
        };
        this.openCityPopup = function () {
            var dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            dialogConfig.data = { 'countryCode': _this.countryCode };
            _this.dialog.open(CitySelectionModalComponent, dialogConfig);
        };
        this.buildUrlArray();
    }
    HamburgerMenuComponent.prototype.ngAfterViewInit = function () {
    };
    HamburgerMenuComponent.prototype.ngOnInit = function () {
    };
    HamburgerMenuComponent.ctorParameters = function () { return [
        { type: MatDialog },
        { type: DatePipe },
        { type: Router }
    ]; };
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
    return HamburgerMenuComponent;
}());
export { HamburgerMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvaGFtYnVyZ2VyLW1lbnUvaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzRkFBc0YsQ0FBQztBQUUzSCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFRekM7SUFPSSxnQ0FBb0IsTUFBaUIsRUFDMUIsUUFBa0IsRUFBbUIsTUFBYztRQUQ5RCxpQkFHQztRQUhtQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBbUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUpyRCxnQkFBVyxHQUFXLElBQUksQ0FBQztRQUNwQyxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBT3hCLGtCQUFhLEdBQUc7WUFDWixJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNqQixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3RTtpQkFBTTtnQkFDSCxLQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUI7UUFDTCxDQUFDLENBQUE7UUFFRCxjQUFTLEdBQUcsVUFBQyxRQUFTO1lBQ2xCLElBQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDM0MsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDbEMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDOUIsWUFBWSxDQUFDLGFBQWEsR0FBRywwQkFBMEIsQ0FBQztZQUN4RCxJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN4RSxJQUFJLFFBQVEsRUFBRTtnQkFDVixXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtvQkFDdEMsUUFBUSxFQUFFLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQTtRQUNELG1CQUFjLEdBQUcsVUFBQyxLQUFLO1lBQ25CLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQTtRQUNELGtCQUFhLEdBQUc7WUFDWixJQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFlBQVksQ0FBQyxhQUFhLEdBQUcsMEJBQTBCLENBQUM7WUFDeEQsWUFBWSxDQUFDLElBQUksR0FBRyxFQUFFLGFBQWEsRUFBRSxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFBO1FBbkNHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBbUNELGdEQUFlLEdBQWY7SUFFQSxDQUFDO0lBQ0QseUNBQVEsR0FBUjtJQUNBLENBQUM7O2dCQTFDMkIsU0FBUztnQkFDaEIsUUFBUTtnQkFBMkIsTUFBTTs7SUFOckQ7UUFBUixLQUFLLEVBQUU7d0RBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTsrREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7K0RBQTRCO0lBSjNCLHNCQUFzQjtRQUxsQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLDgwRkFBOEM7O1NBRWpELENBQUM7T0FDVyxzQkFBc0IsQ0FtRGxDO0lBQUQsNkJBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQW5EWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnLCBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ2l0eVNlbGVjdGlvbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvY2l0eS1zZWxlY3Rpb24vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtaGFtYnVyZ2VyLW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9oYW1idXJnZXItbWVudS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIYW1idXJnZXJNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHVzZXI6IGFueTtcbiAgICBASW5wdXQoKSBhY3RpdmVQbGFjZTogU3RyaW5nO1xuICAgIEBJbnB1dCgpIGNvdW50cnlDb2RlOiBTdHJpbmcgPSAnSU4nO1xuICAgIHVybEFycmF5OiBzdHJpbmdbXSA9IFtdO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgICAgICBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlLCBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICAgIH1cblxuICAgIGJ1aWxkVXJsQXJyYXkgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuTG9naW4gPSAoY2FsbGJhY2s/KTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICAgICAgY29uc3QgbG9naW5EaWFsb2cgPSB0aGlzLmRpYWxvZy5vcGVuKExvZ2luTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgbG9naW5EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVsb2FkT25Mb2dvdXQgPSAoZXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50Wydsb2dvdXQnXSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9wZW5DaXR5UG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICAgICAgZGlhbG9nQ29uZmlnLmRhdGEgPSB7ICdjb3VudHJ5Q29kZSc6IHRoaXMuY291bnRyeUNvZGUgfTtcbiAgICAgICAgdGhpcy5kaWFsb2cub3BlbihDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgfVxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbn1cbiJdfQ==