import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../core/app-config';
let SharedService = class SharedService {
    constructor(http) {
        this.http = http;
        this.baseUrl = config.baseUrl;
        this.apiServerUrl = this.baseUrl + 'api/';
        this.listingsUrl = this.baseUrl + 'listings/';
        this.getPopularCitiesByCountryCode = (code) => {
            return this.http.get(this.listingsUrl + 'city/popular/' + code).toPromise();
        };
        this.getNearbyCity = (lat, long) => {
            return this.http.get(this.listingsUrl + 'place/nearbycity?lat=' + lat + '&long=' + long).toPromise();
        };
    }
};
SharedService.ctorParameters = () => [
    { type: HttpClient }
];
SharedService = __decorate([
    Injectable()
], SharedService);
export { SharedService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUkvQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBUXRCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFOcEMsWUFBTyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakMsaUJBQVksR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QyxnQkFBVyxHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBT2pELGtDQUE2QixHQUFHLENBQUMsSUFBWSxFQUFnQixFQUFFO1lBQzNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEYsQ0FBQyxDQUFBO1FBRUQsa0JBQWEsR0FBRyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsdUJBQXVCLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6RyxDQUFDLENBQUE7SUFSRCxDQUFDO0NBVUosQ0FBQTs7WUFYNkIsVUFBVTs7QUFSM0IsYUFBYTtJQUR6QixVQUFVLEVBQUU7R0FDQSxhQUFhLENBbUJ6QjtTQW5CWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vY29yZS9hcHAtY29uZmlnJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcblxuICAgIGJhc2VVcmw6IFN0cmluZyA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIGFwaVNlcnZlclVybDogU3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2FwaS8nO1xuICAgIGxpc3RpbmdzVXJsOiBTdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnbGlzdGluZ3MvJztcblxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICB9XG5cbiAgICBnZXRQb3B1bGFyQ2l0aWVzQnlDb3VudHJ5Q29kZSA9IChjb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzVXJsICsgJ2NpdHkvcG9wdWxhci8nICsgY29kZSkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0TmVhcmJ5Q2l0eSA9IChsYXQ6IHN0cmluZywgbG9uZzogc3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NVcmwgKyAncGxhY2UvbmVhcmJ5Y2l0eT9sYXQ9JyArIGxhdCArICcmbG9uZz0nICsgbG9uZykudG9Qcm9taXNlKCk7XG4gICAgfVxuXG59XG4iXX0=