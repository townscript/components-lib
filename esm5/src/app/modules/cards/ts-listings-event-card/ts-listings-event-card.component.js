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
        this.gridType = 'grid';
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
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.card-container{-webkit-transition:.2s ease-in;transition:.2s ease-in;box-shadow:1px 2px 20px rgba(0,0,0,.1)}.card-container:hover{-webkit-transform:translateY(-2%);transform:translateY(-2%);box-shadow:2px 4px 25px rgba(0,0,0,.2)}.card-container .black-gradient{background:-webkit-gradient(linear,left top,left bottom,from(black),color-stop(95%,transparent));background:linear-gradient(180deg,#000 0,transparent 95%)}.card-container .flex-2{-webkit-box-flex:2;flex:2}.card-container .flex-3{-webkit-box-flex:3;flex:3}.card-container .share{-webkit-transition:.15s;transition:.15s}.card-container .share:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.card-container .card-body .content{min-height:4.5em}@media (min-width:991px){.card-container .card-body .content .event-name{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}}@media (min-width:480px) and (max-width:991px){.card-container .card-body .content{min-height:5.5em}}@media (min-width:992px){.card-container .card-body .content{min-height:6.5em}}.card-container .card-body .gradient-separator{height:1px;background:-webkit-gradient(linear,left top,right top,from(transparent),color-stop(60%,#efefef),to(#ddd));background:linear-gradient(90deg,transparent 0,#efefef 60%,#ddd 100%)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService,
            MatDialog,
            BrowserService,
            PlaceService])
    ], TsListingEventCardComponent);
    return TsListingEventCardComponent;
}());
export { TsListingEventCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NhcmRzL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQvdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFPNUc7SUFjRSxxQ0FDUyxjQUE4QixFQUM5QixNQUFpQixFQUNoQixPQUF1QixFQUN2QixZQUEwQjtRQUpwQyxpQkFLQztRQUpRLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBYjNCLGFBQVEsR0FBUSxNQUFNLENBQUM7UUFDaEMsV0FBTSxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFLL0IsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLDZEQUE2RCxDQUFDO1FBc0J2RyxrQkFBYSxHQUFHO1lBQ2QsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDakIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0U7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFBO1FBR0QsZUFBVSxHQUFHLFVBQUMsS0FBSztZQUNqQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzVFLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hCLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7b0JBQzFCLElBQUksRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7b0JBQ3pCLEdBQUcsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7aUJBQ3RELENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO29CQUN6QyxrQkFBa0I7b0JBQ2xCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsU0FBUyxFQUFFO2lCQUNoQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQTtJQXZDRCxDQUFDO0lBRUQsOENBQVEsR0FBUjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztZQUNwRCxJQUFJLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMzQyxLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQzNFO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE2QkQsaURBQVcsR0FBWDtRQUNFLElBQUcsSUFBSSxDQUFDLFNBQVM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUE1RFE7UUFBUixLQUFLLEVBQUU7O2tFQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzs2REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOztpRUFBd0I7SUFMckIsMkJBQTJCO1FBTHZDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsKzJLQUFzRDs7U0FFdkQsQ0FBQztpREFnQnlCLGNBQWM7WUFDdEIsU0FBUztZQUNQLGNBQWM7WUFDVCxZQUFZO09BbEJ6QiwyQkFBMkIsQ0FpRXZDO0lBQUQsa0NBQUM7Q0FBQSxBQWpFRCxJQWlFQztTQWpFWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQnJvd3NlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jyb3dzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL3RzLWxpc3RpbmctY2FyZC9zaGFyZS1ldmVudC1tb2RhbC9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cy1saXN0aW5ncy1ldmVudC1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1saXN0aW5ncy1ldmVudC1jYXJkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHNMaXN0aW5nRXZlbnRDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG5cbiAgQElucHV0KCkgZXZlbnREYXRhOiBhbnk7XG4gIEBJbnB1dCgpIHR5cGU6IGFueTtcbiAgQElucHV0KCkgZ3JpZFR5cGU6IGFueSA9ICdncmlkJztcbiAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuXG4gIGhvbWVVcmw6IGFueTtcbiAgc3ViT2JqZWN0OiBhbnk7XG4gIHVybEFycmF5OiBzdHJpbmdbXTtcbiAgaGlkZVRpbWU6IGJvb2xlYW4gPSB0cnVlO1xuICBkZWZhdWx0Q2FyZEltYWdlVXJsID0gY29uZmlnLnMzQmFzZVVybCArICd0b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvTGlzdGluZ3NTdGF0aWMvZGVmYXVsdC1jYXJkLmpwZyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSBicm93c2VyOiBCcm93c2VyU2VydmljZSxcbiAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICB0aGlzLnN1Yk9iamVjdCA9IHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWydjb3VudHJ5J10gJiYgZGF0YVsnY2l0eSddKSB7XG4gICAgICAgICAgdGhpcy5ob21lVXJsID0gKCcvJyArIGRhdGFbJ2NvdW50cnknXSArICcvJyArIGRhdGFbJ2NpdHknXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgICAgdGhpcy51cmxBcnJheSA9IHRoaXMucm91dGVyLnVybC5zcGxpdChcIj9cIilbMF0ucmVwbGFjZSgnLycsICcnKS5zcGxpdCgnLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgfVxuICB9XG5cblxuICBzaGFyZUV2ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5icm93c2VyLmlzTW9iaWxlKCkgJiYgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKSB7XG4gICAgICB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHRleHQ6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHVybDogY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudERhdGEuc2hvcnROYW1lLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nLm9wZW4oU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LCB7XG4gICAgICAgIC8vIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICBkYXRhOiB7IGV2ZW50OiB0aGlzLmV2ZW50RGF0YSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZih0aGlzLnN1Yk9iamVjdClcbiAgICAgIHRoaXMuc3ViT2JqZWN0LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19