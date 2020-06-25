import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
var LoginModalComponent = /** @class */ (function () {
    function LoginModalComponent(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.header = 'Let\'s get started';
        this.subHeader = 'Your one stop tool for organizing events';
        this.close = function (event) {
            _this.dialogRef.close(event);
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
        if (this.data != undefined && this.data.source != undefined) {
            this.source = this.data.source;
        }
    };
    LoginModalComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    LoginModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login-modal',
            template: "<app-ts-login-signup clickLocation=\"modal\" [mode]=\"'dialog'\" [defaultHeader]=\"header\" [defaultSubHeader]=\"subHeader\"\n  [showSocial]=\"showSocial\" [rdurl]=\"rdurl\" [source]=\"source\" (closeDialog)='close($event)'></app-ts-login-signup>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.mat-dialog-bkg-container{background:#414243;opacity:.7!important}@media (max-width:700px){.cdk-overlay-pane{height:100vh!important;width:100vw!important;max-width:100vw!important}}@media (min-width:700px){.cdk-overlay-pane{min-width:500px!important}}"]
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
    ], LoginModalComponent);
    return LoginModalComponent;
}());
export { LoginModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE2QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVN6RTtJQVFFLDZCQUFtQixTQUErQyxFQUNoQyxJQUFTO1FBRDNDLGlCQUVDO1FBRmtCLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQUs7UUFQM0MsV0FBTSxHQUFHLG9CQUFvQixDQUFDO1FBQzlCLGNBQVMsR0FBRywwQ0FBMEMsQ0FBQztRQTJCdkQsVUFBSyxHQUFHLFVBQUMsS0FBSztZQUNaLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQTtJQXRCRCxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUU7WUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM5QjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxFQUFFO1lBQy9ELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsRUFBRTtZQUMzRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Z0JBcEI2QixZQUFZO2dEQUN2QyxNQUFNLFNBQUMsZUFBZTs7SUFUZCxtQkFBbUI7UUFOL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixvUUFBMkM7O1NBRzVDLENBQUM7UUFVRyxtQkFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7T0FUZixtQkFBbUIsQ0FpQy9CO0lBQUQsMEJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQWpDWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgVHNMb2dpblNpZ251cENvbXBvbmVudCB9IGZyb20gJy4uL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbG9naW4tbW9kYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4tbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi1tb2RhbC5jb21wb25lbnQuc2NzcyddLFxuICAvL2VuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgaGVhZGVyID0gJ0xldFxcJ3MgZ2V0IHN0YXJ0ZWQnO1xuICBzdWJIZWFkZXIgPSAnWW91ciBvbmUgc3RvcCB0b29sIGZvciBvcmdhbml6aW5nIGV2ZW50cyc7XG4gIHJkdXJsOiBzdHJpbmc7XG4gIHNob3dTb2NpYWw6IGJvb2xlYW47XG4gIHNvdXJjZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUc0xvZ2luU2lnbnVwQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLmhlYWRlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5kYXRhLmhlYWRlcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnN1YkhlYWRlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc3ViSGVhZGVyID0gdGhpcy5kYXRhLnN1YkhlYWRlcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnJkdXJsICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZHVybCA9IHRoaXMuZGF0YS5yZFVybDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnNob3dTb2NpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNob3dTb2NpYWwgPSB0aGlzLmRhdGEuc2hvd1NvY2lhbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnNvdXJjZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc291cmNlID0gdGhpcy5kYXRhLnNvdXJjZTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSA9IChldmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGV2ZW50KTtcbiAgfVxufVxuIl19