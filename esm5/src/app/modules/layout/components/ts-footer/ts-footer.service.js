import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../../core/app-config';
var FooterService = /** @class */ (function () {
    function FooterService(http) {
        var _this = this;
        this.http = http;
        this.baseUrl = config.baseUrl;
        this.listingsUrl = this.baseUrl + 'listings/';
        this.getPopularEvents = function (lat, long, filter) {
            var params = new Object();
            params['lat'] = lat ? lat : 1;
            params['lng'] = long ? long : 2;
            params['radarDistance'] = 50;
            params['page'] = 0;
            params['size'] = 8;
            return _this.http.post(_this.listingsUrl + 'event/radar', filter ? filter : {}, { params: params }).toPromise();
        };
        this.getCityFromCityCode = function (code) {
            return _this.http.get(_this.listingsUrl + 'place/city?code=' + code).toPromise();
        };
        this.getAllPopularCities = function () {
            return _this.http.get(_this.listingsUrl + 'city/popular').toPromise();
        };
    }
    FooterService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], FooterService);
    return FooterService;
}());
export { FooterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWZvb3Rlci90cy1mb290ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JEO0lBSUksdUJBQW9CLElBQWdCO1FBQXBDLGlCQUNDO1FBRG1CLFNBQUksR0FBSixJQUFJLENBQVk7UUFGcEMsWUFBTyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakMsZ0JBQVcsR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUlqRCxxQkFBZ0IsR0FBRyxVQUFDLEdBQVEsRUFBRSxJQUFTLEVBQUUsTUFBWTtZQUNuRCxJQUFNLE1BQU0sR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFDLE1BQU0sRUFBYyxNQUFNLEVBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFILENBQUMsQ0FBQTtRQUVELHdCQUFtQixHQUFHLFVBQUMsSUFBWTtZQUNqQyxPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLEdBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0UsQ0FBQyxDQUFBO1FBRUQsd0JBQW1CLEdBQUc7WUFDbEIsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hFLENBQUMsQ0FBQTtJQWxCRCxDQUFDO0lBTFEsYUFBYTtRQUR6QixVQUFVLEVBQUU7aURBS2lCLFVBQVU7T0FKM0IsYUFBYSxDQXdCekI7SUFBRCxvQkFBQztDQUFBLEFBeEJELElBd0JDO1NBeEJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvb3RlclNlcnZpY2Uge1xuXG4gICAgYmFzZVVybDogc3RyaW5nID0gY29uZmlnLmJhc2VVcmw7XG4gICAgbGlzdGluZ3NVcmw6IHN0cmluZyA9IHRoaXMuYmFzZVVybCArICdsaXN0aW5ncy8nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgIH1cblxuICAgIGdldFBvcHVsYXJFdmVudHMgPSAobGF0OiBhbnksIGxvbmc6IGFueSwgZmlsdGVyPzogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtczogT2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuICAgICAgICBwYXJhbXNbJ2xhdCddID0gbGF0ID8gbGF0IDogMTtcbiAgICAgICAgcGFyYW1zWydsbmcnXSA9IGxvbmcgPyBsb25nIDogMjtcbiAgICAgICAgcGFyYW1zWydyYWRhckRpc3RhbmNlJ10gPSA1MDtcbiAgICAgICAgcGFyYW1zWydwYWdlJ10gPSAwO1xuICAgICAgICBwYXJhbXNbJ3NpemUnXSA9IDg7ICAgICAgICBcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmxpc3RpbmdzVXJsICsgJ2V2ZW50L3JhZGFyJywgZmlsdGVyID8gZmlsdGVyIDoge30sIHtwYXJhbXM6IDxIdHRwUGFyYW1zPnBhcmFtc30pLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGdldENpdHlGcm9tQ2l0eUNvZGUgPSAoY29kZTogc3RyaW5nKTpQcm9taXNlPGFueT4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5saXN0aW5nc1VybCArICdwbGFjZS9jaXR5P2NvZGU9Jytjb2RlKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBnZXRBbGxQb3B1bGFyQ2l0aWVzID0gKCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NVcmwgKyAnY2l0eS9wb3B1bGFyJykudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19