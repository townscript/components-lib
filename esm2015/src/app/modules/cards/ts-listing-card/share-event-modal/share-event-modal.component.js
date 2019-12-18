import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
        this.utilityService.addFBSDK();
    }
    ngOnInit() {
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
ShareEventModalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-share-event-modal',
        template: "<div class=\"share-event-modal-container\">\n    <div class=\"flex items-center text-lg text-gray-800 justify-between\">\n        <h2 class=\"w-full text-center\">Share Event</h2>\n        <div class=\"rounded-full\" matRipple (click)=\"close()\">\n            <i class=\"mdi mdi-close text-2xl cursor-pointer rounded-full\"></i>\n        </div>\n    </div>\n    <div class=\"px-2 py-2\">\n        <div class=\"platforms flex flex-wrap items-center justify-center\">\n            <a>\n                <div (click)=\"copyLink()\" class=\"platform text-center cursor-pointer p-2 pr-4 flex-1\">\n                    <i class=\"mdi mdi-content-copy block text-4xl text-gray-700\" [class.text-purple-800]=\"copied\"></i>\n                    <span class=\"text-gray-900 text-sm block\" *ngIf=\"!copied\">Copy Link</span>\n                    <span class=\"text-purple-800 text-sm block\" *ngIf=\"copied\">Copied!</span>\n                    <input type=\"text\" class=\"copy_input\" id=\"event_link\" [value]=\"baseUrl+'e/' + event.shortName\" />\n                </div>\n            </a>\n            <a [href]=\"shareLink?.whatsapp\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-whatsapp block text-4xl whatsapp\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Whatsapp</span>\n                </div>\n            </a>\n            <div (click)=\"shareOnFB()\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-facebook block text-4xl facebook\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Facebook</span>\n                </div>\n            </div>\n            <a [href]=\"shareLink?.twitter\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-twitter block text-4xl twitter\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Twitter</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.linkedin\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-linkedin block text-4xl linkedin\"></i>\n                    <span class=\"text-gray-700 text-sm block\">LinkedIn</span>\n                </div>\n            </a>\n        </div>\n    </div>\n</div>\n",
        styles: [".share-event-modal-container .platform{-webkit-transition:.15s;transition:.15s}.share-event-modal-container .platform:hover{background:#fcfcfc;-webkit-transform:translateY(-5px);transform:translateY(-5px)}.share-event-modal-container .whatsapp{color:#64bf56}.share-event-modal-container .facebook{color:#4267b2}.share-event-modal-container .twitter{color:#3aa1f2}.share-event-modal-container .linkedin{color:#2977b5}.share-event-modal-container .copy_input{position:absolute;top:-9999999999px}"]
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, UtilityService])
], ShareEventModalComponent);
export { ShareEventModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy90cy1saXN0aW5nLWNhcmQvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFTakYsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFVakMsWUFBbUIsU0FBaUQsRUFDaEMsSUFBUyxFQUNqQyxjQUE4QjtRQUZ2QixjQUFTLEdBQVQsU0FBUyxDQUF3QztRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVAxQyxjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFTZixVQUFLLEdBQUcsR0FBRyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFFRCxhQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ1osTUFBTSxRQUFRLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1RCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FB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IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcblxuZGVjbGFyZSBjb25zdCBGQjogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1zaGFyZS1ldmVudC1tb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBldmVudDogYW55O1xuICAgIGV2ZW50VVJMOiBzdHJpbmc7XG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG4gICAgc2hhcmVMaW5rOiBhbnkgPSB7fTtcbiAgICBiYXNlVXJsOiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBjb3BpZWQgPSBmYWxzZTtcbiAgICBpbWFnZUxpbms6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQ+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICAgICAgcHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UpIHtcbiAgICAgICAgICB0aGlzLnV0aWxpdHlTZXJ2aWNlLmFkZEZCU0RLKCk7XG4gICAgfVxuXG4gICAgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgY29weUxpbmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvcHlUZXh0OiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlbnRfbGluaycpO1xuICAgICAgICBjb3B5VGV4dC5zZWxlY3QoKTtcbiAgICAgICAgY29weVRleHQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgOTk5OTkpO1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICB0aGlzLmNvcGllZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb3BpZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMDAwMCk7XG4gICAgfVxuXG4gICAgc2hhcmVPbkZCID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIEZCLnVpKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZmVlZCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZXZlbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogYCR7dGhpcy5iYXNlVXJsfS9lLyR7dGhpcy5ldmVudC5zaG9ydE5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZTogdGhpcy5pbWFnZUxpbmssXG4gICAgICAgICAgICAgICAgICAgIGhhc2h0YWc6ICcjVG93bnNjcmlwdCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSB0aGlzLmRhdGEuZXZlbnQ7XG4gICAgICAgIHRoaXMuZXZlbnRVUkwgPSAnaHR0cHM6Ly93d3cudG93bnNjcmlwdC5jb20vZS8nICsgdGhpcy5ldmVudC5zaG9ydE5hbWU7XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gdGhpcy5ldmVudC5uYW1lO1xuXG4gICAgICAgIHRoaXMuc2hhcmVMaW5rLnR3aXR0ZXIgPSAnaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZScgK1xuICAgICAgICAgICAgJz91cmw9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lICtcbiAgICAgICAgICAgICcmdGV4dD0nICsgdGhpcy5ldmVudE5hbWUgKyAnIGlzIG5vdyBsaXZlIG9uIFRvd25zY3JpcHQhJztcblxuICAgICAgICB0aGlzLnNoYXJlTGluay5saW5rZWRpbiA9ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZScgK1xuICAgICAgICAgICAgJyZ1cmw9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lICtcbiAgICAgICAgICAgICcmdGl0bGU9JyArIHRoaXMuZXZlbnROYW1lO1xuXG4gICAgICAgIHRoaXMuc2hhcmVMaW5rLndoYXRzYXBwID0gJ2h0dHBzOi8vd2ViLndoYXRzYXBwLmNvbS9zZW5kPycgK1xuICAgICAgICAgICAgJ3RleHQ9JyArIGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lO1xuXG4gICAgICAgIGlmKHRoaXMuZXZlbnQuYWJzb2x1dGVNb2JpbGVJbWFnZVVybC5pbmRleE9mKCdodHRwczonKSA+IC0xIHx8XG4gICAgICAgICAgICB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmwuaW5kZXhPZignaHR0cDonKSA+IC0xKXtcbiAgICAgICAgICAgICAgdGhpcy5pbWFnZUxpbmsgPSB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaW1hZ2VMaW5rID0gJ2h0dHBzOicgKyB0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==