import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
var NotificationService = /** @class */ (function () {
    function NotificationService(snackBar) {
        this.snackBar = snackBar;
    }
    NotificationService.prototype.success = function (message, duration, action) {
        var config = new MatSnackBarConfig();
        config.panelClass = ['ts-notification-success'];
        config.duration = duration;
        this.snackBar.open(message, action, config);
    };
    NotificationService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [MatSnackBar])
    ], NotificationService);
    return NotificationService;
}());
export { NotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25FO0lBQ0ksNkJBQW9CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7SUFDekMsQ0FBQztJQUVELHFDQUFPLEdBQVAsVUFBUSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU07UUFDN0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQVRRLG1CQUFtQjtRQUQvQixVQUFVLEVBQUU7aURBRXFCLFdBQVc7T0FEaEMsbUJBQW1CLENBVS9CO0lBQUQsMEJBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciwgTWF0U25hY2tCYXJDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNuYWNrQmFyOiBNYXRTbmFja0Jhcikge1xuICAgIH1cblxuICAgIHN1Y2Nlc3MobWVzc2FnZSwgZHVyYXRpb24sIGFjdGlvbikge1xuICAgICAgICBjb25zdCBjb25maWcgPSBuZXcgTWF0U25hY2tCYXJDb25maWcoKTtcbiAgICAgICAgY29uZmlnLnBhbmVsQ2xhc3MgPSBbJ3RzLW5vdGlmaWNhdGlvbi1zdWNjZXNzJ107XG4gICAgICAgIGNvbmZpZy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB0aGlzLnNuYWNrQmFyLm9wZW4obWVzc2FnZSwgYWN0aW9uLCBjb25maWcpO1xuICAgIH1cbn1cbiJdfQ==