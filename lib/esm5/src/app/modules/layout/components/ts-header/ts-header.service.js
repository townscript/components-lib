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
        this.getplaceSearchResults = function (query) {
            return _this.http.get(_this.baseUrl + 'listings/place/autocomplete?query=' + query);
        };
    }
    HeaderService.prototype.getPopularCities = function (countryCode) {
        return this.http.get(this.baseUrl + 'listings/city/popular/' + countryCode);
    };
    HeaderService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], HeaderService);
    return HeaderService;
}());
export { HeaderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtaGVhZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xheW91dC9jb21wb25lbnRzL3RzLWhlYWRlci90cy1oZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3JEO0lBSUksdUJBQW9CLElBQWdCO1FBQXBDLGlCQUNDO1FBRG1CLFNBQUksR0FBSixJQUFJLENBQVk7UUFGcEMsWUFBTyxHQUFXLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakMsaUJBQVksR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUc3QywwQkFBcUIsR0FBRyxVQUFDLEtBQUs7WUFDMUIsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxHQUFHLG9DQUFvQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3RGLENBQUMsQ0FBQTtJQUhELENBQUM7SUFJRCx3Q0FBZ0IsR0FBaEIsVUFBaUIsV0FBVztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQVhRLGFBQWE7UUFEekIsVUFBVSxFQUFFO2lEQUtpQixVQUFVO09BSjNCLGFBQWEsQ0FZekI7SUFBRCxvQkFBQztDQUFBLEFBWkQsSUFZQztTQVpZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIZWFkZXJTZXJ2aWNlIHtcblxuICAgIGJhc2VVcmw6IHN0cmluZyA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIGFwaVNlcnZlclVybDogc3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2FwaS8nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgIH1cbiAgICBnZXRwbGFjZVNlYXJjaFJlc3VsdHMgPSAocXVlcnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlVXJsICsgJ2xpc3RpbmdzL3BsYWNlL2F1dG9jb21wbGV0ZT9xdWVyeT0nICsgcXVlcnkpO1xuICAgIH1cbiAgICBnZXRQb3B1bGFyQ2l0aWVzKGNvdW50cnlDb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZVVybCArICdsaXN0aW5ncy9jaXR5L3BvcHVsYXIvJyArIGNvdW50cnlDb2RlKTtcbiAgICB9XG59XG4iXX0=