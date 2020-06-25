import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../../../../core/app-config';
let HeaderService = class HeaderService {
    constructor(http) {
        this.http = http;
        this.baseUrl = config.baseUrl;
        this.apiServerUrl = this.baseUrl + 'api/';
        this.listingsServerUrl = this.baseUrl + 'listings/';
        this.getplaceSearchResults = (query) => {
            return this.http.get(this.listingsServerUrl + 'place/autocomplete?query=' + query);
        };
    }
    getPopularCities(countryCode) {
        return this.http.get(this.listingsServerUrl + 'city/popular/' + countryCode).toPromise();
    }
    getSuggestions(searchText) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.http.get(this.listingsServerUrl + 'tsElasticSearch/suggestions/search?search-for-text=' + encodeURIComponent(searchText)).toPromise();
        });
    }
    postSuggestions(searchText) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.http.post(this.listingsServerUrl + '/tsElasticSearch/suggestions/add?search-intent=' + searchText, null, {}).toPromise();
        });
    }
};
HeaderService.ctorParameters = () => [
    { type: HttpClient }
];
HeaderService = tslib_1.__decorate([
    Injectable()
], HeaderService);
export { HeaderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci90cy1oZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUdyRCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBS3RCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFIcEMsWUFBTyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakMsaUJBQVksR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QyxzQkFBaUIsR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUd2RCwwQkFBcUIsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLDJCQUEyQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3ZGLENBQUMsQ0FBQTtJQUhELENBQUM7SUFJRCxnQkFBZ0IsQ0FBQyxXQUFXO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3RixDQUFDO0lBQ0ssY0FBYyxDQUFDLFVBQWtCOztZQUNuQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLHFEQUFxRCxHQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUosQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLFVBQWtCOztZQUNwQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlEQUFpRCxHQUFHLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0ksQ0FBQztLQUFBO0NBQ0osQ0FBQTs7WUFmNkIsVUFBVTs7QUFMM0IsYUFBYTtJQUR6QixVQUFVLEVBQUU7R0FDQSxhQUFhLENBb0J6QjtTQXBCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhZGVyU2VydmljZSB7XG5cbiAgICBiYXNlVXJsOiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBhcGlTZXJ2ZXJVcmw6IHN0cmluZyA9IHRoaXMuYmFzZVVybCArICdhcGkvJztcbiAgICBsaXN0aW5nc1NlcnZlclVybDogc3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2xpc3RpbmdzLyc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgfVxuICAgIGdldHBsYWNlU2VhcmNoUmVzdWx0cyA9IChxdWVyeSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzU2VydmVyVXJsICsgJ3BsYWNlL2F1dG9jb21wbGV0ZT9xdWVyeT0nICsgcXVlcnkpO1xuICAgIH1cbiAgICBnZXRQb3B1bGFyQ2l0aWVzKGNvdW50cnlDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAnY2l0eS9wb3B1bGFyLycgKyBjb3VudHJ5Q29kZSkudG9Qcm9taXNlKCk7XG4gICAgfVxuICAgIGFzeW5jIGdldFN1Z2dlc3Rpb25zKHNlYXJjaFRleHQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAndHNFbGFzdGljU2VhcmNoL3N1Z2dlc3Rpb25zL3NlYXJjaD9zZWFyY2gtZm9yLXRleHQ9JytlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGV4dCkpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGFzeW5jIHBvc3RTdWdnZXN0aW9ucyhzZWFyY2hUZXh0OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwLnBvc3QodGhpcy5saXN0aW5nc1NlcnZlclVybCArICcvdHNFbGFzdGljU2VhcmNoL3N1Z2dlc3Rpb25zL2FkZD9zZWFyY2gtaW50ZW50PScgKyBzZWFyY2hUZXh0LCBudWxsLCB7fSkudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19