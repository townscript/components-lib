import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserService } from '../../../core/browser.service';
import { PlaceService } from '../../layout/components/ts-header/place.service';
import { UtilityService } from '../../../shared/services/utilities.service';
import { config } from '../../../core/app-config';
import { ShareEventModalComponent } from './share-event-modal/share-event-modal.component';
import { DateTime } from 'luxon';
import { TimeService } from '../../../shared/services/time.service';
var TsListingEventCardComponent = /** @class */ (function () {
    function TsListingEventCardComponent(utilityService, dialog, browser, placeService, timeService) {
        var _this = this;
        this.utilityService = utilityService;
        this.dialog = dialog;
        this.browser = browser;
        this.placeService = placeService;
        this.timeService = timeService;
        this.gridType = 'grid';
        this.hideFollowShare = false;
        this.theme = 'townscript';
        this.hideTime = true;
        this.router = config.router;
        this.nowLive = 0;
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
        if (this.eventData.cardImageUrl && this.eventData.cardImageUrl.indexOf(config.s3Bucket) > -1) {
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
        if (this.eventData.onlineEvent) {
            this.eventStartDate = DateTime.fromISO(this.eventData.startTime).toJSDate();
            if (this.eventData.recurrent) {
                this.eventStartDate = this.timeService.nextOccurenceFromRRule(this.eventStartDate, DateTime.fromISO(this.eventData.endTime).toJSDate(), this.eventData.recurrenceRule, this.eventData.recurrenceStartTime);
            }
            this.startingSoon = this.timeService.dateTimeWithinHours(this.eventStartDate, 10);
        }
    };
    TsListingEventCardComponent.prototype.ngOnDestroy = function () {
        if (this.subObject)
            this.subObject.unsubscribe();
    };
    TsListingEventCardComponent.ctorParameters = function () { return [
        { type: UtilityService },
        { type: MatDialog },
        { type: BrowserService },
        { type: PlaceService },
        { type: TimeService }
    ]; };
    __decorate([
        Input()
    ], TsListingEventCardComponent.prototype, "eventData", void 0);
    __decorate([
        Input()
    ], TsListingEventCardComponent.prototype, "type", void 0);
    __decorate([
        Input()
    ], TsListingEventCardComponent.prototype, "gridType", void 0);
    __decorate([
        Input()
    ], TsListingEventCardComponent.prototype, "hideFollowShare", void 0);
    __decorate([
        Input()
    ], TsListingEventCardComponent.prototype, "theme", void 0);
    __decorate([
        Input()
    ], TsListingEventCardComponent.prototype, "hideTime", void 0);
    __decorate([
        Input()
    ], TsListingEventCardComponent.prototype, "cfData", void 0);
    TsListingEventCardComponent = __decorate([
        Component({
            selector: 'ts-listings-event-card',
            template: "<div class=\"card-container rounded-lg overflow-hidden relative bg-white\" [ngClass]=\"gridType == 'list' ? 'flex' : ''\">\n\n    <div class=\"card-header absolute top-0 w-full flex items-center justify-end black-gradient py-1 px-3 z-50\"\n        *ngIf=\"gridType == 'grid' && !hideFollowShare\">\n        <div class=\"topic-bubble opacity-0\" *ngIf=\"false\">\n            <a *ngFor=\"let key of eventData?.keywords| slice:0:1\"\n                [href]=\"urlArray && urlArray.length > 1 ? urlArray[0] + '/' + urlArray[1]  + '/' + key.topicKeywordCode : homeUrl + '/' + key.topicKeywordCode\">\n                <span class=\"bubble background-blue px-2 p-1 text-xs rounded-lg text-white uppercase\" appDataAnalytics\n                    eventLabel=\"keyword\" clickLocation=\"\">\n                    {{key.topicKeywordName}}\n                </span>\n            </a>\n        </div>\n        <div class=\"topic-bubble mr-auto\" *ngIf=\"cfData\">\n            <span class=\"bubble px-2 p-1 text-xs rounded-full font-bold tracking-widest text-white uppercase\">\n                Crowdfunding\n            </span>\n        </div>\n        <div class=\"actions flex\">\n            <div class=\"follow self-end px-3\">\n                <app-follow type=\"icon\" [followTypeId]=\"eventData.eventId\" [followType]=\"'EVENT'\" color=\"#fff\"\n                    (click)=\"$event.stopPropagation()\"></app-follow>\n            </div>\n            <div class=\"share px-2 rounded-full self-end cursor-pointer\" matRipple (click)=\"$event.stopPropagation()\">\n                <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\"\n                    class=\"text-white mdi mdi-share-variant text-2xl share\" (click)=\"shareEvent($event)\"></i>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"card-header absolute top-0 py-2 px-3 z-50\" *ngIf=\"gridType == 'list' && cfData\">\n        <div class=\"topic-bubble mr-auto\">\n            <span class=\"bubble px-2 p-1 text-xs rounded-full font-bold tracking-widest text-white uppercase\">\n                Crowdfunding\n            </span>\n        </div>\n    </div>\n\n    <div class=\"image-container relative fadeIn\" [ngClass]=\"gridType == 'list' ? 'flex-2' : ''\">\n        <img [alt]=\"eventData?.name\"\n            [defaultImage]=\"(eventData.cardImageUrl ? eventData.cardImageUrl : defaultCardImageUrl)+'?auto=compress,format&w=375&h=200&blur=90'\"\n            [errorImage]=\"defaultCardImageUrl\"\n            [lazyLoad]=\"(eventData.cardImageUrl ? eventData.cardImageUrl : defaultCardImageUrl)+'?auto=compress,format&w=375&h=200'\"\n            [ngClass]=\"gridType == 'list' ? 'absolute w-full h-full' : 'h-48 w-full'\" />\n    </div>\n\n    <div class=\"card-body overflow-hidden w-full flex flex-wrap flex-col\"\n        [ngClass]=\"gridType == 'list' ? 'flex-3 pl-4 md:pl-5' : 'px-4 pb-4 md:px-5 md:pb-5'\" *ngIf=\"eventData\">\n\n        <div class=\"content w-full fadeIn\" [ngClass]=\"gridType == 'list' ? 'pr-3 md:pr-5' : 'my-3 md:my-4'\">\n            <div class=\"event-name-box text-gray-900 text-base items-baseline flex\"\n                [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-xl mt-3 md:mt-4' : 'lg:text-lg'\">\n\n                <div class=\"font-semibold event-name w-11/12 fadeIn\" [clamp]=\"2\" *ngIf=\"gridType != 'list'\">\n                    {{eventData.name}}\n                </div>\n                <div class=\"font-semibold event-name w-11/12 fadeIn\" [clamp]=\"2\" *ngIf=\"gridType == 'list'\">\n                    {{eventData.name}}\n                </div>\n\n                <i class=\"mdi mdi-check-decagram text-primary px-1 md:text-lg\" *ngIf=\"eventData?.organizerIsTrusted\"\n                    matTooltip=\"VERIFIED\" matTooltipPosition=\"above\" matTooltipClass=\"ts-card-tooltip\"></i>\n            </div>\n            <div class=\"secondary-details fadeIn animation-delay flex items-center justify-start text-xs md:text-sm text-gray-800 mt-2 md:mt-3\"\n                [class.text-sm]=\"theme=='bms'\">\n                <ng-container *ngIf=\"!eventData.onlineEvent || !startingSoon\">\n                    <div class=\"date\">\n                        <span class=\"whitespace-no-wrap\">{{[eventData.startTime, eventData.endTime] | dateRange:\n                            eventData.eventTimeZone : eventData.recurrent: {'startTime':\n                            eventData.recurrenceStartTime,'endTime': eventData.recurrenceEndTime,'recurrenceRule':\n                            eventData.recurrenceRule} : hideTime }}\n                        </span>\n                    </div>\n                </ng-container>\n                <ng-container *ngIf=\"!eventData.onlineEvent\">\n                    <div class=\"px-2\"> | </div>\n                    <div class=\"location overflow-hidden whitespace-no-wrap\">\n                        <span class=\"whitespace-no-wrap\">{{getLocation()}}</span>\n                    </div>\n                </ng-container>\n                <ng-container *ngIf=\"eventData.onlineEvent && startingSoon\">\n                    <div class=\"starting-in\" *ngIf=\"!nowLive\">\n                        <span>Starting in </span>\n                        <ts-countdown class=\"font-bold tracking-wide\" [date]=\"eventStartDate\" (reached)=\"nowLive = 1\">\n                        </ts-countdown>\n                    </div>\n                    <span *ngIf=\"nowLive\" class=\"ts-enter live-now font-bold uppercase\">\n                        Live Now\n                    </span>\n                </ng-container>\n            </div>\n\n        </div>\n\n        <div class=\"flex items-center overflow-hidden my-3 md:my-4 w-full keywords-box\" *ngIf=\"gridType=='list'\">\n            <a *ngFor=\"let key of eventData?.keywords| slice:0:3\" class=\"hidden md:block\"\n                [href]=\"urlArray && urlArray.length > 1 ? urlArray[0] + '/' + urlArray[1]  + '/' + key.topicKeywordCode : homeUrl + '/' + key.topicKeywordCode\">\n                <span appDataAnalytics eventLabel=\"keyword\" clickLocation=\"\"\n                    class=\"pr-2 text-gray-600 font-normal text-xs md:text-sm hover:text-gray-900 hover:underline\">\n                    #{{key.topicKeywordName}}\n                </span>\n            </a>\n            <div class=\"online flex items-center border px-2 rounded-full mr-5 md:ml-auto\"\n                *ngIf=\"eventData.onlineEvent && !cfData\">\n                <span class=\"online__indicator w-2 h-2 rounded-full mr-1\"></span>\n                <span class=\"online__text text-xs md:text-sm tracking-widest font-bold uppercase\">Online</span>\n            </div>\n            <div class=\"flex items-center px-2 rounded-full bg-gray-100 text-sm mr-5 md:ml-auto\"\n                *ngIf=\"!eventData.onlineEvent && cfData && cfData.crowdFundedGoalStatus === 'REACHED'\">\n                <span>\uD83C\uDF89</span>\n                <span class=\"text-gray-700\">Goal Reached</span>\n            </div>\n        </div>\n\n        <div class=\"gradient-separator w-full\" *ngIf=\"gridType=='list'\"></div>\n\n        <div class=\"flex items-center justify-between footer\"\n            *ngIf=\"!cfData || !(cfData.crowdFundedGoalStatus === 'IN_PROGESS')\"\n            [ngClass]=\"gridType == 'list' ? 'flex-1 pr-3 md:pr-5 py-1' : ''\">\n            <div class=\"price\">\n                <div class=\"paid flex items-baseline\" *ngIf=\"eventData.minimumTicketPrice\">\n                    <div class=\"min-price\">\n                        <span class=\"md:text-lg font-semibold\" [class.text-primary]=\"theme=='townscript'\"\n                            [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-lg' : ''\">\n                            {{eventData.minimumTicketPrice | currency:eventData.minimumTicketPriceCurrency :\n                            'symbol':'1.0-0'}}\n                        </span>\n                    </div>\n                    <span class=\"text-xs md:text-sm px-1 opacity-75\">onwards</span>\n                </div>\n                <div class=\"free\" *ngIf=\"!eventData.minimumTicketPrice\">\n                    <span class=\"text-primary md:text-lg font-semibold\"\n                        [ngClass]=\"gridType == 'list' ? 'text-sm md:text-base lg:text-lg' : ''\">Free</span>\n                </div>\n            </div>\n\n            <div class=\"online flex items-center border px-2 rounded-full\"\n                *ngIf=\"gridType=='grid' && eventData.onlineEvent && !cfData\">\n                <span class=\"online__indicator w-2 h-2 rounded-full mr-1\"></span>\n                <span class=\"online__text text-xs md:text-sm tracking-widest font-bold uppercase\">Online</span>\n            </div>\n\n            <div class=\"flex items-center px-2 rounded-full bg-gray-100 text-sm\"\n                *ngIf=\"gridType=='grid' && !eventData.onlineEvent && cfData && cfData.crowdFundedGoalStatus === 'REACHED'\">\n                <span>\uD83C\uDF89</span>\n                <span class=\"text-gray-700\">Goal Reached</span>\n            </div>\n\n            <div class=\"actions flex list-actions\" *ngIf=\"gridType=='list'\">\n                <div class=\"follow self-end px-2 md:px-3 lg:px-5\">\n                    <app-follow type=\"icon\" [followTypeId]=\"eventData.eventId\" [followType]=\"'EVENT'\" color=\"#563DE1\"\n                        (click)=\"$event.stopPropagation()\"></app-follow>\n                </div>\n                <div class=\"share rounded-full self-end cursor-pointer\" matRipple (click)=\"$event.stopPropagation()\">\n                    <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\"\n                        class=\"text-primary mdi mdi-share-variant text-lg md:text-2xl share\"\n                        (click)=\"shareEvent($event)\"></i>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"footer flex items-baseline\" *ngIf=\"cfData && cfData.crowdFundedGoalStatus === 'IN_PROGESS'\">\n            <div class=\"\" [hidden]=\"cfData && cfData.goalAmountReached === 0\">\n                <span class=\"font-bold text-primary\">{{cfData.goalPercentageReached}}%</span>\n                <span class=\"text-sm\"> goal reached</span>\n            </div>\n            <div class=\"\" [hidden]=\"cfData && cfData.goalAmountReached > 0\">\n                <span class=\"font-bold text-primary\">\n                    {{cfData.goalAmount | currency:cfData.goalCurrency : 'symbol':'1.0-0'}}\n                </span>\n                <span class=\"text-sm\"> target</span>\n            </div>\n            <div class=\"h-2 flex-1 ml-4 rounded-full bg-gray-400 goal-progress\"\n                [ngClass]=\"{'mr-4 my-4': gridType == 'list'}\">\n                <div class=\"w-0 h-2 rounded-full bg-green-500 goal-progress__mark\"\n                    [style.width]=\"cfData.goalPercentageReached > 1 ? cfData.goalPercentageReached+'%' : '1%'\">\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.bg-primary{background-color:#563de1}::ng-deep .event-name span{width:auto!important;padding-right:2px}@media (min-width:992px){::ng-deep .list-actions i{font-size:1.4rem!important}}::ng-deep .list-actions i{font-size:1.3rem}.card-container{z-index:0;transition:.2s ease-in;box-shadow:0 1px 10px rgba(0,0,0,.1)}.card-container:hover{transform:translateY(-2%);box-shadow:0 2px 15px rgba(0,0,0,.2)}.card-container .black-gradient{background:linear-gradient(180deg,rgba(0,0,0,.7) 0,transparent 95%)}.card-container .bubble{background-color:rgba(55,130,196,.78)}.card-container .flex-2{flex:2}.card-container .flex-3{flex:3}.card-container .share{transition:.15s}.card-container .share:hover{transform:scale(1.1)}.card-container .card-body .content{min-height:5em}.card-container .card-body .content .event-name,.card-container .card-body .content .secondary-details{color:#301c3f;display:flex;flex-wrap:wrap}@media (min-width:991px){.card-container .card-body .content .event-name{-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;max-width:19rem!important}}.card-container .card-body .content .location{text-overflow:ellipsis}@media (min-width:480px) and (max-width:991px){.card-container .card-body .content{min-height:5.5em}}@media (min-width:992px){.card-container .card-body .content{min-height:5.8em}}.card-container .card-body .gradient-separator{height:1px;background:linear-gradient(90deg,rgba(151,151,151,.01) 0,#c8c8c8 100%);opacity:.6}.card-container .card-body .online{border-color:#bbb}.card-container .card-body .online__indicator{background-color:#eb5757;height:8px;width:8px}.card-container .card-body .online__text{color:#4b4b4b}.card-container .card-body .goal-progress,.card-container .card-body .goal-progress__mark{height:6px}.card-container .card-body .goal-progress__mark{transition:width .5s linear}.card-container .card-body .live-now,.card-container .card-body ts-countdown{color:#eb5757}"]
        })
    ], TsListingEventCardComponent);
    return TsListingEventCardComponent;
}());
export { TsListingEventCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NhcmRzL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQvdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFPcEU7SUFzQkUscUNBQ1MsY0FBOEIsRUFDOUIsTUFBaUIsRUFDaEIsT0FBdUIsRUFDdkIsWUFBMEIsRUFDakIsV0FBd0I7UUFMM0MsaUJBTUM7UUFMUSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUNqQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQXRCbEMsYUFBUSxHQUFRLE1BQU0sQ0FBQztRQUN2QixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixVQUFLLEdB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QVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDOztnQkE3RXdCLGNBQWM7Z0JBQ3RCLFNBQVM7Z0JBQ1AsY0FBYztnQkFDVCxZQUFZO2dCQUNKLFdBQVc7O0lBeEJsQztRQUFSLEtBQUssRUFBRTtrRUFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs2REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFO2lFQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTt3RUFBeUI7SUFDeEI7UUFBUixLQUFLLEVBQUU7OERBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO2lFQUEwQjtJQUN6QjtRQUFSLEtBQUssRUFBRTsrREFBYztJQVRYLDJCQUEyQjtRQUx2QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLHN6VkFBc0Q7O1NBRXZELENBQUM7T0FDVywyQkFBMkIsQ0FzR3ZDO0lBQUQsa0NBQUM7Q0FBQSxBQXRHRCxJQXNHQztTQXRHWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9icm93c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3RpbWUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0xpc3RpbmdFdmVudENhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cblxuICBASW5wdXQoKSBldmVudERhdGE6IGFueTtcbiAgQElucHV0KCkgdHlwZTogYW55O1xuICBASW5wdXQoKSBncmlkVHlwZTogYW55ID0gJ2dyaWQnO1xuICBASW5wdXQoKSBoaWRlRm9sbG93U2hhcmUgPSBmYWxzZTtcbiAgQElucHV0KCkgdGhlbWUgPSAndG93bnNjcmlwdCc7XG4gIEBJbnB1dCgpIGhpZGVUaW1lOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgY2ZEYXRhPzogYW55O1xuICByb3V0ZXI6IFJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG5cbiAgLy8gZm9sbG93aW5nIGRhdGUgaXMgdG8gc2hvdyBjb3VudGRvd25cbiAgZXZlbnRTdGFydERhdGU6IERhdGU7XG4gIHN0YXJ0aW5nU29vbjogYm9vbGVhbjtcbiAgbm93TGl2ZSA9IDA7XG5cbiAgaG9tZVVybDogYW55O1xuICBzdWJPYmplY3Q6IGFueTtcbiAgdXJsQXJyYXk6IHN0cmluZ1tdO1xuICBkZWZhdWx0Q2FyZEltYWdlVXJsID0gY29uZmlnLnMzQmFzZVVybCArICd0b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvTGlzdGluZ3NTdGF0aWMvZGVmYXVsdC1jYXJkLmpwZyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSBicm93c2VyOiBCcm93c2VyU2VydmljZSxcbiAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGltZVNlcnZpY2U6IFRpbWVTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmJ1aWxkVXJsQXJyYXkoKTtcbiAgICBpZiAodGhpcy5ldmVudERhdGEuY2FyZEltYWdlVXJsICYmIHRoaXMuZXZlbnREYXRhLmNhcmRJbWFnZVVybC5pbmRleE9mKGNvbmZpZy5zM0J1Y2tldCkgPiAtMSkge1xuICAgICAgdGhpcy5ldmVudERhdGEuY2FyZEltYWdlVXJsID0gY29uZmlnLmltZ2l4VXJsICtcbiAgICAgICAgdGhpcy5ldmVudERhdGEuY2FyZEltYWdlVXJsLnNwbGl0KGNvbmZpZy5zM0J1Y2tldClbMV07XG4gICAgfVxuICAgIHRoaXMuc3ViT2JqZWN0ID0gdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSg8YW55PnJlcyk7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGFbJ2NvdW50cnknXSAmJiBkYXRhWydjaXR5J10pIHtcbiAgICAgICAgICB0aGlzLmhvbWVVcmwgPSAoJy8nICsgZGF0YVsnY291bnRyeSddICsgJy8nICsgZGF0YVsnY2l0eSddKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuZXZlbnREYXRhLm9ubGluZUV2ZW50KSB7XG4gICAgICB0aGlzLmV2ZW50U3RhcnREYXRlID0gRGF0ZVRpbWUuZnJvbUlTTyh0aGlzLmV2ZW50RGF0YS5zdGFydFRpbWUpLnRvSlNEYXRlKCk7XG4gICAgICBpZiAodGhpcy5ldmVudERhdGEucmVjdXJyZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRTdGFydERhdGUgPSB0aGlzLnRpbWVTZXJ2aWNlLm5leHRPY2N1cmVuY2VGcm9tUlJ1bGUodGhpcy5ldmVudFN0YXJ0RGF0ZSxcbiAgICAgICAgICBEYXRlVGltZS5mcm9tSVNPKHRoaXMuZXZlbnREYXRhLmVuZFRpbWUpLnRvSlNEYXRlKCksXG4gICAgICAgICAgdGhpcy5ldmVudERhdGEucmVjdXJyZW5jZVJ1bGUsIHRoaXMuZXZlbnREYXRhLnJlY3VycmVuY2VTdGFydFRpbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFydGluZ1Nvb24gPSB0aGlzLnRpbWVTZXJ2aWNlLmRhdGVUaW1lV2l0aGluSG91cnModGhpcy5ldmVudFN0YXJ0RGF0ZSwgMTApO1xuICAgIH1cbiAgfVxuXG5cbiAgYnVpbGRVcmxBcnJheSA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5yb3V0ZXIudXJsKSB7XG4gICAgICB0aGlzLnVybEFycmF5ID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KFwiP1wiKVswXS5yZXBsYWNlKCcvJywgJycpLnNwbGl0KCcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsQXJyYXkgPSBbJ2luJ107XG4gICAgfVxuICB9XG5cblxuICBzaGFyZUV2ZW50ID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5icm93c2VyLmlzTW9iaWxlKCkgJiYgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKSB7XG4gICAgICB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHRleHQ6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHVybDogY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudERhdGEuc2hvcnROYW1lLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nLm9wZW4oU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LCB7XG4gICAgICAgIC8vIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICBkYXRhOiB7IGV2ZW50OiB0aGlzLmV2ZW50RGF0YSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRMb2NhdGlvbiA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5ldmVudERhdGEgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5ldmVudERhdGEub25saW5lRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuICdPbmxpbmUnO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZXZlbnREYXRhLmxvY2FsaXR5ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudERhdGEubG9jYWxpdHkgKyAnLCAnICsgdGhpcy5ldmVudERhdGEuY2l0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50RGF0YS5jaXR5O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3ViT2JqZWN0KVxuICAgICAgdGhpcy5zdWJPYmplY3QudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=