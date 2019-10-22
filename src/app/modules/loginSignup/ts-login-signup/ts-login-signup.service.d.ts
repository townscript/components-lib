import { HttpClient, HttpHeaders } from '@angular/common/http';
export declare class TsLoginSignupService {
    private http;
    token: string;
    baseUrl: String;
    apiServerUrl: String;
    headers: HttpHeaders;
    CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY: any;
    constructor(http: HttpClient);
    getUserSignUpDetails: (emailId: string) => Promise<any>;
    loginWithTownscript: (emailId: string, password: string) => Promise<any>;
    registerWithTownscriptWithCaptcha: (formData: any) => Promise<any>;
    sendForgotPwdEmail: (emailId: string) => Promise<any>;
    resendVerificationCode: (rdurl: string, emailId: string) => import("rxjs").Observable<Object>;
}
