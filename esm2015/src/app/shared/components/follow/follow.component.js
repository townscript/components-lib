import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginModalComponent } from '../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
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
        this.isSleak = false;
        this.status = new EventEmitter();
        this.subHeader = "Your one stop tool for exploring events";
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
            dialogConfig.data = { 'subHeader': this.subHeader, 'source': 'follow' };
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
FollowComponent.ctorParameters = () => [
    { type: UserService },
    { type: FollowService },
    { type: MatDialog }
];
__decorate([
    Input()
], FollowComponent.prototype, "text", void 0);
__decorate([
    Input()
], FollowComponent.prototype, "followedText", void 0);
__decorate([
    Input()
], FollowComponent.prototype, "type", void 0);
__decorate([
    Input()
], FollowComponent.prototype, "color", void 0);
__decorate([
    Input()
], FollowComponent.prototype, "followTypeId", void 0);
__decorate([
    Input()
], FollowComponent.prototype, "followType", void 0);
__decorate([
    Input()
], FollowComponent.prototype, "typeName", void 0);
__decorate([
    Input()
], FollowComponent.prototype, "isSleak", void 0);
__decorate([
    Output()
], FollowComponent.prototype, "status", void 0);
FollowComponent = __decorate([
    Component({
        selector: 'app-follow',
        template: "<div appDataAnalytics [eventLabel]=\"followed ? 'unfollow':'follow'\" clickLocation=\"\" class=\"text-sm mr-1\" class=\"follow-container rounded-full cursor-pointer\" [class.flex]=\"type=='icon'\" (click)=\"followedFn($event)\"\n    (mouseover)=\"hovered=true\" (mouseleave)=\"hovered=false\" [class.followed]=\"followed\">\n    <div [style.background-color]=\"(hovered && type=='button') || (isSleak && followed) ? color : 'transparent'\"\n        [style.border-color]=\"type=='button' ? color : 'transparent'\" [class.rounded-full]=\"type=='button'\"\n        class=\"text-sm flex items-center justify-around antialiased font-bold border-purple-800\"\n        [style.color]=\"(hovered && type=='button') || (isSleak && followed) ?'white':color\" [ngClass]=\"isSleak ? {'px-4 border-2':type=='button'}:{'py-2 px-4 border-2':type=='button'}\">\n        <span  *ngIf=\"type=='button'\" [ngClass]=\"isSleak ? 'uppercase': 'capitalize'\">{{text}}</span>\n        <i class=\"mdi mdi-heart-outline text-base antialiased\" [class.text-2xl]=\"type=='icon'\" *ngIf=\"!followed && !isSleak\"></i>\n        <i class=\"mdi mdi-heart text-base antialiased followed-heart\" [class.text-2xl]=\"type=='icon'\"\n            *ngIf=\"followed && !isSleak\"></i>\n    </div>\n</div>",
        styles: [".follow-container{max-width:12rem;text-align:center;transition:.1s}.follow-container div{transition:.1s}.follow-container div:active{transform:scale(.9)}.follow-container:hover{transform:scale(1.1)}@-webkit-keyframes dhadkan{0%{transform:scale(.7)}50%{transform:scale(1.3)}100%{transform:scale(1)}}@keyframes dhadkan{0%{transform:scale(.7)}50%{transform:scale(1.3)}100%{transform:scale(1)}}.follow-container.followed{-webkit-animation-name:dhadkan;animation-name:dhadkan;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:.2s;animation-duration:.2s}.follow-container .followed-heart{color:#eb4b4b}.follow-container div:hover{color:#c2b5b5}"]
    })
], FollowComponent);
export { FollowComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2ZvbGxvdy9mb2xsb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRMUQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQXdCeEIsWUFBb0IsV0FBd0IsRUFBVSxhQUE0QixFQUFVLE1BQWlCO1FBQXpGLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBdEJwRyxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzNCLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDaEIsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUlsQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2YsV0FBTSxHQUFRLElBQUksWUFBWSxFQUFPLENBQUM7UUFFaEQsY0FBUyxHQUFXLHlDQUF5QyxDQUFDO1FBTzlELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQW1CakIscUJBQWdCLEdBQUcsR0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUks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QyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBR0QsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7Q0FFSixDQUFBOztZQXZGb0MsV0FBVztZQUF5QixhQUFhO1lBQWtCLFNBQVM7O0FBdEJwRztJQUFSLEtBQUssRUFBRTs2Q0FBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7cURBQTRCO0FBQzNCO0lBQVIsS0FBSyxFQUFFOzZDQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs4Q0FBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7cURBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTttREFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFO2lEQUFVO0FBQ1Q7SUFBUixLQUFLLEVBQUU7Z0RBQWlCO0FBQ2Y7SUFBVCxNQUFNLEVBQUU7K0NBQXVDO0FBVnZDLGVBQWU7SUFMM0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsMnZDQUFzQzs7S0FFekMsQ0FBQztHQUNXLGVBQWUsQ0ErRzNCO1NBL0dZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXREaWFsb2dDb25maWcsIE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBGb2xsb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9sbG93LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWZvbGxvdycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZvbGxvdy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZm9sbG93LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9sbG93Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB0ZXh0ID0gJ0ZvbGxvdyc7XG4gICAgQElucHV0KCkgZm9sbG93ZWRUZXh0ID0gJ0ZvbGxvd2luZyc7XG4gICAgQElucHV0KCkgdHlwZSA9ICdidXR0b24nO1xuICAgIEBJbnB1dCgpIGNvbG9yID0gJyM2ODM1OTInO1xuICAgIEBJbnB1dCgpIGZvbGxvd1R5cGVJZDtcbiAgICBASW5wdXQoKSBmb2xsb3dUeXBlO1xuICAgIEBJbnB1dCgpIHR5cGVOYW1lO1xuICAgIEBJbnB1dCgpIGlzU2xlYWsgPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgc3RhdHVzOiBhbnkgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHN1YkhlYWRlcjogc3RyaW5nID0gXCJZb3VyIG9uZSBzdG9wIHRvb2wgZm9yIGV4cGxvcmluZyBldmVudHNcIjtcblxuICAgIHRleHRDb3B5OiBzdHJpbmc7XG4gICAgaG92ZXJlZDogYm9vbGVhbjtcbiAgICB1c2VyOiBhbnk7XG4gICAgYWxsRm9sbG93RGF0YTogYW55O1xuICAgIGN1cnJlbnRJZDogYW55O1xuICAgIGxvZ2dlZEluID0gZmFsc2U7XG4gICAgZm9sbG93ZWQgPSBmYWxzZTtcbiAgICBzdWJPYmplY3Q6IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgZm9sbG93U2VydmljZTogRm9sbG93U2VydmljZSwgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy50ZXh0KSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvbGxvd1N0YXR1cygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZEluID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVtaXRGb2xsb3dTdGF0dXMgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzLmVtaXQodGhpcy5mb2xsb3dlZCk7XG4gICAgfVxuXG4gICAgY2hlY2tGb2xsb3dTdGF0dXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5mb2xsb3dUeXBlSWQgfHwgIXRoaXMuZm9sbG93VHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ViT2JqZWN0ID0gdGhpcy5mb2xsb3dTZXJ2aWNlLmZvbGxvd0RhdGEuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxGb2xsb3dEYXRhID0gcmVzO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ZWQgPSB0aGlzLmFsbEZvbGxvd0RhdGEubWFwKGVsZSA9PiBlbGUudHlwZUlkKS5pbmRleE9mKHRoaXMuZm9sbG93VHlwZUlkKSA+IC0xO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGb2xsb3dlZCA9IHRoaXMuYWxsRm9sbG93RGF0YS5maWx0ZXIoZWxlID0+IGVsZS50eXBlSWQgPT09IHRoaXMuZm9sbG93VHlwZUlkICYmIGVsZS50eXBlID09PSB0aGlzLmZvbGxvd1R5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Rm9sbG93ZWQgJiYgY3VycmVudEZvbGxvd2VkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SWQgPSBjdXJyZW50Rm9sbG93ZWRbMF0uaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvbGxvd2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRoaXMuZm9sbG93ZWRUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRGb2xsb3dTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9wZW5Mb2dpbiA9ICgkZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgICAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5hdXRvRm9jdXMgPSB0cnVlO1xuICAgICAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgICAgICBkaWFsb2dDb25maWcuZGF0YSA9IHsnc3ViSGVhZGVyJzogdGhpcy5zdWJIZWFkZXIsICdzb3VyY2UnOiAnZm9sbG93J307XG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oTG9naW5Nb2RhbENvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKGlzU2lnbmVkSW4gPT4ge1xuICAgICAgICAgICAgaWYgKGlzU2lnbmVkSW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkRm4oJGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZvbGxvd2VkRm4gPSAoJGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2dlZEluKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5Mb2dpbigkZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5mb2xsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmNyZWF0ZUZvbGxvd0RhdGEodGhpcy5mb2xsb3dUeXBlLCB0aGlzLmZvbGxvd1R5cGVJZCwgdGhpcy51c2VyLnVzZXJJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5mb2xsb3dlZFRleHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmdldEZvbGxvd0RhdGEodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9sbG93U2VydmljZS51bmZvbGxvdyh0aGlzLmN1cnJlbnRJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRoaXMudGV4dENvcHk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmdldEZvbGxvd0RhdGEodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2ZvbGxvd1R5cGVJZCddIHx8IGNoYW5nZXNbJ2ZvbGxvd1R5cGUnXSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja0ZvbGxvd1N0YXR1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3ViT2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViT2JqZWN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==