(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('luxon'), require('rxjs'), require('@angular/common'), require('@angular/common/http'), require('@angular/material/dialog'), require('algoliasearch'), require('rxjs/operators'), require('@angular/forms'), require('text-overflow-clamp'), require('@townscript/elements'), require('@angular/material/core'), require('@angular/material/snack-bar'), require('ng-recaptcha')) :
    typeof define === 'function' && define.amd ? define('@townscript/components', ['exports', '@angular/core', '@angular/material', 'luxon', 'rxjs', '@angular/common', '@angular/common/http', '@angular/material/dialog', 'algoliasearch', 'rxjs/operators', '@angular/forms', 'text-overflow-clamp', '@townscript/elements', '@angular/material/core', '@angular/material/snack-bar', 'ng-recaptcha'], factory) :
    (global = global || self, factory((global.townscript = global.townscript || {}, global.townscript.components = {}), global.ng.core, global.ng.material, global.luxon, global.rxjs, global.ng.common, global.ng.common.http, global.ng.material.dialog, global.algoliaSearchImported, global.rxjs.operators, global.ng.forms, global.clampLibImported, global.elements, global.ng.material.core, global.ng.material['snack-bar'], global.ngRecaptcha));
}(this, function (exports, core, material, luxon, rxjs, common, http, dialog, algoliaSearchImported, operators, forms, clampLibImported, elements, core$1, snackBar, ngRecaptcha) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var config = {
        baseUrl: '',
        router: '',
        activatedRoute: '',
        betaHostName: '',
        s3BaseUrl: '',
        s3Bucket: '',
        token: '',
        algoliaIndexName: '',
        // reCAPTCHA credentials
        CAPTCHA_SITE_KEY: '6LeblCYTAAAAANcBoTHB41G0gBdbRARm-V8_mePB',
        CAPTCHA_SECRET_KEY: '6LeblCYTAAAAACjO8dEZaP2Mud_gDiSxIE_ZiS_b',
        CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY: '6LcAq4QUAAAAABrOnp0xwsaRk7PgnCgmE-FDcbLG',
    };

    var BrowserService = /** @class */ (function () {
        function BrowserService() {
            this.isMobile = function () {
                var check = false;
                // tslint:disable-next-line: max-line-length
                (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                    check = true;
                } })(navigator.userAgent || navigator.vendor || window['opera']);
                return check;
            };
        }
        BrowserService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], BrowserService);
        return BrowserService;
    }());

    var CookieService = /** @class */ (function () {
        function CookieService() {
            var _this = this;
            this.deleteCookie = function (name) {
                _this.setCookie(name, '', -1, '/');
            };
            this.setCookie = function (name, value, expireDays, path) {
                if (path === void 0) { path = ''; }
                var d = new Date();
                d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
                var expires = 'expires=' + d.toUTCString();
                document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
            };
        }
        CookieService.prototype.getCookie = function (name) {
            var ca = document.cookie.split(';');
            var caLen = ca.length;
            var cookieName = name + "=";
            var c;
            for (var i = 0; i < caLen; i += 1) {
                c = ca[i].replace(/^\s+/g, '');
                if (c.indexOf(cookieName) === 0) {
                    return c.substring(cookieName.length, c.length);
                }
            }
            return null;
        };
        CookieService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], CookieService);
        return CookieService;
    }());

    var NotificationService = /** @class */ (function () {
        function NotificationService(snackBar) {
            var _this = this;
            this.snackBar = snackBar;
            this.success = function (message, duration, action) {
                var config = new material.MatSnackBarConfig();
                config.panelClass = ['ts-notification-success'];
                config.duration = duration;
                _this.snackBar.open(message, action, config);
            };
        }
        NotificationService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [material.MatSnackBar])
        ], NotificationService);
        return NotificationService;
    }());

    var TimeService = /** @class */ (function () {
        function TimeService() {
            var _this = this;
            this.convertDateToTimezone = function (date, timeZoneOffset) {
                var dateVar = luxon.DateTime.fromISO(date, { zone: timeZoneOffset });
                var dateString = luxon.DateTime.fromISO(dateVar).toString();
                return _this.formatLocalDate(new Date(dateString));
            };
            this.formatLocalDate = function (now) {
                var tzo = -now.getTimezoneOffset(), dif = tzo >= 0 ? '+' : '-', pad = function (num) {
                    var norm = Math.abs(Math.floor(num));
                    return (norm < 10 ? '0' : '') + norm;
                };
                return now.getFullYear()
                    + '-' + pad(now.getMonth() + 1)
                    + '-' + pad(now.getDate())
                    + 'T' + pad(now.getHours())
                    + ':' + pad(now.getMinutes())
                    + ':' + pad(now.getSeconds())
                    + '.000'
                    + dif + pad(tzo / 60)
                    + pad(tzo % 60);
            };
        }
        TimeService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], TimeService);
        return TimeService;
    }());

    var UserService = /** @class */ (function () {
        function UserService(cookieService, document, platformId) {
            this.cookieService = cookieService;
            this.document = document;
            this.platformId = platformId;
            this.user$ = new rxjs.BehaviorSubject(null);
            this.user = this.user$.asObservable();
            this.documentIsAccessible = common.isPlatformBrowser(this.platformId);
            if (this.documentIsAccessible) {
                var user = this.cookieService.getCookie('townscript-user');
                console.log('got user from cookie' + user);
                if (user != null && user.length > 0) {
                    this.updateUser(JSON.parse(user));
                }
            }
        }
        UserService.prototype.updateUser = function (data) {
            this.user$.next(data);
        };
        UserService = __decorate([
            core.Injectable(),
            __param(1, core.Inject(common.DOCUMENT)),
            __param(2, core.Inject(core.PLATFORM_ID)),
            __metadata("design:paramtypes", [CookieService, Object, core.InjectionToken])
        ], UserService);
        return UserService;
    }());

    var FollowService = /** @class */ (function () {
        function FollowService(http, userService) {
            var _this = this;
            this.http = http;
            this.userService = userService;
            this.baseUrl = config.baseUrl;
            this.apiServerUrl = this.baseUrl + 'api/';
            this.listingsUrl = this.baseUrl + 'listings/';
            this.followData$ = new rxjs.BehaviorSubject(null);
            this.followData = this.followData$.asObservable();
            this.createFollowData = function (type, typeId, userId) {
                var data = {
                    type: type,
                    typeId: typeId,
                    userId: userId
                };
                return _this.http.post(_this.listingsUrl + 'followData/follow', data);
            };
            this.getFollowData = function (id) {
                _this.http.get(_this.listingsUrl + 'followData/?userId=' + id).subscribe(function (res) {
                    _this.updateFollowData(res['data']);
                });
            };
            this.unfollow = function (followDataId) {
                return _this.http.post(_this.listingsUrl + 'followData/unfollow/' + followDataId, {});
            };
            this.updateFollowData = function (data) {
                _this.followData$.next(data);
            };
            this.userService.user.subscribe(function (data) {
                _this.user = data;
                if (_this.user && _this.user.userId) {
                    _this.getFollowData(_this.user.userId);
                }
            });
        }
        FollowService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [http.HttpClient, UserService])
        ], FollowService);
        return FollowService;
    }());

    var PlaceService = /** @class */ (function () {
        function PlaceService(cookieService, document, platformId) {
            this.cookieService = cookieService;
            this.document = document;
            this.platformId = platformId;
            this.currentPlace$ = new rxjs.BehaviorSubject(null);
            this.place = this.currentPlace$.asObservable();
            this.documentIsAccessible = common.isPlatformBrowser(this.platformId);
            if (this.documentIsAccessible) {
                var location_1 = this.cookieService.getCookie('location');
                console.log('got location from cookie' + location_1);
                if (location_1 != null && location_1.length > 0) {
                    this.updatePlace(JSON.parse(location_1));
                }
            }
        }
        PlaceService.prototype.updatePlace = function (data) {
            data = JSON.stringify(data);
            this.cookieService.setCookie('location', data, 100000000, '/');
            this.currentPlace$.next(data);
        };
        PlaceService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PlaceService_Factory() { return new PlaceService(core.ɵɵinject(CookieService), core.ɵɵinject(common.DOCUMENT), core.ɵɵinject(core.PLATFORM_ID)); }, token: PlaceService, providedIn: "root" });
        PlaceService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Inject(common.DOCUMENT)),
            __param(2, core.Inject(core.PLATFORM_ID)),
            __metadata("design:paramtypes", [CookieService, Object, core.InjectionToken])
        ], PlaceService);
        return PlaceService;
    }());

    var HeaderService = /** @class */ (function () {
        function HeaderService(http) {
            var _this = this;
            this.http = http;
            this.baseUrl = config.baseUrl;
            this.apiServerUrl = this.baseUrl + 'api/';
            this.getplaceSearchResults = function (query) {
                return _this.http.get(_this.baseUrl + 'listings/place/autocomplete?query=' + query);
            };
        }
        HeaderService.prototype.getPopularCities = function (countryCode) {
            return this.http.get(this.baseUrl + 'listings/city/popular/' + countryCode).toPromise();
        };
        HeaderService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [http.HttpClient])
        ], HeaderService);
        return HeaderService;
    }());

    var LoginModalComponent = /** @class */ (function () {
        function LoginModalComponent(dialogRef, data) {
            var _this = this;
            this.dialogRef = dialogRef;
            this.data = data;
            this.header = 'Let\'s get started';
            this.subHeader = 'Your one stop tool for organizing events';
            this.close = function () {
                _this.dialogRef.close();
            };
        }
        LoginModalComponent.prototype.ngOnInit = function () {
            if (this.data != undefined && this.data.header != undefined) {
                this.header = this.data.header;
            }
            if (this.data != undefined && this.data.subHeader != undefined) {
                this.subHeader = this.data.subHeader;
            }
            if (this.data != undefined && this.data.rdurl != undefined) {
                this.rdurl = this.data.rdUrl;
            }
            if (this.data != undefined && this.data.showSocial != undefined) {
                this.showSocial = this.data.showSocial;
            }
        };
        LoginModalComponent = __decorate([
            core.Component({
                selector: 'app-login-modal',
                template: "<app-ts-login-signup [mode]=\"'dialog'\" [defaultHeader]=\"header\" [defaultSubHeader]=\"subHeader\" [showSocial]=\"showSocial\"\n  [rdurl]=\"rdurl\" (closeDialog)='close()'></app-ts-login-signup>\n",
                encapsulation: core.ViewEncapsulation.None,
                styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.mat-dialog-bkg-container{background:#414243;opacity:.7!important}@media (max-width:700px){.cdk-overlay-pane{height:100vh!important;width:100vw!important;max-width:100vw!important}}@media (min-width:700px){.cdk-overlay-pane{min-width:500px!important}}"]
            }),
            __param(1, core.Inject(dialog.MAT_DIALOG_DATA)),
            __metadata("design:paramtypes", [dialog.MatDialogRef, Object])
        ], LoginModalComponent);
        return LoginModalComponent;
    }());

    var FooterService = /** @class */ (function () {
        function FooterService(http) {
            var _this = this;
            this.http = http;
            this.baseUrl = config.baseUrl;
            this.listingsUrl = this.baseUrl + 'listings/';
            this.getPopularEvents = function (lat, long) {
                var params = new Object();
                params['lat'] = lat;
                params['lng'] = long;
                params['radarDistance'] = 50;
                params['page'] = 0;
                params['size'] = 8;
                params['minScore'] = 0;
                return _this.http.post(_this.listingsUrl + 'event/radar', {}, { params: params }).toPromise();
            };
            this.getCityFromCityCode = function (code) {
                return _this.http.get(_this.listingsUrl + 'place/city?code=' + code).toPromise();
            };
            this.getAllPopularCities = function () {
                return _this.http.get(_this.listingsUrl + 'city/popular').toPromise();
            };
        }
        FooterService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [http.HttpClient])
        ], FooterService);
        return FooterService;
    }());

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
                var dialogConfig = new material.MatDialogConfig();
                dialogConfig.disableClose = false;
                dialogConfig.autoFocus = true;
                dialogConfig.backdropClass = 'mat-dialog-bkg-container';
                dialogConfig.data = { rdUrl: _this.myBookingsURL };
                _this.dialog.open(LoginModalComponent, dialogConfig);
            };
            this.getCityFromCityCode = function (code) { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
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
            this.getPopularEvents = function () { return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.footerService.getPopularEvents(this.city.latitude, this.city.longitude)];
                        case 1:
                            res = _a.sent();
                            this.popularEvents = res.data.data;
                            return [2 /*return*/];
                    }
                });
            }); };
            this.getPopularCities = function () { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
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
                    if (data['city']) {
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
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsFooterComponent.prototype, "source", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsFooterComponent.prototype, "popularEvents", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsFooterComponent.prototype, "recentBlogs", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsFooterComponent.prototype, "popularReads", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsFooterComponent.prototype, "popularCities", void 0);
        TsFooterComponent = __decorate([
            core.Component({
                selector: 'ts-footer',
                template: "<footer class=\"ts-footer text-center pt-8 pb-4 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16\" [class.new-footer]=\"source=='marketplace'\">\n    <div class=\"ts-container content-footer\">\n        <div class=\"flex md:mb-4\">\n            <div class=\"w-1/5 hidden-xs px-4\">\n                <h5>ORGANISE EVENTS</h5>\n                <ul class=\"list-unstyled\">\n                    <li><a href=\"/i/conference-registration\">Conferences</a></li>\n                    <li><a href=\"/i/workshops-and-trainings\">Workshops and Trainings</a></li>\n                    <li><a href=\"/i/college-fest-payment-portal\">College Festivals</a></li>\n                    <li><a href=\"/i/marathon-cycling-trips-treks-registration\">Sports and Fitness Events</a></li>\n                    <li><a href=\"/i/entertainment-events-ticketing\">Entertainment Events</a></li>\n                    <li><a href=\"/i/meetup-registration\">Meetups and Reunions</a></li>\n                    <li><a href=\"/i/treks-trips-registration\">Treks and Trips</a></li>\n                    <!-- <li><a href=\"/i/fundraising-crowdfunding\">Fundraisings</a></li> -->\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\">\n                <h5>POPULAR SEARCHES</h5>\n                <ul class=\"list-unstyled\">\n                    <!--<li><a href=\"/pune/new-year-party\">New Year Parties In Pune</a></li>\n\t\t\t\t<li><a href=\"/mumbai/new-year-party\">New Year Parties In Mumbai</a></li>\n\t\t\t\t<li><a href=\"/delhi/new-year-party\">New Year Parties In Delhi</a></li>\n\t\t\t\t<li><a href=\"/bangalore/new-year-party\">New Year Parties In Bangalore</a></li>-->\n                    <li><a\n                            href=\"http://support.townscript.com/support/solutions/articles/1000265220-list-of-countries-supported-by-townscript-\">\n                            List of Countries supported by Townscript</a></li>\n                    <li><a href=\"/i/sell-event-tickets-online\">Sell Event Tickets Online</a></li>\n                    <li><a href=\"/i/event-management-software\">Event Management Software</a></li>\n                    <li><a href=\"/i/event-registration-software\">Event Registration Software</a></li>\n                    <li><a href=\"/i/conference-management-system\">Conference management System</a></li>\n                    <li><a href=\"/i/event-planning-software\">Event Planning Software</a></li>\n                    <li><a href=\"/i/online-event-ticketing\">Online Event Ticketing</a></li>\n                    <li><a href=\"/i/corporate-event-management\">Corporate Event Management</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\" *ngIf=\"source=='landingPages'\">\n                <h5>RECENT BLOGS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li *ngFor=\"let blog of recentBlogs\"><a [href]=\"blog.url\">{{blog.title}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\" *ngIf=\"source=='marketplace'\">\n                <h5>POPULAR EVENTS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li *ngFor=\"let event of popularEvents\"><a [href]=\"'e/'+event.shortName\">{{event.name}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 px-4 hidden-xs\">\n                <h5>POPULAR READS</h5>\n                <ul class=\"list-unstyled blog-links\">\n                    <li *ngFor=\"let read of popularReads\"><a [href]=\"read.url\" target=\"_blank\">{{read.title}}</a></li>\n                </ul>\n            </div>\n            <div class=\"w-1/5 hidden-xs pl-12\">\n                <h5>BOOKINGS</h5>\n                <ul class=\"list-unstyled\">\n                    <li>\n                        <div class=\"mybookings cursor-pointer\" (click)=\"openMyBooking()\">My Bookings</div>\n                    </li>\n                </ul>\n                <h5 (click)=\"openContactUs()\">GET IN TOUCH</h5>\n                <!--<h5><a href=\"mailto:service@townscript.com\" target=\"_blank\" class=\"mail-to visible-xs\">service@townscript.com</a></h5>-->\n                <ul class=\"list-unstyled\">\n                    <!-- \t\t\t\t<li class=\"hidden-xs\">\n\t\t\t\t\t<a href=\"#\">Contact us</a>\n\t\t\t\t</li> -->\n                    <li class=\"social-list-item\">\n                        <ul class=\"social-list clearfix\">\n                            <li>\n                                <a href=\"https://www.facebook.com/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-facebook\"></i></a>\n                            </li>\n                            <li>\n                                <a href=\"https://twitter.com/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-twitter\"></i></a>\n                            </li>\n                            <li>\n                                <a href=\"https://plus.google.com/+Townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-google-plus\"></i></a>\n                            </li>\n                            <li>\n                                <a href=\"https://www.linkedin.com/company/townscript\" target=\"_blank\"><i\n                                        class=\"mdi mdi-linkedin\"></i></a>\n                            </li>\n                            <!--<li>\n\t\t\t\t\t\t\t<a href=\"mailto:service@townscript.com\" target=\"_blank\"><i class=\"ion-email\"></i></a>\n\t\t\t\t\t\t</li>-->\n                        </ul>\n                    </li>\n                </ul>\n                <h5 class=\"hidden-xs\">ORGANIZER APP</h5>\n                <ul class=\"list-apps hidden-xs\">\n                    <li>\n                        <a href=\"//play.google.com/store/apps/details?id=com.dyulok.android.organizerapp&hl=en_IN\"\n                            title=\"Download on Google play\" class=\"store-icon google-play-icon\" target=\"_blank\">Download\n                            on Google\n                            play</a>\n                    </li>\n                    <li>\n                        <a href=\"//itunes.apple.com/in/app/townscript-event-manager/id1441088900?mt=8\"\n                            title=\"Download on App Store\" target=\"_blank\" class=\"store-icon app-store-icon\">Download on\n                            App Store</a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"w-full block md:hidden\">\n              <div class=\"flex flex-col justify-center items-center\">\n                <div class=\"text-3xl text-gray-400 px-5 pr-32 mr-5\">&ldquo;Live an</div>\n                <div class=\"text-4xl text-gray-400 font-semibold -mt-3 px-5 pl-12\"><span class=\"text-purple-300\">Event</span>ful life&rdquo;</div>\n                <img class=\"dance-illustration\" src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/ts-illustrations/partying_2.png\">\n              </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"ts-container\">\n        <div class=\"brand-footer border-0 md:border-t pt-2 md:pt-4 lg:pt-8\">\n            <div class=\"flex md:mb-4\">\n                <div class=\"w-full flex flex-col items-center md:items-start md:w-1/5 px-4 ts-logo\">\n                    <img src=\"assets/images/ts-logoBMS.png\" alt=\"Townscript Event Ticketing Logo\"\n                        title=\"Townscript Event Ticketing Logo\" />\n                    <span class=\"ts-footer__copyright text-right pr-2 text-xs text-gray-800\">Copyright@2019</span>\n                    <!--<a href=\"mailto:service@townscript.com\" target=\"_blank\" class=\"ts-footer__mail hidden-xs\">service@townscript.com</a>-->\n                </div>\n                <div class=\"w-3/5 linear-footer hidden-xs pl-4\">\n                    <h5>LEARN MORE</h5>\n                    <br>\n                    <ul class=\"list-linear\">\n                        <!-- <li><a href=\"#\">Features</a></li> -->\n                        <li><a href=\"/pricing\">Pricing</a></li>\n                        <li><a href=\"/how-it-works\" ts-data-analytics prop-event=\"click\" eventLabel=\"How It Works\"\n                                prop-clicked-location=\"Footer\">How it works</a></li>\n                        <!-- <li><a href=\"#\">Mobile Apps</a></li> -->\n                        <li><a href=\"//townscript-api.readme.io/\" target=\"_blank\">APIs for Developers</a></li>\n                        <li><a href=\"/terms-and-conditions\">Policies</a></li>\n                        <li><a href=\"/privacy-policy\">Privacy</a></li>\n                        <li><a href=\"http://support.townscript.com/support/home\" target=\"_blank\">Support / FAQs</a></li>\n                    </ul>\n                    <div class=\"linear-footer hidden-xs\" *ngIf=\"source=='marketplace'\">\n                        <h5>POPULAR CITIES</h5>\n                        <br>\n                        <ul class=\"list-linear\">\n                            <li *ngFor=\"let city of popularCities\">\n                                <div><a href=\"/{{city.countryCode + '/' + city.name | lowercase}}\">{{city.name}}</a></div>\n                            </li>\n                        </ul>\n                    </div>\n                    <div class=\"linear-footer hidden-xs\">\n                        <h5>ABOUT</h5>\n                        <br>\n                        <ul class=\"list-linear\">\n                            <li><a href=\"/about-us\">About us</a></li>\n                            <li><a href=\"/contact-us\">Contact us</a></li>\n                            <!-- <li><a href=\"#\">Career</a></li> -->\n                            <!-- <li><a href=\"#\">Media</a></li> -->\n                            <li><a href=\"http://blog.townscript.com\" target=\"_blank\">Blog</a></li>\n                            <li><a href=\"http://eventmagazine.townscript.com/\" target=\"_blank\">Event Magazine</a></li>\n                            <li><a href=\"https://productblog.townscript.com/\" target=\"_blank\">Product Diary</a></li>\n                            <li><a href=\"/sitemap\" target=\"_blank\">Sitemap</a></li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"mixpanel-button align-text hidden-xs px-10 pt-8 mx-2\">\n                    <a href=\"https://www.g2crowd.com/products/townscript/reviews\" target=\"_blank\">\n                        <img src=\"https://s3-ap-southeast-1.amazonaws.com/common-resources/assets/g2badge.png\"\n                            alt=\"G2Crowd Townscript Reviews\" width=\"100\">\n                        <span>72 Reviews</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </div>\n    <br>\n</footer>\n",
                styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}footer{background-color:#ebebeb}footer .mybookings{font-size:13px;color:#683594}footer.new-footer{background-color:#f7f7f7}footer.new-footer .mybookings,footer.new-footer a,footer.new-footer h5{color:#3e3e3e;letter-spacing:.01em;text-decoration:none;margin-bottom:0}footer li:hover{text-decoration:underline}footer h5{font-size:14px!important;font-weight:600}footer li,footer ul{margin-bottom:0}footer .content-footer{padding-bottom:20px}footer .m-l-8per{margin-left:8%}footer .brand-footer{border-color:#e5d7f1}footer .ts-footer__copyright,footer img{width:165px}footer .dance-illustration{width:200px}footer .ts-logo{-webkit-filter:grayscale(100%);filter:grayscale(100%);opacity:.4}@media (max-width:992px){footer .ts-logo img{width:120px}}footer .ts-logo .text-xs{width:120px;font-size:.5em}footer .bookmyshow-logo{width:140px}footer .mixpanel-button{position:relative;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;text-align:center}footer .mixpanel-button a,footer .mixpanel-button span{white-space:nowrap;display:block}footer .mixpanel-button img{width:115px!important}footer .mail-to{font-weight:600}footer a,footer h5{color:#683594;text-decoration:none;margin-bottom:0}footer a{letter-spacing:.4px;font-size:13px;font-weight:400}footer ul.social-list{list-style-type:none;padding:0;margin:0}footer ul.social-list li{display:inline-block;margin-right:10px}footer ul.social-list li i{-webkit-transition:.2s;transition:.2s;font-size:17px}footer ul.social-list li i:hover{color:#111}.ts-footer__copyright{display:block}@media (min-width:768px){.ts-footer__mail{display:block;text-align:left;font-weight:700;line-height:36px}.ts-footer .container-fluid .row>div:first-child{padding-left:0}.ts-footer .container-fluid .row>div:nth-child(2){padding:0}.ts-footer .container-fluid .row>div:last-child{padding-right:0}footer{margin-top:100px;text-align:left;background-image:url(//s3.ap-south-1.amazonaws.com/townscript-common-resources/assets/footer-skyline.png);background-repeat:repeat-x;background-position:left top}footer .brand-footer .linear-footer h5,footer .brand-footer .linear-footer ul{display:inline-block;margin:2px 25px 2px 0;vertical-align:middle}footer .brand-footer .linear-footer .list-linear{list-style-type:none;padding:0}footer .brand-footer .linear-footer .list-linear li{float:left;margin-right:35px}footer .ts-logo{-webkit-filter:none;filter:none;opacity:1}footer ul.social-list{list-style-type:none;padding:0}footer ul.social-list li{display:block;float:left;margin-right:10px}footer ul.list-apps{list-style-type:none;padding:0}footer ul.list-apps li{line-height:50px;margin:10px 0}footer ul.list-apps li .store-icon{background-size:auto 45px;background-image:url(//s3.ap-south-1.amazonaws.com/townscript-common-resources/assets/store.png);background-repeat:no-repeat;display:block;width:150px;text-indent:-9999px}footer ul.list-apps li .store-icon.google-play-icon{background-position:0 0}footer ul.list-apps li .store-icon.app-store-icon{background-position:-172px 0}footer ul li{line-height:31px}footer ul li>a{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block}}.blog-links li{line-height:1.5}.blog-links li a{white-space:normal}"]
            }),
            __metadata("design:paramtypes", [material.MatDialog,
                UserService,
                FooterService,
                PlaceService])
        ], TsFooterComponent);
        return TsFooterComponent;
    }());

    var TsHeaderComponent = /** @class */ (function () {
        function TsHeaderComponent(placeService, dialog, userService) {
            var _this = this;
            this.placeService = placeService;
            this.dialog = dialog;
            this.userService = userService;
            this.Components = ['icon', 'createEventBtn', 'eventSearch',
                'userMenu', 'mobileSearch', 'mobileProfile', 'mobileCitySearch', 'mobileBack'];
            this.backState = false;
            this.source = 'marketplace';
            this.shadow = true;
            this.router = config.router;
            this.host = config.baseUrl;
            this.s3BucketUrl = config.s3BaseUrl + config.s3Bucket;
            this.cityPopupActive = false;
            this.clickout = function (event) {
                if (!_this.citySuggestions.nativeElement.contains(event.target)) {
                    _this.cityPopupActive = false;
                }
                if (!_this.userMenuEle.nativeElement.contains(event.target)) {
                    _this.userMenu = false;
                }
            };
            this.openLogin = function () {
                var dialogConfig = new material.MatDialogConfig();
                dialogConfig.disableClose = false;
                dialogConfig.autoFocus = true;
                dialogConfig.backdropClass = 'mat-dialog-bkg-container';
                _this.dialog.open(LoginModalComponent, dialogConfig);
            };
            this.navigateToMobileSearch = function () {
                _this.router.navigate(['/mobile/search']);
            };
            this.openMyProfileComponent = function () {
                if (_this.userService.user.source['value'] != undefined) {
                    _this.router.navigate(['/profile']);
                }
                else {
                    _this.openLogin();
                }
            };
            this.goBack = function () {
                _this.router.navigate(['../']);
            };
            this.goToHomePage = function () {
                _this.router.navigate([_this.homePageUrl]);
            };
        }
        TsHeaderComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.userService.user.subscribe(function (data) {
                _this.user = data;
            });
            this.placeService.place.subscribe(function (res) {
                if (res) {
                    _this.activePlace = JSON.parse(res)['currentPlace'];
                    _this.activeCity = JSON.parse(res)['city'];
                    _this.activeCountryCode = JSON.parse(res)['country'];
                    _this.homePageUrl = '/' + _this.activeCountryCode.toLowerCase() + '/' + _this.activeCity.toLowerCase();
                }
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], TsHeaderComponent.prototype, "Components", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsHeaderComponent.prototype, "backState", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsHeaderComponent.prototype, "source", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsHeaderComponent.prototype, "shadow", void 0);
        __decorate([
            core.ViewChild('citySuggestions', { static: false }),
            __metadata("design:type", core.ElementRef)
        ], TsHeaderComponent.prototype, "citySuggestions", void 0);
        __decorate([
            core.ViewChild('userMenuEle', { static: false }),
            __metadata("design:type", core.ElementRef)
        ], TsHeaderComponent.prototype, "userMenuEle", void 0);
        __decorate([
            core.HostListener('document:click', ['$event']),
            __metadata("design:type", Object)
        ], TsHeaderComponent.prototype, "clickout", void 0);
        TsHeaderComponent = __decorate([
            core.Component({
                selector: 'ts-header',
                template: "<nav class=\"ts-header flex align-items-center\" *ngIf=\"source!='marketplace'\">\n    <div class=\"container flex align-items-center\">\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand flex align-items-center\" href=\"/\">\n                <img src=\"assets/images/ts-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                    title=\"Townscript Event Ticketing Logo\" />\n            </a>\n        </div>\n        <div id=\"navbar\" class=\"nav-right hidden-xs\">\n            <ul>\n                <li>\n                    <a href=\"/signup\" ts-data-analytics prop-event=\"click\" eventLabel=\"Get Started\"\n                        prop-clicked-location=\"Animated Header\">\n                        <!-- <ts-button text=\"Create Event\"></ts-button> -->\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n\n<nav class=\"ts-header-new max-w-full w-screen fixed flex items-center\" [class.shadow]=\"shadow\"\n    *ngIf=\"source=='marketplace'\">\n    <div class=\"ts-container flex items-center w-full\">\n        <div class=\"hidden md:block lg:w-1/6\">\n            <img (click)=\"goToHomePage()\" *ngIf=\"Components.indexOf('icon')>-1\" class=\"ts-logo cursor-pointer\"\n                src=\"assets/images/ts-logo.svg\" alt=\"Townscript Event Ticketing Logo\"\n                title=\"Townscript Event Ticketing Logo\" />\n        </div>\n        <div class=\"sm:w-1/4 max-50 flex md:hidden lg:hidden items-center\">\n            <!-- <i class=\"mdi mdi-menu mr-3 text-3xl color-blue\"></i> -->\n            <!-- <app-hamburger-menu class=\"mr-3\"></app-hamburger-menu> -->\n            <!-- <img class=\"ts-logo mr-3\" src=\"assets/images/ts-icon.svg\" alt=\"Townscript Event Ticketing Logo\"\n                title=\"Townscript Event Ticketing Logo\" /> -->\n            <div *ngIf=\"backState\" (click)=\"goBack()\"\n                class=\"rounded-full flex py-1 px-3 mr-1 justify-center items-center\" matRipple>\n                <i class=\"mdi mdi-arrow-left text-2xl color-blue\"></i>\n            </div>\n            <i *ngIf=\"Components.indexOf('mobileCitySearch')>-1 && !backState\"\n                class=\"mdi mdi-map-marker color-blue text-2xl mr-2\"></i>\n            <div *ngIf=\"Components.indexOf('mobileCitySearch')>-1\" #citySuggestions\n                class=\"city-selection text-lg cursor-pointer w-full\" (click)=\"cityPopupActive=true\">\n                <div class=\"flex items-center w-full\" matRipple>\n                    <span class=\"mr-1 text-gray-700 truncate\">{{activePlace}}</span>\n                    <i class=\"mdi mdi-menu-down color-blue\"></i>\n                </div>\n                <app-city-search-popup [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\"\n                    [showArrow]=\"false\" class=\"popup\" *ngIf=\"cityPopupActive\">\n                </app-city-search-popup>\n            </div>\n        </div>\n        <div class=\"lg:w-5/12 ml-3 hidden sm:hidden md:hidden lg:flex\">\n            <app-search *ngIf=\"Components.indexOf('eventSearch')>-1\" class=\"w-full\"></app-search>\n        </div>\n        <div class=\"invisible sm:w-1/4 lg:w-1/12 flex items-center ml-6 view-type text-xl color-blue\">\n            <!-- <i class=\"active text-xl mdi mdi-book-open mr-4\"></i>\n            <i class=\"mdi mdi-map-legend mr-4\"></i>\n            <i class=\"mdi mdi-calendar-today mr-4\"></i> -->\n        </div>\n        <div class=\"lg:w-1/6 hidden sm:hidden md:hidden h-full lg:flex items-center pr-8\">\n            <a [href]=\"host+'dashboard/create-event'\">\n                <div *ngIf=\"Components.indexOf('createEventBtn')>-1\"\n                    class=\"create-btn cursor-pointer flex h-full justify-center items-center\">\n                    <span class=\"text-base mr-2\">CREATE EVENT</span>\n                    <i class=\"mdi mdi-ticket text-2xl\"></i>\n                </div>\n            </a>\n        </div>\n        <div #userMenuEle *ngIf=\"Components.indexOf('userMenu')>-1\"\n            class=\"position-relative sm:w-1/1 lg:w-1/6 justify-end hidden sm:hidden md:hidden lg:flex items-center\">\n            <div class=\"flex items-center cursor-pointer px-2\" (click)=\"openLogin()\" *ngIf=\"!user\" matRipple>\n                <i class=\"mdi mdi-account-circle text-4xl mr-2 color-blue\"></i>\n                <span>Login | Signup</span>\n            </div>\n            <div class=\"flex items-center cursor-pointer\" (click)=\"userMenu=!userMenu\" *ngIf=\"user\" matRipple>\n                <img class=\"rounded-full mr-2\" width=\"36\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n                <i class=\"mdi mdi-chevron-down text-xl text-gray-700\" [class.rotate-180]=\"userMenu\"></i>\n                <!-- <span>{{user.user}}</span> -->\n            </div>\n            <div class=\"user-menu position-absolute shadow-md px-2 enter-slide-bottom\" *ngIf=\"userMenu\">\n                <app-user-menu [user]=\"user\" (close)=\"userMenu=!userMenu\"></app-user-menu>\n            </div>\n            <!-- <ts-button text=\"Login | Signup\" class=\"text-base\"></ts-button> -->\n        </div>\n\n        <!-- Mobile Menu -->\n        <div class=\"sm:w-1/1 ml-auto mr-2 flex  sm:flex md:flex lg:hidden items-center\">\n            <div *ngIf=\"Components.indexOf('mobileSearch')>-1\" class=\"rounded-full flex items-center\" matRipple\n                (click)=\"navigateToMobileSearch()\">\n                <i class=\"mdi mdi-magnify text-2xl ml-2 mr-2 color-blue\"></i>\n            </div>\n            <div *ngIf=\"Components.indexOf('mobileProfile')>-1\" class=\"rounded-full flex items-center\" matRipple>\n                <i class=\"mdi mdi-account text-2xl  ml-2 color-blue\" matRipple (click)=\"openMyProfileComponent()\"></i>\n            </div>\n        </div>\n    </div>\n</nav>\n<nav class=\"ts-header-new max-w-full w-screen flex items-center\" [class.shadow]=\"shadow\" *ngIf=\"source=='marketplace'\">\n\n</nav>",
                styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.ts-header{min-height:85px;background-color:#fff;width:100%;position:fixed;top:0;z-index:1000;box-shadow:0 15px 40px -20px rgba(40,44,63,.2)}.ts-header .container{display:-webkit-box;display:flex;width:100%;padding:0 10%}.ts-header .container .navbar-header .navbar-brand img{width:165px}.ts-header .container .nav-right{margin-left:auto}.ts-header .container .nav-right li,.ts-header .container .nav-right ul{margin-bottom:0}.ts-header-new{min-height:56px;background-color:#f7f7f7;top:0;z-index:1000}.ts-header-new .shadow{box-shadow:0 2px 4px 0 rgba(0,0,0,.11)}.ts-header-new .ts-logo{height:28px}.ts-header-new .popup{position:absolute;top:90%;width:100%;left:0}.ts-header-new .max-50{max-width:50%}@media (min-width:991px){.ts-container{padding:0 80px!important}.ts-header-new{min-height:68px}.ts-header-new .ts-logo{height:35px}.ts-header-new .view-type i{opacity:.8;padding:3px 9px}.ts-header-new .view-type i.active{opacity:1;background:#3782c4;border-radius:50%;color:#fff;box-shadow:0 0 5px 0 #8ec0ec}.ts-header-new .create-btn{width:100%;min-width:200px;border-radius:20.5px;color:#fff;white-space:nowrap;background:linear-gradient(138.55deg,#a165c4 0,#4d2370 100%);box-shadow:0 2px 4px 0 #d4b1f0;-webkit-transition:.1s;transition:.1s}.ts-header-new .create-btn:hover{box-shadow:0 4px 6px 0 #d4b1f0;-webkit-transform:translateY(-2px);transform:translateY(-2px)}.ts-header-new .user-menu{position:absolute;top:145%;width:142%;left:-42%;background:#fff}.ts-header-new .user-menu:before{content:\" \";width:0;height:0;position:absolute;top:-11px;left:84%;border-left:15px solid transparent;border-right:15px solid transparent;border-bottom:15px solid #fff;-webkit-filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09));filter:drop-shadow(0 -2px 1px rgba(0, 0, 0, .09))}}:host ::ng-deep .mat-button-wrapper{font-size:16px!important}"]
            }),
            __metadata("design:paramtypes", [PlaceService, material.MatDialog, UserService])
        ], TsHeaderComponent);
        return TsHeaderComponent;
    }());

    var UserMenuComponent = /** @class */ (function () {
        function UserMenuComponent(notificationService, userService, cookieService) {
            var _this = this;
            this.notificationService = notificationService;
            this.userService = userService;
            this.cookieService = cookieService;
            this.panelOpen1 = false;
            this.panelOpen2 = false;
            this.close = new core.EventEmitter();
            this.host = config.baseUrl;
            this.s3BucketUrl = config.s3BaseUrl + config.s3Bucket;
            this.logout = function () {
                _this.close.emit();
                _this.cookieService.deleteCookie('townscript-user');
                _this.userService.updateUser(null);
                _this.notificationService.success('You are logged out successfully!', 2000, 'Dismiss');
            };
        }
        UserMenuComponent.prototype.ngOnInit = function () { };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], UserMenuComponent.prototype, "panelOpen1", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], UserMenuComponent.prototype, "panelOpen2", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], UserMenuComponent.prototype, "user", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], UserMenuComponent.prototype, "close", void 0);
        UserMenuComponent = __decorate([
            core.Component({
                selector: 'app-user-menu',
                template: "<div class=\"user-menu  px-2 cursor-pointer\">\n    <a [href]=\"host+'dashboard/settings/my-profile'\">\n        <div class=\"flex items-center border-b py-2 border-gray-300\">\n            <div class=\"mr-1 leading-none\">\n                <img class=\"rounded-full mr-2\" width=\"45\" [src]=\"s3BucketUrl+'/images/'+user?.s3imagename\" />\n            </div>\n            <div class=\"leading-tight\">\n                <span class=\"block text-lg text-gray-800\">{{user?.user}}</span>\n                <span class=\"text-xs text-gray-600 whitespace-nowrap\">View and edit profile</span>\n            </div>\n        </div>\n    </a>\n    <div class=\"menu mt-2 px-1\">\n        <ts-panel [disable]=\"false\">\n            <ts-panel-header (click)=\"panelOpen1=!panelOpen1\">\n                <div class=\"px-1 py-2 flex items-center border-b  border-gray-300 justify-between\"\n                    [class.border-dashed]=\"panelOpen1\" matRipple>\n                    <span class=\"text-gray-700\">\n                        Organizing Events\n                    </span>\n                    <i class=\"mdi mdi-chevron-down text-2xl color-blue\" [class.rotate-180]=\"panelOpen1\"></i>\n                </div>\n            </ts-panel-header>\n            <ts-panel-body [open]=\"panelOpen1\">\n                <div class=\"text-sm text-gray-800\">\n                    <a [href]=\"host+'dashboard/events'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-calendar-today mr-2 color-blue text-xl\"></i>\n                            Manage Event\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/billing'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-cash mr-2 color-blue text-xl\"></i>\n                            Billings\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/reports'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-chart-line mr-2 color-blue text-xl\"></i>\n                            Reports\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/promo'\">\n                        <div matRipple class=\"px-1 py-1 pb-2 flex items-center border-b border-gray-300\">\n                            <i class=\"mdi mdi-bullhorn mr-2 color-blue text-xl\"></i>\n                            Promotions\n                        </div>\n                    </a>\n                </div>\n            </ts-panel-body>\n        </ts-panel>\n        <ts-panel [disable]=\"false\">\n            <ts-panel-header (click)=\"panelOpen2=!panelOpen2\">\n                <div class=\"px-1 py-2 flex items-center border-b  border-gray-300 justify-between\"\n                    [class.border-dashed]=\"panelOpen2\" matRipple>\n                    <span class=\"text-gray-700\">\n                        Attending Events\n                    </span>\n                    <i class=\"mdi mdi-chevron-down text-2xl color-blue\" [class.rotate-180]=\"panelOpen2\"></i>\n                </div>\n            </ts-panel-header>\n            <ts-panel-body [open]=\"panelOpen2\">\n                <div class=\"text-sm text-gray-800\">\n                    <a [href]=\"host+'dashboard/mybookings'\">\n                        <div matRipple class=\"px-1 py-1 flex items-center\">\n                            <i class=\"mdi mdi-ticket-account mr-2 color-blue text-xl\"></i>\n                            My Bookings\n                        </div>\n                    </a>\n                    <a [href]=\"host+'dashboard/following'\">\n                        <div matRipple class=\"px-1 py-1 pb-2 flex items-center border-b border-gray-300\">\n                            <i class=\"mdi mdi-heart mr-2 color-blue text-xl \"></i>\n                            Following\n                        </div>\n                    </a>\n                </div>\n            </ts-panel-body>\n        </ts-panel>\n        <div class=\"px-1 py-2 flex items-center justify-between\" (click)=\"logout()\" matRipple>\n            <span class=\"text-gray-700\">\n                Logout\n            </span>\n            <i class=\"mdi mdi-logout-variant text-2xl color-blue\"></i>\n        </div>\n    </div>\n</div>",
                styles: [""]
            }),
            __metadata("design:paramtypes", [NotificationService, UserService, CookieService])
        ], UserMenuComponent);
        return UserMenuComponent;
    }());

    var algoliasearch = algoliaSearchImported;
    var SearchComponent = /** @class */ (function () {
        function SearchComponent(placeService, timeService, datepipe) {
            var _this = this;
            this.placeService = placeService;
            this.timeService = timeService;
            this.datepipe = datepipe;
            this.algoliaIndexName = config.algoliaIndexName;
            this.searchTextChanged = new rxjs.Subject();
            this.searchActive = false;
            this.citySearchActive = false;
            this.cityPopupActive = false;
            this.activePlace = 'Pune';
            this.cityQueryChanged = new rxjs.Subject();
            this.router = config.router;
            this.host = config.baseUrl;
            this.callAlgolia = function (text) {
                _this.index.search({
                    query: text,
                    hitsPerPage: 6
                }).then(function (data) {
                    _this.filterDataForSearchResult(data);
                });
            };
            this.filterDataForSearchResult = function (data) {
                var results = data.hits;
                var interests = results.filter(function (ele) {
                    return ele.objType === 'keyword' ||
                        ele.objType === 'eventtype' ||
                        ele.objType === 'category';
                });
                var organizers = results.filter(function (ele) { return ele.objType === 'organizer'; });
                var events = results.filter(function (ele) { return ele.objType === 'event'; });
                interests.map(function (interest) {
                    interest.name = interest.name + ' Events';
                    interest.location = _this.activePlace;
                });
                organizers.map(function (organizer) {
                    if (!organizer.imageUrl) {
                        organizer.imageUrl = 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/search-empty-organizer.png';
                    }
                    if (organizer.secondaryTextProperties && organizer.secondaryTextProperties.country) {
                        organizer.location = organizer.secondaryTextProperties.country;
                    }
                });
                events.map(function (event) {
                    if (!event.imageUrl) {
                        event.imageUrl = 'https://s3.ap-south-1.amazonaws.com/townscript-common-resources/search-empty-event.png';
                    }
                    if (event.secondaryTextProperties && event.secondaryTextProperties.city) {
                        event.location = event.secondaryTextProperties.city;
                    }
                    if (event.secondaryTextProperties && event.secondaryTextProperties.startTime) {
                        var startDateTime = event.secondaryTextProperties.startTime;
                        startDateTime = _this.timeService.convertDateToTimezone(startDateTime, event.secondaryTextProperties.eventTimeZone);
                        event.secondaryTextProperties.startTime = _this.datepipe.transform(startDateTime, 'd MMM yyyy, \' \'h:mma');
                    }
                });
                _this.searchResults = { 'interests': interests, 'organizers': organizers, 'events': events };
            };
            this.navigateToListing = function (interest) {
                console.log(_this.homeUrl + '/' + interest);
                _this.router.navigate([_this.homeUrl + '/' + interest]);
                _this.searchActive = false;
            };
            this.navigateToEventPage = function (eventCode) {
                _this.router.navigate(['/e/' + eventCode]);
                _this.searchActive = false;
            };
            this.search = function (text) {
                if (text !== undefined && text.length > 0) {
                    _this.searchTextChanged.next(text);
                }
            };
            this.searchTextChanged.pipe(operators.debounceTime(300)).subscribe(function (text) { return _this.callAlgolia(text); });
            this.client = algoliasearch('AT5UB8FMSR', 'c7e946f5b740ef035bd824f69dcc1612');
            this.index = this.client.initIndex(this.algoliaIndexName);
        }
        SearchComponent.prototype.clickout = function (event) {
            if (!this.citySuggestions.nativeElement.contains(event.target)) {
                this.cityPopupActive = false;
            }
            if (this.searchResultsEle && !this.searchResultsEle.nativeElement.contains(event.target)) {
                this.searchActive = false;
            }
        };
        SearchComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.placeService.place.subscribe(function (res) {
                if (res) {
                    var data = JSON.parse(res);
                    _this.activePlace = data['currentPlace'];
                    _this.homeUrl = ('/' + data['country'] + '/' + data['city']).toLowerCase();
                }
            });
        };
        __decorate([
            core.ViewChild('cityInput', { static: false }),
            __metadata("design:type", core.ElementRef)
        ], SearchComponent.prototype, "cityInput", void 0);
        __decorate([
            core.ViewChild('citySuggestions', { static: false }),
            __metadata("design:type", core.ElementRef)
        ], SearchComponent.prototype, "citySuggestions", void 0);
        __decorate([
            core.ViewChild('searchResultsEle', { static: false }),
            __metadata("design:type", core.ElementRef)
        ], SearchComponent.prototype, "searchResultsEle", void 0);
        __decorate([
            core.HostListener('document:click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], SearchComponent.prototype, "clickout", null);
        SearchComponent = __decorate([
            core.Component({
                selector: 'app-search',
                template: "<div class=\"w-full lg:flex search-container relative\" [class.active]=\"searchActive\">\n    <div #searchResultsEle class=\"w-2/3 p-2 flex items-center relative left-section\">\n        <i class=\"mdi mdi-magnify text-2xl color-blue p-2\"></i>\n        <input [(ngModel)]=\"searchText\" (ngModelChange)=\"search($event)\"\n            (focus)=\"searchActive = true;citySearchActive=false\" class=\"text-sm w-full h-full bg-transparent  p-2\"\n            type=\"text\" placeholder=\"Search for an Event, Interest or Organizer\" />\n        <div class=\"suggestions enter-slide-bottom w-full p-2 absolute\" *ngIf=\"searchResults && searchActive\">\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.interests.length>0\">\n                <li class=\"list-head\">\n                    INTERESTS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" (click)=\"navigateToListing(interest.urlCode)\"\n                    *ngFor=\"let interest of searchResults.interests\">\n                    <div class=\"flex items-center\">\n                        <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ interest.imageUrl +')'\">\n                        </div>\n                        <div>\n                            <span class=\"mb-1 block\">{{interest.name | titlecase}} </span>\n                            <div class=\"flex items-center\" *ngIf=\"interest.location\">\n                                <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                <small class=\"capitalize\">{{interest.location}}</small>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.events.length>0\">\n                <li class=\"list-head\">\n                    EVENTS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" *ngFor=\"let event of searchResults.events\"\n                    (click)=\"navigateToEventPage(event.urlCode)\">\n                    <div class=\"flex items-center\">\n                        <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ event.imageUrl +')'\"></div>\n                        <div>\n                            <span class=\"mb-1 block\">{{event.name | titlecase}} </span>\n                            <div class=\"flex items-center\">\n                                <div class=\"flex items-center\" *ngIf=\"event.location\">\n                                    <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                    <small>{{event.location}}</small>\n                                </div>\n                                <div class=\"flex items-center ml-2\" *ngIf=\"event?.secondaryTextProperties?.startTime\">\n                                    <i class=\"mdi mdi-calendar-today color-blue mr-1\"></i>\n                                    <small>{{event.secondaryTextProperties.startTime}}</small>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n            <ul class=\"ts-enter\" *ngIf=\"searchResults?.organizers.length>0\">\n                <li class=\"list-head\">\n                    ORGANIZERS\n                </li>\n                <li class=\"p-2 text-xs font-bold cursor-pointer\" *ngFor=\"let organizer of searchResults.organizers\">\n                    <a [href]=\"host+'o/'+organizer.urlCode\">\n                        <div class=\"flex items-center\">\n                            <div class=\"avatar mr-3 bg-cover\" [style.backgroundImage]=\"'url('+ organizer.imageUrl +')'\">\n                            </div>\n                            <div>\n                                <span class=\"mb-1 block\">{{organizer.name | titlecase}} </span>\n                                <div class=\"flex items-center\" *ngIf=\"organizer.location\">\n                                    <i class=\"mdi mdi-map-marker color-blue\"></i>\n                                    <small>{{organizer.location}}</small>\n                                </div>\n                            </div>\n                        </div>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div #citySuggestions class=\"w-auto flex items-center py-2  px-4 cursor-pointer relative city-search-container\"\n        [class.active]=\"cityPopupActive\" (click)=\"cityPopupActive = true\">\n        <div class=\"flex items-center w-10/12 mr-2 \" [title]=\" activePlace\">\n            <i class=\"mdi mdi-map-marker text-2xl color-blue\"></i>\n            <span class=\"truncate\">{{activePlace}}</span>\n        </div>\n        <i class=\"mdi mdi-chevron-down text-2xl\"></i>\n        <app-city-search-popup class=\"popup\" [(cityPopupActive)]=\"cityPopupActive\" [(activePlace)]=\"activePlace\"\n            *ngIf=\"cityPopupActive\">\n        </app-city-search-popup>\n    </div>\n</div>\n",
                styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}@media (min-width:991px){.search-container{height:42px;border-radius:2px;-webkit-transition:.3s;transition:.3s}.search-container .left-section{background-color:#ededed;border-radius:4px}.search-container .left-section input{-webkit-transition:.3s;transition:.3s}.search-container .left-section input:focus{background:#fafafa}.search-container .left-section .suggestions{top:100%;left:0;background:#fafafa;border-top:1px solid rgba(151,151,151,.4)}.search-container .left-section .suggestions ul{margin:2% 0}.search-container .left-section .suggestions ul li{color:#636363;-webkit-transition:.15s;transition:.15s;border-bottom:1px solid rgba(151,151,151,.25)}.search-container .left-section .suggestions ul li.list-head{font-size:10px;color:#636363;border:none;font-weight:400}.search-container .left-section .suggestions ul li.list-head:hover{background:#fafafa}.search-container .left-section .suggestions ul li .avatar{border-radius:50%;height:41px;width:41px}.search-container .left-section .suggestions ul li:hover{background:#ededed}.search-container .city-search-container{-webkit-transition:.3s;transition:.3s;max-width:33.33%}.search-container .city-search-container.active{background:#fafafa;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container .city-search-container .popup{position:absolute;top:135%;width:135%;left:-34%}.search-container.active .left-section{background:#fafafa;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.search-container.active .suggestions{box-shadow:0 11px 15px 0 rgba(0,0,0,.15)}}"]
            }),
            __metadata("design:paramtypes", [PlaceService, TimeService, common.DatePipe])
        ], SearchComponent);
        return SearchComponent;
    }());

    var CitySearchPopupComponent = /** @class */ (function () {
        function CitySearchPopupComponent(placeService, headerService, datepipe) {
            var _this = this;
            this.placeService = placeService;
            this.headerService = headerService;
            this.datepipe = datepipe;
            this.showArrow = true;
            this.activePlaceChange = new core.EventEmitter();
            this.cityPopupActiveChange = new core.EventEmitter();
            this.citySearchActive = true;
            this.router = config.router;
            this.cityQueryChanged = new rxjs.Subject();
            this.cityLoading = false;
            this.callSearchCity = function (query) {
                _this.cityLoading = true;
                _this.headerService.getplaceSearchResults(query).subscribe(function (res) {
                    _this.placeSearchResults = res['data'];
                    _this.cityLoading = false;
                });
            };
            this.placeChanged = function (place) {
                if (place.type === 'country') {
                    _this.router.navigate(['/' + place.twoDigitCode.toLowerCase()], { state: { place: place } });
                }
                if (place.type === 'city') {
                    _this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.cityCode], { state: { place: place } });
                }
                if (place.type === 'locality') {
                    _this.router.navigate(['/' + place.countryCode.toLowerCase() + '/' + place.cityCode + '/' + place.localityCode], { state: { place: place } });
                }
                if (place.type === 'unstructured') {
                    var name_1 = place.name.replace(/,/g, '').replace(/ /g, '-');
                    var secondaryText = place.secondaryText.replace(/,/g, '').replace(/ /g, '-');
                    _this.router.navigate(['/s/' + name_1 + '--' + secondaryText], { state: { place: place } });
                }
                // this.placeService.updatePlace(place.name);
                _this.activePlace = place.name;
                _this.activePlaceChange.emit(place.name);
                _this.cityPopupActive = false;
                _this.cityPopupActiveChange.emit(false);
            };
            this.openCityPopup = function () {
                _this.cityPopupActive = true;
                _this.cityInput.nativeElement.focus();
            };
            this.searchCity = function (text) {
                if (!text || text.length === 0) {
                    _this.placeSearchResults = [];
                }
                if (text != undefined && text.length > 0) {
                    _this.cityQueryChanged.next(text);
                }
            };
            this.getPopularPlaces = function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.placeService.place.subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var country, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!res) return [3 /*break*/, 2];
                                    country = JSON.parse(res)['country'];
                                    return [4 /*yield*/, this.headerService.getPopularCities(country)];
                                case 1:
                                    data = _a.sent();
                                    this.popularPlaces = data['data'].slice(0, 6).map(function (ele) {
                                        ele.type = 'city';
                                        ele.cityCode = ele.code;
                                        return ele;
                                    });
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); };
            this.cityQueryChanged.pipe(operators.debounceTime(300)).subscribe(function (text) { return _this.callSearchCity(text); });
            if (this.router.url) {
                this.urlArray = this.router.url.replace('/', '').split('/');
            }
            else {
                this.urlArray = ['in'];
            }
        }
        CitySearchPopupComponent.prototype.ngAfterViewInit = function () {
            this.citySearchActive = true;
            this.cityInput.nativeElement.focus();
            this.getPopularPlaces();
        };
        CitySearchPopupComponent.prototype.ngOnInit = function () {
        };
        __decorate([
            core.ViewChild('cityInput', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], CitySearchPopupComponent.prototype, "cityInput", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], CitySearchPopupComponent.prototype, "showArrow", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], CitySearchPopupComponent.prototype, "activePlace", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], CitySearchPopupComponent.prototype, "activePlaceChange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], CitySearchPopupComponent.prototype, "cityPopupActive", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], CitySearchPopupComponent.prototype, "cityPopupActiveChange", void 0);
        CitySearchPopupComponent = __decorate([
            core.Component({
                selector: 'app-city-search-popup',
                template: "<div class=\"city-suggestions enter-slide-bottom\" [class.arrow]=\"showArrow\">\n    <div class=\"suggestions-container\">\n        <ul>\n            <li [class.active]=\"citySearchActive\" class=\"p-2 capitalize cursor-pointer flex items-center truncate\">\n                <i class=\"mdi mdi-magnify mr-2\"></i>\n                <input #cityInput autocomplete=\"off\" id=\"cityInput\" type=\"text\" placeholder=\"Type here to search...\"\n                    [(ngModel)]=\"cityQuery\" (ngModelChange)=\"searchCity($event)\" (focus)=\"citySearchActive=true\"\n                    class=\"w-full bg-transparent text-sm\" />\n                <i *ngIf=\"cityLoading\" class=\"mdi mdi-loading mdi-spin\"></i>\n            </li>\n            <li matRipple (click)=\"placeChanged(place);\"\n                class=\"p-2 capitalize cursor-pointer flex items-center truncate\"\n                *ngFor=\"let place of placeSearchResults\">\n                <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                <span class=\"text-sm flex items-end truncate\">\n                    <span class=\"mr-1 whitespace-no-wrap\">{{place.name}} </span>\n                    <small class=\"text-2xs text-gray-600\"\n                        *ngIf=\"place.city && place?.city.length>0 && place?.type!='city'\">\n                        {{place.city}},\n                    </small>\n                    <small class=\"text-2xs text-gray-600\"\n                        *ngIf=\"place.country && place?.country.length>0 && place?.type!='country'\">{{place.country}}\n                    </small>\n                    <small class=\"text-2xs truncate text-gray-600\">{{place.secondaryText}}</small>\n                </span>\n            </li>\n            <ng-container matRipple *ngIf=\"!placeSearchResults || placeSearchResults.length==0\">\n                <li (click)=\"placeChanged(city);\" class=\"p-2 px-4 cursor-pointer capitalize\"\n                    *ngFor=\"let city of popularPlaces\">\n                    <i class=\"mdi mdi-map-marker text-base mr-1 color-blue\"></i>\n                    <span class=\"text-base\">{{city.name}}</span>\n                </li>\n            </ng-container>\n        </ul>\n    </div>\n</div>",
                styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.city-suggestions{width:100%;background:#fafafa;position:absolute;box-shadow:0 5px 10px 0 rgba(0,0,0,.15)}.city-suggestions .mdi-spin::before{-webkit-animation-duration:.5s;animation-duration:.5s}.city-suggestions li.active,.city-suggestions li:hover{background:#ededed}.city-suggestions.arrow{border-top:3px solid #3782c4}.city-suggestions.arrow:before{content:\" \";width:10px;position:absolute;top:-7px;left:88%;height:10px;-webkit-filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));filter:drop-shadow(0 -5px 10px rgba(0, 0, 0, .15));background:#ededed;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-top:3px solid #3782c4;border-left:3px solid #3782c4}@media (min-width:991px){.city-suggestions{width:140%;left:-40%}}"]
            }),
            __metadata("design:paramtypes", [PlaceService, HeaderService, common.DatePipe])
        ], CitySearchPopupComponent);
        return CitySearchPopupComponent;
    }());

    var TsLoginSignupService = /** @class */ (function () {
        function TsLoginSignupService(http$1) {
            var _this = this;
            this.http = http$1;
            this.token = config.token;
            this.baseUrl = config.baseUrl;
            this.apiServerUrl = this.baseUrl + 'api/';
            this.headers = new http.HttpHeaders().set('Authorization', this.token);
            this.CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY = config.CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY;
            this.getUserSignUpDetails = function (emailId) {
                var params = new http.HttpParams({ fromString: "email=" + emailId });
                return _this.http.get(_this.apiServerUrl + 'user/getusersignupdetails', { params: params, headers: _this.headers }).toPromise();
            };
            this.loginWithTownscript = function (emailId, password) {
                var formData = new FormData();
                formData.set('emailId', emailId);
                formData.set('password', password);
                return _this.http.post(_this.apiServerUrl + 'user/loginwithtownscript', formData, { headers: _this.headers }).toPromise();
            };
            this.registerWithTownscriptWithCaptcha = function (formData) {
                return _this.http.post(_this.apiServerUrl + 'user/registerwithtownscriptwithcaptcha', formData, { headers: _this.headers, responseType: 'text' }).toPromise();
            };
            this.sendForgotPwdEmail = function (emailId) {
                var forgotPassword = new FormData();
                forgotPassword.set('emailId', emailId);
                return _this.http.post(_this.apiServerUrl + 'verify/sendforgotpwdemail', forgotPassword, { headers: _this.headers }).toPromise();
            };
            this.resendVerificationCode = function (rdurl, emailId) {
                var formData = new FormData();
                formData.append('rdurl', rdurl);
                formData.append('emailid', emailId);
                return _this.http.post(_this.apiServerUrl + 'user/resendverificationcode', formData, { headers: _this.headers });
            };
        }
        TsLoginSignupService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [http.HttpClient])
        ], TsLoginSignupService);
        return TsLoginSignupService;
    }());

    var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    var TsLoginSignupComponent = /** @class */ (function () {
        function TsLoginSignupComponent(cookieService, userService, notificationService, tsLoginSignupService, placeService) {
            var _this_1 = this;
            this.cookieService = cookieService;
            this.userService = userService;
            this.notificationService = notificationService;
            this.tsLoginSignupService = tsLoginSignupService;
            this.placeService = placeService;
            this.defaultHeader = 'Let\'s get started';
            this.defaultSubHeader = 'Your one stop tool for organizing events';
            this.showSocial = true;
            this.closeDialog = new core.EventEmitter();
            this.captchaToken = this.tsLoginSignupService.CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY;
            this.show = false;
            this.showPassword = false;
            this.isDefaultView = true;
            this.isSignInView = false;
            this.isSignUpView = false;
            this.isVerifyEmailView = false;
            this.showResetPassword = false;
            this.userTimezone = luxon.DateTime.local().zoneName;
            this.correctPhoneNumber = null;
            this.phoneError = false;
            this.socialLoginMsg = false;
            this.signInErrMessage = '';
            this.resetPwdLinkSent = false;
            this.signUpErrMessage = '';
            this.fbLoginURL = config.baseUrl + 'api/'
                + 'user/signinwithfacebook' + (this.rdurl === undefined ? '' : '?rdurl=' + this.rdurl);
            this.googleLoginURL = config.baseUrl + 'api/'
                + 'user/signinwithgoogle' + (this.rdurl === undefined ? '' : '?rdurl=' + this.rdurl);
            this.showLoader = false;
            this.countryCode = 'IN';
            this.initForm = function () {
                _this_1.loginForm = new forms.FormGroup({
                    'fullName': new forms.FormControl('', { validators: forms.Validators.required }),
                    'email': new forms.FormControl('', { validators: [forms.Validators.required, forms.Validators.pattern(emailRegex)] }),
                    'password': new forms.FormControl('', { validators: forms.Validators.required }),
                    'phoneNumber': new forms.FormControl('', { validators: forms.Validators.required })
                });
                _this_1.loginForm.get('fullName').disable();
                _this_1.loginForm.get('password').disable();
                _this_1.loginForm.get('phoneNumber').disable();
            };
            this.close = function () {
                _this_1.closeDialog.emit(true);
            };
            this.clearErrors = function () {
                _this_1.socialLoginMsg = '';
            };
            this.resolve = function (captchaResponse) {
                _this_1.captchaResponse = captchaResponse;
            };
            this.password = function () {
                _this_1.show = !_this_1.show;
            };
            this.verifyEmail = function () { return __awaiter(_this_1, void 0, void 0, function () {
                var result, newData;
                var _this_1 = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.loginForm.controls.email.valid) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.tsLoginSignupService.getUserSignUpDetails(this.loginForm.value.email)];
                        case 1:
                            result = _a.sent();
                            newData = result;
                            try {
                                newData = JSON.parse(result.data);
                            }
                            catch (e) {
                            }
                            if (newData && newData.isExistingUser && newData.isManualSignup) {
                                this.loginForm.get('password').enable();
                                this.isSignInView = true;
                                this.isSignUpView = false;
                                this.showSocial = false;
                                this.socialLoginMsg = false;
                                this.isDefaultView = false;
                            }
                            else if (newData && newData.isExistingUser && !newData.isManualSignup) {
                                this.socialLoginMsg = true;
                            }
                            else {
                                this.isSignUpView = true;
                                this.isSignInView = false;
                                this.showSocial = false;
                                this.isDefaultView = false;
                                this.socialLoginMsg = false;
                                this.loginForm.get('fullName').enable();
                                this.loginForm.get('password').enable();
                                this.loginForm.get('phoneNumber').enable();
                                this.initializeTelInput = setTimeout(function () {
                                    _this_1.initializeIntlTelInput();
                                }, 200);
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
            this.initializeIntlTelInput = function () {
                // initialize intl tel
                var input = document.querySelector('#phoneNumber');
                _this_1.intlInput = window.intlTelInput(input, {
                    initialCountry: _this_1.countryCode,
                    utilScripts: '../../../../../../node_modules/intl-tel-input/build/js/utils.js'
                });
            };
            this.validatePhoneNumber = function () {
                if (!_this_1.intlInput.isValidNumber()) {
                    _this_1.phoneError = true;
                    _this_1.loginForm.controls.phoneNumber.setErrors({ 'valid': false });
                }
                else {
                    _this_1.loginForm.controls.phoneNumber.setErrors();
                    _this_1.phoneError = false;
                }
            };
            this.signIn = function () { return __awaiter(_this_1, void 0, void 0, function () {
                var retData, tokenData, userData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.loginForm.valid) {
                                return [2 /*return*/];
                            }
                            this.showLoader = true;
                            return [4 /*yield*/, this.tsLoginSignupService.loginWithTownscript(this.loginForm.value.email, this.loginForm.value.password)];
                        case 1:
                            retData = _a.sent();
                            this.showLoader = false;
                            if (retData.result != 'Success') {
                                this.signInErrMessage = retData.data;
                                return [2 /*return*/];
                            }
                            tokenData = {
                                token: (retData.data)
                            };
                            userData = __assign({}, retData.userDetails, tokenData);
                            this.userService.updateUser(userData);
                            this.cookieService.setCookie('townscript-user', JSON.stringify(userData), 90);
                            this.notificationService.success('Congrats! You are signed in', 2000, 'Dismiss');
                            if (this.mode === 'dialog') {
                                this.close();
                            }
                            if (this.rdurl != undefined) {
                                window.open(this.rdurl, '_self');
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
            this.signUp = function () { return __awaiter(_this_1, void 0, void 0, function () {
                var self, input, iti, formData, data, _this_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            self = this;
                            this.loginForm.get('email').setValue(this.loginForm.get('email').value.trim());
                            this.loginForm.get('fullName').setValue(this.loginForm.get('fullName').value.trim());
                            if (!this.loginForm.valid || this.captchaResponse == undefined) {
                                return [2 /*return*/];
                            }
                            input = document.querySelector('#phoneNumber');
                            iti = window.intlTelInputGlobals.getInstance(input);
                            this.correctPhoneNumber = iti.getNumber();
                            if (this.correctPhoneNumber === '') {
                                this.phoneError = true;
                                return [2 /*return*/];
                            }
                            this.showLoader = true;
                            this.loaderText = 'Please wait while we are creating your account.';
                            formData = new FormData();
                            formData.append('name', this.loginForm.value.fullName);
                            formData.append('emailid', this.loginForm.value.email);
                            formData.append('password', this.loginForm.value.password);
                            formData.append('phone', this.correctPhoneNumber);
                            formData.append('usertimezone', this.userTimezone);
                            formData.append('reCaptcha', this.captchaResponse);
                            formData.append('username', this.randomString(10, ''));
                            if (this.rdurl) {
                                formData.append('rdurl', this.rdurl);
                            }
                            return [4 /*yield*/, this.tsLoginSignupService.registerWithTownscriptWithCaptcha(formData)];
                        case 1:
                            data = _a.sent();
                            try {
                                data = JSON.parse(data);
                            }
                            catch (e) {
                            }
                            if (data['result'] == 'Error') {
                                self.showLoader = false;
                                self.signUpErrMessage = data['data'];
                                _this_2 = self;
                                setTimeout(function () {
                                    _this_2.initializeIntlTelInput();
                                }, 200);
                                return [2 /*return*/];
                            }
                            self.showLoader = false;
                            self.isVerifyEmailView = true;
                            self.showSocial = false;
                            self.isSignUpView = false;
                            return [2 /*return*/];
                    }
                });
            }); };
            this.forgotPassword = function () {
                _this_1.loginForm.get('password').disable();
                _this_1.showResetPassword = true;
                _this_1.showSocial = false;
                _this_1.isSignInView = false;
            };
            this.goBack = function () {
                if (_this_1.showResetPassword) {
                    _this_1.showResetPassword = false;
                    _this_1.isSignUpView = false;
                    _this_1.isSignInView = true;
                    _this_1.loginForm.get('password').enable();
                }
                else if (_this_1.isSignInView) {
                    _this_1.isSignUpView = false;
                    _this_1.showResetPassword = false;
                    _this_1.isSignInView = false;
                    _this_1.showSocial = true;
                    _this_1.isDefaultView = true;
                }
                else if (_this_1.isSignUpView) {
                    _this_1.isSignUpView = false;
                    _this_1.showSocial = true;
                    _this_1.isDefaultView = true;
                    _this_1.loginForm.get('fullName').disable();
                    _this_1.loginForm.get('password').disable();
                    _this_1.loginForm.get('phoneNumber').disable();
                }
                else if (_this_1.isVerifyEmailView) {
                    _this_1.isVerifyEmailView = false;
                    _this_1.showSocial = true;
                    _this_1.isSignUpView = false;
                    _this_1.isDefaultView = true;
                    _this_1.loginForm.get('fullName').disable();
                    _this_1.loginForm.get('password').disable();
                    _this_1.loginForm.get('phoneNumber').disable();
                }
                else {
                    _this_1.close();
                }
            };
            this.resetPassword = function () { return __awaiter(_this_1, void 0, void 0, function () {
                var resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showLoader = true;
                            this.loginForm.get('email').setValue(this.loginForm.get('email').value.trim());
                            this.loaderText = 'Sending Reset Password Link to ' + this.loginForm.value.email;
                            return [4 /*yield*/, this.tsLoginSignupService.sendForgotPwdEmail(this.loginForm.value.email)];
                        case 1:
                            resp = _a.sent();
                            this.showLoader = false;
                            if (this.resetPwdLinkSent) {
                                this.notificationService.success('Reset Password Link has been sent', 2000, 'Dismiss');
                            }
                            this.resetPwdLinkSent = true;
                            return [2 /*return*/];
                    }
                });
            }); };
            this.randomString = function (len, an) {
                an = an && an.toLowerCase();
                var str = '', i = 0;
                var min = an === 'a' ? 10 : 0;
                var max = an === 'n' ? 10 : 62;
                while (i < len) {
                    var r = Math.random() * (max - min) + min << 0;
                    str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
                    i++;
                }
                return str;
            };
            this.resendVerifyEmail = function () { return __awaiter(_this_1, void 0, void 0, function () {
                var retData;
                return __generator(this, function (_a) {
                    this.showLoader = true;
                    this.loginForm.get('email').setValue(this.loginForm.get('email').value.trim());
                    this.loaderText = 'Sending Verification email to ' + this.loginForm.value.email;
                    retData = this.tsLoginSignupService.resendVerificationCode(this.rdurl, this.loginForm.value.email);
                    this.showLoader = false;
                    this.notificationService.success('Verification email has been sent', 2000, 'Dismiss');
                    return [2 /*return*/];
                });
            }); };
            this.togglePasswordDisplay = function () {
                _this_1.showPassword = !_this_1.showPassword;
                var pwdInput = document.getElementById('user-pwd');
                pwdInput.type = _this_1.showPassword ? 'text' : 'password';
            };
        }
        TsLoginSignupComponent.prototype.ngOnInit = function () {
            var _this_1 = this;
            this.initForm();
            this.subObject = this.placeService.place.subscribe(function (res) {
                var placeData = JSON.parse(res);
                _this_1.countryCode = placeData['country'];
            });
        };
        TsLoginSignupComponent.prototype.ngOnDestroy = function () {
            if (this.subObject != undefined) {
                this.subObject.unsubscribe();
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsLoginSignupComponent.prototype, "mode", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsLoginSignupComponent.prototype, "defaultHeader", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsLoginSignupComponent.prototype, "defaultSubHeader", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsLoginSignupComponent.prototype, "rdurl", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsLoginSignupComponent.prototype, "showSocial", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], TsLoginSignupComponent.prototype, "closeDialog", void 0);
        __decorate([
            core.ViewChild('recaptchaRef', { read: true, static: true }),
            __metadata("design:type", Object)
        ], TsLoginSignupComponent.prototype, "captchaToken", void 0);
        TsLoginSignupComponent = __decorate([
            core.Component({
                selector: 'app-ts-login-signup',
                template: "<div class=\"login-signup-view px-5\" id=\"login-signup-view\">\n  <div class=\"view-header\">\n    <div class=\"back-button text-gray-700 text-xl md:text-2xl lg:text-3xl -ml-1\" *ngIf=\"mode == 'dialog'\">\n      <i class=\"mdi mdi-arrow-left cursor-pointer\" (click)=\"goBack()\"></i>\n    </div>\n    <div class=\"initial-header flex flex-col fadeIn\" *ngIf=\"isDefaultView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">{{defaultHeader}}</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">{{defaultSubHeader}}</div>\n    </div>\n    <div class=\"sign-in-header flex flex-col fadeIn\" *ngIf=\"isSignInView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign In</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"forgot-pwd-header flex flex-col fadeIn\" *ngIf=\"showResetPassword\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Forgot Password?</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Don\u2019t worry, we\u2019ll help you reset it\n      </div>\n    </div>\n\n    <div class=\"sign-up-header flex flex-col fadeIn\" *ngIf=\"isSignUpView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign Up</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"verify-email-header flex flex-col fadeIn\" *ngIf=\"isVerifyEmailView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">You're almost done</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">We just need to verify your e-mail</div>\n    </div>\n  </div>\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10\" *ngIf=\"showLoader\">\n    <mat-spinner></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\">{{loaderText}}</div>\n  </div>\n  <div class=\"view-body pt-5\" *ngIf=\"!showLoader\">\n    <div class=\"default-view-body py-2 fadeInUp\" *ngIf=\"isDefaultView\">\n      <form id=\"loginForm\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\" (ngModelChange)=\"clearErrors()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group w-full text-center\">\n          <button matRipple (click)=\"verifyEmail()\" [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Continue\n          </button>\n        </div>\n\n        <div class=\"form-group strike-through strike-through-margin\">\n          <div class=\"text-gray-700 text-base md:text-lg lg:text-xl\">\n            <span class=\"or-text\">OR</span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n            <a [href]=\"googleLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n                ts-data-analytics prop-event=\"click\" eventLabel=\"Login with Google\"\n                prop-clicked-location=\"Sign In\" matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/google-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Google</span>\n                </div>\n            </a>\n            <p class=\"form-control--error\" ng-if=\"googleError.length\" ng-bind=\"googleError\"></p>\n        </div>\n        <div class=\"form-group\">\n            <a [href]=\"fbLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n                ts-data-analytics prop-event=\"click\" eventLabel=\"Login with Facebook\"\n                prop-clicked-location=\"Sign In\" matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/facebook-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Facebook</span>\n                </div>\n            </a>\n            <ng-container class=\"login-error\" ng-if=\"fbError.length\">\n                <i class=\"ion-android-alert\"></i>\n                <p class=\"form-control--error\" ng-bind=\"fbError\"></p>\n            </ng-container>\n        </div>\n\n      </form>\n    </div>\n    <div class=\"signin-view-body py-2 fadeInUp\" *ngIf=\"isSignInView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <p class=\"text-left text-sm text-red-500 -mt-3 mb-2\" *ngIf=\"signInErrMessage.length > 0\">{{signInErrMessage}}</p>\n          <button matRipple (click)=\"signIn()\" [ngClass]=\"!loginForm.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Sign In\n          </button>\n          <div class=\"text-sm text-center text-gray-700 p-1\">\n            <span class=\"cursor-pointer hover:underline\" (click)=\"forgotPassword()\">Forgot Password?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"reset-pwd-view-body py-2 fadeInUp\" *ngIf=\"showResetPassword\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center\" *ngIf=\"!resetPwdLinkSent\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"link-sent fadeIn\" *ngIf=\"resetPwdLinkSent\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-2 text-gray-700 text-sm text-center secondary-header\">Password reset link has been sent to\n            {{loginForm.value.email}}</div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resetPassword()\"\n            [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Send Reset Password Link\n          </button>\n          <div (click)=\"resetPassword()\"\n            class=\"color-blue font-semibold text-sm text-center resend-email py-2 px-2 hover:underline cursor-pointer\"\n            *ngIf=\"resetPwdLinkSent\">\n            Resend Email\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"signup-view-body py-2 fadeInUp\" *ngIf=\"isSignUpView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"fullName\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"name\" type=\"text\" placeholder=\"Full Name\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('fullName').hasError('required') && (loginForm.get('fullName').dirty || loginForm.get('fullName').touched)\">\n              Full Name is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center relative z-50\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative z-50\" floatLabel=\"always\">\n              <input type=\"tel\" formControlName=\"phoneNumber\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10\"\n                id=\"phoneNumber\" placeholder=\"Phone no.\" (ngModelChange)=\"validatePhoneNumber()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\"\n              *ngIf=\"loginForm.get('phoneNumber').hasError('required') && (loginForm.get('phoneNumber').dirty || loginForm.get('phoneNumber').touched)\">\n              Phone Number is required\n            </p>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\" *ngIf=\"phoneError\">Please enter a valid Phone no.</p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center mb-3 relative z-0\">\n            <div class=\"w-full flex items-center justify-center md:justify-start\">\n                <re-captcha\n                  (resolved)=\"resolve($event)\"\n                  [siteKey]=\"captchaToken\">\n                </re-captcha>\n            </div>\n        </div>\n        <div class=\"w-full text-center form-group relative z-0\">\n          <button matRipple\n            [ngClass]=\"!loginForm.valid || phoneError || captchaResponse == undefined ? 'opacity-50 pointer-events-none': ''\"\n            (click)=\"signUp()\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">\n            Create your account\n          </button>\n          <p class=\"text-left text-sm -mt-1 text-red-500\" *ngIf=\"signUpErrMessage.length > 0\">{{signUpErrMessage}}</p>\n        </div>\n      </form>\n    </div>\n\n    <div class=\"verify-email-view-body py-2 fadeInUp\" *ngIf=\"isVerifyEmailView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"link-sent fadeIn\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-4 text-gray-700 text-sm text-center secondary-header\">\n            Tap the link in the email we sent you at {{loginForm.value.email}}\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resendVerifyEmail()\" [disabled]=\"!loginForm.valid\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Resend Verification Email\n          </button>\n          <div class=\"text-gray-700 text-sm text-center why-verify px-2 hover:underline cursor-pointer\">\n            <span\n              matTooltip=\"Townscript sends all important communication regarding your events & account-related updates via e-mail. We just want to make sure you don\u2019t miss these important information\"\n              matTooltipPosition=\"right\" matTooltipClass=\"ts-login-tooltip\">Why verify?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"agreement my-2\" *ngIf=\"isDefaultView || isSignUpView\">\n      <div class=\"w-full hor-linear-grad my-2\"></div>\n      <p class=\"text-xs text-center p-2 text-gray-800 px-5\">\n        By continuing, you agree to Townscript's\n        <a class=\"text-blue-700\" href=\"/terms-and-conditions\">terms of service</a>\n        and\n        <a class=\"text-blue-700\" href=\"/privacy-policy\">privacy policy</a>.\n      </p>\n    </div>\n  </div>\n</div>\n",
                encapsulation: core.ViewEncapsulation.None,
                styles: ["@-webkit-keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ts-login-tooltip{background-color:#666;color:#fff;font-size:12px;opacity:.98;white-space:pre-line}.login-signup-view{max-height:90vh;overflow:hidden}.login-signup-view .color-blue{color:#3782c4}.login-signup-view .fadeIn .primary-header,.login-signup-view .fadeIn .secondary-header{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-name:fadeIn;animation-name:fadeIn}.login-signup-view .fadeIn .secondary-header{-webkit-animation-delay:.1s;animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.login-signup-view .fadeInUp .login-form .form-group:nth-child(1){-webkit-animation-delay:.1s;animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(3){-webkit-animation-delay:.3s;animation-delay:.3s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(4){-webkit-animation-delay:.4s;animation-delay:.4s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(5){-webkit-animation-delay:.5s;animation-delay:.5s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(6){-webkit-animation-delay:.6s;animation-delay:.6s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(7){-webkit-animation-delay:.7s;animation-delay:.7s}.login-signup-view .ts-loader{-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.login-signup-view .ts-loader circle{stroke-width:5%!important}.login-signup-view .view-body .blue-btn{background:#3782c4;color:#fff;-webkit-transition:.15s;transition:.15s}.login-signup-view .view-body .blue-btn:hover{background:#1369b5}.login-signup-view .view-body .default-view-body .strike-through-margin{margin:30px 0;text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em}.login-signup-view .view-body .default-view-body .strike-through-margin span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .strike-through{text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em;margin:30px auto}.login-signup-view .view-body .default-view-body .strike-through span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .logo{height:auto;width:25px}.login-signup-view .view-body .hor-linear-grad{height:1px;width:100%;background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0)),color-stop(48%,#e2e2e2),to(rgba(255,255,255,0)));background-image:linear-gradient(to bottom,rgba(255,255,255,0) 0,#e2e2e2 48%,rgba(255,255,255,0) 100%)}"]
            }),
            __metadata("design:paramtypes", [CookieService,
                UserService,
                NotificationService,
                TsLoginSignupService,
                PlaceService])
        ], TsLoginSignupComponent);
        return TsLoginSignupComponent;
    }());

    var EmailSentSVGComponent = /** @class */ (function () {
        function EmailSentSVGComponent() {
        }
        EmailSentSVGComponent.prototype.ngOnInit = function () {
        };
        EmailSentSVGComponent = __decorate([
            core.Component({
                selector: 'app-email-sent',
                template: "<svg width=\"224\" height=\"179\" viewBox=\"0 0 224 179\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g id=\"undraw_envelope_n8lc\" clip-path=\"url(#clip0)\">\n<path id=\"Vector\" opacity=\"0.1\" d=\"M117.621 54.4782C104.642 54.079 92.2817 50.3503 80.4864 46.2705C68.6911 42.1907 56.9818 37.6782 44.3141 35.5171C36.1669 34.1272 26.8499 33.9307 20.2853 37.8162C13.967 41.5553 11.9268 48.0116 10.8294 54.0038C10.002 58.51 9.51688 63.2545 11.7801 67.4722C13.345 70.3983 16.1403 72.8625 18.069 75.6674C24.7784 85.4301 20.0368 97.4669 12.764 106.998C9.35257 111.468 5.39537 115.734 2.76245 120.493C0.129529 125.252 -1.08326 130.71 1.21517 135.558C3.49794 140.366 8.93788 143.984 14.8316 146.527C26.801 151.69 40.9065 153.167 54.6599 154.005C85.1048 155.857 115.714 155.05 146.241 154.252C157.537 153.955 168.885 153.654 179.999 152.099C186.171 151.236 192.542 149.867 197.018 146.561C202.706 142.364 204.114 135.255 200.304 129.993C193.911 121.164 176.244 118.972 171.766 109.497C169.305 104.283 171.833 98.4722 175.406 93.6358C183.074 83.2606 195.928 74.1584 196.605 62.2993C197.068 54.148 190.891 45.9967 181.337 42.1426C171.324 38.1025 157.438 38.6104 150.04 45.2986C142.448 52.1833 129.08 54.8398 117.621 54.4782Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_2\" opacity=\"0.1\" d=\"M94.2468 179C129.001 179 157.175 176.175 157.175 172.689C157.175 169.204 129.001 166.378 94.2468 166.378C59.4922 166.378 31.3181 169.204 31.3181 172.689C31.3181 176.175 59.4922 179 94.2468 179Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_3\" d=\"M36.6793 172.004C36.6793 172.004 33.8873 156.272 23.5243 148.476C19.1761 145.204 15.9945 140.755 14.605 135.688C13.9511 133.287 13.5321 130.829 13.354 128.348\" stroke=\"#535461\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n<path id=\"Vector_4\" d=\"M6.85654 123.398C7.72228 125.083 13.5076 128.495 13.5076 128.495C13.5076 128.495 14.2348 122.121 13.3626 120.434C12.4904 118.746 10.3325 118.043 8.53175 118.861C6.73101 119.678 5.98431 121.71 6.85654 123.398Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_5\" d=\"M6.30472 135.191C8.01456 136.162 14.8409 136.076 14.8409 136.076C14.8409 136.076 11.7611 130.355 10.0577 129.384C8.35437 128.413 6.12724 128.925 5.09268 130.529C4.05812 132.133 4.59705 134.22 6.30472 135.191Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_6\" d=\"M14.7911 151.059C16.7867 151.087 22.6326 147.777 22.6326 147.777C22.6326 147.777 16.8992 144.298 14.9015 144.268C12.9038 144.238 11.2611 145.736 11.2221 147.611C11.1832 149.486 12.7934 151.025 14.7911 151.059Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_7\" d=\"M24.0893 161.699C26.0503 162.045 32.4091 159.708 32.4091 159.708C32.4091 159.708 27.3835 155.364 25.4248 155.024C23.466 154.684 21.5722 155.885 21.2043 157.736C20.8363 159.587 22.1263 161.354 24.0893 161.699Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_8\" d=\"M21.8406 133.291C21.1589 135.053 15.7804 139.005 15.7804 139.005C15.7804 139.005 14.3563 132.737 15.0381 130.975C15.7198 129.212 17.7955 128.301 19.6719 128.94C21.5484 129.58 22.5224 131.53 21.8406 133.291Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_9\" d=\"M32.5475 145.869C31.3355 147.361 24.9463 149.621 24.9463 149.621C24.9463 149.621 25.5956 143.239 26.799 141.75C27.4069 141.027 28.2665 140.559 29.2063 140.439C30.146 140.32 31.0965 140.557 31.8679 141.104C32.2424 141.36 32.5593 141.692 32.7986 142.076C33.038 142.461 33.1945 142.891 33.2584 143.338C33.3222 143.786 33.292 144.242 33.1697 144.678C33.0473 145.114 32.8355 145.519 32.5475 145.869Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_10\" d=\"M41.1661 159.436C40.2397 161.098 34.3505 164.34 34.3505 164.34C34.3505 164.34 33.8332 157.949 34.7596 156.287C35.6859 154.626 37.8698 153.984 39.6402 154.854C41.4107 155.723 42.0903 157.775 41.1661 159.436Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_11\" opacity=\"0.25\" d=\"M6.85654 123.398C7.72228 125.083 13.5076 128.495 13.5076 128.495C13.5076 128.495 14.2348 122.121 13.3626 120.434C12.4904 118.746 10.3325 118.043 8.53175 118.861C6.73101 119.678 5.98431 121.71 6.85654 123.398Z\" fill=\"black\"/>\n<path id=\"Vector_12\" opacity=\"0.25\" d=\"M6.30472 135.191C8.01456 136.162 14.8409 136.076 14.8409 136.076C14.8409 136.076 11.7611 130.355 10.0577 129.384C8.35437 128.413 6.12724 128.925 5.09268 130.529C4.05812 132.133 4.59705 134.22 6.30472 135.191Z\" fill=\"black\"/>\n<path id=\"Vector_13\" opacity=\"0.25\" d=\"M14.7911 151.059C16.7867 151.087 22.6326 147.777 22.6326 147.777C22.6326 147.777 16.8992 144.298 14.9015 144.268C12.9038 144.238 11.2611 145.736 11.2221 147.611C11.1832 149.486 12.7934 151.025 14.7911 151.059Z\" fill=\"black\"/>\n<path id=\"Vector_14\" opacity=\"0.25\" d=\"M24.0893 161.699C26.0503 162.045 32.4091 159.708 32.4091 159.708C32.4091 159.708 27.3835 155.364 25.4248 155.024C23.466 154.684 21.5722 155.885 21.2043 157.736C20.8363 159.587 22.1263 161.354 24.0893 161.699Z\" fill=\"black\"/>\n<path id=\"Vector_15\" opacity=\"0.25\" d=\"M21.8406 133.291C21.1589 135.053 15.7804 139.005 15.7804 139.005C15.7804 139.005 14.3563 132.737 15.0381 130.975C15.7198 129.212 17.7955 128.301 19.6719 128.94C21.5484 129.58 22.5224 131.53 21.8406 133.291Z\" fill=\"black\"/>\n<path id=\"Vector_16\" opacity=\"0.25\" d=\"M32.5475 145.869C31.3355 147.361 24.9463 149.621 24.9463 149.621C24.9463 149.621 25.5956 143.239 26.799 141.75C27.4069 141.027 28.2665 140.559 29.2063 140.439C30.146 140.32 31.0965 140.557 31.8679 141.104C32.2424 141.36 32.5593 141.692 32.7986 142.076C33.038 142.461 33.1945 142.891 33.2584 143.338C33.3222 143.786 33.292 144.242 33.1697 144.678C33.0473 145.114 32.8355 145.519 32.5475 145.869Z\" fill=\"black\"/>\n<path id=\"Vector_17\" opacity=\"0.25\" d=\"M41.1661 159.436C40.2397 161.098 34.3505 164.34 34.3505 164.34C34.3505 164.34 33.8332 157.949 34.7596 156.287C35.6859 154.626 37.8698 153.984 39.6402 154.854C41.4107 155.723 42.0903 157.775 41.1661 159.436Z\" fill=\"black\"/>\n<path id=\"Vector_18\" d=\"M36.3288 171.591C36.3288 171.591 40.5644 156.145 34.4566 145.073C31.894 140.428 30.9049 135.15 31.8226 129.989C32.2632 127.534 32.9409 125.128 33.8463 122.804\" stroke=\"#535461\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n<path id=\"Vector_19\" d=\"M30.0414 115.806C30.1107 117.679 33.9221 122.998 33.9221 122.998C33.9221 122.998 37.3375 117.446 37.2682 115.572C37.1989 113.697 35.5259 112.231 33.5304 112.296C31.5348 112.36 29.97 113.931 30.0414 115.806Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_20\" d=\"M24.4486 126.379C25.5914 127.916 31.868 130.434 31.868 130.434C31.868 130.434 31.5217 124.033 30.379 122.494C29.801 121.748 28.9612 121.248 28.0277 121.091C27.0943 120.935 26.136 121.136 25.3447 121.652C24.9601 121.892 24.6296 122.209 24.3739 122.582C24.1181 122.955 23.9427 123.377 23.8586 123.821C23.7744 124.265 23.7834 124.721 23.885 125.161C23.9865 125.601 24.1784 126.016 24.4486 126.379Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_21\" d=\"M25.3575 144.109C27.1712 144.894 33.9457 144.094 33.9457 144.094C33.9457 144.094 30.2035 138.73 28.3898 137.944C26.576 137.159 24.429 137.901 23.5914 139.604C22.7538 141.306 23.5459 143.323 25.3575 144.109Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_22\" d=\"M29.2643 157.379C30.9113 158.442 37.7312 158.724 37.7312 158.724C37.7312 158.724 35.0085 152.846 33.3635 151.784C32.5708 151.271 31.6122 151.074 30.6798 151.234C29.7474 151.393 28.9101 151.898 28.3357 152.645C28.0659 153.01 27.8751 153.427 27.7754 153.869C27.6757 154.312 27.6693 154.77 27.7566 155.214C27.8438 155.659 28.0228 156.081 28.2823 156.454C28.5418 156.826 28.8762 157.141 29.2643 157.379Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_23\" d=\"M39.4712 130.553C38.0861 131.904 31.4631 133.474 31.4631 133.474C31.4631 133.474 32.8678 127.199 34.2508 125.847C34.9352 125.195 35.8416 124.823 36.7894 124.806C37.7372 124.788 38.6568 125.126 39.3652 125.753C39.7056 126.051 39.9802 126.416 40.1715 126.825C40.3628 127.234 40.4667 127.678 40.4766 128.13C40.4866 128.581 40.4024 129.029 40.2294 129.446C40.0563 129.863 39.7982 130.24 39.4712 130.553Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_24\" d=\"M43.8216 146.126C42.0707 147.027 35.2551 146.664 35.2551 146.664C35.2551 146.664 38.5947 141.067 40.3457 140.172C42.0967 139.276 44.2956 139.873 45.2544 141.517C46.2133 143.162 45.5813 145.224 43.8216 146.126Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_25\" d=\"M45.854 161.808C44.2892 162.975 37.5061 163.698 37.5061 163.698C37.5061 163.698 39.7917 157.656 41.3565 156.49C42.1171 155.928 43.0628 155.673 44.0044 155.775C44.9461 155.876 45.8145 156.328 46.4362 157.038C46.7302 157.382 46.9494 157.783 47.08 158.215C47.2105 158.647 47.2497 159.102 47.195 159.55C47.1403 159.998 46.993 160.43 46.7622 160.819C46.5314 161.207 46.2222 161.544 45.854 161.808Z\" fill=\"#6C63FF\"/>\n<path id=\"Vector_26\" d=\"M149.189 72.415C149.232 72.415 149.267 72.3803 149.267 72.3375C149.267 72.2947 149.232 72.26 149.189 72.26C149.146 72.26 149.111 72.2947 149.111 72.3375C149.111 72.3803 149.146 72.415 149.189 72.415Z\" fill=\"#E6E8EC\"/>\n<path id=\"Vector_27\" d=\"M108.12 46.1463L51.5203 82.6648L88.4572 148.917C88.6298 149.227 88.865 149.498 89.1481 149.713C89.4312 149.928 89.7561 150.082 90.1021 150.166L123.57 158.285C124.143 158.423 124.747 158.361 125.28 158.11C125.813 157.859 126.244 157.434 126.5 156.905L143.101 122.606L161.294 98.4186L118.12 47.6207C116.918 46.2078 115.24 45.2787 113.4 45.0073C111.559 44.736 109.682 45.1409 108.12 46.1463Z\" fill=\"#DCDFED\"/>\n<path id=\"Vector_28\" opacity=\"0.1\" d=\"M161.87 98.705L161.71 98.9203L151.053 113.09L150.86 113.346L143.677 122.896L129.478 152.236L129.08 153.057L127.076 157.196C126.82 157.725 126.388 158.151 125.854 158.402C125.32 158.653 124.715 158.714 124.141 158.575L90.6736 150.452C90.3275 150.369 90.0026 150.214 89.7195 150C89.4363 149.785 89.2011 149.514 89.0287 149.204L85.8103 143.442L85.2324 142.404L62.0024 100.72L61.8033 100.365L52.094 82.9512L53.2671 82.1936L62.1604 76.4573L62.366 76.3238L81.0942 64.24L82.2759 63.478L108.692 46.4327C110.254 45.4254 112.132 45.0192 113.973 45.2902C115.815 45.5613 117.494 46.4909 118.696 47.905L138.391 71.0869L139.257 72.1201L153.553 88.9394L153.63 89.0319L160.818 97.4867L161.723 98.5522L161.87 98.705Z\" fill=\"black\"/>\n<g id=\"Card-Link\">\n  <path id=\"Vector_29\" opacity=\"0.1\" d=\"M153.076 88.7455L151.332 100.799L150.806 104.437L150.505 112.186L150.481 112.791L148.916 153.278C148.901 153.654 148.803 154.022 148.63 154.355C148.456 154.689 148.211 154.981 147.911 155.211C147.612 155.44 147.265 155.601 146.896 155.683C146.527 155.764 146.145 155.764 145.776 155.682L128.907 151.937L128.725 151.896L85.4617 142.294L84.6674 142.118L60.8833 136.836L61.4287 100.433L61.446 99.2172L61.6105 88.1988L61.7923 76.0375L80.5205 63.9536L81.7022 63.1917C99.0734 64.9631 122.176 68.3704 137.826 70.8006L138.692 71.8337L152.977 88.653L153.076 88.7455Z\" fill=\"black\"/>\n<path id=\"Vector_30\" d=\"M155.052 74.4533L152.998 88.6594L151.115 101.669L150.589 105.298L150.288 113.047L148.7 154.139C148.685 154.515 148.587 154.883 148.413 155.216C148.24 155.55 147.994 155.842 147.695 156.072C147.395 156.301 147.049 156.462 146.68 156.544C146.311 156.625 145.928 156.625 145.559 156.543L128.508 152.757L85.2452 143.155L60.6667 137.697L61.2295 100.078L61.394 89.0598L61.5866 76.1709L61.7836 62.914C65.8482 62.7224 72.5361 63.155 80.5204 63.9536C98.398 65.738 122.769 69.3476 138.703 71.8337C148.46 73.3555 155.052 74.4533 155.052 74.4533Z\" fill=\"url(#paint0_linear)\"/>\n<path id=\"link\" d=\"M90.999 85.173L94.4661 87.0741L94.3299 88.2144L89.8331 85.4486L89.9345 84.5992L94.9572 82.9607L94.821 84.1011L90.999 85.173ZM97.0633 89.6869L95.9868 89.5601L97.0537 80.6236L98.1302 80.7504L97.0633 89.6869ZM99.9612 90.0283L98.8847 89.9015L99.6363 83.6064L100.713 83.7332L99.9612 90.0283ZM99.7483 81.9263C99.7692 81.7518 99.8391 81.6105 99.9582 81.5026C100.081 81.3952 100.247 81.3538 100.457 81.3785C100.666 81.4032 100.818 81.482 100.913 81.6151C101.007 81.7481 101.044 81.9019 101.023 82.0764C101.002 82.251 100.93 82.39 100.808 82.4936C100.685 82.5972 100.519 82.6366 100.31 82.6119C100.1 82.5872 99.9481 82.5103 99.8534 82.3812C99.7625 82.2525 99.7275 82.1008 99.7483 81.9263ZM103.459 84.0568L103.4 84.8521C103.953 84.3037 104.618 84.0752 105.394 84.1666C106.724 84.3234 107.306 85.153 107.138 86.6554L106.642 90.8153L105.565 90.6885L106.062 86.5228C106.113 86.0685 106.048 85.7206 105.868 85.4792C105.693 85.2382 105.389 85.0924 104.959 85.0417C104.61 85.0005 104.292 85.0575 104.006 85.2126C103.72 85.3677 103.485 85.5879 103.302 85.873L102.766 90.3587L101.69 90.2319L102.441 83.9368L103.459 84.0568ZM110.371 88.2987L109.611 88.9232L109.347 91.1341L108.271 91.0072L109.338 82.0707L110.414 82.1975L109.769 87.6025L110.428 86.978L112.636 85.1378L113.946 85.2921L111.182 87.6332L113.479 91.6208L112.216 91.472L110.371 88.2987ZM118.568 88.3854L114.902 86.4254L115.034 85.32L119.741 88.1046L119.639 88.9541L114.407 90.5737L114.54 89.4566L118.568 88.3854Z\" fill=\"white\"/>\n</g>\n<path id=\"Vector_31\" opacity=\"0.1\" d=\"M160.264 97.2004L151.115 101.662L104.424 124.435L61.3941 89.0684L52.6955 81.9072L51.5225 82.6649L61.2318 100.078L60.669 137.697L85.2475 143.155L88.4594 148.917C88.6317 149.227 88.8669 149.498 89.1501 149.713C89.4332 149.928 89.7581 150.082 90.1043 150.166L123.572 158.285C124.145 158.422 124.748 158.36 125.281 158.109C125.814 157.858 126.244 157.433 126.5 156.905L128.504 152.766L145.555 156.552C145.924 156.634 146.307 156.634 146.676 156.552C147.045 156.471 147.391 156.31 147.691 156.08C147.99 155.851 148.235 155.559 148.409 155.225C148.583 154.891 148.68 154.523 148.696 154.148L150.284 113.055L161.134 98.6339L161.164 98.2702L160.264 97.2004Z\" fill=\"black\"/>\n<path id=\"Vector_32\" d=\"M51.5204 82.6648L47.6614 148.386C47.6257 148.994 47.8088 149.595 48.178 150.081C48.5472 150.567 49.0783 150.907 49.6764 151.04L152.163 173.673C152.522 173.751 152.894 173.752 153.254 173.675C153.614 173.599 153.953 173.447 154.249 173.229C154.544 173.012 154.79 172.734 154.969 172.414C155.148 172.095 155.256 171.741 155.286 171.376L161.292 98.4186L104.424 126.157L51.5204 82.6648Z\" fill=\"#DCDFED\"/>\n<path id=\"Vector_33\" opacity=\"0.1\" d=\"M48.367 149.89L101.61 117.222C102.398 116.747 103.33 116.564 104.241 116.706C105.152 116.847 105.984 117.305 106.588 117.997L154.243 173.27C154.416 173.468 154.5 173.326 154.243 173.27L48.367 149.89C48.0639 149.823 48.1029 150.047 48.367 149.89Z\" fill=\"black\"/>\n<path id=\"Vector_34\" d=\"M48.7479 149.836L101.441 118.18C102.274 117.68 103.258 117.488 104.22 117.639C105.181 117.789 106.058 118.272 106.696 119.003L153.92 173.014C153.999 173.104 154.046 173.216 154.057 173.334C154.067 173.453 154.04 173.571 153.979 173.674C153.918 173.776 153.826 173.856 153.717 173.904C153.607 173.951 153.485 173.963 153.369 173.937L48.9189 150.872C48.8077 150.848 48.7063 150.791 48.6278 150.709C48.5494 150.627 48.4976 150.524 48.4792 150.412C48.4607 150.3 48.4765 150.186 48.5244 150.083C48.5724 149.98 48.6502 149.895 48.7479 149.836Z\" fill=\"#E3E5F1\"/>\n</g>\n<defs>\n<linearGradient id=\"paint0_linear\" x1=\"107.859\" y1=\"62.8689\" x2=\"107.859\" y2=\"156.605\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#2D9CDB\"/>\n<stop offset=\"1\" stop-color=\"#095783\"/>\n</linearGradient>\n<clipPath id=\"clip0\">\n<rect width=\"224\" height=\"179\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>\n",
                styles: ["@-webkit-keyframes open{0%{opacity:.2;-webkit-transform:translateY(10%);transform:translateY(10%)}70%{opacity:.9;-webkit-transform:translateY(-3%);transform:translateY(-3%)}100%{opacity:1;-webkit-transform:none;transform:none}}@keyframes open{0%{opacity:.2;-webkit-transform:translateY(10%);transform:translateY(10%)}70%{opacity:.9;-webkit-transform:translateY(-3%);transform:translateY(-3%)}100%{opacity:1;-webkit-transform:none;transform:none}}#Card-Link{-webkit-animation-name:open;animation-name:open;-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-iteration-count:1;animation-iteration-count:1;overflow:hidden}"]
            }),
            __metadata("design:paramtypes", [])
        ], EmailSentSVGComponent);
        return EmailSentSVGComponent;
    }());

    var RangeDatePipe = /** @class */ (function () {
        function RangeDatePipe() {
            var _this = this;
            this.days = { 'SU': 'Sun', 'MO': 'Mon', 'TU': 'Tue', 'WE': 'Wed', 'TH': 'Thu', 'FR': 'Fri', 'SA': 'Sat' };
            this.transform = function (rangeDates, isRecurrent, args) {
                if (rangeDates) {
                    // for Recurring events
                    if (isRecurrent && args['startTime'] != undefined) {
                        var startTime = args['startTime'];
                        var freq = args['recurrenceRuleArray'][0].split(';')[0].split('=')[1];
                        var freqLabel = 'Daily';
                        if (freq.toLowerCase() == 'Weekly'.toLowerCase()) {
                            var byDays = args['recurrenceRuleArray'][0].split(';')[2].split('=')[1].split(',');
                            if (byDays.length > 2) {
                                freqLabel = 'Multiple Dates';
                            }
                            else {
                                freqLabel = 'Every ';
                                for (var index = 0; index < byDays.length; index++) {
                                    freqLabel += _this.days[byDays[index]];
                                    if (index < (byDays.length - 1)) {
                                        freqLabel += ', ';
                                    }
                                }
                            }
                        }
                        return freqLabel + ' | ' + startTime;
                    }
                    else {
                        // for other events or fallback 
                        var date = rangeDates.map(function (d) { return luxon.DateTime.fromISO(d).toFormat('dd'); });
                        var month = rangeDates.map(function (d) { return luxon.DateTime.fromISO(d).toFormat('MMM'); });
                        var year = rangeDates.map(function (d) { return luxon.DateTime.fromISO(d).toFormat('yy'); });
                        var time = luxon.DateTime.fromISO(rangeDates[0]).toFormat('hh:mm a');
                        if (year[0] !== year[1]) {
                            return month[0] + ' ' + date[0] + '\'' + year[0] + ' - ' + month[1] + ' ' + date[1] + '\'' + year[1] + ' | ' + time;
                        }
                        else {
                            if ((date[0] === date[1]) && (month[0] === month[1])) {
                                return month[0] + ' ' + date[0] + ' | ' + time;
                            }
                            else if ((month[0] !== month[1])) {
                                return month[0] + ' ' + date[0] + ' - ' + month[1] + ' ' + date[1] + ' | ' + time;
                            }
                            else {
                                return month[0] + ' ' + date[0] + ' - ' + date[1] + ' | ' + time;
                            }
                        }
                    }
                }
                else {
                    return null;
                }
            };
        }
        RangeDatePipe = __decorate([
            core.Pipe({
                name: 'dateRange'
            })
        ], RangeDatePipe);
        return RangeDatePipe;
    }());

    var clampLib = clampLibImported;
    // tslint:disable-next-line: directive-selector
    var TextOverflowClampDirective = /** @class */ (function () {
        function TextOverflowClampDirective(el) {
            this.el = el;
        }
        TextOverflowClampDirective.prototype.ngAfterViewInit = function () {
            clampLib(this.el.nativeElement, this.lines);
        };
        __decorate([
            core.Input('clamp'),
            __metadata("design:type", Number)
        ], TextOverflowClampDirective.prototype, "lines", void 0);
        TextOverflowClampDirective = __decorate([
            core.Directive({ selector: '[clamp]' }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], TextOverflowClampDirective);
        return TextOverflowClampDirective;
    }());

    var ShareEventModalComponent = /** @class */ (function () {
        function ShareEventModalComponent(dialogRef, data) {
            var _this = this;
            this.dialogRef = dialogRef;
            this.data = data;
            this.shareLink = {};
            this.baseUrl = config.baseUrl;
            this.copied = false;
            this.close = function () {
                _this.dialogRef.close();
            };
            this.copyLink = function () {
                var copyText = document.getElementById('event_link');
                copyText.select();
                copyText.setSelectionRange(0, 99999);
                document.execCommand('copy');
                _this.copied = true;
                setTimeout(function () {
                    _this.copied = false;
                }, 1000000);
            };
        }
        ShareEventModalComponent.prototype.ngOnInit = function () {
            this.event = this.data.event;
            this.eventURL = 'https://www.townscript.com/e/' + this.event.shortName;
            this.eventName = this.event.name;
            this.shareLink.fb = 'https://www.facebook.com/sharer/sharer.php?s=100' +
                '&p[url]=' + config.baseUrl + 'e/' + this.event.shortName +
                '&p[images][0]=' + config.baseUrl + 'dashboard/images/organizer_login_files/logoforfb.png' +
                '&p[title]=' + this.eventName +
                '&p[summary]=' + 'by townscript.com';
            this.shareLink.twitter = 'https://twitter.com/share' +
                '?url=' + config.baseUrl + 'e/' + this.event.shortName +
                '&text=' + this.eventName + ' is now live on Townscript!';
            this.shareLink.linkedin = 'https://www.linkedin.com/shareArticle?mini=true' +
                '&url=' + config.baseUrl + 'e/' + this.event.shortName +
                '&title=' + this.eventName;
            this.shareLink.whatsapp = 'https://web.whatsapp.com/send?' +
                'text=' + config.baseUrl + 'e/' + this.event.shortName;
        };
        ShareEventModalComponent = __decorate([
            core.Component({
                selector: 'app-share-event-modal',
                template: "<div class=\"share-event-modal-container\">\n    <div class=\"flex items-center text-lg text-gray-800 justify-between\">\n        <h2 class=\"w-full text-center\">Share Event</h2>\n        <div class=\"rounded-full\" matRipple (click)=\"close()\">\n            <i class=\"mdi mdi-close text-2xl cursor-pointer rounded-full\"></i>\n        </div>\n    </div>\n    <div class=\"px-2 py-2\">\n        <div class=\"platforms flex flex-wrap items-center\">\n            <a>\n                <div (click)=\"copyLink()\" class=\"platform text-center cursor-pointer p-2 pr-4 flex-1\">\n                    <i class=\"mdi mdi-content-copy block text-4xl text-gray-700\" [class.text-purple-800]=\"copied\"></i>\n                    <span class=\"text-gray-900 text-sm block\" *ngIf=\"!copied\">Copy Link</span>\n                    <span class=\"text-purple-800 text-sm block\" *ngIf=\"copied\">Copied!</span>\n                    <input type=\"text\" class=\"hidden\" id=\"event_link\" [value]=\"baseUrl+'e/' + event.shortName\" />\n                </div>\n            </a>\n            <a [href]=\"shareLink?.whatsapp\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-whatsapp block text-4xl whatsapp\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Whatsapp</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.fb\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-facebook block text-4xl facebook\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Facebook</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.twitter\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-twitter block text-4xl twitter\"></i>\n                    <span class=\"text-gray-700 text-sm block\">Twitter</span>\n                </div>\n            </a>\n            <a [href]=\"shareLink?.linkedin\" target=\"_blank\">\n                <div class=\"platform text-center cursor-pointer py-2 px-4 flex-1\">\n                    <i class=\"mdi mdi-linkedin block text-4xl linkedin\"></i>\n                    <span class=\"text-gray-700 text-sm block\">LinkedIn</span>\n                </div>\n            </a>\n        </div>\n    </div>\n</div>",
                styles: [".share-event-modal-container .platform{-webkit-transition:.15s;transition:.15s}.share-event-modal-container .platform:hover{background:#fcfcfc;-webkit-transform:translateY(-5px);transform:translateY(-5px)}.share-event-modal-container .whatsapp{color:#64bf56}.share-event-modal-container .facebook{color:#4267b2}.share-event-modal-container .twitter{color:#3aa1f2}.share-event-modal-container .linkedin{color:#2977b5}"]
            }),
            __param(1, core.Inject(material.MAT_DIALOG_DATA)),
            __metadata("design:paramtypes", [material.MatDialogRef, Object])
        ], ShareEventModalComponent);
        return ShareEventModalComponent;
    }());

    var TsCardSkeletonComponent = /** @class */ (function () {
        function TsCardSkeletonComponent() {
            this.gridType = 'list';
        }
        TsCardSkeletonComponent.prototype.ngOnInit = function () {
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsCardSkeletonComponent.prototype, "gridType", void 0);
        TsCardSkeletonComponent = __decorate([
            core.Component({
                selector: 'ts-card-skeleton',
                template: "<div class=\"w-full flex\">\n    <div class=\"w-full\">\n        <div class=\"bg-white border border-gray-300 card flex flex-col  overflow-hidden rounded translate-3d-none-after w-full\"\n            [ngClass]=\"{'md:flex-row': gridType=='list'}\">\n            <div class=\"w-full relative p-24 text-primary-500\"\n                [ngClass]=\"{'lg:w-2/3 md:w-2/3 md:p-0': gridType=='list'}\">\n                <div class=\"absolute top-0 left-0 h-full w-full\">\n                    <span class=\"skeleton-box group-hover:scale-110 transition-transform transform-center block h-full\">\n                    </span>\n                </div>\n            </div>\n            <div class=\"flex flex-col flex-grow w-full\">\n                <div class=\"pl-4 pr-4 pt-4 mb-4 text-left relative flex-grow\">\n                    <h3 class=\"text-lg font-bold text-gray-darkest mr-10\">\n                        <span class=\"skeleton-box h-5 w-1/6 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-1/2 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-2/4 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-2/5 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-2/3 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-3/4 inline-block\"></span>\n                    </h3>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                styles: [".skeleton-box{position:relative;overflow:hidden;background-color:#e2e8f0}.skeleton-box::after{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);background-image:-webkit-gradient(linear,left top,right top,color-stop(0,rgba(255,255,255,0)),color-stop(20%,rgba(255,255,255,.2)),color-stop(60%,rgba(255,255,255,.5)),to(rgba(255,255,255,0)));background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0));-webkit-animation:1.5s infinite shimmer;animation:1.5s infinite shimmer;content:''}@-webkit-keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}"]
            }),
            __metadata("design:paramtypes", [])
        ], TsCardSkeletonComponent);
        return TsCardSkeletonComponent;
    }());

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
            this.placeService.place.pipe(operators.take(1)).subscribe(function (res) {
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
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsListingCardComponent.prototype, "eventData", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsListingCardComponent.prototype, "type", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsListingCardComponent.prototype, "topicData", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], TsListingCardComponent.prototype, "gridType", void 0);
        TsListingCardComponent = __decorate([
            core.Component({
                selector: 'ts-listing-card',
                template: "<div class=\"listing-container cursor-pointer\"\n    [ngClass]=\"gridType=='list' ? 'rounded  my-4 mx-auto  flex' :'bg-white lg:flex lg:flex-col my-1 rounded w-full'\">\n    <div class=\"relative flex-none overflow-hidden text-center event-image\"\n        [ngClass]=\"gridType=='list' ? 'h-auto w-4/12 lg:w-2/5' : ' h-48 lg:h-auto lg:w-3/5 lg:w-full md:w-full p-24 sm:w-full '\"\n        [style.background-image]=\"eventData.cardImageUrl?'url(' + eventData.cardImageUrl + ')':'url(' + defaultCardImageUrl + ')'\">\n        <i class=\"top-0 right-0 pt-2 pr-2 text-white absolute mdi mdi-checkbox-marked-circle ml-1 pt-1 text-lg\"\n          *ngIf=\"eventData.organizerIsTrusted\"\n          matTooltip=\"VERIFIED\"\n          matTooltipPosition=\"above\"\n          matTooltipClass=\"ts-card-tooltip\"></i>\n    </div>\n    <div class=\"flex flex-col justify-between leading-normal listing-container--content\" [ngClass]=\"gridType=='list' ?' w-8/12  md:w-full'\n                     : ' w-full'\">\n        <div class=\"px-2 md:px-4 pt-3 pb-1\">\n            <div class=\"flex flex-row justify-between align-items-center\">\n                <span *ngIf=\"urgencyMessage \" class=\"text-md bg-orange-500 rounded text-md px-2 mr-2\">Featured</span>\n                <span *ngIf=\"urgencyMessage\" class=\"text-xs text-red-400\">Booked 20 times in the last 24 hrs</span>\n                <span *ngIf=\"urgencyMessage\" class=\"bg-white rounded-l-full px-2\">\n                    <i class=\"material-icons align-bottom pr-1 hidden\">remove_red_eye</i>\n                    <strong class=\"text-xs\">12 Viewing right now</strong>\n                </span>\n            </div>\n            <div class=\"font-303030 capitalize text-base md:text-xl mb-1\" [clamp]=\"2\">{{eventData.name | titlecase}}\n            </div>\n            <div class=\"md:flex text-xs \">\n                <div class=\"mr-2 flex items-center\">\n                    <i class=\"mdi mdi-calendar-today text-base md:text-xl pr-1  align-bottom\"></i>\n                    <span\n                        class=\"text-gray-700 font-bold\">{{[eventData.startTime, eventData.endTime] | dateRange: eventData.recurrent: {'startTime': eventData.recurrenceStartTime,'endTime': eventData.recurrenceEndTime,'recurrenceRuleArray': eventData.recurrenceRuleArray} }}</span>\n                </div>\n                <div class=\"mr-2 flex items-center\">\n                    <i class=\"mdi mdi-map-marker pr-1 text-base md:text-xl  align-bottom\"></i>\n                    <span class=\"text-gray-700 font-bold\">{{eventData.city}}</span>\n                </div>\n                <div *ngIf=\"goingCounter\" class=\"mr-2\">\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <span class=\"font-323E48 font-bold\">700</span>\n                </div>\n            </div>\n            <!-- <div *ngIf=\"featuredCard\" class=\"text-sm\">Heres goes some 2 line data which describes about the event.</div> -->\n            <div class=\"py-2 pr-2 flex justify-between\">\n                <div *ngIf=\"moreIcons\" id=\"set-of-icons\" class=\"flex\">\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                    <i class=\"material-icons pr-1  align-bottom text-purple-900\">supervisor_account</i>\n                </div>\n                <div [ngClass]=\"gridType=='list' ? 'hidden md:flex' : 'flex'\">\n                    <span class=\"pr-2 text-gray-600 font-normal text-sm sm:text-xs hover:text-gray-900 hover:underline\"\n                        *ngFor=\"let key of eventData.keywords\"\n                        (click)=\"navigateToListing(key.topicKeywordCode)\">#{{key.topicKeywordName}}</span>\n                </div>\n            </div>\n        </div>\n        <div\n            class=\"h-10 bottom-purple-bar border-t border-gray-300 flex items-center justify-between py-2 px-4 sm:rounded-b-lg lg:rounded-none\">\n            <div class=\"text-sm flex items-center\">\n                <app-follow type=\"icon\" [followTypeId]=\"eventData.id\" [followType]=\"'EVENT'\" color=\"#553c9a\"\n                    (click)=\"$event.stopPropagation()\"></app-follow>\n                <!-- <i class=\"mdi mdi-heart-outline text-2xl mr-2\"></i> -->\n                <div class=\"px-2 rounded-full\" matRipple>\n                    <i class=\"mdi mdi-share-variant text-2xl share\" (click)=\"shareEvent();$event.stopPropagation()\"></i>\n                </div>\n            </div>\n            <div class=\"flex items-center\">\n                <span class=\"align-text-bottom price-container font-323E48 text-base font-semibold\"\n                    *ngIf=\"eventData.minimumTicketPrice\">\n                    {{eventData.minimumTicketPrice | currency:eventData.minimumTicketPriceCurrency}} <span\n                        class=\"hidden md:inline text-sm font-normal\">onwards</span></span>\n                <span *ngIf=\"!eventData.minimumTicketPrice \">Free</span>\n                <i class=\"mdi mdi-arrow-right text-2xl ml-2\"></i>\n            </div>\n        </div>\n    </div>\n</div>\n",
                styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}::ng-deep .ts-card-tooltip{background-color:#666;color:#fff;font-size:12px;opacity:.98;white-space:pre-line}.listing-container{border:1px solid rgba(0,0,0,.13);border-radius:5px;font-family:Lato,sans-serif}.listing-container:hover{box-shadow:0 2px 8px 0 rgba(0,0,0,.2)}.listing-container:hover .bottom-purple-bar{box-shadow:0 2px 8px 0 rgba(0,0,0,.2);background:linear-gradient(138.55deg,#a165c4 0,#4d2370 100%);border-radius:0 0 4px;-webkit-transition:1.3s;transition:1.3s}.listing-container:hover .bottom-purple-bar i,.listing-container:hover .bottom-purple-bar span{color:#fff!important}.listing-container .event-image{background-size:100% 100%}.listing-container .font-323E48{color:#323e48}.listing-container .font-303030{color:#303030}.listing-container .listing-container--content{background-color:#eee}.listing-container .listing-container--content .bottom-purple-bar{-webkit-transition:background 1s ease-out;transition:background 1s ease-out}.listing-container .listing-container--content .price-container{font-size:15px}.listing-container .listing-container--featured-content{background-color:#fff}.listing-container .listing-container--featured-content .bottom-purple-bar{-webkit-transition:1s ease-in;transition:1s ease-in}.listing-container .listing-container--featured-content .price-container{font-size:15px}.listing-container i{color:#683592}.listing-container .share:hover{-webkit-transition:.15s;transition:.15s;font-size:1.875rem}:host ::ng-deep .listing-container:hover .bottom-purple-bar i{color:#fff}@media (min-width:991px){.listing-container .listing-container--content{min-height:195px}}.topic-container{font-family:Lato;min-height:460px}.topic-container .subTitle{color:#263240}.topic-container .keywords,.topic-container i{color:#683592}.topic-container .keywords span{border:1.57px solid #683592}"]
            }),
            __metadata("design:paramtypes", [material.MatDialog, BrowserService, PlaceService])
        ], TsListingCardComponent);
        return TsListingCardComponent;
    }());

    var FollowComponent = /** @class */ (function () {
        function FollowComponent(userService, followService, dialog) {
            var _this = this;
            this.userService = userService;
            this.followService = followService;
            this.dialog = dialog;
            this.text = 'Follow';
            this.followedText = 'Following';
            this.type = 'button';
            this.color = '#683592';
            this.loggedIn = false;
            this.followed = false;
            this.checkFollowStatus = function () {
                if (!_this.followTypeId || !_this.followType) {
                    return;
                }
                _this.followService.followData.subscribe(function (res) {
                    if (res) {
                        _this.allFollowData = res;
                        _this.followed = _this.allFollowData.map(function (ele) { return ele.typeId; }).indexOf(_this.followTypeId) > -1;
                        var currentFollowed = _this.allFollowData.filter(function (ele) { return ele.typeId === _this.followTypeId && ele.type === _this.followType; });
                        if (currentFollowed && currentFollowed.length > 0) {
                            _this.currentId = currentFollowed[0].id;
                        }
                        if (_this.followed) {
                            _this.text = _this.followedText;
                        }
                    }
                });
            };
            this.openLogin = function () {
                var dialogConfig = new material.MatDialogConfig();
                dialogConfig.disableClose = false;
                dialogConfig.autoFocus = true;
                dialogConfig.backdropClass = 'mat-dialog-bkg-container';
                _this.dialog.open(LoginModalComponent, dialogConfig);
            };
            this.followedFn = function ($event) {
                $event.stopPropagation();
                if (!_this.loggedIn) {
                    _this.openLogin();
                    return;
                }
                if (!_this.followed) {
                    _this.followService.createFollowData(_this.followType, _this.followTypeId, _this.user.userId).subscribe(function (res) {
                        _this.followed = true;
                        _this.text = _this.followedText;
                        _this.followService.getFollowData(_this.user.userId);
                    });
                }
                else {
                    _this.followService.unfollow(_this.currentId).subscribe(function (res) {
                        _this.followed = false;
                        _this.text = _this.textCopy;
                        _this.followService.getFollowData(_this.user.userId);
                    });
                }
            };
        }
        FollowComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.textCopy = JSON.parse(JSON.stringify(this.text));
            this.userService.user.subscribe(function (data) {
                _this.user = data;
                if (_this.user && _this.user.userId) {
                    _this.loggedIn = true;
                    _this.checkFollowStatus();
                }
                else {
                    _this.loggedIn = false;
                }
            });
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FollowComponent.prototype, "text", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FollowComponent.prototype, "followedText", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FollowComponent.prototype, "type", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FollowComponent.prototype, "color", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FollowComponent.prototype, "followTypeId", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], FollowComponent.prototype, "followType", void 0);
        FollowComponent = __decorate([
            core.Component({
                selector: 'app-follow',
                template: "<div class=\"follow-container rounded-full cursor-pointer\" [class.flex]=\"type=='icon'\" (click)=\"followedFn($event)\"\n    (mouseover)=\"hovered=true\" (mouseleave)=\"hovered=false\" [class.followed]=\"followed\">\n    <div [style.background-color]=\"hovered && type=='button' ? color : 'transparent'\"\n        [style.border-color]=\"type=='button' ? color : 'transparent'\" [class.rounded-full]=\"type=='button'\"\n        class=\"text-sm flex items-center justify-around antialiased font-bold border-purple-800\"\n        [style.color]=\"hovered && type=='button'?'white':color\" [ngClass]=\"{'py-2 px-4 border-2':type=='button'}\">\n        <span class=\"text-sm mr-1\" *ngIf=\"type=='button'\">{{text}}</span>\n        <i class=\"mdi mdi-heart-outline text-base antialiased\" [class.text-2xl]=\"type=='icon'\" *ngIf=\"!followed\"></i>\n        <i class=\"mdi mdi-heart text-base antialiased followed-heart\" [class.text-2xl]=\"type=='icon'\"\n            *ngIf=\"followed\"></i>\n    </div>\n</div>",
                styles: [".follow-container{max-width:12rem;text-align:center;-webkit-transition:.1s;transition:.1s}.follow-container div{-webkit-transition:.1s;transition:.1s}.follow-container div:active{-webkit-transform:scale(.9);transform:scale(.9)}.follow-container:hover{-webkit-transform:scale(1.1);transform:scale(1.1)}@-webkit-keyframes dhadkan{0%{-webkit-transform:scale(.7);transform:scale(.7)}50%{-webkit-transform:scale(1.3);transform:scale(1.3)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes dhadkan{0%{-webkit-transform:scale(.7);transform:scale(.7)}50%{-webkit-transform:scale(1.3);transform:scale(1.3)}100%{-webkit-transform:scale(1);transform:scale(1)}}.follow-container.followed{-webkit-animation-name:dhadkan;animation-name:dhadkan;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:.2s;animation-duration:.2s}.follow-container .followed-heart{color:#eb4b4b}.follow-container div:hover{color:#c2b5b5}"]
            }),
            __metadata("design:paramtypes", [UserService, FollowService, material.MatDialog])
        ], FollowComponent);
        return FollowComponent;
    }());

    var TsLoginSignupModule = /** @class */ (function () {
        function TsLoginSignupModule() {
        }
        TsLoginSignupModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    elements.TsFormsModule,
                    forms.ReactiveFormsModule,
                    ngRecaptcha.RecaptchaModule,
                    http.HttpClientModule,
                    material.MatRippleModule,
                    material.MatSnackBarModule,
                    material.MatInputModule,
                    material.MatTooltipModule,
                    material.MatProgressSpinnerModule
                ],
                declarations: [
                    TsLoginSignupComponent,
                    LoginModalComponent,
                    EmailSentSVGComponent
                ],
                exports: [
                    TsLoginSignupComponent,
                    LoginModalComponent,
                    EmailSentSVGComponent
                ],
                providers: [
                    CookieService,
                    UserService,
                    NotificationService,
                    TsLoginSignupService
                ]
            })
        ], TsLoginSignupModule);
        return TsLoginSignupModule;
    }());

    var LayoutModule = /** @class */ (function () {
        function LayoutModule() {
        }
        LayoutModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    forms.FormsModule,
                    http.HttpClientModule,
                    core$1.MatRippleModule,
                    snackBar.MatSnackBarModule,
                    TsLoginSignupModule,
                    elements.TsFormsModule
                ],
                declarations: [
                    TsHeaderComponent,
                    TsFooterComponent,
                    SearchComponent,
                    CitySearchPopupComponent,
                    UserMenuComponent
                ],
                exports: [
                    TsHeaderComponent,
                    TsFooterComponent,
                    SearchComponent,
                    CitySearchPopupComponent,
                    UserMenuComponent
                ],
                providers: [
                    TimeService,
                    common.DatePipe,
                    HeaderService,
                    BrowserService,
                    UserService,
                    FooterService
                ]
            })
        ], LayoutModule);
        return LayoutModule;
    }());

    var SharedModule = /** @class */ (function () {
        function SharedModule() {
        }
        SharedModule = __decorate([
            core.NgModule({
                declarations: [
                    RangeDatePipe,
                    FollowComponent,
                    TextOverflowClampDirective
                ],
                imports: [
                    common.CommonModule
                ],
                exports: [
                    FollowComponent,
                    RangeDatePipe,
                    TextOverflowClampDirective
                ],
                providers: [TimeService, UserService, FollowService]
            })
        ], SharedModule);
        return SharedModule;
    }());

    var CardsModule = /** @class */ (function () {
        function CardsModule() {
        }
        CardsModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    elements.TsFormsModule,
                    SharedModule,
                    material.MatTooltipModule,
                ],
                declarations: [
                    TsListingCardComponent,
                    ShareEventModalComponent,
                    TsCardSkeletonComponent
                ],
                exports: [
                    elements.TsFormsModule,
                    TsListingCardComponent,
                    ShareEventModalComponent,
                    TsCardSkeletonComponent
                ],
                entryComponents: [
                    ShareEventModalComponent
                ],
                providers: [
                    BrowserService
                ]
            })
        ], CardsModule);
        return CardsModule;
    }());

    exports.BrowserService = BrowserService;
    exports.CardsModule = CardsModule;
    exports.CitySearchPopupComponent = CitySearchPopupComponent;
    exports.CookieService = CookieService;
    exports.EmailSentSVGComponent = EmailSentSVGComponent;
    exports.FollowComponent = FollowComponent;
    exports.FollowService = FollowService;
    exports.HeaderService = HeaderService;
    exports.LayoutModule = LayoutModule;
    exports.LoginModalComponent = LoginModalComponent;
    exports.NotificationService = NotificationService;
    exports.PlaceService = PlaceService;
    exports.RangeDatePipe = RangeDatePipe;
    exports.SearchComponent = SearchComponent;
    exports.ShareEventModalComponent = ShareEventModalComponent;
    exports.SharedModule = SharedModule;
    exports.TextOverflowClampDirective = TextOverflowClampDirective;
    exports.TimeService = TimeService;
    exports.TsCardSkeletonComponent = TsCardSkeletonComponent;
    exports.TsFooterComponent = TsFooterComponent;
    exports.TsHeaderComponent = TsHeaderComponent;
    exports.TsListingCardComponent = TsListingCardComponent;
    exports.TsLoginSignupComponent = TsLoginSignupComponent;
    exports.TsLoginSignupModule = TsLoginSignupModule;
    exports.TsLoginSignupService = TsLoginSignupService;
    exports.UserMenuComponent = UserMenuComponent;
    exports.UserService = UserService;
    exports.config = config;
    exports.ɵa = FooterService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=townscript-components.umd.js.map
