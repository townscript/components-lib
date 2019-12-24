import * as tslib_1 from "tslib";
import { Component, ViewChild, EventEmitter, Output, Input, ViewEncapsulation } from '@angular/core';
import { config } from '../../../core/app-config';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import { RecaptchaComponent } from 'ng-recaptcha';
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
        this.fbLoginURL = config.baseUrl + 'api/'
            + 'user/signinwithfacebook' + (this.rdurl === undefined ? '' : '?rdurl=' + this.rdurl);
        this.googleLoginURL = config.baseUrl + 'api/'
            + 'user/signinwithgoogle' + (this.rdurl === undefined ? '' : '?rdurl=' + this.rdurl);
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
        };
        this.resolve = function (captchaResponse) {
            _this_1.captchaResponse = captchaResponse;
        };
        this.password = function () {
            _this_1.show = !_this_1.show;
        };
        this.verifyEmail = function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            var result, newData;
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
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
                        if (newData && newData.isExistingUser && newData.isManualSignup) {
                            this.openSignInView();
                        }
                        else if (newData && newData.isExistingUser && !newData.isManualSignup) {
                            this.socialLoginMsg = true;
                        }
                        else {
                            this.openSignUpView();
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
        this.signIn = function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            var retData, tokenData, userData, rdurl;
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
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
                        userData = tslib_1.__assign({}, retData.userDetails, tokenData);
                        this.userName = userData.user;
                        console.log(this.userName);
                        this.userService.updateUser(userData);
                        // this.cookieService.setCookie('townscript-user', JSON.stringify(userData), 90);
                        setTimeout(function () {
                            if (_this_1.mode === 'dialog') {
                                _this_1.close(true);
                            }
                        }, 1400);
                        if (this.rdurl != undefined) {
                            this.rdurl = decodeURIComponent(this.rdurl);
                            rdurl = this.rdurl.split("?").length > -1 ? this.rdurl.split("?")[0]
                                + "?" + encodeURIComponent(this.rdurl.substring(this.rdurl.indexOf("?") + 1))
                                : this.rdurl;
                            window.open(rdurl, '_self');
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.signUp = function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            var self, input, iti, data, _this_2;
            return tslib_1.__generator(this, function (_a) {
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
        this.resetPassword = function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            var resp;
            return tslib_1.__generator(this, function (_a) {
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
        this.resendVerifyEmail = function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            var retData;
            return tslib_1.__generator(this, function (_a) {
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
            if (_this_1.utilityService.IsJsonString(res)) {
                var placeData = JSON.parse(res);
                _this_1.countryCode = placeData['country'];
            }
        });
        this.activatedRoute.queryParams.subscribe(function (params) {
            if (params['rdurl'])
                _this_1.rdurl = params['rdurl'];
        });
    };
    TsLoginSignupComponent.prototype.ngOnDestroy = function () {
        if (this.subObject !== undefined) {
            this.subObject.unsubscribe();
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsLoginSignupComponent.prototype, "mode", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsLoginSignupComponent.prototype, "defaultHeader", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsLoginSignupComponent.prototype, "defaultSubHeader", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsLoginSignupComponent.prototype, "rdurl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsLoginSignupComponent.prototype, "showSocial", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TsLoginSignupComponent.prototype, "closeDialog", void 0);
    tslib_1.__decorate([
        ViewChild('recaptchaRef', { read: true, static: true }),
        tslib_1.__metadata("design:type", RecaptchaComponent)
    ], TsLoginSignupComponent.prototype, "recaptchaRef", void 0);
    TsLoginSignupComponent = tslib_1.__decorate([
        Component({
            selector: 'app-ts-login-signup',
            template: "<div class=\"login-signup-view px-5\" id=\"login-signup-view\">\n  <div class=\"view-header\" *ngIf=\"!showLoader && !showConfirmation\">\n    <div class=\"back-button text-gray-700 text-xl md:text-2xl lg:text-3xl -ml-1\" *ngIf=\"mode == 'dialog'\">\n      <i appDataAnalytics eventLabel=\"login-back\" clickLocation=\"\" class=\"mdi mdi-arrow-left cursor-pointer\" (click)=\"goBack()\"></i>\n    </div>\n    <div class=\"initial-header flex flex-col fadeIn\" *ngIf=\"isDefaultView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">{{defaultHeader}}</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">{{defaultSubHeader}}</div>\n    </div>\n    <div class=\"sign-in-header flex flex-col fadeIn\" *ngIf=\"isSignInView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign In</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"forgot-pwd-header flex flex-col fadeIn\" *ngIf=\"showResetPassword\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Forgot Password?</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Don\u2019t worry, we\u2019ll help you reset it\n      </div>\n    </div>\n\n    <div class=\"sign-up-header flex flex-col fadeIn\" *ngIf=\"isSignUpView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign Up</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"verify-email-header flex flex-col fadeIn\" *ngIf=\"isVerifyEmailView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">You're almost done</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">We just need to verify your e-mail</div>\n    </div>\n  </div>\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10\" *ngIf=\"showLoader\">\n    <mat-spinner></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\">{{loaderText}}</div>\n  </div>\n  <div class=\"confirmation flex flex-col items-center justify-center p-10\" *ngIf=\"showConfirmation\">\n    <app-confirmation-svg></app-confirmation-svg>\n    <div class=\"pt-5 text-gray-700 text-lg lg:text-xl font-semibold flex flex-wrap items-center justify-center\">\n      <div>Welcome back{{userName?.length <= 15 ? ',': ''}}</div>\n      <div *ngIf=\"userName?.length <= 15\">\n        <span class=\"ml-1\">{{userName}}</span>\n      </div>\n      !\n    </div>\n  </div>\n  <div class=\"view-body pt-5\" *ngIf=\"!showLoader && !showConfirmation\">\n    <div class=\"default-view-body py-2 fadeInUp\" *ngIf=\"isDefaultView\">\n      <form id=\"loginForm\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\" >\n            <mat-form-field class=\"w-full\">\n              <input  formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\" (ngModelChange)=\"clearErrors()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group w-full text-center\">\n          <button appDataAnalytics eventLabel=\"login-continue\" clickLocation=\"\" matRipple (click)=\"verifyEmail()\" [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Continue\n          </button>\n        </div>\n\n        <div class=\"form-group strike-through strike-through-margin\">\n          <div class=\"text-gray-700 text-base md:text-lg lg:text-xl\">\n            <span class=\"or-text\">OR</span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n            <a appDataAnalytics [eventLabel]=\"'login-google'\" [clickLocation]=\"\" [href]=\"googleLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n\n                 matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/google-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Google</span>\n                </div>\n            </a>\n            <p class=\"form-control--error\" ng-if=\"googleError.length\" ng-bind=\"googleError\"></p>\n        </div>\n        <div class=\"form-group\">\n            <a appDataAnalytics eventLabel=\"login-facebook\" clickLocation=\"\" [href]=\"fbLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n                ts-data-analytics prop-event=\"click\" eventLabel=\"Login with Facebook\"\n                prop-clicked-location=\"Sign In\" matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/facebook-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Facebook</span>\n                </div>\n            </a>\n            <ng-container class=\"login-error\" ng-if=\"fbError.length\">\n                <i class=\"ion-android-alert\"></i>\n                <p class=\"form-control--error\" ng-bind=\"fbError\"></p>\n            </ng-container>\n        </div>\n\n      </form>\n    </div>\n    <div class=\"signin-view-body py-2 fadeInUp\" *ngIf=\"isSignInView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i appDataAnalytics eventLabel=\"login-show-pass\" clickLocation=\"\" class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <p class=\"text-left text-sm text-red-500 -mt-3 mb-2\" *ngIf=\"signInErrMessage.length > 0\">{{signInErrMessage}}</p>\n          <button appDataAnalytics eventLabel=\"login-signin\" clickLocation=\"\" matRipple (click)=\"signIn()\" [ngClass]=\"!loginForm.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Sign In\n          </button>\n          <div appDataAnalytics eventLabel=\"login-forgot\" clickLocation=\"\" class=\"text-sm text-center text-gray-700 p-1\">\n            <span class=\"cursor-pointer hover:underline\" (click)=\"forgotPassword()\">Forgot Password?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"reset-pwd-view-body py-2 fadeInUp\" *ngIf=\"showResetPassword\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center\" *ngIf=\"!resetPwdLinkSent\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"link-sent fadeIn\" *ngIf=\"resetPwdLinkSent\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-2 text-gray-700 text-sm text-center secondary-header\">Password reset link has been sent to\n            {{loginForm.value.email}}</div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button appDataAnalytics eventLabel=\"login-reset-btn\" clickLocation=\"\" matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resetPassword()\"\n            [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Send Reset Password Link\n          </button>\n          <div (click)=\"resetPassword()\"\n            class=\"color-blue font-semibold text-sm text-center resend-email py-2 px-2 hover:underline cursor-pointer\"\n            *ngIf=\"resetPwdLinkSent\">\n            Resend Email\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"signup-view-body py-2 fadeInUp\" *ngIf=\"isSignUpView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i appDataAnalytics eventLabel=\"login-show-pass\" clickLocation=\"\" class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"fullName\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"name\" type=\"text\" placeholder=\"Full Name\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('fullName').hasError('required') && (loginForm.get('fullName').dirty || loginForm.get('fullName').touched)\">\n              Full Name is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center relative z-50\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative z-50\" floatLabel=\"always\">\n              <input type=\"tel\" formControlName=\"phoneNumber\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10\"\n                id=\"phoneNumber\" placeholder=\"Phone no.\" (ngModelChange)=\"validatePhoneNumber()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\"\n              *ngIf=\"loginForm.get('phoneNumber').hasError('required') && (loginForm.get('phoneNumber').dirty || loginForm.get('phoneNumber').touched)\">\n              Phone Number is required\n            </p>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\" *ngIf=\"phoneError\">Please enter a valid Phone no.</p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center mb-3 relative z-0\">\n            <div class=\"w-full flex items-center justify-center md:justify-start\">\n                <re-captcha\n                  (resolved)=\"resolve($event)\"\n                  [siteKey]=\"captchaToken\">\n                </re-captcha>\n            </div>\n        </div>\n        <div class=\"w-full text-center form-group relative z-0\">\n          <button matRipple\n            [ngClass]=\"!loginForm.valid || phoneError || captchaResponse == undefined ? 'opacity-50 pointer-events-none': ''\"\n            (click)=\"signUp()\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">\n            Create your account\n          </button>\n          <p class=\"text-left text-sm -mt-1 text-red-500\" *ngIf=\"signUpErrMessage.length > 0\">{{signUpErrMessage}}</p>\n        </div>\n      </form>\n    </div>\n\n    <div class=\"verify-email-view-body py-2 fadeInUp\" *ngIf=\"isVerifyEmailView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"link-sent fadeIn\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-4 text-gray-700 text-sm text-center secondary-header\">\n            We have sent a verification link on {{loginForm.value.email}}.<br> Please click the link to activate your account.\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resendVerifyEmail()\" [disabled]=\"!loginForm.valid\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Resend Verification Email\n          </button>\n          <div class=\"text-gray-700 text-sm text-center why-verify px-2 hover:underline cursor-pointer\">\n            <span\n              matTooltip=\"Townscript sends all important communication regarding your events & account-related updates via e-mail. We just want to make sure you don\u2019t miss these important information\"\n              matTooltipPosition=\"right\" matTooltipClass=\"ts-login-tooltip\">Why verify?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"agreement my-2\" *ngIf=\"isDefaultView || isSignUpView\">\n      <div class=\"w-full hor-linear-grad my-2\"></div>\n      <p class=\"text-xs text-center p-2 text-gray-800 px-5\">\n        By continuing, you agree to Townscript's\n        <a appDataAnalytics eventLabel=\"login-terms\" clickLocation=\"\" class=\"text-blue-700\" href=\"{{baseUrl}}terms-and-conditions\">terms of service</a>\n        and\n        <a appDataAnalytics eventLabel=\"login-policy\" clickLocation=\"\" class=\"text-blue-700\" href=\"{{baseUrl}}privacy-policy\">privacy policy</a>.\n      </p>\n    </div>\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            styles: ["@-webkit-keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ts-login-tooltip{background-color:#666;color:#fff;font-size:12px;opacity:.98;white-space:pre-line}.login-signup-view{max-height:90vh;overflow:hidden}.login-signup-view .color-blue{color:#3782c4}.login-signup-view .fadeIn .primary-header,.login-signup-view .fadeIn .secondary-header{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-name:fadeIn;animation-name:fadeIn}.login-signup-view .fadeIn .secondary-header{-webkit-animation-delay:.1s;animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.login-signup-view .fadeInUp .login-form .form-group:nth-child(1){-webkit-animation-delay:.1s;animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(3){-webkit-animation-delay:.3s;animation-delay:.3s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(4){-webkit-animation-delay:.4s;animation-delay:.4s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(5){-webkit-animation-delay:.5s;animation-delay:.5s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(6){-webkit-animation-delay:.6s;animation-delay:.6s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(7){-webkit-animation-delay:.7s;animation-delay:.7s}.login-signup-view .ts-loader{-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.login-signup-view .ts-loader circle{stroke-width:5%!important}.login-signup-view .view-body .blue-btn{background:#3782c4;color:#fff;-webkit-transition:.15s;transition:.15s}.login-signup-view .view-body .blue-btn:hover{background:#1369b5}.login-signup-view .view-body .default-view-body .strike-through-margin{margin:30px 0;text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em}.login-signup-view .view-body .default-view-body .strike-through-margin span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .strike-through{text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em;margin:30px auto}.login-signup-view .view-body .default-view-body .strike-through span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .logo{height:auto;width:25px}.login-signup-view .view-body .hor-linear-grad{height:1px;width:100%;background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0)),color-stop(48%,#e2e2e2),to(rgba(255,255,255,0)));background-image:linear-gradient(to bottom,rgba(255,255,255,0) 0,#e2e2e2 48%,rgba(255,255,255,0) 100%)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [UtilityService,
            CookieService,
            UserService,
            NotificationService,
            TsLoginSignupService,
            PlaceService,
            ActivatedRoute])
    ], TsLoginSignupComponent);
    return TsLoginSignupComponent;
}());
export { TsLoginSignupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELElBQU0sVUFBVSxHQUFHLHFFQUFxRSxDQUFDO0FBU3pGO0lBK0NJLGdDQUNZLGNBQThCLEVBQzlCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4QyxvQkFBMEMs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QUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQXpFUTtRQUFSLEtBQUssRUFBRTs7d0RBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7aUVBQTJDO0lBQzFDO1FBQVIsS0FBSyxFQUFFOztvRUFBb0U7SUFDbkU7UUFBUixLQUFLLEVBQUU7O3lEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7OzhEQUF3QjtJQUN0QjtRQUFULE1BQU0sRUFBRTs7K0RBQWtDO0lBSTNDO1FBREMsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzBDQUMxQyxrQkFBa0I7Z0VBQUM7SUFYeEIsc0JBQXNCO1FBUGxDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0Isdy9sQkFBK0M7WUFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3hDLENBQUM7aURBa0Q4QixjQUFjO1lBQ2YsYUFBYTtZQUNmLFdBQVc7WUFDSCxtQkFBbUI7WUFDbEIsb0JBQW9CO1lBQzVCLFlBQVk7WUFDVixjQUFjO09BdERqQyxzQkFBc0IsQ0F5VmxDO0lBQUQsNkJBQUM7Q0FBQSxBQXpWRCxJQXlWQztTQXpWWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBSZWNhcHRjaGFDb21wb25lbnQgfSBmcm9tICduZy1yZWNhcHRjaGEnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHNMb2dpblNpZ251cFNlcnZpY2UgfSBmcm9tICcuL3RzLWxvZ2luLXNpZ251cC5zZXJ2aWNlJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuY29uc3QgZW1haWxSZWdleCA9ICdeW2EtejAtOV0rKFxcLltfYS16MC05XSspKkBbYS16MC05LV0rKFxcLlthLXowLTktXSspKihcXC5bYS16XXsyLDE1fSkkJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdHMtbG9naW4tc2lnbnVwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90cy1sb2dpbi1zaWdudXAuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcblxuZXhwb3J0IGNsYXNzIFRzTG9naW5TaWdudXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBtb2RlOiBhbnk7XG4gICAgQElucHV0KCkgZGVmYXVsdEhlYWRlcjogYW55ID0gJ0xldFxcJ3MgZ2V0IHN0YXJ0ZWQnO1xuICAgIEBJbnB1dCgpIGRlZmF1bHRTdWJIZWFkZXI6IGFueSA9ICdZb3VyIG9uZSBzdG9wIHRvb2wgZm9yIG9yZ2FuaXppbmcgZXZlbnRzJztcbiAgICBASW5wdXQoKSByZHVybDogYW55O1xuICAgIEBJbnB1dCgpIHNob3dTb2NpYWw6IGFueSA9IHRydWU7XG4gICAgQE91dHB1dCgpIGNsb3NlRGlhbG9nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICBAVmlld0NoaWxkKCdyZWNhcHRjaGFSZWYnLCB7IHJlYWQ6IHRydWUsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIHJlY2FwdGNoYVJlZjogUmVjYXB0Y2hhQ29tcG9uZW50O1xuXG4gICAgY2FwdGNoYVRva2VuOiBhbnkgPSB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLkNBUFRDSEFfU0lURV9JTlZJU0lCTEVfQ0FQVENIQV9LRVk7XG5cbiAgICBzaG93ID0gZmFsc2U7XG4gICAgc2hvd1Bhc3N3b3JkID0gZmFsc2U7XG4gICAgaXNEZWZhdWx0VmlldyA9IHRydWU7XG4gICAgaXNTaWduSW5WaWV3ID0gZmFsc2U7XG4gICAgaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgaXNWZXJpZnlFbWFpbFZpZXcgPSBmYWxzZTtcbiAgICBzaG93UmVzZXRQYXNzd29yZCA9IGZhbHNlO1xuXG4gICAgdXNlclRpbWV6b25lOiBhbnkgPSBEYXRlVGltZS5sb2NhbCgpLnpvbmVOYW1lO1xuICAgIGxvZ2luRm9ybTogYW55O1xuICAgIGNhcHRjaGFSZXNwb25zZTogYW55O1xuICAgIGNvcnJlY3RQaG9uZU51bWJlcjogYW55ID0gbnVsbDtcbiAgICBwaG9uZUVycm9yID0gZmFsc2U7XG4gICAgc29jaWFsTG9naW5Nc2c6IGFueSA9IGZhbHNlO1xuICAgIGluaXRpYWxpemVUZWxJbnB1dDogYW55O1xuICAgIHNpZ25JbkVyck1lc3NhZ2UgPSAnJztcbiAgICByZXNldFB3ZExpbmtTZW50ID0gZmFsc2U7XG4gICAgc2lnblVwRXJyTWVzc2FnZSA9ICcnO1xuXG4gICAgZmJMb2dpblVSTCA9IGNvbmZpZy5iYXNlVXJsICsgJ2FwaS8nXG4gICAgICAgICsgJ3VzZXIvc2lnbmlud2l0aGZhY2Vib29rJyArICh0aGlzLnJkdXJsID09PSB1bmRlZmluZWQgPyAnJyA6ICc/cmR1cmw9JyArIHRoaXMucmR1cmwpO1xuICAgIGdvb2dsZUxvZ2luVVJMID0gY29uZmlnLmJhc2VVcmwgKyAnYXBpLydcbiAgICAgICAgKyAndXNlci9zaWduaW53aXRoZ29vZ2xlJyArICh0aGlzLnJkdXJsID09PSB1bmRlZmluZWQgPyAnJyA6ICc/cmR1cmw9JyArIHRoaXMucmR1cmwpO1xuICAgIGludGxJbnB1dDogYW55O1xuICAgIHNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICBsb2FkZXJUZXh0OiBhbnk7XG4gICAgY291bnRyeUNvZGU6IGFueSA9ICdJTic7XG4gICAgc3ViT2JqZWN0OiBhbnk7XG4gICAgc2hvd0NvbmZpcm1hdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGJhc2VVcmw6IGFueSA9IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UuYmFzZVVybDtcbiAgICB1c2VyTmFtZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdHNMb2dpblNpZ251cFNlcnZpY2U6IFRzTG9naW5TaWdudXBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgICAgICB0aGlzLnN1Yk9iamVjdCA9IHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2VEYXRhID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRyeUNvZGUgPSBwbGFjZURhdGFbJ2NvdW50cnknXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgaWYocGFyYW1zWydyZHVybCddKVxuICAgICAgICAgICAgdGhpcy5yZHVybCA9IHBhcmFtc1sncmR1cmwnXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1Yk9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1Yk9iamVjdC51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEZvcm0gPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICAnZnVsbE5hbWUnOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZCB9KSxcbiAgICAgICAgICAgICdlbWFpbCc6IG5ldyBGb3JtQ29udHJvbCgnJywgeyB2YWxpZGF0b3JzOiBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKGVtYWlsUmVnZXgpXSB9KSxcbiAgICAgICAgICAgICdwYXNzd29yZCc6IG5ldyBGb3JtQ29udHJvbCgnJywgeyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkIH0pLFxuICAgICAgICAgICAgJ3Bob25lTnVtYmVyJzogbmV3IEZvcm1Db250cm9sKCcnLCB7IHZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWQgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGhvbmVOdW1iZXInKS5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgY2xvc2UgPSAoc2lnbmVkSW4pOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZURpYWxvZy5lbWl0KHNpZ25lZEluKTtcbiAgICB9XG5cbiAgICBjbGVhckVycm9ycyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zb2NpYWxMb2dpbk1zZyA9ICcnO1xuICAgIH1cblxuICAgIHJlc29sdmUgPSAoY2FwdGNoYVJlc3BvbnNlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5jYXB0Y2hhUmVzcG9uc2UgPSBjYXB0Y2hhUmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcGFzc3dvcmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3c7XG4gICAgfVxuXG4gICAgdmVyaWZ5RW1haWwgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luRm9ybS5jb250cm9scy5lbWFpbC52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5nZXRVc2VyU2lnblVwRGV0YWlscyh0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIGxldCBuZXdEYXRhID0gcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICBuZXdEYXRhID0gSlNPTi5wYXJzZShyZXN1bHQuZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXhjZXB0aW9uIHdoaWxlIHBhcnNpbmcgYXBpIHJlc3BvbnNlIDogXCIgKyByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdEYXRhICYmIG5ld0RhdGEuaXNFeGlzdGluZ1VzZXIgJiYgbmV3RGF0YS5pc01hbnVhbFNpZ251cCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuU2lnbkluVmlldygpO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld0RhdGEgJiYgbmV3RGF0YS5pc0V4aXN0aW5nVXNlciAmJiAhbmV3RGF0YS5pc01hbnVhbFNpZ251cCkge1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxMb2dpbk1zZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5TaWduVXBWaWV3KCk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVUZWxJbnB1dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUludGxUZWxJbnB1dCgpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRpYWxpemVJbnRsVGVsSW5wdXQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgaW50bCB0ZWxcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGhvbmVOdW1iZXInKTtcbiAgICAgICAgdGhpcy5pbnRsSW5wdXQgPSAoPGFueT53aW5kb3cpLmludGxUZWxJbnB1dChpbnB1dCwge1xuICAgICAgICAgICAgaW5pdGlhbENvdW50cnk6IHRoaXMuY291bnRyeUNvZGUsXG4gICAgICAgICAgICBwcmVmZXJyZWRDb3VudHJpZXM6IFtcImluXCIsIFwiaWRcIiwgXCJzZ1wiLCBcIm15XCJdLFxuICAgICAgICAgICAgdXRpbFNjcmlwdHM6ICcuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaW50bC10ZWwtaW5wdXQvYnVpbGQvanMvdXRpbHMuanMnXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGVQaG9uZU51bWJlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmludGxJbnB1dC5pc1ZhbGlkTnVtYmVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGhvbmVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybS5jb250cm9scy5waG9uZU51bWJlci5zZXRFcnJvcnMoeyAndmFsaWQnOiBmYWxzZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzLnBob25lTnVtYmVyLnNldEVycm9ycygpO1xuICAgICAgICAgICAgdGhpcy5waG9uZUVycm9yID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaWduSW4gPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luRm9ybS52YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIGNvbnN0IHJldERhdGEgPSBhd2FpdCB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLmxvZ2luV2l0aFRvd25zY3JpcHQodGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWwsIHRoaXMubG9naW5Gb3JtLnZhbHVlLnBhc3N3b3JkKTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIGlmIChyZXREYXRhLnJlc3VsdCAhPSAnU3VjY2VzcycpIHtcbiAgICAgICAgICAgIHRoaXMuc2lnbkluRXJyTWVzc2FnZSA9IHJldERhdGEuZGF0YTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dDb25maXJtYXRpb24gPSB0cnVlO1xuICAgICAgICBjb25zdCB0b2tlbkRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogKHJldERhdGEuZGF0YSlcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHsgLi4ucmV0RGF0YS51c2VyRGV0YWlscywgLi4udG9rZW5EYXRhIH07XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSB1c2VyRGF0YS51c2VyO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJOYW1lKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS51cGRhdGVVc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgLy8gdGhpcy5jb29raWVTZXJ2aWNlLnNldENvb2tpZSgndG93bnNjcmlwdC11c2VyJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpLCA5MCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZGlhbG9nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDE0MDApO1xuXG4gICAgICAgIGlmICh0aGlzLnJkdXJsICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZHVybCA9IGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLnJkdXJsKTtcbiAgICAgICAgICAgIGxldCByZHVybCA9IHRoaXMucmR1cmwuc3BsaXQoXCI/XCIpLmxlbmd0aCA+IC0xID8gdGhpcy5yZHVybC5zcGxpdChcIj9cIilbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIj9cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnJkdXJsLnN1YnN0cmluZyh0aGlzLnJkdXJsLmluZGV4T2YoXCI/XCIpKzEpKVxuICAgICAgICAgICAgICA6IHRoaXMucmR1cmw7XG4gICAgICAgICAgICB3aW5kb3cub3BlbihyZHVybCwgJ19zZWxmJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaWduVXAgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICBpZiAoIXRoaXMubG9naW5Gb3JtLnZhbGlkIHx8IHRoaXMuY2FwdGNoYVJlc3BvbnNlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bob25lTnVtYmVyJyk7XG4gICAgICAgIGNvbnN0IGl0aSA9ICg8YW55PndpbmRvdykuaW50bFRlbElucHV0R2xvYmFscy5nZXRJbnN0YW5jZShpbnB1dCk7XG4gICAgICAgIHRoaXMuY29ycmVjdFBob25lTnVtYmVyID0gaXRpLmdldE51bWJlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvcnJlY3RQaG9uZU51bWJlciA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMucGhvbmVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gJ1BsZWFzZSB3YWl0IHdoaWxlIHdlIGFyZSBjcmVhdGluZyB5b3VyIGFjY291bnQuJztcblxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UucmVnaXN0ZXJXaXRoVG93bnNjcmlwdFdpdGhDYXB0Y2hhKHRoaXMuZ2V0Rm9ybURhdGFGb3JSZWdpc3RlcigpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4Y2VwdGlvbiB3aGlsZSBwYXJzaW5nIGFwaSByZXNwb25zZSA6IFwiICsgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YVsncmVzdWx0J10gPT0gJ0Vycm9yJykge1xuICAgICAgICAgICAgc2VsZi5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNpZ25VcEVyck1lc3NhZ2UgPSBkYXRhWydkYXRhJ107XG4gICAgICAgICAgICBsZXQgX3RoaXMgPSBzZWxmO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5pdGlhbGl6ZUludGxUZWxJbnB1dCgpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLm9wZW5WZXJpZnlFbWFpbFZpZXcoKTtcbiAgICB9XG5cbiAgICBnZXRGb3JtRGF0YUZvclJlZ2lzdGVyID0gKCk6IEZvcm1EYXRhID0+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgdGhpcy5sb2dpbkZvcm0udmFsdWUuZnVsbE5hbWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2VtYWlsaWQnLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGFzc3dvcmQnLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5wYXNzd29yZCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGhvbmUnLCB0aGlzLmNvcnJlY3RQaG9uZU51bWJlcik7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXNlcnRpbWV6b25lJywgdGhpcy51c2VyVGltZXpvbmUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3JlQ2FwdGNoYScsIHRoaXMuY2FwdGNoYVJlc3BvbnNlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd1c2VybmFtZScsIHRoaXMucmFuZG9tU3RyaW5nKDEwLCAnJykpO1xuICAgICAgICBpZiAodGhpcy5yZHVybCkge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdyZHVybCcsIHRoaXMucmR1cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtRGF0YTtcbiAgICB9XG5cbiAgICBmb3Jnb3RQYXNzd29yZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzd29yZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdvQmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHRoaXMub3BlblNpZ25JblZpZXcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2lnbkluVmlldyB8fCB0aGlzLmlzU2lnblVwVmlldyB8fCB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EZWZhdWx0VmlldygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuU2lnbkluVmlldyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb3BlblNpZ25VcFZpZXcgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEZWZhdWx0VmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvY2lhbExvZ2luTXNnID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bob25lTnVtYmVyJykuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgb3BlbkRlZmF1bHRWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwaG9uZU51bWJlcicpLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICBvcGVuVmVyaWZ5RW1haWxWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlc2V0UGFzc3dvcmQgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICB0aGlzLmxvYWRlclRleHQgPSAnU2VuZGluZyBSZXNldCBQYXNzd29yZCBMaW5rIHRvICcgKyB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbDtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2Uuc2VuZEZvcmdvdFB3ZEVtYWlsKHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsKTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0UHdkTGlua1NlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKCdSZXNldCBQYXNzd29yZCBMaW5rIGhhcyBiZWVuIHNlbnQnLCAyMDAwLCAnRGlzbWlzcycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRQd2RMaW5rU2VudCA9IHRydWU7XG5cblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VtYWlsJykpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdlbWFpbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VtYWlsJywgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnZhbHVlLnRyaW0oKSk7XG4gICAgfVxuXG4gICAgcmFuZG9tU3RyaW5nID0gKGxlbjogbnVtYmVyLCBhbjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgYW4gPSBhbiAmJiBhbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgc3RyID0gJycsIGkgPSAwO1xuICAgICAgICBjb25zdCBtaW4gPSBhbiA9PT0gJ2EnID8gMTAgOiAwO1xuICAgICAgICBjb25zdCBtYXggPSBhbiA9PT0gJ24nID8gMTAgOiA2MjtcbiAgICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIGxldCByID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluIDw8IDA7XG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyICs9IHIgPiA5ID8gciA8IDM2ID8gNTUgOiA2MSA6IDQ4KTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHJlc2VuZFZlcmlmeUVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gJ1NlbmRpbmcgVmVyaWZpY2F0aW9uIGVtYWlsIHRvICcgKyB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbDtcbiAgICAgICAgY29uc3QgcmV0RGF0YSA9IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UucmVzZW5kVmVyaWZpY2F0aW9uQ29kZSh0aGlzLnJkdXJsLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcygnVmVyaWZpY2F0aW9uIGVtYWlsIGhhcyBiZWVuIHNlbnQnLCAyMDAwLCAnRGlzbWlzcycpO1xuICAgIH1cblxuICAgIHRvZ2dsZVBhc3N3b3JkRGlzcGxheSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFzc3dvcmQgPSAhdGhpcy5zaG93UGFzc3dvcmQ7XG4gICAgICAgIGNvbnN0IHB3ZElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcHdkJyk7XG4gICAgICAgIHB3ZElucHV0LnR5cGUgPSB0aGlzLnNob3dQYXNzd29yZCA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XG4gICAgfVxuXG59XG4iXX0=