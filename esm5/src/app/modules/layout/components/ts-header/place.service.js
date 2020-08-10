import * as tslib_1 from "tslib";
import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from '../../../../core/cookie.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../../../../shared/services/utilities.service';
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
                        _this.updatePlace(data);
                    }
                });
            }
        }
    }
    PlaceService.prototype.updatePlace = function (data) {
        data = JSON.stringify(data);
        this.cookieService.setCookie('location', data, 100, '/');
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
                            ipInfoCookieData = decodeURIComponent(ipInfoCookieData);
                            jsonIpInfoCookie = JSON.parse(ipInfoCookieData);
                            localDataJson = { 'countryCode': '', 'city': '', ip: '', 'country': '' };
                            localDataJson.countryCode = jsonIpInfoCookie.country;
                            localDataJson.country = jsonIpInfoCookie.country;
                            localDataJson.city = jsonIpInfoCookie.city;
                            localDataJson.ip = jsonIpInfoCookie.ip;
                            localData = JSON.stringify(localDataJson);
                            localStorage.setItem('ipinfo_data', localData);
                        }
                        if (!!localData) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getJsonFromIpInfo().catch(function (err) {
                                ipInfoData_1 = { 'countryCode': 'in', 'city': 'india', 'country': 'in' };
                            })];
                    case 1:
                        ipInfoJson = _a.sent();
                        if (ipInfoJson) {
                            ipInfoData_1 = {
                                'countryCode': ipInfoJson['countryCode'].toLowerCase(),
                                'ip': ipInfoJson['ip'],
                                'country': ipInfoJson['countryCode'].toLowerCase()
                            };
                        }
                        localStorage.setItem('ipinfo_data', JSON.stringify(ipInfoData_1));
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
        return this.http.get('https://96ooltknqg.execute-api.ap-south-1.amazonaws.com/countryfromip')
            .toPromise();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7Ozs7OztBQU0vRTtJQU1JLHNCQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQTRCLFFBQWEsRUFDaEcsVUFBa0MsRUFDdkQsSUFBZ0I7UUFGNUIsaUJBcUJDO1FBckJtQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2hHLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ3ZELFNBQUksR0FBSixJQUFJLENBQVk7UUFOcEIsa0JBQWEsR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFFakYsVUFBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUMz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QUFDOzRCQUMzRSxDQUFDLENBQUMsRUFBQTs7d0JBRkksVUFBVSxHQUFHLFNBRWpCO3dCQUNGLElBQUksVUFBVSxFQUFFOzRCQUNaLFlBQVUsR0FBRztnQ0FDVCxhQUFhLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsRUFBRTtnQ0FDdEQsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0NBQ3RCLFNBQVMsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxFQUFFOzZCQUNyRCxDQUFDO3lCQUNMO3dCQUNELFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBVSxDQUFDLENBQUMsQ0FBQzs7O3dCQUVoRSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFOzRCQUM3QyxZQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzt5QkFDdEM7OzRCQUVMLHNCQUFPLFlBQVUsRUFBQzs7Ozs7S0FFekI7SUFFRCx3Q0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHVFQUF1RSxDQUFDO2FBQ3hGLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7O0lBNUVRLFlBQVk7UUFIeEIsVUFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQU82RixtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdEcsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2lEQURZLGNBQWMsRUFBeUIsYUFBYSxVQUMzQyxjQUFjO1lBQ3pDLFVBQVU7T0FSbkIsWUFBWSxDQTZFeEI7dUJBeEZEO0NBd0ZDLEFBN0VELElBNkVDO1NBN0VZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQbGFjZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50UGxhY2UkOiBCZWhhdmlvclN1YmplY3Q8T2JqZWN0PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T2JqZWN0Pih7fSk7XG4gICAgZG9jdW1lbnRJc0FjY2Vzc2libGU6IGJvb2xlYW47XG4gICAgcGxhY2UgPSB0aGlzLmN1cnJlbnRQbGFjZSQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSwgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogSW5qZWN0aW9uVG9rZW48T2JqZWN0PixcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudElzQWNjZXNzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0Q29va2llKCdsb2NhdGlvbicpO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9IG51bGwgJiYgbG9jYXRpb24ubGVuZ3RoID4gMCAmJiB0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKEpTT04ucGFyc2UobG9jYXRpb24pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhdGlvbkZyb21JcEluZm8oKS50aGVuKGlwSW5mb0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NpdHknOiBpcEluZm9EYXRhWydjaXR5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAnY291bnRyeSc6IGlwSW5mb0RhdGFbJ2NvdW50cnlDb2RlJ10gPyBpcEluZm9EYXRhWydjb3VudHJ5Q29kZSddLnRvTG93ZXJDYXNlKCkgOiAnaW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2N1cnJlbnRQbGFjZSc6IGlwSW5mb0RhdGFbJ2NpdHknXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ2xvY2F0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVBsYWNlKGRhdGEpOiB2b2lkIHtcbiAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0Q29va2llKCdsb2NhdGlvbicsIGRhdGEsIDEwMCwgJy8nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50UGxhY2UkLm5leHQoZGF0YSk7XG4gICAgfVxuXG5cbiAgICBhc3luYyBnZXRMb2NhdGlvbkZyb21JcEluZm8oKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBsZXQgaXBJbmZvQ29va2llRGF0YSA9IHRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ2lwSW5mb0RhdGEnKTtcbiAgICAgICAgICAgIGxldCBsb2NhbERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXBpbmZvX2RhdGEnKTtcbiAgICAgICAgICAgIGlmIChpcEluZm9Db29raWVEYXRhICYmICFsb2NhbERhdGEpIHtcbiAgICAgICAgICAgICAgICBpcEluZm9Db29raWVEYXRhID0gZGVjb2RlVVJJQ29tcG9uZW50KGlwSW5mb0Nvb2tpZURhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGpzb25JcEluZm9Db29raWUgPSBKU09OLnBhcnNlKGlwSW5mb0Nvb2tpZURhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YUpzb24gPSB7ICdjb3VudHJ5Q29kZSc6ICcnLCAnY2l0eSc6ICcnLCBpcDogJycsICdjb3VudHJ5JzogJycgfTtcbiAgICAgICAgICAgICAgICBsb2NhbERhdGFKc29uLmNvdW50cnlDb2RlID0ganNvbklwSW5mb0Nvb2tpZS5jb3VudHJ5O1xuICAgICAgICAgICAgICAgIGxvY2FsRGF0YUpzb24uY291bnRyeSA9IGpzb25JcEluZm9Db29raWUuY291bnRyeTtcbiAgICAgICAgICAgICAgICBsb2NhbERhdGFKc29uLmNpdHkgPSBqc29uSXBJbmZvQ29va2llLmNpdHk7XG4gICAgICAgICAgICAgICAgbG9jYWxEYXRhSnNvbi5pcCA9IGpzb25JcEluZm9Db29raWUuaXA7XG4gICAgICAgICAgICAgICAgbG9jYWxEYXRhID0gSlNPTi5zdHJpbmdpZnkobG9jYWxEYXRhSnNvbik7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lwaW5mb19kYXRhJywgbG9jYWxEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpcEluZm9EYXRhO1xuICAgICAgICAgICAgaWYgKCFsb2NhbERhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpcEluZm9Kc29uID0gYXdhaXQgdGhpcy5nZXRKc29uRnJvbUlwSW5mbygpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSB7ICdjb3VudHJ5Q29kZSc6ICdpbicsICdjaXR5JzogJ2luZGlhJywgJ2NvdW50cnknOiAnaW4nIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlwSW5mb0pzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaXBJbmZvRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb3VudHJ5Q29kZSc6IGlwSW5mb0pzb25bJ2NvdW50cnlDb2RlJ10udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpcCc6IGlwSW5mb0pzb25bJ2lwJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAnY291bnRyeSc6IGlwSW5mb0pzb25bJ2NvdW50cnlDb2RlJ10udG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXBpbmZvX2RhdGEnLCBKU09OLnN0cmluZ2lmeShpcEluZm9EYXRhKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhbERhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlwSW5mb0RhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRKc29uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2h0dHBzOi8vOTZvb2x0a25xZy5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vY291bnRyeWZyb21pcCcpXG4gICAgICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19