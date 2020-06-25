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
LoginModalComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
LoginModalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login-modal',
        template: "<app-ts-login-signup clickLocation=\"modal\" [mode]=\"'dialog'\" [defaultHeader]=\"header\" [defaultSubHeader]=\"subHeader\"\n  [showSocial]=\"showSocial\" [rdurl]=\"rdurl\" [source]=\"source\" (closeDialog)='close($event)'></app-ts-login-signup>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.mat-dialog-bkg-container{background:#414243;opacity:.7!important}@media (max-width:700px){.cdk-overlay-pane{height:100vh!important;width:100vw!important;max-width:100vw!important}}@media (min-width:700px){.cdk-overlay-pane{min-width:500px!important}}"]
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], LoginModalComponent);
export { LoginModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUE2QixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVN6RSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQVE5QixZQUFtQixTQUErQyxFQUNoQyxJQUFTO1FBRHhCLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQUs7UUFQM0MsV0FBTSxHQUFHLG9CQUFvQixDQUFDO1FBQzlCLGNBQVMsR0FBRywwQ0FBMEMsQ0FBQztRQTJCdkQsVUFBSyxHQUFHLENBQUMsS0FBSyxFQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFBO0lBdEJELENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNoQztRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO1lBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBRTtZQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEM7SUFDSCxDQUFDO0NBS0YsQ0FBQTs7WUF6QitCLFlBQVk7NENBQ3ZDLE1BQU0sU0FBQyxlQUFlOztBQVRkLG1CQUFtQjtJQU4vQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLG9RQUEyQzs7S0FHNUMsQ0FBQztJQVVHLG1CQUFBLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtHQVRmLG1CQUFtQixDQWlDL0I7U0FqQ1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFRzTG9naW5TaWdudXBDb21wb25lbnQgfSBmcm9tICcuLi90cy1sb2dpbi1zaWdudXAuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWxvZ2luLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4tbW9kYWwuY29tcG9uZW50LnNjc3MnXSxcbiAgLy9lbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGhlYWRlciA9ICdMZXRcXCdzIGdldCBzdGFydGVkJztcbiAgc3ViSGVhZGVyID0gJ1lvdXIgb25lIHN0b3AgdG9vbCBmb3Igb3JnYW5pemluZyBldmVudHMnO1xuICByZHVybDogc3RyaW5nO1xuICBzaG93U29jaWFsOiBib29sZWFuO1xuICBzb3VyY2U6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8VHNMb2dpblNpZ251cENvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmRhdGEgIT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0YS5oZWFkZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmhlYWRlciA9IHRoaXMuZGF0YS5oZWFkZXI7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0YS5zdWJIZWFkZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnN1YkhlYWRlciA9IHRoaXMuZGF0YS5zdWJIZWFkZXI7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0YS5yZHVybCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMucmR1cmwgPSB0aGlzLmRhdGEucmRVcmw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0YS5zaG93U29jaWFsICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zaG93U29jaWFsID0gdGhpcy5kYXRhLnNob3dTb2NpYWw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGEgIT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0YS5zb3VyY2UgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHRoaXMuZGF0YS5zb3VyY2U7XG4gICAgfVxuICB9XG5cbiAgY2xvc2UgPSAoZXZlbnQpOiB2b2lkID0+IHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShldmVudCk7XG4gIH1cbn1cbiJdfQ==