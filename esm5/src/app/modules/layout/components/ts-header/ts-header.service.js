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
    HeaderService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HeaderService);
    return HeaderService;
}());
export { HeaderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci90cy1oZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JEO0lBS0ksdUJBQW9CLElBQWdCO1FBQXBDLGlCQUNDO1FBRG1CLFNBQUksR0FBSixJQUFJLENBQVk7UUFIcEMsWUFBTyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakMsaUJBQVksR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM3QyxzQkFBaUIsR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUd2RCwwQkFBcUIsR0FBRyxVQUFDLEtBQUs7WUFDMUIsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsMkJBQTJCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFBO0lBSEQsQ0FBQztJQUlELHdDQUFnQixHQUFoQixVQUFpQixXQUFXO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsR0FBRyxXQUFXLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3RixDQUFDO0lBQ0ssc0NBQWMsR0FBcEIsVUFBcUIsVUFBa0I7Ozs7NEJBQzVCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxxREFBcUQsR0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs0QkFBakksc0JBQU8sU0FBMEgsRUFBQzs7OztLQUNySTtJQUVLLHVDQUFlLEdBQXJCLFVBQXNCLFVBQWtCOzs7OzRCQUM3QixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsaURBQWlELEdBQUcsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs0QkFBMUksc0JBQU8sU0FBbUksRUFBQzs7OztLQUM5STtJQW5CUSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtpREFNaUIsVUFBVTtPQUwzQixhQUFhLENBb0J6QjtJQUFELG9CQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhlYWRlclNlcnZpY2Uge1xuXG4gICAgYmFzZVVybDogc3RyaW5nID0gY29uZmlnLmJhc2VVcmw7XG4gICAgYXBpU2VydmVyVXJsOiBzdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnYXBpLyc7XG4gICAgbGlzdGluZ3NTZXJ2ZXJVcmw6IHN0cmluZyA9IHRoaXMuYmFzZVVybCArICdsaXN0aW5ncy8nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgIH1cbiAgICBnZXRwbGFjZVNlYXJjaFJlc3VsdHMgPSAocXVlcnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5saXN0aW5nc1NlcnZlclVybCArICdwbGFjZS9hdXRvY29tcGxldGU/cXVlcnk9JyArIHF1ZXJ5KTtcbiAgICB9XG4gICAgZ2V0UG9wdWxhckNpdGllcyhjb3VudHJ5Q29kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzU2VydmVyVXJsICsgJ2NpdHkvcG9wdWxhci8nICsgY291bnRyeUNvZGUpLnRvUHJvbWlzZSgpO1xuICAgIH1cbiAgICBhc3luYyBnZXRTdWdnZXN0aW9ucyhzZWFyY2hUZXh0OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzU2VydmVyVXJsICsgJ3RzRWxhc3RpY1NlYXJjaC9zdWdnZXN0aW9ucy9zZWFyY2g/c2VhcmNoLWZvci10ZXh0PScrc2VhcmNoVGV4dCkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcG9zdFN1Z2dlc3Rpb25zKHNlYXJjaFRleHQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmh0dHAucG9zdCh0aGlzLmxpc3RpbmdzU2VydmVyVXJsICsgJy90c0VsYXN0aWNTZWFyY2gvc3VnZ2VzdGlvbnMvYWRkP3NlYXJjaC1pbnRlbnQ9JyArIHNlYXJjaFRleHQsIG51bGwsIHt9KS50b1Byb21pc2UoKTtcbiAgICB9XG59XG4iXX0=