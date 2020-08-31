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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy90cy1saXN0aW5ncy1ldmVudC1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBU2pGLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBVWpDLFlBQW1CLFNBQWlELEVBQ2hDLElBQVMsRUFDakMsY0FBOEI7UUFGdkIsY0FBUyxHQUFULFNBQVMsQ0FBd0M7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBSztRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFQMUMsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBU2YsVUFBSyxHQUFHLEdBQUcsRUFBRTtZQUNULElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFBO1FBRUQsYUFBUSxHQUFHLEdBQUcsRUFBRTtZQUNaLE1BQU0sUUFBUSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxD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ZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuXG5kZWNsYXJlIGNvbnN0IEZCOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXNoYXJlLWV2ZW50LW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGV2ZW50OiBhbnk7XG4gICAgZXZlbnRVUkw6IHN0cmluZztcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBzaGFyZUxpbms6IGFueSA9IHt9O1xuICAgIGJhc2VVcmw6IHN0cmluZyA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIGNvcGllZCA9IGZhbHNlO1xuICAgIGltYWdlTGluazogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudD4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55LFxuICAgICAgICBwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgY29weUxpbmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvcHlUZXh0OiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlbnRfbGluaycpO1xuICAgICAgICBjb3B5VGV4dC5zZWxlY3QoKTtcbiAgICAgICAgY29weVRleHQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgOTk5OTkpO1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICB0aGlzLmNvcGllZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb3BpZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMDAwMCk7XG4gICAgfVxuXG4gICAgc2hhcmVPbkZCID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIEZCLnVpKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnZmVlZCcsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuZXZlbnQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGluazogYCR7dGhpcy5iYXNlVXJsfS9lLyR7dGhpcy5ldmVudC5zaG9ydE5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZTogdGhpcy5pbWFnZUxpbmssXG4gICAgICAgICAgICAgICAgICAgIGhhc2h0YWc6ICcjVG93bnNjcmlwdCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51dGlsaXR5U2VydmljZS5hZGRGQlNESygpLDUwMCk7XG5cbiAgICAgICAgdGhpcy5ldmVudCA9IHRoaXMuZGF0YS5ldmVudDtcbiAgICAgICAgdGhpcy5ldmVudFVSTCA9ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9lLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZTtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSB0aGlzLmV2ZW50Lm5hbWU7XG5cbiAgICAgICAgdGhpcy5zaGFyZUxpbmsudHdpdHRlciA9ICdodHRwczovL3R3aXR0ZXIuY29tL3NoYXJlJyArXG4gICAgICAgICAgICAnP3VybD0nICsgY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudC5zaG9ydE5hbWUgK1xuICAgICAgICAgICAgJyZ0ZXh0PScgKyB0aGlzLmV2ZW50TmFtZSArICcgaXMgbm93IGxpdmUgb24gVG93bnNjcmlwdCEnO1xuXG4gICAgICAgIHRoaXMuc2hhcmVMaW5rLmxpbmtlZGluID0gJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9zaGFyZUFydGljbGU/bWluaT10cnVlJyArXG4gICAgICAgICAgICAnJnVybD0nICsgY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudC5zaG9ydE5hbWUgK1xuICAgICAgICAgICAgJyZ0aXRsZT0nICsgdGhpcy5ldmVudE5hbWU7XG5cbiAgICAgICAgdGhpcy5zaGFyZUxpbmsud2hhdHNhcHAgPSAnaHR0cHM6Ly93ZWIud2hhdHNhcHAuY29tL3NlbmQ/JyArXG4gICAgICAgICAgICAndGV4dD0nICsgY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudC5zaG9ydE5hbWU7XG5cbiAgICAgICAgaWYodGhpcy5ldmVudC5hYnNvbHV0ZU1vYmlsZUltYWdlVXJsLmluZGV4T2YoJ2h0dHBzOicpID4gLTEgfHxcbiAgICAgICAgICAgIHRoaXMuZXZlbnQuYWJzb2x1dGVNb2JpbGVJbWFnZVVybC5pbmRleE9mKCdodHRwOicpID4gLTEpe1xuICAgICAgICAgICAgICB0aGlzLmltYWdlTGluayA9IHRoaXMuZXZlbnQuYWJzb2x1dGVNb2JpbGVJbWFnZVVybDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pbWFnZUxpbmsgPSAnaHR0cHM6JyArIHRoaXMuZXZlbnQuYWJzb2x1dGVNb2JpbGVJbWFnZVVybDtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19