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
        this.navigateToListing = function (code) {
            _this.router.navigate([_this.homeUrl + '/' + code]);
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
            template: "<div class=\"listing-container cursor-pointer\"\n    [ngClass]=\"gridType=='list' ? 'rounded  my-4 mx-auto  flex' :'bg-white lg:flex lg:flex-col my-1 rounded w-full'\">\n    <div class=\"relative flex-none overflow-hidden text-center event-image\"\n        [ngClass]=\"gridType=='list' ? 'h-auto w-4/12 lg:w-2/5' : ' h-48 lg:h-auto lg:w-3/5 lg:w-full md:w-full p-24 sm:w-full '\"\n        [style.background-image]=\"eventData.cardImageUrl?'url(' + eventData.cardImageUrl + ')':'url(' + defaultCardImageUrl + ')'\">\n        <i class=\"top-0 right-0 pt-2 pr-2 text-white absolute mdi mdi-checkbox-marked-circle ml-1 pt-1 text-lg\"\n          *ngIf=\"eventData.organizerIsTrusted\"\n          matTooltip=\"VERIFIED\"\n          matTooltipPosition=\"above\"\n          matTooltipClass=\"ts-card-tooltip\"></i>\n    </div>\n    <div class=\"flex flex-col justify-between leading-normal listing-container--content\" [ngClass]=\"gridType=='list' ?' w-8/12  md:w-full'\n                     : ' w-full'\">\n        <div class=\"px-2 md:px-4 pt-3 pb-1\">\n            <div class=\"flex flex-row justify-between align-items-center\">\n                <span *ngIf=\"urgencyMessage \" class=\"text-md bg-orange-500 rounded text-md px-2 mr-2\">Featured</span>\n                <span *ngIf=\"urgencyMessage\" class=\"text-xs text-red-400\">Booked 20 times in the last 24 hrs</span>\n                <span *ngIf=\"urgencyMessage\" class=\"bg-white rounded-l-full px-2\">\n                    <i class=\"material-icons align-bottom pr-1 hidden\">remove_red_eye</i>\n                    <strong class=\"text-xs\">12 Viewing right now</strong>\n                </span>\n            </div>\n            <div class=\"font-303030 capitalize text-base md:text-xl mb-1\" [clamp]=\"2\">{{eventData.name | titlecase}}\n            </div>\n            <div class=\"md:flex text-xs \">\n                <div class=\"mr-2 flex items-center\">\n                    <i class=\"mdi mdi-calendar-today text-base md:text-xl pr-1  align-bottom\"></i>\n                    <span\n                        class=\"text-gray-700 font-bold\">{{[eventData.startTime, eventData.endTime] | dateRange}}</span>\n                </div>\n                <div class=\"mr-2 flex items-center\">\n                    <i class=\"mdi mdi-map-marker pr-1 text-base md:text-xl  align-bottom\"></i>\n                    <span class=\"text-gray-700 font-bold\">{{eventData.city}}</span>\n                </div>\n                <div *ngIf=\"goingCounter\" class=\"mr-2\">\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <span class=\"font-323E48 font-bold\">700</span>\n                </div>\n            </div>\n            <!-- <div *ngIf=\"featuredCard\" class=\"text-sm\">Heres goes some 2 line data which describes about the event.</div> -->\n            <div class=\"py-2 pr-2 flex justify-between\">\n                <div *ngIf=\"moreIcons\" id=\"set-of-icons\" class=\"flex\">\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                </div>\n                <div [ngClass]=\"gridType=='list' ? 'hidden md:flex' : 'flex'\">\n                    <span class=\"pr-2 text-gray-600 font-normal text-sm sm:text-xs hover:text-gray-900 hover:underline\"\n                        *ngFor=\"let key of eventData.keywords\"\n                        (click)=\"navigateToListing(key.topicKeywordCode)\">#{{key.topicKeywordName}}</span>\n                </div>\n            </div>\n        </div>\n        <div\n            class=\"h-10 bottom-purple-bar border-t border-gray-300 flex items-center justify-between py-2 px-4 sm:rounded-b-lg lg:rounded-none\">\n            <div class=\"text-sm flex items-center\">\n                <app-follow type=\"icon\" [followTypeId]=\"eventData.id\" [followType]=\"'EVENT'\" color=\"#553c9a\"\n                    (click)=\"$event.stopPropagation()\"></app-follow>\n                <!-- <i class=\"mdi mdi-heart-outline text-2xl mr-2\"></i> -->\n                <div class=\"px-2 rounded-full\" matRipple>\n                    <i class=\"mdi mdi-share-variant text-2xl share\" (click)=\"shareEvent();$event.stopPropagation()\"></i>\n                </div>\n            </div>\n            <div class=\"flex items-center\">\n                <span class=\"align-text-bottom price-container font-323E48 text-base font-semibold\"\n                    *ngIf=\"eventData.minimumTicketPrice\">\n                    {{eventData.minimumTicketPrice | currency:eventData.minimumTicketPriceCurrency}} <span\n                        class=\"hidden md:inline text-sm font-normal\">onwards</span></span>\n                <span *ngIf=\"!eventData.minimumTicketPrice \">Free</span>\n                <i class=\"mdi mdi-arrow-right text-2xl ml-2\"></i>\n            </div>\n        </div>\n    </div>\n</div>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}::ng-deep .ts-card-tooltip{background-color:#666;color:#fff;font-size:12px;opacity:.98;white-space:pre-line}.listing-container{border:1px solid rgba(0,0,0,.13);border-radius:5px;font-family:Lato,sans-serif}.listing-container:hover{box-shadow:0 2px 8px 0 rgba(0,0,0,.2)}.listing-container:hover .bottom-purple-bar{box-shadow:0 2px 8px 0 rgba(0,0,0,.2);background:linear-gradient(138.55deg,#a165c4 0,#4d2370 100%);border-radius:0 0 4px;-webkit-transition:1.3s;transition:1.3s}.listing-container:hover .bottom-purple-bar i,.listing-container:hover .bottom-purple-bar span{color:#fff!important}.listing-container .event-image{background-size:100% 100%}.listing-container .font-323E48{color:#323e48}.listing-container .font-303030{color:#303030}.listing-container .listing-container--content{background-color:#eee}.listing-container .listing-container--content .bottom-purple-bar{-webkit-transition:background 1s ease-out;transition:background 1s ease-out}.listing-container .listing-container--content .price-container{font-size:15px}.listing-container .listing-container--featured-content{background-color:#fff}.listing-container .listing-container--featured-content .bottom-purple-bar{-webkit-transition:1s ease-in;transition:1s ease-in}.listing-container .listing-container--featured-content .price-container{font-size:15px}.listing-container i{color:#683592}.listing-container .share:hover{-webkit-transition:.15s;transition:.15s;font-size:1.875rem}:host ::ng-deep .listing-container:hover .bottom-purple-bar i{color:#fff}@media (min-width:991px){.listing-container .listing-container--content{min-height:195px}}.topic-container{font-family:Lato;min-height:460px}.topic-container .subTitle{color:#263240}.topic-container .keywords,.topic-container i{color:#683592}.topic-container .keywords span{border:1.57px solid #683592}"]
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, BrowserService, PlaceService])
    ], TsListingCardComponent);
    return TsListingCardComponent;
}());
export { TsListingCardComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbGlzdGluZy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvY2FyZHMvdHMtbGlzdGluZy1jYXJkL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saURBQWlELENBQUM7QUFPL0U7SUFjRSxnQ0FBbUIsTUFBaUIsRUFBVSxPQUF1QixFQUFVLFlBQTBCO1FBQXpHLGlCQUE4RztRQUEzRixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVJ6RyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUV2QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHdCQUFtQixHQUFHLE1BQU0sQ0FBQyxTQUFTLEdBQUcsNkRBQTZELENBQUM7UUFJdkcsZUFBVSxHQUFHO1lBQ1gsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDNUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEIsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtvQkFDMUIsSUFBSSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtvQkFDekIsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUztpQkFDdEQsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7b0JBQ3pDLGtCQUFrQjtvQkFDbEIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLEVBQUU7aUJBQ2hDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsc0JBQWlCLEdBQUcsVUFBQyxJQUFJO1lBQ3ZCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUE7SUFuQjRHLENBQUM7SUFxQjlHLHlDQUFRLEdBQVI7UUFBQSxpQkE4QkM7UUE3QkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDakQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBTSxHQUFHLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxxQkFBcUI7UUFDckIsK0JBQStCO1FBQy9CLCtFQUErRTtRQUMvRSwwQ0FBMEM7UUFDMUMsNEZBQTRGO1FBQzVGLHFGQUFxRjtRQUNyRix3RUFBd0U7UUFDeEUscUVBQXFFO1FBQ3JFLG9IQUFvSDtRQUNwSCxvSEFBb0g7UUFDcEgsOEVBQThFO1FBQzlFLHFFQUFxRTtRQUNyRSwyRUFBMkU7UUFDM0UsaUZBQWlGO1FBQ2pGLDRGQUE0RjtRQUM1RixrRkFBa0Y7UUFDbEYsdWhCQUF1aEI7UUFDdmhCLEtBQUs7UUFFTCxxQkFBcUI7UUFDckIsb0hBQW9IO1FBQ3BILCtCQUErQjtRQUMvQix5RkFBeUY7UUFDekYsOGlCQUE4aUI7UUFDOWlCLEtBQUs7SUFDUCxDQUFDO0lBL0RRO1FBQVIsS0FBSyxFQUFFOzs2REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOzt3REFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzs2REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFOzs0REFBVTtJQUxQLHNCQUFzQjtRQUxsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLGtvS0FBK0M7O1NBRWhELENBQUM7aURBZTJCLFNBQVMsRUFBbUIsY0FBYyxFQUF3QixZQUFZO09BZDlGLHNCQUFzQixDQW1FbEM7SUFBRCw2QkFBQztDQUFBLEFBbkVELElBbUVDO1NBbkVZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9icm93c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci9wbGFjZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHMtbGlzdGluZy1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRzTGlzdGluZ0NhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGV2ZW50RGF0YTtcbiAgQElucHV0KCkgdHlwZTtcbiAgQElucHV0KCkgdG9waWNEYXRhO1xuICBASW5wdXQoKSBncmlkVHlwZTtcbiAgcm91dGVyID0gY29uZmlnLnJvdXRlcjtcblxuICB1cmdlbmN5TWVzc2FnZSA9IGZhbHNlO1xuICBob21lVXJsOiBzdHJpbmc7XG4gIGdvaW5nQ291bnRlciA9IGZhbHNlO1xuICBtb3JlSWNvbnMgPSBmYWxzZTtcbiAgZGVmYXVsdENhcmRJbWFnZVVybCA9IGNvbmZpZy5zM0Jhc2VVcmwgKyAndG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL0xpc3RpbmdzU3RhdGljL2RlZmF1bHQtY2FyZC5qcGcnO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZywgcHJpdmF0ZSBicm93c2VyOiBCcm93c2VyU2VydmljZSwgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSkgeyB9XG5cbiAgc2hhcmVFdmVudCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5icm93c2VyLmlzTW9iaWxlKCkgJiYgd2luZG93Lm5hdmlnYXRvciAmJiB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKSB7XG4gICAgICB3aW5kb3cubmF2aWdhdG9yWydzaGFyZSddKHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHRleHQ6IHRoaXMuZXZlbnREYXRhLm5hbWUsXG4gICAgICAgIHVybDogY29uZmlnLmJhc2VVcmwgKyAnZS8nICsgdGhpcy5ldmVudERhdGEuc2hvcnROYW1lLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nLm9wZW4oU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LCB7XG4gICAgICAgIC8vIHdpZHRoOiAnNTAwcHgnLFxuICAgICAgICBkYXRhOiB7IGV2ZW50OiB0aGlzLmV2ZW50RGF0YSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuYXZpZ2F0ZVRvTGlzdGluZyA9IChjb2RlKTogdm9pZCA9PiB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuaG9tZVVybCArICcvJyArIGNvZGVdKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSg8YW55PnJlcyk7XG4gICAgICB0aGlzLmhvbWVVcmwgPSAoJy8nICsgZGF0YVsnY291bnRyeSddICsgJy8nICsgZGF0YVsnY2l0eSddKS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pO1xuICAgIC8vIHRoaXMuZXZlbnREYXRhID0ge1xuICAgIC8vICAgJ2lkJzogMSwgJ2V2ZW50SWQnOiA4NzQyOSxcbiAgICAvLyAgICduYW1lJzogJ2ZpcnN0IGV2ZW50IHdpdGggbW9yZSBjb250ZW50IHRvIHRlc3QgdGV4dCBjbGFtcCB3aXRoIG1vcmUgdGV4dCcsXG4gICAgLy8gICAnc2hvcnROYW1lJzogJ3Rlc3Qtb25jZS1tb3JlLTEyMzQ0MicsXG4gICAgLy8gICAnc3RhcnRUaW1lJzogJzIwMTktMDctMjVUMTA6MzA6MDAuMDAwKzAwMDAnLCAnZW5kVGltZSc6ICcyMDE5LTA3LTI1VDExOjMwOjAwLjAwMCswMDAwJyxcbiAgICAvLyAgICdkaXNwbGF5TmFtZSc6IG51bGwsICdzaG9ydERlc2NyaXB0aW9uJzogbnVsbCwgJ2V2ZW50VGltZVpvbmUnOiAnQXNpYS9DYWxjdXR0YScsXG4gICAgLy8gICAndGltZVpvbmVEaXNwbGF5TmFtZSc6IG51bGwsICd2ZW51ZUxvY2F0aW9uJzogbnVsbCwgJ2NpdHknOiAnUHVuZScsXG4gICAgLy8gICAnbGF0aXR1ZGUnOiAxOC41MTMyMTc2MDAwMDAwMDAsICdsb25naXR1ZGUnOiA3My45Mjg4NzMyMDAwMDAwMDAsXG4gICAgLy8gICAnY292ZXJJbWFnZVVybCc6ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvY2l0eS1iYW5uZXJzL2xhcmdlL3B1bmUuanBnJyxcbiAgICAvLyAgICdjYXJkSW1hZ2VVcmwnOiAnaHR0cHM6Ly9zMy5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vdG93bnNjcmlwdC1jb21tb24tcmVzb3VyY2VzL2NpdHktYmFubmVycy9tb2JpbGUvcHVuZS5qcGcnLFxuICAgIC8vICAgJ3B1YmxpY0V2ZW50JzogdHJ1ZSwgJ2xpdmUnOiB0cnVlLCAnY2F0ZWdvcnlJZCc6IG51bGwsICdldmVudFR5cGVJZCc6IDE3LFxuICAgIC8vICAgJ21pbmltdW1UaWNrZXRQcmljZSc6IDM0NTYsICdtaW5pbXVtVGlja2V0UHJpY2VDdXJyZW5jeSc6ICdJTlInLFxuICAgIC8vICAgJ29yZ2FuaXplcklzVHJ1c3RlZCc6IHRydWUsICdzb2xkT3V0RmxhZyc6IGZhbHNlLCAncmVwb3J0RmxhZyc6IGZhbHNlLFxuICAgIC8vICAgJ3BhaWQnOiBmYWxzZSwgJ29ubGluZUV2ZW50JzogZmFsc2UsICdvcmdhbml6ZXJJZCc6IDMwODAsICdwYWdlVmlld3MnOiBudWxsLFxuICAgIC8vICAgJ29yZ2FuaXplclNjb3JlJzogbnVsbCwgJ3RpY2tldHNTb2xkJzogMCwgJ3JvVGlja2V0c1NvbGQnOiBudWxsLCAndGlja2V0c1JlbWFpbmluZyc6IDAsXG4gICAgLy8gICAnZmFyRHVyYXRpb24nOiBudWxsLCAndG93bnNjcmlwdElSJzogbnVsbCwgJ3Njb3JlJzogbnVsbCwgJ3JlY3VycmVudCc6IGZhbHNlLFxuICAgIC8vICAgJ2tleXdvcmRzJzogW3sgJ2lkJzogMTY1LCAndG9waWNLZXl3b3JkTmFtZSc6ICd0ZXN0aW5nJywgJ3RvcGljS2V5d29yZENvZGUnOiAndGVzdGluZycsICd0b3BpY0lkJzogMTc1LCAnd2VpZ2h0JzogMSwgJ3RvcGljS2V5d29yZFBhZ2VUaXRsZSc6IG51bGwsICd0b3BpY0tleXdvcmRQYWdlRGVzY3JpcHRpb24nOiBudWxsIH0sIHsgJ2lkJzogMTY1LCAndG9waWNLZXl3b3JkTmFtZSc6ICd0ZXN0aW5nJywgJ3RvcGljS2V5d29yZENvZGUnOiAndGVzdGluZycsICd0b3BpY0lkJzogMTc1LCAnd2VpZ2h0JzogMSwgJ3RvcGljS2V5d29yZFBhZ2VUaXRsZSc6IG51bGwsICd0b3BpY0tleXdvcmRQYWdlRGVzY3JpcHRpb24nOiBudWxsIH0sIHsgJ2lkJzogMTQxLCAndG9waWNLZXl3b3JkTmFtZSc6ICdwYXJ0eScsICd0b3BpY0tleXdvcmRDb2RlJzogJ3BhcnR5JywgJ3RvcGljSWQnOiAxNTAsICd3ZWlnaHQnOiAyLCAndG9waWNLZXl3b3JkUGFnZVRpdGxlJzogbnVsbCwgJ3RvcGljS2V5d29yZFBhZ2VEZXNjcmlwdGlvbic6IG51bGwgfV1cbiAgICAvLyB9O1xuXG4gICAgLy8gdGhpcy50b3BpY0RhdGEgPSB7XG4gICAgLy8gICBjYXJkSW1hZ2VVcmw6ICdodHRwczovL3MzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS90b3duc2NyaXB0LWNvbW1vbi1yZXNvdXJjZXMvY2F0ZWdvcnkvNzQ4eDIyMC9tYXJhdGhvbjEuanBnJyxcbiAgICAvLyAgIG5hbWU6ICdNYXJhdGhvbnMgaW4gUHVuZScsXG4gICAgLy8gICBzdWJUaXRsZTogJ1VwY29taW5nIFJ1bm5pbmcgRXZlbnRzIEluIFB1bmUgLSA1SywgMTBLLCBIYWxmICYgRnVsbCBNYXJhdGhvbiBJbiBQdW5lJyxcbiAgICAvLyAgIHRvcGljRGVzY3JpcHRpb246ICdCZWluZyBmaXQgaXMgdGhlIG5ldyB0cmVuZC4gVGhlIGZpdG5lc3MgY29tbXVuaXR5IGdyb3duIGluIG51bWJlciB3aXRoIGluY3JlYXNlZCBwYXJ0aWNpcGF0aW9uIGluIHJ1bm5pbmcgYW5kIG1hcmF0aG9ucyBpbiBQdW5lLiBVcGNvbWluZyBSdW5uaW5nIEV2ZW50cyBJbiBQdW5lIGludm9sdmVzIGFsbCB0eXBlcyBvZiBydW4sIGxpa2UgdGhlIGNpdHkgcnVuLCB0cmFpbCBydW4sIGZ1biBydW4sIHNvY2lhbCBjYXVzZSBydW4gYW5kIG1hbnkgbW9yZS4gTmVhcmx5IGV2ZXJ5IHdlZWsgdGhlcmUgYXJlIGFjdGl2aXRpZXMgcGxhbm5lZCBieSBydW5uaW5nIGdyb3VwcyBpbiBQdW5lLiBTb21lIG9mIHRoZSBtb3N0IGFudGljaXBhdGVkIHJ1bnMgYXJlIGZ1bGwgbWFyYXRob24gaW4gUHVuZSwgaGFsZiBtYXJhdGhvbiwgMTBLIGFuZCA1SyBtYXJhdGhvbiBpbiBQdW5lLiBQdW5lIG1hcmF0aG9uIGV2ZW50cyBiZXN0IHN1aXRlZCBmb3IgZXZlcnlvbmUsIGJlIGl0IGtpZHMsIGVsZGVycywgc2Vhc29uYWwgcnVubmVycyBvciBuZXdiaWVzLidcbiAgICAvLyB9O1xuICB9XG5cbn1cbiJdfQ==