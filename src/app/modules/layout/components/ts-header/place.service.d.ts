import { InjectionToken } from '@angular/core';
import { CookieService } from '../../../../core/cookie.service';
import { HttpClient } from '@angular/common/http';
export declare class PlaceService {
    private cookieService;
    private document;
    private platformId;
    private http;
    private currentPlace$;
    documentIsAccessible: boolean;
    place: import("rxjs").Observable<Object>;
    constructor(cookieService: CookieService, document: any, platformId: InjectionToken<Object>, http: HttpClient);
    updatePlace(data: any): void;
    getLocationFromIpInfo(): Promise<any>;
    getJsonFromIpInfo(): Promise<Object>;
}
