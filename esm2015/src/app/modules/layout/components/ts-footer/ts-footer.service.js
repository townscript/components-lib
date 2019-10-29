import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../../core/app-config';
let FooterService = class FooterService {
    constructor(http) {
        this.http = http;
        this.baseUrl = config.baseUrl;
        this.listingsUrl = this.baseUrl + 'listings/';
        this.getPopularEvents = (lat, long) => {
            const params = new Object();
            params['lat'] = lat;
            params['lng'] = long;
            params['radarDistance'] = 50;
            params['page'] = 0;
            params['size'] = 8;
            params['minScore'] = 0;
            return this.http.post(this.listingsUrl + 'event/radar', {}, { params: params }).toPromise();
        };
        this.getCityFromCityCode = (code) => {
            return this.http.get(this.listingsUrl + 'place/city?code=' + code).toPromise();
        };
        this.getAllPopularCities = () => {
            return this.http.get(this.listingsUrl + 'city/popular').toPromise();
        };
    }
};
FooterService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], FooterService);
export { FooterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZm9vdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWZvb3Rlci90cy1mb290ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFJdEIsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUZwQyxZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxnQkFBVyxHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBSWpELHFCQUFnQixHQUFHLENBQUMsR0FBUSxFQUFFLElBQVMsRUFBZ0IsRUFBRTtZQUN2RCxNQUFNLE1BQU0sR0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNyQixNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUMsTUFBTSxFQUFjLE1BQU0sRUFBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEcsQ0FBQyxDQUFBO1FBRUQsd0JBQW1CLEdBQUcsQ0FBQyxJQUFZLEVBQWUsRUFBRTtZQUNsRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLEdBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0UsQ0FBQyxDQUFBO1FBRUQsd0JBQW1CLEdBQUcsR0FBaUIsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEUsQ0FBQyxDQUFBO0lBbkJELENBQUM7Q0FvQkosQ0FBQTtBQXpCWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTs2Q0FLaUIsVUFBVTtHQUozQixhQUFhLENBeUJ6QjtTQXpCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9vdGVyU2VydmljZSB7XG5cbiAgICBiYXNlVXJsOiBzdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBsaXN0aW5nc1VybDogc3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2xpc3RpbmdzLyc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgfVxuXG4gICAgZ2V0UG9wdWxhckV2ZW50cyA9IChsYXQ6IGFueSwgbG9uZzogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtczogT2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuICAgICAgICBwYXJhbXNbJ2xhdCddID0gbGF0O1xuICAgICAgICBwYXJhbXNbJ2xuZyddID0gbG9uZztcbiAgICAgICAgcGFyYW1zWydyYWRhckRpc3RhbmNlJ10gPSA1MDtcbiAgICAgICAgcGFyYW1zWydwYWdlJ10gPSAwO1xuICAgICAgICBwYXJhbXNbJ3NpemUnXSA9IDg7XG4gICAgICAgIHBhcmFtc1snbWluU2NvcmUnXSA9IDA7XG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5saXN0aW5nc1VybCArICdldmVudC9yYWRhcicsIHt9LCB7cGFyYW1zOiA8SHR0cFBhcmFtcz5wYXJhbXN9KS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBnZXRDaXR5RnJvbUNpdHlDb2RlID0gKGNvZGU6IHN0cmluZyk6UHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NVcmwgKyAncGxhY2UvY2l0eT9jb2RlPScrY29kZSkudG9Qcm9taXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0QWxsUG9wdWxhckNpdGllcyA9ICgpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzVXJsICsgJ2NpdHkvcG9wdWxhcicpLnRvUHJvbWlzZSgpO1xuICAgIH1cbn1cbiJdfQ==