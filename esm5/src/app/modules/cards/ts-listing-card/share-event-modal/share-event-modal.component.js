import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { config } from '../../../../core/app-config';
import { UtilityService } from './../../../../shared/services/utilities.service';
var ShareEventModalComponent = /** @class */ (function () {
    function ShareEventModalComponent(dialogRef, data, utilityService) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.utilityService = utilityService;
        this.shareLink = {};
        this.baseUrl = config.baseUrl;
        this.copied = false;
        this.close = function () {
            _this.dialogRef.close();
        };
        this.copyLink = function () {
            var copyText = document.getElementById('event_link');
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand('copy');
            _this.copied = true;
            setTimeout(function () {
                _this.copied = false;
            }, 1000000);
        };
        this.shareOnFB = function () {
            setTimeout(function () {
                FB.ui({
                    method: 'share',
                    name: _this.event.name,
                    link: _this.baseUrl + "/e/" + _this.event.shortName,
                    picture: _this.imageLink
                });
            });
        };
        this.utilityService.addFBSDK();
    }
    ShareEventModalComponent.prototype.ngOnInit = function () {
        this.event = this.data.event;
        this.eventURL = 'https://www.townscript.com/e/' + this.event.shortName;
        this.eventName = this.event.name;
        this.shareLink.twitter = 'https://twitter.com/share' +
            '?url=' + config.baseUrl + 'e/' + this.event.shortName +
            '&text=' + this.eventName + ' is now live on Townscript!';
        this.shareLink.linkedin = 'https://www.linkedin.com/shareArticle?mini=true' +
            '&url=' + config.baseUrl + 'e/' + this.event.shortName +
            '&title=' + this.eventName;
        this.shareLink.whatsapp = 'https://web.whatsapp.com/send?' +
            'text=' + config.baseUrl + 'e/' + this.event.shortName;
        if (this.event.absoluteMobileImageUrl.indexOf('https:') > -1 ||
            this.event.absoluteMobileImageUrl.indexOf('http:') > -1) {
            this.imageLink = this.event.absoluteMobileImageUrl;
        }
        else {
            this.imageLink = 'https:' + this.event.absoluteMobileImageUrl;
        }
    };
    ShareEventModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-share-event-modal',
            template: "<div class=\"share-event-modal-container\">\n    <div class=\"flex items-center text-lg text-gray-800 justify-between\">\n        <h2 class=\"w-full text-center\">Share Event</h2>\n        <div class=\"rounded-full\" matRipple (click)=\"close()\">\n            <i class=\"mdi mdi-close text-2xl cursor-pointer rounded-full\"></i>\n        </div>\n    </div>\n    <div class=\"px-2 py-2\">\n        <div class=\"platforms flex flex-wrap items-center justify-center\">\n            <a>\n                <div (click)=\"copyLink()\" class=\"platform text-center cursor-pointer p-2 pr-4 flex-1\">\n                    <i class=\"mdi mdi-content-copy block text-4xl text-gray-700\" [class.text-purple-800]=\"copied\"></i>\n                    <span class=\"text-gray-900 text-sm block\" *ngIf=\"!copied\">Copy Link</span>\n                    <span class=\"text-purple-800 text-sm block\" *ngIf=\"copied\">Copied!</span>\n                    <input type=\"text\" class=\"copy_input\" id=\"event_link\" [value]=\"baseUrl+'e/' + event.shortName\" />\n                </div>\n            </a>\n            <a [href]=\"shareLink?.whatsapp\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-whatsapp block text-4xl whatsapp\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Whatsapp</span>\n                </div>\n            </a>\n            <div (click)=\"shareOnFB()\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-facebook block text-4xl facebook\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Facebook</span>\n                </div>\n            </div>\n            <a [href]=\"shareLink?.twitter\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-twitter block text-4xl twitter\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Twitter</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.linkedin\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-linkedin block text-4xl linkedin\"></i>\n                    <span class=\"text-gray-700 text-sm block\">LinkedIn</span>\n                </div>\n            </a>\n        </div>\n    </div>\n</div>\n",
            styles: [".share-event-modal-container .platform{-webkit-transition:.15s;transition:.15s}.share-event-modal-container .platform:hover{background:#fcfcfc;-webkit-transform:translateY(-5px);transform:translateY(-5px)}.share-event-modal-container .whatsapp{color:#64bf56}.share-event-modal-container .facebook{color:#4267b2}.share-event-modal-container .twitter{color:#3aa1f2}.share-event-modal-container .linkedin{color:#2977b5}.share-event-modal-container .copy_input{position:absolute;top:-9999999999px}"]
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, UtilityService])
    ], ShareEventModalComponent);
    return ShareEventModalComponent;
}());
export { ShareEventModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy90cy1saXN0aW5nLWNhcmQvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFTakY7SUFVSSxrQ0FBbUIsU0FBaUQsRUFDaEMsSUFBUyxFQUNqQyxjQUE4QjtRQUYxQyxpQkFJQztRQUprQixjQUFTLEdBQVQsU0FBUyxDQUF3QztRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVAxQyxjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFTZixVQUFLLEdBQUc7WUFDSixLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQTtRQUVELGFBQVEsR0FBRztZQUNQLElBQU0sUUFBUSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixVQUFVLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQTtRQUVELGNBQVMsR0FBRztZQUNSLFVBQVUsQ0FBQztnQkFDUCxFQUFFLENBQUMsRUFBRSxDQUNEO29CQUNJLE1BQU0sRUFBRSxPQUFPO29CQUNmLElBQUksRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7b0JBQ3JCLElBQUksRUFBSyxLQUFJLENBQUMsT0FBTyxXQUFNLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBVztvQkFDakQsT0FBTyxFQUFFLEtBQUksQ0FBQyxTQUFTO2lCQUMxQixDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQTVCSyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUE2QkQsMkNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRywrQkFBK0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN2RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRWpDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLDJCQUEyQjtZQUNoRCxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLDZCQUE2QixDQUFDO1FBRTlELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLGlEQUFpRDtZQUN2RSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RELFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRS9CLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLGdDQUFnQztZQUN0RCxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFFM0QsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7WUFDdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1NBQ3hEO2FBQU07WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQWpFUSx3QkFBd0I7UUFMcEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxnK0VBQWlEOztTQUVwRCxDQUFDO1FBWU8sbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2lEQURFLFlBQVksVUFFZCxjQUFjO09BWmpDLHdCQUF3QixDQW1FcEM7SUFBRCwrQkFBQztDQUFBLEFBbkVELElBbUVDO1NBbkVZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuXG5kZWNsYXJlIGNvbnN0IEZCOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXNoYXJlLWV2ZW50LW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGV2ZW50OiBhbnk7XG4gICAgZXZlbnRVUkw6IHN0cmluZztcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBzaGFyZUxpbms6IGFueSA9IHt9O1xuICAgIGJhc2VVcmw6IHN0cmluZyA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIGNvcGllZCA9IGZhbHNlO1xuICAgIGltYWdlTGluazogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudD4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgICAgICBwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSkge1xuICAgICAgICAgIHRoaXMudXRpbGl0eVNlcnZpY2UuYWRkRkJTREsoKTtcbiAgICB9XG5cbiAgICBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBjb3B5TGluayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29weVRleHQ6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldmVudF9saW5rJyk7XG4gICAgICAgIGNvcHlUZXh0LnNlbGVjdCgpO1xuICAgICAgICBjb3B5VGV4dC5zZXRTZWxlY3Rpb25SYW5nZSgwLCA5OTk5OSk7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgICAgIHRoaXMuY29waWVkID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvcGllZCA9IGZhbHNlO1xuICAgICAgICB9LCAxMDAwMDAwKTtcbiAgICB9XG5cbiAgICBzaGFyZU9uRkIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgRkIudWkoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdzaGFyZScsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZXZlbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogYCR7dGhpcy5iYXNlVXJsfS9lLyR7dGhpcy5ldmVudC5zaG9ydE5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZTogdGhpcy5pbWFnZUxpbmtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSB0aGlzLmRhdGEuZXZlbnQ7XG4gICAgICAgIHRoaXMuZXZlbnRVUkwgPSAnaHR0cHM6Ly93d3cudG93bnNjcmlwdC5jb20vZS8nICsgdGhpcy5ldmVudC5zaG9ydE5hbWU7XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gdGhpcy5ldmVudC5uYW1lO1xuXG4gICAgICAgIHRoaXMuc2hhcmVMaW5rLnR3aXR0ZXIgPSAnaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZScgK1xuICAgICAgICAgICAgJz91cmw9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lICtcbiAgICAgICAgICAgICcmdGV4dD0nICsgdGhpcy5ldmVudE5hbWUgKyAnIGlzIG5vdyBsaXZlIG9uIFRvd25zY3JpcHQhJztcblxuICAgICAgICB0aGlzLnNoYXJlTGluay5saW5rZWRpbiA9ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZScgK1xuICAgICAgICAgICAgJyZ1cmw9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lICtcbiAgICAgICAgICAgICcmdGl0bGU9JyArIHRoaXMuZXZlbnROYW1lO1xuXG4gICAgICAgIHRoaXMuc2hhcmVMaW5rLndoYXRzYXBwID0gJ2h0dHBzOi8vd2ViLndoYXRzYXBwLmNvbS9zZW5kPycgK1xuICAgICAgICAgICAgJ3RleHQ9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lO1xuXG4gICAgICAgIGlmKHRoaXMuZXZlbnQuYWJzb2x1dGVNb2JpbGVJbWFnZVVybC5pbmRleE9mKCdodHRwczonKSA+IC0xIHx8XG4gICAgICAgICAgICB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmwuaW5kZXhPZignaHR0cDonKSA+IC0xKXtcbiAgICAgICAgICAgICAgdGhpcy5pbWFnZUxpbmsgPSB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaW1hZ2VMaW5rID0gJ2h0dHBzOicgKyB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==