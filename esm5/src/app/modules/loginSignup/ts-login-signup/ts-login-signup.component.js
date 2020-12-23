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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN2SSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMvRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWpELElBQU0sVUFBVSxHQUFHLHFFQUFxRSxDQUFDO0FBUXpGO0lBK0NJLGdDQUNZLGNBQThCLEVBQzlCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsWUFBMEIsRUFDMUIsY0FBOEI7UUFQMUMsbUJBUUs7UUFQTyxt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QixDQWtYbEM7SUFBRCw2QkFBQztDQUFBLEFBbFhELElBa1hDO1NBbFhZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IFJlY2FwdGNoYUNvbXBvbmVudCB9IGZyb20gJ25nLXJlY2FwdGNoYSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUc0xvZ2luU2lnbnVwU2VydmljZSB9IGZyb20gJy4vdHMtbG9naW4tc2lnbnVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGxhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5jb25zdCBlbWFpbFJlZ2V4ID0gJ15bYS16MC05XSsoXFwuW19hLXowLTldKykqQFthLXowLTktXSsoXFwuW2EtejAtOS1dKykqKFxcLlthLXpdezIsMTV9KSQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC10cy1sb2dpbi1zaWdudXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90cy1sb2dpbi1zaWdudXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFRzTG9naW5TaWdudXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBtb2RlOiBhbnk7XG4gICAgQElucHV0KCkgZGVmYXVsdEhlYWRlcjogYW55ID0gJ0xldFxcJ3MgZ2V0IHN0YXJ0ZWQnO1xuICAgIEBJbnB1dCgpIGRlZmF1bHRTdWJIZWFkZXI6IGFueSA9ICdZb3VyIG9uZSBzdG9wIHRvb2wgZm9yIG9yZ2FuaXppbmcgZXZlbnRzJztcbiAgICBASW5wdXQoKSByZHVybDogYW55O1xuICAgIEBJbnB1dCgpIHNob3dTb2NpYWw6IGFueSA9IHRydWU7XG4gICAgQElucHV0KCkgc291cmNlOiBhbnk7XG4gICAgQE91dHB1dCgpIGNsb3NlRGlhbG9nID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgncmVjYXB0Y2hhUmVmJywgeyByZWFkOiB0cnVlLCBzdGF0aWM6IHRydWUgfSlcbiAgICByZWNhcHRjaGFSZWY6IFJlY2FwdGNoYUNvbXBvbmVudDtcblxuICAgIGNhcHRjaGFUb2tlbjogYW55ID0gdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5DQVBUQ0hBX1NJVEVfSU5WSVNJQkxFX0NBUFRDSEFfS0VZO1xuXG4gICAgc2hvdyA9IGZhbHNlO1xuICAgIHNob3dQYXNzd29yZCA9IGZhbHNlO1xuICAgIGlzRGVmYXVsdFZpZXcgPSB0cnVlO1xuICAgIGlzU2lnbkluVmlldyA9IGZhbHNlO1xuICAgIGlzU2lnblVwVmlldyA9IGZhbHNlO1xuICAgIGlzVmVyaWZ5RW1haWxWaWV3ID0gZmFsc2U7XG4gICAgc2hvd1Jlc2V0UGFzc3dvcmQgPSBmYWxzZTtcblxuICAgIHVzZXJUaW1lem9uZTogYW55ID0gRGF0ZVRpbWUubG9jYWwoKS56b25lTmFtZTtcbiAgICBsb2dpbkZvcm06IGFueTtcbiAgICBjYXB0Y2hhUmVzcG9uc2U6IGFueTtcbiAgICBjb3JyZWN0UGhvbmVOdW1iZXI6IGFueSA9IG51bGw7XG4gICAgcGhvbmVFcnJvciA9IGZhbHNlO1xuICAgIHNvY2lhbExvZ2luTXNnOiBhbnkgPSBmYWxzZTtcbiAgICBpbml0aWFsaXplVGVsSW5wdXQ6IGFueTtcbiAgICBzaWduSW5FcnJNZXNzYWdlID0gJyc7XG4gICAgcmVzZXRQd2RMaW5rU2VudCA9IGZhbHNlO1xuICAgIHNpZ25VcEVyck1lc3NhZ2UgPSAnJztcblxuICAgIGZiTG9naW5VUkwgPSBjb25maWcuYmFzZVVybCArICdhcGkvJ1xuICAgICAgICArICd1c2VyL3NpZ25pbndpdGhmYWNlYm9vayc7XG4gICAgZ29vZ2xlTG9naW5VUkwgPSBjb25maWcuYmFzZVVybCArICdhcGkvJ1xuICAgICAgICArICd1c2VyL3NpZ25pbndpdGhnb29nbGUnO1xuICAgIGludGxJbnB1dDogYW55O1xuICAgIHNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICBsb2FkZXJUZXh0OiBhbnk7XG4gICAgY291bnRyeUNvZGU6IGFueSA9ICdJTic7XG4gICAgc3ViT2JqZWN0OiBhbnk7XG4gICAgc2hvd0NvbmZpcm1hdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGJhc2VVcmw6IGFueSA9IHRoaXMudHNMb2dpblNpZ251cFNlcnZpY2UuYmFzZVVybDtcbiAgICB1c2VyTmFtZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdHNMb2dpblNpZ251cFNlcnZpY2U6IFRzTG9naW5TaWdudXBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHBsYWNlU2VydmljZTogUGxhY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgICAgICB0aGlzLnN1Yk9iamVjdCA9IHRoaXMucGxhY2VTZXJ2aWNlLnBsYWNlLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhyZXMpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGxhY2VEYXRhID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRyeUNvZGUgPSBwbGFjZURhdGFbJ2NvdW50cnknXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICBpZiAocGFyYW1zWydyZHVybCddKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZHVybCA9IHBhcmFtc1sncmR1cmwnXTtcbiAgICAgICAgICAgICAgICB0aGlzLnJkdXJsID0gZGVjb2RlVVJJQ29tcG9uZW50KHRoaXMucmR1cmwpO1xuICAgICAgICAgICAgICAgIHRoaXMucmR1cmwgPSB0aGlzLnJkdXJsLnJlcGxhY2UoXCJbXCIsIFwiJTVCXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmR1cmwgPSB0aGlzLnJkdXJsLnJlcGxhY2UoXCJdXCIsIFwiJTVEXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICBpZiAoY2hhbmdlc1sncmR1cmwnXSkge1xuICAgICAgICB0aGlzLmZiTG9naW5VUkwgPSBjb25maWcuYmFzZVVybCArICdhcGkvJ1xuICAgICAgICAgICAgKyAndXNlci9zaWduaW53aXRoZmFjZWJvb2snICsgKHRoaXMucmR1cmwgPT0gdW5kZWZpbmVkID8gJycgOiAnP3JkdXJsPScgKyB0aGlzLnJkdXJsKTtcbiAgICAgICAgdGhpcy5nb29nbGVMb2dpblVSTCA9IGNvbmZpZy5iYXNlVXJsICsgJ2FwaS8nXG4gICAgICAgICAgICArICd1c2VyL3NpZ25pbndpdGhnb29nbGUnICsgKHRoaXMucmR1cmwgPT0gdW5kZWZpbmVkID8gJycgOiAnP3JkdXJsPScgKyB0aGlzLnJkdXJsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3ViT2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViT2JqZWN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0Rm9ybSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICAgICAgICdmdWxsTmFtZSc6IG5ldyBGb3JtQ29udHJvbCgnJywgeyB2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkIH0pLFxuICAgICAgICAgICAgJ2VtYWlsJzogbmV3IEZvcm1Db250cm9sKCcnLCB7IHZhbGlkYXRvcnM6IFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLnBhdHRlcm4oZW1haWxSZWdleCldIH0pLFxuICAgICAgICAgICAgJ3Bhc3N3b3JkJzogbmV3IEZvcm1Db250cm9sKCcnLCB7IHZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWQgfSksXG4gICAgICAgICAgICAncGhvbmVOdW1iZXInOiBuZXcgRm9ybUNvbnRyb2woJycsIHsgdmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZCB9KVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwaG9uZU51bWJlcicpLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICBjbG9zZSA9IChzaWduZWRJbik6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmNsb3NlRGlhbG9nLmVtaXQoc2lnbmVkSW4pO1xuICAgIH1cblxuICAgIGNsZWFyRXJyb3JzID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNvY2lhbExvZ2luTXNnID0gJyc7XG4gICAgfVxuXG4gICAgcmVzb2x2ZSA9IChjYXB0Y2hhUmVzcG9uc2U6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmNhcHRjaGFSZXNwb25zZSA9IGNhcHRjaGFSZXNwb25zZTtcbiAgICB9XG5cbiAgICBwYXNzd29yZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5zaG93ID0gIXRoaXMuc2hvdztcbiAgICB9XG5cbiAgICB2ZXJpZnlFbWFpbCA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMubG9naW5Gb3JtLmNvbnRyb2xzLmVtYWlsLnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnRzTG9naW5TaWdudXBTZXJ2aWNlLmdldFVzZXJTaWduVXBEZXRhaWxzKHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsKTtcbiAgICAgICAgbGV0IG5ld0RhdGEgPSByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIG5ld0RhdGEgPSBKU09OLnBhcnNlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeGNlcHRpb24gd2hpbGUgcGFyc2luZyBhcGkgcmVzcG9uc2UgOiBcIiArIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0RhdGEgJiYgbmV3RGF0YS5pc0V4aXN0aW5nVXNlciAmJiBuZXdEYXRhLmlzTWFudWFsU2lnbnVwICYmICFuZXdEYXRhLmlzVGVtcG9yYXJ5VXNlcikge1xuICAgICAgICAgICAgdGhpcy5vcGVuU2lnbkluVmlldygpO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld0RhdGEgJiYgbmV3RGF0YS5pc0V4aXN0aW5nVXNlciAmJiAhbmV3RGF0YS5pc01hbnVhbFNpZ251cCAmJiAhbmV3RGF0YS5pc1RlbXBvcmFyeVVzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuU2lnblVwVmlldygpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVGVsSW5wdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVJbnRsVGVsSW5wdXQoKTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0aWFsaXplSW50bFRlbElucHV0ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAvLyBpbml0aWFsaXplIGludGwgdGVsXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bob25lTnVtYmVyJyk7XG4gICAgICAgIHRoaXMuaW50bElucHV0ID0gKDxhbnk+d2luZG93KS5pbnRsVGVsSW5wdXQoaW5wdXQsIHtcbiAgICAgICAgICAgIGluaXRpYWxDb3VudHJ5OiB0aGlzLmNvdW50cnlDb2RlLFxuICAgICAgICAgICAgcHJlZmVycmVkQ291bnRyaWVzOiBbXCJpblwiLCBcImlkXCIsIFwic2dcIiwgXCJteVwiXSxcbiAgICAgICAgICAgIHV0aWxTY3JpcHRzOiAnLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ludGwtdGVsLWlucHV0L2J1aWxkL2pzL3V0aWxzLmpzJ1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHZhbGlkYXRlUGhvbmVOdW1iZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbnRsSW5wdXQuaXNWYWxpZE51bWJlcigpKSB7XG4gICAgICAgICAgICB0aGlzLnBob25lRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm0uY29udHJvbHMucGhvbmVOdW1iZXIuc2V0RXJyb3JzKHsgJ3ZhbGlkJzogZmFsc2UgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybS5jb250cm9scy5waG9uZU51bWJlci5zZXRFcnJvcnMoKTtcbiAgICAgICAgICAgIHRoaXMucGhvbmVFcnJvciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2lnbkluID0gYXN5bmMgKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbkZvcm0udmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xuICAgICAgICBjb25zdCByZXREYXRhID0gYXdhaXQgdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5sb2dpbldpdGhUb3duc2NyaXB0KHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5wYXNzd29yZCk7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRlciA9IGZhbHNlO1xuICAgICAgICBpZiAocmV0RGF0YS5yZXN1bHQgIT0gJ1N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICB0aGlzLnNpZ25JbkVyck1lc3NhZ2UgPSByZXREYXRhLmRhdGE7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93Q29uZmlybWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgdG9rZW5EYXRhID0ge1xuICAgICAgICAgICAgdG9rZW46IChyZXREYXRhLmRhdGEpXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSB7IC4uLnJldERhdGEudXNlckRldGFpbHMsIC4uLnRva2VuRGF0YSB9O1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gdXNlckRhdGEudXNlcjtcbiAgICAgICAgY29uc3QgaXNPcmdhbml6ZXIgPSB1c2VyRGF0YS5pc09yZ2FuaXplcjtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VyTmFtZSk7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UudXBkYXRlVXNlcih1c2VyRGF0YSk7XG4gICAgICAgIC8vIHRoaXMuY29va2llU2VydmljZS5zZXRDb29raWUoJ3Rvd25zY3JpcHQtdXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXJEYXRhKSwgOTApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RpYWxvZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBubyByZWRpcmVjdGlvbiBuZWVkZWQgLGluIGNhc2Ugb2YgZm9sbG93XG4gICAgICAgICAgICBpZiAodGhpcy5zb3VyY2UgIT0gJ2ZvbGxvdycpIHtcbiAgICAgICAgICAgICAgaWYodGhpcy5yZHVybCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cub3Blbih0aGlzLnJkdXJsLCAnX3NlbGYnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYoaXNPcmdhbml6ZXIpe1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKCcvZGFzaGJvYXJkJywgJ19zZWxmJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDE0MDApO1xuXG5cblxuICAgIH1cblxuICAgIHNpZ25VcCA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2Z1bGxOYW1lJykuc2V0VmFsdWUodGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIGlmICghdGhpcy5sb2dpbkZvcm0udmFsaWQgfHwgdGhpcy5jYXB0Y2hhUmVzcG9uc2UgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGhvbmVOdW1iZXInKTtcbiAgICAgICAgY29uc3QgaXRpID0gKDxhbnk+d2luZG93KS5pbnRsVGVsSW5wdXRHbG9iYWxzLmdldEluc3RhbmNlKGlucHV0KTtcbiAgICAgICAgdGhpcy5jb3JyZWN0UGhvbmVOdW1iZXIgPSBpdGkuZ2V0TnVtYmVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29ycmVjdFBob25lTnVtYmVyID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5waG9uZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvYWRlclRleHQgPSAnUGxlYXNlIHdhaXQgd2hpbGUgd2UgYXJlIGNyZWF0aW5nIHlvdXIgYWNjb3VudC4nO1xuXG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5yZWdpc3RlcldpdGhUb3duc2NyaXB0V2l0aENhcHRjaGEodGhpcy5nZXRGb3JtRGF0YUZvclJlZ2lzdGVyKCkpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXhjZXB0aW9uIHdoaWxlIHBhcnNpbmcgYXBpIHJlc3BvbnNlIDogXCIgKyBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhWydyZXN1bHQnXSA9PSAnRXJyb3InKSB7XG4gICAgICAgICAgICBzZWxmLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuc2lnblVwRXJyTWVzc2FnZSA9IGRhdGFbJ2RhdGEnXTtcbiAgICAgICAgICAgIGxldCBfdGhpcyA9IHNlbGY7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbml0aWFsaXplSW50bFRlbElucHV0KCk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYub3BlblZlcmlmeUVtYWlsVmlldygpO1xuICAgIH1cblxuICAgIGdldEZvcm1EYXRhRm9yUmVnaXN0ZXIgPSAoKTogRm9ybURhdGEgPT4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCB0aGlzLmxvZ2luRm9ybS52YWx1ZS5mdWxsTmFtZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZW1haWxpZCcsIHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdwYXNzd29yZCcsIHRoaXMubG9naW5Gb3JtLnZhbHVlLnBhc3N3b3JkKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdwaG9uZScsIHRoaXMuY29ycmVjdFBob25lTnVtYmVyKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd1c2VydGltZXpvbmUnLCB0aGlzLnVzZXJUaW1lem9uZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncmVDYXB0Y2hhJywgdGhpcy5jYXB0Y2hhUmVzcG9uc2UpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3VzZXJuYW1lJywgdGhpcy5yYW5kb21TdHJpbmcoMTAsICcnKSk7XG4gICAgICAgIGlmICh0aGlzLnJkdXJsKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3JkdXJsJywgdGhpcy5yZHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgIH1cblxuICAgIGZvcmdvdFBhc3N3b3JkID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bhc3N3b3JkJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLnNob3dSZXNldFBhc3N3b3JkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduSW5WaWV3ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ29CYWNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5zaG93UmVzZXRQYXNzd29yZCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuU2lnbkluVmlldygpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTaWduSW5WaWV3IHx8IHRoaXMuaXNTaWduVXBWaWV3IHx8IHRoaXMuaXNWZXJpZnlFbWFpbFZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbkRlZmF1bHRWaWV3KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5TaWduSW5WaWV3ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNob3dSZXNldFBhc3N3b3JkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduSW5WaWV3ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdwYXNzd29yZCcpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLnNob3dTb2NpYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zb2NpYWxMb2dpbk1zZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRGVmYXVsdFZpZXcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvcGVuU2lnblVwVmlldyA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5pc1NpZ25VcFZpZXcgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dTb2NpYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0RlZmF1bHRWaWV3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc29jaWFsTG9naW5Nc2cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdmdWxsTmFtZScpLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bhc3N3b3JkJykuZW5hYmxlKCk7XG4gICAgICAgIHRoaXMubG9naW5Gb3JtLmdldCgncGhvbmVOdW1iZXInKS5lbmFibGUoKTtcbiAgICB9XG5cbiAgICBvcGVuRGVmYXVsdFZpZXcgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaXNWZXJpZnlFbWFpbFZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1NpZ25VcFZpZXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93UmVzZXRQYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU2lnbkluVmlldyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dTb2NpYWwgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzRGVmYXVsdFZpZXcgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2Z1bGxOYW1lJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bhc3N3b3JkJykuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ3Bob25lTnVtYmVyJykuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIG9wZW5WZXJpZnlFbWFpbFZpZXcgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuaXNWZXJpZnlFbWFpbFZpZXcgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U29jaWFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTaWduVXBWaWV3ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVzZXRQYXNzd29yZCA9IGFzeW5jICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykuc2V0VmFsdWUodGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnZhbHVlLnRyaW0oKSk7XG4gICAgICAgIHRoaXMubG9hZGVyVGV4dCA9ICdTZW5kaW5nIFJlc2V0IFBhc3N3b3JkIExpbmsgdG8gJyArIHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsO1xuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5zZW5kRm9yZ290UHdkRW1haWwodGhpcy5sb2dpbkZvcm0udmFsdWUuZW1haWwpO1xuICAgICAgICB0aGlzLnNob3dMb2FkZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMucmVzZXRQd2RMaW5rU2VudCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnN1Y2Nlc3MoJ1Jlc2V0IFBhc3N3b3JkIExpbmsgaGFzIGJlZW4gc2VudCcsIDIwMDAsICdEaXNtaXNzJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFB3ZExpbmtTZW50ID0gdHJ1ZTtcblxuXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZW1haWwnKSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2VtYWlsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZW1haWwnLCB0aGlzLmxvZ2luRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUudHJpbSgpKTtcbiAgICB9XG5cbiAgICByYW5kb21TdHJpbmcgPSAobGVuOiBudW1iZXIsIGFuOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgICBhbiA9IGFuICYmIGFuLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGxldCBzdHIgPSAnJywgaSA9IDA7XG4gICAgICAgIGNvbnN0IG1pbiA9IGFuID09PSAnYScgPyAxMCA6IDA7XG4gICAgICAgIGNvbnN0IG1heCA9IGFuID09PSAnbicgPyAxMCA6IDYyO1xuICAgICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICAgICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4gPDwgMDtcbiAgICAgICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHIgKz0gciA+IDkgPyByIDwgMzYgPyA1NSA6IDYxIDogNDgpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcmVzZW5kVmVyaWZ5RW1haWwgPSBhc3luYyAoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2dpbkZvcm0uZ2V0KCdlbWFpbCcpLnNldFZhbHVlKHRoaXMubG9naW5Gb3JtLmdldCgnZW1haWwnKS52YWx1ZS50cmltKCkpO1xuICAgICAgICB0aGlzLmxvYWRlclRleHQgPSAnU2VuZGluZyBWZXJpZmljYXRpb24gZW1haWwgdG8gJyArIHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsO1xuICAgICAgICBjb25zdCByZXREYXRhID0gdGhpcy50c0xvZ2luU2lnbnVwU2VydmljZS5yZXNlbmRWZXJpZmljYXRpb25Db2RlKHRoaXMucmR1cmwsIHRoaXMubG9naW5Gb3JtLnZhbHVlLmVtYWlsKTtcbiAgICAgICAgdGhpcy5zaG93TG9hZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKCdWZXJpZmljYXRpb24gZW1haWwgaGFzIGJlZW4gc2VudCcsIDIwMDAsICdEaXNtaXNzJyk7XG4gICAgfVxuXG4gICAgdG9nZ2xlUGFzc3dvcmREaXNwbGF5ID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNob3dQYXNzd29yZCA9ICF0aGlzLnNob3dQYXNzd29yZDtcbiAgICAgICAgY29uc3QgcHdkSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1wd2QnKTtcbiAgICAgICAgcHdkSW5wdXQudHlwZSA9IHRoaXMuc2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJztcbiAgICB9XG5cbn1cbiJdfQ==