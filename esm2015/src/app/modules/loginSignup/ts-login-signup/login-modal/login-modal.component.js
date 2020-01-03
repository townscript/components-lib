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
    }
};
LoginModalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login-modal',
        template: "<app-ts-login-signup clickLocation=\"modal\" [mode]=\"'dialog'\" [defaultHeader]=\"header\" [defaultSubHeader]=\"subHeader\"\n  [showSocial]=\"showSocial\" [rdurl]=\"rdurl\" (closeDialog)='close($event)'></app-ts-login-signup>",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.mat-dialog-bkg-container{background:#414243;opacity:.7!important}@media (max-width:700px){.cdk-overlay-pane{height:100vh!important;width:100vw!important;max-width:100vw!important}}@media (min-width:700px){.cdk-overlay-pane{min-width:500px!important}}"]
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], LoginModalComponent);
export { LoginModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE2QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVN6RSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQU85QixZQUFtQixTQUErQyxFQUNoQyxJQUFTO1FBRHhCLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQUs7UUFOM0MsV0FBTSxHQUFHLG9CQUFvQixDQUFDO1FBQzlCLGNBQVMsR0FBRywwQ0FBMEMsQ0FBQztRQXVCdkQsVUFBSyxHQUFHLENBQUMsS0FBSyxFQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFBO0lBbkJELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO1lBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBRTtZQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QztJQUNILENBQUM7Q0FLRixDQUFBO0FBN0JZLG1CQUFtQjtJQU4vQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLDhPQUEyQzs7S0FHNUMsQ0FBQztJQVNHLG1CQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTs2Q0FESSxZQUFZO0dBUC9CLG1CQUFtQixDQTZCL0I7U0E3QlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFRzTG9naW5TaWdudXBDb21wb25lbnQgfSBmcm9tICcuLi90cy1sb2dpbi1zaWdudXAuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWxvZ2luLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4tbW9kYWwuY29tcG9uZW50LnNjc3MnXSxcbiAgLy9lbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGhlYWRlciA9ICdMZXRcXCdzIGdldCBzdGFydGVkJztcbiAgc3ViSGVhZGVyID0gJ1lvdXIgb25lIHN0b3AgdG9vbCBmb3Igb3JnYW5pemluZyBldmVudHMnO1xuICByZHVybDogc3RyaW5nO1xuICBzaG93U29jaWFsOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxUc0xvZ2luU2lnbnVwQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLmhlYWRlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5kYXRhLmhlYWRlcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnN1YkhlYWRlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc3ViSGVhZGVyID0gdGhpcy5kYXRhLnN1YkhlYWRlcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnJkdXJsICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZHVybCA9IHRoaXMuZGF0YS5yZFVybDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhLnNob3dTb2NpYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNob3dTb2NpYWwgPSB0aGlzLmRhdGEuc2hvd1NvY2lhbDtcbiAgICB9XG4gIH1cblxuICBjbG9zZSA9IChldmVudCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKGV2ZW50KTtcbiAgfVxufVxuIl19