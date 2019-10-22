export declare class CookieService {
    constructor();
    getCookie(name: string): string;
    deleteCookie(name: any): void;
    setCookie(name: string, value: string, expireDays: number, path?: string): void;
}
