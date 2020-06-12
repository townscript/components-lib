import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
                    case 0: return [4 /*yield*/, this.http.get(this.listingsServerUrl + 'tsElasticSearch/suggestions/search?search-for-text=' + searchText).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HeaderService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HeaderService);
    return HeaderService;
}());
export { HeaderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci90cy1oZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JEO0lBS0ksdUJBQW9CLElBQWdCO1FBQXBDLGlCQUNDO1FBRG1CLFNBQUksR0FBSixJQUFJLENBQVk7UUFIcEMsWUFBTyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakMsaUJBQVksR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QyxzQkFBaUIsR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUd2RCwwQkFBcUIsR0FBRyxVQUFDLEtBQUs7WUFDMUIsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsMkJBQTJCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFBO0lBSEQsQ0FBQztJQUlELHdDQUFnQixHQUFoQixVQUFpQixXQUFXO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3RixDQUFDO0lBQ0ssc0NBQWMsR0FBcEIsVUFBcUIsVUFBa0I7Ozs7NEJBQzVCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxxREFBcUQsR0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs0QkFBakksc0JBQU8sU0FBMEgsRUFBQzs7OztLQUNySTtJQWZRLGFBQWE7UUFEekIsVUFBVSxFQUFFO2lEQU1pQixVQUFVO09BTDNCLGFBQWEsQ0FnQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWhCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVhZGVyU2VydmljZSB7XG5cbiAgICBiYXNlVXJsOiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBhcGlTZXJ2ZXJVcmw6IHN0cmluZyA9IHRoaXMuYmFzZVVybCArICdhcGkvJztcbiAgICBsaXN0aW5nc1NlcnZlclVybDogc3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2xpc3RpbmdzLyc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgfVxuICAgIGdldHBsYWNlU2VhcmNoUmVzdWx0cyA9IChxdWVyeSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzU2VydmVyVXJsICsgJ3BsYWNlL2F1dG9jb21wbGV0ZT9xdWVyeT0nICsgcXVlcnkpO1xuICAgIH1cbiAgICBnZXRQb3B1bGFyQ2l0aWVzKGNvdW50cnlDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAnY2l0eS9wb3B1bGFyLycgKyBjb3VudHJ5Q29kZSkudG9Qcm9taXNlKCk7XG4gICAgfVxuICAgIGFzeW5jIGdldFN1Z2dlc3Rpb25zKHNlYXJjaFRleHQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NTZXJ2ZXJVcmwgKyAndHNFbGFzdGljU2VhcmNoL3N1Z2dlc3Rpb25zL3NlYXJjaD9zZWFyY2gtZm9yLXRleHQ9JytzZWFyY2hUZXh0KS50b1Byb21pc2UoKTtcbiAgICB9XG59XG4iXX0=