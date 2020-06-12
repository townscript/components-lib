import { HttpClient } from '@angular/common/http';
export declare class SharedService {
    private http;
    baseUrl: String;
    apiServerUrl: String;
    listingsUrl: String;
    constructor(http: HttpClient);
    getPopularCitiesByCountryCode: (code: string) => Promise<any>;
    getNearbyCity: (lat: string, long: string) => Promise<Object>;
}
