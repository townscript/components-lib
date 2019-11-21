import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginModalComponent } from '../../../loginSignup/ts-login-signup/login-modal/login-modal.component';
import { FooterService } from './ts-footer.service';
import { PlaceService } from '../ts-header/place.service';
import { UserService } from '../../../../shared/services/user-service';
var TsFooterComponent = /** @class */ (function () {
    function TsFooterComponent(dialog, userService, footerService, placeService) {
        var _this = this;
        this.dialog = dialog;
        this.userService = userService;
        this.footerService = footerService;
        this.placeService = placeService;
        this.source = 'landingPages';
        this.popularEvents = [];
        this.recentBlogs = [];
        this.popularReads = [
            {
                title: 'How to Organize a Tedx Event?',
                url: 'http://blog.townscript.com/how-to-organize-a-tedx-event/'
            },
            {
                title: 'Sell event tickets in 27+ countries with Townscript',
                url: 'http://blog.townscript.com/now-sell-event-ticket-internationally-in-27-countries-with-townscript/'
            },
            {
                title: 'How to Sell Event Tickets Online',
                url: 'http://blog.townscript.com/how-to-sell-event-tickets-online/'
            },
            {
                title: 'How to Sell Out Your Event Tickets within Minutes?',
                url: 'http://blog.townscript.com/how-to-sell-out-your-event-tickets-wthin-minutes/'
            },
            {
                title: '5 Reasons You Need more than a Payment Gateway',
                url: 'http://blog.townscript.com/5-reasons-you-need-more-than-a-payment-gateway-for-your-event/'
            }
        ];
        this.myBookingsURL = '/dashboard/mybookings';
        this.openContactUs = function () {
            window.open('/contact-us');
        };
        this.openMyBooking = function () {
            if (_this.userService.user.source['value'] != undefined) {
                _this.redirectToMyBookings();
            }
            else {
                _this.openLogin();
            }
        };
        this.redirectToMyBookings = function () {
            window.open(_this.myBookingsURL);
        };
        this.openLogin = function () {
            var dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            dialogConfig.data = { rdUrl: _this.myBookingsURL };
            _this.dialog.open(LoginModalComponent, dialogConfig);
        };
        this.getCityFromCityCode = function (code) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.footerService.getCityFromCityCode(code)];
                    case 1:
                        res = _a.sent();
                        this.city = res['data'];
                        this.getPopularEvents();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getPopularEvents = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.footerService.getPopularEvents(this.city.latitude, this.city.longitude)];
                    case 1:
                        res = _a.sent();
                        this.popularEvents = res.data.data;
                        return [2 /*return*/];
                }
            });
        }); };
        this.getPopularCities = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.footerService.getAllPopularCities()];
                    case 1:
                        data = _a.sent();
                        this.popularCities = data['data'];
                        return [2 /*return*/];
                }
            });
        }); };
    }
    TsFooterComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.popularEvents == undefined || this.popularEvents.length == 0) {
            this.subObject = this.placeService.place.subscribe(function (res) {
                var data = JSON.parse(res);
                if (data != undefined) {
                    _this.getCityFromCityCode(data['city']);
                }
            });
        }
        this.getPopularCities();
    };
    TsFooterComponent.prototype.ngOnDestroy = function () {
        if (this.subObject != undefined) {
            this.subObject.unsubscribe();
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsFooterComponent.prototype, "source", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsFooterComponent.prototype, "popularEvents", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsFooterComponent.prototype, "recentBlogs", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsFooterComponent.prototype, "popularReads", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsFooterComponent.prototype, "popularCities", void 0);
    TsFooterComponent = tslib_1.__decorate([
        Component({
            selector: 'ts-footer',
            template: "<footer class=\"ts-footer text-center pt-8 pb-4 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16\" [class.new-footer]=\"source=='marketplace'\">\n    <div class=\"ts-container content-footer\">\n        <div class=\"flex md:mb-4\">\n            <div class=\"w-1/5 hidden-xs px-4\">\n                <h5>ORGANISE EVENTS</h5>\n                <ul class=\"list-unstyled\">\n                    <li><a href=\"/i/conference-registration\">Conferences</a></li>\n                    <li><a href=\"/i/workshops-and-trainings\">Workshops and Trainings</a></li>\n                    <li><a href=\"/i/college-fest-payment-portal\">College Festivals</a></li>\n                    <li><a href=\"/i/marathon-cycling-trips-treks-registration\">Sports and Fitness Events</a></li>\n                    <li><a href=\"/i/entertainment-events-ticketing\">Entertainment Events</a></li>\n                    <li><a href=\"/i/meetup-registration\">Meetups and Reunions</a></li>\n                    <li><a href=\"/i/treks-trips-registration\">Treks and Trips</a></li>\n                    <!-- <li><a href=\"/i/fundraising-crowdfunding\">Fundraisings</a></li> -->\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\">\n                <h5>POPULAR SEARCHES</h5>\n                <ul class=\"list-unstyled\">\n                    <!--<li><a href=\"/pune/new-year-party\">New Year Parties In Pune</a></li>\n\t\t\t\t<li><a href=\"/mumbai/new-year-party\">New Year Parties In Mumbai</a></li>\n\t\t\t\t<li><a href=\"/delhi/new-year-party\">New Year Parties In Delhi</a></li>\n\t\t\t\t<li><a href=\"/bangalore/new-year-party\">New Year Parties In Bangalore</a></li>-->\n                    <li><a\n                            href=\"http://support.townscript.com/support/solutions/articles/1000265220-list-of-countries-supported-by-townscript-\">\n                            List of Countries supported by Townscript</a></li>\n                    <li><a href=\"/i/sell-event-tickets-online\">Sell Event Tickets Online</a></li>\n                    <li><a href=\"/i/event-management-software\">Event Management Software</a></li>\n                    <li><a href=\"/i/event-registration-software\">Event Registration Software</a></li>\n                    <li><a href=\"/i/conference-management-system\">Conference management System</a></li>\n                    <li><a href=\"/i/event-planning-software\">Event Planning Software</a></li>\n                    <li><a href=\"/i/online-event-ticketing\">Online Event Ticketing</a></li>\n                    <li><a href=\"/i/corporate-event-management\">Corporate Event Management</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\" *ngIf=\"source=='landingPages'\">\n                <h5>RECENT BLOGS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li *ngFor=\"let blog of recentBlogs\"><a [href]=\"blog.url\">{{blog.title}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\" *ngIf=\"source=='marketplace'\">\n                <h5>POPULAR EVENTS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li *ngFor=\"let event of popularEvents\"><a [href]=\"'e/'+event.shortName\">{{event.name}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\">\n                <h5>POPULAR READS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li *ngFor=\"let read of popularReads\"><a [href]=\"read.url\" target=\"_blank\">{{read.title}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 hidden-xs pl-12\">\n                <h5>BOOKINGS</h5>\n                <ul class=\"list-unstyled\">\n                    <li>\n                        <div class=\"mybookings cursor-pointer\" (click)=\"openMyBooking()\">My Bookings</div>\n                    </li>\n                </ul>\n                <h5 (click)=\"openContactUs()\">GET IN TOUCH</h5>\n                <!--<h5><a href=\"mailto:service@townscript.com\" target=\"_blank\" class=\"mail-to visible-xs\">service@townscript.com</a></h5>-->\n                <ul class=\"list-unstyled\">\n                    <!-- \t\t\t\t<li class=\"hidden-xs\">\n\t\t\t\t\t<a href=\"#\">Contact us</a>\n\t\t\t\t</li> -->\n                    <li class=\"social-list-item\">\n                        <ul class=\"social-list clearfix\">\n                            <li>\n                                <a href=\"https://www.facebook.com/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-facebook\"></i></a>\n                            </li>\n                            <li>\n                                <a href=\"https://twitter.com/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-twitter\"></i></a>\n                            </li>\n                            <li>\n                                <a href=\"https://plus.google.com/+Townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-google-plus\"></i></a>\n                            </li>\n                            <li>\n                                <a href=\"https://www.linkedin.com/company/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-linkedin\"></i></a>\n                            </li>\n                            <!--<li>\n\t\t\t\t\t\t\t<a href=\"mailto:service@townscript.com\" target=\"_blank\"><i class=\"ion-email\"></i></a>\n\t\t\t\t\t\t</li>-->\n                        </ul>\n                    </li>\n                </ul>\n                <h5 class=\"hidden-xs\">ORGANIZER APP</h5>\n                <ul class=\"list-apps hidden-xs\">\n                    <li>\n                        <a href=\"//play.google.com/store/apps/details?id=com.dyulok.android.organizerapp&hl=en_IN\"\n                            title=\"Download on Google play\" class=\"store-icon google-play-icon\" target=\"_blank\">Download\n                            on Google\n                            play</a>\n                    </li>\n                    <li>\n                        <a href=\"//itunes.apple.com/in/app/townscript-event-manager/id1441088900?mt=8\"\n                            title=\"Download on App Store\" target=\"_blank\" class=\"store-icon app-store-icon\">Download on\n                            App Store</a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"w-full block md:hidden\">\n              <div class=\"flex flex-col justify-center items-center\">\n                <div class=\"text-3xl text-gray-400 px-5 pr-32 mr-5\">&ldquo;Live an</div>\n                <div class=\"text-4xl text-gray-400 font-semibold -mt-3 px-5 pl-12\"><span class=\"text-purple-300\">Event</span>ful life&rdquo;</div>\n                <img class=\"dance-illustration\" src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ts-illustrations/partying_2.png\">\n              </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"ts-container\">\n        <div class=\"brand-footer border-0 md:border-t pt-2 md:pt-4 lg:pt-8\">\n            <div class=\"flex md:mb-4\">\n                <div class=\"w-full flex flex-col items-center md:items-start md:w-1/5 px-4 ts-logo\">\n                    <img src=\"assets/images/ts-logoBMS.png\" alt=\"Townscript Event Ticketing Logo\"\n                        title=\"Townscript Event Ticketing Logo\" />\n                    <span class=\"ts-footer__copyright text-right pr-2 text-xs text-gray-800\">Copyright@2019</span>\n                    <!--<a href=\"mailto:service@townscript.com\" target=\"_blank\" class=\"ts-footer__mail hidden-xs\">service@townscript.com</a>-->\n                </div>\n                <div class=\"w-3/5 linear-footer hidden-xs pl-4\">\n                    <h5>LEARN MORE</h5>\n                    <br>\n                    <ul class=\"list-linear\">\n                        <!-- <li><a href=\"#\">Features</a></li> -->\n                        <li><a href=\"/pricing\">Pricing</a></li>\n                        <li><a href=\"/how-it-works\" ts-data-analytics prop-event=\"click\" eventLabel=\"How It Works\"\n                                prop-clicked-location=\"Footer\">How it works</a></li>\n                        <!-- <li><a href=\"#\">Mobile Apps</a></li> -->\n                        <li><a href=\"//townscript-api.readme.io/\" target=\"_blank\">APIs for Developers</a></li>\n                        <li><a href=\"/terms-and-conditions\">Policies</a></li>\n                        <li><a href=\"/privacy-policy\">Privacy</a></li>\n                        <li><a href=\"http://support.townscript.com/support/home\" target=\"_blank\">Support / FAQs</a></li>\n                    </ul>\n                    <div class=\"linear-footer hidden-xs\" *ngIf=\"source=='marketplace'\">\n                        <h5>POPULAR CITIES</h5>\n                        <br>\n                        <ul class=\"list-linear\">\n                            <li *ngFor=\"let city of popularCities\">\n                                <div><a href=\"/{{city.countryCode + '/' + city.name | lowercase}}\">{{city.name}}</a></div>\n                            </li>\n                        </ul>\n                    </div>\n                    <div class=\"linear-footer hidden-xs\">\n                        <h5>ABOUT</h5>\n                        <br>\n                        <ul class=\"list-linear\">\n                            <li><a href=\"/about-us\">About us</a></li>\n                            <li><a href=\"/contact-us\">Contact us</a></li>\n                            <!-- <li><a href=\"#\">Career</a></li> -->\n                            <!-- <li><a href=\"#\">Media</a></li> -->\n                            <li><a href=\"http://blog.townscript.com\" target=\"_blank\">Blog</a></li>\n                            <li><a href=\"http://eventmagazine.townscript.com/\" target=\"_blank\">Event Magazine</a></li>\n                            <li><a href=\"https://productblog.townscript.com/\" target=\"_blank\">Product Diary</a></li>\n                            <li><a href=\"/sitemap\" target=\"_blank\">Sitemap</a></li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"mixpanel-button align-text hidden-xs px-10 pt-8 mx-2\">\n                    <a href=\"https://www.g2crowd.com/products/townscript/reviews\" target=\"_blank\">\n                        <img src=\"https://s3-ap-southeast-1.amazonaws.com/common-resources/assets/g2badge.png\"\n                            alt=\"G2Crowd Townscript Reviews\" width=\"100\">\n                        <span>72 Reviews</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n    <br>\n</footer>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}footer{background-color:#ebebeb}footer .mybookings{font-size:13px;color:#683594}footer.new-footer{background-color:#f7f7f7}footer.new-footer .mybookings,footer.new-footer a,footer.new-footer h5{color:#3e3e3e;letter-spacing:.01em;text-decoration:none;margin-bottom:0}footer li:hover{text-decoration:underline}footer h5{font-size:14px!important;font-weight:600}footer li,footer ul{margin-bottom:0}footer .content-footer{padding-bottom:20px}footer .m-l-8per{margin-left:8%}footer .brand-footer{border-color:#e5d7f1}footer .ts-footer__copyright,footer img{width:165px}footer .dance-illustration{width:200px}footer .ts-logo{-webkit-filter:grayscale(100%);filter:grayscale(100%);opacity:.4}@media (max-width:992px){footer .ts-logo img{width:120px}}footer .ts-logo .text-xs{width:120px;font-size:.5em}footer .bookmyshow-logo{width:140px}footer .mixpanel-button{position:relative;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;text-align:center}footer .mixpanel-button a,footer .mixpanel-button span{white-space:nowrap;display:block}footer .mixpanel-button img{width:115px!important}footer .mail-to{font-weight:600}footer a,footer h5{color:#683594;text-decoration:none;margin-bottom:0}footer a{letter-spacing:.4px;font-size:13px;font-weight:400}footer ul.social-list{list-style-type:none;padding:0;margin:0}footer ul.social-list li{display:inline-block;margin-right:10px}footer ul.social-list li i{-webkit-transition:.2s;transition:.2s;font-size:17px}footer ul.social-list li i:hover{color:#111}.ts-footer__copyright{display:block}@media (min-width:768px){.ts-footer__mail{display:block;text-align:left;font-weight:700;line-height:36px}.ts-footer .container-fluid .row>div:first-child{padding-left:0}.ts-footer .container-fluid .row>div:nth-child(2){padding:0}.ts-footer .container-fluid .row>div:last-child{padding-right:0}footer{margin-top:100px;text-align:left;background-image:url(//s3.ap-south-1.amazonaws.com/townscript-common-resources/assets/footer-skyline.png);background-repeat:repeat-x;background-position:left top}footer .brand-footer .linear-footer h5,footer .brand-footer .linear-footer ul{display:inline-block;margin:2px 25px 2px 0;vertical-align:middle}footer .brand-footer .linear-footer .list-linear{list-style-type:none;padding:0}footer .brand-footer .linear-footer .list-linear li{float:left;margin-right:35px}footer .ts-logo{-webkit-filter:none;filter:none;opacity:1}footer ul.social-list{list-style-type:none;padding:0}footer ul.social-list li{display:block;float:left;margin-right:10px}footer ul.list-apps{list-style-type:none;padding:0}footer ul.list-apps li{line-height:50px;margin:10px 0}footer ul.list-apps li .store-icon{background-size:auto 45px;background-image:url(//s3.ap-south-1.amazonaws.com/townscript-common-resources/assets/store.png);background-repeat:no-repeat;display:block;width:150px;text-indent:-9999px}footer ul.list-apps li .store-icon.google-play-icon{background-position:0 0}footer ul.list-apps li .store-icon.app-store-icon{background-position:-172px 0}footer ul li{line-height:31px}footer ul li>a{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block}}.blog-links li{line-height:1.5}.blog-links li a{white-space:normal}"]
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            UserService,
            FooterService,
            PlaceService])
    ], TsFooterComponent);
    return TsFooterComponent;
}());
export { TsFooterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtZm9vdGVyL3RzLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBT3ZFO0lBcUNFLDJCQUFvQixNQUFpQixFQUMzQixXQUF3QixFQUN4QixhQUE0QixFQUM1QixZQUEwQjtRQUhwQyxpQkFJQztRQUptQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQzNCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBdEMzQixXQUFNLEdBQUcsY0FBYyxDQUFDO1FBQ3hCLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLGlCQUFZLEdBQUc7WUFDdEI7Z0JBQ0UsS0FBSyxFQUFFLCtCQUErQjtnQkFDdEMsR0FBRyxFQUFFLDBEQUEwRDthQUNoRTtZQUNEO2dCQUNFLEtBQUssRUFBRSxxREFBcUQ7Z0JBQzVELEdBQUcsRUFBRSxtR0FBbUc7YUFDekc7WUFDRDtnQkFDRSxLQUFLLEVBQUUsa0NBQWtDO2dCQUN6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QztTQUNKO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBbEdRO1FBQVIsS0FBSyxFQUFFOztxREFBeUI7SUFDeEI7UUFBUixLQUFLLEVBQUU7OzREQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTs7MERBQXVCO0lBQ3RCO1FBQVIsS0FBSyxFQUFFOzsyREFxQk47SUFDTztRQUFSLEtBQUssRUFBRTs7NERBQW9CO0lBM0JqQixpQkFBaUI7UUFMN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsaXdWQUF5Qzs7U0FFMUMsQ0FBQztpREFzQzRCLFNBQVM7WUFDZCxXQUFXO1lBQ1QsYUFBYTtZQUNkLFlBQVk7T0F4Q3pCLGlCQUFpQixDQXFHN0I7SUFBRCx3QkFBQztDQUFBLEFBckdELElBcUdDO1NBckdZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcblxuaW1wb3J0IHsgRm9vdGVyU2VydmljZSB9IGZyb20gJy4vdHMtZm9vdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHMtZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RzLWZvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RzLWZvb3Rlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRzRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHNvdXJjZSA9ICdsYW5kaW5nUGFnZXMnO1xuICBASW5wdXQoKSBwb3B1bGFyRXZlbnRzOiBhbnkgPSBbXTtcbiAgQElucHV0KCkgcmVjZW50QmxvZ3M6IGFueSA9IFtdO1xuICBASW5wdXQoKSBwb3B1bGFyUmVhZHMgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICdIb3cgdG8gT3JnYW5pemUgYSBUZWR4IEV2ZW50PycsXG4gICAgICB1cmw6ICdodHRwOi8vYmxvZy50b3duc2NyaXB0LmNvbS9ob3ctdG8tb3JnYW5pemUtYS10ZWR4LWV2ZW50LydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnU2VsbCBldmVudCB0aWNrZXRzIGluIDI3KyBjb3VudHJpZXMgd2l0aCBUb3duc2NyaXB0JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9ibG9nLnRvd25zY3JpcHQuY29tL25vdy1zZWxsLWV2ZW50LXRpY2tldC1pbnRlcm5hdGlvbmFsbHktaW4tMjctY291bnRyaWVzLXdpdGgtdG93bnNjcmlwdC8nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0hvdyB0byBTZWxsIEV2ZW50IFRpY2tldHMgT25saW5lJyxcbiAgICAgIHVybDogJ2h0dHA6Ly9ibG9nLnRvd25zY3JpcHQuY29tL2hvdy10by1zZWxsLWV2ZW50LXRpY2tldHMtb25saW5lLydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnSG93IHRvIFNlbGwgT3V0IFlvdXIgRXZlbnQgVGlja2V0cyB3aXRoaW4gTWludXRlcz8nLFxuICAgICAgdXJsOiAnaHR0cDovL2Jsb2cudG93bnNjcmlwdC5jb20vaG93LXRvLXNlbGwtb3V0LXlvdXItZXZlbnQtdGlja2V0cy13dGhpbi1taW51dGVzLydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnNSBSZWFzb25zIFlvdSBOZWVkIG1vcmUgdGhhbiBhIFBheW1lbnQgR2F0ZXdheScsXG4gICAgICB1cmw6ICdodHRwOi8vYmxvZy50b3duc2NyaXB0LmNvbS81LXJlYXNvbnMteW91LW5lZWQtbW9yZS10aGFuLWEtcGF5bWVudC1nYXRld2F5LWZvci15b3VyLWV2ZW50LydcbiAgICB9XG4gIF07XG4gIEBJbnB1dCgpIHBvcHVsYXJDaXRpZXM6IGFueTtcblxuICBwb3B1bGFyRXZlbnRzRGF0YTogYW55O1xuICBjb3VudHJ5Q2l0eU1hcDogYW55O1xuICBjaXR5OiBhbnk7XG4gIHBsYWNlSWQ6IHN0cmluZztcblxuICBteUJvb2tpbmdzVVJMID0gJy9kYXNoYm9hcmQvbXlib29raW5ncyc7XG4gIHN1Yk9iamVjdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb290ZXJTZXJ2aWNlOiBGb290ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UpIHtcbiAgfVxuXG4gIG9wZW5Db250YWN0VXMgPSAoKSA9PiB7XG4gICAgd2luZG93Lm9wZW4oJy9jb250YWN0LXVzJyk7XG4gIH1cblxuICBvcGVuTXlCb29raW5nID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc291cmNlWyd2YWx1ZSddICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZWRpcmVjdFRvTXlCb29raW5ncygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5Mb2dpbigpO1xuICAgIH1cbiAgfVxuXG4gIHJlZGlyZWN0VG9NeUJvb2tpbmdzID0gKCk6IHZvaWQgPT4ge1xuICAgIHdpbmRvdy5vcGVuKHRoaXMubXlCb29raW5nc1VSTCk7XG4gIH1cblxuICBvcGVuTG9naW4gPSAoKSA9PiB7XG4gICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgIGRpYWxvZ0NvbmZpZy5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgIGRpYWxvZ0NvbmZpZy5kYXRhID0geyByZFVybDogdGhpcy5teUJvb2tpbmdzVVJMIH07XG4gICAgdGhpcy5kaWFsb2cub3BlbihMb2dpbk1vZGFsQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICB9XG5cbiAgZ2V0Q2l0eUZyb21DaXR5Q29kZSA9IGFzeW5jIChjb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZm9vdGVyU2VydmljZS5nZXRDaXR5RnJvbUNpdHlDb2RlKGNvZGUpO1xuICAgIHRoaXMuY2l0eSA9IHJlc1snZGF0YSddO1xuICAgIHRoaXMuZ2V0UG9wdWxhckV2ZW50cygpO1xuICB9XG5cbiAgZ2V0UG9wdWxhckV2ZW50cyA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZm9vdGVyU2VydmljZS5nZXRQb3B1bGFyRXZlbnRzKHRoaXMuY2l0eS5sYXRpdHVkZSwgdGhpcy5jaXR5LmxvbmdpdHVkZSk7XG4gICAgdGhpcy5wb3B1bGFyRXZlbnRzID0gcmVzLmRhdGEuZGF0YTtcbiAgfVxuXG4gIGdldFBvcHVsYXJDaXRpZXMgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5mb290ZXJTZXJ2aWNlLmdldEFsbFBvcHVsYXJDaXRpZXMoKTtcbiAgICB0aGlzLnBvcHVsYXJDaXRpZXMgPSBkYXRhWydkYXRhJ107XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5wb3B1bGFyRXZlbnRzID09IHVuZGVmaW5lZCB8fCB0aGlzLnBvcHVsYXJFdmVudHMubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuc3ViT2JqZWN0ID0gdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLmdldENpdHlGcm9tQ2l0eUNvZGUoZGF0YVsnY2l0eSddKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZ2V0UG9wdWxhckNpdGllcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3ViT2JqZWN0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zdWJPYmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==