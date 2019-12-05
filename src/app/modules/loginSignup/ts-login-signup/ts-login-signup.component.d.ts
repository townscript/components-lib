import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import { CookieService } from '../../../core/cookie.service';
import { UserService } from '../../../shared/services/user-service';
import { NotificationService } from '../../../shared/services/notification.service';
import { TsLoginSignupService } from './ts-login-signup.service';
import { PlaceService } from '../../layout/components/ts-header/place.service';
export declare class TsLoginSignupComponent implements OnInit, OnDestroy {
    private cookieService;
    private userService;
    private notificationService;
    private tsLoginSignupService;
    private placeService;
    mode: any;
    defaultHeader: any;
    defaultSubHeader: any;
    rdurl: any;
    showSocial: any;
    closeDialog: EventEmitter<{}>;
    recaptchaRef: RecaptchaComponent;
    captchaToken: any;
    show: boolean;
    showPassword: boolean;
    isDefaultView: boolean;
    isSignInView: boolean;
    isSignUpView: boolean;
    isVerifyEmailView: boolean;
    showResetPassword: boolean;
    userTimezone: any;
    loginForm: any;
    captchaResponse: any;
    correctPhoneNumber: any;
    phoneError: boolean;
    socialLoginMsg: any;
    initializeTelInput: any;
    signInErrMessage: string;
    resetPwdLinkSent: boolean;
    signUpErrMessage: string;
    fbLoginURL: string;
    googleLoginURL: string;
    intlInput: any;
    showLoader: boolean;
    loaderText: any;
    countryCode: any;
    subObject: any;
    showConfirmation: boolean;
    baseUrl: any;
    userName: any;
    constructor(cookieService: CookieService, userService: UserService, notificationService: NotificationService, tsLoginSignupService: TsLoginSignupService, placeService: PlaceService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    initForm: () => void;
    close: () => void;
    clearErrors: () => void;
    resolve: (captchaResponse: string) => void;
    password: () => void;
    verifyEmail: () => Promise<any>;
    initializeIntlTelInput: () => void;
    validatePhoneNumber: () => void;
    signIn: () => Promise<any>;
    signUp: () => Promise<any>;
    getFormDataForRegister: () => FormData;
    forgotPassword: () => void;
    goBack: () => void;
    openSignInView: () => void;
    openSignUpView: () => void;
    openDefaultView: () => void;
    openVerifyEmailView: () => void;
    resetPassword: () => Promise<any>;
    randomString: (len: number, an: string) => string;
    resendVerifyEmail: () => Promise<any>;
    togglePasswordDisplay: () => void;
}