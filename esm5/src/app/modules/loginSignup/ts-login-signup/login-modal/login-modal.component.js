import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
var LoginModalComponent = /** @class */ (function () {
    function LoginModalComponent(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.header = 'Let\'s get started';
        this.subHeader = 'Your one stop tool for organizing events';
        this.close = function () {
            _this.dialogRef.close();
        };
    }
    LoginModalComponent.prototype.ngOnInit = function () {
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
    };
    LoginModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login-modal',
            template: "<app-ts-login-signup [mode]=\"'dialog'\" [defaultHeader]=\"header\" [defaultSubHeader]=\"subHeader\" [showSocial]=\"showSocial\"\n  [rdurl]=\"rdurl\" (closeDialog)='close()'></app-ts-login-signup>\n",
            encapsulation: ViewEncapsulation.None,
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.mat-dialog-bkg-container{background:#414243;opacity:.7!important}@media (max-width:700px){.cdk-overlay-pane{height:100vh!important;width:100vw!important;max-width:100vw!important}}@media (min-width:700px){.cdk-overlay-pane{min-width:500px!important}}"]
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], LoginModalComponent);
    return LoginModalComponent;
}());
export { LoginModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBU3pFO0lBT0UsNkJBQW1CLFNBQStDLEVBQ2hDLElBQVM7UUFEM0MsaUJBRUM7UUFGa0IsY0FBUyxHQUFULFNBQVMsQ0FBc0M7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBSztRQU4zQyxXQUFNLEdBQUcsb0JBQW9CLENBQUM7UUFDOUIsY0FBUyxHQUFHLDBDQUEwQyxDQUFDO1FBdUJ2RCxVQUFLLEdBQUc7WUFDTixLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQTtJQW5CRCxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUU7WUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM5QjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFFO1lBQy9ELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBeEJVLG1CQUFtQjtRQU4vQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLGtOQUEyQztZQUUzQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7U0FDdEMsQ0FBQztRQVNHLG1CQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtpREFESSxZQUFZO09BUC9CLG1CQUFtQixDQTZCL0I7SUFBRCwwQkFBQztDQUFBLEFBN0JELElBNkJDO1NBN0JZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBUc0xvZ2luU2lnbnVwQ29tcG9uZW50IH0gZnJvbSAnLi4vdHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1sb2dpbi1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLW1vZGFsLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgaGVhZGVyID0gJ0xldFxcJ3MgZ2V0IHN0YXJ0ZWQnO1xuICBzdWJIZWFkZXIgPSAnWW91ciBvbmUgc3RvcCB0b29sIGZvciBvcmdhbml6aW5nIGV2ZW50cyc7XG4gIHJkdXJsOiBzdHJpbmc7XG4gIHNob3dTb2NpYWw6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFRzTG9naW5TaWdudXBDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuaGVhZGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5oZWFkZXIgPSB0aGlzLmRhdGEuaGVhZGVyO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuc3ViSGVhZGVyICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zdWJIZWFkZXIgPSB0aGlzLmRhdGEuc3ViSGVhZGVyO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEucmR1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnJkdXJsID0gdGhpcy5kYXRhLnJkVXJsO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGEuc2hvd1NvY2lhbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IHRoaXMuZGF0YS5zaG93U29jaWFsO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cbn1cbiJdfQ==