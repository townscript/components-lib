import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { CitySelectionModalComponent } from '../../../../../shared/components/city-selection/city-selection.component';
var HamburgerMenuComponent = /** @class */ (function () {
    function HamburgerMenuComponent(dialog, datepipe) {
        var _this = this;
        this.dialog = dialog;
        this.datepipe = datepipe;
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
            _this.dialog.open(CitySelectionModalComponent, dialogConfig);
        };
    }
    HamburgerMenuComponent.prototype.ngAfterViewInit = function () {
    };
    HamburgerMenuComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], HamburgerMenuComponent.prototype, "user", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], HamburgerMenuComponent.prototype, "activePlace", void 0);
    HamburgerMenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-hamburger-menu',
            template: "<nav role=\"navigation\">\n    <div class=\"ham-container position-relative cursor-pointer\">\n        <div class=\"hamburger position-relative\">\n            <!-- <input type=\"checkbox\" /> -->\n            <div class=\"spans\" (click)=\"active=!active\">\n                <span class=\"block background-blue\" [class.active]=\"active\"></span>\n                <span class=\"block background-blue\" [class.active]=\"active\"></span>\n                <span class=\"block background-blue\" [class.active]=\"active\"></span>\n            </div>\n            <div (click)=\"active=!active\" class=\"overlay fixed bg-black w-full h-full\" *ngIf=\"active\"></div>\n            <ul class=\"menu fixed h-full px-4\" [class.active]=\"active\">\n                <div class=\"\">\n                    <img class=\"ts-logo mr-3\" src=\"assets/images/ts-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                        title=\"Townscript Event Ticketing Logo\" />\n                    <div (click)=\"openCityPopup()\" matRipple\n                        class=\"location-section px-2 mt-6 pb-2 border-b border-gray-300 flex items-center\">\n                        <i class=\"mdi mdi-map-marker color-blue text-2xl mr-2\"></i>\n                        <div class=\"flex items-end\">\n                            <span\n                                class=\"mr-1 font-bold text-lg leading-tight text-gray-700 capitalize\">{{activePlace}}</span>\n                            <span class=\"ml-2 color-blue text-xs\">Change</span>\n                        </div>\n                    </div>\n                    <div class=\"user-menu mt-3\">\n                        <app-user-menu [user]=\"user\" (close)=\"reloadOnLogout($event)\" *ngIf=\"user\"></app-user-menu>\n                        <div (click)=\"openLogin()\" matRipple class=\"flex px-2 items-center justify-between w-full\"\n                            *ngIf=\"!user\">\n                            <div>\n                                <span class=\"text-lg block text-gray-800\">Login/Signup</span>\n                                <span class=\"text-xs text-gray-700\">To personalize your experience!</span>\n                            </div>\n                            <i class=\"mdi mdi-chevron-right text-4xl color-blue\"></i>\n                        </div>\n                    </div>\n                </div>\n            </ul>\n        </div>\n    </div>\n</nav>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.ham-container{z-index:1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ham-container .ts-logo{height:30px}.ham-container .hamburger .spans span{width:20px;height:3px;margin-bottom:3px;position:relative;border-radius:3px;z-index:1;-webkit-transform-origin:4px 0;transform-origin:4px 0;-webkit-transition:background .45s,margin .45s,opacity .5s,-webkit-transform .45s;transition:transform .45s,background .45s,margin .45s,opacity .5s,-webkit-transform .45s}.ham-container .hamburger .spans span:first-child{-webkit-transform-origin:0 0;transform-origin:0 0;width:16px}.ham-container .hamburger .spans span:last-child{margin-bottom:0;width:13px}.ham-container .hamburger .spans span:nth-last-child(2){-webkit-transform-origin:0 100%;transform-origin:0 100%;width:20px}.ham-container .hamburger .spans span.active{opacity:1;margin-left:240px;-webkit-transform:rotate(45deg) translate(-11px,0) scaleX(1.5);transform:rotate(45deg) translate(-11px,0) scaleX(1.5);background:#8c8c8c}.ham-container .hamburger .spans span.active:nth-last-child(3){opacity:0;-webkit-transform:rotate(0) scale(.2,.2);transform:rotate(0) scale(.2,.2)}.ham-container .hamburger .spans span.active:nth-last-child(2){-webkit-transform:rotate(-45deg) translate(-10px,-1px);transform:rotate(-45deg) translate(-10px,-1px)}.ham-container .hamburger .spans span.active~ul{-webkit-transform:none;transform:none}.ham-container .overlay{top:0;left:0;opacity:.5;-webkit-animation-name:overlay;animation-name:overlay;-webkit-animation-duration:.5s;animation-duration:.5s}.ham-container .menu{top:0;left:0;width:300px;padding-top:15px;background:#fafafa;box-shadow:0 2px 4px 0 rgba(0,0,0,.11);list-style-type:none;-webkit-font-smoothing:antialiased;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:translate(-100%,0);transform:translate(-100%,0);-webkit-transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}.ham-container .menu .logo{height:40px}.ham-container .menu.active{-webkit-transform:none;transform:none}.ham-container .menu li{padding:10px 0}"]
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            DatePipe])
    ], HamburgerMenuComponent);
    return HamburgerMenuComponent;
}());
export { HamburgerMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvaGFtYnVyZ2VyLW1lbnUvaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzRkFBc0YsQ0FBQztBQUUzSCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQVF2SDtJQUtJLGdDQUFvQixNQUFpQixFQUMxQixRQUFrQjtRQUQ3QixpQkFHQztRQUhtQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFJN0IsY0FBUyxHQUFHLFVBQUMsUUFBUztZQUNsQixJQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFlBQVksQ0FBQyxhQUFhLEdBQUcsMEJBQTBCLENBQUM7WUFDeEQsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDeEUsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07b0JBQ3RDLFFBQVEsRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUE7UUFDRCxtQkFBYyxHQUFHLFVBQUMsS0FBSztZQUNuQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDLENBQUE7UUFDRCxrQkFBYSxHQUFHO1lBQ1osSUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUMzQyxZQUFZLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUNsQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUM5QixZQUFZLENBQUMsYUFBYSxHQUFHLDBCQUEwQixDQUFDO1lBQ3hELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQTtJQXpCRCxDQUFDO0lBMEJELGdEQUFlLEdBQWY7SUFFQSxDQUFDO0lBQ0QseUNBQVEsR0FBUjtJQUNBLENBQUM7SUFwQ1E7UUFBUixLQUFLLEVBQUU7O3dEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7MENBQWMsTUFBTTsrREFBQztJQUhwQixzQkFBc0I7UUFMbEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixnNUVBQThDOztTQUVqRCxDQUFDO2lEQU04QixTQUFTO1lBQ2hCLFFBQVE7T0FOcEIsc0JBQXNCLENBd0NsQztJQUFELDZCQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7U0F4Q1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdERpYWxvZ0NvbmZpZywgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2xvZ2luU2lnbnVwL3RzLWxvZ2luLXNpZ251cC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IENpdHlTZWxlY3Rpb25Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2NpdHktc2VsZWN0aW9uL2NpdHktc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtaGFtYnVyZ2VyLW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9oYW1idXJnZXItbWVudS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaGFtYnVyZ2VyLW1lbnUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIYW1idXJnZXJNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHVzZXI6IGFueTtcbiAgICBASW5wdXQoKSBhY3RpdmVQbGFjZTogU3RyaW5nO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgICAgICBwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG5cbiAgICB9XG5cbiAgICBvcGVuTG9naW4gPSAoY2FsbGJhY2s/KTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICAgICAgY29uc3QgbG9naW5EaWFsb2cgPSB0aGlzLmRpYWxvZy5vcGVuKExvZ2luTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgbG9naW5EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVsb2FkT25Mb2dvdXQgPSAoZXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50Wydsb2dvdXQnXSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9wZW5DaXR5UG9wdXAgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICAgICAgdGhpcy5kaWFsb2cub3BlbihDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgfVxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbn1cbiJdfQ==