import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginModalComponent } from '../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { FollowService } from '../../services/follow.service';
import { UserService } from '../../services/user-service';
var FollowComponent = /** @class */ (function () {
    function FollowComponent(userService, followService, dialog) {
        var _this = this;
        this.userService = userService;
        this.followService = followService;
        this.dialog = dialog;
        this.text = 'Follow';
        this.followedText = 'Following';
        this.type = 'button';
        this.color = '#683592';
        this.status = new EventEmitter();
        this.subHeader = "Your one stop tool for exploring events";
        this.loggedIn = false;
        this.followed = false;
        this.emitFollowStatus = function () {
            _this.status.emit(_this.followed);
        };
        this.checkFollowStatus = function () {
            if (!_this.followTypeId || !_this.followType) {
                return;
            }
            _this.subObject = _this.followService.followData.subscribe(function (res) {
                if (res) {
                    _this.allFollowData = res;
                    _this.followed = _this.allFollowData.map(function (ele) { return ele.typeId; }).indexOf(_this.followTypeId) > -1;
                    var currentFollowed = _this.allFollowData.filter(function (ele) { return ele.typeId === _this.followTypeId && ele.type === _this.followType; });
                    if (currentFollowed && currentFollowed.length > 0) {
                        _this.currentId = currentFollowed[0].id;
                    }
                    if (_this.followed) {
                        _this.text = _this.followedText;
                    }
                    _this.emitFollowStatus();
                }
            });
        };
        this.openLogin = function ($event) {
            var dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            dialogConfig.data = { 'subHeader': _this.subHeader, 'source': 'follow' };
            var dialogRef = _this.dialog.open(LoginModalComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(function (isSignedIn) {
                if (isSignedIn) {
                    _this.loggedIn = true;
                    _this.followedFn($event);
                }
            });
        };
        this.followedFn = function ($event) {
            $event.stopPropagation();
            $event.preventDefault();
            if (!_this.loggedIn) {
                _this.openLogin($event);
                return;
            }
            if (!_this.followed) {
                _this.followService.createFollowData(_this.followType, _this.followTypeId, _this.user.userId).subscribe(function (res) {
                    _this.followed = true;
                    _this.text = _this.followedText;
                    _this.followService.getFollowData(_this.user.userId);
                });
            }
            else {
                _this.followService.unfollow(_this.currentId).subscribe(function (res) {
                    _this.followed = false;
                    _this.text = _this.textCopy;
                    _this.followService.getFollowData(_this.user.userId);
                });
            }
        };
    }
    FollowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.textCopy = JSON.parse(JSON.stringify(this.text));
        this.userService.user.subscribe(function (data) {
            _this.user = data;
            if (_this.user && _this.user.userId) {
                _this.loggedIn = true;
                _this.checkFollowStatus();
            }
            else {
                _this.loggedIn = false;
            }
        });
    };
    FollowComponent.prototype.ngOnChanges = function (changes) {
        if (changes['followTypeId'] || changes['followType']) {
            this.checkFollowStatus();
        }
    };
    FollowComponent.prototype.ngOnDestroy = function () {
        if (this.subObject !== undefined) {
            this.subObject.unsubscribe();
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
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], FollowComponent.prototype, "typeName", void 0);
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
    return FollowComponent;
}());
export { FollowComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2ZvbGxvdy9mb2xsb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRMUQ7SUF1QkkseUJBQW9CLFdBQXdCLEVBQVUsYUFBNEIsRUFBVSxNQUFpQjtRQUE3RyxpQkFBa0g7UUFBOUYsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVc7UUFyQnBHLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDaEIsaUJBQVksR0FBRyxXQUFXLENBQUM7UUFDM0IsU0FBSSxHQUFHLFFBQVEsQ0FBQztRQUNoQixVQUFLLEdBQUcsU0FBUyxDQUFDO1FBSWpCLFdBQU0sR0FBUSxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRWhELGNBQVMsR0FBVyx5Q0FBeUMsQ0FBQztRQU85RCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFtQmpCLHFCQUFnQixHQUFHO1lBQ2YsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQTtRQUVELHNCQUFpQixHQUFHO1lBQ2hCLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRTtnQkFDeEMsT0FBTzthQUNWO1lBQ0QsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO2dCQUN4RCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxLQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztvQkFDekIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLEVBQVYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDMUYsSUFBTSxlQUFlLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUksQ0FBQyxZQUFZLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxLQUFJLENBQUMsVUFBVSxFQUFoRSxDQUFnRSxDQUFDLENBQUM7b0JBQzNILElBQUksZUFBZSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUMvQyxLQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQzFDO29CQUNELElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRTt3QkFDZixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUM7cUJBQ2pDO29CQUNELEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUMzQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBQ0QsY0FBUyxHQUFHLFVBQUMsTUFBTTtZQUNmLElBQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDM0MsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDbEMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDOUIsWUFBWSxDQUFDLGFBQWEsR0FBRywwQkFBMEIsQ0FBQztZQUN4RCxZQUFZLENBQUMsSUFBSSxHQUFHLEVBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDO1lBQ3RFLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3RFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxVQUFVO2dCQUN4QyxJQUFJLFVBQVUsRUFBRTtvQkFDWixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDckIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDM0I7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUNELGVBQVUsR0FBRyxVQUFDLE1BQVc7WUFDckIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLEtBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsWUFBWSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztvQkFDbkcsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQztvQkFDOUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztvQkFDckQsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDMUIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQTtJQXhFZ0gsQ0FBQztJQUVsSCxrQ0FBUSxHQUFSO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ2hDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBNkRELHFDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBR0QscUNBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7SUExR1E7UUFBUixLQUFLLEVBQUU7O2lEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7eURBQTRCO0lBQzNCO1FBQVIsS0FBSyxFQUFFOztpREFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7O2tEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7eURBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTs7dURBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTs7cURBQVU7SUFDUjtRQUFULE1BQU0sRUFBRTs7bURBQXVDO0lBVHZDLGVBQWU7UUFMM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsK2tDQUFzQzs7U0FFekMsQ0FBQztpREF3Qm1DLFdBQVcsRUFBeUIsYUFBYSxFQUFrQixTQUFTO09BdkJwRyxlQUFlLENBOEczQjtJQUFELHNCQUFDO0NBQUEsQUE5R0QsSUE4R0M7U0E5R1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbW9kdWxlcy9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdERpYWxvZ0NvbmZpZywgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRm9sbG93U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZvbGxvdy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXNlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1mb2xsb3cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mb2xsb3cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ZvbGxvdy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZvbGxvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdGV4dCA9ICdGb2xsb3cnO1xuICAgIEBJbnB1dCgpIGZvbGxvd2VkVGV4dCA9ICdGb2xsb3dpbmcnO1xuICAgIEBJbnB1dCgpIHR5cGUgPSAnYnV0dG9uJztcbiAgICBASW5wdXQoKSBjb2xvciA9ICcjNjgzNTkyJztcbiAgICBASW5wdXQoKSBmb2xsb3dUeXBlSWQ7XG4gICAgQElucHV0KCkgZm9sbG93VHlwZTtcbiAgICBASW5wdXQoKSB0eXBlTmFtZTtcbiAgICBAT3V0cHV0KCkgc3RhdHVzOiBhbnkgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHN1YkhlYWRlcjogc3RyaW5nID0gXCJZb3VyIG9uZSBzdG9wIHRvb2wgZm9yIGV4cGxvcmluZyBldmVudHNcIjtcblxuICAgIHRleHRDb3B5OiBzdHJpbmc7XG4gICAgaG92ZXJlZDogYm9vbGVhbjtcbiAgICB1c2VyOiBhbnk7XG4gICAgYWxsRm9sbG93RGF0YTogYW55O1xuICAgIGN1cnJlbnRJZDogYW55O1xuICAgIGxvZ2dlZEluID0gZmFsc2U7XG4gICAgZm9sbG93ZWQgPSBmYWxzZTtcbiAgICBzdWJPYmplY3Q6IGFueTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgZm9sbG93U2VydmljZTogRm9sbG93U2VydmljZSwgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy50ZXh0KSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0ZvbGxvd1N0YXR1cygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZEluID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVtaXRGb2xsb3dTdGF0dXMgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzLmVtaXQodGhpcy5mb2xsb3dlZCk7XG4gICAgfVxuXG4gICAgY2hlY2tGb2xsb3dTdGF0dXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5mb2xsb3dUeXBlSWQgfHwgIXRoaXMuZm9sbG93VHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3ViT2JqZWN0ID0gdGhpcy5mb2xsb3dTZXJ2aWNlLmZvbGxvd0RhdGEuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxGb2xsb3dEYXRhID0gcmVzO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ZWQgPSB0aGlzLmFsbEZvbGxvd0RhdGEubWFwKGVsZSA9PiBlbGUudHlwZUlkKS5pbmRleE9mKHRoaXMuZm9sbG93VHlwZUlkKSA+IC0xO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGb2xsb3dlZCA9IHRoaXMuYWxsRm9sbG93RGF0YS5maWx0ZXIoZWxlID0+IGVsZS50eXBlSWQgPT09IHRoaXMuZm9sbG93VHlwZUlkICYmIGVsZS50eXBlID09PSB0aGlzLmZvbGxvd1R5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Rm9sbG93ZWQgJiYgY3VycmVudEZvbGxvd2VkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SWQgPSBjdXJyZW50Rm9sbG93ZWRbMF0uaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvbGxvd2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRoaXMuZm9sbG93ZWRUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRGb2xsb3dTdGF0dXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9wZW5Mb2dpbiA9ICgkZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgICAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgICAgIGRpYWxvZ0NvbmZpZy5hdXRvRm9jdXMgPSB0cnVlO1xuICAgICAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgICAgICBkaWFsb2dDb25maWcuZGF0YSA9IHsnc3ViSGVhZGVyJzogdGhpcy5zdWJIZWFkZXIsICdzb3VyY2UnOiAnZm9sbG93J307XG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oTG9naW5Nb2RhbENvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKGlzU2lnbmVkSW4gPT4ge1xuICAgICAgICAgICAgaWYgKGlzU2lnbmVkSW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlZEluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkRm4oJGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZvbGxvd2VkRm4gPSAoJGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2dlZEluKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5Mb2dpbigkZXZlbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5mb2xsb3dlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmNyZWF0ZUZvbGxvd0RhdGEodGhpcy5mb2xsb3dUeXBlLCB0aGlzLmZvbGxvd1R5cGVJZCwgdGhpcy51c2VyLnVzZXJJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5mb2xsb3dlZFRleHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmdldEZvbGxvd0RhdGEodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9sbG93U2VydmljZS51bmZvbGxvdyh0aGlzLmN1cnJlbnRJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRoaXMudGV4dENvcHk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dTZXJ2aWNlLmdldEZvbGxvd0RhdGEodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2ZvbGxvd1R5cGVJZCddIHx8IGNoYW5nZXNbJ2ZvbGxvd1R5cGUnXSkge1xuICAgICAgICAgICAgdGhpcy5jaGVja0ZvbGxvd1N0YXR1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3ViT2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViT2JqZWN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==