import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BrowserService } from '../../../core/browser.service';
import { PlaceService } from '../../layout/components/ts-header/place.service';
import { UtilityService } from '../../../shared/services/utilities.service';
import { config } from '../../../core/app-config';
import { ShareEventModalComponent } from '../ts-listing-card/share-event-modal/share-event-modal.component';
let TsListingEventCardComponent = class TsListingEventCardComponent {
    constructor(utilityService, dialog, browser, placeService) {
        this.utilityService = utilityService;
        this.dialog = dialog;
        this.browser = browser;
        this.placeService = placeService;
        this.gridType = 'grid';
        this.router = config.router;
        this.hideTime = true;
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
    }
    ngOnInit() {
        this.buildUrlArray();
        this.subObject = this.placeService.place.subscribe(res => {
            if (this.utilityService.IsJsonString(res)) {
                const data = JSON.parse(res);
                if (data && data['country'] && data['city']) {
                    this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
                }
            }
        });
    }
    ngOnDestroy() {
        if (this.subObject)
            this.subObject.unsubscribe();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TsListingEventCardComponent.prototype, "eventData", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TsListingEventCardComponent.prototype, "type", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TsListingEventCardComponent.prototype, "gridType", void 0);
TsListingEventCardComponent = tslib_1.__decorate([
    Component({
        selector: 'ts-listings-event-card',
        template: "\n<div class=\"card-container rounded overflow-hidden relative bg-white\" [ngClass]=\"gridType == 'list' ? 'flex' : ''\">\n\n  <div class=\"card-header absolute top-0 w-full flex items-center justify-between black-gradient py-1 px-3 z-50\" *ngIf=\"gridType == 'grid'\">\n    <div class=\"topic-bubble opacity-0\" *ngIf=\"eventData?.keywords\">\n      <a *ngFor=\"let key of eventData?.keywords| slice:0:1\"\n          [href]=\"urlArray && urlArray.length > 1 ? urlArray[0] + '/' + urlArray[1]  + '/' + key.topicKeywordCode : homeUrl + '/' + key.topicKeywordCode\">\n          <span class=\"bubble background-blue px-2 p-1 text-xs rounded-lg text-white uppercase\" appDataAnalytics eventLabel=\"keyword\" clickLocation=\"\">\n              {{key.topicKeywordName}}\n          </span>\n      </a>\n    </div>\n    <div class=\"actions flex\">\n      <div class=\"follow self-end px-3\">\n        <app-follow type=\"icon\" [followTypeId]=\"eventData.eventId\" [followType]=\"'EVENT'\" color=\"#fff\"\n        (click)=\"$event.stopPropagation()\"></app-follow>\n      </div>\n      <div class=\"share px-2 rounded-full self-end cursor-pointer\" matRipple (click)=\"$event.stopPropagation()\">\n        <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\" class=\"text-white mdi mdi-share-variant text-2xl share\"\n        (click)=\"shareEvent($event)\"></i>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"image-container relative\" [ngClass]=\"gridType == 'list' ? 'flex-2' : ''\">\n    <img\n      [defaultImage]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ListingsStatic/image-loader.gif'\"\n      [errorImage]=\"defaultCardImageUrl\"\n      [lazyLoad]=\"eventData.cardImageUrl ? eventData.cardImageUrl : defaultCardImageUrl\"\n      [ngClass]=\"gridType == 'list' ? 'absolute w-full h-full' : 'h-48 w-full'\"\n      [src]=\"eventData.cardImageUrl ? eventData.cardImageUrl : defaultCardImageUrl\"/>\n  </div>\n\n  <div class=\"card-body overflow-hidden w-full flex flex-wrap flex-col\"\n    [ngClass]=\"gridType == 'list' ? 'flex-3  pl-3 pt-3 md:pl-5' : 'px-3 py-2 md:px-4'\"\n    *ngIf=\"eventData\">\n\n    <div class=\"content w-full fadeIn\"\n      [ngClass]=\"gridType == 'list' ? 'pr-3 md:pr-5' : ''\">\n      <div class=\"event-name-box text-gray-900 text-base items-baseline flex\"\n        [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-xl ' : 'lg:text-lg'\">\n\n        <div class=\"font-semibold event-name w-11/12 fadeIn\" [clamp]=\"2\" *ngIf=\"gridType != 'list'\">\n          {{eventData.name}}\n        </div>\n        <div class=\"font-semibold event-name w-11/12 fadeIn\" [clamp]=\"2\" *ngIf=\"gridType == 'list'\">\n          {{eventData.name}}\n        </div>\n\n        <i class=\"mdi mdi-check-decagram text-primary px-1 md:text-lg\"\n        *ngIf=\"eventData?.organizerIsTrusted\" matTooltip=\"VERIFIED\" matTooltipPosition=\"above\"\n        matTooltipClass=\"ts-card-tooltip\"></i>\n      </div>\n      <div class=\"secondary-details fadeIn animation-delay flex items-center justify-start text-xs md:text-sm text-gray-800 pb-2 md:pt-1\">\n        <div class=\"date \">\n          <span class=\"whitespace-no-wrap\">{{[eventData.startTime, eventData.endTime] | dateRange: eventData.eventTimeZone : eventData.recurrent: {'startTime': eventData.recurrenceStartTime,'endTime': eventData.recurrenceEndTime,'recurrenceRule': eventData.recurrenceRule} : hideTime }}\n          </span>\n        </div>\n        <div class=\"px-2\"> | </div>\n        <div class=\"location overflow-hidden whitespace-no-wrap\">\n          <span class=\"whitespace-no-wrap\">{{eventData.city}}</span>\n        </div>\n      </div>\n\n    </div>\n\n    <div class=\"hidden md:flex overflow-hidden py-2 w-full keywords-box\" *ngIf=\"gridType=='list'\">\n      <a *ngFor=\"let key of eventData?.keywords| slice:0:3\"\n        [href]=\"urlArray && urlArray.length > 1 ? urlArray[0] + '/' + urlArray[1]  + '/' + key.topicKeywordCode : homeUrl + '/' + key.topicKeywordCode\">\n        <span appDataAnalytics eventLabel=\"keyword\" clickLocation=\"\"\n          class=\"pr-2 text-gray-600 font-normal text-xs md:text-sm hover:text-gray-900 hover:underline\">\n          #{{key.topicKeywordName}}\n        </span>\n      </a>\n    </div>\n\n    <div class=\"gradient-separator w-full\" *ngIf=\"gridType=='list'\"></div>\n\n    <div class=\"footer\"\n      [ngClass]=\"gridType == 'list' ? 'flex-1 flex items-center justify-between pr-3 md:pr-5 py-1' : ''\">\n      <div class=\"price\">\n        <div class=\"paid flex items-baseline\" *ngIf=\"eventData.minimumTicketPrice\">\n          <div class=\"min-price\">\n            <span class=\"text-primary md:text-lg font-semibold\"\n              [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-lg' : ''\">\n              {{eventData.minimumTicketPrice | currency:eventData.minimumTicketPriceCurrency : 'symbol':'1.0-0'}}\n            </span>\n          </div>\n          <span class=\"text-xs md:text-sm px-1 opacity-75\">onwards</span>\n        </div>\n        <div class=\"free\" *ngIf=\"!eventData.minimumTicketPrice\">\n          <span class=\"text-primary md:text-lg font-semibold\"\n            [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-lg' : ''\">Free</span>\n        </div>\n      </div>\n\n      <div class=\"actions flex list-actions\" *ngIf=\"gridType=='list'\">\n        <div class=\"follow self-end px-2 md:px-3 lg:px-5\">\n          <app-follow type=\"icon\" [followTypeId]=\"eventData.eventId\" [followType]=\"'EVENT'\" color=\"#683592\"\n          (click)=\"$event.stopPropagation()\"></app-follow>\n        </div>\n        <div class=\"share rounded-full self-end cursor-pointer\" matRipple (click)=\"$event.stopPropagation()\">\n          <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\" class=\"text-primary mdi mdi-share-variant text-lg md:text-2xl share\"\n          (click)=\"shareEvent($event)\"></i>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}::ng-deep .event-name span{width:auto!important;padding-right:2px}@media (min-width:992px){::ng-deep .list-actions i{font-size:1.4rem!important}}::ng-deep .list-actions i{font-size:1.25rem}.card-container{z-index:0;-webkit-transition:.2s ease-in;transition:.2s ease-in;box-shadow:0 1px 10px rgba(0,0,0,.1)}.card-container:hover{-webkit-transform:translateY(-2%);transform:translateY(-2%);box-shadow:0 2px 15px rgba(0,0,0,.2)}.card-container .black-gradient{background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.7)),color-stop(95%,transparent));background:linear-gradient(180deg,rgba(0,0,0,.7) 0,transparent 95%)}.card-container .flex-2{-webkit-box-flex:2;flex:2}.card-container .flex-3{-webkit-box-flex:3;flex:3}.card-container .share{-webkit-transition:.15s;transition:.15s}.card-container .share:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.card-container .card-body .content{min-height:5em}.card-container .card-body .content .event-name,.card-container .card-body .content .secondary-details{color:#301c3f}@media (min-width:991px){.card-container .card-body .content .event-name{display:-webkit-box;display:flex;flex-wrap:wrap;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}}.card-container .card-body .content .location{text-overflow:ellipsis}@media (min-width:480px) and (max-width:991px){.card-container .card-body .content{min-height:5.5em}}@media (min-width:992px){.card-container .card-body .content{min-height:5.8em}}.card-container .card-body .gradient-separator{height:1px;background:-webkit-gradient(linear,left top,right top,from(rgba(151,151,151,.01)),to(#c8c8c8));background:linear-gradient(90deg,rgba(151,151,151,.01) 0,#c8c8c8 100%);opacity:.6}"]
    }),
    tslib_1.__metadata("design:paramtypes", [UtilityService,
        MatDialog,
        BrowserService,
        PlaceService])
], TsListingEventCardComponent);
export { TsListingEventCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NhcmRzL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQvdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFPNUcsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFjdEMsWUFDUyxjQUE4QixFQUM5QixNQUFpQixFQUNoQixPQUF1QixFQUN2QixZQUEwQjtRQUgzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWIzQixhQUFRLEdBQVEsTUFBTSxDQUFDO1FBQ2hDLFdBQU0sR0FBVyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBSy9CLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsd0JBQW1CLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyw2REFBNkQsQ0FBQztRQXNCdkcsa0JBQWEsR0FBRyxHQUFTLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0U7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFBO1FBR0QsZUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1RSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4QixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO29CQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO29CQUN6QixHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTO2lCQUN0RCxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtvQkFDekMsa0JBQWtCO29CQUNsQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtpQkFDaEMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUE7SUF2Q0QsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBTSxHQUFHLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMzRTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBNkJELFdBQVc7UUFDVCxJQUFHLElBQUksQ0FBQyxTQUFTO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBRUYsQ0FBQTtBQTlEVTtJQUFSLEtBQUssRUFBRTs7OERBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7O3lEQUFXO0FBQ1Y7SUFBUixLQUFLLEVBQUU7OzZEQUF3QjtBQUxyQiwyQkFBMkI7SUFMdkMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyxzNUxBQXNEOztLQUV2RCxDQUFDOzZDQWdCeUIsY0FBYztRQUN0QixTQUFTO1FBQ1AsY0FBYztRQUNULFlBQVk7R0FsQnpCLDJCQUEyQixDQWlFdkM7U0FqRVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9icm93c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi90cy1saXN0aW5nLWNhcmQvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHMtbGlzdGluZ3MtZXZlbnQtY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1saXN0aW5ncy1ldmVudC1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRzTGlzdGluZ0V2ZW50Q2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuXG4gIEBJbnB1dCgpIGV2ZW50RGF0YTogYW55O1xuICBASW5wdXQoKSB0eXBlOiBhbnk7XG4gIEBJbnB1dCgpIGdyaWRUeXBlOiBhbnkgPSAnZ3JpZCc7XG4gIHJvdXRlcjogUm91dGVyID0gY29uZmlnLnJvdXRlcjtcblxuICBob21lVXJsOiBhbnk7XG4gIHN1Yk9iamVjdDogYW55O1xuICB1cmxBcnJheTogc3RyaW5nW107XG4gIGhpZGVUaW1lOiBib29sZWFuID0gdHJ1ZTtcbiAgZGVmYXVsdENhcmRJbWFnZVVybCA9IGNvbmZpZy5zM0Jhc2VVcmwgKyAndG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL0xpc3RpbmdzU3RhdGljL2RlZmF1bHQtY2FyZC5qcGcnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgYnJvd3NlcjogQnJvd3NlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gICAgdGhpcy5zdWJPYmplY3QgPSB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKDxhbnk+cmVzKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVsnY291bnRyeSddICYmIGRhdGFbJ2NpdHknXSkge1xuICAgICAgICAgIHRoaXMuaG9tZVVybCA9ICgnLycgKyBkYXRhWydjb3VudHJ5J10gKyAnLycgKyBkYXRhWydjaXR5J10pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgYnVpbGRVcmxBcnJheSA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVybEFycmF5ID0gWydpbiddO1xuICAgIH1cbiAgfVxuXG5cbiAgc2hhcmVFdmVudCA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuYnJvd3Nlci5pc01vYmlsZSgpICYmIHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvclsnc2hhcmUnXSkge1xuICAgICAgd2luZG93Lm5hdmlnYXRvclsnc2hhcmUnXSh7XG4gICAgICAgIHRpdGxlOiB0aGlzLmV2ZW50RGF0YS5uYW1lLFxuICAgICAgICB0ZXh0OiB0aGlzLmV2ZW50RGF0YS5uYW1lLFxuICAgICAgICB1cmw6IGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnREYXRhLnNob3J0TmFtZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpYWxvZy5vcGVuKFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCwge1xuICAgICAgICAvLyB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgZGF0YTogeyBldmVudDogdGhpcy5ldmVudERhdGEgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYodGhpcy5zdWJPYmplY3QpXG4gICAgICB0aGlzLnN1Yk9iamVjdC51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==