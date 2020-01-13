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
        this.setTrending = function () {
            _this.trending = [{
                    'name': 'New Year Parties in Bengaluru',
                    'url': 'https://www.townscript.com/bangalore/new-year-party'
                },
                {
                    'name': 'New Year Parties in Pune',
                    'url': 'https://www.townscript.com/pune/new-year-party'
                },
                {
                    'name': 'New Year Parties in Mumbai',
                    'url': 'https://www.townscript.com/mumbai/new-year-party'
                },
                {
                    'name': 'New Year Parties in Coimbatore',
                    'url': 'https://www.townscript.com/coimbatore/new-year-party'
                },
                {
                    'name': 'New Year Parties in Thane',
                    'url': 'https://www.townscript.com/in/thane/new-year-party'
                },
                {
                    'name': 'New Year Parties in Dehradun',
                    'url': 'https://www.townscript.com/dehradun/new-year-party'
                }, {
                    'name': 'New Year Parties in Indore',
                    'url': 'https://www.townscript.com/indore/new-year-party'
                },
                {
                    'name': 'New Year Parties in Chennai',
                    'url': 'https://www.townscript.com/chennai/new-year-party'
                },
                {
                    'name': 'New Year Parties in Delhi',
                    'url': 'https://www.townscript.com/delhi/new-year-party'
                },
                {
                    'name': 'New Year Parties in India',
                    'url': 'https://www.townscript.com/india/new-year-party'
                }];
        };
        this.copyrightYear = new Date().getFullYear();
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
        this.setTrending();
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
            template: "<footer class=\"ts-footer text-center pt-8 pb-4 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16\"\n    [class.new-footer]=\"source=='marketplace'\">\n    <div class=\"ts-container content-footer\">\n        <div class=\"flex md:mb-4\">\n            <div class=\"w-1/5 hidden-xs px-4\">\n                <h5>ORGANISE EVENTS</h5>\n                <ul class=\"list-unstyled\">\n                    <li appDataAnalytics eventLabel=\"organizeEvents\" clickLocation=\"\"><a\n                            href=\"/i/conference-registration\">Conferences</a></li>\n                    <li appDataAnalytics eventLabel=\"organizeEvents\" clickLocation=\"\"><a\n                            href=\"/i/workshops-and-trainings\">Workshops and Trainings</a></li>\n                    <li appDataAnalytics eventLabel=\"organizeEvents\" clickLocation=\"\"><a\n                            href=\"/i/college-fest-payment-portal\">College Festivals</a></li>\n                    <li appDataAnalytics eventLabel=\"organizeEvents\" clickLocation=\"\"><a\n                            href=\"/i/marathon-cycling-trips-treks-registration\">Sports and Fitness Events</a></li>\n                    <li appDataAnalytics eventLabel=\"organizeEvents\" clickLocation=\"\"><a\n                            href=\"/i/entertainment-events-ticketing\">Entertainment Events</a></li>\n                    <li appDataAnalytics eventLabel=\"organizeEvents\" clickLocation=\"\"><a\n                            href=\"/i/meetup-registration\">Meetups and Reunions</a></li>\n                    <li appDataAnalytics eventLabel=\"organizeEvents\" clickLocation=\"\"><a\n                            href=\"/i/treks-trips-registration\">Treks and Trips</a></li>\n                    <!-- <li><a href=\"/i/fundraising-crowdfunding\">Fundraisings</a></li> -->\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\">\n                <h5>POPULAR SEARCHES</h5>\n                <ul class=\"list-unstyled\">\n                    <!--<li><a href=\"/pune/new-year-party\">New Year Parties In Pune</a></li>\n\t\t\t\t<li><a href=\"/mumbai/new-year-party\">New Year Parties In Mumbai</a></li>\n\t\t\t\t<li><a href=\"/delhi/new-year-party\">New Year Parties In Delhi</a></li>\n\t\t\t\t<li><a href=\"/bangalore/new-year-party\">New Year Parties In Bangalore</a></li>-->\n                    <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                            href=\"http://support.townscript.com/support/solutions/articles/1000265220-list-of-countries-supported-by-townscript-\">\n                            List of Countries supported by Townscript</a></li>\n                    <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                            href=\"/i/sell-event-tickets-online\">Sell Event Tickets Online</a></li>\n                    <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                            href=\"/i/event-management-software\">Event Management Software</a></li>\n                    <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                            href=\"/i/event-registration-software\">Event Registration Software</a></li>\n                    <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                            href=\"/i/conference-management-system\">Conference management System</a></li>\n                    <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                            href=\"/i/event-planning-software\">Event Planning Software</a></li>\n                    <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                            href=\"/i/online-event-ticketing\">Online Event Ticketing</a></li>\n                    <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                            href=\"/i/corporate-event-management\">Corporate Event Management</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\" *ngIf=\"source=='landingPages'\">\n                <h5>RECENT BLOGS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li appDataAnalytics eventLabel=\"recentBlogs\" clickLocation=\"\" *ngFor=\"let blog of recentBlogs\"><a\n                            [href]=\"blog.url\">{{blog.title}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\" *ngIf=\"source=='marketplace'\">\n                <h5>POPULAR EVENTS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li appDataAnalytics eventLabel=\"popular-events\" clickLocation=\"\"\n                        *ngFor=\"let event of popularEvents\"><a [href]=\"'e/'+event.shortName\">{{event.name}}</a></li>\n                </ul>\n                <!-- <h5>Trending on Townscript</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li appDataAnalytics eventLabel=\"trendingTownscript\" clickLocation=\"\"\n                        *ngFor=\" let trend of trending\"><a [href]=\"trend.url\">{{trend.name}}</a></li>\n                </ul> -->\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\">\n                <h5>POPULAR READS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li appDataAnalytics eventLabel=\"popularReads\" clickLocation=\"\" *ngFor=\"let read of popularReads\">\n                        <a [href]=\"read.url\" target=\"_blank\">{{read.title}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 hidden-xs pl-12\">\n                <h5>BOOKINGS</h5>\n                <ul class=\"list-unstyled\">\n                    <li appDataAnalytics eventLabel=\"bookings\" clickLocation=\"\">\n                        <div class=\"mybookings cursor-pointer\" (click)=\"openMyBooking()\">My Bookings</div>\n                    </li>\n                </ul>\n                <h5 (click)=\"openContactUs()\">GET IN TOUCH</h5>\n                <!--<h5><a href=\"mailto:service@townscript.com\" target=\"_blank\" class=\"mail-to visible-xs\">service@townscript.com</a></h5>-->\n                <ul class=\"list-unstyled\">\n                    <!-- \t\t\t\t<li class=\"hidden-xs\">\n\t\t\t\t\t<a href=\"#\">Contact us</a>\n\t\t\t\t</li> -->\n                    <li class=\"social-list-item\">\n                        <ul class=\"social-list clearfix\">\n                            <li appDataAnalytics eventLabel=\"socialFb\" clickLocation=\"\">\n                                <a href=\"https://www.facebook.com/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-facebook\"></i></a>\n                            </li>\n                            <li appDataAnalytics eventLabel=\"socialTwitter\" clickLocation=\"\">\n                                <a href=\"https://twitter.com/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-twitter\"></i></a>\n                            </li>\n                            <li appDataAnalytics eventLabel=\"socialGoogle\" clickLocation=\"\">\n                                <a href=\"https://plus.google.com/+Townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-google-plus\"></i></a>\n                            </li>\n                            <li appDataAnalytics eventLabel=\"socialLinkedin\" clickLocation=\"\">\n                                <a href=\"https://www.linkedin.com/company/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-linkedin\"></i></a>\n                            </li>\n                            <!--<li>\n\t\t\t\t\t\t\t<a href=\"mailto:service@townscript.com\" target=\"_blank\"><i class=\"ion-email\"></i></a>\n\t\t\t\t\t\t</li>-->\n                        </ul>\n                    </li>\n                </ul>\n                <h5 class=\"hidden-xs\">ORGANIZER APP</h5>\n                <ul class=\"list-apps hidden-xs\">\n                    <li appDataAnalytics eventLabel=\"appAndroid\" clickLocation=\"\">\n                        <a href=\"//play.google.com/store/apps/details?id=com.dyulok.android.organizerapp&hl=en_IN\"\n                            title=\"Download on Google play\" class=\"store-icon google-play-icon\" target=\"_blank\">Download\n                            on Google\n                            play</a>\n                    </li>\n                    <li appDataAnalytics eventLabel=\"appIos\" clickLocation=\"\">\n                        <a href=\"//itunes.apple.com/in/app/townscript-event-manager/id1441088900?mt=8\"\n                            title=\"Download on App Store\" target=\"_blank\" class=\"store-icon app-store-icon\">Download on\n                            App Store</a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"w-full block md:hidden\">\n                <div class=\"flex flex-col justify-center items-center\">\n                    <div class=\"text-3xl text-gray-400 px-5 pr-32 mr-5\">&ldquo;Live an</div>\n                    <div class=\"text-4xl text-gray-400 font-semibold -mt-3 px-5 pl-12\"><span\n                            class=\"text-purple-300\">Event</span>ful life&rdquo;</div>\n                    <img class=\"dance-illustration\"\n                        [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ts-illustrations/partying_2.png'\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"ts-container\">\n        <div class=\"brand-footer border-0 md:border-t pt-2 md:pt-4 lg:pt-8\">\n            <div class=\"flex md:mb-4\">\n                <div class=\"w-full flex flex-col items-center md:items-start md:w-1/5 px-4 ts-logo\">\n                    <img [lazyLoad]=\"'assets/images/ts-logoBMS.png'\" alt=\"Townscript Event Ticketing Logo\"\n                        title=\"Townscript Event Ticketing Logo\" />\n                    <span class=\"ts-footer__copyright text-right pr-2 text-xs text-gray-800\">Copyright@{{copyrightYear}}</span>\n                    <!--<a href=\"mailto:service@townscript.com\" target=\"_blank\" class=\"ts-footer__mail hidden-xs\">service@townscript.com</a>-->\n                </div>\n                <div class=\"w-3/5 linear-footer hidden-xs pl-4\">\n                    <h5>LEARN MORE</h5>\n                    <br>\n                    <ul class=\"list-linear\">\n                        <!-- <li><a href=\"#\">Features</a></li> -->\n                        <li appDataAnalytics eventLabel=\"learnMorePricing\" clickLocation=\"\"><a\n                                href=\"/pricing\">Pricing</a></li>\n                        <li><a href=\"/how-it-works\" ts-data-analytics prop-event=\"click\" eventLabel=\"How It Works\"\n                                prop-clicked-location=\"Footer\">How it works</a></li>\n                        <!-- <li><a href=\"#\">Mobile Apps</a></li> -->\n                        <li appDataAnalytics eventLabel=\"learnMoreApi\" clickLocation=\"\"><a\n                                href=\"//townscript-api.readme.io/\" target=\"_blank\">APIs for Developers</a></li>\n                        <li appDataAnalytics eventLabel=\"learnMorePolicies\" clickLocation=\"\"><a\n                                href=\"/terms-and-conditions\">Policies</a></li>\n                        <li appDataAnalytics eventLabel=\"learnMorePrivacy\" clickLocation=\"\"><a\n                                href=\"/privacy-policy\">Privacy</a></li>\n                        <li appDataAnalytics eventLabel=\"learnMoreSupport\" clickLocation=\"\"><a\n                                href=\"http://support.townscript.com/support/home\" target=\"_blank\">Support / FAQs</a>\n                        </li>\n                    </ul>\n                    <div class=\"linear-footer hidden-xs\" *ngIf=\"source=='marketplace'\">\n                        <h5>POPULAR CITIES</h5>\n                        <br>\n                        <ul class=\"list-linear\">\n                            <li appDataAnalytics eventLabel=\"popularCities\" clickLocation=\"\"\n                                *ngFor=\"let city of popularCities\">\n                                <div><a href=\"/{{city.countryCode + '/' + city.name | lowercase}}\">{{city.name}}</a>\n                                </div>\n                            </li>\n                        </ul>\n                    </div>\n                    <div class=\"linear-footer hidden-xs\">\n                        <h5>ABOUT</h5>\n                        <br>\n                        <ul class=\"list-linear\">\n                            <li><a appDataAnalytics eventLabel=\"aboutUs\" clickLocation=\"\" href=\"/about-us\">About us</a>\n                            </li>\n                            <li><a appDataAnalytics eventLabel=\"aboutUs\" clickLocation=\"\" href=\"/contact-us\">Contact\n                                    us</a></li>\n                            <!-- <li><a href=\"#\">Career</a></li> -->\n                            <!-- <li><a href=\"#\">Media</a></li> -->\n                            <li><a appDataAnalytics eventLabel=\"aboutUs\" clickLocation=\"\"\n                                    href=\"http://blog.townscript.com\" target=\"_blank\">Blog</a></li>\n                            <li><a appDataAnalytics eventLabel=\"aboutUs\" clickLocation=\"\"\n                                    href=\"http://eventmagazine.townscript.com/\" target=\"_blank\">Event Magazine</a></li>\n                            <li><a appDataAnalytics eventLabel=\"aboutUs\" clickLocation=\"\"\n                                    href=\"https://productblog.townscript.com/\" target=\"_blank\">Product Diary</a></li>\n                            <li><a appDataAnalytics eventLabel=\"aboutUs\" clickLocation=\"\" href=\"/sitemap\"\n                                    target=\"_blank\">Sitemap</a></li>\n                        </ul>\n                    </div>\n                </div>\n                <div appDataAnalytics eventLabel=\"g2Crowd\" clickLocation=\"\"\n                    class=\"mixpanel-button align-text hidden-xs px-10 pt-8 mx-2\">\n                    <a href=\"https://www.g2crowd.com/products/townscript/reviews\" target=\"_blank\">\n                        <img [lazyLoad]=\"'https://s3-ap-southeast-1.amazonaws.com/common-resources/assets/g2badge.png'\"\n                            alt=\"G2Crowd Townscript Reviews\" width=\"100\">\n                        <span>72 Reviews</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n    <br>\n</footer>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtZm9vdGVyL3RzLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQU8vRTtJQXFDRSwyQkFBb0IsTUFBaUIsRUFDM0IsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsY0FBOEI7UUFKeEMsaUJBTUM7UUFObUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUMzQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF2Qy9CLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFDeEIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsaUJBQVksR0FBRztZQUN0QjtnQkFDRSxLQUFLLEVBQUUsK0JBQStCO2dCQUN0QyxHQUFHLEVBQUUsMERBQTBEO2FBQ2hFO1lBQ0Q7Z0JB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bnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2xvZ2luU2lnbnVwL3RzLWxvZ2luLXNpZ251cC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBGb290ZXJTZXJ2aWNlIH0gZnJvbSAnLi90cy1mb290ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0cy1mb290ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdHMtZm9vdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHMtZm9vdGVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVHNGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgc291cmNlID0gJ2xhbmRpbmdQYWdlcyc7XG4gIEBJbnB1dCgpIHBvcHVsYXJFdmVudHM6IGFueSA9IFtdO1xuICBASW5wdXQoKSByZWNlbnRCbG9nczogYW55ID0gW107XG4gIEBJbnB1dCgpIHBvcHVsYXJSZWFkcyA9IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ0hvdyB0byBPcmdhbml6ZSBhIFRlZHggRXZlbnQ/JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9ibG9nLnRvd25zY3JpcHQuY29tL2hvdy10by1vcmdhbml6ZS1hLXRlZHgtZXZlbnQvJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdTZWxsIGV2ZW50IHRpY2tldHMgaW4gMjcrIGNvdW50cmllcyB3aXRoIFRvd25zY3JpcHQnLFxuICAgICAgdXJsOiAnaHR0cDovL2Jsb2cudG93bnNjcmlwdC5jb20vbm93LXNlbGwtZXZlbnQtdGlja2V0LWludGVybmF0aW9uYWxseS1pbi0yNy1jb3VudHJpZXMtd2l0aC10b3duc2NyaXB0LydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnSG93IHRvIFNlbGwgRXZlbnQgVGlja2V0cyBPbmxpbmUnLFxuICAgICAgdXJsOiAnaHR0cDovL2Jsb2cudG93bnNjcmlwdC5jb20vaG93LXRvLXNlbGwtZXZlbnQtdGlja2V0cy1vbmxpbmUvJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdIb3cgdG8gU2VsbCBPdXQgWW91ciBFdmVudCBUaWNrZXRzIHdpdGhpbiBNaW51dGVzPycsXG4gICAgICB1cmw6ICdodHRwOi8vYmxvZy50b3duc2NyaXB0LmNvbS9ob3ctdG8tc2VsbC1vdXQteW91ci1ldmVudC10aWNrZXRzLXd0aGluLW1pbnV0ZXMvJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICc1IFJlYXNvbnMgWW91IE5lZWQgbW9yZSB0aGFuIGEgUGF5bWVudCBHYXRld2F5JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9ibG9nLnRvd25zY3JpcHQuY29tLzUtcmVhc29ucy15b3UtbmVlZC1tb3JlLXRoYW4tYS1wYXltZW50LWdhdGV3YXktZm9yLXlvdXItZXZlbnQvJ1xuICAgIH1cbiAgXTtcbiAgQElucHV0KCkgcG9wdWxhckNpdGllczogYW55O1xuICB0cmVuZGluZzogYW55O1xuICBwb3B1bGFyRXZlbnRzRGF0YTogYW55O1xuICBjb3VudHJ5Q2l0eU1hcDogYW55O1xuICBjaXR5OiBhbnk7XG4gIHBsYWNlSWQ6IHN0cmluZztcbiAgY29weXJpZ2h0WWVhcjpudW1iZXI7XG4gIG15Qm9va2luZ3NVUkwgPSAnL2Rhc2hib2FyZC9teWJvb2tpbmdzJztcbiAgc3ViT2JqZWN0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGZvb3RlclNlcnZpY2U6IEZvb3RlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSxcbiAgICBwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSkge1xuICAgICAgdGhpcy5jb3B5cmlnaHRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICB9XG5cbiAgb3BlbkNvbnRhY3RVcyA9ICgpID0+IHtcbiAgICB3aW5kb3cub3BlbignL2NvbnRhY3QtdXMnKTtcbiAgfVxuXG4gIG9wZW5NeUJvb2tpbmcgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMudXNlclNlcnZpY2UudXNlci5zb3VyY2VbJ3ZhbHVlJ10gIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnJlZGlyZWN0VG9NeUJvb2tpbmdzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbkxvZ2luKCk7XG4gICAgfVxuICB9XG5cbiAgcmVkaXJlY3RUb015Qm9va2luZ3MgPSAoKTogdm9pZCA9PiB7XG4gICAgd2luZG93Lm9wZW4odGhpcy5teUJvb2tpbmdzVVJMKTtcbiAgfVxuXG4gIG9wZW5Mb2dpbiA9ICgpID0+IHtcbiAgICBjb25zdCBkaWFsb2dDb25maWcgPSBuZXcgTWF0RGlhbG9nQ29uZmlnKCk7XG4gICAgZGlhbG9nQ29uZmlnLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xuICAgIGRpYWxvZ0NvbmZpZy5hdXRvRm9jdXMgPSB0cnVlO1xuICAgIGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzID0gJ21hdC1kaWFsb2ctYmtnLWNvbnRhaW5lcic7XG4gICAgZGlhbG9nQ29uZmlnLmRhdGEgPSB7IHJkVXJsOiB0aGlzLm15Qm9va2luZ3NVUkwgfTtcbiAgICB0aGlzLmRpYWxvZy5vcGVuKExvZ2luTW9kYWxDb21wb25lbnQsIGRpYWxvZ0NvbmZpZyk7XG4gIH1cblxuICBnZXRDaXR5RnJvbUNpdHlDb2RlID0gYXN5bmMgKGNvZGU6IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5mb290ZXJTZXJ2aWNlLmdldENpdHlGcm9tQ2l0eUNvZGUoY29kZSk7XG4gICAgdGhpcy5jaXR5ID0gcmVzWydkYXRhJ107XG4gICAgLy90aGlzLmdldFBvcHVsYXJFdmVudHMoKTtcbiAgfVxuXG4gIGdldFBvcHVsYXJFdmVudHMgPSBhc3luYyAoY291bnRyeT86IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgbGV0IGZpbHRlcjogYW55ID0geyAnbWluU2NvcmUnOiAwIH07XG4gICAgaWYgKGNvdW50cnkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaWx0ZXJbJ2NvdW50cnknXSA9IGNvdW50cnk7XG4gICAgfVxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZm9vdGVyU2VydmljZS5nZXRQb3B1bGFyRXZlbnRzKHRoaXMuY2l0eSA/IHRoaXMuY2l0eS5sYXRpdHVkZSA6IHVuZGVmaW5lZCwgdGhpcy5jaXR5ID8gdGhpcy5jaXR5LmxvbmdpdHVkZSA6IHVuZGVmaW5lZCwgZmlsdGVyKTtcbiAgICB0aGlzLnBvcHVsYXJFdmVudHMgPSByZXMuZGF0YS5kYXRhO1xuICB9XG5cbiAgZ2V0UG9wdWxhckNpdGllcyA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmZvb3RlclNlcnZpY2UuZ2V0QWxsUG9wdWxhckNpdGllcygpO1xuICAgIHRoaXMucG9wdWxhckNpdGllcyA9IGRhdGFbJ2RhdGEnXTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLnBvcHVsYXJFdmVudHMgPT0gdW5kZWZpbmVkIHx8IHRoaXMucG9wdWxhckV2ZW50cy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5zdWJPYmplY3QgPSB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzKTtcbiAgICAgICAgICBpZiAoZGF0YSAhPSB1bmRlZmluZWQgJiYgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGRhdGFbJ2NpdHknXSkge1xuICAgICAgICAgICAgICB0aGlzLmdldENpdHlGcm9tQ2l0eUNvZGUoZGF0YVsnY2l0eSddKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0UG9wdWxhckV2ZW50cyhkYXRhWydjdXJyZW50UGxhY2UnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5nZXRQb3B1bGFyQ2l0aWVzKCk7XG4gICAgdGhpcy5zZXRUcmVuZGluZygpO1xuICB9XG4gIHNldFRyZW5kaW5nID0gKCkgPT4ge1xuICAgIHRoaXMudHJlbmRpbmcgPSBbe1xuICAgICAgJ25hbWUnOiAnTmV3IFllYXIgUGFydGllcyBpbiBCZW5nYWx1cnUnLFxuICAgICAgJ3VybCc6ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9iYW5nYWxvcmUvbmV3LXllYXItcGFydHknXG4gICAgfSxcbiAgICB7XG4gICAgICAnbmFtZSc6ICdOZXcgWWVhciBQYXJ0aWVzIGluIFB1bmUnLFxuICAgICAgJ3VybCc6ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9wdW5lL25ldy15ZWFyLXBhcnR5J1xuICAgIH0sXG4gICAge1xuICAgICAgJ25hbWUnOiAnTmV3IFllYXIgUGFydGllcyBpbiBNdW1iYWknLFxuICAgICAgJ3VybCc6ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9tdW1iYWkvbmV3LXllYXItcGFydHknXG4gICAgfSxcbiAgICB7XG4gICAgICAnbmFtZSc6ICdOZXcgWWVhciBQYXJ0aWVzIGluIENvaW1iYXRvcmUnLFxuICAgICAgJ3VybCc6ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9jb2ltYmF0b3JlL25ldy15ZWFyLXBhcnR5J1xuICAgIH0sXG4gICAge1xuICAgICAgJ25hbWUnOiAnTmV3IFllYXIgUGFydGllcyBpbiBUaGFuZScsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2luL3RoYW5lL25ldy15ZWFyLXBhcnR5J1xuICAgIH0sXG4gICAge1xuICAgICAgJ25hbWUnOiAnTmV3IFllYXIgUGFydGllcyBpbiBEZWhyYWR1bicsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2RlaHJhZHVuL25ldy15ZWFyLXBhcnR5J1xuICAgIH0sIHtcbiAgICAgICduYW1lJzogJ05ldyBZZWFyIFBhcnRpZXMgaW4gSW5kb3JlJyxcbiAgICAgICd1cmwnOiAnaHR0cHM6Ly93d3cudG93bnNjcmlwdC5jb20vaW5kb3JlL25ldy15ZWFyLXBhcnR5J1xuICAgIH0sXG4gICAge1xuICAgICAgJ25hbWUnOiAnTmV3IFllYXIgUGFydGllcyBpbiBDaGVubmFpJyxcbiAgICAgICd1cmwnOiAnaHR0cHM6Ly93d3cudG93bnNjcmlwdC5jb20vY2hlbm5haS9uZXcteWVhci1wYXJ0eSdcbiAgICB9LFxuICAgIHtcbiAgICAgICduYW1lJzogJ05ldyBZZWFyIFBhcnRpZXMgaW4gRGVsaGknLFxuICAgICAgJ3VybCc6ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9kZWxoaS9uZXcteWVhci1wYXJ0eSdcbiAgICB9LFxuICAgIHtcbiAgICAgICduYW1lJzogJ05ldyBZZWFyIFBhcnRpZXMgaW4gSW5kaWEnLFxuICAgICAgJ3VybCc6ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9pbmRpYS9uZXcteWVhci1wYXJ0eSdcbiAgICB9XVxuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1Yk9iamVjdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc3ViT2JqZWN0LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=