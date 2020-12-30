import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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
NotificationService.ctorParameters = () => [
    { type: MatSnackBar }
];
NotificationService = __decorate([
    Injectable()
], NotificationService);
export { NotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzdFLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBQzVCLFlBQW9CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFHekMsWUFBTyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQVEsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUE7SUFQRCxDQUFDO0NBUUosQ0FBQTs7WUFUaUMsV0FBVzs7QUFEaEMsbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtHQUNBLG1CQUFtQixDQVUvQjtTQVZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyLCBNYXRTbmFja0JhckNvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNuYWNrQmFyOiBNYXRTbmFja0Jhcikge1xuICAgIH1cblxuICAgIHN1Y2Nlc3MgPSAobWVzc2FnZSwgZHVyYXRpb24sIGFjdGlvbik6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSBuZXcgTWF0U25hY2tCYXJDb25maWcoKTtcbiAgICAgICAgY29uZmlnLnBhbmVsQ2xhc3MgPSBbJ3RzLW5vdGlmaWNhdGlvbi1zdWNjZXNzJ107XG4gICAgICAgIGNvbmZpZy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICB0aGlzLnNuYWNrQmFyLm9wZW4obWVzc2FnZSwgYWN0aW9uLCBjb25maWcpO1xuICAgIH1cbn1cbiJdfQ==