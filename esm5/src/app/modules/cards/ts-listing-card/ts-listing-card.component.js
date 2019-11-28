import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';
import { ShareEventModalComponent } from './share-event-modal/share-event-modal.component';
import { BrowserService } from '../../../core/browser.service';
import { config } from '../../../core/app-config';
import { PlaceService } from '../../layout/components/ts-header/place.service';
var TsListingCardComponent = /** @class */ (function () {
    function TsListingCardComponent(dialog, browser, placeService) {
        var _this = this;
        this.dialog = dialog;
        this.browser = browser;
        this.placeService = placeService;
        this.router = config.router;
        this.urgencyMessage = false;
        this.goingCounter = false;
        this.moreIcons = false;
        this.defaultCardImageUrl = config.s3BaseUrl + 'townscript-common-resources/ListingsStatic/default-card.jpg';
        this.shareEvent = function () {
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
    TsListingCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.placeService.place.pipe(take(1)).subscribe(function (res) {
            var data = JSON.parse(res);
            _this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
        });
        // this.eventData = {
        //   'id': 1, 'eventId': 87429,
        //   'name': 'first event with more content to test text clamp with more text',
        //   'shortName': 'test-once-more-123442',
        //   'startTime': '2019-07-25T10:30:00.000+0000', 'endTime': '2019-07-25T11:30:00.000+0000',
        //   'displayName': null, 'shortDescription': null, 'eventTimeZone': 'Asia/Calcutta',
        //   'timeZoneDisplayName': null, 'venueLocation': null, 'city': 'Pune',
        //   'latitude': 18.513217600000000, 'longitude': 73.928873200000000,
        //   'coverImageUrl': 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/city-banners/large/pune.jpg',
        //   'cardImageUrl': 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/city-banners/mobile/pune.jpg',
        //   'publicEvent': true, 'live': true, 'categoryId': null, 'eventTypeId': 17,
        //   'minimumTicketPrice': 3456, 'minimumTicketPriceCurrency': 'INR',
        //   'organizerIsTrusted': true, 'soldOutFlag': false, 'reportFlag': false,
        //   'paid': false, 'onlineEvent': false, 'organizerId': 3080, 'pageViews': null,
        //   'organizerScore': null, 'ticketsSold': 0, 'roTicketsSold': null, 'ticketsRemaining': 0,
        //   'farDuration': null, 'townscriptIR': null, 'score': null, 'recurrent': false,
        //   'keywords': [{ 'id': 165, 'topicKeywordName': 'testing', 'topicKeywordCode': 'testing', 'topicId': 175, 'weight': 1, 'topicKeywordPageTitle': null, 'topicKeywordPageDescription': null }, { 'id': 165, 'topicKeywordName': 'testing', 'topicKeywordCode': 'testing', 'topicId': 175, 'weight': 1, 'topicKeywordPageTitle': null, 'topicKeywordPageDescription': null }, { 'id': 141, 'topicKeywordName': 'party', 'topicKeywordCode': 'party', 'topicId': 150, 'weight': 2, 'topicKeywordPageTitle': null, 'topicKeywordPageDescription': null }]
        // };
        //
        // this.topicData = {
        //   cardImageUrl: 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/category/748x220/marathon1.jpg',
        //   name: 'Marathons in Pune',
        //   subTitle: 'Upcoming Running Events In Pune - 5K, 10K, Half & Full Marathon In Pune',
        //   topicDescription: 'Being fit is the new trend. The fitness community grown in number with increased participation in running and marathons in Pune. Upcoming Running Events In Pune involves all types of run, like the city run, trail run, fun run, social cause run and many more. Nearly every week there are activities planned by running groups in Pune. Some of the most anticipated runs are full marathon in Pune, half marathon, 10K and 5K marathon in Pune. Pune marathon events best suited for everyone, be it kids, elders, seasonal runners or newbies.'
        // };
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
    TsListingCardComponent = tslib_1.__decorate([
        Component({
            selector: 'ts-listing-card',
            template: "<div class=\"listing-container cursor-pointer overflow-hidden\"\n    [ngClass]=\"gridType=='list' ? 'rounded  my-4 mx-auto  flex' :'bg-white lg:flex lg:flex-col my-1 rounded w-full'\">\n    <div class=\"relative flex-none overflow-hidden text-center event-image\"\n        [ngClass]=\"gridType=='list' ? 'h-auto w-4/12 lg:w-2/5' : ' h-48 lg:h-auto lg:w-3/5 lg:w-full md:w-full p-24 sm:w-full '\"\n        [style.background-image]=\"eventData.cardImageUrl?'url(' + eventData.cardImageUrl + ')':'url(' + defaultCardImageUrl + ')'\">\n        <i class=\"top-0 right-0 pt-2 pr-2 text-white absolute mdi mdi-checkbox-marked-circle ml-1 pt-1 text-lg\"\n          *ngIf=\"eventData?.organizerIsTrusted\"\n          matTooltip=\"VERIFIED\"\n          matTooltipPosition=\"above\"\n          matTooltipClass=\"ts-card-tooltip\"></i>\n    </div>\n    <div class=\"flex flex-col justify-between leading-normal listing-container--content overflow-hidden\" [ngClass]=\"gridType=='list' ?' w-8/12  md:w-full'\n                     : ' w-full'\">\n        <div class=\"px-2 md:px-4 pt-3 pb-1\">\n            <div class=\"flex flex-row justify-between align-items-center\">\n                <span *ngIf=\"urgencyMessage \" class=\"text-md bg-orange-500 rounded text-md px-2 mr-2\">Featured</span>\n                <span *ngIf=\"urgencyMessage\" class=\"text-xs text-red-400\">Booked 20 times in the last 24 hrs</span>\n                <span *ngIf=\"urgencyMessage\" class=\"bg-white rounded-l-full px-2\">\n                    <i class=\"material-icons align-bottom pr-1 hidden\">remove_red_eye</i>\n                    <strong class=\"text-xs\">12 Viewing right now</strong>\n                </span>\n            </div>\n            <div class=\"font-303030 capitalize text-base md:text-lg mb-1\" [clamp]=\"2\">{{eventData.name | titlecase}}\n            </div>\n            <div class=\"md:flex text-xs md:flex-wrap\" [ngClass]=\"gridType=='list' ? '' : 'flex flex-wrap'\">\n                <div class=\"mr-2 flex items-center\">\n                    <i class=\"mdi mdi-calendar-today text-base md:text-xl pr-1  align-bottom\"></i>\n                    <span\n                        class=\"text-gray-700 font-bold\">{{[eventData.startTime, eventData.endTime] | dateRange: eventData.recurrent: {'startTime': eventData.recurrenceStartTime,'endTime': eventData.recurrenceEndTime,'recurrenceRule': eventData.recurrenceRule} }}</span>\n                </div>\n                <div class=\"mr-2 flex items-center\">\n                    <i class=\"mdi mdi-map-marker pr-1 text-base md:text-xl  align-bottom\"></i>\n                    <span class=\"text-gray-700 font-bold\">{{eventData.city}}</span>\n                </div>\n                <div *ngIf=\"goingCounter\" class=\"mr-2\">\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <span class=\"font-323E48 font-bold\">700</span>\n                </div>\n            </div>\n            <!-- <div *ngIf=\"featuredCard\" class=\"text-sm\">Heres goes some 2 line data which describes about the event.</div> -->\n            <div class=\"py-2 pr-2 flex justify-between\">\n                <div *ngIf=\"moreIcons\" id=\"set-of-icons\" class=\"flex\">\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                </div>\n                <div class=\"overflow-hidden\" [ngClass]=\"gridType=='list' ? 'hidden md:flex md:flex-wrap' : 'flex flex-wrap'\">\n                    <a *ngFor=\"let key of eventData?.keywords| slice:0:3\" [routerLink]=\"homeUrl + '/' + key.topicKeywordCode\">\n                      <span appDataAnalytics  eventLabel=\"keyword\" clickLocation=\"\" class=\"pr-2 text-gray-600 font-normal text-sm sm:text-xs hover:text-gray-900 hover:underline\">\n                        #{{key.topicKeywordName}}\n                      </span>\n                    </a>\n                </div>\n            </div>\n        </div>\n        <div\n            class=\"h-10 relative bottom-purple-bar border-t border-gray-300 flex items-center justify-between py-2 px-4 sm:rounded-b-lg lg:rounded-none\"  *ngIf=\"eventData\">\n            <div class=\"text-sm flex items-center z-50\">\n                <app-follow type=\"icon\" [followTypeId]=\"eventData.id\" [followType]=\"'EVENT'\" color=\"#553c9a\"\n                    (click)=\"$event.stopPropagation()\"></app-follow>\n                <!-- <i class=\"mdi mdi-heart-outline text-2xl mr-2\"></i> -->\n                <div  class=\"px-2 rounded-full\" matRipple>\n                    <i appDataAnalytics eventLabel=\"share\" clickLocation=\"\" class=\"mdi mdi-share-variant text-2xl share\" (click)=\"shareEvent();$event.stopPropagation()\"></i>\n                </div>\n            </div>\n            <div class=\"flex items-center z-50\">\n                <span class=\"align-text-bottom price-container font-323E48 text-base font-semibold\"\n                    *ngIf=\"eventData.minimumTicketPrice\">\n                    {{eventData.minimumTicketPrice | currency:eventData.minimumTicketPriceCurrency : 'symbol':'1.0-0'}} <span\n                        class=\"hidden md:inline text-sm font-normal\">onwards</span></span>\n                <span *ngIf=\"!eventData.minimumTicketPrice \">Free</span>\n                <i class=\"mdi mdi-arrow-right text-2xl ml-2\"></i>\n            </div>\n        </div>\n    </div>\n</div>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}::ng-deep .ts-card-tooltip{background-color:#666;color:#fff;font-size:12px;opacity:.98;white-space:pre-line}.listing-container{border:1px solid rgba(0,0,0,.13);border-radius:5px;font-family:Lato,sans-serif}.listing-container:hover{box-shadow:0 2px 8px 0 rgba(0,0,0,.2)}.listing-container:hover .bottom-purple-bar{box-shadow:0 2px 8px 0 rgba(0,0,0,.2);border-radius:0 0 4px}.listing-container:hover .bottom-purple-bar i,.listing-container:hover .bottom-purple-bar span{color:#fff!important}.listing-container:hover .bottom-purple-bar .mdi-arrow-right{-webkit-transform:translateX(5px);transform:translateX(5px)}.listing-container:hover .bottom-purple-bar::after{left:0!important;width:100%!important;opacity:1!important;border-radius:0!important}.listing-container .event-image{background-size:100% 100%}.listing-container .font-323E48{color:#323e48}.listing-container .font-303030{color:#303030}.listing-container .listing-container--content{background-color:#eee}.listing-container .listing-container--content .bottom-purple-bar{z-index:100;background-color:transparent}.listing-container .listing-container--content .bottom-purple-bar::after{content:'';position:absolute;left:0;top:0;right:0;bottom:0;background:linear-gradient(138.55deg,#a165c4 0,#4d2370 100%);opacity:0;z-index:0}.listing-container .listing-container--content .bottom-purple-bar .mdi-arrow-right,.listing-container .listing-container--content .bottom-purple-bar::after{-webkit-transition:.3s ease-in-out;transition:.3s ease-in-out}.listing-container .listing-container--content .price-container{font-size:15px}.listing-container .listing-container--featured-content{background-color:#fff}.listing-container .listing-container--featured-content .bottom-purple-bar{-webkit-transition:1s ease-in;transition:1s ease-in}.listing-container .listing-container--featured-content .price-container{font-size:15px}.listing-container i{color:#683592}.listing-container .share:hover{-webkit-transition:.15s;transition:.15s;font-size:1.875rem}:host ::ng-deep .listing-container:hover .bottom-purple-bar i{color:#fff}@media (min-width:991px){.listing-container .listing-container--content{min-height:195px}}.topic-container{font-family:Lato;min-height:460px}.topic-container .subTitle{color:#263240}.topic-container .keywords,.topic-container i{color:#683592}.topic-container .keywords span{border:1.57px solid #683592}"]
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, BrowserService, PlaceService])
    ], TsListingCardComponent);
    return TsListingCardComponent;
}());
export { TsListingCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvY2FyZHMvdHMtbGlzdGluZy1jYXJkL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saURBQWlELENBQUM7QUFPL0U7SUFjRSxnQ0FBbUIsTUFBaUIsRUFBVSxPQUF1QixFQUFVLFlBQTBCO1FBQXpHLGlCQUE4RztRQUEzRixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVJ6RyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUV2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHdCQUFtQixHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsNkRBQTZELENBQUM7UUFJdkcsZUFBVSxHQUFHO1lBQ1gsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDNUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEIsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtvQkFDMUIsSUFBSSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtvQkFDekIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztpQkFDdEQsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7b0JBQ3pDLGtCQUFrQjtvQkFDbEIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUU7aUJBQ2hDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFBO0lBZjRHLENBQUM7SUFpQjlHLHlDQUFRLEdBQVI7UUFBQSxpQkErQkM7UUE5QkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDakQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBTSxHQUFHLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxxQkFBcUI7UUFDckIsK0JBQStCO1FBQy9CLCtFQUErRTtRQUMvRSwwQ0FBMEM7UUFDMUMsNEZBQTRGO1FBQzVGLHFGQUFxRjtRQUNyRix3RUFBd0U7UUFDeEUscUVBQXFFO1FBQ3JFLG9IQUFvSDtRQUNwSCxvSEFBb0g7UUFDcEgsOEVBQThFO1FBQzlFLHFFQUFxRTtRQUNyRSwyRUFBMkU7UUFDM0UsaUZBQWlGO1FBQ2pGLDRGQUE0RjtRQUM1RixrRkFBa0Y7UUFDbEYsdWhCQUF1aEI7UUFDdmhCLEtBQUs7UUFDTCxFQUFFO1FBQ0YscUJBQXFCO1FBQ3JCLG9IQUFvSDtRQUNwSCwrQkFBK0I7UUFDL0IseUZBQXlGO1FBQ3pGLDhpQkFBOGlCO1FBQzlpQixLQUFLO0lBRVAsQ0FBQztJQTVEUTtRQUFSLEtBQUssRUFBRTs7NkRBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7d0RBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7NkRBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7NERBQVU7SUFMUCxzQkFBc0I7UUFMbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixpcUxBQStDOztTQUVoRCxDQUFDO2lEQWUyQixTQUFTLEVBQW1CLGNBQWMsRUFBd0IsWUFBWTtPQWQ5RixzQkFBc0IsQ0FnRWxDO0lBQUQsNkJBQUM7Q0FBQSxBQWhFRCxJQWdFQztTQWhFWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYnJvd3Nlci5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWxpc3RpbmctY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1saXN0aW5nLWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1saXN0aW5nLWNhcmQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0xpc3RpbmdDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBldmVudERhdGE7XG4gIEBJbnB1dCgpIHR5cGU7XG4gIEBJbnB1dCgpIHRvcGljRGF0YTtcbiAgQElucHV0KCkgZ3JpZFR5cGU7XG4gIHJvdXRlciA9IGNvbmZpZy5yb3V0ZXI7XG5cbiAgdXJnZW5jeU1lc3NhZ2UgPSBmYWxzZTtcbiAgaG9tZVVybDogc3RyaW5nO1xuICBnb2luZ0NvdW50ZXIgPSBmYWxzZTtcbiAgbW9yZUljb25zID0gZmFsc2U7XG4gIGRlZmF1bHRDYXJkSW1hZ2VVcmwgPSBjb25maWcuczNCYXNlVXJsICsgJ3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9MaXN0aW5nc1N0YXRpYy9kZWZhdWx0LWNhcmQuanBnJztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgYnJvd3NlcjogQnJvd3NlclNlcnZpY2UsIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UpIHsgfVxuXG4gIHNoYXJlRXZlbnQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYnJvd3Nlci5pc01vYmlsZSgpICYmIHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvclsnc2hhcmUnXSkge1xuICAgICAgd2luZG93Lm5hdmlnYXRvclsnc2hhcmUnXSh7XG4gICAgICAgIHRpdGxlOiB0aGlzLmV2ZW50RGF0YS5uYW1lLFxuICAgICAgICB0ZXh0OiB0aGlzLmV2ZW50RGF0YS5uYW1lLFxuICAgICAgICB1cmw6IGNvbmZpZy5iYXNlVXJsICsgJ2UvJyArIHRoaXMuZXZlbnREYXRhLnNob3J0TmFtZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpYWxvZy5vcGVuKFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCwge1xuICAgICAgICAvLyB3aWR0aDogJzUwMHB4JyxcbiAgICAgICAgZGF0YTogeyBldmVudDogdGhpcy5ldmVudERhdGEgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wbGFjZVNlcnZpY2UucGxhY2UucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKDxhbnk+cmVzKTtcbiAgICAgIHRoaXMuaG9tZVVybCA9ICgnLycgKyBkYXRhWydjb3VudHJ5J10gKyAnLycgKyBkYXRhWydjaXR5J10pLnRvTG93ZXJDYXNlKCk7XG4gICAgfSk7XG4gICAgLy8gdGhpcy5ldmVudERhdGEgPSB7XG4gICAgLy8gICAnaWQnOiAxLCAnZXZlbnRJZCc6IDg3NDI5LFxuICAgIC8vICAgJ25hbWUnOiAnZmlyc3QgZXZlbnQgd2l0aCBtb3JlIGNvbnRlbnQgdG8gdGVzdCB0ZXh0IGNsYW1wIHdpdGggbW9yZSB0ZXh0JyxcbiAgICAvLyAgICdzaG9ydE5hbWUnOiAndGVzdC1vbmNlLW1vcmUtMTIzNDQyJyxcbiAgICAvLyAgICdzdGFydFRpbWUnOiAnMjAxOS0wNy0yNVQxMDozMDowMC4wMDArMDAwMCcsICdlbmRUaW1lJzogJzIwMTktMDctMjVUMTE6MzA6MDAuMDAwKzAwMDAnLFxuICAgIC8vICAgJ2Rpc3BsYXlOYW1lJzogbnVsbCwgJ3Nob3J0RGVzY3JpcHRpb24nOiBudWxsLCAnZXZlbnRUaW1lWm9uZSc6ICdBc2lhL0NhbGN1dHRhJyxcbiAgICAvLyAgICd0aW1lWm9uZURpc3BsYXlOYW1lJzogbnVsbCwgJ3ZlbnVlTG9jYXRpb24nOiBudWxsLCAnY2l0eSc6ICdQdW5lJyxcbiAgICAvLyAgICdsYXRpdHVkZSc6IDE4LjUxMzIxNzYwMDAwMDAwMCwgJ2xvbmdpdHVkZSc6IDczLjkyODg3MzIwMDAwMDAwMCxcbiAgICAvLyAgICdjb3ZlckltYWdlVXJsJzogJ2h0dHBzOi8vczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9jaXR5LWJhbm5lcnMvbGFyZ2UvcHVuZS5qcGcnLFxuICAgIC8vICAgJ2NhcmRJbWFnZVVybCc6ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvY2l0eS1iYW5uZXJzL21vYmlsZS9wdW5lLmpwZycsXG4gICAgLy8gICAncHVibGljRXZlbnQnOiB0cnVlLCAnbGl2ZSc6IHRydWUsICdjYXRlZ29yeUlkJzogbnVsbCwgJ2V2ZW50VHlwZUlkJzogMTcsXG4gICAgLy8gICAnbWluaW11bVRpY2tldFByaWNlJzogMzQ1NiwgJ21pbmltdW1UaWNrZXRQcmljZUN1cnJlbmN5JzogJ0lOUicsXG4gICAgLy8gICAnb3JnYW5pemVySXNUcnVzdGVkJzogdHJ1ZSwgJ3NvbGRPdXRGbGFnJzogZmFsc2UsICdyZXBvcnRGbGFnJzogZmFsc2UsXG4gICAgLy8gICAncGFpZCc6IGZhbHNlLCAnb25saW5lRXZlbnQnOiBmYWxzZSwgJ29yZ2FuaXplcklkJzogMzA4MCwgJ3BhZ2VWaWV3cyc6IG51bGwsXG4gICAgLy8gICAnb3JnYW5pemVyU2NvcmUnOiBudWxsLCAndGlja2V0c1NvbGQnOiAwLCAncm9UaWNrZXRzU29sZCc6IG51bGwsICd0aWNrZXRzUmVtYWluaW5nJzogMCxcbiAgICAvLyAgICdmYXJEdXJhdGlvbic6IG51bGwsICd0b3duc2NyaXB0SVInOiBudWxsLCAnc2NvcmUnOiBudWxsLCAncmVjdXJyZW50JzogZmFsc2UsXG4gICAgLy8gICAna2V5d29yZHMnOiBbeyAnaWQnOiAxNjUsICd0b3BpY0tleXdvcmROYW1lJzogJ3Rlc3RpbmcnLCAndG9waWNLZXl3b3JkQ29kZSc6ICd0ZXN0aW5nJywgJ3RvcGljSWQnOiAxNzUsICd3ZWlnaHQnOiAxLCAndG9waWNLZXl3b3JkUGFnZVRpdGxlJzogbnVsbCwgJ3RvcGljS2V5d29yZFBhZ2VEZXNjcmlwdGlvbic6IG51bGwgfSwgeyAnaWQnOiAxNjUsICd0b3BpY0tleXdvcmROYW1lJzogJ3Rlc3RpbmcnLCAndG9waWNLZXl3b3JkQ29kZSc6ICd0ZXN0aW5nJywgJ3RvcGljSWQnOiAxNzUsICd3ZWlnaHQnOiAxLCAndG9waWNLZXl3b3JkUGFnZVRpdGxlJzogbnVsbCwgJ3RvcGljS2V5d29yZFBhZ2VEZXNjcmlwdGlvbic6IG51bGwgfSwgeyAnaWQnOiAxNDEsICd0b3BpY0tleXdvcmROYW1lJzogJ3BhcnR5JywgJ3RvcGljS2V5d29yZENvZGUnOiAncGFydHknLCAndG9waWNJZCc6IDE1MCwgJ3dlaWdodCc6IDIsICd0b3BpY0tleXdvcmRQYWdlVGl0bGUnOiBudWxsLCAndG9waWNLZXl3b3JkUGFnZURlc2NyaXB0aW9uJzogbnVsbCB9XVxuICAgIC8vIH07XG4gICAgLy9cbiAgICAvLyB0aGlzLnRvcGljRGF0YSA9IHtcbiAgICAvLyAgIGNhcmRJbWFnZVVybDogJ2h0dHBzOi8vczMuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3Rvd25zY3JpcHQtY29tbW9uLXJlc291cmNlcy9jYXRlZ29yeS83NDh4MjIwL21hcmF0aG9uMS5qcGcnLFxuICAgIC8vICAgbmFtZTogJ01hcmF0aG9ucyBpbiBQdW5lJyxcbiAgICAvLyAgIHN1YlRpdGxlOiAnVXBjb21pbmcgUnVubmluZyBFdmVudHMgSW4gUHVuZSAtIDVLLCAxMEssIEhhbGYgJiBGdWxsIE1hcmF0aG9uIEluIFB1bmUnLFxuICAgIC8vICAgdG9waWNEZXNjcmlwdGlvbjogJ0JlaW5nIGZpdCBpcyB0aGUgbmV3IHRyZW5kLiBUaGUgZml0bmVzcyBjb21tdW5pdHkgZ3Jvd24gaW4gbnVtYmVyIHdpdGggaW5jcmVhc2VkIHBhcnRpY2lwYXRpb24gaW4gcnVubmluZyBhbmQgbWFyYXRob25zIGluIFB1bmUuIFVwY29taW5nIFJ1bm5pbmcgRXZlbnRzIEluIFB1bmUgaW52b2x2ZXMgYWxsIHR5cGVzIG9mIHJ1biwgbGlrZSB0aGUgY2l0eSBydW4sIHRyYWlsIHJ1biwgZnVuIHJ1biwgc29jaWFsIGNhdXNlIHJ1biBhbmQgbWFueSBtb3JlLiBOZWFybHkgZXZlcnkgd2VlayB0aGVyZSBhcmUgYWN0aXZpdGllcyBwbGFubmVkIGJ5IHJ1bm5pbmcgZ3JvdXBzIGluIFB1bmUuIFNvbWUgb2YgdGhlIG1vc3QgYW50aWNpcGF0ZWQgcnVucyBhcmUgZnVsbCBtYXJhdGhvbiBpbiBQdW5lLCBoYWxmIG1hcmF0aG9uLCAxMEsgYW5kIDVLIG1hcmF0aG9uIGluIFB1bmUuIFB1bmUgbWFyYXRob24gZXZlbnRzIGJlc3Qgc3VpdGVkIGZvciBldmVyeW9uZSwgYmUgaXQga2lkcywgZWxkZXJzLCBzZWFzb25hbCBydW5uZXJzIG9yIG5ld2JpZXMuJ1xuICAgIC8vIH07XG5cbiAgfVxuXG59XG4iXX0=