import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginModalComponent } from '../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { FollowService } from '../../services/follow.service';
import { UserService } from '../../services/user-service';
let FollowComponent = class FollowComponent {
    constructor(userService, followService, dialog) {
        this.userService = userService;
        this.followService = followService;
        this.dialog = dialog;
        this.text = 'Follow';
        this.followedText = 'Following';
        this.type = 'button';
        this.color = '#683592';
        this.status = new EventEmitter();
        this.loggedIn = false;
        this.followed = false;
        this.emitFollowStatus = () => {
            this.status.emit(this.followed);
        };
        this.checkFollowStatus = () => {
            if (!this.followTypeId || !this.followType) {
                return;
            }
            this.subObject = this.followService.followData.subscribe(res => {
                if (res) {
                    this.allFollowData = res;
                    this.followed = this.allFollowData.map(ele => ele.typeId).indexOf(this.followTypeId) > -1;
                    const currentFollowed = this.allFollowData.filter(ele => ele.typeId === this.followTypeId && ele.type === this.followType);
                    if (currentFollowed && currentFollowed.length > 0) {
                        this.currentId = currentFollowed[0].id;
                    }
                    if (this.followed) {
                        this.text = this.followedText;
                    }
                    this.emitFollowStatus();
                }
            });
        };
        this.openLogin = ($event) => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            const dialogRef = this.dialog.open(LoginModalComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(isSignedIn => {
                if (isSignedIn) {
                    this.loggedIn = true;
                    this.followedFn($event);
                }
            });
        };
        this.followedFn = ($event) => {
            $event.stopPropagation();
            $event.preventDefault();
            if (!this.loggedIn) {
                this.openLogin($event);
                return;
            }
            if (!this.followed) {
                this.followService.createFollowData(this.followType, this.followTypeId, this.user.userId).subscribe(res => {
                    this.followed = true;
                    this.text = this.followedText;
                    this.followService.getFollowData(this.user.userId);
                });
            }
            else {
                this.followService.unfollow(this.currentId).subscribe(res => {
                    this.followed = false;
                    this.text = this.textCopy;
                    this.followService.getFollowData(this.user.userId);
                });
            }
        };
    }
    ngOnInit() {
        this.textCopy = JSON.parse(JSON.stringify(this.text));
        this.userService.user.subscribe(data => {
            this.user = data;
            if (this.user && this.user.userId) {
                this.loggedIn = true;
                this.checkFollowStatus();
            }
            else {
                this.loggedIn = false;
            }
        });
    }
    ngOnChanges(changes) {
        if (changes['followTypeId'] || changes['followType']) {
            this.checkFollowStatus();
        }
    }
    ngOnDestroy() {
        if (this.subObject !== undefined) {
            this.subObject.unsubscribe();
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FollowComponent.prototype, "text", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FollowComponent.prototype, "followedText", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FollowComponent.prototype, "type", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FollowComponent.prototype, "color", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FollowComponent.prototype, "followTypeId", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FollowComponent.prototype, "followType", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], FollowComponent.prototype, "status", void 0);
FollowComponent = tslib_1.__decorate([
    Component({
        selector: 'app-follow',
        template: "<div appDataAnalytics [eventLabel]=\"followed ? 'unfollow':'follow'\" clickLocation=\"\" class=\"text-sm mr-1\" class=\"follow-container rounded-full cursor-pointer\" [class.flex]=\"type=='icon'\" (click)=\"followedFn($event)\"\n    (mouseover)=\"hovered=true\" (mouseleave)=\"hovered=false\" [class.followed]=\"followed\">\n    <div [style.background-color]=\"hovered && type=='button' ? color : 'transparent'\"\n        [style.border-color]=\"type=='button' ? color : 'transparent'\" [class.rounded-full]=\"type=='button'\"\n        class=\"text-sm flex items-center justify-around antialiased font-bold border-purple-800\"\n        [style.color]=\"hovered && type=='button'?'white':color\" [ngClass]=\"{'py-2 px-4 border-2':type=='button'}\">\n        <span  *ngIf=\"type=='button'\">{{text}}</span>\n        <i class=\"mdi mdi-heart-outline text-base antialiased\" [class.text-2xl]=\"type=='icon'\" *ngIf=\"!followed\"></i>\n        <i class=\"mdi mdi-heart text-base antialiased followed-heart\" [class.text-2xl]=\"type=='icon'\"\n            *ngIf=\"followed\"></i>\n    </div>\n</div>",
        styles: [".follow-container{max-width:12rem;text-align:center;-webkit-transition:.1s;transition:.1s}.follow-container div{-webkit-transition:.1s;transition:.1s}.follow-container div:active{-webkit-transform:scale(.9);transform:scale(.9)}.follow-container:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}@-webkit-keyframes dhadkan{0%{-webkit-transform:scale(.7);transform:scale(.7)}50%{-webkit-transform:scale(1.3);transform:scale(1.3)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes dhadkan{0%{-webkit-transform:scale(.7);transform:scale(.7)}50%{-webkit-transform:scale(1.3);transform:scale(1.3)}100%{-webkit-transform:scale(1);transform:scale(1)}}.follow-container.followed{-webkit-animation-name:dhadkan;animation-name:dhadkan;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:.2s;animation-duration:.2s}.follow-container .followed-heart{color:#eb4b4b}.follow-container div:hover{color:#c2b5b5}"]
    }),
    tslib_1.__metadata("design:paramtypes", [UserService, FollowService, MatDialog])
], FollowComponent);
export { FollowComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2ZvbGxvdy9mb2xsb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRMUQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQW9CeEIsWUFBb0IsV0FBd0IsRUFBVSxhQUE0QixFQUFVLE1BQWlCO1FBQXpGLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBbEJwRyxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzNCLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDaEIsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdqQixXQUFNLEdBQVEsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQU9oRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFtQmpCLHFCQUFnQixHQUFHLEdBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFBO1FBRUQsc0JBQWlCLEdBQUcs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QUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztDQUVKLENBQUE7QUF4R1k7SUFBUixLQUFLLEVBQUU7OzZDQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7cURBQTRCO0FBQzNCO0lBQVIsS0FBSyxFQUFFOzs2Q0FBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7OzhDQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs7cURBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTs7bURBQVk7QUFDVjtJQUFULE1BQU0sRUFBRTs7K0NBQXVDO0FBUnZDLGVBQWU7SUFMM0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsK2tDQUFzQzs7S0FFekMsQ0FBQzs2Q0FxQm1DLFdBQVcsRUFBeUIsYUFBYSxFQUFrQixTQUFTO0dBcEJwRyxlQUFlLENBMEczQjtTQTFHWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2xvZ2luU2lnbnVwL3RzLWxvZ2luLXNpZ251cC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnLCBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb2xsb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9sbG93LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWZvbGxvdycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZvbGxvdy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZm9sbG93LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9sbG93Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB0ZXh0ID0gJ0ZvbGxvdyc7XG4gICAgQElucHV0KCkgZm9sbG93ZWRUZXh0ID0gJ0ZvbGxvd2luZyc7XG4gICAgQElucHV0KCkgdHlwZSA9ICdidXR0b24nO1xuICAgIEBJbnB1dCgpIGNvbG9yID0gJyM2ODM1OTInO1xuICAgIEBJbnB1dCgpIGZvbGxvd1R5cGVJZDtcbiAgICBASW5wdXQoKSBmb2xsb3dUeXBlO1xuICAgIEBPdXRwdXQoKSBzdGF0dXM6IGFueSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgdGV4dENvcHk6IHN0cmluZztcbiAgICBob3ZlcmVkOiBib29sZWFuO1xuICAgIHVzZXI6IGFueTtcbiAgICBhbGxGb2xsb3dEYXRhOiBhbnk7XG4gICAgY3VycmVudElkOiBhbnk7XG4gICAgbG9nZ2VkSW4gPSBmYWxzZTtcbiAgICBmb2xsb3dlZCA9IGZhbHNlO1xuICAgIHN1Yk9iamVjdDogYW55O1xuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBmb2xsb3dTZXJ2aWNlOiBGb2xsb3dTZXJ2aWNlLCBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnRleHRDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnRleHQpKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRm9sbG93U3RhdHVzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VkSW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW1pdEZvbGxvd1N0YXR1cyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zdGF0dXMuZW1pdCh0aGlzLmZvbGxvd2VkKTtcbiAgICB9XG5cbiAgICBjaGVja0ZvbGxvd1N0YXR1cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmZvbGxvd1R5cGVJZCB8fCAhdGhpcy5mb2xsb3dUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJPYmplY3QgPSB0aGlzLmZvbGxvd1NlcnZpY2UuZm9sbG93RGF0YS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEZvbGxvd0RhdGEgPSByZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dlZCA9IHRoaXMuYWxsRm9sbG93RGF0YS5tYXAoZWxlID0+IGVsZS50eXBlSWQpLmluZGV4T2YodGhpcy5mb2xsb3dUeXBlSWQpID4gLTE7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEZvbGxvd2VkID0gdGhpcy5hbGxGb2xsb3dEYXRhLmZpbHRlcihlbGUgPT4gZWxlLnR5cGVJZCA9PT0gdGhpcy5mb2xsb3dUeXBlSWQgJiYgZWxlLnR5cGUgPT09IHRoaXMuZm9sbG93VHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRGb2xsb3dlZCAmJiBjdXJyZW50Rm9sbG93ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJZCA9IGN1cnJlbnRGb2xsb3dlZFswXS5pZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9sbG93ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5mb2xsb3dlZFRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdEZvbGxvd1N0YXR1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb3BlbkxvZ2luID0gKCRldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBkaWFsb2dDb25maWcgPSBuZXcgTWF0RGlhbG9nQ29uZmlnKCk7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmF1dG9Gb2N1cyA9IHRydWU7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzID0gJ21hdC1kaWFsb2ctYmtnLWNvbnRhaW5lcic7XG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oTG9naW5Nb2RhbENvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKGlzU2lnbmVkSW4gPT4ge1xuICAgICAgICAgICAgaWYgKGlzU2lnbmVkSW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkRm4oJGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZvbGxvd2VkRm4gPSAoJGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2dlZEluKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5Mb2dpbigkZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5mb2xsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmNyZWF0ZUZvbGxvd0RhdGEodGhpcy5mb2xsb3dUeXBlLCB0aGlzLmZvbGxvd1R5cGVJZCwgdGhpcy51c2VyLnVzZXJJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5mb2xsb3dlZFRleHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmdldEZvbGxvd0RhdGEodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9sbG93U2VydmljZS51bmZvbGxvdyh0aGlzLmN1cnJlbnRJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRoaXMudGV4dENvcHk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmdldEZvbGxvd0RhdGEodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgIGlmIChjaGFuZ2VzWydmb2xsb3dUeXBlSWQnXSB8fCBjaGFuZ2VzWydmb2xsb3dUeXBlJ10pIHtcbiAgICAgICAgdGhpcy5jaGVja0ZvbGxvd1N0YXR1cygpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1Yk9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1Yk9iamVjdC51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=