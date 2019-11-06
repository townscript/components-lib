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
        this.verifyEmail = function () { return tslib_1.__awaiter(_this_1, void 0, void 0, function () {
            var result, newData;
            var _this_1 = this;
            return tslib_1.__generator(this, function (_a) {
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
            var retData, tokenData, userData;
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
                        tokenData = {
                            token: (retData.data)
                        };
                        userData = tslib_1.__assign({}, retData.userDetails, tokenData);
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
                _this_1.close();
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
            var placeData = JSON.parse(res);
            _this_1.countryCode = placeData['country'];
        });
    };
    TsLoginSignupComponent.prototype.ngOnDestroy = function () {
        if (this.subObject != undefined) {
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
            template: "<div class=\"login-signup-view px-5\" id=\"login-signup-view\">\n  <div class=\"view-header\">\n    <div class=\"back-button text-gray-700 text-xl md:text-2xl lg:text-3xl -ml-1\" *ngIf=\"mode == 'dialog'\">\n      <i class=\"mdi mdi-arrow-left cursor-pointer\" (click)=\"goBack()\"></i>\n    </div>\n    <div class=\"initial-header flex flex-col fadeIn\" *ngIf=\"isDefaultView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">{{defaultHeader}}</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">{{defaultSubHeader}}</div>\n    </div>\n    <div class=\"sign-in-header flex flex-col fadeIn\" *ngIf=\"isSignInView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign In</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"forgot-pwd-header flex flex-col fadeIn\" *ngIf=\"showResetPassword\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Forgot Password?</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Don\u2019t worry, we\u2019ll help you reset it\n      </div>\n    </div>\n\n    <div class=\"sign-up-header flex flex-col fadeIn\" *ngIf=\"isSignUpView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign Up</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"verify-email-header flex flex-col fadeIn\" *ngIf=\"isVerifyEmailView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">You're almost done</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">We just need to verify your e-mail</div>\n    </div>\n  </div>\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10\" *ngIf=\"showLoader\">\n    <mat-spinner></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\">{{loaderText}}</div>\n  </div>\n  <div class=\"view-body pt-5\" *ngIf=\"!showLoader\">\n    <div class=\"default-view-body py-2 fadeInUp\" *ngIf=\"isDefaultView\">\n      <form id=\"loginForm\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\" (ngModelChange)=\"clearErrors()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group w-full text-center\">\n          <button matRipple (click)=\"verifyEmail()\" [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Continue\n          </button>\n        </div>\n\n        <div class=\"form-group strike-through strike-through-margin\">\n          <div class=\"text-gray-700 text-base md:text-lg lg:text-xl\">\n            <span class=\"or-text\">OR</span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n            <a [href]=\"googleLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n                ts-data-analytics prop-event=\"click\" eventLabel=\"Login with Google\"\n                prop-clicked-location=\"Sign In\" matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/google-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Google</span>\n                </div>\n            </a>\n            <p class=\"form-control--error\" ng-if=\"googleError.length\" ng-bind=\"googleError\"></p>\n        </div>\n        <div class=\"form-group\">\n            <a [href]=\"fbLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n                ts-data-analytics prop-event=\"click\" eventLabel=\"Login with Facebook\"\n                prop-clicked-location=\"Sign In\" matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/facebook-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Facebook</span>\n                </div>\n            </a>\n            <ng-container class=\"login-error\" ng-if=\"fbError.length\">\n                <i class=\"ion-android-alert\"></i>\n                <p class=\"form-control--error\" ng-bind=\"fbError\"></p>\n            </ng-container>\n        </div>\n\n      </form>\n    </div>\n    <div class=\"signin-view-body py-2 fadeInUp\" *ngIf=\"isSignInView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <p class=\"text-left text-sm text-red-500 -mt-3 mb-2\" *ngIf=\"signInErrMessage.length > 0\">{{signInErrMessage}}</p>\n          <button matRipple (click)=\"signIn()\" [ngClass]=\"!loginForm.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Sign In\n          </button>\n          <div class=\"text-sm text-center text-gray-700 p-1\">\n            <span class=\"cursor-pointer hover:underline\" (click)=\"forgotPassword()\">Forgot Password?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"reset-pwd-view-body py-2 fadeInUp\" *ngIf=\"showResetPassword\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center\" *ngIf=\"!resetPwdLinkSent\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"link-sent fadeIn\" *ngIf=\"resetPwdLinkSent\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-2 text-gray-700 text-sm text-center secondary-header\">Password reset link has been sent to\n            {{loginForm.value.email}}</div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resetPassword()\"\n            [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Send Reset Password Link\n          </button>\n          <div (click)=\"resetPassword()\"\n            class=\"color-blue font-semibold text-sm text-center resend-email py-2 px-2 hover:underline cursor-pointer\"\n            *ngIf=\"resetPwdLinkSent\">\n            Resend Email\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"signup-view-body py-2 fadeInUp\" *ngIf=\"isSignUpView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"fullName\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"name\" type=\"text\" placeholder=\"Full Name\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('fullName').hasError('required') && (loginForm.get('fullName').dirty || loginForm.get('fullName').touched)\">\n              Full Name is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center relative z-50\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative z-50\" floatLabel=\"always\">\n              <input type=\"tel\" formControlName=\"phoneNumber\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10\"\n                id=\"phoneNumber\" placeholder=\"Phone no.\" (ngModelChange)=\"validatePhoneNumber()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\"\n              *ngIf=\"loginForm.get('phoneNumber').hasError('required') && (loginForm.get('phoneNumber').dirty || loginForm.get('phoneNumber').touched)\">\n              Phone Number is required\n            </p>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\" *ngIf=\"phoneError\">Please enter a valid Phone no.</p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center mb-3 relative z-0\">\n            <div class=\"w-full flex items-center justify-center md:justify-start\">\n                <re-captcha\n                  (resolved)=\"resolve($event)\"\n                  [siteKey]=\"captchaToken\">\n                </re-captcha>\n            </div>\n        </div>\n        <div class=\"w-full text-center form-group relative z-0\">\n          <button matRipple\n            [ngClass]=\"!loginForm.valid || phoneError || captchaResponse == undefined ? 'opacity-50 pointer-events-none': ''\"\n            (click)=\"signUp()\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">\n            Create your account\n          </button>\n          <p class=\"text-left text-sm -mt-1 text-red-500\" *ngIf=\"signUpErrMessage.length > 0\">{{signUpErrMessage}}</p>\n        </div>\n      </form>\n    </div>\n\n    <div class=\"verify-email-view-body py-2 fadeInUp\" *ngIf=\"isVerifyEmailView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"link-sent fadeIn\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-4 text-gray-700 text-sm text-center secondary-header\">\n            Tap the link in the email we sent you at {{loginForm.value.email}}\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resendVerifyEmail()\" [disabled]=\"!loginForm.valid\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Resend Verification Email\n          </button>\n          <div class=\"text-gray-700 text-sm text-center why-verify px-2 hover:underline cursor-pointer\">\n            <span\n              matTooltip=\"Townscript sends all important communication regarding your events & account-related updates via e-mail. We just want to make sure you don\u2019t miss these important information\"\n              matTooltipPosition=\"right\" matTooltipClass=\"ts-login-tooltip\">Why verify?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"agreement my-2\" *ngIf=\"isDefaultView || isSignUpView\">\n      <div class=\"w-full hor-linear-grad my-2\"></div>\n      <p class=\"text-xs text-center p-2 text-gray-800 px-5\">\n        By continuing, you agree to Townscript's\n        <a class=\"text-blue-700\" href=\"/terms-and-conditions\">terms of service</a>\n        and\n        <a class=\"text-blue-700\" href=\"/privacy-policy\">privacy policy</a>.\n      </p>\n    </div>\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            styles: ["@-webkit-keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0)}to{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ts-login-tooltip{background-color:#666;color:#fff;font-size:12px;opacity:.98;white-space:pre-line}.login-signup-view{max-height:90vh;overflow:hidden}.login-signup-view .color-blue{color:#3782c4}.login-signup-view .fadeIn .primary-header,.login-signup-view .fadeIn .secondary-header{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-name:fadeIn;animation-name:fadeIn}.login-signup-view .fadeIn .secondary-header{-webkit-animation-delay:.1s;animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.login-signup-view .fadeInUp .login-form .form-group:nth-child(1){-webkit-animation-delay:.1s;animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(3){-webkit-animation-delay:.3s;animation-delay:.3s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(4){-webkit-animation-delay:.4s;animation-delay:.4s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(5){-webkit-animation-delay:.5s;animation-delay:.5s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(6){-webkit-animation-delay:.6s;animation-delay:.6s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(7){-webkit-animation-delay:.7s;animation-delay:.7s}.login-signup-view .ts-loader{-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.login-signup-view .ts-loader circle{stroke-width:5%!important}.login-signup-view .view-body .blue-btn{background:#3782c4;color:#fff;-webkit-transition:.15s;transition:.15s}.login-signup-view .view-body .blue-btn:hover{background:#1369b5}.login-signup-view .view-body .default-view-body .strike-through-margin{margin:30px 0;text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em}.login-signup-view .view-body .default-view-body .strike-through-margin span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .strike-through{text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em;margin:30px auto}.login-signup-view .view-body .default-view-body .strike-through span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .logo{height:auto;width:25px}.login-signup-view .view-body .hor-linear-grad{height:1px;width:100%;background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0)),color-stop(48%,#e2e2e2),to(rgba(255,255,255,0)));background-image:linear-gradient(to bottom,rgba(255,255,255,0) 0,#e2e2e2 48%,rgba(255,255,255,0) 100%)}"]
        }),
        tslib_1.__metadata("design:paramtypes", [CookieService,
            UserService,
            NotificationService,
            TsLoginSignupService,
            PlaceService])
    ], TsLoginSignupComponent);
    return TsLoginSignupComponent;
}());
export { TsLoginSignupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUUvRSxJQUFNLFVBQVUsR0FBRyxxRUFBcUUsQ0FBQztBQVN6RjtJQTRDSSxnQ0FDWSxhQUE0QixFQUM1QixXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLFlBQTBCO1FBTHRDLG1CQU1LO1FBTE8sa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBOUM3QixrQkFBYSxHQUFRLG9CQUFvQixDQUFDO1FBQzFDLHFCQUFnQixHQUFRLDBDQUEwQyxDQUFDO1FBRW5FLGVBQVUsR0FBUSxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTNDLGlCQUFZLEdBQVEsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtDQUFrQyxDQUFDO1FBRWpGLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRTFCLGlCQUFZLEdBQVEsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUc5Qyx1QkFBa0IsR0FBUSxJQUFJLENBQUM7UUFDL0IsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixtQkFBYyxHQUFRLEtBQUssQ0FBQztRQUU1QixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUV0QixlQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNO2NBQzlCLHlCQUF5QixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRixtQkFBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTTtjQUNsQyx1QkFBdUIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekYsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVuQixnQkFBVyxHQUFRLElBQUksQ0FBQztRQXlCeEIsYUFBUSxHQUFHO1lBQ1AsT0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztnQkFDM0IsVUFBVSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BFLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNuRyxVQUFVLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDcEUsYUFBYSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDMUUsQ0FBQyxDQUFDO1lBQ0gsT0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsT0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsT0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEQsQ0FBQyxDQUFBO1FBRUQsVUFBSyxHQUFHO1lBQ0osT0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFBO1FBRUQsZ0JBQVcsR0FBRztZQUNWLE9BQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQTtRQUVELFlBQU8sR0FBRyxVQUFDLGVBQXVCO1lBQzlCLE9BQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQzNDLENBQUMsQ0FBQTtRQUVELGFBQVEsR0FBRztZQUNQLE9BQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFJLENBQUMsSUFBSSxDQUFDO1FBQzNCLENBQUMsQ0FBQTtRQUVELGdCQUFXLEdBQUc7Ozs7Ozt3QkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTs0QkFDdEMsc0JBQU87eUJBQ1Y7d0JBQ2MscUJBQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBekYsTUFBTSxHQUFHLFNBQWdGO3dCQUMzRixPQUFPLEdBQUcsTUFBTSxDQUFDO3dCQUNyQixJQUFJOzRCQUNBLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDckM7d0JBQUMsT0FBTyxDQUFDLEVBQUU7NEJBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsR0FBRSxNQUFNLENBQUMsQ0FBQzt5QkFDbEU7d0JBQ0QsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFOzRCQUM3RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7eUJBQ3pCOzZCQUFNLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxjQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFOzRCQUNyRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzt5QkFDOUI7NkJBQU07NEJBQ0gsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzRCQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDO2dDQUNqQyxPQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzs0QkFDbEMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3lCQUNYOzs7O2FBQ0osQ0FBQTtRQUVELDJCQUFzQixHQUFHO1lBQ3JCLHNCQUFzQjtZQUN0QixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JELE9BQUksQ0FBQyxTQUFTLEdBQVMsTUFBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7Z0JBQy9DLGNBQWMsRUFBRSxPQUFJLENBQUMsV0FBVztnQkFDaEMsV0FBVyxFQUFFLGlFQUFpRTthQUNqRixDQUFDLENBQUM7UUFFUCxDQUFDLENBQUE7UUFFRCx3QkFBbUIsR0FBRztZQUNsQixJQUFJLENBQUMsT0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDakMsT0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLE9BQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNyRTtpQkFBTTtnQkFDSCxPQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hELE9BQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQzNCO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsV0FBTSxHQUFHOzs7Ozt3QkFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7NEJBQ3ZCLHNCQUFPO3lCQUNWO3dCQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO3dCQUNQLHFCQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUE7O3dCQUF4SCxPQUFPLEdBQUcsU0FBOEc7d0JBQzlILElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO3dCQUN4QixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksU0FBUyxFQUFFOzRCQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDckMsc0JBQU87eUJBQ1Y7d0JBQ0ssU0FBUyxHQUFHOzRCQUNkLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7eUJBQ3hCLENBQUM7d0JBRUksUUFBUSx3QkFBUSxPQUFPLENBQUMsV0FBVyxFQUFLLFNBQVMsQ0FBRSxDQUFDO3dCQUMxRCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDOUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ2pGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7NEJBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt5QkFDaEI7d0JBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFBRTs0QkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3lCQUNwQzs7OzthQUNKLENBQUE7UUFFRCxXQUFNLEdBQUc7Ozs7O3dCQUNDLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDL0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO3dCQUNyRixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxTQUFTLEVBQUU7NEJBQzVELHNCQUFPO3lCQUNWO3dCQUNLLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUMvQyxHQUFHLEdBQVMsTUFBTyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFFMUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssRUFBRSxFQUFFOzRCQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs0QkFDdkIsc0JBQU87eUJBQ1Y7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsaURBQWlELENBQUM7d0JBRXpELHFCQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFBOzt3QkFBdkcsSUFBSSxHQUFHLFNBQWdHO3dCQUMzRyxJQUFJOzRCQUNBLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUMzQjt3QkFBQyxPQUFPLENBQUMsRUFBRTs0QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxHQUFFLElBQUksQ0FBQyxDQUFDO3lCQUNoRTt3QkFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLEVBQUU7NEJBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDOzRCQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNqQyxVQUFRLElBQUksQ0FBQzs0QkFDakIsVUFBVSxDQUFDO2dDQUNQLE9BQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDOzRCQUNuQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ1Isc0JBQU87eUJBQ1Y7d0JBQ0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Ozs7YUFDOUIsQ0FBQTtRQUVELDJCQUFzQixHQUFHO1lBQ3JCLElBQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25ELFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE9BQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNuRCxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxPQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksT0FBSSxDQUFDLEtBQUssRUFBRTtnQkFDWixRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUE7UUFFRCxtQkFBYyxHQUFHO1lBQ2IsT0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsT0FBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM5QixPQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixPQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDLENBQUE7UUFFRCxXQUFNLEdBQUc7WUFDTCxJQUFJLE9BQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDMUIsT0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3ZCO2lCQUFNLElBQUksT0FBSSxDQUFDLFlBQVksSUFBSSxPQUFJLENBQUMsWUFBWSxJQUFJLE9BQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDekUsT0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQzFCO2lCQUFNO2dCQUNILE9BQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQTtRQUVELG1CQUFjLEdBQUc7WUFDYixPQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQy9CLE9BQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE9BQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE9BQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hDLE9BQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLE9BQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLE9BQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQTtRQUVELG1CQUFjLEdBQUc7WUFDYixPQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixPQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixPQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixPQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixPQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixPQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QyxPQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QyxPQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQyxDQUFDLENBQUE7UUFFRCxvQkFBZSxHQUFHO1lBQ2QsT0FBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQixPQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixPQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQy9CLE9BQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE9BQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLE9BQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pDLE9BQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pDLE9BQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hELENBQUMsQ0FBQTtRQUVELHdCQUFtQixHQUFHO1lBQ2xCLE9BQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsT0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsT0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsT0FBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQyxDQUFBO1FBRUQsa0JBQWEsR0FBRzs7Ozs7d0JBQ1osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDL0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxpQ0FBaUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7d0JBQ3BFLHFCQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQXJGLElBQUksR0FBRyxTQUE4RTt3QkFDM0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7d0JBQ3hCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFOzRCQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLG1DQUFtQyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzt5QkFDMUY7d0JBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQzs7OzthQUNoQyxDQUFBO1FBRUQsaUJBQVksR0FBRyxVQUFDLEdBQVcsRUFBRSxFQUFVO1lBQ25DLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVCLElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQU0sR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQU0sR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0QsQ0FBQyxFQUFFLENBQUM7YUFDUDtZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxDQUFBO1FBRUQsc0JBQWlCLEdBQUc7OztnQkFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQzFFLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekcsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7YUFDekYsQ0FBQTtRQUVELDBCQUFxQixHQUFHO1lBQ3BCLE9BQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxPQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3ZDLElBQU0sUUFBUSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDNUQsQ0FBQyxDQUFBO0lBclFHLENBQUM7SUFFTCx5Q0FBUSxHQUFSO1FBQUEsbUJBTUM7UUFMRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFRO1lBQ3hELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsT0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNENBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7SUE5RFE7UUFBUixLQUFLLEVBQUU7O3dEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7O2lFQUEyQztJQUMxQztRQUFSLEtBQUssRUFBRTs7b0VBQW9FO0lBQ25FO1FBQVIsS0FBSyxFQUFFOzt5REFBWTtJQUNYO1FBQVIsS0FBSyxFQUFFOzs4REFBd0I7SUFDdEI7UUFBVCxNQUFNLEVBQUU7OytEQUFrQztJQUkzQztRQURDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzswQ0FDMUMsa0JBQWtCO2dFQUFDO0lBWHhCLHNCQUFzQjtRQVBsQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLHl6akJBQStDO1lBRS9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztTQUN4QyxDQUFDO2lEQStDNkIsYUFBYTtZQUNmLFdBQVc7WUFDSCxtQkFBbUI7WUFDbEIsb0JBQW9CO1lBQzVCLFlBQVk7T0FqRDdCLHNCQUFzQixDQXlUbEM7SUFBRCw2QkFBQztDQUFBLEFBelRELElBeVRDO1NBelRZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IFJlY2FwdGNoYUNvbXBvbmVudCB9IGZyb20gJ25nLXJlY2FwdGNoYSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUc0xvZ2luU2lnbnVwU2VydmljZSB9IGZyb20gJy4vdHMtbG9naW4tc2lnbnVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UnO1xuXG5jb25zdCBlbWFpbFJlZ2V4ID0gJ15bYS16MC05XSsoXFwuW19hLXowLTldKykqQFthLXowLTktXSsoXFwuW2EtejAtOS1dKykqKFxcLlthLXpdezIsMTV9KSQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC10cy1sb2dpbi1zaWdudXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90cy1sb2dpbi1zaWdudXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuXG5leHBvcnQgY2xhc3MgVHNMb2dpblNpZ251cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG1vZGU6IGFueTtcbiAgICBASW5wdXQoKSBkZWZhdWx0SGVhZGVyOiBhbnkgPSAnTGV0XFwncyBnZXQgc3RhcnRlZCc7XG4gICAgQElucHV0KCkgZGVmYXVsdFN1YkhlYWRlcjogYW55ID0gJ1lvdXIgb25lIHN0b3AgdG9vbCBmb3Igb3JnYW5pemluZyBldmVudHMnO1xuICAgIEBJbnB1dCgpIHJkdXJsOiBhbnk7XG4gICAgQElucHV0KCkgc2hvd1NvY2lhbDogYW55ID0gdHJ1ZTtcbiAgICBAT3V0cHV0KCkgY2xvc2VEaWFsb2cgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAgIEBWaWV3Q2hpbGQoJ3JlY2FwdGNoYVJlZicsIHsgcmVhZDogdHJ1ZSwgc3RhdGljOiB0cnVlIH0pXG4gICAgcmVjYXB0Y2hhUmVmOiBSZWNhcHRjaGFDb21wb25lbnQ7XG5cbiAgICBjYXB0Y2hhVG9rZW46IGFueSA9IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UuQ0FQVENIQV9TSVRFX0lOVklTSUJMRV9DQVBUQ0hBX0tFWTtcblxuICAgIHNob3cgPSBmYWxzZTtcbiAgICBzaG93UGFzc3dvcmQgPSBmYWxzZTtcbiAgICBpc0RlZmF1bHRWaWV3ID0gdHJ1ZTtcbiAgICBpc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICBpc1NpZ25VcFZpZXcgPSBmYWxzZTtcbiAgICBpc1ZlcmlmeUVtYWlsVmlldyA9IGZhbHNlO1xuICAgIHNob3dSZXNldFBhc3N3b3JkID0gZmFsc2U7XG5cbiAgICB1c2VyVGltZXpvbmU6IGFueSA9IERhdGVUaW1lLmxvY2FsKCkuem9uZU5hbWU7XG4gICAgbG9naW5Gb3JtOiBhbnk7XG4gICAgY2FwdGNoYVJlc3BvbnNlOiBhbnk7XG4gICAgY29ycmVjdFBob25lTnVtYmVyOiBhbnkgPSBudWxsO1xuICAgIHBob25lRXJyb3IgPSBmYWxzZTtcbiAgICBzb2NpYWxMb2dpbk1zZzogYW55ID0gZmFsc2U7XG4gICAgaW5pdGlhbGl6ZVRlbElucHV0OiBhbnk7XG4gICAgc2lnbkluRXJyTWVzc2FnZSA9ICcnO1xuICAgIHJlc2V0UHdkTGlua1NlbnQgPSBmYWxzZTtcbiAgICBzaWduVXBFcnJNZXNzYWdlID0gJyc7XG5cbiAgICBmYkxvZ2luVVJMID0gY29uZmlnLmJhc2VVcmwgKyAnYXBpLydcbiAgICAgICAgKyAndXNlci9zaWduaW53aXRoZmFjZWJvb2snICsgKHRoaXMucmR1cmwgPT09IHVuZGVmaW5lZCA/ICcnIDogJz9yZHVybD0nICsgdGhpcy5yZHVybCk7XG4gICAgZ29vZ2xlTG9naW5VUkwgPSBjb25maWcuYmFzZVVybCArICdhcGkvJ1xuICAgICAgICArICd1c2VyL3NpZ25pbndpdGhnb29nbGUnICsgKHRoaXMucmR1cmwgPT09IHVuZGVmaW5lZCA/ICcnIDogJz9yZHVybD0nICsgdGhpcy5yZHVybCk7XG4gICAgaW50bElucHV0OiBhbnk7XG4gICAgc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgIGxvYWRlclRleHQ6IGFueTtcbiAgICBjb3VudHJ5Q29kZTogYW55ID0gJ0lOJztcbiAgICBzdWJPYmplY3Q6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdHNMb2dpblNpZ251cFNlcnZpY2U6IFRzTG9naW5TaWdudXBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgICAgIHRoaXMuc3ViT2JqZWN0ID0gdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxhY2VEYXRhID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgdGhpcy5jb3VudHJ5Q29kZSA9IHBsYWNlRGF0YVsnY291bnRyeSddO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3ViT2JqZWN0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWJPYmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGb3JtID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmxvZ2luRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgICAgICAgJ2Z1bGxOYW1lJzogbmV3IEZvcm1Db250cm9sKCcnLCB7IHZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWQgfSksXG4gICAgICAgICAgICAnZW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybihlbWFpbFJlZ2V4KV0gfSksXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZCB9KSxcbiAgICAgICAgICAgICdwaG9uZU51bWJlcic6IG5ldyBGb3JtQ29udHJvbCgnJywgeyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkIH0pXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2Z1bGxOYW1lJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bhc3N3b3JkJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bob25lTnVtYmVyJykuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIGNsb3NlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlRGlhbG9nLmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgY2xlYXJFcnJvcnMgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSAnJztcbiAgICB9XG5cbiAgICByZXNvbHZlID0gKGNhcHRjaGFSZXNwb25zZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuY2FwdGNoYVJlc3BvbnNlID0gY2FwdGNoYVJlc3BvbnNlO1xuICAgIH1cblxuICAgIHBhc3N3b3JkID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93O1xuICAgIH1cblxuICAgIHZlcmlmeUVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbkZvcm0uY29udHJvbHMuZW1haWwudmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLmdldFVzZXJTaWduVXBEZXRhaWxzKHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsKTtcbiAgICAgICAgbGV0IG5ld0RhdGEgPSByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBuZXdEYXRhID0gSlNPTi5wYXJzZShyZXN1bHQuZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXhjZXB0aW9uIHdoaWxlIHBhcnNpbmcgYXBpIHJlc3BvbnNlIDogXCIrIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0RhdGEgJiYgbmV3RGF0YS5pc0V4aXN0aW5nVXNlciAmJiBuZXdEYXRhLmlzTWFudWFsU2lnbnVwKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5TaWduSW5WaWV3KCk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3RGF0YSAmJiBuZXdEYXRhLmlzRXhpc3RpbmdVc2VyICYmICFuZXdEYXRhLmlzTWFudWFsU2lnbnVwKSB7XG4gICAgICAgICAgICB0aGlzLnNvY2lhbExvZ2luTXNnID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlblNpZ25VcFZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRlbElucHV0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplSW50bFRlbElucHV0KCk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUludGxUZWxJbnB1dCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBpbnRsIHRlbFxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwaG9uZU51bWJlcicpO1xuICAgICAgICB0aGlzLmludGxJbnB1dCA9ICg8YW55PndpbmRvdykuaW50bFRlbElucHV0KGlucHV0LCB7XG4gICAgICAgICAgICBpbml0aWFsQ291bnRyeTogdGhpcy5jb3VudHJ5Q29kZSxcbiAgICAgICAgICAgIHV0aWxTY3JpcHRzOiAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ludGwtdGVsLWlucHV0L2J1aWxkL2pzL3V0aWxzLmpzJ1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHZhbGlkYXRlUGhvbmVOdW1iZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbnRsSW5wdXQuaXNWYWxpZE51bWJlcigpKSB7XG4gICAgICAgICAgICB0aGlzLnBob25lRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm0uY29udHJvbHMucGhvbmVOdW1iZXIuc2V0RXJyb3JzKHsgJ3ZhbGlkJzogZmFsc2UgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybS5jb250cm9scy5waG9uZU51bWJlci5zZXRFcnJvcnMoKTtcbiAgICAgICAgICAgIHRoaXMucGhvbmVFcnJvciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2lnbkluID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbkZvcm0udmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xuICAgICAgICBjb25zdCByZXREYXRhID0gYXdhaXQgdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5sb2dpbldpdGhUb3duc2NyaXB0KHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5wYXNzd29yZCk7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICBpZiAocmV0RGF0YS5yZXN1bHQgIT0gJ1N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICB0aGlzLnNpZ25JbkVyck1lc3NhZ2UgPSByZXREYXRhLmRhdGE7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG9rZW5EYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IChyZXREYXRhLmRhdGEpXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7IC4uLnJldERhdGEudXNlckRldGFpbHMsIC4uLnRva2VuRGF0YSB9O1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIodXNlckRhdGEpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0Q29va2llKCd0b3duc2NyaXB0LXVzZXInLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSksIDkwKTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoJ0NvbmdyYXRzISBZb3UgYXJlIHNpZ25lZCBpbicsIDIwMDAsICdEaXNtaXNzJyk7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdkaWFsb2cnKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmR1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB3aW5kb3cub3Blbih0aGlzLnJkdXJsLCAnX3NlbGYnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNpZ25VcCA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2Z1bGxOYW1lJykuc2V0VmFsdWUodGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbkZvcm0udmFsaWQgfHwgdGhpcy5jYXB0Y2hhUmVzcG9uc2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGhvbmVOdW1iZXInKTtcbiAgICAgICAgY29uc3QgaXRpID0gKDxhbnk+d2luZG93KS5pbnRsVGVsSW5wdXRHbG9iYWxzLmdldEluc3RhbmNlKGlucHV0KTtcbiAgICAgICAgdGhpcy5jb3JyZWN0UGhvbmVOdW1iZXIgPSBpdGkuZ2V0TnVtYmVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29ycmVjdFBob25lTnVtYmVyID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5waG9uZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvYWRlclRleHQgPSAnUGxlYXNlIHdhaXQgd2hpbGUgd2UgYXJlIGNyZWF0aW5nIHlvdXIgYWNjb3VudC4nO1xuXG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5yZWdpc3RlcldpdGhUb3duc2NyaXB0V2l0aENhcHRjaGEodGhpcy5nZXRGb3JtRGF0YUZvclJlZ2lzdGVyKCkpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXhjZXB0aW9uIHdoaWxlIHBhcnNpbmcgYXBpIHJlc3BvbnNlIDogXCIrIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGFbJ3Jlc3VsdCddID09ICdFcnJvcicpIHtcbiAgICAgICAgICAgIHNlbGYuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5zaWduVXBFcnJNZXNzYWdlID0gZGF0YVsnZGF0YSddO1xuICAgICAgICAgICAgbGV0IF90aGlzID0gc2VsZjtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmluaXRpYWxpemVJbnRsVGVsSW5wdXQoKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5vcGVuVmVyaWZ5RW1haWxWaWV3KCk7XG4gICAgfVxuXG4gICAgZ2V0Rm9ybURhdGFGb3JSZWdpc3RlciA9ICgpOiBGb3JtRGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIHRoaXMubG9naW5Gb3JtLnZhbHVlLmZ1bGxOYW1lKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdlbWFpbGlkJywgdGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWwpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bhc3N3b3JkJywgdGhpcy5sb2dpbkZvcm0udmFsdWUucGFzc3dvcmQpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob25lJywgdGhpcy5jb3JyZWN0UGhvbmVOdW1iZXIpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3VzZXJ0aW1lem9uZScsIHRoaXMudXNlclRpbWV6b25lKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdyZUNhcHRjaGEnLCB0aGlzLmNhcHRjaGFSZXNwb25zZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXNlcm5hbWUnLCB0aGlzLnJhbmRvbVN0cmluZygxMCwgJycpKTtcbiAgICAgICAgaWYgKHRoaXMucmR1cmwpIHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncmR1cmwnLCB0aGlzLnJkdXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybURhdGE7XG4gICAgfVxuXG4gICAgZm9yZ290UGFzc3dvcmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dTb2NpYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnb0JhY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNob3dSZXNldFBhc3N3b3JkKSB7XG4gICAgICAgICAgdGhpcy5vcGVuU2lnbkluVmlldygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTaWduSW5WaWV3IHx8IHRoaXMuaXNTaWduVXBWaWV3IHx8IHRoaXMuaXNWZXJpZnlFbWFpbFZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkRlZmF1bHRWaWV3KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuU2lnbkluVmlldyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb3BlblNpZ25VcFZpZXcgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEZWZhdWx0VmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvY2lhbExvZ2luTXNnID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bob25lTnVtYmVyJykuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgb3BlbkRlZmF1bHRWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwaG9uZU51bWJlcicpLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICBvcGVuVmVyaWZ5RW1haWxWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlc2V0UGFzc3dvcmQgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICB0aGlzLmxvYWRlclRleHQgPSAnU2VuZGluZyBSZXNldCBQYXNzd29yZCBMaW5rIHRvICcgKyB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbDtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2Uuc2VuZEZvcmdvdFB3ZEVtYWlsKHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsKTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0UHdkTGlua1NlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKCdSZXNldCBQYXNzd29yZCBMaW5rIGhhcyBiZWVuIHNlbnQnLCAyMDAwLCAnRGlzbWlzcycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRQd2RMaW5rU2VudCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmFuZG9tU3RyaW5nID0gKGxlbjogbnVtYmVyLCBhbjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgYW4gPSBhbiAmJiBhbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgc3RyID0gJycsIGkgPSAwO1xuICAgICAgICBjb25zdCBtaW4gPSBhbiA9PT0gJ2EnID8gMTAgOiAwO1xuICAgICAgICBjb25zdCBtYXggPSBhbiA9PT0gJ24nID8gMTAgOiA2MjtcbiAgICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIGxldCByID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluIDw8IDA7XG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyICs9IHIgPiA5ID8gciA8IDM2ID8gNTUgOiA2MSA6IDQ4KTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHJlc2VuZFZlcmlmeUVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gJ1NlbmRpbmcgVmVyaWZpY2F0aW9uIGVtYWlsIHRvICcgKyB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbDtcbiAgICAgICAgY29uc3QgcmV0RGF0YSA9IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UucmVzZW5kVmVyaWZpY2F0aW9uQ29kZSh0aGlzLnJkdXJsLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcygnVmVyaWZpY2F0aW9uIGVtYWlsIGhhcyBiZWVuIHNlbnQnLCAyMDAwLCAnRGlzbWlzcycpO1xuICAgIH1cblxuICAgIHRvZ2dsZVBhc3N3b3JkRGlzcGxheSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFzc3dvcmQgPSAhdGhpcy5zaG93UGFzc3dvcmQ7XG4gICAgICAgIGNvbnN0IHB3ZElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcHdkJyk7XG4gICAgICAgIHB3ZElucHV0LnR5cGUgPSB0aGlzLnNob3dQYXNzd29yZCA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XG4gICAgfVxuXG59XG4iXX0=