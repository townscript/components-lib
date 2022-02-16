import { __decorate, __param } from "tslib";
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
LoginModalComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
LoginModalComponent = __decorate([
    Component({
        selector: 'app-login-modal',
        template: "<app-ts-login-signup clickLocation=\"modal\" [mode]=\"'dialog'\" [defaultHeader]=\"header\" [defaultSubHeader]=\"subHeader\"\n  [showSocial]=\"showSocial\" [rdurl]=\"rdurl\" [source]=\"source\" (closeDialog)='close($event)'></app-ts-login-signup>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.bg-primary{background-color:#563de1}.mat-dialog-bkg-container{background:#414243;opacity:.7!important}@media (max-width:700px){.cdk-overlay-pane{height:100vh!important;width:100vw!important;max-width:100vw!important}}@media (min-width:700px){.cdk-overlay-pane{min-width:500px!important}}"]
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], LoginModalComponent);
export { LoginModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE2QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVN6RSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQVE5QixZQUFtQixTQUErQyxFQUNoQyxJQUFTO1FBRHhCLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQUs7UUFQM0MsV0FBTSxHQUFHLG9CQUFvQixDQUFDO1FBQzlCLGNBQVMsR0FBRywwQ0FBMEMsQ0FBQztRQTJCdkQsVUFBSyxHQUFHLENBQUMsS0FBSyxFQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFBO0lBdEJELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO1lBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBRTtZQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEM7SUFDSCxDQUFDO0NBS0YsQ0FBQTs7WUF6QitCLFlBQVk7NENBQ3ZDLE1BQU0sU0FBQyxlQUFlOztBQVRkLG1CQUFtQjtJQU4vQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLG9RQUEyQzs7S0FHNUMsQ0FBQztJQVVHLFdBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0dBVGYsbUJBQW1CLENBaUMvQjtTQWpDWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgVHNMb2dpblNpZ251cENvbXBvbmVudCB9IGZyb20gJy4uL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbG9naW4tbW9kYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4tbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi1tb2RhbC5jb21wb25lbnQuc2NzcyddLFxuICAvL2VuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgaGVhZGVyID0gJ0xldFxcJ3MgZ2V0IHN0YXJ0ZWQnO1xuICBzdWJIZWFkZXIgPSAnWW91ciBvbmUgc3RvcCB0b29sIGZvciBvcmdhbml6aW5nIGV2ZW50cyc7XG4gIHJkdXJsOiBzdHJpbmc7XG4gIHNob3dTb2NpYWw6IGJvb2xlYW47XG4gIHNvdXJjZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUc0xvZ2luU2lnbnVwQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLmhlYWRlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5kYXRhLmhlYWRlcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnN1YkhlYWRlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc3ViSGVhZGVyID0gdGhpcy5kYXRhLnN1YkhlYWRlcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnJkdXJsICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZHVybCA9IHRoaXMuZGF0YS5yZFVybDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnNob3dTb2NpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNob3dTb2NpYWwgPSB0aGlzLmRhdGEuc2hvd1NvY2lhbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnNvdXJjZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc291cmNlID0gdGhpcy5kYXRhLnNvdXJjZTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSA9IChldmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGV2ZW50KTtcbiAgfVxufVxuIl19