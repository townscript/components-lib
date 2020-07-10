import { InjectionToken } from '@angular/core';
export declare class CookieService {
    private platformId;
    constructor(platformId: InjectionToken<Object>);
    getCookie(name: string): string | null;
    deleteCookie: (name: string) => void;
    setCookie: (name: string, value: string, expireDays: number, path?: string) => void;
}
