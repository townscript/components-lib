import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginModalComponent } from '../../../modules/loginSignup/ts-login-signup/login-modal/login-modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
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
        this.isSleak = false;
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
    FollowComponent.ctorParameters = function () { return [
        { type: UserService },
        { type: FollowService },
        { type: MatDialog }
    ]; };
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
    return FollowComponent;
}());
export { FollowComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2ZvbGxvdy9mb2xsb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUNwSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUNySCxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRMUQ7SUF3QkkseUJBQW9CLFdBQXdCLEVBQVUsYUFBNEIsRUFBVSxNQUFpQjtRQUE3RyxpQkFBa0g7UUFBOUYsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVc7UUF0QnBHLFNBQUksR0FBRyxRQUFRLENBQUM7UUFDaEIsaUJBQVksR0FBRyxXQUFXLENBQUM7UUFDM0IsU0FBSSxHQUFHLFFBQVEsQ0FBQztRQUNoQixVQUFLLEdBQUcsU0FBUyxDQUFDO1FBSWxCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDZixXQUFNLEdBQVEsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVoRCxjQUFTLEdBQVcseUNBQXlDLENBQUM7UUFPOUQsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBbUJqQixxQkFBZ0IsR0FBRztZQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUE7UUFFRCxzQkFBaUIsR0FBRztZQUNoQixJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hDLE9BQU87YUFDVjtZQUNELEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDeEQsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsS0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7b0JBQ3pCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsTUFBTSxFQUFWLENBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzFGLElBQU0sZUFBZSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFJLENBQUMsWUFBWSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssS0FBSSxDQUFDLFVBQVUsRUFBaEUsQ0FBZ0UsQ0FBQyxDQUFDO29CQUMzSCxJQUFJLGVBQWUsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDL0MsS0FBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3FCQUMxQztvQkFDRCxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2YsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO3FCQUNqQztvQkFDRCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDM0I7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUNELGNBQVMsR0FBRyxVQUFDLE1BQU07WUFDZixJQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1lBQzNDLFlBQVksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFlBQVksQ0FBQyxhQUFhLEdBQUcsMEJBQTBCLENBQUM7WUFDeEQsWUFBWSxDQUFDLElBQUksR0FBRyxFQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQztZQUN0RSxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN0RSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsVUFBVTtnQkFDeEMsSUFBSSxVQUFVLEVBQUU7b0JBQ1osS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFDRCxlQUFVLEdBQUcsVUFBQyxNQUFXO1lBQ3JCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZCLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixLQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLFlBQVksRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7b0JBQ25HLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7b0JBQ3JELEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN0QixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzFCLEtBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUE7SUF4RWdILENBQUM7SUFFbEgsa0NBQVEsR0FBUjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNoQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM1QjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUN6QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTZERCxxQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUdELHFDQUFXLEdBQVg7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDaEM7SUFDTCxDQUFDOztnQkFyRmdDLFdBQVc7Z0JBQXlCLGFBQWE7Z0JBQWtCLFNBQVM7O0lBdEJwRztRQUFSLEtBQUssRUFBRTtpREFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7eURBQTRCO0lBQzNCO1FBQVIsS0FBSyxFQUFFO2lEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTtrREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7eURBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTt1REFBWTtJQUNYO1FBQVIsS0FBSyxFQUFFO3FEQUFVO0lBQ1Q7UUFBUixLQUFLLEVBQUU7b0RBQWlCO0lBQ2Y7UUFBVCxNQUFNLEVBQUU7bURBQXVDO0lBVnZDLGVBQWU7UUFMM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsMnZDQUFzQzs7U0FFekMsQ0FBQztPQUNXLGVBQWUsQ0ErRzNCO0lBQUQsc0JBQUM7Q0FBQSxBQS9HRCxJQStHQztTQS9HWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9tb2R1bGVzL2xvZ2luU2lnbnVwL3RzLWxvZ2luLXNpZ251cC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0RGlhbG9nQ29uZmlnLCBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgRm9sbG93U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZvbGxvdy5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXNlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1mb2xsb3cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mb2xsb3cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2ZvbGxvdy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZvbGxvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdGV4dCA9ICdGb2xsb3cnO1xuICAgIEBJbnB1dCgpIGZvbGxvd2VkVGV4dCA9ICdGb2xsb3dpbmcnO1xuICAgIEBJbnB1dCgpIHR5cGUgPSAnYnV0dG9uJztcbiAgICBASW5wdXQoKSBjb2xvciA9ICcjNjgzNTkyJztcbiAgICBASW5wdXQoKSBmb2xsb3dUeXBlSWQ7XG4gICAgQElucHV0KCkgZm9sbG93VHlwZTtcbiAgICBASW5wdXQoKSB0eXBlTmFtZTtcbiAgICBASW5wdXQoKSBpc1NsZWFrID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIHN0YXR1czogYW55ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBzdWJIZWFkZXI6IHN0cmluZyA9IFwiWW91ciBvbmUgc3RvcCB0b29sIGZvciBleHBsb3JpbmcgZXZlbnRzXCI7XG5cbiAgICB0ZXh0Q29weTogc3RyaW5nO1xuICAgIGhvdmVyZWQ6IGJvb2xlYW47XG4gICAgdXNlcjogYW55O1xuICAgIGFsbEZvbGxvd0RhdGE6IGFueTtcbiAgICBjdXJyZW50SWQ6IGFueTtcbiAgICBsb2dnZWRJbiA9IGZhbHNlO1xuICAgIGZvbGxvd2VkID0gZmFsc2U7XG4gICAgc3ViT2JqZWN0OiBhbnk7XG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIGZvbGxvd1NlcnZpY2U6IEZvbGxvd1NlcnZpY2UsIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2cpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudGV4dENvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMudGV4dCkpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VkSW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tGb2xsb3dTdGF0dXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRJbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbWl0Rm9sbG93U3RhdHVzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnN0YXR1cy5lbWl0KHRoaXMuZm9sbG93ZWQpO1xuICAgIH1cblxuICAgIGNoZWNrRm9sbG93U3RhdHVzID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZm9sbG93VHlwZUlkIHx8ICF0aGlzLmZvbGxvd1R5cGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1Yk9iamVjdCA9IHRoaXMuZm9sbG93U2VydmljZS5mb2xsb3dEYXRhLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsRm9sbG93RGF0YSA9IHJlcztcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd2VkID0gdGhpcy5hbGxGb2xsb3dEYXRhLm1hcChlbGUgPT4gZWxlLnR5cGVJZCkuaW5kZXhPZih0aGlzLmZvbGxvd1R5cGVJZCkgPiAtMTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Rm9sbG93ZWQgPSB0aGlzLmFsbEZvbGxvd0RhdGEuZmlsdGVyKGVsZSA9PiBlbGUudHlwZUlkID09PSB0aGlzLmZvbGxvd1R5cGVJZCAmJiBlbGUudHlwZSA9PT0gdGhpcy5mb2xsb3dUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEZvbGxvd2VkICYmIGN1cnJlbnRGb2xsb3dlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudElkID0gY3VycmVudEZvbGxvd2VkWzBdLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2xsb3dlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0aGlzLmZvbGxvd2VkVGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0Rm9sbG93U3RhdHVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvcGVuTG9naW4gPSAoJGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgICAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICAgICAgZGlhbG9nQ29uZmlnLmRhdGEgPSB7J3N1YkhlYWRlcic6IHRoaXMuc3ViSGVhZGVyLCAnc291cmNlJzogJ2ZvbGxvdyd9O1xuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKExvZ2luTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gICAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShpc1NpZ25lZEluID0+IHtcbiAgICAgICAgICAgIGlmIChpc1NpZ25lZEluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZWRJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2xsb3dlZEZuKCRldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmb2xsb3dlZEZuID0gKCRldmVudDogYW55KSA9PiB7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdGhpcy5sb2dnZWRJbikge1xuICAgICAgICAgICAgdGhpcy5vcGVuTG9naW4oJGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZm9sbG93ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9sbG93U2VydmljZS5jcmVhdGVGb2xsb3dEYXRhKHRoaXMuZm9sbG93VHlwZSwgdGhpcy5mb2xsb3dUeXBlSWQsIHRoaXMudXNlci51c2VySWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCA9IHRoaXMuZm9sbG93ZWRUZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93U2VydmljZS5nZXRGb2xsb3dEYXRhKHRoaXMudXNlci51c2VySWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvbGxvd1NlcnZpY2UudW5mb2xsb3codGhpcy5jdXJyZW50SWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQgPSB0aGlzLnRleHRDb3B5O1xuICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93U2VydmljZS5nZXRGb2xsb3dEYXRhKHRoaXMudXNlci51c2VySWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydmb2xsb3dUeXBlSWQnXSB8fCBjaGFuZ2VzWydmb2xsb3dUeXBlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tGb2xsb3dTdGF0dXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1Yk9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1Yk9iamVjdC51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=