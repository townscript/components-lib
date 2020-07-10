import { HttpClient } from '@angular/common/http';
export declare class HeaderService {
    private http;
    baseUrl: string;
    apiServerUrl: string;
    listingsServerUrl: string;
    constructor(http: HttpClient);
    getplaceSearchResults: (query: any) => import("rxjs").Observable<Object>;
    getPopularCities(countryCode: any): Promise<Object>;
    getSuggestions(searchText: string): Promise<any>;
    postSuggestions(searchText: string): Promise<any>;
}
