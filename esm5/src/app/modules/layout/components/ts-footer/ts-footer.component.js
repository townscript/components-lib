import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginModalComponent } from '../../../loginSignup/ts-login-signup/login-modal/login-modal.component';
import { FooterService } from './ts-footer.service';
import { PlaceService } from '../ts-header/place.service';
import { UserService } from '../../../../shared/services/user-service';
import { UtilityService } from '../../../../shared/services/utilities.service';
var TsFooterComponent = /** @class */ (function () {
    function TsFooterComponent(dialog, userService, footerService, placeService, utilityService) {
        var _this = this;
        this.dialog = dialog;
        this.userService = userService;
        this.footerService = footerService;
        this.placeService = placeService;
        this.utilityService = utilityService;
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
        this.getPopularEvents = function (country) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var filter, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { 'minScore': 0 };
                        if (country != undefined) {
                            filter['country'] = country;
                        }
                        return [4 /*yield*/, this.footerService.getPopularEvents(this.city ? this.city.latitude : undefined, this.city ? this.city.longitude : undefined, filter)];
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
                if (_this.utilityService.IsJsonString(res)) {
                    var data = JSON.parse(res);
                    if (data != undefined && Object.keys(data).length > 0) {
                        if (data['city']) {
                            _this.getCityFromCityCode(data['city']);
                        }
                        else {
                            _this.getPopularEvents(data['currentPlace']);
                        }
                    }
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
            template: "<footer class=\"ts-footer text-center pt-8 pb-4 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16\"\n    [class.new-footer]=\"source=='marketplace'\">\n    <div class=\"ts-container content-footer\">\n        <div class=\"flex md:mb-4\">\n            <div class=\"w-1/5 hidden-xs px-4\">\n                <h5>ORGANISE EVENTS</h5>\n                <ul class=\"list-unstyled\">\n                    <li appDataAnalytics eventLabel=\"organize-events\" clickLocation=\"\"><a\n                            href=\"/i/conference-registration\">Conferences</a></li>\n                    <li appDataAnalytics eventLabel=\"organize-events\" clickLocation=\"\"><a\n                            href=\"/i/workshops-and-trainings\">Workshops and Trainings</a></li>\n                    <li appDataAnalytics eventLabel=\"organize-events\" clickLocation=\"\"><a\n                            href=\"/i/college-fest-payment-portal\">College Festivals</a></li>\n                    <li appDataAnalytics eventLabel=\"organize-events\" clickLocation=\"\"><a\n                            href=\"/i/marathon-cycling-trips-treks-registration\">Sports and Fitness Events</a></li>\n                    <li appDataAnalytics eventLabel=\"organize-events\" clickLocation=\"\"><a\n                            href=\"/i/entertainment-events-ticketing\">Entertainment Events</a></li>\n                    <li appDataAnalytics eventLabel=\"organize-events\" clickLocation=\"\"><a\n                            href=\"/i/meetup-registration\">Meetups and Reunions</a></li>\n                    <li appDataAnalytics eventLabel=\"organize-events\" clickLocation=\"\"><a\n                            href=\"/i/treks-trips-registration\">Treks and Trips</a></li>\n                    <!-- <li><a href=\"/i/fundraising-crowdfunding\">Fundraisings</a></li> -->\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\">\n                <h5>POPULAR SEARCHES</h5>\n                <ul class=\"list-unstyled\">\n                    <!--<li><a href=\"/pune/new-year-party\">New Year Parties In Pune</a></li>\n\t\t\t\t<li><a href=\"/mumbai/new-year-party\">New Year Parties In Mumbai</a></li>\n\t\t\t\t<li><a href=\"/delhi/new-year-party\">New Year Parties In Delhi</a></li>\n\t\t\t\t<li><a href=\"/bangalore/new-year-party\">New Year Parties In Bangalore</a></li>-->\n                    <li appDataAnalytics eventLabel=\"popular-searches\" clickLocation=\"\"><a\n                            href=\"http://support.townscript.com/support/solutions/articles/1000265220-list-of-countries-supported-by-townscript-\">\n                            List of Countries supported by Townscript</a></li>\n                    <li appDataAnalytics eventLabel=\"popular-searches\" clickLocation=\"\"><a\n                            href=\"/i/sell-event-tickets-online\">Sell Event Tickets Online</a></li>\n                    <li appDataAnalytics eventLabel=\"popular-searches\" clickLocation=\"\"><a\n                            href=\"/i/event-management-software\">Event Management Software</a></li>\n                    <li appDataAnalytics eventLabel=\"popular-searches\" clickLocation=\"\"><a\n                            href=\"/i/event-registration-software\">Event Registration Software</a></li>\n                    <li appDataAnalytics eventLabel=\"popular-searches\" clickLocation=\"\"><a\n                            href=\"/i/conference-management-system\">Conference management System</a></li>\n                    <li appDataAnalytics eventLabel=\"popular-searches\" clickLocation=\"\"><a\n                            href=\"/i/event-planning-software\">Event Planning Software</a></li>\n                    <li appDataAnalytics eventLabel=\"popular-searches\" clickLocation=\"\"><a\n                            href=\"/i/online-event-ticketing\">Online Event Ticketing</a></li>\n                    <li appDataAnalytics eventLabel=\"popular-searches\" clickLocation=\"\"><a\n                            href=\"/i/corporate-event-management\">Corporate Event Management</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\" *ngIf=\"source=='landingPages'\">\n                <h5>RECENT BLOGS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li appDataAnalytics eventLabel=\"recent-blogs\" clickLocation=\"\" *ngFor=\"let blog of recentBlogs\"><a\n                            [href]=\"blog.url\">{{blog.title}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\" *ngIf=\"source=='marketplace'\">\n                <h5>POPULAR EVENTS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li appDataAnalytics eventLabel=\"popular-events\" clickLocation=\"\"\n                        *ngFor=\"let event of popularEvents\"><a [href]=\"'e/'+event.shortName\">{{event.name}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\">\n                <h5>POPULAR READS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li appDataAnalytics eventLabel=\"popular-reads\" clickLocation=\"\" *ngFor=\"let read of popularReads\">\n                        <a [href]=\"read.url\" target=\"_blank\">{{read.title}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 hidden-xs pl-12\">\n                <h5>BOOKINGS</h5>\n                <ul class=\"list-unstyled\">\n                    <li appDataAnalytics eventLabel=\"bookings\" clickLocation=\"\">\n                        <div class=\"mybookings cursor-pointer\" (click)=\"openMyBooking()\">My Bookings</div>\n                    </li>\n                </ul>\n                <h5 (click)=\"openContactUs()\">GET IN TOUCH</h5>\n                <!--<h5><a href=\"mailto:service@townscript.com\" target=\"_blank\" class=\"mail-to visible-xs\">service@townscript.com</a></h5>-->\n                <ul class=\"list-unstyled\">\n                    <!-- \t\t\t\t<li class=\"hidden-xs\">\n\t\t\t\t\t<a href=\"#\">Contact us</a>\n\t\t\t\t</li> -->\n                    <li class=\"social-list-item\">\n                        <ul class=\"social-list clearfix\">\n                            <li appDataAnalytics eventLabel=\"social-fb\" clickLocation=\"\">\n                                <a href=\"https://www.facebook.com/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-facebook\"></i></a>\n                            </li>\n                            <li appDataAnalytics eventLabel=\"social-twitter\" clickLocation=\"\">\n                                <a href=\"https://twitter.com/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-twitter\"></i></a>\n                            </li>\n                            <li appDataAnalytics eventLabel=\"social-google\" clickLocation=\"\">\n                                <a href=\"https://plus.google.com/+Townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-google-plus\"></i></a>\n                            </li>\n                            <li appDataAnalytics eventLabel=\"social-linkedin\" clickLocation=\"\">\n                                <a href=\"https://www.linkedin.com/company/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-linkedin\"></i></a>\n                            </li>\n                            <!--<li>\n\t\t\t\t\t\t\t<a href=\"mailto:service@townscript.com\" target=\"_blank\"><i class=\"ion-email\"></i></a>\n\t\t\t\t\t\t</li>-->\n                        </ul>\n                    </li>\n                </ul>\n                <h5 class=\"hidden-xs\">ORGANIZER APP</h5>\n                <ul class=\"list-apps hidden-xs\">\n                    <li appDataAnalytics eventLabel=\"app-android\" clickLocation=\"\">\n                        <a href=\"//play.google.com/store/apps/details?id=com.dyulok.android.organizerapp&hl=en_IN\"\n                            title=\"Download on Google play\" class=\"store-icon google-play-icon\" target=\"_blank\">Download\n                            on Google\n                            play</a>\n                    </li>\n                    <li appDataAnalytics eventLabel=\"app-ios\" clickLocation=\"\">\n                        <a href=\"//itunes.apple.com/in/app/townscript-event-manager/id1441088900?mt=8\"\n                            title=\"Download on App Store\" target=\"_blank\" class=\"store-icon app-store-icon\">Download on\n                            App Store</a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"w-full block md:hidden\">\n                <div class=\"flex flex-col justify-center items-center\">\n                    <div class=\"text-3xl text-gray-400 px-5 pr-32 mr-5\">&ldquo;Live an</div>\n                    <div class=\"text-4xl text-gray-400 font-semibold -mt-3 px-5 pl-12\"><span\n                            class=\"text-purple-300\">Event</span>ful life&rdquo;</div>\n                    <img class=\"dance-illustration\"\n                        [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ts-illustrations/partying_2.png'\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"ts-container\">\n        <div class=\"brand-footer border-0 md:border-t pt-2 md:pt-4 lg:pt-8\">\n            <div class=\"flex md:mb-4\">\n                <div class=\"w-full flex flex-col items-center md:items-start md:w-1/5 px-4 ts-logo\">\n                    <img [lazyLoad]=\"'assets/images/ts-logoBMS.png'\" alt=\"Townscript Event Ticketing Logo\"\n                        title=\"Townscript Event Ticketing Logo\" />\n                    <span class=\"ts-footer__copyright text-right pr-2 text-xs text-gray-800\">Copyright@2019</span>\n                    <!--<a href=\"mailto:service@townscript.com\" target=\"_blank\" class=\"ts-footer__mail hidden-xs\">service@townscript.com</a>-->\n                </div>\n                <div class=\"w-3/5 linear-footer hidden-xs pl-4\">\n                    <h5>LEARN MORE</h5>\n                    <br>\n                    <ul class=\"list-linear\">\n                        <!-- <li><a href=\"#\">Features</a></li> -->\n                        <li appDataAnalytics eventLabel=\"learn-more-pricing\" clickLocation=\"\"><a\n                                href=\"/pricing\">Pricing</a></li>\n                        <li><a href=\"/how-it-works\" ts-data-analytics prop-event=\"click\" eventLabel=\"How It Works\"\n                                prop-clicked-location=\"Footer\">How it works</a></li>\n                        <!-- <li><a href=\"#\">Mobile Apps</a></li> -->\n                        <li appDataAnalytics eventLabel=\"learn-more-api\" clickLocation=\"\"><a\n                                href=\"//townscript-api.readme.io/\" target=\"_blank\">APIs for Developers</a></li>\n                        <li appDataAnalytics eventLabel=\"learn-more-policies\" clickLocation=\"\"><a\n                                href=\"/terms-and-conditions\">Policies</a></li>\n                        <li appDataAnalytics eventLabel=\"learn-more-privacy\" clickLocation=\"\"><a\n                                href=\"/privacy-policy\">Privacy</a></li>\n                        <li appDataAnalytics eventLabel=\"learn-more-support\" clickLocation=\"\"><a\n                                href=\"http://support.townscript.com/support/home\" target=\"_blank\">Support / FAQs</a>\n                        </li>\n                    </ul>\n                    <div class=\"linear-footer hidden-xs\" *ngIf=\"source=='marketplace'\">\n                        <h5>POPULAR CITIES</h5>\n                        <br>\n                        <ul class=\"list-linear\">\n                            <li appDataAnalytics eventLabel=\"popular-cities\" clickLocation=\"\"\n                                *ngFor=\"let city of popularCities\">\n                                <div><a href=\"/{{city.countryCode + '/' + city.name | lowercase}}\">{{city.name}}</a>\n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                    <div class=\"linear-footer hidden-xs\">\n                        <h5>ABOUT</h5>\n                        <br>\n                        <ul class=\"list-linear\">\n                            <li><a appDataAnalytics eventLabel=\"about-us\" clickLocation=\"\" href=\"/about-us\">About us</a>\n                            </li>\n                            <li><a appDataAnalytics eventLabel=\"about-us\" clickLocation=\"\" href=\"/contact-us\">Contact\n                                    us</a></li>\n                            <!-- <li><a href=\"#\">Career</a></li> -->\n                            <!-- <li><a href=\"#\">Media</a></li> -->\n                            <li><a appDataAnalytics eventLabel=\"about-us\" clickLocation=\"\"\n                                    href=\"http://blog.townscript.com\" target=\"_blank\">Blog</a></li>\n                            <li><a appDataAnalytics eventLabel=\"about-us\" clickLocation=\"\"\n                                    href=\"http://eventmagazine.townscript.com/\" target=\"_blank\">Event Magazine</a></li>\n                            <li><a appDataAnalytics eventLabel=\"about-us\" clickLocation=\"\"\n                                    href=\"https://productblog.townscript.com/\" target=\"_blank\">Product Diary</a></li>\n                            <li><a appDataAnalytics eventLabel=\"about-us\" clickLocation=\"\" href=\"/sitemap\"\n                                    target=\"_blank\">Sitemap</a></li>\n                        </ul>\n                    </div>\n                </div>\n                <div appDataAnalytics eventLabel=\"g2-crowd\" clickLocation=\"\"\n                    class=\"mixpanel-button align-text hidden-xs px-10 pt-8 mx-2\">\n                    <a href=\"https://www.g2crowd.com/products/townscript/reviews\" target=\"_blank\">\n                        <img [lazyLoad]=\"'https://s3-ap-southeast-1.amazonaws.com/common-resources/assets/g2badge.png'\"\n                            alt=\"G2Crowd Townscript Reviews\" width=\"100\">\n                        <span>72 Reviews</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n    <br>\n</footer>",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}footer{background-color:#ebebeb}footer .mybookings{font-size:13px;color:#683594}footer.new-footer{background-color:#f7f7f7}footer.new-footer .mybookings,footer.new-footer a,footer.new-footer h5{color:#3e3e3e;letter-spacing:.01em;text-decoration:none;margin-bottom:0}footer li:hover{text-decoration:underline}footer h5{font-size:14px!important;font-weight:600}footer li,footer ul{margin-bottom:0}footer .content-footer{padding-bottom:20px}footer .m-l-8per{margin-left:8%}footer .brand-footer{border-color:#e5d7f1}footer .ts-footer__copyright,footer img{width:165px}footer .dance-illustration{width:200px}footer .ts-logo{-webkit-filter:grayscale(100%);filter:grayscale(100%);opacity:.4}@media (max-width:992px){footer .ts-logo img{width:120px}}footer .ts-logo .text-xs{width:120px;font-size:.5em}footer .bookmyshow-logo{width:140px}footer .mixpanel-button{position:relative;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;text-align:center}footer .mixpanel-button a,footer .mixpanel-button span{white-space:nowrap;display:block}footer .mixpanel-button img{width:115px!important}footer .mail-to{font-weight:600}footer a,footer h5{color:#683594;text-decoration:none;margin-bottom:0}footer a{letter-spacing:.4px;font-size:13px;font-weight:400}footer ul.social-list{list-style-type:none;padding:0;margin:0}footer ul.social-list li{display:inline-block;margin-right:10px}footer ul.social-list li i{-webkit-transition:.2s;transition:.2s;font-size:17px}footer ul.social-list li i:hover{color:#111}.ts-footer__copyright{display:block}@media (min-width:768px){.ts-footer__mail{display:block;text-align:left;font-weight:700;line-height:36px}.ts-footer .container-fluid .row>div:first-child{padding-left:0}.ts-footer .container-fluid .row>div:nth-child(2){padding:0}.ts-footer .container-fluid .row>div:last-child{padding-right:0}footer{margin-top:100px;text-align:left;background-image:url(//s3.ap-south-1.amazonaws.com/townscript-common-resources/assets/footer-skyline.png);background-repeat:repeat-x;background-position:left top}footer .brand-footer .linear-footer h5,footer .brand-footer .linear-footer ul{display:inline-block;margin:2px 25px 2px 0;vertical-align:middle}footer .brand-footer .linear-footer .list-linear{list-style-type:none;padding:0}footer .brand-footer .linear-footer .list-linear li{float:left;margin-right:35px}footer .ts-logo{-webkit-filter:none;filter:none;opacity:1}footer ul.social-list{list-style-type:none;padding:0}footer ul.social-list li{display:block;float:left;margin-right:10px}footer ul.list-apps{list-style-type:none;padding:0}footer ul.list-apps li{line-height:50px;margin:10px 0}footer ul.list-apps li .store-icon{background-size:auto 45px;background-image:url(//s3.ap-south-1.amazonaws.com/townscript-common-resources/assets/store.png);background-repeat:no-repeat;display:block;width:150px;text-indent:-9999px}footer ul.list-apps li .store-icon.google-play-icon{background-position:0 0}footer ul.list-apps li .store-icon.app-store-icon{background-position:-172px 0}footer ul li{line-height:31px}footer ul li>a{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block}}.blog-links li{line-height:1.5}.blog-links li a{white-space:normal}"]
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog,
            UserService,
            FooterService,
            PlaceService,
            UtilityService])
    ], TsFooterComponent);
    return TsFooterComponent;
}());
export { TsFooterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtZm9vdGVyL3RzLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQU8vRTtJQXFDRSwyQkFBb0IsTUFBaUIsRUFDM0IsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsY0FBOEI7UUFKeEMsaUJBS0M7UUFMbUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUMzQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF2Qy9CLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFDeEIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsaUJBQVksR0FBRztZQUN0QjtnQkFDRSxLQUFLLEVBQUUsK0JBQStCO2dCQUN0QyxHQUFHLEVBQUUsMERBQTBEO2FBQ2hFO1lBQ0Q7Z0JB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QUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQiwydWNBQXlDOztTQUUxQyxDQUFDO2lEQXNDNEIsU0FBUztZQUNkLFdBQVc7WUFDVCxhQUFhO1lBQ2QsWUFBWTtZQUNWLGNBQWM7T0F6QzdCLGlCQUFpQixDQWdIN0I7SUFBRCx3QkFBQztDQUFBLEFBaEhELElBZ0hDO1NBaEhZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ0NvbmZpZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9sb2dpblNpZ251cC90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcblxuaW1wb3J0IHsgRm9vdGVyU2VydmljZSB9IGZyb20gJy4vdHMtZm9vdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHMtZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RzLWZvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RzLWZvb3Rlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRzRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHNvdXJjZSA9ICdsYW5kaW5nUGFnZXMnO1xuICBASW5wdXQoKSBwb3B1bGFyRXZlbnRzOiBhbnkgPSBbXTtcbiAgQElucHV0KCkgcmVjZW50QmxvZ3M6IGFueSA9IFtdO1xuICBASW5wdXQoKSBwb3B1bGFyUmVhZHMgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICdIb3cgdG8gT3JnYW5pemUgYSBUZWR4IEV2ZW50PycsXG4gICAgICB1cmw6ICdodHRwOi8vYmxvZy50b3duc2NyaXB0LmNvbS9ob3ctdG8tb3JnYW5pemUtYS10ZWR4LWV2ZW50LydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnU2VsbCBldmVudCB0aWNrZXRzIGluIDI3KyBjb3VudHJpZXMgd2l0aCBUb3duc2NyaXB0JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9ibG9nLnRvd25zY3JpcHQuY29tL25vdy1zZWxsLWV2ZW50LXRpY2tldC1pbnRlcm5hdGlvbmFsbHktaW4tMjctY291bnRyaWVzLXdpdGgtdG93bnNjcmlwdC8nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0hvdyB0byBTZWxsIEV2ZW50IFRpY2tldHMgT25saW5lJyxcbiAgICAgIHVybDogJ2h0dHA6Ly9ibG9nLnRvd25zY3JpcHQuY29tL2hvdy10by1zZWxsLWV2ZW50LXRpY2tldHMtb25saW5lLydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnSG93IHRvIFNlbGwgT3V0IFlvdXIgRXZlbnQgVGlja2V0cyB3aXRoaW4gTWludXRlcz8nLFxuICAgICAgdXJsOiAnaHR0cDovL2Jsb2cudG93bnNjcmlwdC5jb20vaG93LXRvLXNlbGwtb3V0LXlvdXItZXZlbnQtdGlja2V0cy13dGhpbi1taW51dGVzLydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnNSBSZWFzb25zIFlvdSBOZWVkIG1vcmUgdGhhbiBhIFBheW1lbnQgR2F0ZXdheScsXG4gICAgICB1cmw6ICdodHRwOi8vYmxvZy50b3duc2NyaXB0LmNvbS81LXJlYXNvbnMteW91LW5lZWQtbW9yZS10aGFuLWEtcGF5bWVudC1nYXRld2F5LWZvci15b3VyLWV2ZW50LydcbiAgICB9XG4gIF07XG4gIEBJbnB1dCgpIHBvcHVsYXJDaXRpZXM6IGFueTtcblxuICBwb3B1bGFyRXZlbnRzRGF0YTogYW55O1xuICBjb3VudHJ5Q2l0eU1hcDogYW55O1xuICBjaXR5OiBhbnk7XG4gIHBsYWNlSWQ6IHN0cmluZztcblxuICBteUJvb2tpbmdzVVJMID0gJy9kYXNoYm9hcmQvbXlib29raW5ncyc7XG4gIHN1Yk9iamVjdDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmb290ZXJTZXJ2aWNlOiBGb290ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UpIHtcbiAgfVxuXG4gIG9wZW5Db250YWN0VXMgPSAoKSA9PiB7XG4gICAgd2luZG93Lm9wZW4oJy9jb250YWN0LXVzJyk7XG4gIH1cblxuICBvcGVuTXlCb29raW5nID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc291cmNlWyd2YWx1ZSddICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZWRpcmVjdFRvTXlCb29raW5ncygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5Mb2dpbigpO1xuICAgIH1cbiAgfVxuXG4gIHJlZGlyZWN0VG9NeUJvb2tpbmdzID0gKCk6IHZvaWQgPT4ge1xuICAgIHdpbmRvdy5vcGVuKHRoaXMubXlCb29raW5nc1VSTCk7XG4gIH1cblxuICBvcGVuTG9naW4gPSAoKSA9PiB7XG4gICAgY29uc3QgZGlhbG9nQ29uZmlnID0gbmV3IE1hdERpYWxvZ0NvbmZpZygpO1xuICAgIGRpYWxvZ0NvbmZpZy5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcbiAgICBkaWFsb2dDb25maWcuYXV0b0ZvY3VzID0gdHJ1ZTtcbiAgICBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcyA9ICdtYXQtZGlhbG9nLWJrZy1jb250YWluZXInO1xuICAgIGRpYWxvZ0NvbmZpZy5kYXRhID0geyByZFVybDogdGhpcy5teUJvb2tpbmdzVVJMIH07XG4gICAgdGhpcy5kaWFsb2cub3BlbihMb2dpbk1vZGFsQ29tcG9uZW50LCBkaWFsb2dDb25maWcpO1xuICB9XG5cbiAgZ2V0Q2l0eUZyb21DaXR5Q29kZSA9IGFzeW5jIChjb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZm9vdGVyU2VydmljZS5nZXRDaXR5RnJvbUNpdHlDb2RlKGNvZGUpO1xuICAgIHRoaXMuY2l0eSA9IHJlc1snZGF0YSddO1xuICAgIHRoaXMuZ2V0UG9wdWxhckV2ZW50cygpO1xuICB9XG5cbiAgZ2V0UG9wdWxhckV2ZW50cyA9IGFzeW5jIChjb3VudHJ5Pzogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBsZXQgZmlsdGVyOiBhbnkgPSB7ICdtaW5TY29yZSc6IDAgfTtcbiAgICBpZiAoY291bnRyeSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbHRlclsnY291bnRyeSddID0gY291bnRyeTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5mb290ZXJTZXJ2aWNlLmdldFBvcHVsYXJFdmVudHModGhpcy5jaXR5ID8gdGhpcy5jaXR5LmxhdGl0dWRlIDogdW5kZWZpbmVkLCB0aGlzLmNpdHkgPyB0aGlzLmNpdHkubG9uZ2l0dWRlIDogdW5kZWZpbmVkLCBmaWx0ZXIpO1xuICAgIHRoaXMucG9wdWxhckV2ZW50cyA9IHJlcy5kYXRhLmRhdGE7XG4gIH1cblxuICBnZXRQb3B1bGFyQ2l0aWVzID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZm9vdGVyU2VydmljZS5nZXRBbGxQb3B1bGFyQ2l0aWVzKCk7XG4gICAgdGhpcy5wb3B1bGFyQ2l0aWVzID0gZGF0YVsnZGF0YSddO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucG9wdWxhckV2ZW50cyA9PSB1bmRlZmluZWQgfHwgdGhpcy5wb3B1bGFyRXZlbnRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnN1Yk9iamVjdCA9IHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVsnY2l0eSddKSB7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2l0eUZyb21DaXR5Q29kZShkYXRhWydjaXR5J10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5nZXRQb3B1bGFyRXZlbnRzKGRhdGFbJ2N1cnJlbnRQbGFjZSddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmdldFBvcHVsYXJDaXRpZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1Yk9iamVjdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc3ViT2JqZWN0LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=