import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
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
        this.loggedIn = false;
        this.followed = false;
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
                }
            });
        };
        this.openLogin = () => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            this.dialog.open(LoginModalComponent, dialogConfig);
        };
        this.followedFn = ($event) => {
            $event.stopPropagation();
            if (!this.loggedIn) {
                this.openLogin();
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
FollowComponent = tslib_1.__decorate([
    Component({
        selector: 'app-follow',
        template: "<div class=\"follow-container rounded-full cursor-pointer\" [class.flex]=\"type=='icon'\" (click)=\"followedFn($event)\"\n    (mouseover)=\"hovered=true\" (mouseleave)=\"hovered=false\" [class.followed]=\"followed\">\n    <div [style.background-color]=\"hovered && type=='button' ? color : 'transparent'\"\n        [style.border-color]=\"type=='button' ? color : 'transparent'\" [class.rounded-full]=\"type=='button'\"\n        class=\"text-sm flex items-center justify-around antialiased font-bold border-purple-800\"\n        [style.color]=\"hovered && type=='button'?'white':color\" [ngClass]=\"{'py-2 px-4 border-2':type=='button'}\">\n        <span class=\"text-sm mr-1\" *ngIf=\"type=='button'\">{{text}}</span>\n        <i class=\"mdi mdi-heart-outline text-base antialiased\" [class.text-2xl]=\"type=='icon'\" *ngIf=\"!followed\"></i>\n        <i class=\"mdi mdi-heart text-base antialiased followed-heart\" [class.text-2xl]=\"type=='icon'\"\n            *ngIf=\"followed\"></i>\n    </div>\n</div>",
        styles: [".follow-container{max-width:12rem;text-align:center;-webkit-transition:.1s;transition:.1s}.follow-container div{-webkit-transition:.1s;transition:.1s}.follow-container div:active{-webkit-transform:scale(.9);transform:scale(.9)}.follow-container:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}@-webkit-keyframes dhadkan{0%{-webkit-transform:scale(.7);transform:scale(.7)}50%{-webkit-transform:scale(1.3);transform:scale(1.3)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes dhadkan{0%{-webkit-transform:scale(.7);transform:scale(.7)}50%{-webkit-transform:scale(1.3);transform:scale(1.3)}100%{-webkit-transform:scale(1);transform:scale(1)}}.follow-container.followed{-webkit-animation-name:dhadkan;animation-name:dhadkan;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:.2s;animation-duration:.2s}.follow-container .followed-heart{color:#eb4b4b}.follow-container div:hover{color:#c2b5b5}"]
    }),
    tslib_1.__metadata("design:paramtypes", [UserService, FollowService, MatDialog])
], FollowComponent);
export { FollowComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2ZvbGxvdy9mb2xsb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRMUQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQWtCeEIsWUFBb0IsV0FBd0IsRUFBVSxhQUE0QixFQUFVLE1BQWlCO1FBQXpGLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBaEJwRyxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsV0FBVyxDQUFDO1FBQzNCLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDaEIsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQVMzQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFpQmpCLHNCQUFpQixHQUFHLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hDLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUMsSUFBSSxH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LENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBK0NKLENBQUE7QUE1RVk7SUFBUixLQUFLLEVBQUU7OzZDQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7cURBQTRCO0FBQzNCO0lBQVIsS0FBSyxFQUFFOzs2Q0FBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7OzhDQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs7cURBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTs7bURBQVk7QUFQWCxlQUFlO0lBTDNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLDAvQkFBc0M7O0tBRXpDLENBQUM7NkNBbUJtQyxXQUFXLEVBQXlCLGFBQWEsRUFBa0IsU0FBUztHQWxCcEcsZUFBZSxDQThFM0I7U0E5RVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXREaWFsb2dDb25maWcsIE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEZvbGxvd1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb2xsb3cuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtZm9sbG93JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZm9sbG93LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9mb2xsb3cuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGb2xsb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgdGV4dCA9ICdGb2xsb3cnO1xuICAgIEBJbnB1dCgpIGZvbGxvd2VkVGV4dCA9ICdGb2xsb3dpbmcnO1xuICAgIEBJbnB1dCgpIHR5cGUgPSAnYnV0dG9uJztcbiAgICBASW5wdXQoKSBjb2xvciA9ICcjNjgzNTkyJztcbiAgICBASW5wdXQoKSBmb2xsb3dUeXBlSWQ7XG4gICAgQElucHV0KCkgZm9sbG93VHlwZTtcblxuICAgIHRleHRDb3B5OiBzdHJpbmc7XG4gICAgaG92ZXJlZDogYm9vbGVhbjtcbiAgICB1c2VyOiBhbnk7XG4gICAgYWxsRm9sbG93RGF0YTogYW55O1xuICAgIGN1cnJlbnRJZDogYW55O1xuICAgIGxvZ2dlZEluID0gZmFsc2U7XG4gICAgZm9sbG93ZWQgPSBmYWxzZTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgZm9sbG93U2VydmljZTogRm9sbG93U2VydmljZSwgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy50ZXh0KSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvbGxvd1N0YXR1cygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZEluID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGVja0ZvbGxvd1N0YXR1cyA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmZvbGxvd1R5cGVJZCB8fCAhdGhpcy5mb2xsb3dUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmZvbGxvd0RhdGEuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxGb2xsb3dEYXRhID0gcmVzO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ZWQgPSB0aGlzLmFsbEZvbGxvd0RhdGEubWFwKGVsZSA9PiBlbGUudHlwZUlkKS5pbmRleE9mKHRoaXMuZm9sbG93VHlwZUlkKSA+IC0xO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGb2xsb3dlZCA9IHRoaXMuYWxsRm9sbG93RGF0YS5maWx0ZXIoZWxlID0+IGVsZS50eXBlSWQgPT09IHRoaXMuZm9sbG93VHlwZUlkICYmIGVsZS50eXBlID09PSB0aGlzLmZvbGxvd1R5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Rm9sbG93ZWQgJiYgY3VycmVudEZvbGxvd2VkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SWQgPSBjdXJyZW50Rm9sbG93ZWRbMF0uaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvbGxvd2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRoaXMuZm9sbG93ZWRUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9wZW5Mb2dpbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgICAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5hdXRvRm9jdXMgPSB0cnVlO1xuICAgICAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgICAgICB0aGlzLmRpYWxvZy5vcGVuKExvZ2luTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgfVxuICAgIGZvbGxvd2VkRm4gPSAoJGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoIXRoaXMubG9nZ2VkSW4pIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkxvZ2luKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmZvbGxvd2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvbGxvd1NlcnZpY2UuY3JlYXRlRm9sbG93RGF0YSh0aGlzLmZvbGxvd1R5cGUsIHRoaXMuZm9sbG93VHlwZUlkLCB0aGlzLnVzZXIudXNlcklkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0aGlzLmZvbGxvd2VkVGV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd1NlcnZpY2UuZ2V0Rm9sbG93RGF0YSh0aGlzLnVzZXIudXNlcklkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLnVuZm9sbG93KHRoaXMuY3VycmVudElkKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy50ZXh0Q29weTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd1NlcnZpY2UuZ2V0Rm9sbG93RGF0YSh0aGlzLnVzZXIudXNlcklkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=