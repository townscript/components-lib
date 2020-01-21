import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
let LoginModalComponent = class LoginModalComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.header = 'Let\'s get started';
        this.subHeader = 'Your one stop tool for organizing events';
        this.close = (event) => {
            this.dialogRef.close(event);
        };
    }
    ngOnInit() {
        if (this.data != undefined && this.data.header != undefined) {
            this.header = this.data.header;
        }
        if (this.data != undefined && this.data.subHeader != undefined) {
            this.subHeader = this.data.subHeader;
        }
        if (this.data != undefined && this.data.rdurl != undefined) {
            this.rdurl = this.data.rdUrl;
        }
        if (this.data != undefined && this.data.showSocial != undefined) {
            this.showSocial = this.data.showSocial;
        }
        if (this.data != undefined && this.data.source != undefined) {
            this.source = this.data.source;
        }
    }
};
LoginModalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login-modal',
        template: "<app-ts-login-signup clickLocation=\"modal\" [mode]=\"'dialog'\" [defaultHeader]=\"header\" [defaultSubHeader]=\"subHeader\"\n  [showSocial]=\"showSocial\" [rdurl]=\"rdurl\" [source]=\"source\" (closeDialog)='close($event)'></app-ts-login-signup>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.mat-dialog-bkg-container{background:#414243;opacity:.7!important}@media (max-width:700px){.cdk-overlay-pane{height:100vh!important;width:100vw!important;max-width:100vw!important}}@media (min-width:700px){.cdk-overlay-pane{min-width:500px!important}}"]
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], LoginModalComponent);
export { LoginModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE2QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVN6RSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQVE5QixZQUFtQixTQUErQyxFQUNoQyxJQUFTO1FBRHhCLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQUs7UUFQM0MsV0FBTSxHQUFHLG9CQUFvQixDQUFDO1FBQzlCLGNBQVMsR0FBRywwQ0FBMEMsQ0FBQztRQTJCdkQsVUFBSyxHQUFHLENBQUMsS0FBSyxFQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFBO0lBdEJELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO1lBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBRTtZQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEM7SUFDSCxDQUFDO0NBS0YsQ0FBQTtBQWpDWSxtQkFBbUI7SUFOL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixvUUFBMkM7O0tBRzVDLENBQUM7SUFVRyxtQkFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7NkNBREksWUFBWTtHQVIvQixtQkFBbUIsQ0FpQy9CO1NBakNZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBUc0xvZ2luU2lnbnVwQ29tcG9uZW50IH0gZnJvbSAnLi4vdHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1sb2dpbi1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLW1vZGFsLmNvbXBvbmVudC5zY3NzJ10sXG4gIC8vZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBoZWFkZXIgPSAnTGV0XFwncyBnZXQgc3RhcnRlZCc7XG4gIHN1YkhlYWRlciA9ICdZb3VyIG9uZSBzdG9wIHRvb2wgZm9yIG9yZ2FuaXppbmcgZXZlbnRzJztcbiAgcmR1cmw6IHN0cmluZztcbiAgc2hvd1NvY2lhbDogYm9vbGVhbjtcbiAgc291cmNlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRzTG9naW5TaWdudXBDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuaGVhZGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmRhdGEuaGVhZGVyO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuc3ViSGVhZGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zdWJIZWFkZXIgPSB0aGlzLmRhdGEuc3ViSGVhZGVyO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEucmR1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnJkdXJsID0gdGhpcy5kYXRhLnJkVXJsO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuc2hvd1NvY2lhbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IHRoaXMuZGF0YS5zaG93U29jaWFsO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuc291cmNlICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmRhdGEuc291cmNlO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlID0gKGV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoZXZlbnQpO1xuICB9XG59XG4iXX0=