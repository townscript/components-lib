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
                    var data = { 'city': ipInfoData['city'],
                        'country': ipInfoData['countryCode'] ? ipInfoData['countryCode'].toLowerCase() : 'in',
                        'currentPlace': ipInfoData['city'] };
                    if (!_this.cookieService.getCookie('location'))
                        _this.updatePlace(data);
                });
            }
        }
    }
    PlaceService.prototype.updatePlace = function (data) {
        console.log('updating place in components with ');
        console.log(data);
        data = JSON.stringify(data);
        this.cookieService.setCookie('location', data, 100000000, '/');
        this.currentPlace$.next(data);
    };
    PlaceService.prototype.getLocationFromIpInfo = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localData, ipInfoData, ipInfoJson;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isPlatformBrowser(this.platformId)) return [3 /*break*/, 4];
                        localData = localStorage.getItem('ipinfo_data');
                        ipInfoData = void 0;
                        if (!!localData) return [3 /*break*/, 2];
                        console.log('Calling ip info!');
                        return [4 /*yield*/, this.getJsonFromIpInfo()];
                    case 1:
                        ipInfoJson = _a.sent();
                        ipInfoData = {
                            'lat': ipInfoJson['loc'].split(',')[0],
                            'lng': ipInfoJson['loc'].split(',')[1],
                            'countryCode': ipInfoJson['country'].toLowerCase(),
                            'city': ipInfoJson['city'].toLowerCase()
                        };
                        localStorage.setItem('ipinfo_data', JSON.stringify(ipInfoData));
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.utilityService.IsJsonString(localData)) {
                            ipInfoData = JSON.parse(localData);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, ipInfoData];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlaceService.prototype.getJsonFromIpInfo = function () {
        return this.http.get('//ipinfo.io/json?token=' + config.IPINFO_ACCESS_TOKEN + '').toPromise();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFLdkQ7SUFNSSxzQkFBb0IsY0FBOEIsRUFBVSxhQUE0QixFQUE0QixRQUFhLEVBQ2hHLFVBQWtDLEVBQ3ZELElBQWdCO1FBRjVCLGlCQW1CQztRQW5CbUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBNEIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUNoRyxlQUFVLEdBQVYsVUFBVSxDQUF3QjtRQUN2RCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBTnBCLGtCQUFhLEdBQTRCLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRWpGLFVBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBS3RDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFD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Q0FBQzt5QkFDdEM7OzRCQUVMLHNCQUFPLFVBQVUsRUFBQzs7Ozs7S0FFekI7SUFFRCx3Q0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsRyxDQUFDOztJQTVEUSxZQUFZO1FBSHhCLFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7UUFPNkYsbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3RHLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtpREFEWSxjQUFjLEVBQXlCLGFBQWEsVUFDM0MsY0FBYztZQUN6QyxVQUFVO09BUm5CLFlBQVksQ0E2RHhCO3VCQXhFRDtDQXdFQyxBQTdERCxJQTZEQztTQTdEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUGxhY2VTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY3VycmVudFBsYWNlJDogQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4oe30pO1xuICAgIGRvY3VtZW50SXNBY2Nlc3NpYmxlOiBib29sZWFuO1xuICAgIHBsYWNlID0gdGhpcy5jdXJyZW50UGxhY2UkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IEluamVjdGlvblRva2VuPE9iamVjdD4sXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50SXNBY2Nlc3NpYmxlID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5jb29raWVTZXJ2aWNlLmdldENvb2tpZSgnbG9jYXRpb24nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb3QgbG9jYXRpb24gZnJvbSBjb29raWUnICsgbG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9IG51bGwgJiYgbG9jYXRpb24ubGVuZ3RoID4gMCAmJiB0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKEpTT04ucGFyc2UobG9jYXRpb24pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhdGlvbkZyb21JcEluZm8oKS50aGVuKGlwSW5mb0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geyAnY2l0eSc6IGlwSW5mb0RhdGFbJ2NpdHknXSxcbiAgICAgICAgICAgICAgICAgICAgICAnY291bnRyeSc6IGlwSW5mb0RhdGFbJ2NvdW50cnlDb2RlJ10gPyBpcEluZm9EYXRhWydjb3VudHJ5Q29kZSddLnRvTG93ZXJDYXNlKCkgOiAnaW4nLFxuICAgICAgICAgICAgICAgICAgICAgICdjdXJyZW50UGxhY2UnOiBpcEluZm9EYXRhWydjaXR5J10gfTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ2xvY2F0aW9uJykpXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGFjZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVBsYWNlKGRhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIHBsYWNlIGluIGNvbXBvbmVudHMgd2l0aCAnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldENvb2tpZSgnbG9jYXRpb24nLCBkYXRhLCAxMDAwMDAwMDAsICcvJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFBsYWNlJC5uZXh0KGRhdGEpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldExvY2F0aW9uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpcGluZm9fZGF0YScpO1xuICAgICAgICAgICAgbGV0IGlwSW5mb0RhdGE7XG4gICAgICAgICAgICBpZiAoIWxvY2FsRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYWxsaW5nIGlwIGluZm8hJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXBJbmZvSnNvbiA9IGF3YWl0IHRoaXMuZ2V0SnNvbkZyb21JcEluZm8oKTtcbiAgICAgICAgICAgICAgICBpcEluZm9EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAnbGF0JzogaXBJbmZvSnNvblsnbG9jJ10uc3BsaXQoJywnKVswXSxcbiAgICAgICAgICAgICAgICAgICAgJ2xuZyc6IGlwSW5mb0pzb25bJ2xvYyddLnNwbGl0KCcsJylbMV0sXG4gICAgICAgICAgICAgICAgICAgICdjb3VudHJ5Q29kZSc6IGlwSW5mb0pzb25bJ2NvdW50cnknXS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAnY2l0eSc6IGlwSW5mb0pzb25bJ2NpdHknXS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXBpbmZvX2RhdGEnLCBKU09OLnN0cmluZ2lmeShpcEluZm9EYXRhKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhbERhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlwSW5mb0RhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRKc29uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy8vaXBpbmZvLmlvL2pzb24/dG9rZW49JyArIGNvbmZpZy5JUElORk9fQUNDRVNTX1RPS0VOICsgJycpLnRvUHJvbWlzZSgpO1xuICAgIH1cbn1cbiJdfQ==