import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CookieService } from '../../../../../core/cookie.service';
import { UserService } from '../../../../../shared/services/user-service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { config } from '../../../../../core/app-config';
var UserMenuComponent = /** @class */ (function () {
    function UserMenuComponent(notificationService, userService, cookieService) {
        var _this = this;
        this.notificationService = notificationService;
        this.userService = userService;
        this.cookieService = cookieService;
        this.panelOpen1 = false;
        this.panelOpen2 = false;
        this.close = new EventEmitter();
        this.host = config.baseUrl;
        this.s3BucketUrl = config.s3BaseUrl + config.s3Bucket;
        this.logout = function () {
            _this.close.emit();
            _this.cookieService.deleteCookie('townscript-user');
            _this.userService.updateUser(null);
            _this.notificationService.success('You are logged out successfully!', 2000, 'Dismiss');
        };
    }
    UserMenuComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], UserMenuComponent.prototype, "panelOpen1", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], UserMenuComponent.prototype, "panelOpen2", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], UserMenuComponent.prototype, "user", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], UserMenuComponent.prototype, "close", void 0);
    UserMenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-user-menu',
            template: "<div class=\"user-menu  px-2 cursor-pointer\">\n    <a [href]=\"host+'dashboard/settings/my-profile'\">\n        <div class=\"flex items-center border-b py-2 border-gray-300\">\n            <div class=\"mr-1 leading-none\">\n                <img class=\"rounded-full mr-2\" width=\"45\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n            </div>\n            <div class=\"leading-tight\">\n                <span class=\"block text-lg text-gray-800\">{{user?.user}}</span>\n                <span class=\"text-xs text-gray-600 whitespace-nowrap\">View and edit profile</span>\n            </div>\n        </div>\n    </a>\n    <div class=\"menu mt-2 px-1\">\n        <ts-panel [disable]=\"false\">\n            <ts-panel-header (click)=\"panelOpen1=!panelOpen1\">\n                <div class=\"px-1 py-2 flex items-center border-b  border-gray-300 justify-between\"\n                    [class.border-dashed]=\"panelOpen1\" matRipple>\n                    <span class=\"text-gray-700\">\n                        Organizing Events\n                    </span>\n                    <i class=\"mdi mdi-chevron-down text-2xl color-blue\" [class.rotate-180]=\"panelOpen1\"></i>\n                </div>\n            </ts-panel-header>\n            <ts-panel-body [open]=\"panelOpen1\">\n                <div class=\"text-sm text-gray-800\">\n                    <a [href]=\"host+'dashboard/events'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-calendar-today mr-2 color-blue text-xl\"></i>\n                            Manage Event\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/billing'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-cash mr-2 color-blue text-xl\"></i>\n                            Billings\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/reports'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-chart-line mr-2 color-blue text-xl\"></i>\n                            Reports\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/promo'\">\n                        <div matRipple class=\"px-1 py-1 pb-2 flex items-center border-b border-gray-300\">\n                            <i class=\"mdi mdi-bullhorn mr-2 color-blue text-xl\"></i>\n                            Promotions\n                        </div>\n                    </a>\n                </div>\n            </ts-panel-body>\n        </ts-panel>\n        <ts-panel [disable]=\"false\">\n            <ts-panel-header (click)=\"panelOpen2=!panelOpen2\">\n                <div class=\"px-1 py-2 flex items-center border-b  border-gray-300 justify-between\"\n                    [class.border-dashed]=\"panelOpen2\" matRipple>\n                    <span class=\"text-gray-700\">\n                        Attending Events\n                    </span>\n                    <i class=\"mdi mdi-chevron-down text-2xl color-blue\" [class.rotate-180]=\"panelOpen2\"></i>\n                </div>\n            </ts-panel-header>\n            <ts-panel-body [open]=\"panelOpen2\">\n                <div class=\"text-sm text-gray-800\">\n                    <a [href]=\"host+'dashboard/mybookings'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-ticket-account mr-2 color-blue text-xl\"></i>\n                            My Bookings\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/following'\">\n                        <div matRipple class=\"px-1 py-1 pb-2 flex items-center border-b border-gray-300\">\n                            <i class=\"mdi mdi-heart mr-2 color-blue text-xl \"></i>\n                            Following\n                        </div>\n                    </a>\n                </div>\n            </ts-panel-body>\n        </ts-panel>\n        <div class=\"px-1 py-2 flex items-center justify-between\" (click)=\"logout()\" matRipple>\n            <span class=\"text-gray-700\">\n                Logout\n            </span>\n            <i class=\"mdi mdi-logout-variant text-2xl color-blue\"></i>\n        </div>\n    </div>\n</div>",
            styles: [""]
        }),
        tslib_1.__metadata("design:paramtypes", [NotificationService, UserService, CookieService])
    ], UserMenuComponent);
    return UserMenuComponent;
}());
export { UserMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3VzZXItbWVudS91c2VyLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBT3hEO0lBVUksMkJBQW9CLG1CQUF3QyxFQUFVLFdBQXdCLEVBQVUsYUFBNEI7UUFBcEksaUJBRUM7UUFGbUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFSM0gsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJDLFNBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBS2pELFdBQU0sR0FBRztZQUNMLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNuRCxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMxRixDQUFDLENBQUE7SUFORCxDQUFDO0lBT0Qsb0NBQVEsR0FBUixjQUFhLENBQUM7SUFqQkw7UUFBUixLQUFLLEVBQUU7O3lEQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTs7eURBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFOzttREFBVztJQUNUO1FBQVQsTUFBTSxFQUFFOztvREFBNEI7SUFMNUIsaUJBQWlCO1FBTDdCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLDI1SUFBeUM7O1NBRTVDLENBQUM7aURBVzJDLG1CQUFtQixFQUF1QixXQUFXLEVBQXlCLGFBQWE7T0FWM0gsaUJBQWlCLENBcUI3QjtJQUFELHdCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdXNlci1tZW51JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdXNlci1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi91c2VyLW1lbnUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBVc2VyTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBwYW5lbE9wZW4xID0gZmFsc2U7XG4gICAgQElucHV0KCkgcGFuZWxPcGVuMiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHVzZXI6IGFueTtcbiAgICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBob3N0ID0gY29uZmlnLmJhc2VVcmw7XG4gICAgczNCdWNrZXRVcmwgPSBjb25maWcuczNCYXNlVXJsICsgY29uZmlnLnMzQnVja2V0O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG5cbiAgICB9XG4gICAgbG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlLmVtaXQoKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLmRlbGV0ZUNvb2tpZSgndG93bnNjcmlwdC11c2VyJyk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UudXBkYXRlVXNlcihudWxsKTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoJ1lvdSBhcmUgbG9nZ2VkIG91dCBzdWNjZXNzZnVsbHkhJywgMjAwMCwgJ0Rpc21pc3MnKTtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7IH1cblxufVxuIl19