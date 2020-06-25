import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { config } from '../../../../core/app-config';
var HeaderService = /** @class */ (function () {
    function HeaderService(http) {
        var _this = this;
        this.http = http;
        this.baseUrl = config.baseUrl;
        this.apiServerUrl = this.baseUrl + 'api/';
        this.listingsServerUrl = this.baseUrl + 'listings/';
        this.getplaceSearchResults = function (query) {
            return _this.http.get(_this.listingsServerUrl + 'place/autocomplete?query=' + query);
        };
    }
    HeaderService.prototype.getPopularCities = function (countryCode) {
        return this.http.get(this.listingsServerUrl + 'city/popular/' + countryCode).toPromise();
    };
    HeaderService.prototype.getSuggestions = function (searchText) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.listingsServerUrl + 'tsElasticSearch/suggestions/search?search-for-text=' + encodeURIComponent(searchText)).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HeaderService.prototype.postSuggestions = function (searchText) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.listingsServerUrl + '/tsElasticSearch/suggestions/add?search-intent=' + searchText, null, {}).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HeaderService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    HeaderService = tslib_1.__decorate([
        Injectable()
    ], HeaderService);
    return HeaderService;
}());
export { HeaderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci90cy1oZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUdyRDtJQUtJLHVCQUFvQixJQUFnQjtRQUFwQyxpQkFDQztRQURtQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBSHBDLFlBQU8sR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLGlCQUFZLEdBQVcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDN0Msc0JBQWlCLEdBQVcsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFHdkQsMEJBQXFCLEdBQUcsVUFBQyxLQUFLO1lBQzFCLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGlCQUFpQixHQUFHLDJCQUEyQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3ZGLENBQUMsQ0FBQTtJQUhELENBQUM7SUFJRCx3Q0FBZ0IsR0FBaEIsVUFBaUIsV0FBVztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxlQUFlLEdBQUcsV0FBVyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0YsQ0FBQztJQUNLLHNDQUFjLEdBQXBCLFVBQXFCLFVBQWtCOzs7OzRCQUM1QixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcscURBQXFELEdBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs0QkFBckosc0JBQU8sU0FBOEksRUFBQzs7OztLQUN6SjtJQUVLLHVDQUFlLEdBQXJCLFVBQXNCLFVBQWtCOzs7OzRCQUM3QixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaURBQWlELEdBQUcsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs0QkFBMUksc0JBQU8sU0FBbUksRUFBQzs7OztLQUM5STs7Z0JBZHlCLFVBQVU7O0lBTDNCLGFBQWE7UUFEekIsVUFBVSxFQUFFO09BQ0EsYUFBYSxDQW9CekI7SUFBRCxvQkFBQztDQUFBLEFBcEJELElBb0JDO1NBcEJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWFkZXJTZXJ2aWNlIHtcblxuICAgIGJhc2VVcmw6IHN0cmluZyA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIGFwaVNlcnZlclVybDogc3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2FwaS8nO1xuICAgIGxpc3RpbmdzU2VydmVyVXJsOiBzdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnbGlzdGluZ3MvJztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICB9XG4gICAgZ2V0cGxhY2VTZWFyY2hSZXN1bHRzID0gKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAncGxhY2UvYXV0b2NvbXBsZXRlP3F1ZXJ5PScgKyBxdWVyeSk7XG4gICAgfVxuICAgIGdldFBvcHVsYXJDaXRpZXMoY291bnRyeUNvZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5saXN0aW5nc1NlcnZlclVybCArICdjaXR5L3BvcHVsYXIvJyArIGNvdW50cnlDb2RlKS50b1Byb21pc2UoKTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0U3VnZ2VzdGlvbnMoc2VhcmNoVGV4dDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaHR0cC5nZXQodGhpcy5saXN0aW5nc1NlcnZlclVybCArICd0c0VsYXN0aWNTZWFyY2gvc3VnZ2VzdGlvbnMvc2VhcmNoP3NlYXJjaC1mb3ItdGV4dD0nK2VuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXh0KSkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdFN1Z2dlc3Rpb25zKHNlYXJjaFRleHQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAucG9zdCh0aGlzLmxpc3RpbmdzU2VydmVyVXJsICsgJy90c0VsYXN0aWNTZWFyY2gvc3VnZ2VzdGlvbnMvYWRkP3NlYXJjaC1pbnRlbnQ9JyArIHNlYXJjaFRleHQsIG51bGwsIHt9KS50b1Byb21pc2UoKTtcbiAgICB9XG59XG4iXX0=