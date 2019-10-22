export declare class CookieService {
    constructor();
    getCookie(name: string): string;
    deleteCookie: (name: string) => void;
    setCookie: (name: string, value: string, expireDays: number, path?: string) => void;
}
