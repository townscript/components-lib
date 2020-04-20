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
                        if (newData && newData.isExistingUser && newData.isManualSignup && !newData.isTemporaryUser) {
                            this.openSignInView();
                        }
                        else if (newData && newData.isExistingUser && !newData.isManualSignup && !newData.isTemporaryUser) {
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
            var retData, tokenData, userData, isOrganizer;
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
            if (params['rdurl']) {
                _this_1.rdurl = params['rdurl'];
                _this_1.rdurl = decodeURIComponent(_this_1.rdurl);
                _this_1.rdurl = _this_1.rdurl.replace("[", "%5B");
                _this_1.rdurl = _this_1.rdurl.replace("]", "%5D");
            }
        });
    };
    TsLoginSignupComponent.prototype.ngOnChanges = function (changes) {
        if (changes['rdurl']) {
            this.fbLoginURL = config.baseUrl + 'api/'
                + 'user/signinwithfacebook' + (this.rdurl == undefined ? '' : '?rdurl=' + this.rdurl);
            this.googleLoginURL = config.baseUrl + 'api/'
                + 'user/signinwithgoogle' + (this.rdurl == undefined ? '' : '?rdurl=' + this.rdurl);
        }
    };
    TsLoginSignupComponent.prototype.ngAfterContentInit = function () {
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
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TsLoginSignupComponent.prototype, "source", void 0);
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
            template: "<div class=\"login-signup-view px-5\" id=\"login-signup-view\">\n  <div class=\"view-header\" *ngIf=\"!showLoader && !showConfirmation\">\n    <div class=\"back-button text-gray-700 text-xl md:text-2xl lg:text-3xl -ml-1\" *ngIf=\"mode == 'dialog'\">\n      <i appDataAnalytics eventLabel=\"loginBack\" clickLocation=\"\" class=\"mdi mdi-arrow-left cursor-pointer\" (click)=\"goBack()\"></i>\n    </div>\n    <div class=\"initial-header flex flex-col fadeIn\" *ngIf=\"isDefaultView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">{{defaultHeader}}</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">{{defaultSubHeader}}</div>\n    </div>\n    <div class=\"sign-in-header flex flex-col fadeIn\" *ngIf=\"isSignInView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign In</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"forgot-pwd-header flex flex-col fadeIn\" *ngIf=\"showResetPassword\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Forgot Password?</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Don\u2019t worry, we\u2019ll help you reset it\n      </div>\n    </div>\n\n    <div class=\"sign-up-header flex flex-col fadeIn\" *ngIf=\"isSignUpView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign Up</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"verify-email-header flex flex-col fadeIn\" *ngIf=\"isVerifyEmailView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">You're almost done</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">We just need to verify your e-mail</div>\n    </div>\n  </div>\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10\" *ngIf=\"showLoader\">\n    <mat-spinner></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\">{{loaderText}}</div>\n  </div>\n  <div class=\"confirmation flex flex-col items-center justify-center p-10\" *ngIf=\"showConfirmation\">\n    <app-confirmation-svg></app-confirmation-svg>\n    <div class=\"pt-5 text-gray-700 text-lg lg:text-xl font-semibold flex flex-wrap items-center justify-center\">\n      <div>Welcome back{{userName?.length <= 15 ? ',': ''}}</div>\n      <div *ngIf=\"userName?.length <= 15\">\n        <span class=\"ml-1\">{{userName}}</span>\n      </div>\n      !\n    </div>\n  </div>\n  <div class=\"view-body pt-5\" *ngIf=\"!showLoader && !showConfirmation\">\n    <div class=\"default-view-body py-2 fadeInUp\" *ngIf=\"isDefaultView\">\n      <form id=\"loginForm\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\" >\n            <mat-form-field class=\"w-full\">\n              <input  formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\" (ngModelChange)=\"clearErrors()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group w-full text-center\">\n          <button appDataAnalytics eventLabel=\"loginContinue\" clickLocation=\"\" matRipple (click)=\"verifyEmail()\" [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Continue\n          </button>\n        </div>\n\n        <div class=\"form-group strike-through strike-through-margin\">\n          <div class=\"text-gray-700 text-base md:text-lg lg:text-xl\">\n            <span class=\"or-text\">OR</span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n            <a appDataAnalytics [eventLabel]=\"'loginGoogle'\" [clickLocation]=\"\" [href]=\"googleLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n\n                 matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/google-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Google</span>\n                </div>\n            </a>\n            <p class=\"form-control--error\" ng-if=\"googleError.length\" ng-bind=\"googleError\"></p>\n        </div>\n        <div class=\"form-group\">\n            <a appDataAnalytics eventLabel=\"loginFacebook\" clickLocation=\"\" [href]=\"fbLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n                ts-data-analytics prop-event=\"click\" eventLabel=\"Login with Facebook\"\n                prop-clicked-location=\"Sign In\" matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/facebook-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Facebook</span>\n                </div>\n            </a>\n            <ng-container class=\"login-error\" ng-if=\"fbError.length\">\n                <i class=\"ion-android-alert\"></i>\n                <p class=\"form-control--error\" ng-bind=\"fbError\"></p>\n            </ng-container>\n        </div>\n\n      </form>\n    </div>\n    <div class=\"signin-view-body py-2 fadeInUp\" *ngIf=\"isSignInView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i appDataAnalytics eventLabel=\"loginShowPass\" clickLocation=\"\" class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <p class=\"text-left text-sm text-red-500 -mt-3 mb-2\" *ngIf=\"signInErrMessage.length > 0\">{{signInErrMessage}}</p>\n          <button appDataAnalytics eventLabel=\"loginSignin\" clickLocation=\"\" matRipple (click)=\"signIn()\" [ngClass]=\"!loginForm.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Sign In\n          </button>\n          <div appDataAnalytics eventLabel=\"loginForgot\" clickLocation=\"\" class=\"text-sm text-center text-gray-700 p-1\">\n            <span class=\"cursor-pointer hover:underline\" (click)=\"forgotPassword()\">Forgot Password?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"reset-pwd-view-body py-2 fadeInUp\" *ngIf=\"showResetPassword\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center\" *ngIf=\"!resetPwdLinkSent\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"link-sent fadeIn\" *ngIf=\"resetPwdLinkSent\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-2 text-gray-700 text-sm text-center secondary-header\">Password reset link has been sent to\n            {{loginForm.value.email}}</div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button appDataAnalytics eventLabel=\"loginResetBtn\" clickLocation=\"\" matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resetPassword()\"\n            [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Send Reset Password Link\n          </button>\n          <div (click)=\"resetPassword()\"\n            class=\"color-blue font-semibold text-sm text-center resend-email py-2 px-2 hover:underline cursor-pointer\"\n            *ngIf=\"resetPwdLinkSent\">\n            Resend Email\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"signup-view-body py-2 fadeInUp\" *ngIf=\"isSignUpView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i appDataAnalytics eventLabel=\"loginShowPass\" clickLocation=\"\" class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"fullName\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"name\" type=\"text\" placeholder=\"Full Name\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('fullName').hasError('required') && (loginForm.get('fullName').dirty || loginForm.get('fullName').touched)\">\n              Full Name is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center relative z-50\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative z-50\" floatLabel=\"always\">\n              <input type=\"tel\" formControlName=\"phoneNumber\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10\"\n                id=\"phoneNumber\" placeholder=\"Phone no.\" (ngModelChange)=\"validatePhoneNumber()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\"\n              *ngIf=\"loginForm.get('phoneNumber').hasError('required') && (loginForm.get('phoneNumber').dirty || loginForm.get('phoneNumber').touched)\">\n              Phone Number is required\n            </p>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\" *ngIf=\"phoneError\">Please enter a valid Phone no.</p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center mb-3 relative z-0\">\n            <div class=\"w-full flex items-center justify-center md:justify-start\">\n                <re-captcha\n                  (resolved)=\"resolve($event)\"\n                  [siteKey]=\"captchaToken\">\n                </re-captcha>\n            </div>\n        </div>\n        <div class=\"w-full text-center form-group relative z-0\">\n          <button matRipple\n            [ngClass]=\"!loginForm.valid || phoneError || captchaResponse == undefined ? 'opacity-50 pointer-events-none': ''\"\n            (click)=\"signUp()\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">\n            Create your account\n          </button>\n          <p class=\"text-left text-sm -mt-1 text-red-500\" *ngIf=\"signUpErrMessage.length > 0\">{{signUpErrMessage}}</p>\n        </div>\n      </form>\n    </div>\n\n    <div class=\"verify-email-view-body py-2 fadeInUp\" *ngIf=\"isVerifyEmailView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"link-sent fadeIn\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-4 text-gray-700 text-sm text-center secondary-header\">\n            We have sent a verification link on {{loginForm.value.email}}.<br> Please click the link to activate your account.\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resendVerifyEmail()\" [disabled]=\"!loginForm.valid\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Resend Verification Email\n          </button>\n          <div class=\"text-gray-700 text-sm text-center why-verify px-2 hover:underline cursor-pointer\">\n            <span\n              matTooltip=\"Townscript sends all important communication regarding your events & account-related updates via e-mail. We just want to make sure you don\u2019t miss these important information\"\n              matTooltipPosition=\"right\" matTooltipClass=\"ts-login-tooltip\">Why verify?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"agreement my-2\" *ngIf=\"isDefaultView || isSignUpView\">\n      <div class=\"w-full hor-linear-grad my-2\"></div>\n      <p class=\"text-xs text-center p-2 text-gray-800 px-5\">\n        By continuing, you agree to Townscript's\n        <a appDataAnalytics eventLabel=\"loginTerms\" clickLocation=\"\" class=\"text-blue-700\" href=\"{{baseUrl}}terms-and-conditions\">terms of service</a>\n        and\n        <a appDataAnalytics eventLabel=\"loginPolicy\" clickLocation=\"\" class=\"text-blue-700\" href=\"{{baseUrl}}privacy-policy\">privacy policy</a>.\n      </p>\n    </div>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRCxJQUFNLFVBQVUsR0FBRyxxRUFBcUUsQ0FBQztBQVF6RjtJQStDSSxnQ0FDWSxjQUE4QixFQUM5QixhQUE0QixFQUM1QixXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMsb0JBQTBD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Q0gsbUJBQW1CO1lBQ2xCLG9CQUFvQjtZQUM1QixZQUFZO1lBQ1YsY0FBYztPQXREakMsc0JBQXNCLENBa1hsQztJQUFELDZCQUFDO0NBQUEsQUFsWEQsSUFrWEM7U0FsWFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xuaW1wb3J0IHsgUmVjYXB0Y2hhQ29tcG9uZW50IH0gZnJvbSAnbmctcmVjYXB0Y2hhJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2Nvb2tpZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFRzTG9naW5TaWdudXBTZXJ2aWNlIH0gZnJvbSAnLi90cy1sb2dpbi1zaWdudXAuc2VydmljZSc7XG5pbXBvcnQgeyBQbGFjZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvcGxhY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmNvbnN0IGVtYWlsUmVnZXggPSAnXlthLXowLTldKyhcXC5bX2EtejAtOV0rKSpAW2EtejAtOS1dKyhcXC5bYS16MC05LV0rKSooXFwuW2Etel17MiwxNX0pJCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXRzLWxvZ2luLXNpZ251cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgVHNMb2dpblNpZ251cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIG1vZGU6IGFueTtcbiAgICBASW5wdXQoKSBkZWZhdWx0SGVhZGVyOiBhbnkgPSAnTGV0XFwncyBnZXQgc3RhcnRlZCc7XG4gICAgQElucHV0KCkgZGVmYXVsdFN1YkhlYWRlcjogYW55ID0gJ1lvdXIgb25lIHN0b3AgdG9vbCBmb3Igb3JnYW5pemluZyBldmVudHMnO1xuICAgIEBJbnB1dCgpIHJkdXJsOiBhbnk7XG4gICAgQElucHV0KCkgc2hvd1NvY2lhbDogYW55ID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzb3VyY2U6IGFueTtcbiAgICBAT3V0cHV0KCkgY2xvc2VEaWFsb2cgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdyZWNhcHRjaGFSZWYnLCB7IHJlYWQ6IHRydWUsIHN0YXRpYzogdHJ1ZSB9KVxuICAgIHJlY2FwdGNoYVJlZjogUmVjYXB0Y2hhQ29tcG9uZW50O1xuXG4gICAgY2FwdGNoYVRva2VuOiBhbnkgPSB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLkNBUFRDSEFfU0lURV9JTlZJU0lCTEVfQ0FQVENIQV9LRVk7XG5cbiAgICBzaG93ID0gZmFsc2U7XG4gICAgc2hvd1Bhc3N3b3JkID0gZmFsc2U7XG4gICAgaXNEZWZhdWx0VmlldyA9IHRydWU7XG4gICAgaXNTaWduSW5WaWV3ID0gZmFsc2U7XG4gICAgaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgaXNWZXJpZnlFbWFpbFZpZXcgPSBmYWxzZTtcbiAgICBzaG93UmVzZXRQYXNzd29yZCA9IGZhbHNlO1xuXG4gICAgdXNlclRpbWV6b25lOiBhbnkgPSBEYXRlVGltZS5sb2NhbCgpLnpvbmVOYW1lO1xuICAgIGxvZ2luRm9ybTogYW55O1xuICAgIGNhcHRjaGFSZXNwb25zZTogYW55O1xuICAgIGNvcnJlY3RQaG9uZU51bWJlcjogYW55ID0gbnVsbDtcbiAgICBwaG9uZUVycm9yID0gZmFsc2U7XG4gICAgc29jaWFsTG9naW5Nc2c6IGFueSA9IGZhbHNlO1xuICAgIGluaXRpYWxpemVUZWxJbnB1dDogYW55O1xuICAgIHNpZ25JbkVyck1lc3NhZ2UgPSAnJztcbiAgICByZXNldFB3ZExpbmtTZW50ID0gZmFsc2U7XG4gICAgc2lnblVwRXJyTWVzc2FnZSA9ICcnO1xuXG4gICAgZmJMb2dpblVSTCA9IGNvbmZpZy5iYXNlVXJsICsgJ2FwaS8nXG4gICAgICAgICsgJ3VzZXIvc2lnbmlud2l0aGZhY2Vib29rJztcbiAgICBnb29nbGVMb2dpblVSTCA9IGNvbmZpZy5iYXNlVXJsICsgJ2FwaS8nXG4gICAgICAgICsgJ3VzZXIvc2lnbmlud2l0aGdvb2dsZSc7XG4gICAgaW50bElucHV0OiBhbnk7XG4gICAgc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgIGxvYWRlclRleHQ6IGFueTtcbiAgICBjb3VudHJ5Q29kZTogYW55ID0gJ0lOJztcbiAgICBzdWJPYmplY3Q6IGFueTtcbiAgICBzaG93Q29uZmlybWF0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgYmFzZVVybDogYW55ID0gdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5iYXNlVXJsO1xuICAgIHVzZXJOYW1lOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB0c0xvZ2luU2lnbnVwU2VydmljZTogVHNMb2dpblNpZ251cFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGxhY2VTZXJ2aWNlOiBQbGFjZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgICAgIHRoaXMuc3ViT2JqZWN0ID0gdGhpcy5wbGFjZVNlcnZpY2UucGxhY2Uuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHJlcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwbGFjZURhdGEgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudHJ5Q29kZSA9IHBsYWNlRGF0YVsnY291bnRyeSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNbJ3JkdXJsJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJkdXJsID0gcGFyYW1zWydyZHVybCddO1xuICAgICAgICAgICAgICAgIHRoaXMucmR1cmwgPSBkZWNvZGVVUklDb21wb25lbnQodGhpcy5yZHVybCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZHVybCA9IHRoaXMucmR1cmwucmVwbGFjZShcIltcIiwgXCIlNUJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZHVybCA9IHRoaXMucmR1cmwucmVwbGFjZShcIl1cIiwgXCIlNURcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgIGlmIChjaGFuZ2VzWydyZHVybCddKSB7XG4gICAgICAgIHRoaXMuZmJMb2dpblVSTCA9IGNvbmZpZy5iYXNlVXJsICsgJ2FwaS8nXG4gICAgICAgICAgICArICd1c2VyL3NpZ25pbndpdGhmYWNlYm9vaycgKyAodGhpcy5yZHVybCA9PSB1bmRlZmluZWQgPyAnJyA6ICc/cmR1cmw9JyArIHRoaXMucmR1cmwpO1xuICAgICAgICB0aGlzLmdvb2dsZUxvZ2luVVJMID0gY29uZmlnLmJhc2VVcmwgKyAnYXBpLydcbiAgICAgICAgICAgICsgJ3VzZXIvc2lnbmlud2l0aGdvb2dsZScgKyAodGhpcy5yZHVybCA9PSB1bmRlZmluZWQgPyAnJyA6ICc/cmR1cmw9JyArIHRoaXMucmR1cmwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJPYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWJPYmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGb3JtID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmxvZ2luRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgICAgICAgJ2Z1bGxOYW1lJzogbmV3IEZvcm1Db250cm9sKCcnLCB7IHZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWQgfSksXG4gICAgICAgICAgICAnZW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybihlbWFpbFJlZ2V4KV0gfSksXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZCB9KSxcbiAgICAgICAgICAgICdwaG9uZU51bWJlcic6IG5ldyBGb3JtQ29udHJvbCgnJywgeyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkIH0pXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2Z1bGxOYW1lJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bhc3N3b3JkJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bob25lTnVtYmVyJykuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIGNsb3NlID0gKHNpZ25lZEluKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2VEaWFsb2cuZW1pdChzaWduZWRJbik7XG4gICAgfVxuXG4gICAgY2xlYXJFcnJvcnMgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSAnJztcbiAgICB9XG5cbiAgICByZXNvbHZlID0gKGNhcHRjaGFSZXNwb25zZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuY2FwdGNoYVJlc3BvbnNlID0gY2FwdGNoYVJlc3BvbnNlO1xuICAgIH1cblxuICAgIHBhc3N3b3JkID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93O1xuICAgIH1cblxuICAgIHZlcmlmeUVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbkZvcm0uY29udHJvbHMuZW1haWwudmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UuZ2V0VXNlclNpZ25VcERldGFpbHModGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWwpO1xuICAgICAgICBsZXQgbmV3RGF0YSA9IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgbmV3RGF0YSA9IEpTT04ucGFyc2UocmVzdWx0LmRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4Y2VwdGlvbiB3aGlsZSBwYXJzaW5nIGFwaSByZXNwb25zZSA6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3RGF0YSAmJiBuZXdEYXRhLmlzRXhpc3RpbmdVc2VyICYmIG5ld0RhdGEuaXNNYW51YWxTaWdudXAgJiYgIW5ld0RhdGEuaXNUZW1wb3JhcnlVc2VyKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5TaWduSW5WaWV3KCk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3RGF0YSAmJiBuZXdEYXRhLmlzRXhpc3RpbmdVc2VyICYmICFuZXdEYXRhLmlzTWFudWFsU2lnbnVwICYmICFuZXdEYXRhLmlzVGVtcG9yYXJ5VXNlcikge1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxMb2dpbk1zZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5TaWduVXBWaWV3KCk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVUZWxJbnB1dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUludGxUZWxJbnB1dCgpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRpYWxpemVJbnRsVGVsSW5wdXQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIC8vIGluaXRpYWxpemUgaW50bCB0ZWxcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGhvbmVOdW1iZXInKTtcbiAgICAgICAgdGhpcy5pbnRsSW5wdXQgPSAoPGFueT53aW5kb3cpLmludGxUZWxJbnB1dChpbnB1dCwge1xuICAgICAgICAgICAgaW5pdGlhbENvdW50cnk6IHRoaXMuY291bnRyeUNvZGUsXG4gICAgICAgICAgICBwcmVmZXJyZWRDb3VudHJpZXM6IFtcImluXCIsIFwiaWRcIiwgXCJzZ1wiLCBcIm15XCJdLFxuICAgICAgICAgICAgdXRpbFNjcmlwdHM6ICcuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaW50bC10ZWwtaW5wdXQvYnVpbGQvanMvdXRpbHMuanMnXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdmFsaWRhdGVQaG9uZU51bWJlciA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmludGxJbnB1dC5pc1ZhbGlkTnVtYmVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMucGhvbmVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybS5jb250cm9scy5waG9uZU51bWJlci5zZXRFcnJvcnMoeyAndmFsaWQnOiBmYWxzZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzLnBob25lTnVtYmVyLnNldEVycm9ycygpO1xuICAgICAgICAgICAgdGhpcy5waG9uZUVycm9yID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaWduSW4gPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luRm9ybS52YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIGNvbnN0IHJldERhdGEgPSBhd2FpdCB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLmxvZ2luV2l0aFRvd25zY3JpcHQodGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWwsIHRoaXMubG9naW5Gb3JtLnZhbHVlLnBhc3N3b3JkKTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIGlmIChyZXREYXRhLnJlc3VsdCAhPSAnU3VjY2VzcycpIHtcbiAgICAgICAgICAgIHRoaXMuc2lnbkluRXJyTWVzc2FnZSA9IHJldERhdGEuZGF0YTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dDb25maXJtYXRpb24gPSB0cnVlO1xuICAgICAgICBjb25zdCB0b2tlbkRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjogKHJldERhdGEuZGF0YSlcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHsgLi4ucmV0RGF0YS51c2VyRGV0YWlscywgLi4udG9rZW5EYXRhIH07XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSB1c2VyRGF0YS51c2VyO1xuICAgICAgICBjb25zdCBpc09yZ2FuaXplciA9IHVzZXJEYXRhLmlzT3JnYW5pemVyO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJOYW1lKTtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS51cGRhdGVVc2VyKHVzZXJEYXRhKTtcbiAgICAgICAgLy8gdGhpcy5jb29raWVTZXJ2aWNlLnNldENvb2tpZSgndG93bnNjcmlwdC11c2VyJywgSlNPTi5zdHJpbmdpZnkodXNlckRhdGEpLCA5MCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZGlhbG9nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIG5vIHJlZGlyZWN0aW9uIG5lZWRlZCAsaW4gY2FzZSBvZiBmb2xsb3dcbiAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZSAhPSAnZm9sbG93Jykge1xuICAgICAgICAgICAgICBpZih0aGlzLnJkdXJsICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHRoaXMucmR1cmwsICdfc2VsZicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZihpc09yZ2FuaXplcil7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oJy9kYXNoYm9hcmQnLCAnX3NlbGYnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTQwMCk7XG5cblxuXG4gICAgfVxuXG4gICAgc2lnblVwID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykuc2V0VmFsdWUodGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2Z1bGxOYW1lJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luRm9ybS52YWxpZCB8fCB0aGlzLmNhcHRjaGFSZXNwb25zZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwaG9uZU51bWJlcicpO1xuICAgICAgICBjb25zdCBpdGkgPSAoPGFueT53aW5kb3cpLmludGxUZWxJbnB1dEdsb2JhbHMuZ2V0SW5zdGFuY2UoaW5wdXQpO1xuICAgICAgICB0aGlzLmNvcnJlY3RQaG9uZU51bWJlciA9IGl0aS5nZXROdW1iZXIoKTtcblxuICAgICAgICBpZiAodGhpcy5jb3JyZWN0UGhvbmVOdW1iZXIgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnBob25lRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIHRoaXMubG9hZGVyVGV4dCA9ICdQbGVhc2Ugd2FpdCB3aGlsZSB3ZSBhcmUgY3JlYXRpbmcgeW91ciBhY2NvdW50Lic7XG5cbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLnJlZ2lzdGVyV2l0aFRvd25zY3JpcHRXaXRoQ2FwdGNoYSh0aGlzLmdldEZvcm1EYXRhRm9yUmVnaXN0ZXIoKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeGNlcHRpb24gd2hpbGUgcGFyc2luZyBhcGkgcmVzcG9uc2UgOiBcIiArIGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGFbJ3Jlc3VsdCddID09ICdFcnJvcicpIHtcbiAgICAgICAgICAgIHNlbGYuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5zaWduVXBFcnJNZXNzYWdlID0gZGF0YVsnZGF0YSddO1xuICAgICAgICAgICAgbGV0IF90aGlzID0gc2VsZjtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmluaXRpYWxpemVJbnRsVGVsSW5wdXQoKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5vcGVuVmVyaWZ5RW1haWxWaWV3KCk7XG4gICAgfVxuXG4gICAgZ2V0Rm9ybURhdGFGb3JSZWdpc3RlciA9ICgpOiBGb3JtRGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIHRoaXMubG9naW5Gb3JtLnZhbHVlLmZ1bGxOYW1lKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdlbWFpbGlkJywgdGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWwpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bhc3N3b3JkJywgdGhpcy5sb2dpbkZvcm0udmFsdWUucGFzc3dvcmQpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob25lJywgdGhpcy5jb3JyZWN0UGhvbmVOdW1iZXIpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3VzZXJ0aW1lem9uZScsIHRoaXMudXNlclRpbWV6b25lKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdyZUNhcHRjaGEnLCB0aGlzLmNhcHRjaGFSZXNwb25zZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXNlcm5hbWUnLCB0aGlzLnJhbmRvbVN0cmluZygxMCwgJycpKTtcbiAgICAgICAgaWYgKHRoaXMucmR1cmwpIHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncmR1cmwnLCB0aGlzLnJkdXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybURhdGE7XG4gICAgfVxuXG4gICAgZm9yZ290UGFzc3dvcmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dTb2NpYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnb0JhY2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNob3dSZXNldFBhc3N3b3JkKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5TaWduSW5WaWV3KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NpZ25JblZpZXcgfHwgdGhpcy5pc1NpZ25VcFZpZXcgfHwgdGhpcy5pc1ZlcmlmeUVtYWlsVmlldykge1xuICAgICAgICAgICAgdGhpcy5vcGVuRGVmYXVsdFZpZXcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3BlblNpZ25JblZpZXcgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25VcFZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bhc3N3b3JkJykuZW5hYmxlKCk7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvY2lhbExvZ2luTXNnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEZWZhdWx0VmlldyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9wZW5TaWduVXBWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTaWduSW5WaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRGVmYXVsdFZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb2NpYWxMb2dpbk1zZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2Z1bGxOYW1lJykuZW5hYmxlKCk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwaG9uZU51bWJlcicpLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIG9wZW5EZWZhdWx0VmlldyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5pc1ZlcmlmeUVtYWlsVmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dSZXNldFBhc3N3b3JkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduSW5WaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNEZWZhdWx0VmlldyA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGhvbmVOdW1iZXInKS5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgb3BlblZlcmlmeUVtYWlsVmlldyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5pc1ZlcmlmeUVtYWlsVmlldyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dTb2NpYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25VcFZpZXcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXNldFBhc3N3b3JkID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gJ1NlbmRpbmcgUmVzZXQgUGFzc3dvcmQgTGluayB0byAnICsgdGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWw7XG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLnNlbmRGb3Jnb3RQd2RFbWFpbCh0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5yZXNldFB3ZExpbmtTZW50KSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcygnUmVzZXQgUGFzc3dvcmQgTGluayBoYXMgYmVlbiBzZW50JywgMjAwMCwgJ0Rpc21pc3MnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0UHdkTGlua1NlbnQgPSB0cnVlO1xuXG5cbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdlbWFpbCcpKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZW1haWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdlbWFpbCcsIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS52YWx1ZS50cmltKCkpO1xuICAgIH1cblxuICAgIHJhbmRvbVN0cmluZyA9IChsZW46IG51bWJlciwgYW46IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICAgIGFuID0gYW4gJiYgYW4udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IHN0ciA9ICcnLCBpID0gMDtcbiAgICAgICAgY29uc3QgbWluID0gYW4gPT09ICdhJyA/IDEwIDogMDtcbiAgICAgICAgY29uc3QgbWF4ID0gYW4gPT09ICduJyA/IDEwIDogNjI7XG4gICAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgICAgICBsZXQgciA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbiA8PCAwO1xuICAgICAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUociArPSByID4gOSA/IHIgPCAzNiA/IDU1IDogNjEgOiA0OCk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICByZXNlbmRWZXJpZnlFbWFpbCA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykuc2V0VmFsdWUodGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIHRoaXMubG9hZGVyVGV4dCA9ICdTZW5kaW5nIFZlcmlmaWNhdGlvbiBlbWFpbCB0byAnICsgdGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWw7XG4gICAgICAgIGNvbnN0IHJldERhdGEgPSB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLnJlc2VuZFZlcmlmaWNhdGlvbkNvZGUodGhpcy5yZHVybCwgdGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWwpO1xuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoJ1ZlcmlmaWNhdGlvbiBlbWFpbCBoYXMgYmVlbiBzZW50JywgMjAwMCwgJ0Rpc21pc3MnKTtcbiAgICB9XG5cbiAgICB0b2dnbGVQYXNzd29yZERpc3BsYXkgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkID0gIXRoaXMuc2hvd1Bhc3N3b3JkO1xuICAgICAgICBjb25zdCBwd2RJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLXB3ZCcpO1xuICAgICAgICBwd2RJbnB1dC50eXBlID0gdGhpcy5zaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnO1xuICAgIH1cblxufVxuIl19