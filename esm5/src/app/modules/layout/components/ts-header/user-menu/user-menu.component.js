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
        this.panelOpen1 = true;
        this.panelOpen2 = true;
        this.close = new EventEmitter();
        this.host = config.baseUrl;
        this.s3BucketUrl = config.s3BaseUrl + config.s3Bucket;
        this.logout = function () {
            _this.close.emit();
            _this.cookieService.deleteCookie('townscript-user');
            _this.userService.updateUser(null);
            window.location.reload();
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
            template: "<div class=\"user-menu  px-2 cursor-pointer\">\n    <a [href]=\"host+'dashboard/settings/my-profile'\">\n        <div class=\"flex items-center border-b py-2 border-gray-300\">\n            <div class=\"mr-1 leading-none\">\n                <img class=\"rounded-full mr-2\" width=\"45\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n            </div>\n            <div class=\"leading-tight\">\n                <span class=\"block text-lg text-gray-800\">{{user?.user}}</span>\n                <span class=\"text-xs text-gray-600 whitespace-nowrap\">View and edit profile</span>\n            </div>\n        </div>\n    </a>\n    <div class=\"menu mt-2 px-1\">\n        <ts-panel [disable]=\"false\">\n            <ts-panel-header (click)=\"panelOpen1=!panelOpen1\">\n                <div class=\"px-1 py-2 flex items-center border-b  border-gray-300 justify-between\"\n                    [class.border-dashed]=\"panelOpen1\" matRipple>\n                    <span class=\"text-gray-700\">\n                        Organizing Events\n                    </span>\n                    <i class=\"mdi mdi-chevron-down text-2xl color-blue\" [class.rotate-180]=\"panelOpen1\"></i>\n                </div>\n            </ts-panel-header>\n            <ts-panel-body [open]=\"panelOpen1\">\n                <div class=\"text-sm text-gray-800\">\n                    <a [href]=\"host+'dashboard/events'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-calendar-today mr-2 color-blue text-xl\"></i>\n                            Manage Events\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/billing'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-cash mr-2 color-blue text-xl\"></i>\n                            Billing\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/reports'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-chart-line mr-2 color-blue text-xl\"></i>\n                            Reports\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/promo'\">\n                        <div matRipple class=\"px-1 py-1 pb-2 flex items-center border-b border-gray-300\">\n                            <i class=\"mdi mdi-bullhorn mr-2 color-blue text-xl\"></i>\n                            Promotions\n                        </div>\n                    </a>\n                </div>\n            </ts-panel-body>\n        </ts-panel>\n        <ts-panel [disable]=\"false\">\n            <ts-panel-header (click)=\"panelOpen2=!panelOpen2\">\n                <div class=\"px-1 py-2 flex items-center border-b  border-gray-300 justify-between\"\n                    [class.border-dashed]=\"panelOpen2\" matRipple>\n                    <span class=\"text-gray-700\">\n                        Attending Events\n                    </span>\n                    <i class=\"mdi mdi-chevron-down text-2xl color-blue\" [class.rotate-180]=\"panelOpen2\"></i>\n                </div>\n            </ts-panel-header>\n            <ts-panel-body [open]=\"panelOpen2\">\n                <div class=\"text-sm text-gray-800\">\n                    <a [href]=\"host+'dashboard/mybookings'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-ticket-account mr-2 color-blue text-xl\"></i>\n                            My Bookings\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/following'\">\n                        <div matRipple class=\"px-1 py-1 pb-2 flex items-center border-b border-gray-300\">\n                            <i class=\"mdi mdi-heart mr-2 color-blue text-xl \"></i>\n                            Following\n                        </div>\n                    </a>\n                </div>\n            </ts-panel-body>\n        </ts-panel>\n        <div class=\"px-1 py-2 flex items-center justify-between\" (click)=\"logout()\" matRipple>\n            <span class=\"text-gray-700\">\n                Logout\n            </span>\n            <i class=\"mdi mdi-logout-variant text-2xl color-blue\"></i>\n        </div>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__metadata("design:paramtypes", [NotificationService, UserService, CookieService])
    ], UserMenuComponent);
    return UserMenuComponent;
}());
export { UserMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3VzZXItbWVudS91c2VyLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBT3hEO0lBVUksMkJBQW9CLG1CQUF3QyxFQUFVLFdBQXdCLEVBQVUsYUFBNEI7UUFBcEksaUJBRUM7UUFGbUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFSM0gsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJDLFNBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBS2pELFdBQU0sR0FBRztZQUNMLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNuRCxLQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQTtJQU5ELENBQUM7SUFPRCxvQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQWpCTDtRQUFSLEtBQUssRUFBRTs7eURBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzt5REFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7O21EQUFXO0lBQ1Q7UUFBVCxNQUFNLEVBQUU7O29EQUE0QjtJQUw1QixpQkFBaUI7UUFMN0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsNjVJQUF5Qzs7U0FFNUMsQ0FBQztpREFXMkMsbUJBQW1CLEVBQXVCLFdBQVcsRUFBeUIsYUFBYTtPQVYzSCxpQkFBaUIsQ0FxQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXJCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC11c2VyLW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi91c2VyLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3VzZXItbWVudS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHBhbmVsT3BlbjEgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHBhbmVsT3BlbjIgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHVzZXI6IGFueTtcbiAgICBAT3V0cHV0KCkgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBob3N0ID0gY29uZmlnLmJhc2VVcmw7XG4gICAgczNCdWNrZXRVcmwgPSBjb25maWcuczNCYXNlVXJsICsgY29uZmlnLnMzQnVja2V0O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG5cbiAgICB9XG4gICAgbG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlLmVtaXQoKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLmRlbGV0ZUNvb2tpZSgndG93bnNjcmlwdC11c2VyJyk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UudXBkYXRlVXNlcihudWxsKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cbiAgICBuZ09uSW5pdCgpIHsgfVxuXG59XG4iXX0=