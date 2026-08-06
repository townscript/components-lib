import { __assign, __awaiter, __decorate, __generator } from "tslib";
import { Component, ViewChild, EventEmitter, Output, Input, ViewEncapsulation } from '@angular/core';
import { config } from '../../../core/app-config';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import { CookieService } from '../../../core/cookie.service';
import { UserService } from '../../../shared/services/user-service';
import { NotificationService } from '../../../shared/services/notification.service';
import { TsLoginSignupService } from './ts-login-signup.service';
import { PlaceService } from '../../layout/components/ts-header/place.service';
import { UtilityService } from '../../../shared/services/utilities.service';
import { ActivatedRoute } from '@angular/router';
var emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
var TsLoginSignupComponent = /** @class */ (function () {
    function TsLoginSignupComponent(utilityService, cookieService, userService, notificationService, tsLoginSignupService, placeService, activatedRoute) {
        var _this_1 = this;
        this.utilityService = utilityService;
        this.cookieService = cookieService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.tsLoginSignupService = tsLoginSignupService;
        this.placeService = placeService;
        this.activatedRoute = activatedRoute;
        this.defaultHeader = 'Let\'s get started';
        this.defaultSubHeader = 'Your one stop tool for organizing events';
        this.showSocial = true;
        this.closeDialog = new EventEmitter();
        this.captchaToken = this.tsLoginSignupService.CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY;
        this.show = false;
        this.showPassword = false;
        this.isDefaultView = true;
        this.isSignInView = false;
        this.isSignUpView = false;
        this.isVerifyEmailView = false;
        this.showResetPassword = false;
        this.userTimezone = DateTime.local().zoneName;
        this.correctPhoneNumber = null;
        this.phoneError = false;
        this.socialLoginMsg = false;
        this.signInErrMessage = '';
        this.resetPwdLinkSent = false;
        this.signUpErrMessage = '';
        this.registrationClosedMsg = false;
        this.registrationClosedMessage = 'New account registration is closed. Townhall services are being discontinued.';
        this.fbLoginURL = config.baseUrl + 'api/'
            + 'user/signinwithfacebook';
        this.googleLoginURL = config.baseUrl + 'api/'
            + 'user/signinwithgoogle';
        this.showLoader = false;
        this.countryCode = 'IN';
        this.showConfirmation = false;
        this.baseUrl = this.tsLoginSignupService.baseUrl;
        this.initForm = function () {
            _this_1.loginForm = new FormGroup({
                'fullName': new FormControl('', { validators: Validators.required }),
                'email': new FormControl('', { validators: [Validators.required, Validators.pattern(emailRegex)] }),
                'password': new FormControl('', { validators: Validators.required }),
                'phoneNumber': new FormControl('', { validators: Validators.required })
            });
            _this_1.loginForm.get('fullName').disable();
            _this_1.loginForm.get('password').disable();
            _this_1.loginForm.get('phoneNumber').disable();
        };
        this.close = function (signedIn) {
            _this_1.closeDialog.emit(signedIn);
        };
        this.clearErrors = function () {
            _this_1.socialLoginMsg = '';
            _this_1.registrationClosedMsg = false;
        };
        this.resolve = function (captchaResponse) {
            _this_1.captchaResponse = captchaResponse;
        };
        this.password = function () {
            _this_1.show = !_this_1.show;
        };
        this.verifyEmail = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var result, newData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showLoader = true;
                        if (!this.loginForm.controls.email.valid) {
                            this.showLoader = false;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.tsLoginSignupService.getUserSignUpDetails(this.loginForm.value.email)];
                    case 1:
                        result = _a.sent();
                        newData = result;
                        try {
                            this.showLoader = false;
                            newData = JSON.parse(result.data);
                        }
                        catch (e) {
                            console.log("Exception while parsing api response : " + result);
                        }
                        if (newData && newData.isExistingUser && newData.isManualSignup && !newData.isTemporaryUser) {
                            this.openSignInView();
                        }
                        else if (newData && newData.isExistingUser && !newData.isManualSignup && !newData.isTemporaryUser) {
                            this.socialLoginMsg = true;
                        }
                        else {
                            // no real account exists for this email (or it's only a temp/shadow account) ->
                            // registration is closed, don't send them into the sign-up form
                            this.registrationClosedMsg = true;
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
                preferredCountries: ["in", "id", "sg", "my"],
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
            var retData, tokenData, userData, isOrganizer;
            var _this_1 = this;
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
                        this.showConfirmation = true;
                        tokenData = {
                            token: (retData.data)
                        };
                        userData = __assign(__assign({}, retData.userDetails), tokenData);
                        this.userName = userData.user;
                        isOrganizer = userData.isOrganizer;
                        console.log(this.userName);
                        this.userService.updateUser(userData);
                        // this.cookieService.setCookie('townscript-user', JSON.stringify(userData), 90);
                        setTimeout(function () {
                            if (_this_1.mode === 'dialog') {
                                _this_1.close(true);
                            }
                            // no redirection needed ,in case of follow
                            if (_this_1.source != 'follow') {
                                if (_this_1.rdurl != undefined) {
                                    window.open(_this_1.rdurl, '_self');
                                    return;
                                }
                                if (isOrganizer) {
                                    window.open('/dashboard', '_self');
                                    return;
                                }
                            }
                        }, 1400);
                        return [2 /*return*/];
                }
            });
        }); };
        this.signUp = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var self, input, iti, data, _this_2;
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
                        return [4 /*yield*/, this.tsLoginSignupService.registerWithTownscriptWithCaptcha(this.getFormDataForRegister())];
                    case 1:
                        data = _a.sent();
                        try {
                            data = JSON.parse(data);
                        }
                        catch (e) {
                            console.log("Exception while parsing api response : " + data);
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
                        self.openVerifyEmailView();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getFormDataForRegister = function () {
            var formData = new FormData();
            formData.append('name', _this_1.loginForm.value.fullName);
            formData.append('emailid', _this_1.loginForm.value.email);
            formData.append('password', _this_1.loginForm.value.password);
            formData.append('phone', _this_1.correctPhoneNumber);
            formData.append('usertimezone', _this_1.userTimezone);
            formData.append('reCaptcha', _this_1.captchaResponse);
            formData.append('username', _this_1.randomString(10, ''));
            if (_this_1.rdurl) {
                formData.append('rdurl', _this_1.rdurl);
            }
            return formData;
        };
        this.forgotPassword = function () {
            _this_1.loginForm.get('password').disable();
            _this_1.showResetPassword = true;
            _this_1.showSocial = false;
            _this_1.isSignInView = false;
        };
        this.goBack = function () {
            if (_this_1.showResetPassword) {
                _this_1.openSignInView();
            }
            else if (_this_1.isSignInView || _this_1.isSignUpView || _this_1.isVerifyEmailView) {
                _this_1.openDefaultView();
            }
            else {
                _this_1.close(false);
            }
        };
        this.openSignInView = function () {
            _this_1.showResetPassword = false;
            _this_1.isSignUpView = false;
            _this_1.isSignInView = true;
            _this_1.loginForm.get('password').enable();
            _this_1.showSocial = false;
            _this_1.socialLoginMsg = false;
            _this_1.isDefaultView = false;
        };
        this.openSignUpView = function () {
            _this_1.isSignUpView = true;
            _this_1.isSignInView = false;
            _this_1.showSocial = false;
            _this_1.isDefaultView = false;
            _this_1.socialLoginMsg = false;
            _this_1.loginForm.get('fullName').enable();
            _this_1.loginForm.get('password').enable();
            _this_1.loginForm.get('phoneNumber').enable();
        };
        this.openDefaultView = function () {
            _this_1.isVerifyEmailView = false;
            _this_1.isSignUpView = false;
            _this_1.showResetPassword = false;
            _this_1.isSignInView = false;
            _this_1.showSocial = true;
            _this_1.isDefaultView = true;
            _this_1.loginForm.get('fullName').disable();
            _this_1.loginForm.get('password').disable();
            _this_1.loginForm.get('phoneNumber').disable();
        };
        this.openVerifyEmailView = function () {
            _this_1.isVerifyEmailView = true;
            _this_1.showLoader = false;
            _this_1.showSocial = false;
            _this_1.isSignUpView = false;
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
                        if (localStorage.getItem('email')) {
                            localStorage.removeItem('email');
                        }
                        localStorage.setItem('email', this.loginForm.get('email').value.trim());
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
        this.checkIfRdUrlIsLegit = function () {
            if (_this_1.isPathAbsolute(_this_1.rdurl)) {
                var url = new URL(_this_1.rdurl);
                if (url.host.indexOf("townscript.com") == -1) {
                    _this_1.rdurl = '/';
                }
            }
        };
        this.isPathAbsolute = function (path) {
            return /^(?:\/|[a-z]+:\/\/)/.test(path);
        };
    }
    TsLoginSignupComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.initForm();
        this.subObject = this.placeService.place.subscribe(function (res) {
            if (_this_1.utilityService.IsJsonString(res)) {
                var placeData = JSON.parse(res);
                _this_1.countryCode = placeData['country'];
            }
        });
        this.activatedRoute.queryParams.subscribe(function (params) {
            if (params['rdurl']) {
                _this_1.rdurl = params['rdurl'];
                _this_1.rdurl = decodeURIComponent(_this_1.rdurl);
                _this_1.rdurl = _this_1.rdurl.replace("[", "%5B");
                _this_1.rdurl = _this_1.rdurl.replace("]", "%5D");
            }
            if (params['error'] === 'registration-closed') {
                _this_1.registrationClosedMsg = true;
            }
            _this_1.checkIfRdUrlIsLegit();
        });
    };
    TsLoginSignupComponent.prototype.ngOnChanges = function (changes) {
        if (changes['rdurl']) {
            this.fbLoginURL = config.baseUrl + 'api/'
                + 'user/signinwithfacebook' + (this.rdurl == undefined ? '' : '?rdurl=' + this.rdurl);
            this.googleLoginURL = config.baseUrl + 'api/'
                + 'user/signinwithgoogle' + (this.rdurl == undefined ? '' : '?rdurl=' + this.rdurl);
            this.checkIfRdUrlIsLegit();
        }
    };
    TsLoginSignupComponent.prototype.ngAfterContentInit = function () {
    };
    TsLoginSignupComponent.prototype.ngOnDestroy = function () {
        if (this.subObject !== undefined) {
            this.subObject.unsubscribe();
        }
    };
    TsLoginSignupComponent.ctorParameters = function () { return [
        { type: UtilityService },
        { type: CookieService },
        { type: UserService },
        { type: NotificationService },
        { type: TsLoginSignupService },
        { type: PlaceService },
        { type: ActivatedRoute }
    ]; };
    __decorate([
        Input()
    ], TsLoginSignupComponent.prototype, "mode", void 0);
    __decorate([
        Input()
    ], TsLoginSignupComponent.prototype, "defaultHeader", void 0);
    __decorate([
        Input()
    ], TsLoginSignupComponent.prototype, "defaultSubHeader", void 0);
    __decorate([
        Input()
    ], TsLoginSignupComponent.prototype, "rdurl", void 0);
    __decorate([
        Input()
    ], TsLoginSignupComponent.prototype, "showSocial", void 0);
    __decorate([
        Input()
    ], TsLoginSignupComponent.prototype, "source", void 0);
    __decorate([
        Output()
    ], TsLoginSignupComponent.prototype, "closeDialog", void 0);
    __decorate([
        ViewChild('recaptchaRef', { read: true, static: true })
    ], TsLoginSignupComponent.prototype, "recaptchaRef", void 0);
    TsLoginSignupComponent = __decorate([
        Component({
            selector: 'app-ts-login-signup',
            template: "<div class=\"login-signup-view px-5\" id=\"login-signup-view\">\n  <div class=\"view-header\" *ngIf=\"!showLoader && !showConfirmation\">\n    <div class=\"back-button text-gray-700 text-xl md:text-2xl lg:text-3xl -ml-1\" *ngIf=\"mode == 'dialog'\">\n      <i appDataAnalytics eventLabel=\"loginBack\" clickLocation=\"\" class=\"mdi mdi-arrow-left cursor-pointer\"\n        (click)=\"goBack()\"></i>\n    </div>\n    <div class=\"initial-header flex flex-col fadeIn\" *ngIf=\"isDefaultView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">{{defaultHeader}}</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">{{defaultSubHeader}}</div>\n    </div>\n    <div class=\"sign-in-header flex flex-col fadeIn\" *ngIf=\"isSignInView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign In</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"forgot-pwd-header flex flex-col fadeIn\" *ngIf=\"showResetPassword\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Forgot Password?</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Don\u2019t worry, we\u2019ll help you reset it\n      </div>\n    </div>\n\n    <div class=\"sign-up-header flex flex-col fadeIn\" *ngIf=\"isSignUpView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign Up</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"verify-email-header flex flex-col fadeIn\" *ngIf=\"isVerifyEmailView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">You're almost done</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">We just need to verify your e-mail</div>\n    </div>\n  </div>\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10\" *ngIf=\"showLoader\">\n    <mat-spinner></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\">{{loaderText}}</div>\n  </div>\n  <div class=\"confirmation flex flex-col items-center justify-center p-10\" *ngIf=\"showConfirmation\">\n    <app-confirmation-svg></app-confirmation-svg>\n    <div class=\"pt-5 text-gray-700 text-lg lg:text-xl font-semibold flex flex-wrap items-center justify-center\">\n      <div>Welcome back{{userName?.length <= 15 ? ',' : '' }}</div>\n          <div *ngIf=\"userName?.length <= 15\">\n            <span class=\"ml-1\">{{userName}}</span>\n          </div>\n          !\n      </div>\n    </div>\n    <div class=\"view-body pt-5\" *ngIf=\"!showLoader && !showConfirmation\">\n      <div class=\"default-view-body py-2 fadeInUp\" *ngIf=\"isDefaultView\">\n        <form id=\"loginForm\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n          <div class=\"form-group md:flex md:items-center \">\n            <div class=\"w-full\">\n              <mat-form-field class=\"w-full\">\n                <input formControlName=\"email\" matInput\n                  class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                  id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\" (ngModelChange)=\"clearErrors()\">\n              </mat-form-field>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n                It seems you have signed up using Social Login.\n              </p>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"registrationClosedMsg\">\n                {{registrationClosedMessage}}\n              </p>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                Email Id is required\n              </p>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                Please enter a valid email address\n              </p>\n            </div>\n          </div>\n          <div class=\"form-group w-full text-center\">\n            <button appDataAnalytics eventLabel=\"loginContinue\" clickLocation=\"\" matRipple (click)=\"verifyEmail()\"\n              [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n              class=\"w-full btn-cta p-2 mb-2 font-semibold\">Continue\n            </button>\n          </div>\n\n          <div class=\"form-group strike-through strike-through-margin\">\n            <div class=\"text-gray-700 text-base md:text-lg lg:text-xl\">\n              <span class=\"or-text\">OR</span>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <a appDataAnalytics [eventLabel]=\"'loginGoogle'\" [clickLocation]=\"\" [href]=\"googleLoginURL\" target=\"_self\"\n              class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n              matRipple>\n              <div class=\"px-2\">\n                <img class=\"logo\"\n                  src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/google-min.png\" />\n              </div>\n              <div class=\"text-sm text-gray-700\">\n                <span class=\"no-margin\">Continue with Google</span>\n              </div>\n            </a>\n            <p class=\"form-control--error\" ng-if=\"googleError.length\" ng-bind=\"googleError\"></p>\n          </div>\n          <div class=\"form-group\">\n            <a appDataAnalytics eventLabel=\"loginFacebook\" clickLocation=\"\" [href]=\"fbLoginURL\" target=\"_self\"\n              class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n              ts-data-analytics prop-event=\"click\" eventLabel=\"Login with Facebook\" prop-clicked-location=\"Sign In\"\n              matRipple>\n              <div class=\"px-2\">\n                <img class=\"logo\"\n                  src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/facebook-min.png\" />\n              </div>\n              <div class=\"text-sm text-gray-700\">\n                <span class=\"no-margin\">Continue with Facebook</span>\n              </div>\n            </a>\n            <ng-container class=\"login-error\" ng-if=\"fbError.length\">\n              <i class=\"ion-android-alert\"></i>\n              <p class=\"form-control--error\" ng-bind=\"fbError\"></p>\n            </ng-container>\n          </div>\n\n        </form>\n      </div>\n      <div class=\"signin-view-body py-2 fadeInUp\" *ngIf=\"isSignInView\">\n        <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n          <div class=\"form-group md:flex md:items-center \">\n            <div class=\"w-full\">\n              <mat-form-field class=\"w-full\">\n                <input formControlName=\"email\" matInput\n                  class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                  id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n              </mat-form-field>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n                It seems you have signed up using Social Login.\n              </p>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                Email Id is required\n              </p>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                Please enter a valid email address\n              </p>\n            </div>\n          </div>\n          <div class=\"form-group md:flex md:items-center \">\n            <div class=\"w-full\">\n              <mat-form-field class=\"w-full relative\">\n                <input formControlName=\"password\" matInput autofocus\n                  class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                  id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n                <i appDataAnalytics eventLabel=\"loginShowPass\" clickLocation=\"\"\n                  class=\"text-lg mdi absolute right-0 text-gray-700\"\n                  [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n              </mat-form-field>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n                Password is required\n              </p>\n            </div>\n          </div>\n          <div class=\"w-full text-center form-group\">\n            <p class=\"text-left text-sm text-red-500 -mt-3 mb-2\" *ngIf=\"signInErrMessage.length > 0\">\n              {{signInErrMessage}}</p>\n            <button appDataAnalytics eventLabel=\"loginSignin\" clickLocation=\"\" matRipple (click)=\"signIn()\"\n              [ngClass]=\"!loginForm.valid ? 'opacity-50 pointer-events-none': ''\"\n              class=\"w-full btn-cta p-2 mb-2 font-semibold\">Sign In\n            </button>\n            <div appDataAnalytics eventLabel=\"loginForgot\" clickLocation=\"\"\n              class=\"text-sm text-center text-gray-700 p-1\">\n              <span class=\"cursor-pointer hover:underline\" (click)=\"forgotPassword()\">Forgot Password?</span>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"reset-pwd-view-body py-2 fadeInUp\" *ngIf=\"showResetPassword\">\n        <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n          <div class=\"form-group md:flex md:items-center\" *ngIf=\"!resetPwdLinkSent\">\n            <div class=\"w-full\">\n              <mat-form-field class=\"w-full\">\n                <input formControlName=\"email\" matInput\n                  class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                  id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n              </mat-form-field>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                Email Id is required\n              </p>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                Please enter a valid email address\n              </p>\n            </div>\n          </div>\n          <div class=\"link-sent fadeIn\" *ngIf=\"resetPwdLinkSent\">\n            <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n              <app-email-sent></app-email-sent>\n            </div>\n            <div class=\"p-2 text-gray-700 text-sm text-center secondary-header\">Password reset link has been sent to\n              {{loginForm.value.email}}</div>\n          </div>\n          <div class=\"w-full text-center form-group\">\n            <button appDataAnalytics eventLabel=\"loginResetBtn\" clickLocation=\"\" matRipple *ngIf=\"!resetPwdLinkSent\"\n              (click)=\"resetPassword()\"\n              [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n              class=\"w-full btn-cta p-2 mb-2 font-semibold\">Send Reset Password Link\n            </button>\n            <div (click)=\"resetPassword()\"\n              class=\"color-blue font-semibold text-sm text-center resend-email py-2 px-2 hover:underline cursor-pointer\"\n              *ngIf=\"resetPwdLinkSent\">\n              Resend Email\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"signup-view-body py-2 fadeInUp\" *ngIf=\"isSignUpView\">\n        <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n          <div class=\"form-group md:flex md:items-center \">\n            <div class=\"w-full\">\n              <mat-form-field class=\"w-full\">\n                <input formControlName=\"email\" matInput\n                  class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                  id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n              </mat-form-field>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n                It seems you have signed up using Social Login.\n              </p>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                Email Id is required\n              </p>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n                Please enter a valid email address\n              </p>\n            </div>\n          </div>\n          <div class=\"form-group md:flex md:items-center \">\n            <div class=\"w-full\">\n              <mat-form-field class=\"w-full relative\">\n                <input formControlName=\"password\" matInput autofocus\n                  class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                  id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n                <i appDataAnalytics eventLabel=\"loginShowPass\" clickLocation=\"\"\n                  class=\"text-lg mdi absolute right-0 text-gray-700\"\n                  [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n              </mat-form-field>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n                Password is required\n              </p>\n            </div>\n          </div>\n          <div class=\"form-group md:flex md:items-center \">\n            <div class=\"w-full\">\n              <mat-form-field class=\"w-full relative\">\n                <input formControlName=\"fullName\" matInput\n                  class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                  id=\"name\" type=\"text\" placeholder=\"Full Name\">\n              </mat-form-field>\n              <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n                *ngIf=\"loginForm.get('fullName').hasError('required') && (loginForm.get('fullName').dirty || loginForm.get('fullName').touched)\">\n                Full Name is required\n              </p>\n            </div>\n          </div>\n          <div class=\"form-group md:flex md:items-center relative z-50\">\n            <div class=\"w-full\">\n              <mat-form-field class=\"w-full relative z-50\" floatLabel=\"always\">\n                <input type=\"tel\" formControlName=\"phoneNumber\" matInput\n                  class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10\"\n                  id=\"phoneNumber\" placeholder=\"Phone no.\" (ngModelChange)=\"validatePhoneNumber()\">\n              </mat-form-field>\n              <p class=\"text-xs text-red-500 mb-2 -mt-3\"\n                *ngIf=\"loginForm.get('phoneNumber').hasError('required') && (loginForm.get('phoneNumber').dirty || loginForm.get('phoneNumber').touched)\">\n                Phone Number is required\n              </p>\n              <p class=\"text-xs text-red-500 mb-2 -mt-3\" *ngIf=\"phoneError\">Please enter a valid Phone no.</p>\n            </div>\n          </div>\n          <div class=\"form-group md:flex md:items-center mb-3 relative z-0\">\n            <div class=\"w-full flex items-center justify-center md:justify-start\">\n              <re-captcha (resolved)=\"resolve($event)\" [siteKey]=\"captchaToken\">\n              </re-captcha>\n            </div>\n          </div>\n          <div class=\"w-full text-center form-group relative z-0\">\n            <button matRipple\n              [ngClass]=\"!loginForm.valid || phoneError || captchaResponse == undefined ? 'opacity-50 pointer-events-none': ''\"\n              (click)=\"signUp()\" class=\"w-full btn-cta p-2 mb-2 font-semibold\">\n              Create your account\n            </button>\n            <p class=\"text-left text-sm -mt-1 text-red-500\" *ngIf=\"signUpErrMessage.length > 0\">{{signUpErrMessage}}</p>\n          </div>\n        </form>\n      </div>\n\n      <div class=\"verify-email-view-body py-2 fadeInUp\" *ngIf=\"isVerifyEmailView\">\n        <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n          <div class=\"link-sent fadeIn\">\n            <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n              <app-email-sent></app-email-sent>\n            </div>\n            <div class=\"p-4 text-gray-700 text-sm text-center secondary-header\">\n              We have sent a verification link on {{loginForm.value.email}}.<br> Please click the link to activate your\n              account.\n            </div>\n          </div>\n          <div class=\"w-full text-center form-group\">\n            <button matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resendVerifyEmail()\" [disabled]=\"!loginForm.valid\"\n              class=\"w-full btn-cta p-2 mb-2 font-semibold\">Resend Verification Email\n            </button>\n            <div class=\"text-gray-700 text-sm text-center why-verify px-2 hover:underline cursor-pointer\">\n              <span\n                matTooltip=\"Townscript sends all important communication regarding your events & account-related updates via e-mail. We just want to make sure you don\u2019t miss these important information\"\n                matTooltipPosition=\"right\" matTooltipClass=\"ts-login-tooltip\">Why verify?</span>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"agreement my-2\" *ngIf=\"isDefaultView || isSignUpView\">\n        <div class=\"w-full hor-linear-grad my-2\"></div>\n        <p class=\"text-xs text-center p-2 text-gray-800 px-5\">\n          By continuing, you agree to Townscript's\n          <a appDataAnalytics eventLabel=\"loginTerms\" clickLocation=\"\" class=\"text-blue-700\"\n            href=\"{{baseUrl}}terms-and-conditions\">terms of service</a>\n          and\n          <a appDataAnalytics eventLabel=\"loginPolicy\" clickLocation=\"\" class=\"text-blue-700\"\n            href=\"{{baseUrl}}privacy-policy\">privacy policy</a>.\n        </p>\n      </div>\n    </div>\n  </div>\n",
            encapsulation: ViewEncapsulation.None,
            styles: ["@keyframes fadeInUp{from{opacity:0;transform:translate3d(0,50%,0)}to{opacity:1;transform:none}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ts-login-tooltip{background-color:#666;color:#fff;font-size:12px;opacity:.98;white-space:pre-line}.login-signup-view{max-height:90vh;overflow:hidden}.login-signup-view .color-blue{color:#3782c4}.login-signup-view .fadeIn .primary-header,.login-signup-view .fadeIn .secondary-header{animation-duration:.4s;animation-fill-mode:both;animation-delay:0s;animation-name:fadeIn}.login-signup-view .fadeIn .secondary-header{animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group{animation-duration:.4s;animation-fill-mode:both;animation-name:fadeInUp}.login-signup-view .fadeInUp .login-form .form-group:nth-child(1){animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(2){animation-delay:.2s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(3){animation-delay:.3s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(4){animation-delay:.4s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(5){animation-delay:.5s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(6){animation-delay:.6s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(7){animation-delay:.7s}.login-signup-view .ts-loader{animation-duration:.2s;animation-fill-mode:both;animation-name:fadeInUp}.login-signup-view .ts-loader circle{stroke-width:5%!important}.login-signup-view .view-body .blue-btn{background:#3782c4;color:#fff;transition:.15s}.login-signup-view .view-body .blue-btn:hover{background:#1369b5}.login-signup-view .view-body .default-view-body .strike-through-margin{margin:30px 0;text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em}.login-signup-view .view-body .default-view-body .strike-through-margin span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .strike-through{text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em;margin:30px auto}.login-signup-view .view-body .default-view-body .strike-through span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .logo{height:auto;width:25px}.login-signup-view .view-body .hor-linear-grad{height:1px;width:100%;background-image:linear-gradient(to bottom,rgba(255,255,255,0) 0,#e2e2e2 48%,rgba(255,255,255,0) 100%)}"]
        })
    ], TsLoginSignupComponent);
    return TsLoginSignupComponent;
}());
export { TsLoginSignupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELElBQU0sVUFBVSxHQUFHLHFFQUFxRSxDQUFDO0FBUXpGO0lBaURJLGdDQUNZLGNBQThCLEVBQzlCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsWUFBMEIsRUFDMUIsY0FBOEI7UUFQMUMsbUJBUUs7UUFQTyxt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QUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDaEM7SUFDTCxDQUFDOztnQkFqRDJCLGNBQWM7Z0JBQ2YsYUFBYTtnQkFDZixXQUFXO2dCQUNILG1CQUFtQjtnQkFDbEIsb0JBQW9CO2dCQUM1QixZQUFZO2dCQUNWLGNBQWM7O0lBdERqQztRQUFSLEtBQUssRUFBRTt3REFBVztJQUNWO1FBQVIsS0FBSyxFQUFFO2lFQUEyQztJQUMxQztRQUFSLEtBQUssRUFBRTtvRUFBb0U7SUFDbkU7UUFBUixLQUFLLEVBQUU7eURBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTs4REFBd0I7SUFDdkI7UUFBUixLQUFLLEVBQUU7MERBQWE7SUFDWDtRQUFULE1BQU0sRUFBRTsrREFBa0M7SUFHM0M7UUFEQyxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0VBQ3ZCO0lBWHhCLHNCQUFzQjtRQU5sQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLG9sbkJBQStDO1lBRS9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztTQUN4QyxDQUFDO09BQ1csc0JBQXNCLENBd1lsQztJQUFELDZCQUFDO0NBQUEsQUF4WUQsSUF3WUM7U0F4WVksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuaW1wb3J0IHsgUmVjYXB0Y2hhQ29tcG9uZW50IH0gZnJvbSAnbmctcmVjYXB0Y2hhJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2Nvb2tpZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRzTG9naW5TaWdudXBTZXJ2aWNlIH0gZnJvbSAnLi90cy1sb2dpbi1zaWdudXAuc2VydmljZSc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmNvbnN0IGVtYWlsUmVnZXggPSAnXlthLXowLTldKyhcXC5bX2EtejAtOV0rKSpAW2EtejAtOS1dKyhcXC5bYS16MC05LV0rKSooXFwuW2Etel17MiwxNX0pJCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXRzLWxvZ2luLXNpZ251cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgVHNMb2dpblNpZ251cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG1vZGU6IGFueTtcbiAgICBASW5wdXQoKSBkZWZhdWx0SGVhZGVyOiBhbnkgPSAnTGV0XFwncyBnZXQgc3RhcnRlZCc7XG4gICAgQElucHV0KCkgZGVmYXVsdFN1YkhlYWRlcjogYW55ID0gJ1lvdXIgb25lIHN0b3AgdG9vbCBmb3Igb3JnYW5pemluZyBldmVudHMnO1xuICAgIEBJbnB1dCgpIHJkdXJsOiBhbnk7XG4gICAgQElucHV0KCkgc2hvd1NvY2lhbDogYW55ID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzb3VyY2U6IGFueTtcbiAgICBAT3V0cHV0KCkgY2xvc2VEaWFsb2cgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdyZWNhcHRjaGFSZWYnLCB7IHJlYWQ6IHRydWUsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIHJlY2FwdGNoYVJlZjogUmVjYXB0Y2hhQ29tcG9uZW50O1xuXG4gICAgY2FwdGNoYVRva2VuOiBhbnkgPSB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLkNBUFRDSEFfU0lURV9JTlZJU0lCTEVfQ0FQVENIQV9LRVk7XG5cbiAgICBzaG93ID0gZmFsc2U7XG4gICAgc2hvd1Bhc3N3b3JkID0gZmFsc2U7XG4gICAgaXNEZWZhdWx0VmlldyA9IHRydWU7XG4gICAgaXNTaWduSW5WaWV3ID0gZmFsc2U7XG4gICAgaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgaXNWZXJpZnlFbWFpbFZpZXcgPSBmYWxzZTtcbiAgICBzaG93UmVzZXRQYXNzd29yZCA9IGZhbHNlO1xuXG4gICAgdXNlclRpbWV6b25lOiBhbnkgPSBEYXRlVGltZS5sb2NhbCgpLnpvbmVOYW1lO1xuICAgIGxvZ2luRm9ybTogYW55O1xuICAgIGNhcHRjaGFSZXNwb25zZTogYW55O1xuICAgIGNvcnJlY3RQaG9uZU51bWJlcjogYW55ID0gbnVsbDtcbiAgICBwaG9uZUVycm9yID0gZmFsc2U7XG4gICAgc29jaWFsTG9naW5Nc2c6IGFueSA9IGZhbHNlO1xuICAgIGluaXRpYWxpemVUZWxJbnB1dDogYW55O1xuICAgIHNpZ25JbkVyck1lc3NhZ2UgPSAnJztcbiAgICByZXNldFB3ZExpbmtTZW50ID0gZmFsc2U7XG4gICAgc2lnblVwRXJyTWVzc2FnZSA9ICcnO1xuICAgIHJlZ2lzdHJhdGlvbkNsb3NlZE1zZyA9IGZhbHNlO1xuICAgIHJlYWRvbmx5IHJlZ2lzdHJhdGlvbkNsb3NlZE1lc3NhZ2UgPSAnTmV3IGFjY291bnQgcmVnaXN0cmF0aW9uIGlzIGNsb3NlZC4gVG93bmhhbGwgc2VydmljZXMgYXJlIGJlaW5nIGRpc2NvbnRpbnVlZC4nO1xuXG4gICAgZmJMb2dpblVSTCA9IGNvbmZpZy5iYXNlVXJsICsgJ2FwaS8nXG4gICAgICAgICsgJ3VzZXIvc2lnbmlud2l0aGZhY2Vib29rJztcbiAgICBnb29nbGVMb2dpblVSTCA9IGNvbmZpZy5iYXNlVXJsICsgJ2FwaS8nXG4gICAgICAgICsgJ3VzZXIvc2lnbmlud2l0aGdvb2dsZSc7XG4gICAgaW50bElucHV0OiBhbnk7XG4gICAgc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgIGxvYWRlclRleHQ6IGFueTtcbiAgICBjb3VudHJ5Q29kZTogYW55ID0gJ0lOJztcbiAgICBzdWJPYmplY3Q6IGFueTtcbiAgICBzaG93Q29uZmlybWF0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgYmFzZVVybDogYW55ID0gdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5iYXNlVXJsO1xuICAgIHVzZXJOYW1lOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB0c0xvZ2luU2lnbnVwU2VydmljZTogVHNMb2dpblNpZ251cFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgICAgIHRoaXMuc3ViT2JqZWN0ID0gdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZURhdGEgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudHJ5Q29kZSA9IHBsYWNlRGF0YVsnY291bnRyeSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNbJ3JkdXJsJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJkdXJsID0gcGFyYW1zWydyZHVybCddO1xuICAgICAgICAgICAgICAgIHRoaXMucmR1cmwgPSBkZWNvZGVVUklDb21wb25lbnQodGhpcy5yZHVybCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZHVybCA9IHRoaXMucmR1cmwucmVwbGFjZShcIltcIiwgXCIlNUJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZHVybCA9IHRoaXMucmR1cmwucmVwbGFjZShcIl1cIiwgXCIlNURcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1zWydlcnJvciddID09PSAncmVnaXN0cmF0aW9uLWNsb3NlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbkNsb3NlZE1zZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoZWNrSWZSZFVybElzTGVnaXQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgaWYgKGNoYW5nZXNbJ3JkdXJsJ10pIHtcbiAgICAgICAgdGhpcy5mYkxvZ2luVVJMID0gY29uZmlnLmJhc2VVcmwgKyAnYXBpLydcbiAgICAgICAgICAgICsgJ3VzZXIvc2lnbmlud2l0aGZhY2Vib29rJyArICh0aGlzLnJkdXJsID09IHVuZGVmaW5lZCA/ICcnIDogJz9yZHVybD0nICsgdGhpcy5yZHVybCk7XG4gICAgICAgIHRoaXMuZ29vZ2xlTG9naW5VUkwgPSBjb25maWcuYmFzZVVybCArICdhcGkvJ1xuICAgICAgICAgICAgKyAndXNlci9zaWduaW53aXRoZ29vZ2xlJyArICh0aGlzLnJkdXJsID09IHVuZGVmaW5lZCA/ICcnIDogJz9yZHVybD0nICsgdGhpcy5yZHVybCk7XG4gICAgICAgIHRoaXMuY2hlY2tJZlJkVXJsSXNMZWdpdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJPYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWJPYmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGb3JtID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmxvZ2luRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgICAgICAgJ2Z1bGxOYW1lJzogbmV3IEZvcm1Db250cm9sKCcnLCB7IHZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWQgfSksXG4gICAgICAgICAgICAnZW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybihlbWFpbFJlZ2V4KV0gfSksXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZCB9KSxcbiAgICAgICAgICAgICdwaG9uZU51bWJlcic6IG5ldyBGb3JtQ29udHJvbCgnJywgeyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkIH0pXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2Z1bGxOYW1lJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bhc3N3b3JkJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bob25lTnVtYmVyJykuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIGNsb3NlID0gKHNpZ25lZEluKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2VEaWFsb2cuZW1pdChzaWduZWRJbik7XG4gICAgfVxuXG4gICAgY2xlYXJFcnJvcnMgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSAnJztcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb25DbG9zZWRNc2cgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXNvbHZlID0gKGNhcHRjaGFSZXNwb25zZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuY2FwdGNoYVJlc3BvbnNlID0gY2FwdGNoYVJlc3BvbnNlO1xuICAgIH1cblxuICAgIHBhc3N3b3JkID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93O1xuICAgIH1cblxuICAgIHZlcmlmeUVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbkZvcm0uY29udHJvbHMuZW1haWwudmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UuZ2V0VXNlclNpZ25VcERldGFpbHModGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWwpO1xuICAgICAgICBsZXQgbmV3RGF0YSA9IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgbmV3RGF0YSA9IEpTT04ucGFyc2UocmVzdWx0LmRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4Y2VwdGlvbiB3aGlsZSBwYXJzaW5nIGFwaSByZXNwb25zZSA6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3RGF0YSAmJiBuZXdEYXRhLmlzRXhpc3RpbmdVc2VyICYmIG5ld0RhdGEuaXNNYW51YWxTaWdudXAgJiYgIW5ld0RhdGEuaXNUZW1wb3JhcnlVc2VyKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5TaWduSW5WaWV3KCk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3RGF0YSAmJiBuZXdEYXRhLmlzRXhpc3RpbmdVc2VyICYmICFuZXdEYXRhLmlzTWFudWFsU2lnbnVwICYmICFuZXdEYXRhLmlzVGVtcG9yYXJ5VXNlcikge1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxMb2dpbk1zZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBubyByZWFsIGFjY291bnQgZXhpc3RzIGZvciB0aGlzIGVtYWlsIChvciBpdCdzIG9ubHkgYSB0ZW1wL3NoYWRvdyBhY2NvdW50KSAtPlxuICAgICAgICAgICAgLy8gcmVnaXN0cmF0aW9uIGlzIGNsb3NlZCwgZG9uJ3Qgc2VuZCB0aGVtIGludG8gdGhlIHNpZ24tdXAgZm9ybVxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb25DbG9zZWRNc2cgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUludGxUZWxJbnB1dCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBpbnRsIHRlbFxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwaG9uZU51bWJlcicpO1xuICAgICAgICB0aGlzLmludGxJbnB1dCA9ICg8YW55PndpbmRvdykuaW50bFRlbElucHV0KGlucHV0LCB7XG4gICAgICAgICAgICBpbml0aWFsQ291bnRyeTogdGhpcy5jb3VudHJ5Q29kZSxcbiAgICAgICAgICAgIHByZWZlcnJlZENvdW50cmllczogW1wiaW5cIiwgXCJpZFwiLCBcInNnXCIsIFwibXlcIl0sXG4gICAgICAgICAgICB1dGlsU2NyaXB0czogJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pbnRsLXRlbC1pbnB1dC9idWlsZC9qcy91dGlscy5qcydcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBob25lTnVtYmVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW50bElucHV0LmlzVmFsaWROdW1iZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5waG9uZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzLnBob25lTnVtYmVyLnNldEVycm9ycyh7ICd2YWxpZCc6IGZhbHNlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm0uY29udHJvbHMucGhvbmVOdW1iZXIuc2V0RXJyb3JzKCk7XG4gICAgICAgICAgICB0aGlzLnBob25lRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNpZ25JbiA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5Gb3JtLnZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmV0RGF0YSA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UubG9naW5XaXRoVG93bnNjcmlwdCh0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCwgdGhpcy5sb2dpbkZvcm0udmFsdWUucGFzc3dvcmQpO1xuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHJldERhdGEucmVzdWx0ICE9ICdTdWNjZXNzJykge1xuICAgICAgICAgICAgdGhpcy5zaWduSW5FcnJNZXNzYWdlID0gcmV0RGF0YS5kYXRhO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0NvbmZpcm1hdGlvbiA9IHRydWU7XG4gICAgICAgIGNvbnN0IHRva2VuRGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiAocmV0RGF0YS5kYXRhKVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0geyAuLi5yZXREYXRhLnVzZXJEZXRhaWxzLCAuLi50b2tlbkRhdGEgfTtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IHVzZXJEYXRhLnVzZXI7XG4gICAgICAgIGNvbnN0IGlzT3JnYW5pemVyID0gdXNlckRhdGEuaXNPcmdhbml6ZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlck5hbWUpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIodXNlckRhdGEpO1xuICAgICAgICAvLyB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0Q29va2llKCd0b3duc2NyaXB0LXVzZXInLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSksIDkwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdkaWFsb2cnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gcmVkaXJlY3Rpb24gbmVlZGVkICxpbiBjYXNlIG9mIGZvbGxvd1xuICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlICE9ICdmb2xsb3cnKSB7XG4gICAgICAgICAgICAgIGlmKHRoaXMucmR1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odGhpcy5yZHVybCwgJ19zZWxmJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmKGlzT3JnYW5pemVyKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbignL2Rhc2hib2FyZCcsICdfc2VsZicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxNDAwKTtcblxuXG5cbiAgICB9XG5cbiAgICBzaWduVXAgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICBpZiAoIXRoaXMubG9naW5Gb3JtLnZhbGlkIHx8IHRoaXMuY2FwdGNoYVJlc3BvbnNlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bob25lTnVtYmVyJyk7XG4gICAgICAgIGNvbnN0IGl0aSA9ICg8YW55PndpbmRvdykuaW50bFRlbElucHV0R2xvYmFscy5nZXRJbnN0YW5jZShpbnB1dCk7XG4gICAgICAgIHRoaXMuY29ycmVjdFBob25lTnVtYmVyID0gaXRpLmdldE51bWJlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvcnJlY3RQaG9uZU51bWJlciA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMucGhvbmVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gJ1BsZWFzZSB3YWl0IHdoaWxlIHdlIGFyZSBjcmVhdGluZyB5b3VyIGFjY291bnQuJztcblxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UucmVnaXN0ZXJXaXRoVG93bnNjcmlwdFdpdGhDYXB0Y2hhKHRoaXMuZ2V0Rm9ybURhdGFGb3JSZWdpc3RlcigpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4Y2VwdGlvbiB3aGlsZSBwYXJzaW5nIGFwaSByZXNwb25zZSA6IFwiICsgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YVsncmVzdWx0J10gPT0gJ0Vycm9yJykge1xuICAgICAgICAgICAgc2VsZi5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNpZ25VcEVyck1lc3NhZ2UgPSBkYXRhWydkYXRhJ107XG4gICAgICAgICAgICBsZXQgX3RoaXMgPSBzZWxmO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5pdGlhbGl6ZUludGxUZWxJbnB1dCgpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLm9wZW5WZXJpZnlFbWFpbFZpZXcoKTtcbiAgICB9XG5cbiAgICBnZXRGb3JtRGF0YUZvclJlZ2lzdGVyID0gKCk6IEZvcm1EYXRhID0+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgdGhpcy5sb2dpbkZvcm0udmFsdWUuZnVsbE5hbWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2VtYWlsaWQnLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGFzc3dvcmQnLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5wYXNzd29yZCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGhvbmUnLCB0aGlzLmNvcnJlY3RQaG9uZU51bWJlcik7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXNlcnRpbWV6b25lJywgdGhpcy51c2VyVGltZXpvbmUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3JlQ2FwdGNoYScsIHRoaXMuY2FwdGNoYVJlc3BvbnNlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd1c2VybmFtZScsIHRoaXMucmFuZG9tU3RyaW5nKDEwLCAnJykpO1xuICAgICAgICBpZiAodGhpcy5yZHVybCkge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdyZHVybCcsIHRoaXMucmR1cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtRGF0YTtcbiAgICB9XG5cbiAgICBmb3Jnb3RQYXNzd29yZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzd29yZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdvQmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHRoaXMub3BlblNpZ25JblZpZXcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2lnbkluVmlldyB8fCB0aGlzLmlzU2lnblVwVmlldyB8fCB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EZWZhdWx0VmlldygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuU2lnbkluVmlldyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb3BlblNpZ25VcFZpZXcgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEZWZhdWx0VmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvY2lhbExvZ2luTXNnID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bob25lTnVtYmVyJykuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgb3BlbkRlZmF1bHRWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwaG9uZU51bWJlcicpLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICBvcGVuVmVyaWZ5RW1haWxWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlc2V0UGFzc3dvcmQgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICB0aGlzLmxvYWRlclRleHQgPSAnU2VuZGluZyBSZXNldCBQYXNzd29yZCBMaW5rIHRvICcgKyB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbDtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2Uuc2VuZEZvcmdvdFB3ZEVtYWlsKHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsKTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0UHdkTGlua1NlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKCdSZXNldCBQYXNzd29yZCBMaW5rIGhhcyBiZWVuIHNlbnQnLCAyMDAwLCAnRGlzbWlzcycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRQd2RMaW5rU2VudCA9IHRydWU7XG5cblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VtYWlsJykpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdlbWFpbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VtYWlsJywgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnZhbHVlLnRyaW0oKSk7XG4gICAgfVxuXG4gICAgcmFuZG9tU3RyaW5nID0gKGxlbjogbnVtYmVyLCBhbjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgYW4gPSBhbiAmJiBhbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgc3RyID0gJycsIGkgPSAwO1xuICAgICAgICBjb25zdCBtaW4gPSBhbiA9PT0gJ2EnID8gMTAgOiAwO1xuICAgICAgICBjb25zdCBtYXggPSBhbiA9PT0gJ24nID8gMTAgOiA2MjtcbiAgICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIGxldCByID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluIDw8IDA7XG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyICs9IHIgPiA5ID8gciA8IDM2ID8gNTUgOiA2MSA6IDQ4KTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHJlc2VuZFZlcmlmeUVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gJ1NlbmRpbmcgVmVyaWZpY2F0aW9uIGVtYWlsIHRvICcgKyB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbDtcbiAgICAgICAgY29uc3QgcmV0RGF0YSA9IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UucmVzZW5kVmVyaWZpY2F0aW9uQ29kZSh0aGlzLnJkdXJsLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcygnVmVyaWZpY2F0aW9uIGVtYWlsIGhhcyBiZWVuIHNlbnQnLCAyMDAwLCAnRGlzbWlzcycpO1xuICAgIH1cblxuICAgIHRvZ2dsZVBhc3N3b3JkRGlzcGxheSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFzc3dvcmQgPSAhdGhpcy5zaG93UGFzc3dvcmQ7XG4gICAgICAgIGNvbnN0IHB3ZElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcHdkJyk7XG4gICAgICAgIHB3ZElucHV0LnR5cGUgPSB0aGlzLnNob3dQYXNzd29yZCA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XG4gICAgfVxuXG5cbiAgICBjaGVja0lmUmRVcmxJc0xlZ2l0ID0gKCk6IGFueSA9PiB7XG4gICAgICBpZih0aGlzLmlzUGF0aEFic29sdXRlKHRoaXMucmR1cmwpKXtcbiAgICAgICAgbGV0IHVybCA9IG5ldyBVUkwodGhpcy5yZHVybCk7XG4gICAgICAgIGlmKHVybC5ob3N0LmluZGV4T2YoXCJ0b3duc2NyaXB0LmNvbVwiKSA9PSAtMSl7XG4gICAgICAgICAgdGhpcy5yZHVybCA9ICcvJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlzUGF0aEFic29sdXRlID0gKHBhdGgpOiBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiAvXig/OlxcL3xbYS16XSs6XFwvXFwvKS8udGVzdChwYXRoKTtcbiAgICB9XG5cblxufVxuIl19