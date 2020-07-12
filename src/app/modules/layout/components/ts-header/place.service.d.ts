import { InjectionToken } from '@angular/core';
import { CookieService } from '../../../../core/cookie.service';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../../../../shared/services/utilities.service';
export declare class PlaceService {
    private utilityService;
    private cookieService;
    private document;
    private platformId;
    private http;
    private currentPlace$;
    documentIsAccessible: boolean;
    place: import("rxjs").Observable<Object>;
    constructor(utilityService: UtilityService, cookieService: CookieService, document: any, platformId: InjectionToken<Object>, http: HttpClient);
    setLocationCookie(data: any): void;
    updatePlace(data: any): void;
    getLocationFromIpInfo(): Promise<any>;
    getJsonFromIpInfo(): Promise<Object>;
    callMaxMindTest(): void;
}
