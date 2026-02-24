import { InjectionToken } from '@angular/core';
export declare class BrowserService {
    private platformId;
    constructor(platformId: InjectionToken<Object>);
    isMobile: () => boolean;
}
