import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { config } from '../../../../core/app-config';
let ShareEventModalComponent = class ShareEventModalComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
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
    }
    ngAfterViewInit() {
    }
    ngOnInit() {
        this.event = this.data.event;
        this.eventURL = 'https://www.townscript.com/e/' + this.event.shortName;
        this.eventName = this.event.name;
        this.shareLink.fb = 'https://www.facebook.com/sharer/sharer.php?s=100' +
            '&p[url]=' + config.baseUrl + 'e/' + this.event.shortName +
            '&p[images][0]=' + config.baseUrl + 'dashboard/images/organizer_login_files/logoforfb.png' +
            '&p[title]=' + this.eventName +
            '&p[summary]=' + 'by townscript.com';
        this.shareLink.twitter = 'https://twitter.com/share' +
            '?url=' + config.baseUrl + 'e/' + this.event.shortName +
            '&text=' + this.eventName + ' is now live on Townscript!';
        this.shareLink.linkedin = 'https://www.linkedin.com/shareArticle?mini=true' +
            '&url=' + config.baseUrl + 'e/' + this.event.shortName +
            '&title=' + this.eventName;
        this.shareLink.whatsapp = 'https://web.whatsapp.com/send?' +
            'text=' + config.baseUrl + 'e/' + this.event.shortName;
    }
};
ShareEventModalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-share-event-modal',
        template: "<div class=\"share-event-modal-container\">\n    <div class=\"flex items-center text-lg text-gray-800 justify-between\">\n        <h2 class=\"w-full text-center\">Share Event</h2>\n        <div class=\"rounded-full\" matRipple (click)=\"close()\">\n            <i class=\"mdi mdi-close text-2xl cursor-pointer rounded-full\"></i>\n        </div>\n    </div>\n    <div class=\"px-2 py-2\">\n        <div class=\"platforms flex flex-wrap items-center\">\n            <a>\n                <div (click)=\"copyLink()\" class=\"platform text-center cursor-pointer p-2 pr-4 flex-1\">\n                    <i class=\"mdi mdi-content-copy block text-4xl text-gray-700\" [class.text-purple-800]=\"copied\"></i>\n                    <span class=\"text-gray-900 text-sm\" *ngIf=\"!copied\">Copy Link</span>\n                    <span class=\"text-purple-800 text-sm\" *ngIf=\"copied\">Copied!</span>\n                    <input type=\"text\" class=\"hidden\" id=\"event_link\" [value]=\"baseUrl+'e/' + event.shortName\" />\n                </div>\n            </a>\n            <a [href]=\"shareLink?.whatsapp\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-whatsapp block text-4xl whatsapp\"></i>\n                    <span class=\"text-gray-700 text-sm\">Whatsapp</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.fb\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-facebook block text-4xl facebook\"></i>\n                    <span class=\"text-gray-700 text-sm\">Facebook</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.twitter\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-twitter block text-4xl twitter\"></i>\n                    <span class=\"text-gray-700 text-sm\">Twitter</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.linkedin\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-linkedin block text-4xl linkedin\"></i>\n                    <span class=\"text-gray-700 text-sm\">LinkedIn</span>\n                </div>\n            </a>\n        </div>\n    </div>\n</div>",
        styles: [".share-event-modal-container .platform{-webkit-transition:.15s;transition:.15s}.share-event-modal-container .platform:hover{background:#fcfcfc;-webkit-transform:translateY(-5px);transform:translateY(-5px)}.share-event-modal-container .whatsapp{color:#64bf56}.share-event-modal-container .facebook{color:#4267b2}.share-event-modal-container .twitter{color:#3aa1f2}.share-event-modal-container .linkedin{color:#2977b5}"]
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], ShareEventModalComponent);
export { ShareEventModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy90cy1saXN0aW5nLWNhcmQvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU9yRCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQVFqQyxZQUFtQixTQUFpRCxFQUNoQyxJQUFTO1FBRDFCLGNBQVMsR0FBVCxTQUFTLENBQXdDO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQUs7UUFKN0MsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVEsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixXQUFNLEdBQVEsS0FBSyxDQUFDO1FBS3BCLFVBQUssR0FBRyxHQUFHLEVBQUU7WUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQTtRQUdELGFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDWixNQUFNLFFBQVEsR0FBUSxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFBO0lBZkQsQ0FBQztJQUlELGVBQWU7SUFDZixDQUFDO0lBV0QsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRywrQkFBK0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN2RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLGtEQUFrRDtZQUNsRSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3pELGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsc0RBQXNEO1lBQzFGLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUztZQUM3QixjQUFjLEdBQUcsbUJBQW1CLENBQUM7UUFFekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsMkJBQTJCO1lBQ2hELE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDdEQsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsNkJBQTZCLENBQUM7UUFFOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaURBQWlEO1lBQ3ZFLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDdEQsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsZ0NBQWdDO1lBQ3RELE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUMvRCxDQUFDO0NBRUosQ0FBQTtBQWpEWSx3QkFBd0I7SUFMcEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxzN0VBQWlEOztLQUVwRCxDQUFDO0lBVU8sbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBOzZDQURFLFlBQVk7R0FSakMsd0JBQXdCLENBaURwQztTQWpEWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXNoYXJlLWV2ZW50LW1vZGFsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGV2ZW50OiBhbnk7XG4gICAgZXZlbnRVUkw6IGFueTtcbiAgICBldmVudE5hbWU6IGFueTtcbiAgICBzaGFyZUxpbms6IGFueSA9IHt9O1xuICAgIGJhc2VVcmw6IGFueSA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIGNvcGllZDogYW55ID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudD4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55KSB7XG5cbiAgICB9XG4gICAgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB9XG4gICAgY29weUxpbmsgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvcHlUZXh0OiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlbnRfbGluaycpO1xuICAgICAgICBjb3B5VGV4dC5zZWxlY3QoKTtcbiAgICAgICAgY29weVRleHQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgOTk5OTkpO1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICB0aGlzLmNvcGllZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb3BpZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMDAwMCk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmV2ZW50ID0gdGhpcy5kYXRhLmV2ZW50O1xuICAgICAgICB0aGlzLmV2ZW50VVJMID0gJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lO1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IHRoaXMuZXZlbnQubmFtZTtcbiAgICAgICAgdGhpcy5zaGFyZUxpbmsuZmIgPSAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3M9MTAwJyArXG4gICAgICAgICAgICAnJnBbdXJsXT0nICsgY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudC5zaG9ydE5hbWUgK1xuICAgICAgICAgICAgJyZwW2ltYWdlc11bMF09JyArIGNvbmZpZy5iYXNlVXJsICsgJ2Rhc2hib2FyZC9pbWFnZXMvb3JnYW5pemVyX2xvZ2luX2ZpbGVzL2xvZ29mb3JmYi5wbmcnICtcbiAgICAgICAgICAgICcmcFt0aXRsZV09JyArIHRoaXMuZXZlbnROYW1lICtcbiAgICAgICAgICAgICcmcFtzdW1tYXJ5XT0nICsgJ2J5IHRvd25zY3JpcHQuY29tJztcblxuICAgICAgICB0aGlzLnNoYXJlTGluay50d2l0dGVyID0gJ2h0dHBzOi8vdHdpdHRlci5jb20vc2hhcmUnICtcbiAgICAgICAgICAgICc/dXJsPScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZSArXG4gICAgICAgICAgICAnJnRleHQ9JyArIHRoaXMuZXZlbnROYW1lICsgJyBpcyBub3cgbGl2ZSBvbiBUb3duc2NyaXB0ISc7XG5cbiAgICAgICAgdGhpcy5zaGFyZUxpbmsubGlua2VkaW4gPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUnICtcbiAgICAgICAgICAgICcmdXJsPScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZSArXG4gICAgICAgICAgICAnJnRpdGxlPScgKyB0aGlzLmV2ZW50TmFtZTtcblxuICAgICAgICB0aGlzLnNoYXJlTGluay53aGF0c2FwcCA9ICdodHRwczovL3dlYi53aGF0c2FwcC5jb20vc2VuZD8nICtcbiAgICAgICAgICAgICd0ZXh0PScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZTtcbiAgICB9XG5cbn1cbiJdfQ==