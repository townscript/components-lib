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
        this.hideFollowShare = false;
        this.theme = 'townscript';
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
        this.getLocation = function () {
            if (_this.eventData != undefined) {
                if (_this.eventData.onlineEvent) {
                    return 'Online';
                }
                if (_this.eventData.locality != undefined) {
                    return _this.eventData.locality + ', ' + _this.eventData.city;
                }
                else {
                    return _this.eventData.city;
                }
            }
            else {
                return '';
            }
        };
    }
    TsListingEventCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.buildUrlArray();
        if (this.eventData.cardImageUrl.indexOf(config.s3Bucket) > -1) {
            this.eventData.cardImageUrl = config.imgixUrl +
                this.eventData.cardImageUrl.split(config.s3Bucket)[1];
        }
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
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsListingEventCardComponent.prototype, "hideFollowShare", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsListingEventCardComponent.prototype, "theme", void 0);
    TsListingEventCardComponent = tslib_1.__decorate([
        Component({
            selector: 'ts-listings-event-card',
            template: "<div class=\"card-container rounded overflow-hidden relative bg-white\" [ngClass]=\"gridType == 'list' ? 'flex' : ''\">\n\n    <div class=\"card-header absolute top-0 w-full flex items-center justify-end black-gradient py-1 px-3 z-50\" *ngIf=\"gridType == 'grid' && !hideFollowShare\">\n        <div class=\"topic-bubble opacity-0\" *ngIf=\"false\">\n            <a *ngFor=\"let key of eventData?.keywords| slice:0:1\" [href]=\"urlArray && urlArray.length > 1 ? urlArray[0] + '/' + urlArray[1]  + '/' + key.topicKeywordCode : homeUrl + '/' + key.topicKeywordCode\">\n                <span class=\"bubble background-blue px-2 p-1 text-xs rounded-lg text-white uppercase\" appDataAnalytics eventLabel=\"keyword\" clickLocation=\"\">\n                    {{key.topicKeywordName}}\n                </span>\n            </a>\n        </div>\n        <div class=\"actions flex\">\n            <div class=\"follow self-end px-3\">\n                <app-follow type=\"icon\" [followTypeId]=\"eventData.eventId\" [followType]=\"'EVENT'\" color=\"#fff\" (click)=\"$event.stopPropagation()\"></app-follow>\n            </div>\n            <div class=\"share px-2 rounded-full self-end cursor-pointer\" matRipple (click)=\"$event.stopPropagation()\">\n                <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\" class=\"text-white mdi mdi-share-variant text-2xl share\" (click)=\"shareEvent($event)\"></i>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"image-container relative fadeIn\" [ngClass]=\"gridType == 'list' ? 'flex-2' : ''\">\n        <img [alt]=\"eventData?.name\" [defaultImage]=\"(eventData.cardImageUrl ? eventData.cardImageUrl : defaultCardImageUrl)+'?auto=compress,format&w=375&h=200&blur=90'\" [errorImage]=\"defaultCardImageUrl\" [lazyLoad]=\"(eventData.cardImageUrl ? eventData.cardImageUrl : defaultCardImageUrl)+'?auto=compress,format&w=375&h=200'\"\n            [ngClass]=\"gridType == 'list' ? 'absolute w-full h-full' : 'h-48 w-full'\" />\n    </div>\n\n    <div class=\"card-body overflow-hidden w-full flex flex-wrap flex-col\" [ngClass]=\"gridType == 'list' ? 'flex-3  pl-3 pt-3 md:pl-5' : 'px-3 py-2 md:px-4'\" *ngIf=\"eventData\">\n\n        <div class=\"content w-full fadeIn\" [ngClass]=\"gridType == 'list' ? 'pr-3 md:pr-5' : ''\">\n            <div class=\"event-name-box text-gray-900 text-base items-baseline flex\" [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-xl ' : 'lg:text-lg'\">\n\n                <div class=\"font-semibold event-name w-11/12 fadeIn\" [clamp]=\"2\" *ngIf=\"gridType != 'list'\">\n                    {{eventData.name}}\n                </div>\n                <div class=\"font-semibold event-name w-11/12 fadeIn\" [clamp]=\"2\" *ngIf=\"gridType == 'list'\">\n                    {{eventData.name}}\n                </div>\n\n                <i class=\"mdi mdi-check-decagram text-primary px-1 md:text-lg\" *ngIf=\"eventData?.organizerIsTrusted\" matTooltip=\"VERIFIED\" matTooltipPosition=\"above\" matTooltipClass=\"ts-card-tooltip\"></i>\n            </div>\n            <div class=\"secondary-details fadeIn animation-delay flex items-center justify-start text-xs md:text-sm text-gray-800 pb-2 md:pt-1\" [class.text-sm]=\"theme=='bms'\">\n                <div class=\"date \">\n                    <span class=\"whitespace-no-wrap\">{{[eventData.startTime, eventData.endTime] | dateRange: eventData.eventTimeZone : eventData.recurrent: {'startTime': eventData.recurrenceStartTime,'endTime': eventData.recurrenceEndTime,'recurrenceRule': eventData.recurrenceRule} : hideTime }}\n                    </span>\n                </div>\n                <div class=\"px-2\"> | </div>\n                <div class=\"location overflow-hidden whitespace-no-wrap\">\n                    <span class=\"whitespace-no-wrap\">{{getLocation()}}</span>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"hidden md:flex overflow-hidden py-2 w-full keywords-box\" *ngIf=\"gridType=='list'\">\n            <a *ngFor=\"let key of eventData?.keywords| slice:0:3\" [href]=\"urlArray && urlArray.length > 1 ? urlArray[0] + '/' + urlArray[1]  + '/' + key.topicKeywordCode : homeUrl + '/' + key.topicKeywordCode\">\n                <span appDataAnalytics eventLabel=\"keyword\" clickLocation=\"\" class=\"pr-2 text-gray-600 font-normal text-xs md:text-sm hover:text-gray-900 hover:underline\">\n                    #{{key.topicKeywordName}}\n                </span>\n            </a>\n        </div>\n\n        <div class=\"gradient-separator w-full\" *ngIf=\"gridType=='list'\"></div>\n\n        <div class=\"footer\" [ngClass]=\"gridType == 'list' ? 'flex-1 flex items-center justify-between pr-3 md:pr-5 py-1' : ''\">\n            <div class=\"price\">\n                <div class=\"paid flex items-baseline\" *ngIf=\"eventData.minimumTicketPrice\">\n                    <div class=\"min-price\">\n                        <span class=\"md:text-lg font-semibold\" [class.text-primary]=\"theme=='townscript'\" [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-lg' : ''\">\n                            {{eventData.minimumTicketPrice | currency:eventData.minimumTicketPriceCurrency : 'symbol':'1.0-0'}}\n                        </span>\n                    </div>\n                    <span class=\"text-xs md:text-sm px-1 opacity-75\">onwards</span>\n                </div>\n                <div class=\"free\" *ngIf=\"!eventData.minimumTicketPrice\">\n                    <span class=\"text-primary md:text-lg font-semibold\" [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-lg' : ''\">Free</span>\n                </div>\n            </div>\n\n            <div class=\"actions flex list-actions\" *ngIf=\"gridType=='list'\">\n                <div class=\"follow self-end px-2 md:px-3 lg:px-5\">\n                    <app-follow type=\"icon\" [followTypeId]=\"eventData.eventId\" [followType]=\"'EVENT'\" color=\"#683592\" (click)=\"$event.stopPropagation()\"></app-follow>\n                </div>\n                <div class=\"share rounded-full self-end cursor-pointer\" matRipple (click)=\"$event.stopPropagation()\">\n                    <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\" class=\"text-primary mdi mdi-share-variant text-lg md:text-2xl share\" (click)=\"shareEvent($event)\"></i>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n</div>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}::ng-deep .event-name span{width:auto!important;padding-right:2px}@media (min-width:992px){::ng-deep .list-actions i{font-size:1.4rem!important}}::ng-deep .list-actions i{font-size:1.3rem}.card-container{z-index:0;-webkit-transition:.2s ease-in;transition:.2s ease-in;box-shadow:0 1px 10px rgba(0,0,0,.1)}.card-container:hover{-webkit-transform:translateY(-2%);transform:translateY(-2%);box-shadow:0 2px 15px rgba(0,0,0,.2)}.card-container .black-gradient{background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.7)),color-stop(95%,transparent));background:linear-gradient(180deg,rgba(0,0,0,.7) 0,transparent 95%)}.card-container .flex-2{-webkit-box-flex:2;flex:2}.card-container .flex-3{-webkit-box-flex:3;flex:3}.card-container .share{-webkit-transition:.15s;transition:.15s}.card-container .share:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}.card-container .card-body .content{min-height:5em}.card-container .card-body .content .event-name,.card-container .card-body .content .secondary-details{color:#301c3f;display:-webkit-box;display:flex;flex-wrap:wrap}@media (min-width:991px){.card-container .card-body .content .event-name{-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}}.card-container .card-body .content .location{text-overflow:ellipsis}@media (min-width:480px) and (max-width:991px){.card-container .card-body .content{min-height:5.5em}}@media (min-width:992px){.card-container .card-body .content{min-height:5.8em}}.card-container .card-body .gradient-separator{height:1px;background:-webkit-gradient(linear,left top,right top,from(rgba(151,151,151,.01)),to(#c8c8c8));background:linear-gradient(90deg,rgba(151,151,151,.01) 0,#c8c8c8 100%);opacity:.6}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService,
            MatDialog,
            BrowserService,
            PlaceService])
    ], TsListingEventCardComponent);
    return TsListingEventCardComponent;
}());
export { TsListingEventCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NhcmRzL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQvdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFPNUc7SUFnQkUscUNBQ1MsY0FBOEIsRUFDOUIsTUFBaUIsRUFDaEIsT0FBdUIsRUFDdkIsWUFBMEI7UUFKcEMsaUJBS0M7UUFKUSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWYzQixhQUFRLEdBQVEsTUFBTSxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFVBQUssR0FBRyxZQUFZLENBQUM7UUFDOUIsV0FBTSxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFLL0IsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLDZEQUE2RCxDQUFD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M0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMzRTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBNENELGlEQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQWpGUTtRQUFSLEtBQUssRUFBRTs7a0VBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7OzZEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7O2lFQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTs7d0VBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOzs4REFBc0I7SUFQbkIsMkJBQTJCO1FBTHZDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsOHlNQUFzRDs7U0FFdkQsQ0FBQztpREFrQnlCLGNBQWM7WUFDdEIsU0FBUztZQUNQLGNBQWM7WUFDVCxZQUFZO09BcEJ6QiwyQkFBMkIsQ0FzRnZDO0lBQUQsa0NBQUM7Q0FBQSxBQXRGRCxJQXNGQztTQXRGWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQnJvd3NlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2Jyb3dzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL3RzLWxpc3RpbmctY2FyZC9zaGFyZS1ldmVudC1tb2RhbC9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cy1saXN0aW5ncy1ldmVudC1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1saXN0aW5ncy1ldmVudC1jYXJkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHNMaXN0aW5nRXZlbnRDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG5cbiAgQElucHV0KCkgZXZlbnREYXRhOiBhbnk7XG4gIEBJbnB1dCgpIHR5cGU6IGFueTtcbiAgQElucHV0KCkgZ3JpZFR5cGU6IGFueSA9ICdncmlkJztcbiAgQElucHV0KCkgaGlkZUZvbGxvd1NoYXJlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRoZW1lID0gJ3Rvd25zY3JpcHQnO1xuICByb3V0ZXI6IFJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG5cbiAgaG9tZVVybDogYW55O1xuICBzdWJPYmplY3Q6IGFueTtcbiAgdXJsQXJyYXk6IHN0cmluZ1tdO1xuICBoaWRlVGltZTogYm9vbGVhbiA9IHRydWU7XG4gIGRlZmF1bHRDYXJkSW1hZ2VVcmwgPSBjb25maWcuczNCYXNlVXJsICsgJ3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9MaXN0aW5nc1N0YXRpYy9kZWZhdWx0LWNhcmQuanBnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIGJyb3dzZXI6IEJyb3dzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYnVpbGRVcmxBcnJheSgpO1xuICAgIGlmICh0aGlzLmV2ZW50RGF0YS5jYXJkSW1hZ2VVcmwuaW5kZXhPZihjb25maWcuczNCdWNrZXQpID4gLTEpIHtcbiAgICAgIHRoaXMuZXZlbnREYXRhLmNhcmRJbWFnZVVybCA9IGNvbmZpZy5pbWdpeFVybCArXG4gICAgICAgIHRoaXMuZXZlbnREYXRhLmNhcmRJbWFnZVVybC5zcGxpdChjb25maWcuczNCdWNrZXQpWzFdO1xuICAgIH1cbiAgICB0aGlzLnN1Yk9iamVjdCA9IHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWydjb3VudHJ5J10gJiYgZGF0YVsnY2l0eSddKSB7XG4gICAgICAgICAgdGhpcy5ob21lVXJsID0gKCcvJyArIGRhdGFbJ2NvdW50cnknXSArICcvJyArIGRhdGFbJ2NpdHknXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICB9XG4gIH1cblxuXG4gIHNoYXJlRXZlbnQgPSAoZXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmJyb3dzZXIuaXNNb2JpbGUoKSAmJiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3JbJ3NoYXJlJ10pIHtcbiAgICAgIHdpbmRvdy5uYXZpZ2F0b3JbJ3NoYXJlJ10oe1xuICAgICAgICB0aXRsZTogdGhpcy5ldmVudERhdGEubmFtZSxcbiAgICAgICAgdGV4dDogdGhpcy5ldmVudERhdGEubmFtZSxcbiAgICAgICAgdXJsOiBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50RGF0YS5zaG9ydE5hbWUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaWFsb2cub3BlbihTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQsIHtcbiAgICAgICAgLy8gd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIGRhdGE6IHsgZXZlbnQ6IHRoaXMuZXZlbnREYXRhIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldExvY2F0aW9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmV2ZW50RGF0YSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLmV2ZW50RGF0YS5vbmxpbmVFdmVudCkge1xuICAgICAgICByZXR1cm4gJ09ubGluZSc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5ldmVudERhdGEubG9jYWxpdHkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50RGF0YS5sb2NhbGl0eSArICcsICcgKyB0aGlzLmV2ZW50RGF0YS5jaXR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnREYXRhLmNpdHk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJPYmplY3QpXG4gICAgICB0aGlzLnN1Yk9iamVjdC51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==