import { HttpClient } from '@angular/common/http';
export declare class HeaderService {
    private http;
    baseUrl: string;
    apiServerUrl: string;
    constructor(http: HttpClient);
    getplaceSearchResults: (query: any) => import("rxjs").Observable<Object>;
    getPopularCities(countryCode: any): import("rxjs").Observable<Object>;
}
