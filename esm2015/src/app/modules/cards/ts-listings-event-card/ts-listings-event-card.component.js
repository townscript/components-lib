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
        this.hideFollowShare = false;
        this.theme = 'townscript';
        this.hideTime = true;
        this.router = config.router;
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
        this.getLocation = () => {
            if (this.eventData != undefined) {
                if (this.eventData.onlineEvent) {
                    return 'Online';
                }
                if (this.eventData.locality != undefined) {
                    return this.eventData.locality + ', ' + this.eventData.city;
                }
                else {
                    return this.eventData.city;
                }
            }
            else {
                return '';
            }
        };
    }
    ngOnInit() {
        this.buildUrlArray();
        if (this.eventData.cardImageUrl && this.eventData.cardImageUrl.indexOf(config.s3Bucket) > -1) {
            this.eventData.cardImageUrl = config.imgixUrl +
                this.eventData.cardImageUrl.split(config.s3Bucket)[1];
        }
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
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TsListingEventCardComponent.prototype, "hideFollowShare", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], TsListingEventCardComponent.prototype, "theme", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], TsListingEventCardComponent.prototype, "hideTime", void 0);
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
export { TsListingEventCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NhcmRzL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQvdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFPNUcsSUFBYSwyQkFBMkIsR0FBeEMsTUFBYSwyQkFBMkI7SUFnQnRDLFlBQ1MsY0FBOEIsRUFDOUIsTUFBaUIsRUFDaEIsT0FBdUIsRUFDdkIsWUFBMEI7UUFIM0IsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDaEIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFmM0IsYUFBUSxHQUFRLE1BQU0sQ0FBQztRQUN2QixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixVQUFLLEdBQUcsWUFBWSxDQUFDO1FBQ3JCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDbEMsV0FBTSxHQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFLL0Isd0JBQW1CLEdBQUcsTUFBTSxDQUFDLFNB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SUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMzRTthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBNENELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUVGLENBQUE7QUFuRlU7SUFBUixLQUFLLEVBQUU7OzhEQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOzt5REFBVztBQUNWO0lBQVIsS0FBSyxFQUFFOzs2REFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7O29FQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTs7MERBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzs2REFBMEI7QUFSdkIsMkJBQTJCO0lBTHZDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsOHlNQUFzRDs7S0FFdkQsQ0FBQzs2Q0FrQnlCLGNBQWM7UUFDdEIsU0FBUztRQUNQLGNBQWM7UUFDVCxZQUFZO0dBcEJ6QiwyQkFBMkIsQ0FzRnZDO1NBdEZZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYnJvd3Nlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vdHMtbGlzdGluZy1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0xpc3RpbmdFdmVudENhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cblxuICBASW5wdXQoKSBldmVudERhdGE6IGFueTtcbiAgQElucHV0KCkgdHlwZTogYW55O1xuICBASW5wdXQoKSBncmlkVHlwZTogYW55ID0gJ2dyaWQnO1xuICBASW5wdXQoKSBoaWRlRm9sbG93U2hhcmUgPSBmYWxzZTtcbiAgQElucHV0KCkgdGhlbWUgPSAndG93bnNjcmlwdCc7XG4gIEBJbnB1dCgpIGhpZGVUaW1lOiBib29sZWFuID0gdHJ1ZTtcbiAgcm91dGVyOiBSb3V0ZXIgPSBjb25maWcucm91dGVyO1xuXG4gIGhvbWVVcmw6IGFueTtcbiAgc3ViT2JqZWN0OiBhbnk7XG4gIHVybEFycmF5OiBzdHJpbmdbXTtcbiAgZGVmYXVsdENhcmRJbWFnZVVybCA9IGNvbmZpZy5zM0Jhc2VVcmwgKyAndG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL0xpc3RpbmdzU3RhdGljL2RlZmF1bHQtY2FyZC5qcGcnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgYnJvd3NlcjogQnJvd3NlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5idWlsZFVybEFycmF5KCk7XG4gICAgaWYgKHRoaXMuZXZlbnREYXRhLmNhcmRJbWFnZVVybCAmJiB0aGlzLmV2ZW50RGF0YS5jYXJkSW1hZ2VVcmwuaW5kZXhPZihjb25maWcuczNCdWNrZXQpID4gLTEpIHtcbiAgICAgIHRoaXMuZXZlbnREYXRhLmNhcmRJbWFnZVVybCA9IGNvbmZpZy5pbWdpeFVybCArXG4gICAgICAgIHRoaXMuZXZlbnREYXRhLmNhcmRJbWFnZVVybC5zcGxpdChjb25maWcuczNCdWNrZXQpWzFdO1xuICAgIH1cbiAgICB0aGlzLnN1Yk9iamVjdCA9IHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoPGFueT5yZXMpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWydjb3VudHJ5J10gJiYgZGF0YVsnY2l0eSddKSB7XG4gICAgICAgICAgdGhpcy5ob21lVXJsID0gKCcvJyArIGRhdGFbJ2NvdW50cnknXSArICcvJyArIGRhdGFbJ2NpdHknXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuICBidWlsZFVybEFycmF5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLnJvdXRlci51cmwpIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSB0aGlzLnJvdXRlci51cmwuc3BsaXQoXCI/XCIpWzBdLnJlcGxhY2UoJy8nLCAnJykuc3BsaXQoJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmxBcnJheSA9IFsnaW4nXTtcbiAgICB9XG4gIH1cblxuXG4gIHNoYXJlRXZlbnQgPSAoZXZlbnQpID0+IHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmJyb3dzZXIuaXNNb2JpbGUoKSAmJiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3JbJ3NoYXJlJ10pIHtcbiAgICAgIHdpbmRvdy5uYXZpZ2F0b3JbJ3NoYXJlJ10oe1xuICAgICAgICB0aXRsZTogdGhpcy5ldmVudERhdGEubmFtZSxcbiAgICAgICAgdGV4dDogdGhpcy5ldmVudERhdGEubmFtZSxcbiAgICAgICAgdXJsOiBjb25maWcuYmFzZVVybCArICdlLycgKyB0aGlzLmV2ZW50RGF0YS5zaG9ydE5hbWUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaWFsb2cub3BlbihTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQsIHtcbiAgICAgICAgLy8gd2lkdGg6ICc1MDBweCcsXG4gICAgICAgIGRhdGE6IHsgZXZlbnQ6IHRoaXMuZXZlbnREYXRhIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldExvY2F0aW9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmV2ZW50RGF0YSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLmV2ZW50RGF0YS5vbmxpbmVFdmVudCkge1xuICAgICAgICByZXR1cm4gJ09ubGluZSc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5ldmVudERhdGEubG9jYWxpdHkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50RGF0YS5sb2NhbGl0eSArICcsICcgKyB0aGlzLmV2ZW50RGF0YS5jaXR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnREYXRhLmNpdHk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJPYmplY3QpXG4gICAgICB0aGlzLnN1Yk9iamVjdC51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==