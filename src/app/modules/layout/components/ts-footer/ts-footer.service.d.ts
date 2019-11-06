import { HttpClient } from '@angular/common/http';
export declare class FooterService {
    private http;
    baseUrl: string;
    listingsUrl: string;
    constructor(http: HttpClient);
    getPopularEvents: (lat: any, long: any) => Promise<any>;
    getCityFromCityCode: (code: string) => Promise<any>;
    getAllPopularCities: () => Promise<any>;
}
