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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy90cy1saXN0aW5nLWNhcmQvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFTakYsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFVakMsWUFBbUIsU0FBaUQsRUFDaEMsSUFBUyxFQUNqQyxjQUE4QjtRQUZ2QixjQUFTLEdBQVQsU0FBUyxDQUF3QztRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQ2pDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVAxQyxjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQU8sR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFTZixVQUFLLEdBQUcsR0FBRyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFFRCxhQUFRLEdBQUcsR0FBRyxFQUFFO1lBQ1osTUFBTSxRQUFRLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1RCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FB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bnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5cbmRlY2xhcmUgY29uc3QgRkI6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtc2hhcmUtZXZlbnQtbW9kYWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgZXZlbnQ6IGFueTtcbiAgICBldmVudFVSTDogc3RyaW5nO1xuICAgIGV2ZW50TmFtZTogc3RyaW5nO1xuICAgIHNoYXJlTGluazogYW55ID0ge307XG4gICAgYmFzZVVybDogc3RyaW5nID0gY29uZmlnLmJhc2VVcmw7XG4gICAgY29waWVkID0gZmFsc2U7XG4gICAgaW1hZ2VMaW5rOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8U2hhcmVFdmVudE1vZGFsQ29tcG9uZW50PixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgICAgIHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlKSB7XG5cbiAgICB9XG5cbiAgICBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBjb3B5TGluayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29weVRleHQ6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldmVudF9saW5rJyk7XG4gICAgICAgIGNvcHlUZXh0LnNlbGVjdCgpO1xuICAgICAgICBjb3B5VGV4dC5zZXRTZWxlY3Rpb25SYW5nZSgwLCA5OTk5OSk7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgICAgIHRoaXMuY29waWVkID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvcGllZCA9IGZhbHNlO1xuICAgICAgICB9LCAxMDAwMDAwKTtcbiAgICB9XG5cbiAgICBzaGFyZU9uRkIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgRkIudWkoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdmZWVkJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5ldmVudC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBgJHt0aGlzLmJhc2VVcmx9L2UvJHt0aGlzLmV2ZW50LnNob3J0TmFtZX1gLFxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlOiB0aGlzLmltYWdlTGluayxcbiAgICAgICAgICAgICAgICAgICAgaGFzaHRhZzogJyNUb3duc2NyaXB0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnV0aWxpdHlTZXJ2aWNlLmFkZEZCU0RLKCksNTAwKTtcblxuICAgICAgICB0aGlzLmV2ZW50ID0gdGhpcy5kYXRhLmV2ZW50O1xuICAgICAgICB0aGlzLmV2ZW50VVJMID0gJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lO1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IHRoaXMuZXZlbnQubmFtZTtcblxuICAgICAgICB0aGlzLnNoYXJlTGluay50d2l0dGVyID0gJ2h0dHBzOi8vdHdpdHRlci5jb20vc2hhcmUnICtcbiAgICAgICAgICAgICc/dXJsPScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZSArXG4gICAgICAgICAgICAnJnRleHQ9JyArIHRoaXMuZXZlbnROYW1lICsgJyBpcyBub3cgbGl2ZSBvbiBUb3duc2NyaXB0ISc7XG5cbiAgICAgICAgdGhpcy5zaGFyZUxpbmsubGlua2VkaW4gPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUnICtcbiAgICAgICAgICAgICcmdXJsPScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZSArXG4gICAgICAgICAgICAnJnRpdGxlPScgKyB0aGlzLmV2ZW50TmFtZTtcblxuICAgICAgICB0aGlzLnNoYXJlTGluay53aGF0c2FwcCA9ICdodHRwczovL3dlYi53aGF0c2FwcC5jb20vc2VuZD8nICtcbiAgICAgICAgICAgICd0ZXh0PScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZTtcblxuICAgICAgICBpZih0aGlzLmV2ZW50LmFic29sdXRlTW9iaWxlSW1hZ2VVcmwuaW5kZXhPZignaHR0cHM6JykgPiAtMSB8fFxuICAgICAgICAgICAgdGhpcy5ldmVudC5hYnNvbHV0ZU1vYmlsZUltYWdlVXJsLmluZGV4T2YoJ2h0dHA6JykgPiAtMSl7XG4gICAgICAgICAgICAgIHRoaXMuaW1hZ2VMaW5rID0gdGhpcy5ldmVudC5hYnNvbHV0ZU1vYmlsZUltYWdlVXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmltYWdlTGluayA9ICdodHRwczonICsgdGhpcy5ldmVudC5hYnNvbHV0ZU1vYmlsZUltYWdlVXJsO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=