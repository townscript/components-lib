import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
let NotificationService = class NotificationService {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.success = (message, duration, action) => {
            const config = new MatSnackBarConfig();
            config.panelClass = ['ts-notification-success'];
            config.duration = duration;
            this.snackBar.open(message, action, config);
        };
    }
};
NotificationService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar])
], NotificationService);
export { NotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25FLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBQzVCLFlBQW9CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFHekMsWUFBTyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQVEsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUE7SUFQRCxDQUFDO0NBUUosQ0FBQTtBQVZZLG1CQUFtQjtJQUQvQixVQUFVLEVBQUU7NkNBRXFCLFdBQVc7R0FEaEMsbUJBQW1CLENBVS9CO1NBVlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIsIE1hdFNuYWNrQmFyQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzbmFja0JhcjogTWF0U25hY2tCYXIpIHtcbiAgICB9XG5cbiAgICBzdWNjZXNzID0gKG1lc3NhZ2UsIGR1cmF0aW9uLCBhY3Rpb24pOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gbmV3IE1hdFNuYWNrQmFyQ29uZmlnKCk7XG4gICAgICAgIGNvbmZpZy5wYW5lbENsYXNzID0gWyd0cy1ub3RpZmljYXRpb24tc3VjY2VzcyddO1xuICAgICAgICBjb25maWcuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5zbmFja0Jhci5vcGVuKG1lc3NhZ2UsIGFjdGlvbiwgY29uZmlnKTtcbiAgICB9XG59XG4iXX0=