import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
var NotificationService = /** @class */ (function () {
    function NotificationService(snackBar) {
        var _this = this;
        this.snackBar = snackBar;
        this.success = function (message, duration, action) {
            var config = new MatSnackBarConfig();
            config.panelClass = ['ts-notification-success'];
            config.duration = duration;
            _this.snackBar.open(message, action, config);
        };
    }
    NotificationService.ctorParameters = function () { return [
        { type: MatSnackBar }
    ]; };
    NotificationService = __decorate([
        Injectable()
    ], NotificationService);
    return NotificationService;
}());
export { NotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzdFO0lBQ0ksNkJBQW9CLFFBQXFCO1FBQXpDLGlCQUNDO1FBRG1CLGFBQVEsR0FBUixRQUFRLENBQWE7UUFHekMsWUFBTyxHQUFHLFVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNO1lBQ2hDLElBQU0sTUFBTSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUN2QyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQTtJQVBELENBQUM7O2dCQUQ2QixXQUFXOztJQURoQyxtQkFBbUI7UUFEL0IsVUFBVSxFQUFFO09BQ0EsbUJBQW1CLENBVS9CO0lBQUQsMEJBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0JhciwgTWF0U25hY2tCYXJDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzbmFja0JhcjogTWF0U25hY2tCYXIpIHtcbiAgICB9XG5cbiAgICBzdWNjZXNzID0gKG1lc3NhZ2UsIGR1cmF0aW9uLCBhY3Rpb24pOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gbmV3IE1hdFNuYWNrQmFyQ29uZmlnKCk7XG4gICAgICAgIGNvbmZpZy5wYW5lbENsYXNzID0gWyd0cy1ub3RpZmljYXRpb24tc3VjY2VzcyddO1xuICAgICAgICBjb25maWcuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5zbmFja0Jhci5vcGVuKG1lc3NhZ2UsIGFjdGlvbiwgY29uZmlnKTtcbiAgICB9XG59XG4iXX0=