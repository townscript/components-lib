import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CookieService } from '../../../../../core/cookie.service';
import { UserService } from '../../../../../shared/services/user-service';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { config } from '../../../../../core/app-config';
let UserMenuComponent = class UserMenuComponent {
    constructor(notificationService, userService, cookieService) {
        this.notificationService = notificationService;
        this.userService = userService;
        this.cookieService = cookieService;
        this.panelOpen1 = true;
        this.panelOpen2 = true;
        this.close = new EventEmitter();
        this.host = config.baseUrl;
        this.s3BucketUrl = config.s3BaseUrl + config.s3Bucket;
        this.logout = () => {
            this.close.emit({ logout: true });
            this.cookieService.deleteCookie('townscript-user');
            this.userService.updateUser(undefined);
        };
    }
    ngOnInit() { }
};
UserMenuComponent.ctorParameters = () => [
    { type: NotificationService },
    { type: UserService },
    { type: CookieService }
];
tslib_1.__decorate([
    Input()
], UserMenuComponent.prototype, "panelOpen1", void 0);
tslib_1.__decorate([
    Input()
], UserMenuComponent.prototype, "panelOpen2", void 0);
tslib_1.__decorate([
    Input()
], UserMenuComponent.prototype, "user", void 0);
tslib_1.__decorate([
    Output()
], UserMenuComponent.prototype, "close", void 0);
UserMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-menu',
        template: "<div class=\"user-menu  px-2 cursor-pointer\">\n    <a [href]=\"host+'dashboard/settings/my-profile'\">\n        <div class=\"flex items-center border-b py-2 border-gray-300\">\n            <div class=\"mr-1 leading-none\">\n                <img class=\"rounded-full mr-2\" width=\"45\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n            </div>\n            <div appDataAnalytics  eventLabel=\"profile\" clickLocation=\"\" class=\"leading-tight\">\n                <span class=\"block text-lg text-gray-800\">{{user?.user}}</span>\n                <span class=\"text-xs text-gray-600 whitespace-nowrap\">View and edit profile</span>\n            </div>\n        </div>\n    </a>\n    <div class=\"menu mt-2 px-1\">\n        <ts-panel [disable]=\"false\">\n            <ts-panel-header>\n                <div (click)=\"panelOpen1=!panelOpen1\" appDataAnalytics  eventLabel=\"organizing\" clickLocation=\"\" class=\"px-1 py-2 flex items-center border-b  border-gray-300 justify-between\"\n                    [class.border-dashed]=\"panelOpen1\" matRipple>\n                    <span class=\"text-gray-700\">\n                        Organizing Events\n                    </span>\n                    <i class=\"mdi mdi-chevron-down text-2xl color-blue\" [class.rotate-180]=\"panelOpen1\"></i>\n                </div>\n            </ts-panel-header>\n            <ts-panel-body [open]=\"panelOpen1\">\n                <div class=\"text-sm text-gray-800\">\n                    <a [href]=\"host+'dashboard/events'\">\n                        <div appDataAnalytics  eventLabel=\"manage\" clickLocation=\"\" matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-calendar-today mr-2 color-blue text-xl\"></i>\n                            Manage Events\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/billing'\">\n                        <div appDataAnalytics  eventLabel=\"billings\" clickLocation=\"\" matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-cash mr-2 color-blue text-xl\"></i>\n                            Billing\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/reports'\">\n                        <div appDataAnalytics  eventLabel=\"reports\" clickLocation=\"\" matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-chart-line mr-2 color-blue text-xl\"></i>\n                            Reports\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/promo'\">\n                        <div appDataAnalytics  eventLabel=\"promo\" clickLocation=\"\" matRipple class=\"px-1 py-1 pb-2 flex items-center border-b border-gray-300\">\n                            <i class=\"mdi mdi-bullhorn mr-2 color-blue text-xl\"></i>\n                            Promotions\n                        </div>\n                    </a>\n                </div>\n            </ts-panel-body>\n        </ts-panel>\n        <ts-panel [disable]=\"false\">\n            <ts-panel-header>\n                <div  (click)=\"panelOpen2=!panelOpen2\" appDataAnalytics  eventLabel=\"attending\" clickLocation=\"\" class=\"px-1 py-2 flex items-center border-b  border-gray-300 justify-between\"\n                    [class.border-dashed]=\"panelOpen2\" matRipple>\n                    <span class=\"text-gray-700\">\n                        Attending Events\n                    </span>\n                    <i class=\"mdi mdi-chevron-down text-2xl color-blue\" [class.rotate-180]=\"panelOpen2\"></i>\n                </div>\n            </ts-panel-header>\n            <ts-panel-body [open]=\"panelOpen2\">\n                <div class=\"text-sm text-gray-800\">\n                    <a [href]=\"host+'dashboard/mybookings'\">\n                        <div appDataAnalytics  eventLabel=\"bookings\" clickLocation=\"\" matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-ticket-account mr-2 color-blue text-xl\"></i>\n                            My Bookings\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/following'\">\n                        <div appDataAnalytics  eventLabel=\"following\" clickLocation=\"\" matRipple class=\"px-1 py-1 pb-2 flex items-center border-b border-gray-300\">\n                            <i class=\"mdi mdi-heart mr-2 color-blue text-xl \"></i>\n                            Following\n                        </div>\n                    </a>\n                </div>\n            </ts-panel-body>\n        </ts-panel>\n        <div appDataAnalytics  eventLabel=\"logout\" clickLocation=\"\" class=\"px-1 py-2 flex items-center justify-between\" (click)=\"logout()\" matRipple>\n            <span class=\"text-gray-700\">\n                Logout\n            </span>\n            <i class=\"mdi mdi-logout-variant text-2xl color-blue\"></i>\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    })
], UserMenuComponent);
export { UserMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3VzZXItbWVudS91c2VyLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBT3hELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBVTFCLFlBQW9CLG1CQUF3QyxFQUNqRCxXQUF3QixFQUN4QixhQUE0QjtRQUZuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ2pELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBVjlCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVqQixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyQyxTQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN0QixnQkFBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQU9qRCxXQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQTtJQUxELENBQUM7SUFNRCxRQUFRLEtBQUssQ0FBQztDQUVqQixDQUFBOztZQVo0QyxtQkFBbUI7WUFDcEMsV0FBVztZQUNULGFBQWE7O0FBVjlCO0lBQVIsS0FBSyxFQUFFO3FEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTtxREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7K0NBQVc7QUFDVDtJQUFULE1BQU0sRUFBRTtnREFBNEI7QUFMNUIsaUJBQWlCO0lBTDdCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLDIvSkFBeUM7O0tBRTVDLENBQUM7R0FDVyxpQkFBaUIsQ0FzQjdCO1NBdEJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2Nvb2tpZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXVzZXItbWVudScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3VzZXItbWVudS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdXNlci1tZW51LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVXNlck1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgcGFuZWxPcGVuMSA9IHRydWU7XG4gICAgQElucHV0KCkgcGFuZWxPcGVuMiA9IHRydWU7XG4gICAgQElucHV0KCkgdXNlcjogYW55O1xuICAgIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGhvc3QgPSBjb25maWcuYmFzZVVybDtcbiAgICBzM0J1Y2tldFVybCA9IGNvbmZpZy5zM0Jhc2VVcmwgKyBjb25maWcuczNCdWNrZXQ7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlKSB7XG5cbiAgICB9XG4gICAgbG9nb3V0ID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlLmVtaXQoe2xvZ291dDogdHJ1ZX0pO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2UuZGVsZXRlQ29va2llKCd0b3duc2NyaXB0LXVzZXInKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS51cGRhdGVVc2VyKHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkgeyB9XG5cbn1cbiJdfQ==