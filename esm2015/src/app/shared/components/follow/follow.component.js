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
            this.followService.followData.subscribe(res => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2ZvbGxvdy9mb2xsb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN6RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRMUQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQW1CeEIsWUFBb0IsV0FBd0IsRUFBVSxhQUE0QixFQUFVLE1BQWlCO1FBQXpGLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBakJwRyxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzNCLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDaEIsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdqQixXQUFNLEdBQVEsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQU9oRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFrQmpCLHFCQUFnQixHQUFHLEdBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFBO1FBRUQsc0JBQWlCLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDeEMsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLEdBQUcsRUFBRTtvQkFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMxRixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0gsSUFBSSxlQUFlLElBQUksZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztxQkFDMUM7b0JBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztxQkFDakM7b0JBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxjQUFTLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuQixNQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFlBQVksQ0FBQyxhQUFhLEdBQUcsMEJBQTBCLENBQUM7WUFDeEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdEUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxVQUFVLEVBQUU7b0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxlQUFVLEdBQUcsQ0FBQyxNQUFXLEVBQUUsRUFBRTtZQUN6QixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDekIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3RHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQTtJQXZFZ0gsQ0FBQztJQUVsSCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNERELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0NBRUosQ0FBQTtBQWhHWTtJQUFSLEtBQUssRUFBRTs7NkNBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOztxREFBNEI7QUFDM0I7SUFBUixLQUFLLEVBQUU7OzZDQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7OENBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOztxREFBYztBQUNiO0lBQVIsS0FBSyxFQUFFOzttREFBWTtBQUNWO0lBQVQsTUFBTSxFQUFFOzsrQ0FBdUM7QUFSdkMsZUFBZTtJQUwzQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0Qiwra0NBQXNDOztLQUV6QyxDQUFDOzZDQW9CbUMsV0FBVyxFQUF5QixhQUFhLEVBQWtCLFNBQVM7R0FuQnBHLGVBQWUsQ0FrRzNCO1NBbEdZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2xvZ2luU2lnbnVwL3RzLWxvZ2luLXNpZ251cC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnLCBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb2xsb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9sbG93LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWZvbGxvdycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZvbGxvdy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZm9sbG93LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9sbG93Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgdGV4dCA9ICdGb2xsb3cnO1xuICAgIEBJbnB1dCgpIGZvbGxvd2VkVGV4dCA9ICdGb2xsb3dpbmcnO1xuICAgIEBJbnB1dCgpIHR5cGUgPSAnYnV0dG9uJztcbiAgICBASW5wdXQoKSBjb2xvciA9ICcjNjgzNTkyJztcbiAgICBASW5wdXQoKSBmb2xsb3dUeXBlSWQ7XG4gICAgQElucHV0KCkgZm9sbG93VHlwZTtcbiAgICBAT3V0cHV0KCkgc3RhdHVzOiBhbnkgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHRleHRDb3B5OiBzdHJpbmc7XG4gICAgaG92ZXJlZDogYm9vbGVhbjtcbiAgICB1c2VyOiBhbnk7XG4gICAgYWxsRm9sbG93RGF0YTogYW55O1xuICAgIGN1cnJlbnRJZDogYW55O1xuICAgIGxvZ2dlZEluID0gZmFsc2U7XG4gICAgZm9sbG93ZWQgPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgZm9sbG93U2VydmljZTogRm9sbG93U2VydmljZSwgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy50ZXh0KSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvbGxvd1N0YXR1cygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZEluID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVtaXRGb2xsb3dTdGF0dXMgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzLmVtaXQodGhpcy5mb2xsb3dlZCk7XG4gICAgfVxuXG4gICAgY2hlY2tGb2xsb3dTdGF0dXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5mb2xsb3dUeXBlSWQgfHwgIXRoaXMuZm9sbG93VHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9sbG93U2VydmljZS5mb2xsb3dEYXRhLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsRm9sbG93RGF0YSA9IHJlcztcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkID0gdGhpcy5hbGxGb2xsb3dEYXRhLm1hcChlbGUgPT4gZWxlLnR5cGVJZCkuaW5kZXhPZih0aGlzLmZvbGxvd1R5cGVJZCkgPiAtMTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Rm9sbG93ZWQgPSB0aGlzLmFsbEZvbGxvd0RhdGEuZmlsdGVyKGVsZSA9PiBlbGUudHlwZUlkID09PSB0aGlzLmZvbGxvd1R5cGVJZCAmJiBlbGUudHlwZSA9PT0gdGhpcy5mb2xsb3dUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEZvbGxvd2VkICYmIGN1cnJlbnRGb2xsb3dlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudElkID0gY3VycmVudEZvbGxvd2VkWzBdLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2xsb3dlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0aGlzLmZvbGxvd2VkVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0Rm9sbG93U3RhdHVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvcGVuTG9naW4gPSAoJGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihMb2dpbk1vZGFsQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoaXNTaWduZWRJbiA9PiB7XG4gICAgICAgICAgICBpZiAoaXNTaWduZWRJbikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VkSW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ZWRGbigkZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZm9sbG93ZWRGbiA9ICgkZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoIXRoaXMubG9nZ2VkSW4pIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkxvZ2luKCRldmVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmZvbGxvd2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvbGxvd1NlcnZpY2UuY3JlYXRlRm9sbG93RGF0YSh0aGlzLmZvbGxvd1R5cGUsIHRoaXMuZm9sbG93VHlwZUlkLCB0aGlzLnVzZXIudXNlcklkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0aGlzLmZvbGxvd2VkVGV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd1NlcnZpY2UuZ2V0Rm9sbG93RGF0YSh0aGlzLnVzZXIudXNlcklkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLnVuZm9sbG93KHRoaXMuY3VycmVudElkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy50ZXh0Q29weTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd1NlcnZpY2UuZ2V0Rm9sbG93RGF0YSh0aGlzLnVzZXIudXNlcklkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgaWYgKGNoYW5nZXNbJ2ZvbGxvd1R5cGVJZCddIHx8IGNoYW5nZXNbJ2ZvbGxvd1R5cGUnXSkge1xuICAgICAgICB0aGlzLmNoZWNrRm9sbG93U3RhdHVzKCk7XG4gICAgICB9XG4gICAgfVxuXG59XG4iXX0=