import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { config } from '../../../../core/app-config';
import { UtilityService } from './../../../../shared/services/utilities.service';
let ShareEventModalComponent = class ShareEventModalComponent {
    constructor(dialogRef, data, utilityService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.utilityService = utilityService;
        this.shareLink = {};
        this.baseUrl = config.baseUrl;
        this.copied = false;
        this.close = () => {
            this.dialogRef.close();
        };
        this.copyLink = () => {
            const copyText = document.getElementById('event_link');
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand('copy');
            this.copied = true;
            setTimeout(() => {
                this.copied = false;
            }, 1000000);
        };
        this.shareOnFB = () => {
            setTimeout(() => {
                window.scrollTo(0, 0);
                this.close();
                FB.ui({
                    method: 'feed',
                    name: this.event.name,
                    link: `${this.baseUrl}/e/${this.event.shortName}`,
                    picture: this.imageLink,
                    hashtag: '#Townscript'
                });
            });
        };
    }
    ngOnInit() {
        setTimeout(() => this.utilityService.addFBSDK(), 500);
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
    }
};
ShareEventModalComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: UtilityService }
];
ShareEventModalComponent = __decorate([
    Component({
        selector: 'app-share-event-modal',
        template: "<div class=\"share-event-modal-container\">\n    <div class=\"flex items-center text-lg text-gray-800 justify-between\">\n        <h2 class=\"w-full text-center\">Share Event</h2>\n        <div class=\"rounded-full\" matRipple (click)=\"close()\">\n            <i class=\"mdi mdi-close text-2xl cursor-pointer rounded-full\"></i>\n        </div>\n    </div>\n    <div class=\"px-2 py-2\">\n        <div class=\"platforms flex flex-wrap items-center justify-center\">\n            <a>\n                <div (click)=\"copyLink()\" class=\"platform text-center cursor-pointer p-2 pr-4 flex-1\">\n                    <i class=\"mdi mdi-content-copy block text-4xl text-gray-700\" [class.text-purple-800]=\"copied\"></i>\n                    <span class=\"text-gray-900 text-sm block\" *ngIf=\"!copied\">Copy Link</span>\n                    <span class=\"text-purple-800 text-sm block\" *ngIf=\"copied\">Copied!</span>\n                    <input type=\"text\" class=\"copy_input\" id=\"event_link\" [value]=\"baseUrl+'e/' + event.shortName\" />\n                </div>\n            </a>\n            <a [href]=\"shareLink?.whatsapp\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-whatsapp block text-4xl whatsapp\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Whatsapp</span>\n                </div>\n            </a>\n            <div (click)=\"shareOnFB()\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-facebook block text-4xl facebook\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Facebook</span>\n                </div>\n            </div>\n            <a [href]=\"shareLink?.twitter\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-twitter block text-4xl twitter\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Twitter</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.linkedin\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-linkedin block text-4xl linkedin\"></i>\n                    <span class=\"text-gray-700 text-sm block\">LinkedIn</span>\n                </div>\n            </a>\n        </div>\n    </div>\n</div>\n",
        styles: [".share-event-modal-container .platform{transition:.15s}.share-event-modal-container .platform:hover{background:#fcfcfc;transform:translateY(-5px)}.share-event-modal-container .whatsapp{color:#64bf56}.share-event-modal-container .facebook{color:#4267b2}.share-event-modal-container .twitter{color:#3aa1f2}.share-event-modal-container .linkedin{color:#2977b5}.share-event-modal-container .copy_input{position:absolute;top:-9999999999px}"]
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], ShareEventModalComponent);
export { ShareEventModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy90cy1saXN0aW5ncy1ldmVudC1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBU2pGLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBVWpDLFlBQW1CLFNBQWlELEVBQ2hDLElBQVMsRUFDakMsY0FBOEI7UUFGdkIsY0FBUyxHQUFULFNBQVMsQ0FBd0M7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBSztRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFQMUMsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBU2YsVUFBSyxHQUFHLEdBQUcsRUFBRTtZQUNULElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFBO1FBRUQsYUFBUSxHQUFHLEdBQUcsRUFBRTtZQUNaLE1BQU0sUUFBUSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxD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RXBDO1NBeEVZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcblxuZGVjbGFyZSBjb25zdCBGQjogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1zaGFyZS1ldmVudC1tb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBldmVudDogYW55O1xuICAgIGV2ZW50VVJMOiBzdHJpbmc7XG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG4gICAgc2hhcmVMaW5rOiBhbnkgPSB7fTtcbiAgICBiYXNlVXJsOiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBjb3BpZWQgPSBmYWxzZTtcbiAgICBpbWFnZUxpbms6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQ+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICAgICAgcHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIGNsb3NlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNvcHlMaW5rID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb3B5VGV4dDogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V2ZW50X2xpbmsnKTtcbiAgICAgICAgY29weVRleHQuc2VsZWN0KCk7XG4gICAgICAgIGNvcHlUZXh0LnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5KTtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgdGhpcy5jb3BpZWQgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29waWVkID0gZmFsc2U7XG4gICAgICAgIH0sIDEwMDAwMDApO1xuICAgIH1cblxuICAgIHNoYXJlT25GQiA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBGQi51aShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2ZlZWQnLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmV2ZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IGAke3RoaXMuYmFzZVVybH0vZS8ke3RoaXMuZXZlbnQuc2hvcnROYW1lfWAsXG4gICAgICAgICAgICAgICAgICAgIHBpY3R1cmU6IHRoaXMuaW1hZ2VMaW5rLFxuICAgICAgICAgICAgICAgICAgICBoYXNodGFnOiAnI1Rvd25zY3JpcHQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXRpbGl0eVNlcnZpY2UuYWRkRkJTREsoKSw1MDApO1xuXG4gICAgICAgIHRoaXMuZXZlbnQgPSB0aGlzLmRhdGEuZXZlbnQ7XG4gICAgICAgIHRoaXMuZXZlbnRVUkwgPSAnaHR0cHM6Ly93d3cudG93bnNjcmlwdC5jb20vZS8nICsgdGhpcy5ldmVudC5zaG9ydE5hbWU7XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gdGhpcy5ldmVudC5uYW1lO1xuXG4gICAgICAgIHRoaXMuc2hhcmVMaW5rLnR3aXR0ZXIgPSAnaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZScgK1xuICAgICAgICAgICAgJz91cmw9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lICtcbiAgICAgICAgICAgICcmdGV4dD0nICsgdGhpcy5ldmVudE5hbWUgKyAnIGlzIG5vdyBsaXZlIG9uIFRvd25zY3JpcHQhJztcblxuICAgICAgICB0aGlzLnNoYXJlTGluay5saW5rZWRpbiA9ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZScgK1xuICAgICAgICAgICAgJyZ1cmw9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lICtcbiAgICAgICAgICAgICcmdGl0bGU9JyArIHRoaXMuZXZlbnROYW1lO1xuXG4gICAgICAgIHRoaXMuc2hhcmVMaW5rLndoYXRzYXBwID0gJ2h0dHBzOi8vd2ViLndoYXRzYXBwLmNvbS9zZW5kPycgK1xuICAgICAgICAgICAgJ3RleHQ9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lO1xuXG4gICAgICAgIGlmKHRoaXMuZXZlbnQuYWJzb2x1dGVNb2JpbGVJbWFnZVVybC5pbmRleE9mKCdodHRwczonKSA+IC0xIHx8XG4gICAgICAgICAgICB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmwuaW5kZXhPZignaHR0cDonKSA+IC0xKXtcbiAgICAgICAgICAgICAgdGhpcy5pbWFnZUxpbmsgPSB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaW1hZ2VMaW5rID0gJ2h0dHBzOicgKyB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==