import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { config } from '../../../core/app-config';
import { ShareEventModalComponent } from '../ts-listings-event-card/share-event-modal/share-event-modal.component';
// @Component({
//   selector: 'ts-listing-card',
//   templateUrl: './ts-listing-card.component.html',
//   styleUrls: ['./ts-listing-card.component.scss']
// })
var TsListingCardComponent = /** @class */ (function () {
    function TsListingCardComponent(utilityService, dialog, browser, placeService) {
        var _this = this;
        this.utilityService = utilityService;
        this.dialog = dialog;
        this.browser = browser;
        this.placeService = placeService;
        this.router = config.router;
        this.urgencyMessage = false;
        this.goingCounter = false;
        this.moreIcons = false;
        this.defaultCardImageUrl = config.s3BaseUrl + 'townscript-common-resources/ListingsStatic/default-card.jpg';
        this.buildUrlArray = function () {
            if (_this.router.url) {
                _this.urlArray = _this.router.url.split("?")[0].replace('/', '').split('/');
            }
            else {
                _this.urlArray = ['in'];
            }
        };
        this.shareEvent = function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (_this.browser.isMobile() && window.navigator && window.navigator['share']) {
                window.navigator['share']({
                    title: _this.eventData.name,
                    text: _this.eventData.name,
                    url: config.baseUrl + 'e/' + _this.eventData.shortName,
                });
            }
            else {
                _this.dialog.open(ShareEventModalComponent, {
                    // width: '500px',
                    data: { event: _this.eventData }
                });
            }
        };
        this.buildUrlArray();
    }
    TsListingCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.placeService.place.pipe(take(1)).subscribe(function (res) {
            if (_this.utilityService.IsJsonString(res)) {
                var data = JSON.parse(res);
                if (data && data['country'] && data['city']) {
                    _this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
                }
            }
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsListingCardComponent.prototype, "eventData", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsListingCardComponent.prototype, "type", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsListingCardComponent.prototype, "topicData", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsListingCardComponent.prototype, "gridType", void 0);
    return TsListingCardComponent;
}());
export { TsListingCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvY2FyZHMvdHMtbGlzdGluZy1jYXJkL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBcUIsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUVBQXlFLENBQUM7QUFFbkgsZUFBZTtBQUNmLGlDQUFpQztBQUNqQyxxREFBcUQ7QUFDckQsb0RBQW9EO0FBQ3BELEtBQUs7QUFDTDtJQWVFLGdDQUFtQixjQUE4QixFQUN4QyxNQUFpQixFQUNoQixPQUF1QixFQUN2QixZQUEwQjtRQUhwQyxpQkFLQztRQUxrQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVpwQyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUV2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHdCQUFtQixHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsNkRBQTZELENBQUM7UUFVdkcsa0JBQWEsR0FBRztZQUNkLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNFO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FBQTtRQUVELGVBQVUsR0FBRyxVQUFDLEtBQUs7WUFDakIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1RSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4QixLQUFLLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO29CQUMxQixJQUFJLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO29CQUN6QixHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTO2lCQUN0RCxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtvQkFDekMsa0JBQWtCO29CQUNsQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRTtpQkFDaEMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUE7UUExQkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUEyQkQseUNBQVEsR0FBUjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDakQsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBTSxHQUFHLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDM0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMzRTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFHTCxDQUFDO0lBeERRO1FBQVIsS0FBSyxFQUFFOzs2REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOzt3REFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzs2REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOzs0REFBVTtJQXVEcEIsNkJBQUM7Q0FBQSxBQTVERCxJQTREQztTQTVEWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYnJvd3Nlci5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi90cy1saXN0aW5ncy1ldmVudC1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5cbi8vIEBDb21wb25lbnQoe1xuLy8gICBzZWxlY3RvcjogJ3RzLWxpc3RpbmctY2FyZCcsXG4vLyAgIHRlbXBsYXRlVXJsOiAnLi90cy1saXN0aW5nLWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuLy8gICBzdHlsZVVybHM6IFsnLi90cy1saXN0aW5nLWNhcmQuY29tcG9uZW50LnNjc3MnXVxuLy8gfSlcbmV4cG9ydCBjbGFzcyBUc0xpc3RpbmdDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBldmVudERhdGE7XG4gIEBJbnB1dCgpIHR5cGU7XG4gIEBJbnB1dCgpIHRvcGljRGF0YTtcbiAgQElucHV0KCkgZ3JpZFR5cGU7XG4gIHJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG5cbiAgdXJnZW5jeU1lc3NhZ2UgPSBmYWxzZTtcbiAgaG9tZVVybDogc3RyaW5nO1xuICBnb2luZ0NvdW50ZXIgPSBmYWxzZTtcbiAgbW9yZUljb25zID0gZmFsc2U7XG4gIGRlZmF1bHRDYXJkSW1hZ2VVcmwgPSBjb25maWcuczNCYXNlVXJsICsgJ3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9MaXN0aW5nc1N0YXRpYy9kZWZhdWx0LWNhcmQuanBnJztcbiAgdXJsQXJyYXk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSBicm93c2VyOiBCcm93c2VyU2VydmljZSxcbiAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gIH1cblxuICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICB9XG4gIH1cblxuICBzaGFyZUV2ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5icm93c2VyLmlzTW9iaWxlKCkgJiYgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKSB7XG4gICAgICB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHRleHQ6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHVybDogY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudERhdGEuc2hvcnROYW1lLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nLm9wZW4oU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LCB7XG4gICAgICAgIC8vIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICBkYXRhOiB7IGV2ZW50OiB0aGlzLmV2ZW50RGF0YSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWydjb3VudHJ5J10gJiYgZGF0YVsnY2l0eSddKSB7XG4gICAgICAgICAgdGhpcy5ob21lVXJsID0gKCcvJyArIGRhdGFbJ2NvdW50cnknXSArICcvJyArIGRhdGFbJ2NpdHknXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgfVxuXG59XG4iXX0=