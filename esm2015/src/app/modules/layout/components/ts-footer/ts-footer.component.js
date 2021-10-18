import { __awaiter, __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FooterService } from './ts-footer.service';
let TsFooterComponent = class TsFooterComponent {
    constructor(footerService) {
        this.footerService = footerService;
        this.showBuilding = true;
        this.getPopularCities = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.footerService.getAllPopularCities();
            this.popularCities = data['data'];
        });
    }
    ngOnInit() {
        this.copyrightYear = new Date().getFullYear();
        if (this.popularCities == undefined) {
            this.getPopularCities();
        }
    }
};
TsFooterComponent.ctorParameters = () => [
    { type: FooterService }
];
__decorate([
    Input()
], TsFooterComponent.prototype, "popularCities", void 0);
__decorate([
    Input()
], TsFooterComponent.prototype, "showBuilding", void 0);
TsFooterComponent = __decorate([
    Component({
        selector: 'ts-footer',
        template: "<div class=\"hidden md:block building-image-container\" *ngIf=\"showBuilding\">\n</div>\n<footer>\n  <div class=\"ts-footer flex p-5 lg:p-8 lg:pb-10 bg-white\" [ngClass]=\"showBuilding ? 'lg:pb-12 lg:mb-2': ''\">\n    <div class=\"section-1 hidden md:block px-5 border-r border-gray-400 w-1/5 mr-5\">\n      <div class=\"flex flex-col  justify-between h-full\">\n        <div class=\"ts-logo w-11/12 pr-3 mb-2\">\n          <img [lazyLoad]=\"'assets/images/ts-logo.svg'\" alt=\"Townscript Event Ticketing Logo\" class=\"w-full h-auto\"\n            title=\"Townscript Event Ticketing Logo\" />\n          <div class=\"ts-footer__copyright text-right pr-2 text-xs text-gray-700 opacity-75\">Copyright@{{copyrightYear}}\n          </div>\n        </div>\n        <div class=\"my-booking-link w-full py-2\" appDataAnalytics eventLabel=\"bookings\" clickLocation=\"\">\n          <a href=\"/dashboard/mybookings\" target=\"_blank\" title=\"View Your Bookings\">\n            <div class=\"font-semibold text-gray-800 text-sm w-full whitespace-no-wrap flex items-center\">\n              View Your Bookings\n              <i class=\"ml-1 mdi mdi-open-in-new text-lg\"></i>\n            </div>\n          </a>\n        </div>\n        <div class=\"organizer-app-links pr-10 py-2\">\n          <h5 class=\"font-semibold text-gray-800 text-sm  whitespace-no-wrap\">Organizer App</h5>\n          <ul class=\"list-apps flex mt-1\">\n            <li appDataAnalytics eventLabel=\"appAndroid\" clickLocation=\"\">\n              <a href=\"//play.google.com/store/apps/details?id=com.dyulok.android.organizerapp&hl=en_IN\"\n                title=\"Download on Google play\" target=\"_blank\">\n                <div class=\"google-logo mr-3\">\n                  <i class=\"text-2xl mdi mdi-google-play\"></i>\n                  <!-- <img src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/Marketplace/footer/google-play-badge.png\" alt=\"Download on Google Play Store\"> -->\n                </div>\n              </a>\n            </li>\n            <li appDataAnalytics eventLabel=\"appIos\" clickLocation=\"\">\n              <a href=\"//itunes.apple.com/in/app/townscript-event-manager/id1441088900?mt=8\"\n                title=\"Download on App Store\" target=\"_blank\">\n                <div class=\"apple-log\">\n                  <i class=\"text-2xl mdi mdi-apple\"></i>\n                  <!-- <img src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/Marketplace/footer/apple-app-badge.png\" alt=\"Download on App Store\"> -->\n                </div>\n              </a>\n            </li>\n          </ul>\n        </div>\n        <div class=\"social-follow pt-2\">\n          <h5 class=\"font-semibold text-gray-800 text-sm whitespace-no-wrap\">Follow us on</h5>\n          <ul class=\"social-list flex flex-wrap pr-4 text-xl mt-2 -ml-1 -mb-1\">\n            <li appDataAnalytics eventLabel=\"socialFb\" clickLocation=\"\">\n              <a href=\"https://www.facebook.com/townscript\" target=\"_blank\" aria-label=\"Find Us On Facebook\"\n                title=\"Facebook\">\n                <i class=\"mdi mdi-facebook mr-4\"></i></a>\n            </li>\n            <li appDataAnalytics eventLabel=\"socialTwitter\" clickLocation=\"\">\n              <a href=\"https://twitter.com/townscript\" target=\"_blank\" aria-label=\"Find Us On LinkedIn\" title=\"Twitter\">\n                <i class=\"mdi mdi-twitter mr-4\"></i></a>\n            </li>\n            <li appDataAnalytics eventLabel=\"socialInstagram\" clickLocation=\"\">\n              <a href=\"https://www.instagram.com/townscript/\" target=\"_blank\" aria-label=\"Find Us On Instagram\"\n                title=\"Instagram\">\n                <i class=\"mdi mdi-instagram mr-4\"></i></a>\n            </li>\n            <li appDataAnalytics eventLabel=\"socialLinkedin\" clickLocation=\"\">\n              <a href=\"https://www.linkedin.com/company/townscript\" target=\"_blank\" aria-label=\"Find Us On LinkedIn\"\n                title=\"LinkedIn\">\n                <i class=\"mdi mdi-linkedin mr-4\"></i></a>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <div class=\"section-2 hidden md:flex px-5 pr-3 w-full justify-between\">\n      <div class=\"flex flex-col part-1 w-full\">\n        <div class=\"link-container w-full flex flex-1 pb-2 overflow-hidden lg:pr-10\">\n          <div class=\"w-2/3 flex justify-between pr-3\">\n            <div class=\"learn-more flex flex-col h-full pr-3 w-1/3\">\n              <h5 class=\"font-semibold text-gray-800 text-sm pb-3 whitespace-no-wrap\">Learn More</h5>\n              <ul class=\"list-linear flex flex-col justify-between flex-1\">\n                <li appDataAnalytics eventLabel=\"learnMorePricing\" clickLocation=\"\"><a href=\"/pricing\">Pricing</a></li>\n                <li><a href=\"/how-it-works\" ts-data-analytics prop-event=\"click\" eventLabel=\"How It Works\"\n                    prop-clicked-location=\"Footer\">How it works</a></li>\n                <li appDataAnalytics eventLabel=\"learnMorePolicies\" clickLocation=\"\"><a\n                    href=\"/terms-and-conditions\">Policies</a></li>\n                <li appDataAnalytics eventLabel=\"learnMorePrivacy\" clickLocation=\"\"><a\n                    href=\"/privacy-policy\">Privacy</a></li>\n                <li appDataAnalytics eventLabel=\"learnMoreApi\" clickLocation=\"\"><a href=\"//townscript-api.readme.io/\"\n                    target=\"_blank\">APIs for Developers</a></li>\n                <li appDataAnalytics eventLabel=\"learnMoreSupport\" clickLocation=\"\"><a\n                    href=\"http://support.townscript.com/support/home\" target=\"_blank\">Support / FAQs</a>\n                </li>\n              </ul>\n            </div>\n            <div class=\"ts-links flex flex-col h-full pr-3 w-1/3\">\n              <h5 class=\"font-semibold text-gray-800 text-sm pb-3 whitespace-no-wrap\">About</h5>\n              <ul class=\"list-linear flex flex-col justify-between flex-1\">\n                <li><a appDataAnalytics eventLabel=\"aboutUs\" clickLocation=\"\" href=\"/about-us\">About us</a>\n                </li>\n                <li><a appDataAnalytics eventLabel=\"contactUs\" clickLocation=\"\" href=\"/contact-us\">Contact\n                    us</a></li>\n                <!-- <li><a href=\"#\">Career</a></li> -->\n                <!-- <li><a href=\"#\">Media</a></li> -->\n                <li><a appDataAnalytics eventLabel=\"blog\" clickLocation=\"\" href=\"http://blog.townscript.com\"\n                    target=\"_blank\">Blog</a></li>\n                <li><a appDataAnalytics eventLabel=\"eventMagazine\" clickLocation=\"\"\n                    href=\"http://eventmagazine.townscript.com/\" target=\"_blank\">Event Magazine</a></li>\n                <li><a appDataAnalytics eventLabel=\"productDiary\" clickLocation=\"\"\n                    href=\"https://productblog.townscript.com/\" target=\"_blank\">Product Diary</a></li>\n                <li><a appDataAnalytics eventLabel=\"sitemap\" clickLocation=\"\" href=\"/sitemap\"\n                    target=\"_blank\">Sitemap</a></li>\n              </ul>\n            </div>\n            <div class=\"organize-links flex flex-col h-full pr-3 w-1/3\">\n              <h5 class=\"font-semibold text-gray-800 text-sm pb-3 whitespace-no-wrap\">Organize Events</h5>\n              <ul class=\"list-linear flex flex-col justify-between flex-1\">\n                <li appDataAnalytics eventLabel=\"virtualEvents\" clickLocation=\"\"><a\n                    href=\"/organize/virtual-events-platform\">Host\n                    Virtual Events</a></li>\n                <li appDataAnalytics eventLabel=\"conferences\" clickLocation=\"\"><a\n                    href=\"/i/conference-registration\">Conferences</a></li>\n                <li appDataAnalytics eventLabel=\"workshopTrainings\" clickLocation=\"\"><a\n                    href=\"/i/workshops-and-trainings\">Workshops and Trainings</a></li>\n                <li appDataAnalytics eventLabel=\"sportsFitness\" clickLocation=\"\"><a\n                    href=\"/i/marathon-cycling-trips-treks-registration\">Sports and Fitness Events</a></li>\n                <li appDataAnalytics eventLabel=\"entertainment\" clickLocation=\"\"><a\n                    href=\"/i/entertainment-events-ticketing\">Entertainment Events</a></li>\n                <!-- <li appDataAnalytics eventLabel=\"meetupReunions\" clickLocation=\"\"><a\n                    href=\"/i/meetup-registration\">Meetups and Reunions</a></li> -->\n                <li appDataAnalytics eventLabel=\"treksTrips\" clickLocation=\"\"><a\n                    href=\"/i/treks-trips-registration\">Treks and Trips</a></li>\n              </ul>\n            </div>\n          </div>\n          <div class=\"popular-search flex flex-col w-1/3 pl-5 lg:pl-8\">\n            <h5 class=\"font-semibold text-gray-800 text-sm pb-3 whitespace-no-wrap\">Popular Searches</h5>\n            <ul class=\"list-linear flex flex-col justify-between flex-1\">\n              <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                  href=\"http://support.townscript.com/support/solutions/articles/1000265220-list-of-countries-supported-by-townscript-\">\n                  Countries supported by Townscript</a></li>\n              <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                  href=\"/i/sell-event-tickets-online\">Sell Event Tickets Online</a></li>\n              <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                  href=\"/i/event-management-software\">Event Management Software</a></li>\n              <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                  href=\"/i/event-registration-software\">Event Registration Software</a></li>\n              <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                  href=\"/i/conference-management-system\">Conference management System</a></li>\n              <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                  href=\"/i/event-planning-software\">Event Planning Software</a></li>\n            </ul>\n          </div>\n        </div>\n\n        <div class=\"flex items-center mt-4 lg:pr-10\">\n          <div class=\"popular-cities mt-2 w-2/3 pr-1\">\n            <h5 class=\"font-semibold text-gray-800 text-sm pb-3 whitespace-no-wrap\">Popular Cities</h5>\n            <ul class=\"list-linear flex flex-wrap\">\n              <li appDataAnalytics eventLabel=\"popularCities\" clickLocation=\"\" *ngFor=\"let city of popularCities\">\n                <div class=\"pr-5\"><a href=\"/{{city.countryCode + '/' + city.name | lowercase}}\">{{city.name}}</a>\n                </div>\n              </li>\n            </ul>\n          </div>\n          <div class=\"compare-us mt-2 w-1/3 pl-5 lg:pl-8\">\n            <h5 class=\"font-semibold text-gray-800 text-sm pb-3 whitespace-no-wrap\">Compare Us</h5>\n            <ul class=\"list-linear flex flex-wrap\">\n              <li appDataAnalytics eventLabel=\"popularCities\" clickLocation=\"\">\n                <div class=\"pr-5\"><a href=\"https://townscript.com/organize/best-eventbrite-alternative\">Eventbrite</a>\n                </div>\n              </li>\n              <li appDataAnalytics eventLabel=\"compareUs\" clickLocation=\"\">\n                <div class=\"pr-5\"><a\n                    href=\"https://www.townscript.com/organize/peatix-alternative-why-townscript-is-better-than-peatix\">Peatix</a>\n                </div>\n              </li>\n              <li appDataAnalytics eventLabel=\"compareUs\" clickLocation=\"\">\n                <div class=\"pr-5\"><a href=\"https://www.townscript.com/organize/zoom-alternatives\">Zoom</a>\n                </div>\n              </li>\n              <li appDataAnalytics eventLabel=\"compareUs\" clickLocation=\"\">\n                <div class=\"pr-5\"><a href=\"https://www.townscript.com/organize/best-skype-alternative\">Skype</a>\n                </div>\n              </li>\n              <li appDataAnalytics eventLabel=\"compareUs\" clickLocation=\"\">\n                <div class=\"pr-5\"><a href=\"https://www.townscript.com/organize/Best-gotomeeting-alternative\">Go To\n                    Meeting</a>\n                </div>\n              </li>\n              <li appDataAnalytics eventLabel=\"compareUs\" clickLocation=\"\">\n                <div class=\"pr-5\"><a\n                    href=\"https://www.townscript.com/organize/google-meet-alternative-for-events\">Google Meet\n                    Alternative</a>\n                </div>\n              </li>\n              <li appDataAnalytics eventLabel=\"compareUs\" clickLocation=\"\">\n                <div class=\"pr-5\"><a\n                    href=\"https://www.townscript.com/organize/best-webex-alternative-for-online-events\">WebEx\n                    Alternative</a>\n                </div>\n              </li>\n              <li appDataAnalytics eventLabel=\"compareUs\" clickLocation=\"\">\n                <div class=\"pr-5\"><a\n                    href=\"https://www.townscript.com/organize/best-gotowebinar-alternative \">GoToWebinar Alternative</a>\n                </div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n\n\n      <div class=\"review-corner flex-col h-full hidden lg:flex items-center\">\n        <div class=\"g2crowd\">\n          <div appDataAnalytics eventLabel=\"g2Crowd\" clickLocation=\"\" class=\"mixpanel-button text-center\">\n            <a href=\"https://www.g2crowd.com/products/townscript/reviews\" target=\"_blank\"\n              title=\"G2Crowd Townscript Reviews\">\n              <img [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/assets/g2badge2.0.png'\"\n                alt=\"G2Crowd Townscript Reviews\" width=\"100\">\n              <div class=\"whitespace-no-wrap\">101 Reviews</div>\n            </a>\n          </div>\n        </div>\n      </div>\n\n    </div>\n    <div class=\"w-full block md:hidden pb-10\">\n      <div class=\"flex flex-col justify-center items-center\">\n        <div class=\"text-3xl text-gray-400 px-5 pr-32 mr-5\">&ldquo;Live an</div>\n        <div class=\"text-4xl text-gray-400 font-semibold -mt-3 px-5 pl-12\"><span class=\"text-purple-300\">Event</span>ful\n          life&rdquo;</div>\n        <img class=\"dance-illustration\" alt=\"Live an Eventful life\"\n          [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ts-illustrations/partying_2.png'\">\n      </div>\n    </div>\n  </div>\n</footer>\n",
        styles: [".building-image-container{margin-top:100px;text-align:left;background-image:url(//s3.ap-south-1.amazonaws.com/townscript-common-resources/assets/footer-skyline.png);background-repeat:repeat-x;background-position:left top;min-height:5rem}.ts-footer .section-1 i{color:#333}.ts-footer .section-1 .organizer-app-links .list-apps{list-style-type:none;padding:0}.ts-footer .section-1 .organizer-app-links .list-apps li{line-height:50px;margin:5px 0}.ts-footer .section-1 .social-list a{color:#333;transition:.2s}.ts-footer .section-1 .social-list a:hover{color:#111}.ts-footer .section-2 a{color:#4b4b4b;font-size:.875rem;padding:5px 0}.ts-footer .section-2 a:hover{text-decoration:underline}"]
    })
], TsFooterComponent);
export { TsFooterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtZm9vdGVyL3RzLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU9wRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQU81QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUp2QyxpQkFBWSxHQUFZLElBQUksQ0FBQztRQVF0QyxxQkFBZ0IsR0FBRyxHQUF1QixFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQSxDQUFBO0lBTEQsQ0FBQztJQU9ELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUMsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFNBQVMsRUFBQztZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7Q0FDRixDQUFBOztZQWZvQyxhQUFhOztBQUx2QztJQUFSLEtBQUssRUFBRTt3REFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7dURBQThCO0FBSDNCLGlCQUFpQjtJQUw3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQiwyOWNBQXlDOztLQUUxQyxDQUFDO0dBQ1csaUJBQWlCLENBc0I3QjtTQXRCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvb3RlclNlcnZpY2UgfSBmcm9tICcuL3RzLWZvb3Rlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHMtZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RzLWZvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RzLWZvb3Rlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRzRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwb3B1bGFyQ2l0aWVzOiBhbnk7XG4gIEBJbnB1dCgpIHNob3dCdWlsZGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29weXJpZ2h0WWVhcjpudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmb290ZXJTZXJ2aWNlOiBGb290ZXJTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIGdldFBvcHVsYXJDaXRpZXMgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5mb290ZXJTZXJ2aWNlLmdldEFsbFBvcHVsYXJDaXRpZXMoKTtcbiAgICB0aGlzLnBvcHVsYXJDaXRpZXMgPSBkYXRhWydkYXRhJ107XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvcHlyaWdodFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgaWYodGhpcy5wb3B1bGFyQ2l0aWVzID09IHVuZGVmaW5lZCl7ICAgICAgXG4gICAgICB0aGlzLmdldFBvcHVsYXJDaXRpZXMoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==