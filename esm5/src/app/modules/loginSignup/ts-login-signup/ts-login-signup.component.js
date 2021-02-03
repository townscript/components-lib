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
        this.verifyEmail = function () { return __awaiter(_this_1, void 0, void 0, function () {
            var result, newData;
            var _this_1 = this;
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
            template: "<div class=\"login-signup-view px-5\" id=\"login-signup-view\">\n  <div class=\"view-header\" *ngIf=\"!showLoader && !showConfirmation\">\n    <div class=\"back-button text-gray-700 text-xl md:text-2xl lg:text-3xl -ml-1\" *ngIf=\"mode == 'dialog'\">\n      <i appDataAnalytics eventLabel=\"loginBack\" clickLocation=\"\" class=\"mdi mdi-arrow-left cursor-pointer\" (click)=\"goBack()\"></i>\n    </div>\n    <div class=\"initial-header flex flex-col fadeIn\" *ngIf=\"isDefaultView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">{{defaultHeader}}</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">{{defaultSubHeader}}</div>\n    </div>\n    <div class=\"sign-in-header flex flex-col fadeIn\" *ngIf=\"isSignInView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign In</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"forgot-pwd-header flex flex-col fadeIn\" *ngIf=\"showResetPassword\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Forgot Password?</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Don\u2019t worry, we\u2019ll help you reset it\n      </div>\n    </div>\n\n    <div class=\"sign-up-header flex flex-col fadeIn\" *ngIf=\"isSignUpView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">Sign Up</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">Welcome to Townscript</div>\n    </div>\n\n    <div class=\"verify-email-header flex flex-col fadeIn\" *ngIf=\"isVerifyEmailView\">\n      <div class=\"primary-header text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold\">You're almost done</div>\n      <div class=\"secondary-header text-gray-600 text-xs md:text-sm lg:text-sm\">We just need to verify your e-mail</div>\n    </div>\n  </div>\n  <div class=\"ts-loader flex flex-col items-center justify-center p-10\" *ngIf=\"showLoader\">\n    <mat-spinner></mat-spinner>\n    <div class=\"py-5 text-gray-700 text-sm\">{{loaderText}}</div>\n  </div>\n  <div class=\"confirmation flex flex-col items-center justify-center p-10\" *ngIf=\"showConfirmation\">\n    <app-confirmation-svg></app-confirmation-svg>\n    <div class=\"pt-5 text-gray-700 text-lg lg:text-xl font-semibold flex flex-wrap items-center justify-center\">\n      <div>Welcome back{{userName?.length <= 15 ? ',': ''}}</div>\n      <div *ngIf=\"userName?.length <= 15\">\n        <span class=\"ml-1\">{{userName}}</span>\n      </div>\n      !\n    </div>\n  </div>\n  <div class=\"view-body pt-5\" *ngIf=\"!showLoader && !showConfirmation\">\n    <div class=\"default-view-body py-2 fadeInUp\" *ngIf=\"isDefaultView\">\n      <form id=\"loginForm\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\" >\n            <mat-form-field class=\"w-full\">\n              <input  formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\" (ngModelChange)=\"clearErrors()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group w-full text-center\">\n          <button appDataAnalytics eventLabel=\"loginContinue\" clickLocation=\"\" matRipple (click)=\"verifyEmail()\" [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Continue\n          </button>\n        </div>\n\n        <div class=\"form-group strike-through strike-through-margin\">\n          <div class=\"text-gray-700 text-base md:text-lg lg:text-xl\">\n            <span class=\"or-text\">OR</span>\n          </div>\n        </div>\n        <div class=\"form-group\">\n            <a appDataAnalytics [eventLabel]=\"'loginGoogle'\" [clickLocation]=\"\" [href]=\"googleLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n\n                 matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/google-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Google</span>\n                </div>\n            </a>\n            <p class=\"form-control--error\" ng-if=\"googleError.length\" ng-bind=\"googleError\"></p>\n        </div>\n        <div class=\"form-group\">\n            <a appDataAnalytics eventLabel=\"loginFacebook\" clickLocation=\"\" [href]=\"fbLoginURL\" target=\"_self\"\n                class=\"bg-white w-full p-2 flex border border-gray-400 rounded shadow mb-2 items-center justify-center\"\n                ts-data-analytics prop-event=\"click\" eventLabel=\"Login with Facebook\"\n                prop-clicked-location=\"Sign In\" matRipple>\n                <div class=\"px-2\">\n                    <img class=\"logo\"\n                        src=\"https://townscript-common-resources.s3.ap-south-1.amazonaws.com/facebook-min.png\" />\n                </div>\n                <div class=\"text-sm text-gray-700\">\n                    <span class=\"no-margin\">Continue with Facebook</span>\n                </div>\n            </a>\n            <ng-container class=\"login-error\" ng-if=\"fbError.length\">\n                <i class=\"ion-android-alert\"></i>\n                <p class=\"form-control--error\" ng-bind=\"fbError\"></p>\n            </ng-container>\n        </div>\n\n      </form>\n    </div>\n    <div class=\"signin-view-body py-2 fadeInUp\" *ngIf=\"isSignInView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i appDataAnalytics eventLabel=\"loginShowPass\" clickLocation=\"\" class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <p class=\"text-left text-sm text-red-500 -mt-3 mb-2\" *ngIf=\"signInErrMessage.length > 0\">{{signInErrMessage}}</p>\n          <button appDataAnalytics eventLabel=\"loginSignin\" clickLocation=\"\" matRipple (click)=\"signIn()\" [ngClass]=\"!loginForm.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Sign In\n          </button>\n          <div appDataAnalytics eventLabel=\"loginForgot\" clickLocation=\"\" class=\"text-sm text-center text-gray-700 p-1\">\n            <span class=\"cursor-pointer hover:underline\" (click)=\"forgotPassword()\">Forgot Password?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"reset-pwd-view-body py-2 fadeInUp\" *ngIf=\"showResetPassword\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center\" *ngIf=\"!resetPwdLinkSent\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"link-sent fadeIn\" *ngIf=\"resetPwdLinkSent\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-2 text-gray-700 text-sm text-center secondary-header\">Password reset link has been sent to\n            {{loginForm.value.email}}</div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button appDataAnalytics eventLabel=\"loginResetBtn\" clickLocation=\"\" matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resetPassword()\"\n            [ngClass]=\"!loginForm.controls.email.valid ? 'opacity-50 pointer-events-none': ''\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Send Reset Password Link\n          </button>\n          <div (click)=\"resetPassword()\"\n            class=\"color-blue font-semibold text-sm text-center resend-email py-2 px-2 hover:underline cursor-pointer\"\n            *ngIf=\"resetPwdLinkSent\">\n            Resend Email\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"signup-view-body py-2 fadeInUp\" *ngIf=\"isSignUpView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full\">\n              <input formControlName=\"email\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"email\" type=\"email\" name=\"email\" placeholder=\"Email\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\" *ngIf=\"socialLoginMsg\">\n              It seems you have signed up using Social Login.\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('required') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Email Id is required\n            </p>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('email').hasError('pattern') && (loginForm.get('email').dirty || loginForm.get('email').touched)\">\n              Please enter a valid email address\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"password\" matInput autofocus\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"user-pwd\" [type]=\"'password'\" placeholder=\"Password\" autocomplete=\"current-password\">\n              <i appDataAnalytics eventLabel=\"loginShowPass\" clickLocation=\"\" class=\"text-lg mdi absolute right-0 text-gray-700\"\n                [ngClass]=\" showPassword ? 'mdi-eye-off' : 'mdi-eye'\" (click)=\"togglePasswordDisplay()\"></i>\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('password').hasError('required') && (loginForm.get('password').dirty || loginForm.get('password').touched)\">\n              Password is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center \">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative\">\n              <input formControlName=\"fullName\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500\"\n                id=\"name\" type=\"text\" placeholder=\"Full Name\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 -mt-3 mb-2\"\n              *ngIf=\"loginForm.get('fullName').hasError('required') && (loginForm.get('fullName').dirty || loginForm.get('fullName').touched)\">\n              Full Name is required\n            </p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center relative z-50\">\n          <div class=\"w-full\">\n            <mat-form-field class=\"w-full relative z-50\" floatLabel=\"always\">\n              <input type=\"tel\" formControlName=\"phoneNumber\" matInput\n                class=\"form-control bg-white border-gray-500 rounded py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ml-10\"\n                id=\"phoneNumber\" placeholder=\"Phone no.\" (ngModelChange)=\"validatePhoneNumber()\">\n            </mat-form-field>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\"\n              *ngIf=\"loginForm.get('phoneNumber').hasError('required') && (loginForm.get('phoneNumber').dirty || loginForm.get('phoneNumber').touched)\">\n              Phone Number is required\n            </p>\n            <p class=\"text-xs text-red-500 mb-2 -mt-3\" *ngIf=\"phoneError\">Please enter a valid Phone no.</p>\n          </div>\n        </div>\n        <div class=\"form-group md:flex md:items-center mb-3 relative z-0\">\n            <div class=\"w-full flex items-center justify-center md:justify-start\">\n                <re-captcha\n                  (resolved)=\"resolve($event)\"\n                  [siteKey]=\"captchaToken\">\n                </re-captcha>\n            </div>\n        </div>\n        <div class=\"w-full text-center form-group relative z-0\">\n          <button matRipple\n            [ngClass]=\"!loginForm.valid || phoneError || captchaResponse == undefined ? 'opacity-50 pointer-events-none': ''\"\n            (click)=\"signUp()\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">\n            Create your account\n          </button>\n          <p class=\"text-left text-sm -mt-1 text-red-500\" *ngIf=\"signUpErrMessage.length > 0\">{{signUpErrMessage}}</p>\n        </div>\n      </form>\n    </div>\n\n    <div class=\"verify-email-view-body py-2 fadeInUp\" *ngIf=\"isVerifyEmailView\">\n      <form id=\"formId\" [formGroup]=\"loginForm\" class=\"w-full login-form\">\n        <div class=\"link-sent fadeIn\">\n          <div class=\"p-2 flex items-center justify-center -mt-8 primary-header\">\n            <app-email-sent></app-email-sent>\n          </div>\n          <div class=\"p-4 text-gray-700 text-sm text-center secondary-header\">\n            We have sent a verification link on {{loginForm.value.email}}.<br> Please click the link to activate your account.\n          </div>\n        </div>\n        <div class=\"w-full text-center form-group\">\n          <button matRipple *ngIf=\"!resetPwdLinkSent\" (click)=\"resendVerifyEmail()\" [disabled]=\"!loginForm.valid\"\n            class=\"w-full blue-btn p-2 rounded shadow mb-2 font-semibold\">Resend Verification Email\n          </button>\n          <div class=\"text-gray-700 text-sm text-center why-verify px-2 hover:underline cursor-pointer\">\n            <span\n              matTooltip=\"Townscript sends all important communication regarding your events & account-related updates via e-mail. We just want to make sure you don\u2019t miss these important information\"\n              matTooltipPosition=\"right\" matTooltipClass=\"ts-login-tooltip\">Why verify?</span>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class=\"agreement my-2\" *ngIf=\"isDefaultView || isSignUpView\">\n      <div class=\"w-full hor-linear-grad my-2\"></div>\n      <p class=\"text-xs text-center p-2 text-gray-800 px-5\">\n        By continuing, you agree to Townscript's\n        <a appDataAnalytics eventLabel=\"loginTerms\" clickLocation=\"\" class=\"text-blue-700\" href=\"{{baseUrl}}terms-and-conditions\">terms of service</a>\n        and\n        <a appDataAnalytics eventLabel=\"loginPolicy\" clickLocation=\"\" class=\"text-blue-700\" href=\"{{baseUrl}}privacy-policy\">privacy policy</a>.\n      </p>\n    </div>\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            styles: ["@-webkit-keyframes fadeInUp{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:none}}@keyframes fadeInUp{from{opacity:0;transform:translate3d(0,50%,0)}to{opacity:1;transform:none}}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ts-login-tooltip{background-color:#666;color:#fff;font-size:12px;opacity:.98;white-space:pre-line}.login-signup-view{max-height:90vh;overflow:hidden}.login-signup-view .color-blue{color:#3782c4}.login-signup-view .fadeIn .primary-header,.login-signup-view .fadeIn .secondary-header{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-name:fadeIn;animation-name:fadeIn}.login-signup-view .fadeIn .secondary-header{-webkit-animation-delay:.1s;animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group{-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.login-signup-view .fadeInUp .login-form .form-group:nth-child(1){-webkit-animation-delay:.1s;animation-delay:.1s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(3){-webkit-animation-delay:.3s;animation-delay:.3s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(4){-webkit-animation-delay:.4s;animation-delay:.4s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(5){-webkit-animation-delay:.5s;animation-delay:.5s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(6){-webkit-animation-delay:.6s;animation-delay:.6s}.login-signup-view .fadeInUp .login-form .form-group:nth-child(7){-webkit-animation-delay:.7s;animation-delay:.7s}.login-signup-view .ts-loader{-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.login-signup-view .ts-loader circle{stroke-width:5%!important}.login-signup-view .view-body .blue-btn{background:#3782c4;color:#fff;transition:.15s}.login-signup-view .view-body .blue-btn:hover{background:#1369b5}.login-signup-view .view-body .default-view-body .strike-through-margin{margin:30px 0;text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em}.login-signup-view .view-body .default-view-body .strike-through-margin span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .strike-through{text-align:center;border-bottom:1px solid #dcdcdc;line-height:.1em;margin:30px auto}.login-signup-view .view-body .default-view-body .strike-through span{background-color:#fff;padding:3px 30px}.login-signup-view .view-body .default-view-body .logo{height:auto;width:25px}.login-signup-view .view-body .hor-linear-grad{height:1px;width:100%;background-image:linear-gradient(to bottom,rgba(255,255,255,0) 0,#e2e2e2 48%,rgba(255,255,255,0) 100%)}"]
        })
    ], TsLoginSignupComponent);
    return TsLoginSignupComponent;
}());
export { TsLoginSignupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELElBQU0sVUFBVSxHQUFHLHFFQUFxRSxDQUFDO0FBUXpGO0lBK0NJLGdDQUNZLGNBQThCLEVBQzlCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsWUFBMEIsRUFDMUIsY0FBOEI7UUFQMUMsbUJBUUs7UUFQTyxt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QkFBb0I7Z0JBQzVCLFlBQVk7Z0JBQ1YsY0FBYzs7SUFwRGpDO1FBQVIsS0FBSyxFQUFFO3dEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7aUVBQTJDO0lBQzFDO1FBQVIsS0FBSyxFQUFFO29FQUFvRTtJQUNuRTtRQUFSLEtBQUssRUFBRTt5REFBWTtJQUNYO1FBQVIsS0FBSyxFQUFFOzhEQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTswREFBYTtJQUNYO1FBQVQsTUFBTSxFQUFFOytEQUFrQztJQUczQztRQURDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztnRUFDdkI7SUFYeEIsc0JBQXNCO1FBTmxDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsMCtsQkFBK0M7WUFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O1NBQ3hDLENBQUM7T0FDVyxzQkFBc0IsQ0FtWWxDO0lBQUQsNkJBQUM7Q0FBQSxBQW5ZRCxJQW1ZQztTQW5ZWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5pbXBvcnQgeyBSZWNhcHRjaGFDb21wb25lbnQgfSBmcm9tICduZy1yZWNhcHRjaGEnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHNMb2dpblNpZ251cFNlcnZpY2UgfSBmcm9tICcuL3RzLWxvZ2luLXNpZ251cC5zZXJ2aWNlJztcbmltcG9ydCB7IFBsYWNlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci9wbGFjZS5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuY29uc3QgZW1haWxSZWdleCA9ICdeW2EtejAtOV0rKFxcLltfYS16MC05XSspKkBbYS16MC05LV0rKFxcLlthLXowLTktXSspKihcXC5bYS16XXsyLDE1fSkkJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdHMtbG9naW4tc2lnbnVwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90cy1sb2dpbi1zaWdudXAuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBUc0xvZ2luU2lnbnVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgbW9kZTogYW55O1xuICAgIEBJbnB1dCgpIGRlZmF1bHRIZWFkZXI6IGFueSA9ICdMZXRcXCdzIGdldCBzdGFydGVkJztcbiAgICBASW5wdXQoKSBkZWZhdWx0U3ViSGVhZGVyOiBhbnkgPSAnWW91ciBvbmUgc3RvcCB0b29sIGZvciBvcmdhbml6aW5nIGV2ZW50cyc7XG4gICAgQElucHV0KCkgcmR1cmw6IGFueTtcbiAgICBASW5wdXQoKSBzaG93U29jaWFsOiBhbnkgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNvdXJjZTogYW55O1xuICAgIEBPdXRwdXQoKSBjbG9zZURpYWxvZyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3JlY2FwdGNoYVJlZicsIHsgcmVhZDogdHJ1ZSwgc3RhdGljOiB0cnVlIH0pXG4gICAgcmVjYXB0Y2hhUmVmOiBSZWNhcHRjaGFDb21wb25lbnQ7XG5cbiAgICBjYXB0Y2hhVG9rZW46IGFueSA9IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UuQ0FQVENIQV9TSVRFX0lOVklTSUJMRV9DQVBUQ0hBX0tFWTtcblxuICAgIHNob3cgPSBmYWxzZTtcbiAgICBzaG93UGFzc3dvcmQgPSBmYWxzZTtcbiAgICBpc0RlZmF1bHRWaWV3ID0gdHJ1ZTtcbiAgICBpc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICBpc1NpZ25VcFZpZXcgPSBmYWxzZTtcbiAgICBpc1ZlcmlmeUVtYWlsVmlldyA9IGZhbHNlO1xuICAgIHNob3dSZXNldFBhc3N3b3JkID0gZmFsc2U7XG5cbiAgICB1c2VyVGltZXpvbmU6IGFueSA9IERhdGVUaW1lLmxvY2FsKCkuem9uZU5hbWU7XG4gICAgbG9naW5Gb3JtOiBhbnk7XG4gICAgY2FwdGNoYVJlc3BvbnNlOiBhbnk7XG4gICAgY29ycmVjdFBob25lTnVtYmVyOiBhbnkgPSBudWxsO1xuICAgIHBob25lRXJyb3IgPSBmYWxzZTtcbiAgICBzb2NpYWxMb2dpbk1zZzogYW55ID0gZmFsc2U7XG4gICAgaW5pdGlhbGl6ZVRlbElucHV0OiBhbnk7XG4gICAgc2lnbkluRXJyTWVzc2FnZSA9ICcnO1xuICAgIHJlc2V0UHdkTGlua1NlbnQgPSBmYWxzZTtcbiAgICBzaWduVXBFcnJNZXNzYWdlID0gJyc7XG5cbiAgICBmYkxvZ2luVVJMID0gY29uZmlnLmJhc2VVcmwgKyAnYXBpLydcbiAgICAgICAgKyAndXNlci9zaWduaW53aXRoZmFjZWJvb2snO1xuICAgIGdvb2dsZUxvZ2luVVJMID0gY29uZmlnLmJhc2VVcmwgKyAnYXBpLydcbiAgICAgICAgKyAndXNlci9zaWduaW53aXRoZ29vZ2xlJztcbiAgICBpbnRsSW5wdXQ6IGFueTtcbiAgICBzaG93TG9hZGVyID0gZmFsc2U7XG4gICAgbG9hZGVyVGV4dDogYW55O1xuICAgIGNvdW50cnlDb2RlOiBhbnkgPSAnSU4nO1xuICAgIHN1Yk9iamVjdDogYW55O1xuICAgIHNob3dDb25maXJtYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBiYXNlVXJsOiBhbnkgPSB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLmJhc2VVcmw7XG4gICAgdXNlck5hbWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHRzTG9naW5TaWdudXBTZXJ2aWNlOiBUc0xvZ2luU2lnbnVwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwbGFjZVNlcnZpY2U6IFBsYWNlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdEZvcm0oKTtcbiAgICAgICAgdGhpcy5zdWJPYmplY3QgPSB0aGlzLnBsYWNlU2VydmljZS5wbGFjZS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcocmVzKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBsYWNlRGF0YSA9IEpTT04ucGFyc2UocmVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50cnlDb2RlID0gcGxhY2VEYXRhWydjb3VudHJ5J107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1sncmR1cmwnXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmR1cmwgPSBwYXJhbXNbJ3JkdXJsJ107XG4gICAgICAgICAgICAgICAgdGhpcy5yZHVybCA9IGRlY29kZVVSSUNvbXBvbmVudCh0aGlzLnJkdXJsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJkdXJsID0gdGhpcy5yZHVybC5yZXBsYWNlKFwiW1wiLCBcIiU1QlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJkdXJsID0gdGhpcy5yZHVybC5yZXBsYWNlKFwiXVwiLCBcIiU1RFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZlJkVXJsSXNMZWdpdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICBpZiAoY2hhbmdlc1sncmR1cmwnXSkge1xuICAgICAgICB0aGlzLmZiTG9naW5VUkwgPSBjb25maWcuYmFzZVVybCArICdhcGkvJ1xuICAgICAgICAgICAgKyAndXNlci9zaWduaW53aXRoZmFjZWJvb2snICsgKHRoaXMucmR1cmwgPT0gdW5kZWZpbmVkID8gJycgOiAnP3JkdXJsPScgKyB0aGlzLnJkdXJsKTtcbiAgICAgICAgdGhpcy5nb29nbGVMb2dpblVSTCA9IGNvbmZpZy5iYXNlVXJsICsgJ2FwaS8nXG4gICAgICAgICAgICArICd1c2VyL3NpZ25pbndpdGhnb29nbGUnICsgKHRoaXMucmR1cmwgPT0gdW5kZWZpbmVkID8gJycgOiAnP3JkdXJsPScgKyB0aGlzLnJkdXJsKTtcbiAgICAgICAgdGhpcy5jaGVja0lmUmRVcmxJc0xlZ2l0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuXG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1Yk9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1Yk9iamVjdC51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEZvcm0gPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAgICAgICAnZnVsbE5hbWUnOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZCB9KSxcbiAgICAgICAgICAgICdlbWFpbCc6IG5ldyBGb3JtQ29udHJvbCgnJywgeyB2YWxpZGF0b3JzOiBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKGVtYWlsUmVnZXgpXSB9KSxcbiAgICAgICAgICAgICdwYXNzd29yZCc6IG5ldyBGb3JtQ29udHJvbCgnJywgeyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkIH0pLFxuICAgICAgICAgICAgJ3Bob25lTnVtYmVyJzogbmV3IEZvcm1Db250cm9sKCcnLCB7IHZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWQgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGhvbmVOdW1iZXInKS5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgY2xvc2UgPSAoc2lnbmVkSW4pOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5jbG9zZURpYWxvZy5lbWl0KHNpZ25lZEluKTtcbiAgICB9XG5cbiAgICBjbGVhckVycm9ycyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zb2NpYWxMb2dpbk1zZyA9ICcnO1xuICAgIH1cblxuICAgIHJlc29sdmUgPSAoY2FwdGNoYVJlc3BvbnNlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5jYXB0Y2hhUmVzcG9uc2UgPSBjYXB0Y2hhUmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcGFzc3dvcmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3c7XG4gICAgfVxuXG4gICAgdmVyaWZ5RW1haWwgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ2luRm9ybS5jb250cm9scy5lbWFpbC52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5nZXRVc2VyU2lnblVwRGV0YWlscyh0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIGxldCBuZXdEYXRhID0gcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICBuZXdEYXRhID0gSlNPTi5wYXJzZShyZXN1bHQuZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXhjZXB0aW9uIHdoaWxlIHBhcnNpbmcgYXBpIHJlc3BvbnNlIDogXCIgKyByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdEYXRhICYmIG5ld0RhdGEuaXNFeGlzdGluZ1VzZXIgJiYgbmV3RGF0YS5pc01hbnVhbFNpZ251cCAmJiAhbmV3RGF0YS5pc1RlbXBvcmFyeVVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3BlblNpZ25JblZpZXcoKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdEYXRhICYmIG5ld0RhdGEuaXNFeGlzdGluZ1VzZXIgJiYgIW5ld0RhdGEuaXNNYW51YWxTaWdudXAgJiYgIW5ld0RhdGEuaXNUZW1wb3JhcnlVc2VyKSB7XG4gICAgICAgICAgICB0aGlzLnNvY2lhbExvZ2luTXNnID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlblNpZ25VcFZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRlbElucHV0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplSW50bFRlbElucHV0KCk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUludGxUZWxJbnB1dCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBpbnRsIHRlbFxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwaG9uZU51bWJlcicpO1xuICAgICAgICB0aGlzLmludGxJbnB1dCA9ICg8YW55PndpbmRvdykuaW50bFRlbElucHV0KGlucHV0LCB7XG4gICAgICAgICAgICBpbml0aWFsQ291bnRyeTogdGhpcy5jb3VudHJ5Q29kZSxcbiAgICAgICAgICAgIHByZWZlcnJlZENvdW50cmllczogW1wiaW5cIiwgXCJpZFwiLCBcInNnXCIsIFwibXlcIl0sXG4gICAgICAgICAgICB1dGlsU2NyaXB0czogJy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pbnRsLXRlbC1pbnB1dC9idWlsZC9qcy91dGlscy5qcydcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBob25lTnVtYmVyID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW50bElucHV0LmlzVmFsaWROdW1iZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5waG9uZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzLnBob25lTnVtYmVyLnNldEVycm9ycyh7ICd2YWxpZCc6IGZhbHNlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm0uY29udHJvbHMucGhvbmVOdW1iZXIuc2V0RXJyb3JzKCk7XG4gICAgICAgICAgICB0aGlzLnBob25lRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNpZ25JbiA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICBpZiAoIXRoaXMubG9naW5Gb3JtLnZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcmV0RGF0YSA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UubG9naW5XaXRoVG93bnNjcmlwdCh0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCwgdGhpcy5sb2dpbkZvcm0udmFsdWUucGFzc3dvcmQpO1xuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHJldERhdGEucmVzdWx0ICE9ICdTdWNjZXNzJykge1xuICAgICAgICAgICAgdGhpcy5zaWduSW5FcnJNZXNzYWdlID0gcmV0RGF0YS5kYXRhO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvd0NvbmZpcm1hdGlvbiA9IHRydWU7XG4gICAgICAgIGNvbnN0IHRva2VuRGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuOiAocmV0RGF0YS5kYXRhKVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0geyAuLi5yZXREYXRhLnVzZXJEZXRhaWxzLCAuLi50b2tlbkRhdGEgfTtcbiAgICAgICAgdGhpcy51c2VyTmFtZSA9IHVzZXJEYXRhLnVzZXI7XG4gICAgICAgIGNvbnN0IGlzT3JnYW5pemVyID0gdXNlckRhdGEuaXNPcmdhbml6ZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlck5hbWUpO1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIodXNlckRhdGEpO1xuICAgICAgICAvLyB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0Q29va2llKCd0b3duc2NyaXB0LXVzZXInLCBKU09OLnN0cmluZ2lmeSh1c2VyRGF0YSksIDkwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdkaWFsb2cnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbm8gcmVkaXJlY3Rpb24gbmVlZGVkICxpbiBjYXNlIG9mIGZvbGxvd1xuICAgICAgICAgICAgaWYgKHRoaXMuc291cmNlICE9ICdmb2xsb3cnKSB7XG4gICAgICAgICAgICAgIGlmKHRoaXMucmR1cmwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odGhpcy5yZHVybCwgJ19zZWxmJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmKGlzT3JnYW5pemVyKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbignL2Rhc2hib2FyZCcsICdfc2VsZicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxNDAwKTtcblxuXG5cbiAgICB9XG5cbiAgICBzaWduVXAgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICBpZiAoIXRoaXMubG9naW5Gb3JtLnZhbGlkIHx8IHRoaXMuY2FwdGNoYVJlc3BvbnNlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bob25lTnVtYmVyJyk7XG4gICAgICAgIGNvbnN0IGl0aSA9ICg8YW55PndpbmRvdykuaW50bFRlbElucHV0R2xvYmFscy5nZXRJbnN0YW5jZShpbnB1dCk7XG4gICAgICAgIHRoaXMuY29ycmVjdFBob25lTnVtYmVyID0gaXRpLmdldE51bWJlcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvcnJlY3RQaG9uZU51bWJlciA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMucGhvbmVFcnJvciA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gJ1BsZWFzZSB3YWl0IHdoaWxlIHdlIGFyZSBjcmVhdGluZyB5b3VyIGFjY291bnQuJztcblxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UucmVnaXN0ZXJXaXRoVG93bnNjcmlwdFdpdGhDYXB0Y2hhKHRoaXMuZ2V0Rm9ybURhdGFGb3JSZWdpc3RlcigpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4Y2VwdGlvbiB3aGlsZSBwYXJzaW5nIGFwaSByZXNwb25zZSA6IFwiICsgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YVsncmVzdWx0J10gPT0gJ0Vycm9yJykge1xuICAgICAgICAgICAgc2VsZi5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNpZ25VcEVyck1lc3NhZ2UgPSBkYXRhWydkYXRhJ107XG4gICAgICAgICAgICBsZXQgX3RoaXMgPSBzZWxmO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5pdGlhbGl6ZUludGxUZWxJbnB1dCgpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLm9wZW5WZXJpZnlFbWFpbFZpZXcoKTtcbiAgICB9XG5cbiAgICBnZXRGb3JtRGF0YUZvclJlZ2lzdGVyID0gKCk6IEZvcm1EYXRhID0+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCduYW1lJywgdGhpcy5sb2dpbkZvcm0udmFsdWUuZnVsbE5hbWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2VtYWlsaWQnLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGFzc3dvcmQnLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5wYXNzd29yZCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGhvbmUnLCB0aGlzLmNvcnJlY3RQaG9uZU51bWJlcik7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXNlcnRpbWV6b25lJywgdGhpcy51c2VyVGltZXpvbmUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3JlQ2FwdGNoYScsIHRoaXMuY2FwdGNoYVJlc3BvbnNlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd1c2VybmFtZScsIHRoaXMucmFuZG9tU3RyaW5nKDEwLCAnJykpO1xuICAgICAgICBpZiAodGhpcy5yZHVybCkge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdyZHVybCcsIHRoaXMucmR1cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtRGF0YTtcbiAgICB9XG5cbiAgICBmb3Jnb3RQYXNzd29yZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzd29yZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdvQmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHRoaXMub3BlblNpZ25JblZpZXcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzU2lnbkluVmlldyB8fCB0aGlzLmlzU2lnblVwVmlldyB8fCB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EZWZhdWx0VmlldygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuU2lnbkluVmlldyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGFzc3dvcmQnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb3BlblNpZ25VcFZpZXcgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNEZWZhdWx0VmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNvY2lhbExvZ2luTXNnID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZnVsbE5hbWUnKS5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bob25lTnVtYmVyJykuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgb3BlbkRlZmF1bHRWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1Jlc2V0UGFzc3dvcmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25JblZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwaG9uZU51bWJlcicpLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICBvcGVuVmVyaWZ5RW1haWxWaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmlzVmVyaWZ5RW1haWxWaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1NvY2lhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlc2V0UGFzc3dvcmQgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICB0aGlzLmxvYWRlclRleHQgPSAnU2VuZGluZyBSZXNldCBQYXNzd29yZCBMaW5rIHRvICcgKyB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbDtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2Uuc2VuZEZvcmdvdFB3ZEVtYWlsKHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsKTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0UHdkTGlua1NlbnQpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKCdSZXNldCBQYXNzd29yZCBMaW5rIGhhcyBiZWVuIHNlbnQnLCAyMDAwLCAnRGlzbWlzcycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRQd2RMaW5rU2VudCA9IHRydWU7XG5cblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2VtYWlsJykpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdlbWFpbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2VtYWlsJywgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnZhbHVlLnRyaW0oKSk7XG4gICAgfVxuXG4gICAgcmFuZG9tU3RyaW5nID0gKGxlbjogbnVtYmVyLCBhbjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgICAgYW4gPSBhbiAmJiBhbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgc3RyID0gJycsIGkgPSAwO1xuICAgICAgICBjb25zdCBtaW4gPSBhbiA9PT0gJ2EnID8gMTAgOiAwO1xuICAgICAgICBjb25zdCBtYXggPSBhbiA9PT0gJ24nID8gMTAgOiA2MjtcbiAgICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgICAgIGxldCByID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluIDw8IDA7XG4gICAgICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShyICs9IHIgPiA5ID8gciA8IDM2ID8gNTUgOiA2MSA6IDQ4KTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHJlc2VuZFZlcmlmeUVtYWlsID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IHRydWU7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS5zZXRWYWx1ZSh0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICAgICAgdGhpcy5sb2FkZXJUZXh0ID0gJ1NlbmRpbmcgVmVyaWZpY2F0aW9uIGVtYWlsIHRvICcgKyB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbDtcbiAgICAgICAgY29uc3QgcmV0RGF0YSA9IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UucmVzZW5kVmVyaWZpY2F0aW9uQ29kZSh0aGlzLnJkdXJsLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5lbWFpbCk7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcygnVmVyaWZpY2F0aW9uIGVtYWlsIGhhcyBiZWVuIHNlbnQnLCAyMDAwLCAnRGlzbWlzcycpO1xuICAgIH1cblxuICAgIHRvZ2dsZVBhc3N3b3JkRGlzcGxheSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93UGFzc3dvcmQgPSAhdGhpcy5zaG93UGFzc3dvcmQ7XG4gICAgICAgIGNvbnN0IHB3ZElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItcHdkJyk7XG4gICAgICAgIHB3ZElucHV0LnR5cGUgPSB0aGlzLnNob3dQYXNzd29yZCA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XG4gICAgfVxuXG5cbiAgICBjaGVja0lmUmRVcmxJc0xlZ2l0ID0gKCk6IGFueSA9PiB7XG4gICAgICBpZih0aGlzLmlzUGF0aEFic29sdXRlKHRoaXMucmR1cmwpKXtcbiAgICAgICAgbGV0IHVybCA9IG5ldyBVUkwodGhpcy5yZHVybCk7XG4gICAgICAgIGlmKHVybC5ob3N0LmluZGV4T2YoXCJ0b3duc2NyaXB0LmNvbVwiKSA9PSAtMSl7XG4gICAgICAgICAgdGhpcy5yZHVybCA9ICcvJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlzUGF0aEFic29sdXRlID0gKHBhdGgpOiBib29sZWFuID0+IHtcbiAgICAgIHJldHVybiAvXig/OlxcL3xbYS16XSs6XFwvXFwvKS8udGVzdChwYXRoKTtcbiAgICB9XG5cblxufVxuIl19