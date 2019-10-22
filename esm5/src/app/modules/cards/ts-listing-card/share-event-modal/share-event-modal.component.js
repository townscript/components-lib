import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { config } from '../../../../core/app-config';
var ShareEventModalComponent = /** @class */ (function () {
    function ShareEventModalComponent(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
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
    }
    ShareEventModalComponent.prototype.ngOnInit = function () {
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
    };
    ShareEventModalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-share-event-modal',
            template: "<div class=\"share-event-modal-container\">\n    <div class=\"flex items-center text-lg text-gray-800 justify-between\">\n        <h2 class=\"w-full text-center\">Share Event</h2>\n        <div class=\"rounded-full\" matRipple (click)=\"close()\">\n            <i class=\"mdi mdi-close text-2xl cursor-pointer rounded-full\"></i>\n        </div>\n    </div>\n    <div class=\"px-2 py-2\">\n        <div class=\"platforms flex flex-wrap items-center\">\n            <a>\n                <div (click)=\"copyLink()\" class=\"platform text-center cursor-pointer p-2 pr-4 flex-1\">\n                    <i class=\"mdi mdi-content-copy block text-4xl text-gray-700\" [class.text-purple-800]=\"copied\"></i>\n                    <span class=\"text-gray-900 text-sm block\" *ngIf=\"!copied\">Copy Link</span>\n                    <span class=\"text-purple-800 text-sm block\" *ngIf=\"copied\">Copied!</span>\n                    <input type=\"text\" class=\"hidden\" id=\"event_link\" [value]=\"baseUrl+'e/' + event.shortName\" />\n                </div>\n            </a>\n            <a [href]=\"shareLink?.whatsapp\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-whatsapp block text-4xl whatsapp\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Whatsapp</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.fb\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-facebook block text-4xl facebook\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Facebook</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.twitter\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-twitter block text-4xl twitter\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Twitter</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.linkedin\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-linkedin block text-4xl linkedin\"></i>\n                    <span class=\"text-gray-700 text-sm block\">LinkedIn</span>\n                </div>\n            </a>\n        </div>\n    </div>\n</div>",
            styles: [".share-event-modal-container .platform{-webkit-transition:.15s;transition:.15s}.share-event-modal-container .platform:hover{background:#fcfcfc;-webkit-transform:translateY(-5px);transform:translateY(-5px)}.share-event-modal-container .whatsapp{color:#64bf56}.share-event-modal-container .facebook{color:#4267b2}.share-event-modal-container .twitter{color:#3aa1f2}.share-event-modal-container .linkedin{color:#2977b5}"]
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], ShareEventModalComponent);
    return ShareEventModalComponent;
}());
export { ShareEventModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy90cy1saXN0aW5nLWNhcmQvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQU9yRDtJQVNJLGtDQUFtQixTQUFpRCxFQUNoQyxJQUFTO1FBRDdDLGlCQUdDO1FBSGtCLGNBQVMsR0FBVCxTQUFTLENBQXdDO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQUs7UUFMN0MsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBTWYsVUFBSyxHQUFHO1lBQ0osS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFFRCxhQUFRLEdBQUc7WUFDUCxJQUFNLFFBQVEsR0FBUSxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVELFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQixRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsVUFBVSxDQUFDO2dCQUNQLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUE7SUFkRCxDQUFDO0lBZ0JELDJDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsK0JBQStCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDdkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxrREFBa0Q7WUFDbEUsVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUN6RCxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLHNEQUFzRDtZQUMxRixZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDN0IsY0FBYyxHQUFHLG1CQUFtQixDQUFDO1FBRXpDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLDJCQUEyQjtZQUNoRCxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLDZCQUE2QixDQUFDO1FBRTlELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLGlEQUFpRDtZQUN2RSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RELFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRS9CLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLGdDQUFnQztZQUN0RCxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDL0QsQ0FBQztJQWhEUSx3QkFBd0I7UUFMcEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQywwOUVBQWlEOztTQUVwRCxDQUFDO1FBV08sbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2lEQURFLFlBQVk7T0FUakMsd0JBQXdCLENBa0RwQztJQUFELCtCQUFDO0NBQUEsQUFsREQsSUFrREM7U0FsRFksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1zaGFyZS1ldmVudC1tb2RhbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBldmVudDogYW55O1xuICAgIGV2ZW50VVJMOiBzdHJpbmc7XG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG4gICAgc2hhcmVMaW5rOiBhbnkgPSB7fTtcbiAgICBiYXNlVXJsOiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBjb3BpZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQ+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuXG4gICAgfVxuICAgIGNsb3NlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNvcHlMaW5rID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb3B5VGV4dDogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V2ZW50X2xpbmsnKTtcbiAgICAgICAgY29weVRleHQuc2VsZWN0KCk7XG4gICAgICAgIGNvcHlUZXh0LnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5KTtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgdGhpcy5jb3BpZWQgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29waWVkID0gZmFsc2U7XG4gICAgICAgIH0sIDEwMDAwMDApO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmV2ZW50ID0gdGhpcy5kYXRhLmV2ZW50O1xuICAgICAgICB0aGlzLmV2ZW50VVJMID0gJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2UvJyArIHRoaXMuZXZlbnQuc2hvcnROYW1lO1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IHRoaXMuZXZlbnQubmFtZTtcbiAgICAgICAgdGhpcy5zaGFyZUxpbmsuZmIgPSAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3M9MTAwJyArXG4gICAgICAgICAgICAnJnBbdXJsXT0nICsgY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudC5zaG9ydE5hbWUgK1xuICAgICAgICAgICAgJyZwW2ltYWdlc11bMF09JyArIGNvbmZpZy5iYXNlVXJsICsgJ2Rhc2hib2FyZC9pbWFnZXMvb3JnYW5pemVyX2xvZ2luX2ZpbGVzL2xvZ29mb3JmYi5wbmcnICtcbiAgICAgICAgICAgICcmcFt0aXRsZV09JyArIHRoaXMuZXZlbnROYW1lICtcbiAgICAgICAgICAgICcmcFtzdW1tYXJ5XT0nICsgJ2J5IHRvd25zY3JpcHQuY29tJztcblxuICAgICAgICB0aGlzLnNoYXJlTGluay50d2l0dGVyID0gJ2h0dHBzOi8vdHdpdHRlci5jb20vc2hhcmUnICtcbiAgICAgICAgICAgICc/dXJsPScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZSArXG4gICAgICAgICAgICAnJnRleHQ9JyArIHRoaXMuZXZlbnROYW1lICsgJyBpcyBub3cgbGl2ZSBvbiBUb3duc2NyaXB0ISc7XG5cbiAgICAgICAgdGhpcy5zaGFyZUxpbmsubGlua2VkaW4gPSAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJlQXJ0aWNsZT9taW5pPXRydWUnICtcbiAgICAgICAgICAgICcmdXJsPScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZSArXG4gICAgICAgICAgICAnJnRpdGxlPScgKyB0aGlzLmV2ZW50TmFtZTtcblxuICAgICAgICB0aGlzLnNoYXJlTGluay53aGF0c2FwcCA9ICdodHRwczovL3dlYi53aGF0c2FwcC5jb20vc2VuZD8nICtcbiAgICAgICAgICAgICd0ZXh0PScgKyBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50LnNob3J0TmFtZTtcbiAgICB9XG5cbn1cbiJdfQ==