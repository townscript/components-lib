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
            return yield this.http.get(this.listingsServerUrl + 'tsElasticSearch/suggestions/search?search-for-text=' + encodeURIComponent(searchText)).toPromise();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci90cy1oZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFLdEIsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUhwQyxZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxpQkFBWSxHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzdDLHNCQUFpQixHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBR3ZELDBCQUFxQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsMkJBQTJCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFBO0lBSEQsQ0FBQztJQUlELGdCQUFnQixDQUFDLFdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZUFBZSxHQUFHLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdGLENBQUM7SUFDSyxjQUFjLENBQUMsVUFBa0I7O1lBQ25DLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcscURBQXFELEdBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxSixDQUFDO0tBQUE7SUFFSyxlQUFlLENBQUMsVUFBa0I7O1lBQ3BDLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaURBQWlELEdBQUcsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvSSxDQUFDO0tBQUE7Q0FDSixDQUFBO0FBcEJZLGFBQWE7SUFEekIsVUFBVSxFQUFFOzZDQU1pQixVQUFVO0dBTDNCLGFBQWEsQ0FvQnpCO1NBcEJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWFkZXJTZXJ2aWNlIHtcblxuICAgIGJhc2VVcmw6IHN0cmluZyA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIGFwaVNlcnZlclVybDogc3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2FwaS8nO1xuICAgIGxpc3RpbmdzU2VydmVyVXJsOiBzdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnbGlzdGluZ3MvJztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICB9XG4gICAgZ2V0cGxhY2VTZWFyY2hSZXN1bHRzID0gKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAncGxhY2UvYXV0b2NvbXBsZXRlP3F1ZXJ5PScgKyBxdWVyeSk7XG4gICAgfVxuICAgIGdldFBvcHVsYXJDaXRpZXMoY291bnRyeUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5saXN0aW5nc1NlcnZlclVybCArICdjaXR5L3BvcHVsYXIvJyArIGNvdW50cnlDb2RlKS50b1Byb21pc2UoKTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0U3VnZ2VzdGlvbnMoc2VhcmNoVGV4dDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaHR0cC5nZXQodGhpcy5saXN0aW5nc1NlcnZlclVybCArICd0c0VsYXN0aWNTZWFyY2gvc3VnZ2VzdGlvbnMvc2VhcmNoP3NlYXJjaC1mb3ItdGV4dD0nK2VuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXh0KSkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdFN1Z2dlc3Rpb25zKHNlYXJjaFRleHQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAucG9zdCh0aGlzLmxpc3RpbmdzU2VydmVyVXJsICsgJy90c0VsYXN0aWNTZWFyY2gvc3VnZ2VzdGlvbnMvYWRkP3NlYXJjaC1pbnRlbnQ9JyArIHNlYXJjaFRleHQsIG51bGwsIHt9KS50b1Byb21pc2UoKTtcbiAgICB9XG59XG4iXX0=