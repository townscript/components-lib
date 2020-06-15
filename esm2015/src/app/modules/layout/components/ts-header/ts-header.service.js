import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
            return yield this.http.get(this.listingsServerUrl + 'tsElasticSearch/suggestions/search?search-for-text=' + searchText).toPromise();
        });
    }
    postSuggestions(searchText) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.http.post(this.listingsServerUrl + '/tsElasticSearch/suggestions/add?search-intent=' + searchText, null, {}).toPromise();
        });
    }
};
HeaderService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], HeaderService);
export { HeaderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci90cy1oZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFLdEIsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUhwQyxZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxpQkFBWSxHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzdDLHNCQUFpQixHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBR3ZELDBCQUFxQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsMkJBQTJCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFBO0lBSEQsQ0FBQztJQUlELGdCQUFnQixDQUFDLFdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZUFBZSxHQUFHLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdGLENBQUM7SUFDSyxjQUFjLENBQUMsVUFBa0I7O1lBQ25DLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcscURBQXFELEdBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEksQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLFVBQWtCOztZQUNwQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlEQUFpRCxHQUFHLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0ksQ0FBQztLQUFBO0NBQ0osQ0FBQTtBQXBCWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTs2Q0FNaUIsVUFBVTtHQUwzQixhQUFhLENBb0J6QjtTQXBCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhZGVyU2VydmljZSB7XG5cbiAgICBiYXNlVXJsOiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBhcGlTZXJ2ZXJVcmw6IHN0cmluZyA9IHRoaXMuYmFzZVVybCArICdhcGkvJztcbiAgICBsaXN0aW5nc1NlcnZlclVybDogc3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2xpc3RpbmdzLyc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgfVxuICAgIGdldHBsYWNlU2VhcmNoUmVzdWx0cyA9IChxdWVyeSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzU2VydmVyVXJsICsgJ3BsYWNlL2F1dG9jb21wbGV0ZT9xdWVyeT0nICsgcXVlcnkpO1xuICAgIH1cbiAgICBnZXRQb3B1bGFyQ2l0aWVzKGNvdW50cnlDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAnY2l0eS9wb3B1bGFyLycgKyBjb3VudHJ5Q29kZSkudG9Qcm9taXNlKCk7XG4gICAgfVxuICAgIGFzeW5jIGdldFN1Z2dlc3Rpb25zKHNlYXJjaFRleHQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAndHNFbGFzdGljU2VhcmNoL3N1Z2dlc3Rpb25zL3NlYXJjaD9zZWFyY2gtZm9yLXRleHQ9JytzZWFyY2hUZXh0KS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBhc3luYyBwb3N0U3VnZ2VzdGlvbnMoc2VhcmNoVGV4dDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaHR0cC5wb3N0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAnL3RzRWxhc3RpY1NlYXJjaC9zdWdnZXN0aW9ucy9hZGQ/c2VhcmNoLWludGVudD0nICsgc2VhcmNoVGV4dCwgbnVsbCwge30pLnRvUHJvbWlzZSgpO1xuICAgIH1cbn1cbiJdfQ==