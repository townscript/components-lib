import { __decorate } from "tslib";
import { Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { config } from '../../../core/app-config';
import { ShareEventModalComponent } from '../ts-listings-event-card/share-event-modal/share-event-modal.component';
// @Component({
//   selector: 'ts-listing-card',
//   templateUrl: './ts-listing-card.component.html',
//   styleUrls: ['./ts-listing-card.component.scss']
// })
export class TsListingCardComponent {
    constructor(utilityService, dialog, browser, placeService) {
        this.utilityService = utilityService;
        this.dialog = dialog;
        this.browser = browser;
        this.placeService = placeService;
        this.router = config.router;
        this.urgencyMessage = false;
        this.goingCounter = false;
        this.moreIcons = false;
        this.defaultCardImageUrl = config.s3BaseUrl + 'townscript-common-resources/ListingsStatic/default-card.jpg';
        this.buildUrlArray = () => {
            if (this.router.url) {
                this.urlArray = this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                this.urlArray = ['in'];
            }
        };
        this.shareEvent = (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (this.browser.isMobile() && window.navigator && window.navigator['share']) {
                window.navigator['share']({
                    title: this.eventData.name,
                    text: this.eventData.name,
                    url: config.baseUrl + 'e/' + this.eventData.shortName,
                });
            }
            else {
                this.dialog.open(ShareEventModalComponent, {
                    // width: '500px',
                    data: { event: this.eventData }
                });
            }
        };
        this.buildUrlArray();
    }
    ngOnInit() {
        this.placeService.place.pipe(take(1)).subscribe(res => {
            if (this.utilityService.IsJsonString(res)) {
                const data = JSON.parse(res);
                if (data && data['country'] && data['city']) {
                    this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
                }
            }
        });
    }
}
__decorate([
    Input()
], TsListingCardComponent.prototype, "eventData", void 0);
__decorate([
    Input()
], TsListingCardComponent.prototype, "type", void 0);
__decorate([
    Input()
], TsListingCardComponent.prototype, "topicData", void 0);
__decorate([
    Input()
], TsListingCardComponent.prototype, "gridType", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvY2FyZHMvdHMtbGlzdGluZy1jYXJkL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBcUIsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFFbkgsZUFBZTtBQUNmLGlDQUFpQztBQUNqQyxxREFBcUQ7QUFDckQsb0RBQW9EO0FBQ3BELEtBQUs7QUFDTCxNQUFNLE9BQU8sc0JBQXNCO0lBZWpDLFlBQW1CLGNBQThCLEVBQ3hDLE1BQWlCLEVBQ2hCLE9BQXVCLEVBQ3ZCLFlBQTBCO1FBSGpCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBWnBDLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRXZCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsd0JBQW1CLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyw2REFBNkQsQ0FBQztRQVV2RyxrQkFBYSxHQUFHLEdBQVMsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzRTtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUE7UUFFRCxlQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzVFLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7b0JBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7b0JBQ3pCLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7aUJBQ3RELENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO29CQUN6QyxrQkFBa0I7b0JBQ2xCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFO2lCQUNoQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQTtRQTFCQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQTJCRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQzNFO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUdMLENBQUM7Q0FFRjtBQTFEVTtJQUFSLEtBQUssRUFBRTt5REFBVztBQUNWO0lBQVIsS0FBSyxFQUFFO29EQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7eURBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTt3REFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYnJvd3Nlci5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi90cy1saXN0aW5ncy1ldmVudC1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5cbi8vIEBDb21wb25lbnQoe1xuLy8gICBzZWxlY3RvcjogJ3RzLWxpc3RpbmctY2FyZCcsXG4vLyAgIHRlbXBsYXRlVXJsOiAnLi90cy1saXN0aW5nLWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuLy8gICBzdHlsZVVybHM6IFsnLi90cy1saXN0aW5nLWNhcmQuY29tcG9uZW50LnNjc3MnXVxuLy8gfSlcbmV4cG9ydCBjbGFzcyBUc0xpc3RpbmdDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBldmVudERhdGE7XG4gIEBJbnB1dCgpIHR5cGU7XG4gIEBJbnB1dCgpIHRvcGljRGF0YTtcbiAgQElucHV0KCkgZ3JpZFR5cGU7XG4gIHJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG5cbiAgdXJnZW5jeU1lc3NhZ2UgPSBmYWxzZTtcbiAgaG9tZVVybDogc3RyaW5nO1xuICBnb2luZ0NvdW50ZXIgPSBmYWxzZTtcbiAgbW9yZUljb25zID0gZmFsc2U7XG4gIGRlZmF1bHRDYXJkSW1hZ2VVcmwgPSBjb25maWcuczNCYXNlVXJsICsgJ3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9MaXN0aW5nc1N0YXRpYy9kZWZhdWx0LWNhcmQuanBnJztcbiAgdXJsQXJyYXk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSBicm93c2VyOiBCcm93c2VyU2VydmljZSxcbiAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gIH1cblxuICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICB9XG4gIH1cblxuICBzaGFyZUV2ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5icm93c2VyLmlzTW9iaWxlKCkgJiYgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKSB7XG4gICAgICB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHRleHQ6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHVybDogY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudERhdGEuc2hvcnROYW1lLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nLm9wZW4oU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LCB7XG4gICAgICAgIC8vIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICBkYXRhOiB7IGV2ZW50OiB0aGlzLmV2ZW50RGF0YSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWydjb3VudHJ5J10gJiYgZGF0YVsnY2l0eSddKSB7XG4gICAgICAgICAgdGhpcy5ob21lVXJsID0gKCcvJyArIGRhdGFbJ2NvdW50cnknXSArICcvJyArIGRhdGFbJ2NpdHknXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgfVxuXG59XG4iXX0=