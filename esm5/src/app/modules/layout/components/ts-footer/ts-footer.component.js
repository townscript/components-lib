import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FooterService } from './ts-footer.service';
var TsFooterComponent = /** @class */ (function () {
    function TsFooterComponent(footerService) {
        var _this = this;
        this.footerService = footerService;
        this.showBuilding = true;
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
        this.copyrightYear = new Date().getFullYear();
        if (this.popularCities == undefined) {
            this.getPopularCities();
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsFooterComponent.prototype, "popularCities", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], TsFooterComponent.prototype, "showBuilding", void 0);
    TsFooterComponent = tslib_1.__decorate([
        Component({
            selector: 'ts-footer',
            template: "<div class=\"building-image-container\" *ngIf=\"showBuilding\">\n</div>\n<footer>\n  <div class=\"ts-footer flex p-5 lg:p-8 lg:pb-10\" [ngClass]=\"showBuilding ? 'lg:pb-10': ''\">\n    <div class=\"section-1 hidden md:block px-5 border-r border-gray-400 w-1/5 mr-5\">\n      <div class=\"flex flex-col  justify-between h-full\">\n        <div class=\"ts-logo w-full pr-3 mb-2\">\n          <img [lazyLoad]=\"'assets/images/ts-logoBMS.png'\" alt=\"Townscript Event Ticketing Logo\"\n              class=\"w-full h-auto\"\n              title=\"Townscript Event Ticketing Logo\" />\n          <div class=\"ts-footer__copyright text-right pr-2 text-xs text-gray-700 opacity-75\">Copyright@{{copyrightYear}}</div>\n        </div>\n        <div class=\"my-booking-link w-full py-2\">\n          <a href=\"/dashboard/mybookings\" target=\"_blank\">\n            <div class=\"font-semibold text-gray-800 w-full whitespace-no-wrap flex items-center\">\n              View Your Bookings\n              <i class=\"ml-1 mdi mdi-open-in-new text-xl\"></i>\n            </div>\n          </a>\n        </div>\n        <div class=\"organizer-app-links pr-10 py-2\">\n          <h5 class=\"font-semibold text-gray-800  whitespace-no-wrap\">Organizer App</h5>\n          <ul class=\"list-apps flex flex-col mt-1\">\n              <li appDataAnalytics eventLabel=\"appAndroid\" clickLocation=\"\">\n                  <a href=\"//play.google.com/store/apps/details?id=com.dyulok.android.organizerapp&hl=en_IN\"\n                      title=\"Download on Google play\" target=\"_blank\">\n                      <div class=\"google-logo\">\n                        <img src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/Marketplace/footer/google-play-badge.png\" alt=\"Download on Google Play Store\">\n                      </div>\n                  </a>\n              </li>\n              <li appDataAnalytics eventLabel=\"appIos\" clickLocation=\"\">\n                  <a href=\"//itunes.apple.com/in/app/townscript-event-manager/id1441088900?mt=8\"\n                      title=\"Download on App Store\" target=\"_blank\">\n                      <div class=\"\">\n                        <img src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/Marketplace/footer/apple-app-badge.png\" alt=\"Download on App Store\">\n                      </div>\n                  </a>\n              </li>\n          </ul>\n        </div>\n        <div class=\"social-follow pt-2\">\n          <h5 class=\"font-semibold text-gray-800 whitespace-no-wrap\">Follow us on</h5>\n          <ul class=\"social-list flex flex-wrap justify-between pr-4 text-xl mt-2 -ml-1 -mb-1\">\n              <li appDataAnalytics eventLabel=\"socialFb\" clickLocation=\"\">\n                  <a href=\"https://www.facebook.com/townscript\" target=\"_blank\"><i\n                          class=\"mdi mdi-facebook mr-2\"></i></a>\n              </li>\n              <li appDataAnalytics eventLabel=\"socialTwitter\" clickLocation=\"\">\n                  <a href=\"https://twitter.com/townscript\" target=\"_blank\"><i\n                          class=\"mdi mdi-twitter mr-2\"></i></a>\n              </li>\n              <li appDataAnalytics eventLabel=\"socialInstagram\" clickLocation=\"\">\n                  <a href=\"https://www.instagram.com/townscript/\" target=\"_blank\"><i\n                          class=\"mdi mdi-instagram mr-2\"></i></a>\n              </li>\n              <li appDataAnalytics eventLabel=\"socialLinkedin\" clickLocation=\"\">\n                  <a href=\"https://www.linkedin.com/company/townscript\" target=\"_blank\"><i\n                          class=\"mdi mdi-linkedin mr-2\"></i></a>\n              </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n    <div class=\"section-2 hidden md:flex px-5 pr-3 w-full justify-between\">\n      <div class=\"flex flex-col part-1 w-full\">\n        <div class=\"link-container w-full flex flex-1 pb-2 overflow-hidden lg:pr-10\">\n          <div class=\"w-2/3 flex justify-between pr-3\">\n            <div class=\"learn-more flex flex-col h-full pr-3\">\n              <h5 class=\"font-semibold text-gray-800 pb-3 whitespace-no-wrap\">Learn More</h5>\n              <ul class=\"list-linear flex flex-col justify-between flex-1\">\n                <li appDataAnalytics eventLabel=\"learnMorePricing\" clickLocation=\"\"><a\n                  href=\"/pricing\">Pricing</a></li>\n                <li><a href=\"/how-it-works\" ts-data-analytics prop-event=\"click\" eventLabel=\"How It Works\"\n                  prop-clicked-location=\"Footer\">How it works</a></li>\n                <li appDataAnalytics eventLabel=\"learnMorePolicies\" clickLocation=\"\"><a\n                  href=\"/terms-and-conditions\">Policies</a></li>\n                <li appDataAnalytics eventLabel=\"learnMorePrivacy\" clickLocation=\"\"><a\n                  href=\"/privacy-policy\">Privacy</a></li>\n                <li appDataAnalytics eventLabel=\"learnMoreApi\" clickLocation=\"\"><a\n                  href=\"//townscript-api.readme.io/\" target=\"_blank\">APIs for Developers</a></li>\n                <li appDataAnalytics eventLabel=\"learnMoreSupport\" clickLocation=\"\"><a\n                  href=\"http://support.townscript.com/support/home\" target=\"_blank\">Support / FAQs</a>\n                </li>\n              </ul>\n            </div>\n            <div class=\"ts-links flex flex-col h-full pr-3\">\n              <h5 class=\"font-semibold text-gray-800 pb-3 whitespace-no-wrap\">About</h5>\n              <ul class=\"list-linear flex flex-col justify-between flex-1\">\n                  <li><a appDataAnalytics eventLabel=\"aboutUs\" clickLocation=\"\" href=\"/about-us\">About us</a>\n                  </li>\n                  <li><a appDataAnalytics eventLabel=\"contactUs\" clickLocation=\"\" href=\"/contact-us\">Contact\n                          us</a></li>\n                  <!-- <li><a href=\"#\">Career</a></li> -->\n                  <!-- <li><a href=\"#\">Media</a></li> -->\n                  <li><a appDataAnalytics eventLabel=\"blog\" clickLocation=\"\"\n                          href=\"http://blog.townscript.com\" target=\"_blank\">Blog</a></li>\n                  <li><a appDataAnalytics eventLabel=\"eventMagazine\" clickLocation=\"\"\n                          href=\"http://eventmagazine.townscript.com/\" target=\"_blank\">Event Magazine</a></li>\n                  <li><a appDataAnalytics eventLabel=\"productDiary\" clickLocation=\"\"\n                          href=\"https://productblog.townscript.com/\" target=\"_blank\">Product Diary</a></li>\n                  <li><a appDataAnalytics eventLabel=\"sitemap\" clickLocation=\"\" href=\"/sitemap\"\n                          target=\"_blank\">Sitemap</a></li>\n              </ul>\n            </div>\n            <div class=\"organize-links flex flex-col h-full pr-3\">\n              <h5 class=\"font-semibold text-gray-800 pb-3 whitespace-no-wrap\">Organize Events</h5>\n              <ul class=\"list-linear flex flex-col justify-between flex-1\">\n                  <li appDataAnalytics eventLabel=\"conferences\" clickLocation=\"\"><a\n                          href=\"/i/conference-registration\">Conferences</a></li>\n                  <li appDataAnalytics eventLabel=\"workshopTrainings\" clickLocation=\"\"><a\n                          href=\"/i/workshops-and-trainings\">Workshops and Trainings</a></li>\n                  <li appDataAnalytics eventLabel=\"sportsFitness\" clickLocation=\"\"><a\n                          href=\"/i/marathon-cycling-trips-treks-registration\">Sports and Fitness Events</a></li>\n                  <li appDataAnalytics eventLabel=\"entertainment\" clickLocation=\"\"><a\n                          href=\"/i/entertainment-events-ticketing\">Entertainment Events</a></li>\n                  <li appDataAnalytics eventLabel=\"meetupReunions\" clickLocation=\"\"><a\n                          href=\"/i/meetup-registration\">Meetups and Reunions</a></li>\n                  <li appDataAnalytics eventLabel=\"treksTrips\" clickLocation=\"\"><a\n                          href=\"/i/treks-trips-registration\">Treks and Trips</a></li>\n                  <!-- <li><a href=\"/i/fundraising-crowdfunding\">Fundraisings</a></li> -->\n              </ul>\n            </div>\n          </div>\n          <div class=\"popular-search flex flex-col w-1/3 pl-5 lg:pl-8\">\n            <h5 class=\"font-semibold text-gray-800 pb-3 whitespace-no-wrap\">Popular Searches</h5>\n            <ul class=\"list-linear flex flex-col justify-between flex-1\">\n                <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                        href=\"http://support.townscript.com/support/solutions/articles/1000265220-list-of-countries-supported-by-townscript-\">\n                        Countries supported by Townscript</a></li>\n                <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                        href=\"/i/sell-event-tickets-online\">Sell Event Tickets Online</a></li>\n                <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                        href=\"/i/event-management-software\">Event Management Software</a></li>\n                <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                        href=\"/i/event-registration-software\">Event Registration Software</a></li>\n                <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                        href=\"/i/conference-management-system\">Conference management System</a></li>\n                <li appDataAnalytics eventLabel=\"popularSearches\" clickLocation=\"\"><a\n                        href=\"/i/event-planning-software\">Event Planning Software</a></li>\n            </ul>\n          </div>\n        </div>\n\n        <div class=\"flex items-center mt-4 lg:pr-10\">\n          <div class=\"popular-cities mt-2 w-2/3 pr-1\">\n            <h5 class=\"font-semibold text-gray-800 pb-3 whitespace-no-wrap\">Popular Cities</h5>\n            <ul class=\"list-linear flex flex-wrap\">\n              <li appDataAnalytics eventLabel=\"popularCities\" clickLocation=\"\"\n              *ngFor=\"let city of popularCities\">\n                <div class=\"pr-5\"><a href=\"/{{city.countryCode + '/' + city.name | lowercase}}\">{{city.name}}</a>\n                </div>\n              </li>\n            </ul>\n          </div>\n          <div class=\"compare-us mt-2 w-1/3 pl-5 lg:pl-8\">\n            <h5 class=\"font-semibold text-gray-800 pb-3 whitespace-no-wrap\">Compare Us</h5>\n            <ul class=\"list-linear flex flex-wrap\">\n              <li appDataAnalytics eventLabel=\"popularCities\" clickLocation=\"\">\n                <div class=\"pr-5\"><a href=\"https://townscript.com/organize/best-eventbrite-alternative\">Eventbrite</a>\n                </div>\n              </li>\n              <li appDataAnalytics eventLabel=\"popularCities\" clickLocation=\"\">\n                <div class=\"pr-10\"><a href=\"https://www.townscript.com/organize/peatix-alternative-why-townscript-is-better-than-peatix\">Peatrix</a>\n                </div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n\n\n      <div class=\"review-corner flex-col h-full hidden lg:flex items-center\">\n        <div class=\"g2crowd\">\n          <div appDataAnalytics eventLabel=\"g2Crowd\" clickLocation=\"\"\n              class=\"mixpanel-button text-center\">\n              <a href=\"https://www.g2crowd.com/products/townscript/reviews\" target=\"_blank\" title=\"G2Crowd Townscript Reviews\">\n                  <img [lazyLoad]=\"'https://s3-ap-southeast-1.amazonaws.com/common-resources/assets/g2badge.png'\"\n                      alt=\"G2Crowd Townscript Reviews\" width=\"100\">\n                  <div class=\"whitespace-no-wrap\">101 Reviews</div>\n              </a>\n          </div>\n        </div>\n      </div>\n\n    </div>\n    <div class=\"w-full block md:hidden\">\n        <div class=\"flex flex-col justify-center items-center\">\n            <div class=\"text-3xl text-gray-400 px-5 pr-32 mr-5\">&ldquo;Live an</div>\n            <div class=\"text-4xl text-gray-400 font-semibold -mt-3 px-5 pl-12\"><span\n                    class=\"text-purple-300\">Event</span>ful life&rdquo;</div>\n            <img class=\"dance-illustration\"\n                [lazyLoad]=\"'https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ts-illustrations/partying_2.png'\">\n        </div>\n    </div>\n  </div>\n\n</footer>\n",
            styles: [".building-image-container{margin-top:100px;text-align:left;background-image:url(//s3.ap-south-1.amazonaws.com/townscript-common-resources/assets/footer-skyline.png);background-repeat:repeat-x;background-position:left top;min-height:5rem}.ts-footer .section-1 .my-booking-link i{color:#333}.ts-footer .section-1 .organizer-app-links .list-apps{list-style-type:none;padding:0}.ts-footer .section-1 .organizer-app-links .list-apps li{line-height:50px;margin:5px 0}.ts-footer .section-1 .social-list a{color:#333;-webkit-transition:.2s;transition:.2s}.ts-footer .section-1 .social-list a:hover{color:#111}.ts-footer .section-2 a{color:#4b4b4b;font-size:.875rem;padding:5px 0}.ts-footer .section-2 a:hover{text-decoration:underline}"]
        }),
        tslib_1.__metadata("design:paramtypes", [FooterService])
    ], TsFooterComponent);
    return TsFooterComponent;
}());
export { TsFooterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtZm9vdGVyL3RzLWZvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQU9wRDtJQU9FLDJCQUFvQixhQUE0QjtRQUFoRCxpQkFFQztRQUZtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUp2QyxpQkFBWSxHQUFZLElBQUksQ0FBQztRQVF0QyxxQkFBZ0IsR0FBRzs7Ozs0QkFDSixxQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLEVBQUE7O3dCQUFyRCxJQUFJLEdBQUcsU0FBOEM7d0JBQzNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O2FBQ25DLENBQUE7SUFMRCxDQUFDO0lBT0Qsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxJQUFHLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxFQUFDO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQW5CUTtRQUFSLEtBQUssRUFBRTs7NERBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFOzsyREFBOEI7SUFIM0IsaUJBQWlCO1FBTDdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLHE2WUFBeUM7O1NBRTFDLENBQUM7aURBUW1DLGFBQWE7T0FQckMsaUJBQWlCLENBc0I3QjtJQUFELHdCQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0QlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb290ZXJTZXJ2aWNlIH0gZnJvbSAnLi90cy1mb290ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RzLWZvb3RlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1mb290ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90cy1mb290ZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUc0Zvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcG9wdWxhckNpdGllczogYW55O1xuICBASW5wdXQoKSBzaG93QnVpbGRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvcHlyaWdodFllYXI6bnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9vdGVyU2VydmljZTogRm9vdGVyU2VydmljZSkge1xuXG4gIH1cblxuICBnZXRQb3B1bGFyQ2l0aWVzID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZm9vdGVyU2VydmljZS5nZXRBbGxQb3B1bGFyQ2l0aWVzKCk7XG4gICAgdGhpcy5wb3B1bGFyQ2l0aWVzID0gZGF0YVsnZGF0YSddO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb3B5cmlnaHRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIGlmKHRoaXMucG9wdWxhckNpdGllcyA9PSB1bmRlZmluZWQpeyAgICAgIFxuICAgICAgdGhpcy5nZXRQb3B1bGFyQ2l0aWVzKCk7XG4gICAgfVxuICB9XG59XG4iXX0=