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
        this.cookieService.setCookie('location', data, 100, '/');
    };
    PlaceService.prototype.updatePlace = function (data) {
        this.currentPlace$.next(data);
    };
    PlaceService.prototype.getLocationFromIpInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var ipInfoCookieData, localData, ipInfoData_1, ipInfoJson;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isPlatformBrowser(this.platformId)) return [3 /*break*/, 4];
                        ipInfoCookieData = this.cookieService.getCookie('ipInfoData');
                        localData = localStorage.getItem('ipinfo_data');
                        if (ipInfoCookieData && !localData) {
                            console.log('ipinfo1 cookie set before localstorage data setting ' + ipInfoCookieData);
                            ipInfoCookieData = decodeURIComponent(ipInfoCookieData);
                            localData = ipInfoCookieData;
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
        return this.http.get('https://nqjmyz4jvh.execute-api.ap-south-1.amazonaws.com/countryISOCode').toPromise();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFLdkQ7SUFNSSxzQkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUE0QixRQUFhLEVBQ2hHLFVBQWtDLEVBQ3ZELElBQWdCO1FBRjVCLGlCQXVCQztRQXZCbUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBNEIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUNoRyxlQUFVLEdBQVYsVUFBVSxDQUF3QjtRQUN2RCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBTnBCLGtCQUFhLEdBQTRCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRWpGLFVBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBS3RDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFD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c0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUGxhY2VTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY3VycmVudFBsYWNlJDogQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4oe30pO1xuICAgIGRvY3VtZW50SXNBY2Nlc3NpYmxlOiBib29sZWFuO1xuICAgIHBsYWNlID0gdGhpcy5jdXJyZW50UGxhY2UkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IEluamVjdGlvblRva2VuPE9iamVjdD4sXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50SXNBY2Nlc3NpYmxlID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5jb29raWVTZXJ2aWNlLmdldENvb2tpZSgnbG9jYXRpb24nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb3QgbG9jYXRpb24gZnJvbSBjb29raWUnICsgbG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9IG51bGwgJiYgbG9jYXRpb24ubGVuZ3RoID4gMCAmJiB0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKEpTT04ucGFyc2UobG9jYXRpb24pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhdGlvbkZyb21JcEluZm8oKS50aGVuKGlwSW5mb0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NpdHknOiBpcEluZm9EYXRhWydjaXR5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAnY291bnRyeSc6IGlwSW5mb0RhdGFbJ2NvdW50cnlDb2RlJ10gPyBpcEluZm9EYXRhWydjb3VudHJ5Q29kZSddLnRvTG93ZXJDYXNlKCkgOiAnaW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2N1cnJlbnRQbGFjZSc6IGlwSW5mb0RhdGFbJ2NpdHknXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ2xvY2F0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYXRpb25Db29raWUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRMb2NhdGlvbkNvb2tpZShkYXRhKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZyBwbGFjZSBpbiBjb21wb25lbnRzIHdpdGggJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXRDb29raWUoJ2xvY2F0aW9uJywgZGF0YSwgMTAwLCAnLycpO1xuICAgIH1cblxuICAgIHVwZGF0ZVBsYWNlKGRhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGxhY2UkLm5leHQoZGF0YSk7XG4gICAgfVxuXG5cbiAgICBhc3luYyBnZXRMb2NhdGlvbkZyb21JcEluZm8oKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBsZXQgaXBJbmZvQ29va2llRGF0YSA9IHRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ2lwSW5mb0RhdGEnKTtcbiAgICAgICAgICAgIGxldCBsb2NhbERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXBpbmZvX2RhdGEnKTtcbiAgICAgICAgICAgIGlmIChpcEluZm9Db29raWVEYXRhICYmICFsb2NhbERhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaXBpbmZvMSBjb29raWUgc2V0IGJlZm9yZSBsb2NhbHN0b3JhZ2UgZGF0YSBzZXR0aW5nICcgKyBpcEluZm9Db29raWVEYXRhKTtcbiAgICAgICAgICAgICAgICBpcEluZm9Db29raWVEYXRhID0gZGVjb2RlVVJJQ29tcG9uZW50KGlwSW5mb0Nvb2tpZURhdGEpO1xuICAgICAgICAgICAgICAgIGxvY2FsRGF0YSA9IGlwSW5mb0Nvb2tpZURhdGE7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lwaW5mb19kYXRhJywgaXBJbmZvQ29va2llRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaXBJbmZvRGF0YTtcbiAgICAgICAgICAgIGlmICghbG9jYWxEYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhbGxpbmcgaXAgaW5mbyEnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpcEluZm9Kc29uID0gYXdhaXQgdGhpcy5nZXRKc29uRnJvbUlwSW5mbygpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSB7ICdjb3VudHJ5Q29kZSc6ICdpbicsICdjaXR5JzogJ2luZGlhJyB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChpcEluZm9Kc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnY291bnRyeUNvZGUnOiBpcEluZm9Kc29uWydjb3VudHJ5J10udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjaXR5JzogaXBJbmZvSnNvblsnY2l0eSddLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lwaW5mb19kYXRhJywgSlNPTi5zdHJpbmdpZnkoaXBJbmZvRGF0YSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbE1heE1pbmRUZXN0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhbERhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlwSW5mb0RhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRKc29uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy8vaXBpbmZvLmlvL2pzb24/dG9rZW49JyArIGNvbmZpZy5JUElORk9fQUNDRVNTX1RPS0VOICsgJycpLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGNhbGxNYXhNaW5kVGVzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2h0dHBzOi8vbnFqbXl6NGp2aC5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vY291bnRyeUlTT0NvZGUnKS50b1Byb21pc2UoKTtcbiAgICB9XG59XG4iXX0=