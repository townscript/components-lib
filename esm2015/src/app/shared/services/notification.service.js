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
NotificationService.ctorParameters = () => [
    { type: MatSnackBar }
];
NotificationService = tslib_1.__decorate([
    Injectable()
], NotificationService);
export { NotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25FLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBQzVCLFlBQW9CLFFBQXFCO1FBQXJCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFHekMsWUFBTyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQVEsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFDdkMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUE7SUFQRCxDQUFDO0NBUUosQ0FBQTs7WUFUaUMsV0FBVzs7QUFEaEMsbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtHQUNBLG1CQUFtQixDQVUvQjtTQVZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyLCBNYXRTbmFja0JhckNvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc25hY2tCYXI6IE1hdFNuYWNrQmFyKSB7XG4gICAgfVxuXG4gICAgc3VjY2VzcyA9IChtZXNzYWdlLCBkdXJhdGlvbiwgYWN0aW9uKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBNYXRTbmFja0JhckNvbmZpZygpO1xuICAgICAgICBjb25maWcucGFuZWxDbGFzcyA9IFsndHMtbm90aWZpY2F0aW9uLXN1Y2Nlc3MnXTtcbiAgICAgICAgY29uZmlnLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIHRoaXMuc25hY2tCYXIub3BlbihtZXNzYWdlLCBhY3Rpb24sIGNvbmZpZyk7XG4gICAgfVxufVxuIl19