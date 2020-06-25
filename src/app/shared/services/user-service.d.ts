import { InjectionToken } from '@angular/core';
import { CookieService } from '../../core/cookie.service';
import { UtilityService } from './utilities.service';
export declare class UserService {
    private utilityService;
    private cookieService;
    private document;
    private platformId;
    private user$;
    documentIsAccessible: boolean;
    user: import("rxjs").Observable<Object>;
    constructor(utilityService: UtilityService, cookieService: CookieService, document: any, platformId: InjectionToken<Object>);
    updateUser(data: any): void;
}
