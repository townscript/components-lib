import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginModalComponent } from '../../../loginSignup/ts-login-signup/login-modal/login-modal.component';
import { FooterService } from './ts-footer.service';
import { PlaceService } from '../ts-header/place.service';
import { UserService } from '../../../../shared/services/user-service';
import { UtilityService } from '../../../../shared/services/utilities.service';
let TsFooterComponent = class TsFooterComponent {
    constructor(dialog, userService, footerService, placeService, utilityService) {
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
        this.openContactUs = () => {
            window.open('/contact-us');
        };
        this.openMyBooking = () => {
            if (this.userService.user.source['value'] != undefined) {
                this.redirectToMyBookings();
            }
            else {
                this.openLogin();
            }
        };
        this.redirectToMyBookings = () => {
            window.open(this.myBookingsURL);
        };
        this.openLogin = () => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.backdropClass = 'mat-dialog-bkg-container';
            dialogConfig.data = { rdUrl: this.myBookingsURL };
            this.dialog.open(LoginModalComponent, dialogConfig);
        };
        this.getCityFromCityCode = (code) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.footerService.getCityFromCityCode(code);
            this.city = res['data'];
            //this.getPopularEvents();
        });
        this.getPopularEvents = (country) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let filter = { 'minScore': 0 };
            if (country != undefined) {
                filter['country'] = country;
            }
            const res = yield this.footerService.getPopularEvents(this.city ? this.city.latitude : undefined, this.city ? this.city.longitude : undefined, filter);
            this.popularEvents = res.data.data;
        });
        this.getPopularCities = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.footerService.getAllPopularCities();
            this.popularCities = data['data'];
        });
        this.setTrending = () => {
            this.trending = [{
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
    ngOnInit() {
        if (this.popularEvents == undefined || this.popularEvents.length == 0) {
            this.subObject = this.placeService.place.subscribe((res) => {
                if (this.utilityService.IsJsonString(res)) {
                    const data = JSON.parse(res);
                    if (data != undefined && Object.keys(data).length > 0) {
                        if (data['city']) {
                            this.getCityFromCityCode(data['city']);
                        }
                        else {
                            this.getPopularEvents(data['currentPlace']);
                        }
                    }
                }
            });
        }
        this.getPopularCities();
        this.setTrending();
    }
    ngOnDestroy() {
        if (this.subObject != undefined) {
            this.subObject.unsubscribe();
        }
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
export { TsFooterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtZm9vdGVyL3RzLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQU8vRSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQXFDNUIsWUFBb0IsTUFBaUIsRUFDM0IsV0FBd0IsRUFDeEIsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsY0FBOEI7UUFKcEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUMzQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF2Qy9CLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFDeEIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsaUJBQVksR0FBRztZQUN0QjtnQkFDRSxLQUFLLEVBQUUsK0JBQStCO2dCQUN0QyxHQUFHLEVBQUUsMERB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ZCxZQUFZO1FBQ1YsY0FBYztHQXpDN0IsaUJBQWlCLENBMEo3QjtTQTFKWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dDb25maWcgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL2xvZ2luLW1vZGFsL2xvZ2luLW1vZGFsLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEZvb3RlclNlcnZpY2UgfSBmcm9tICcuL3RzLWZvb3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uL3RzLWhlYWRlci9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWZvb3RlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1mb290ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1mb290ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0Zvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzb3VyY2UgPSAnbGFuZGluZ1BhZ2VzJztcbiAgQElucHV0KCkgcG9wdWxhckV2ZW50czogYW55ID0gW107XG4gIEBJbnB1dCgpIHJlY2VudEJsb2dzOiBhbnkgPSBbXTtcbiAgQElucHV0KCkgcG9wdWxhclJlYWRzID0gW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnSG93IHRvIE9yZ2FuaXplIGEgVGVkeCBFdmVudD8nLFxuICAgICAgdXJsOiAnaHR0cDovL2Jsb2cudG93bnNjcmlwdC5jb20vaG93LXRvLW9yZ2FuaXplLWEtdGVkeC1ldmVudC8nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1NlbGwgZXZlbnQgdGlja2V0cyBpbiAyNysgY291bnRyaWVzIHdpdGggVG93bnNjcmlwdCcsXG4gICAgICB1cmw6ICdodHRwOi8vYmxvZy50b3duc2NyaXB0LmNvbS9ub3ctc2VsbC1ldmVudC10aWNrZXQtaW50ZXJuYXRpb25hbGx5LWluLTI3LWNvdW50cmllcy13aXRoLXRvd25zY3JpcHQvJ1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdIb3cgdG8gU2VsbCBFdmVudCBUaWNrZXRzIE9ubGluZScsXG4gICAgICB1cmw6ICdodHRwOi8vYmxvZy50b3duc2NyaXB0LmNvbS9ob3ctdG8tc2VsbC1ldmVudC10aWNrZXRzLW9ubGluZS8nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0hvdyB0byBTZWxsIE91dCBZb3VyIEV2ZW50IFRpY2tldHMgd2l0aGluIE1pbnV0ZXM/JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9ibG9nLnRvd25zY3JpcHQuY29tL2hvdy10by1zZWxsLW91dC15b3VyLWV2ZW50LXRpY2tldHMtd3RoaW4tbWludXRlcy8nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJzUgUmVhc29ucyBZb3UgTmVlZCBtb3JlIHRoYW4gYSBQYXltZW50IEdhdGV3YXknLFxuICAgICAgdXJsOiAnaHR0cDovL2Jsb2cudG93bnNjcmlwdC5jb20vNS1yZWFzb25zLXlvdS1uZWVkLW1vcmUtdGhhbi1hLXBheW1lbnQtZ2F0ZXdheS1mb3IteW91ci1ldmVudC8nXG4gICAgfVxuICBdO1xuICBASW5wdXQoKSBwb3B1bGFyQ2l0aWVzOiBhbnk7XG4gIHRyZW5kaW5nOiBhbnk7XG4gIHBvcHVsYXJFdmVudHNEYXRhOiBhbnk7XG4gIGNvdW50cnlDaXR5TWFwOiBhbnk7XG4gIGNpdHk6IGFueTtcbiAgcGxhY2VJZDogc3RyaW5nO1xuICBjb3B5cmlnaHRZZWFyOm51bWJlcjtcbiAgbXlCb29raW5nc1VSTCA9ICcvZGFzaGJvYXJkL215Ym9va2luZ3MnO1xuICBzdWJPYmplY3Q6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZm9vdGVyU2VydmljZTogRm9vdGVyU2VydmljZSxcbiAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmNvcHlyaWdodFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gIH1cblxuICBvcGVuQ29udGFjdFVzID0gKCkgPT4ge1xuICAgIHdpbmRvdy5vcGVuKCcvY29udGFjdC11cycpO1xuICB9XG5cbiAgb3Blbk15Qm9va2luZyA9ICgpID0+IHtcbiAgICBpZiAodGhpcy51c2VyU2VydmljZS51c2VyLnNvdXJjZVsndmFsdWUnXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMucmVkaXJlY3RUb015Qm9va2luZ3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuTG9naW4oKTtcbiAgICB9XG4gIH1cblxuICByZWRpcmVjdFRvTXlCb29raW5ncyA9ICgpOiB2b2lkID0+IHtcbiAgICB3aW5kb3cub3Blbih0aGlzLm15Qm9va2luZ3NVUkwpO1xuICB9XG5cbiAgb3BlbkxvZ2luID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcbiAgICBkaWFsb2dDb25maWcuZGlzYWJsZUNsb3NlID0gZmFsc2U7XG4gICAgZGlhbG9nQ29uZmlnLmF1dG9Gb2N1cyA9IHRydWU7XG4gICAgZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MgPSAnbWF0LWRpYWxvZy1ia2ctY29udGFpbmVyJztcbiAgICBkaWFsb2dDb25maWcuZGF0YSA9IHsgcmRVcmw6IHRoaXMubXlCb29raW5nc1VSTCB9O1xuICAgIHRoaXMuZGlhbG9nLm9wZW4oTG9naW5Nb2RhbENvbXBvbmVudCwgZGlhbG9nQ29uZmlnKTtcbiAgfVxuXG4gIGdldENpdHlGcm9tQ2l0eUNvZGUgPSBhc3luYyAoY29kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmZvb3RlclNlcnZpY2UuZ2V0Q2l0eUZyb21DaXR5Q29kZShjb2RlKTtcbiAgICB0aGlzLmNpdHkgPSByZXNbJ2RhdGEnXTtcbiAgICAvL3RoaXMuZ2V0UG9wdWxhckV2ZW50cygpO1xuICB9XG5cbiAgZ2V0UG9wdWxhckV2ZW50cyA9IGFzeW5jIChjb3VudHJ5Pzogc3RyaW5nKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBsZXQgZmlsdGVyOiBhbnkgPSB7ICdtaW5TY29yZSc6IDAgfTtcbiAgICBpZiAoY291bnRyeSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbHRlclsnY291bnRyeSddID0gY291bnRyeTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5mb290ZXJTZXJ2aWNlLmdldFBvcHVsYXJFdmVudHModGhpcy5jaXR5ID8gdGhpcy5jaXR5LmxhdGl0dWRlIDogdW5kZWZpbmVkLCB0aGlzLmNpdHkgPyB0aGlzLmNpdHkubG9uZ2l0dWRlIDogdW5kZWZpbmVkLCBmaWx0ZXIpO1xuICAgIHRoaXMucG9wdWxhckV2ZW50cyA9IHJlcy5kYXRhLmRhdGE7XG4gIH1cblxuICBnZXRQb3B1bGFyQ2l0aWVzID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZm9vdGVyU2VydmljZS5nZXRBbGxQb3B1bGFyQ2l0aWVzKCk7XG4gICAgdGhpcy5wb3B1bGFyQ2l0aWVzID0gZGF0YVsnZGF0YSddO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucG9wdWxhckV2ZW50cyA9PSB1bmRlZmluZWQgfHwgdGhpcy5wb3B1bGFyRXZlbnRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnN1Yk9iamVjdCA9IHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgIGlmIChkYXRhICE9IHVuZGVmaW5lZCAmJiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVsnY2l0eSddKSB7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2l0eUZyb21DaXR5Q29kZShkYXRhWydjaXR5J10pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5nZXRQb3B1bGFyRXZlbnRzKGRhdGFbJ2N1cnJlbnRQbGFjZSddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmdldFBvcHVsYXJDaXRpZXMoKTtcbiAgICB0aGlzLnNldFRyZW5kaW5nKCk7XG4gIH1cbiAgc2V0VHJlbmRpbmcgPSAoKSA9PiB7XG4gICAgdGhpcy50cmVuZGluZyA9IFt7XG4gICAgICAnbmFtZSc6ICdOZXcgWWVhciBQYXJ0aWVzIGluIEJlbmdhbHVydScsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2JhbmdhbG9yZS9uZXcteWVhci1wYXJ0eSdcbiAgICB9LFxuICAgIHtcbiAgICAgICduYW1lJzogJ05ldyBZZWFyIFBhcnRpZXMgaW4gUHVuZScsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL3B1bmUvbmV3LXllYXItcGFydHknXG4gICAgfSxcbiAgICB7XG4gICAgICAnbmFtZSc6ICdOZXcgWWVhciBQYXJ0aWVzIGluIE11bWJhaScsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL211bWJhaS9uZXcteWVhci1wYXJ0eSdcbiAgICB9LFxuICAgIHtcbiAgICAgICduYW1lJzogJ05ldyBZZWFyIFBhcnRpZXMgaW4gQ29pbWJhdG9yZScsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2NvaW1iYXRvcmUvbmV3LXllYXItcGFydHknXG4gICAgfSxcbiAgICB7XG4gICAgICAnbmFtZSc6ICdOZXcgWWVhciBQYXJ0aWVzIGluIFRoYW5lJyxcbiAgICAgICd1cmwnOiAnaHR0cHM6Ly93d3cudG93bnNjcmlwdC5jb20vaW4vdGhhbmUvbmV3LXllYXItcGFydHknXG4gICAgfSxcbiAgICB7XG4gICAgICAnbmFtZSc6ICdOZXcgWWVhciBQYXJ0aWVzIGluIERlaHJhZHVuJyxcbiAgICAgICd1cmwnOiAnaHR0cHM6Ly93d3cudG93bnNjcmlwdC5jb20vZGVocmFkdW4vbmV3LXllYXItcGFydHknXG4gICAgfSwge1xuICAgICAgJ25hbWUnOiAnTmV3IFllYXIgUGFydGllcyBpbiBJbmRvcmUnLFxuICAgICAgJ3VybCc6ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9pbmRvcmUvbmV3LXllYXItcGFydHknXG4gICAgfSxcbiAgICB7XG4gICAgICAnbmFtZSc6ICdOZXcgWWVhciBQYXJ0aWVzIGluIENoZW5uYWknLFxuICAgICAgJ3VybCc6ICdodHRwczovL3d3dy50b3duc2NyaXB0LmNvbS9jaGVubmFpL25ldy15ZWFyLXBhcnR5J1xuICAgIH0sXG4gICAge1xuICAgICAgJ25hbWUnOiAnTmV3IFllYXIgUGFydGllcyBpbiBEZWxoaScsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2RlbGhpL25ldy15ZWFyLXBhcnR5J1xuICAgIH0sXG4gICAge1xuICAgICAgJ25hbWUnOiAnTmV3IFllYXIgUGFydGllcyBpbiBJbmRpYScsXG4gICAgICAndXJsJzogJ2h0dHBzOi8vd3d3LnRvd25zY3JpcHQuY29tL2luZGlhL25ldy15ZWFyLXBhcnR5J1xuICAgIH1dXG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3ViT2JqZWN0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zdWJPYmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==