import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../core/app-config';
var SharedService = /** @class */ (function () {
    function SharedService(http) {
        var _this = this;
        this.http = http;
        this.baseUrl = config.baseUrl;
        this.apiServerUrl = this.baseUrl + 'api/';
        this.listingsUrl = this.baseUrl + 'listings/';
        this.getPopularCitiesByCountryCode = function (code) {
            return _this.http.get(_this.listingsUrl + 'city/popular/' + code).toPromise();
        };
        this.getNearbyCity = function (lat, long) {
            return _this.http.get(_this.listingsUrl + 'place/nearbycity?lat=' + lat + '&long=' + long).toPromise();
        };
    }
    SharedService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    SharedService = __decorate([
        Injectable()
    ], SharedService);
    return SharedService;
}());
export { SharedService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvc2hhcmVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2xELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUkvQztJQVFJLHVCQUFvQixJQUFnQjtRQUFwQyxpQkFDQztRQURtQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBTnBDLFlBQU8sR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLGlCQUFZLEdBQVcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDN0MsZ0JBQVcsR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQU9qRCxrQ0FBNkIsR0FBRyxVQUFDLElBQVk7WUFDekMsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoRixDQUFDLENBQUE7UUFFRCxrQkFBYSxHQUFHLFVBQUMsR0FBVyxFQUFFLElBQVk7WUFDdEMsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekcsQ0FBQyxDQUFBO0lBUkQsQ0FBQzs7Z0JBRHlCLFVBQVU7O0lBUjNCLGFBQWE7UUFEekIsVUFBVSxFQUFFO09BQ0EsYUFBYSxDQW1CekI7SUFBRCxvQkFBQztDQUFBLEFBbkJELElBbUJDO1NBbkJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2Uge1xuXG4gICAgYmFzZVVybDogU3RyaW5nID0gY29uZmlnLmJhc2VVcmw7XG4gICAgYXBpU2VydmVyVXJsOiBTdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnYXBpLyc7XG4gICAgbGlzdGluZ3NVcmw6IFN0cmluZyA9IHRoaXMuYmFzZVVybCArICdsaXN0aW5ncy8nO1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgIH1cblxuICAgIGdldFBvcHVsYXJDaXRpZXNCeUNvdW50cnlDb2RlID0gKGNvZGU6IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NVcmwgKyAnY2l0eS9wb3B1bGFyLycgKyBjb2RlKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBnZXROZWFyYnlDaXR5ID0gKGxhdDogc3RyaW5nLCBsb25nOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5saXN0aW5nc1VybCArICdwbGFjZS9uZWFyYnljaXR5P2xhdD0nICsgbGF0ICsgJyZsb25nPScgKyBsb25nKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbn1cbiJdfQ==