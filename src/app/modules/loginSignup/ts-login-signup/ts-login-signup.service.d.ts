import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../shared/services/api-service';
export declare class TsLoginSignupService {
    apiService: ApiService;
    private http;
    token: any;
    headers: HttpHeaders;
    CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY: any;
    constructor(apiService: ApiService, http: HttpClient);
    getUserSignUpDetails: (emailId: string) => Promise<any>;
    loginWithTownscript: (emailId: string, password: string) => Promise<any>;
    registerWithTownscriptWithCaptcha: (formData: any) => Promise<any>;
    sendForgotPwdEmail: (emailId: string) => Promise<any>;
    resendVerificationCode: (rdurl: string, emailId: string) => import("rxjs").Observable<Object>;
}
