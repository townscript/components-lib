import * as tslib_1 from "tslib";
import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from '../../../../core/cookie.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../../../../shared/services/utilities.service';
import { config } from './../../../../core/app-config';
import * as i0 from "@angular/core";
import * as i1 from "../../../../shared/services/utilities.service";
import * as i2 from "../../../../core/cookie.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/common/http";
var PlaceService = /** @class */ (function () {
    function PlaceService(utilityService, cookieService, document, platformId, http) {
        var _this = this;
        this.utilityService = utilityService;
        this.cookieService = cookieService;
        this.document = document;
        this.platformId = platformId;
        this.http = http;
        this.currentPlace$ = new BehaviorSubject({});
        this.place = this.currentPlace$.asObservable();
        this.documentIsAccessible = isPlatformBrowser(this.platformId);
        if (this.documentIsAccessible) {
            var location_1 = this.cookieService.getCookie('location');
            console.log('got location from cookie' + location_1);
            if (location_1 != null && location_1.length > 0 && this.utilityService.IsJsonString(location_1)) {
                this.updatePlace(JSON.parse(location_1));
            }
            else {
                this.getLocationFromIpInfo().then(function (ipInfoData) {
                    console.log('returned value from get location for ipinfo is ' + ipInfoData);
                    var data = {
                        'city': ipInfoData['city'],
                        'country': ipInfoData['countryCode'] ? ipInfoData['countryCode'].toLowerCase() : 'in',
                        'currentPlace': ipInfoData['city']
                    };
                    if (!_this.cookieService.getCookie('location')) {
                        _this.setLocationCookie(data);
                        _this.updatePlace(data);
                    }
                });
            }
        }
    }
    PlaceService.prototype.setLocationCookie = function (data) {
        console.log('updating place in components with ');
        console.log(data);
        data = JSON.stringify(data);
        console.log(' strigified data setting in cookie for location is ' + data);
        this.cookieService.setCookie('location', data, 100, '/');
    };
    PlaceService.prototype.updatePlace = function (data) {
        this.currentPlace$.next(data);
    };
    PlaceService.prototype.getLocationFromIpInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ipInfoCookieData, localData, jsonIpInfoCookie, localDataJson, ipInfoData_1, ipInfoJson;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isPlatformBrowser(this.platformId)) return [3 /*break*/, 4];
                        ipInfoCookieData = this.cookieService.getCookie('ipInfoData');
                        localData = localStorage.getItem('ipinfo_data');
                        if (ipInfoCookieData && !localData) {
                            console.log('ipinfo2 cookie set before localstorage data setting ' + ipInfoCookieData);
                            ipInfoCookieData = decodeURIComponent(ipInfoCookieData);
                            console.log('decoded value is ' + ipInfoCookieData);
                            jsonIpInfoCookie = JSON.parse(ipInfoCookieData);
                            localDataJson = { 'countryCode': '', 'city': '' };
                            localDataJson.countryCode = jsonIpInfoCookie.country;
                            localDataJson.city = jsonIpInfoCookie.city;
                            localData = JSON.stringify(localDataJson);
                            console.log('localdata after complete parsing is ' + localData);
                            localStorage.setItem('ipinfo_data', ipInfoCookieData);
                        }
                        if (!!localData) return [3 /*break*/, 2];
                        console.log('Calling ip info!');
                        return [4 /*yield*/, this.getJsonFromIpInfo().catch(function (err) {
                                ipInfoData_1 = { 'countryCode': 'in', 'city': 'india' };
                            })];
                    case 1:
                        ipInfoJson = _a.sent();
                        if (ipInfoJson) {
                            ipInfoData_1 = {
                                'countryCode': ipInfoJson['country'].toLowerCase(),
                                'city': ipInfoJson['city'].toLowerCase()
                            };
                        }
                        localStorage.setItem('ipinfo_data', JSON.stringify(ipInfoData_1));
                        this.callMaxMindTest();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.utilityService.IsJsonString(localData)) {
                            ipInfoData_1 = JSON.parse(localData);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, ipInfoData_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlaceService.prototype.getJsonFromIpInfo = function () {
        return this.http.get('//ipinfo.io/json?token=' + config.IPINFO_ACCESS_TOKEN + '').toPromise();
    };
    PlaceService.prototype.callMaxMindTest = function () {
        this.http.get('https://nqjmyz4jvh.execute-api.ap-south-1.amazonaws.com/countryISOCode').subscribe(function (data) { return console.log('successful maxmind invocation from place service'); }, function (error) { return console.log('failed invocation for maxmind from place service'); });
    };
    PlaceService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PlaceService_Factory() { return new PlaceService(i0.ɵɵinject(i1.UtilityService), i0.ɵɵinject(i2.CookieService), i0.ɵɵinject(i3.DOCUMENT), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i4.HttpClient)); }, token: PlaceService, providedIn: "root" });
    PlaceService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(2, Inject(DOCUMENT)),
        tslib_1.__param(3, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [UtilityService, CookieService, Object, InjectionToken,
            HttpClient])
    ], PlaceService);
    return PlaceService;
}());
export { PlaceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFLdkQ7SUFNSSxzQkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUE0QixRQUFhLEVBQ2hHLFVBQWtDLEVBQ3ZELElBQWdCO1FBRjVCLGlCQXdCQztRQXhCbUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBNEIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUNoRyxlQUFVLEdBQVYsVUFBVSxDQUF3QjtRQUN2RCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBTnBCLGtCQUFhLEdBQTRCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRWpGLFVBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBS3RDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFD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QixHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xHLENBQUM7SUFFRCxzQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsd0VBQXdFLENBQUMsQ0FBQyxTQUFTLENBQzdGLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxFQUEvRCxDQUErRCxFQUN2RSxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsRUFBL0QsQ0FBK0QsQ0FDM0UsQ0FBQztJQUNOLENBQUM7O0lBN0ZRLFlBQVk7UUFIeEIsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQU82RixtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdEcsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2lEQURZLGNBQWMsRUFBeUIsYUFBYSxVQUMzQyxjQUFjO1lBQ3pDLFVBQVU7T0FSbkIsWUFBWSxDQThGeEI7dUJBekdEO0NBeUdDLEFBOUZELElBOEZDO1NBOUZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQbGFjZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50UGxhY2UkOiBCZWhhdmlvclN1YmplY3Q8T2JqZWN0PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T2JqZWN0Pih7fSk7XG4gICAgZG9jdW1lbnRJc0FjY2Vzc2libGU6IGJvb2xlYW47XG4gICAgcGxhY2UgPSB0aGlzLmN1cnJlbnRQbGFjZSQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSwgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogSW5qZWN0aW9uVG9rZW48T2JqZWN0PixcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudElzQWNjZXNzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0Q29va2llKCdsb2NhdGlvbicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dvdCBsb2NhdGlvbiBmcm9tIGNvb2tpZScgKyBsb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24gIT0gbnVsbCAmJiBsb2NhdGlvbi5sZW5ndGggPiAwICYmIHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2UoSlNPTi5wYXJzZShsb2NhdGlvbikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2F0aW9uRnJvbUlwSW5mbygpLnRoZW4oaXBJbmZvRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXR1cm5lZCB2YWx1ZSBmcm9tIGdldCBsb2NhdGlvbiBmb3IgaXBpbmZvIGlzICcgKyBpcEluZm9EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjaXR5JzogaXBJbmZvRGF0YVsnY2l0eSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdW50cnknOiBpcEluZm9EYXRhWydjb3VudHJ5Q29kZSddID8gaXBJbmZvRGF0YVsnY291bnRyeUNvZGUnXS50b0xvd2VyQ2FzZSgpIDogJ2luJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjdXJyZW50UGxhY2UnOiBpcEluZm9EYXRhWydjaXR5J11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0Q29va2llKCdsb2NhdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2F0aW9uQ29va2llKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGFjZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TG9jYXRpb25Db29raWUoZGF0YSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgcGxhY2UgaW4gY29tcG9uZW50cyB3aXRoICcpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygnIHN0cmlnaWZpZWQgZGF0YSBzZXR0aW5nIGluIGNvb2tpZSBmb3IgbG9jYXRpb24gaXMgJyArIGRhdGEpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0Q29va2llKCdsb2NhdGlvbicsIGRhdGEsIDEwMCwgJy8nKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQbGFjZShkYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudFBsYWNlJC5uZXh0KGRhdGEpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgZ2V0TG9jYXRpb25Gcm9tSXBJbmZvKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgbGV0IGlwSW5mb0Nvb2tpZURhdGEgPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0Q29va2llKCdpcEluZm9EYXRhJyk7XG4gICAgICAgICAgICBsZXQgbG9jYWxEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lwaW5mb19kYXRhJyk7XG4gICAgICAgICAgICBpZiAoaXBJbmZvQ29va2llRGF0YSAmJiAhbG9jYWxEYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2lwaW5mbzIgY29va2llIHNldCBiZWZvcmUgbG9jYWxzdG9yYWdlIGRhdGEgc2V0dGluZyAnICsgaXBJbmZvQ29va2llRGF0YSk7XG4gICAgICAgICAgICAgICAgaXBJbmZvQ29va2llRGF0YSA9IGRlY29kZVVSSUNvbXBvbmVudChpcEluZm9Db29raWVEYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVjb2RlZCB2YWx1ZSBpcyAnICsgaXBJbmZvQ29va2llRGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc3QganNvbklwSW5mb0Nvb2tpZSA9IEpTT04ucGFyc2UoaXBJbmZvQ29va2llRGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxEYXRhSnNvbiA9IHsgJ2NvdW50cnlDb2RlJzogJycsICdjaXR5JzogJycgfTtcbiAgICAgICAgICAgICAgICBsb2NhbERhdGFKc29uLmNvdW50cnlDb2RlID0ganNvbklwSW5mb0Nvb2tpZS5jb3VudHJ5O1xuICAgICAgICAgICAgICAgIGxvY2FsRGF0YUpzb24uY2l0eSA9IGpzb25JcEluZm9Db29raWUuY2l0eTtcbiAgICAgICAgICAgICAgICBsb2NhbERhdGEgPSBKU09OLnN0cmluZ2lmeShsb2NhbERhdGFKc29uKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9jYWxkYXRhIGFmdGVyIGNvbXBsZXRlIHBhcnNpbmcgaXMgJyArIGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lwaW5mb19kYXRhJywgaXBJbmZvQ29va2llRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaXBJbmZvRGF0YTtcbiAgICAgICAgICAgIGlmICghbG9jYWxEYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhbGxpbmcgaXAgaW5mbyEnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpcEluZm9Kc29uID0gYXdhaXQgdGhpcy5nZXRKc29uRnJvbUlwSW5mbygpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSB7ICdjb3VudHJ5Q29kZSc6ICdpbicsICdjaXR5JzogJ2luZGlhJyB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChpcEluZm9Kc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnY291bnRyeUNvZGUnOiBpcEluZm9Kc29uWydjb3VudHJ5J10udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjaXR5JzogaXBJbmZvSnNvblsnY2l0eSddLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lwaW5mb19kYXRhJywgSlNPTi5zdHJpbmdpZnkoaXBJbmZvRGF0YSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbE1heE1pbmRUZXN0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhbERhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlwSW5mb0RhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRKc29uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy8vaXBpbmZvLmlvL2pzb24/dG9rZW49JyArIGNvbmZpZy5JUElORk9fQUNDRVNTX1RPS0VOICsgJycpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGNhbGxNYXhNaW5kVGVzdCgpIHtcbiAgICAgICAgdGhpcy5odHRwLmdldCgnaHR0cHM6Ly9ucWpteXo0anZoLmV4ZWN1dGUtYXBpLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS9jb3VudHJ5SVNPQ29kZScpLnN1YnNjcmliZShcbiAgICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coJ3N1Y2Nlc3NmdWwgbWF4bWluZCBpbnZvY2F0aW9uIGZyb20gcGxhY2Ugc2VydmljZScpLFxuICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coJ2ZhaWxlZCBpbnZvY2F0aW9uIGZvciBtYXhtaW5kIGZyb20gcGxhY2Ugc2VydmljZScpXG4gICAgICAgICk7XG4gICAgfVxufVxuIl19