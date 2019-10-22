import { InjectionToken } from '@angular/core';
import { CookieService } from '../../../../core/cookie.service';
export declare class PlaceService {
    private cookieService;
    private document;
    private platformId;
    private currentPlace$;
    documentIsAccessible: boolean;
    place: import("rxjs").Observable<Object>;
    constructor(cookieService: CookieService, document: any, platformId: InjectionToken<Object>);
    updatePlace(data: any): void;
}
