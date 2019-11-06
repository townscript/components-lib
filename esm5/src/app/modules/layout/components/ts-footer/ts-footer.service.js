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
        this.getPopularEvents = function (lat, long) {
            var params = new Object();
            params['lat'] = lat;
            params['lng'] = long;
            params['radarDistance'] = 50;
            params['page'] = 0;
            params['size'] = 8;
            params['minScore'] = 0;
            return _this.http.post(_this.listingsUrl + 'event/radar', {}, { params: params }).toPromise();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWZvb3Rlci90cy1mb290ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JEO0lBSUksdUJBQW9CLElBQWdCO1FBQXBDLGlCQUNDO1FBRG1CLFNBQUksR0FBSixJQUFJLENBQVk7UUFGcEMsWUFBTyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakMsZ0JBQVcsR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUlqRCxxQkFBZ0IsR0FBRyxVQUFDLEdBQVEsRUFBRSxJQUFTO1lBQ3JDLElBQU0sTUFBTSxHQUFXLElBQUksTUFBTSxFQUFFLENBQUM7WUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsRUFBRSxFQUFFLEVBQUUsRUFBQyxNQUFNLEVBQWMsTUFBTSxFQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4RyxDQUFDLENBQUE7UUFFRCx3QkFBbUIsR0FBRyxVQUFDLElBQVk7WUFDakMsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFrQixHQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9FLENBQUMsQ0FBQTtRQUVELHdCQUFtQixHQUFHO1lBQ2xCLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4RSxDQUFDLENBQUE7SUFuQkQsQ0FBQztJQUxRLGFBQWE7UUFEekIsVUFBVSxFQUFFO2lEQUtpQixVQUFVO09BSjNCLGFBQWEsQ0F5QnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXpCRCxJQXlCQztTQXpCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9vdGVyU2VydmljZSB7XG5cbiAgICBiYXNlVXJsOiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBsaXN0aW5nc1VybDogc3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2xpc3RpbmdzLyc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgfVxuXG4gICAgZ2V0UG9wdWxhckV2ZW50cyA9IChsYXQ6IGFueSwgbG9uZzogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtczogT2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuICAgICAgICBwYXJhbXNbJ2xhdCddID0gbGF0O1xuICAgICAgICBwYXJhbXNbJ2xuZyddID0gbG9uZztcbiAgICAgICAgcGFyYW1zWydyYWRhckRpc3RhbmNlJ10gPSA1MDtcbiAgICAgICAgcGFyYW1zWydwYWdlJ10gPSAwO1xuICAgICAgICBwYXJhbXNbJ3NpemUnXSA9IDg7XG4gICAgICAgIHBhcmFtc1snbWluU2NvcmUnXSA9IDA7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5saXN0aW5nc1VybCArICdldmVudC9yYWRhcicsIHt9LCB7cGFyYW1zOiA8SHR0cFBhcmFtcz5wYXJhbXN9KS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBnZXRDaXR5RnJvbUNpdHlDb2RlID0gKGNvZGU6IHN0cmluZyk6UHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NVcmwgKyAncGxhY2UvY2l0eT9jb2RlPScrY29kZSkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0QWxsUG9wdWxhckNpdGllcyA9ICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzVXJsICsgJ2NpdHkvcG9wdWxhcicpLnRvUHJvbWlzZSgpO1xuICAgIH1cbn1cbiJdfQ==