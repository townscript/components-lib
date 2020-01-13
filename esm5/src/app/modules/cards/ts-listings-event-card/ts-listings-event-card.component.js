import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BrowserService } from '../../../core/browser.service';
import { PlaceService } from '../../layout/components/ts-header/place.service';
import { UtilityService } from '../../../shared/services/utilities.service';
import { config } from '../../../core/app-config';
import { ShareEventModalComponent } from '../ts-listing-card/share-event-modal/share-event-modal.component';
var TsListingEventCardComponent = /** @class */ (function () {
    function TsListingEventCardComponent(utilityService, dialog, browser, placeService) {
        var _this = this;
        this.utilityService = utilityService;
        this.dialog = dialog;
        this.browser = browser;
        this.placeService = placeService;
        this.router = config.router;
        this.hideTime = true;
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
    }
    TsListingEventCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.buildUrlArray();
        this.subObject = this.placeService.place.subscribe(function (res) {
            if (_this.utilityService.IsJsonString(res)) {
                var data = JSON.parse(res);
                if (data && data['country'] && data['city']) {
                    _this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
                }
            }
        });
    };
    TsListingEventCardComponent.prototype.ngOnDestroy = function () {
        if (this.subObject)
            this.subObject.unsubscribe();
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
            template: "<div class=\"card-container rounded overflow-hidden relative\" [ngClass]=\"gridType == 'list' ? 'flex' : ''\">\n\n  <div class=\"card-header absolute top-0 w-full flex items-center justify-between black-gradient py-1 px-3 z-50\" *ngIf=\"gridType == 'grid'\">\n    <div class=\"topic-bubble opacity-0\" *ngIf=\"eventData?.keywords\">\n      <a *ngFor=\"let key of eventData?.keywords| slice:0:1\"\n          [href]=\"urlArray && urlArray.length > 1 ? urlArray[0] + '/' + urlArray[1]  + '/' + key.topicKeywordCode : homeUrl + '/' + key.topicKeywordCode\">\n          <span class=\"bubble background-blue px-2 p-1 text-xs rounded-lg text-white uppercase\" appDataAnalytics eventLabel=\"keyword\" clickLocation=\"\">\n              {{key.topicKeywordName}}\n          </span>\n      </a>\n    </div>\n    <div class=\"actions flex\">\n      <div class=\"follow self-end px-3\">\n        <app-follow type=\"icon\" [followTypeId]=\"eventData.eventId\" [followType]=\"'EVENT'\" color=\"#fff\"\n        (click)=\"$event.stopPropagation()\"></app-follow>\n      </div>\n      <div class=\"share px-2 rounded-full self-end cursor-pointer\" matRipple (click)=\"$event.stopPropagation()\">\n        <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\" class=\"text-white mdi mdi-share-variant text-2xl share\"\n        (click)=\"shareEvent($event)\"></i>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"image-container relative\" [ngClass]=\"gridType == 'list' ? 'flex-2' : ''\">\n    <img\n      [defaultImage]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ListingsStatic/image-loader.gif'\"\n      [errorImage]=\"defaultCardImageUrl\"\n      [lazyLoad]=\"eventData.cardImageUrl ? eventData.cardImageUrl : defaultCardImageUrl\"\n      [ngClass]=\"gridType == 'list' ? 'absolute w-full h-full' : 'h-48'\"\n      [src]=\"eventData.cardImageUrl ? eventData.cardImageUrl : defaultCardImageUrl\"/>\n  </div>\n\n  <div class=\"card-body overflow-hidden w-full flex flex-wrap flex-col\"\n    [ngClass]=\"gridType == 'list' ? 'flex-3  pl-3 pt-3 md:pl-5' : 'px-3 py-2 md:px-5'\"\n    *ngIf=\"eventData\">\n\n    <div class=\"content w-full\"\n      [ngClass]=\"gridType == 'list' ? 'pr-3 md:pr-5' : ''\">\n      <div class=\"event-name-box text-gray-900 text-base items-baseline flex\"\n        [ngClass]=\"gridType == 'list' ? ' lg:text-xl pb-2 ' : 'lg:text-lg'\">\n        <div class=\"font-semibold event-name w-11/12\" [clamp]=\"2\">\n          {{eventData.name}}\n        </div>\n        <i class=\"mdi mdi-check-decagram text-primary px-1 md:text-lg\"\n        *ngIf=\"eventData?.organizerIsTrusted\" matTooltip=\"VERIFIED\" matTooltipPosition=\"above\"\n        matTooltipClass=\"ts-card-tooltip\"></i>\n      </div>\n      <div class=\"secondary-details flex flex-wrap items-center justify-start text-xs md:text-sm text-gray-800 py-2\">\n        <div class=\"date\">\n          <span class=\"\">{{[eventData.startTime, eventData.endTime] | dateRange: eventData.eventTimeZone : eventData.recurrent: {'startTime': eventData.recurrenceStartTime,'endTime': eventData.recurrenceEndTime,'recurrenceRule': eventData.recurrenceRule} : hideTime }}\n          </span>\n        </div>\n        <div class=\"px-2\"> | </div>\n        <div class=\"location\">\n          <span class=\"\">{{eventData.city}}</span>\n        </div>\n      </div>\n\n    </div>\n\n    <div class=\"hidden md:flex overflow-hidden py-2 w-full keywords-box\" *ngIf=\"gridType=='list'\">\n      <a *ngFor=\"let key of eventData?.keywords| slice:0:3\"\n        [href]=\"urlArray && urlArray.length > 1 ? urlArray[0] + '/' + urlArray[1]  + '/' + key.topicKeywordCode : homeUrl + '/' + key.topicKeywordCode\">\n        <span appDataAnalytics eventLabel=\"keyword\" clickLocation=\"\"\n          class=\"pr-2 text-gray-600 font-normal text-xs md:text-sm hover:text-gray-900 hover:underline\">\n          #{{key.topicKeywordName}}\n        </span>\n      </a>\n    </div>\n\n    <div class=\"gradient-separator w-full\" *ngIf=\"gridType=='list'\"></div>\n\n    <div class=\"footer\"\n      [ngClass]=\"gridType == 'list' ? 'flex-1 flex items-center justify-between pr-3' : ''\">\n      <div class=\"price\">\n        <div class=\"paid flex items-baseline\" *ngIf=\"eventData.minimumTicketPrice\">\n          <div class=\"min-price\">\n            <span class=\"text-primary md:text-lg font-semibold\">\n              {{eventData.minimumTicketPrice | currency:eventData.minimumTicketPriceCurrency : 'symbol':'1.0-0'}}\n            </span>\n          </div>\n          <span class=\"text-xs px-1 opacity-75\">onwards</span>\n        </div>\n        <div class=\"free\" *ngIf=\"!eventData.minimumTicketPrice\">\n          <span class=\"text-primary md:text-lg font-semibold\">Free</span>\n        </div>\n      </div>\n\n      <div class=\"actions flex\" *ngIf=\"gridType=='list'\">\n        <div class=\"follow self-end px-2 md:px-3 lg:px-5\">\n          <app-follow type=\"icon\" [followTypeId]=\"eventData.eventId\" [followType]=\"'EVENT'\" color=\"#683592\"\n          (click)=\"$event.stopPropagation()\"></app-follow>\n        </div>\n        <div class=\"share rounded-full self-end cursor-pointer\" matRipple (click)=\"$event.stopPropagation()\">\n          <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\" class=\"text-primary mdi mdi-share-variant text-2xl share\"\n          (click)=\"shareEvent($event)\"></i>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.card-container{-webkit-transition:.2s ease-in;transition:.2s ease-in;box-shadow:0 2px 8px rgba(0,0,0,.08)}.card-container:hover{-webkit-transform:translateY(-2%);transform:translateY(-2%);box-shadow:0 2px 15px rgba(0,0,0,.129189)}.card-container .black-gradient{background:-webkit-gradient(linear,left top,left bottom,from(black),color-stop(75%,transparent));background:linear-gradient(180deg,#000 0,transparent 75%)}.card-container .flex-2{-webkit-box-flex:2;flex:2}.card-container .flex-3{-webkit-box-flex:3;flex:3}.card-container .share{-webkit-transition:.15s;transition:.15s}.card-container .share:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.card-container .card-body .content{min-height:4.5em}@media (min-width:991px){.card-container .card-body .content .event-name{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}}@media (min-width:480px) and (max-width:991px){.card-container .card-body .content{min-height:5.5em}}@media (min-width:992px){.card-container .card-body .content{min-height:6.5em}}.card-container .card-body .gradient-separator{height:1px;background:-webkit-gradient(linear,left top,right top,from(transparent),color-stop(60%,#efefef),to(#ddd));background:linear-gradient(90deg,transparent 0,#efefef 60%,#ddd 100%)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService,
            MatDialog,
            BrowserService,
            PlaceService])
    ], TsListingEventCardComponent);
    return TsListingEventCardComponent;
}());
export { TsListingEventCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NhcmRzL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQvdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFPNUc7SUFjRSxxQ0FDUyxjQUE4QixFQUM5QixNQUFpQixFQUNoQixPQUF1QixFQUN2QixZQUEwQjtRQUpwQyxpQkFLQztRQUpRLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBWnBDLFdBQU0sR0FBVyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBSy9CLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsd0JBQW1CLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyw2REFBNkQsQ0FBQztRQXNCdkcsa0JBQWEsR0FBRztZQUNkLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdFO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQTtRQUdELGVBQVUsR0FBRyxVQUFDLEtBQUs7WUFDakIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1RSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4QixLQUFLLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO29CQUMxQixJQUFJLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO29CQUN6QixHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTO2lCQUN0RCxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtvQkFDekMsa0JBQWtCO29CQUNsQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRTtpQkFDaEMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUE7SUF2Q0QsQ0FBQztJQUVELDhDQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDcEQsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBTSxHQUFHLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDM0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMzRTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBNkJELGlEQUFXLEdBQVg7UUFDRSxJQUFHLElBQUksQ0FBQyxTQUFTO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBNURRO1FBQVIsS0FBSyxFQUFFOztrRUFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs7NkRBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7aUVBQWU7SUFMWiwyQkFBMkI7UUFMdkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQywrMktBQXNEOztTQUV2RCxDQUFDO2lEQWdCeUIsY0FBYztZQUN0QixTQUFTO1lBQ1AsY0FBYztZQUNULFlBQVk7T0FsQnpCLDJCQUEyQixDQWlFdkM7SUFBRCxrQ0FBQztDQUFBLEFBakVELElBaUVDO1NBakVZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYnJvd3Nlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vdHMtbGlzdGluZy1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0xpc3RpbmdFdmVudENhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cblxuICBASW5wdXQoKSBldmVudERhdGE6IGFueTtcbiAgQElucHV0KCkgdHlwZTogYW55O1xuICBASW5wdXQoKSBncmlkVHlwZTogYW55O1xuICByb3V0ZXI6IFJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG5cbiAgaG9tZVVybDogYW55O1xuICBzdWJPYmplY3Q6IGFueTtcbiAgdXJsQXJyYXk6IHN0cmluZ1tdO1xuICBoaWRlVGltZTogYm9vbGVhbiA9IHRydWU7XG4gIGRlZmF1bHRDYXJkSW1hZ2VVcmwgPSBjb25maWcuczNCYXNlVXJsICsgJ3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9MaXN0aW5nc1N0YXRpYy9kZWZhdWx0LWNhcmQuanBnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIGJyb3dzZXI6IEJyb3dzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICAgIHRoaXMuc3ViT2JqZWN0ID0gdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSg8YW55PnJlcyk7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGFbJ2NvdW50cnknXSAmJiBkYXRhWydjaXR5J10pIHtcbiAgICAgICAgICB0aGlzLmhvbWVVcmwgPSAoJy8nICsgZGF0YVsnY291bnRyeSddICsgJy8nICsgZGF0YVsnY2l0eSddKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIGJ1aWxkVXJsQXJyYXkgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMucm91dGVyLnVybCkge1xuICAgICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KFwiP1wiKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICB9XG4gIH1cblxuXG4gIHNoYXJlRXZlbnQgPSAoZXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmJyb3dzZXIuaXNNb2JpbGUoKSAmJiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3JbJ3NoYXJlJ10pIHtcbiAgICAgIHdpbmRvdy5uYXZpZ2F0b3JbJ3NoYXJlJ10oe1xuICAgICAgICB0aXRsZTogdGhpcy5ldmVudERhdGEubmFtZSxcbiAgICAgICAgdGV4dDogdGhpcy5ldmVudERhdGEubmFtZSxcbiAgICAgICAgdXJsOiBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50RGF0YS5zaG9ydE5hbWUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaWFsb2cub3BlbihTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQsIHtcbiAgICAgICAgLy8gd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIGRhdGE6IHsgZXZlbnQ6IHRoaXMuZXZlbnREYXRhIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmKHRoaXMuc3ViT2JqZWN0KVxuICAgICAgdGhpcy5zdWJPYmplY3QudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=