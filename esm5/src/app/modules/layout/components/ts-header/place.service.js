import * as tslib_1 from "tslib";
import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from '../../../../core/cookie.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/cookie.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/common/http";
var PlaceService = /** @class */ (function () {
    function PlaceService(cookieService, document, platformId, http) {
        var _this = this;
        this.cookieService = cookieService;
        this.document = document;
        this.platformId = platformId;
        this.http = http;
        this.currentPlace$ = new BehaviorSubject(null);
        this.place = this.currentPlace$.asObservable();
        this.documentIsAccessible = isPlatformBrowser(this.platformId);
        if (this.documentIsAccessible) {
            var location_1 = this.cookieService.getCookie('location');
            console.log('got location from cookie' + location_1);
            if (location_1 != null && location_1.length > 0) {
                this.updatePlace(JSON.parse(location_1));
            }
            else {
                this.getLocationFromIpInfo().then(function (ipInfoData) {
                    var data = { 'city': ipInfoData['city'], 'country': ipInfoData['countryCode'].toLowerCase(), 'currentPlace': ipInfoData['city'] };
                    _this.updatePlace(data);
                });
            }
        }
    }
    PlaceService.prototype.updatePlace = function (data) {
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
                        ipInfoData = JSON.parse(localData);
                        _a.label = 3;
                    case 3: return [2 /*return*/, ipInfoData];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlaceService.prototype.getJsonFromIpInfo = function () {
        return this.http.get('//ipinfo.io/json?token=' + environment.IPINFO_ACCESS_TOKEN + '').toPromise();
    };
    PlaceService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PlaceService_Factory() { return new PlaceService(i0.ɵɵinject(i1.CookieService), i0.ɵɵinject(i2.DOCUMENT), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i3.HttpClient)); }, token: PlaceService, providedIn: "root" });
    PlaceService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Inject(DOCUMENT)),
        tslib_1.__param(2, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [CookieService, Object, InjectionToken,
            HttpClient])
    ], PlaceService);
    return PlaceService;
}());
export { PlaceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBS2xEO0lBTUksc0JBQW9CLGFBQTRCLEVBQTRCLFFBQWEsRUFDeEQsVUFBa0MsRUFDdkQsSUFBZ0I7UUFGNUIsaUJBZ0JDO1FBaEJtQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ3hELGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ3ZELFNBQUksR0FBSixJQUFJLENBQVk7UUFOcEIsa0JBQWEsR0FBNEIsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFFbkYsVUFBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUMzQixJQUFNLFVBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNB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WSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi8uLi8uLi8uLi8uLi8uLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQbGFjZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50UGxhY2UkOiBCZWhhdmlvclN1YmplY3Q8T2JqZWN0PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T2JqZWN0PihudWxsKTtcbiAgICBkb2N1bWVudElzQWNjZXNzaWJsZTogYm9vbGVhbjtcbiAgICBwbGFjZSA9IHRoaXMuY3VycmVudFBsYWNlJC5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IEluamVjdGlvblRva2VuPE9iamVjdD4sXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50SXNBY2Nlc3NpYmxlID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5jb29raWVTZXJ2aWNlLmdldENvb2tpZSgnbG9jYXRpb24nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb3QgbG9jYXRpb24gZnJvbSBjb29raWUnICsgbG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9IG51bGwgJiYgbG9jYXRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2UoSlNPTi5wYXJzZShsb2NhdGlvbikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2F0aW9uRnJvbUlwSW5mbygpLnRoZW4oaXBJbmZvRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7ICdjaXR5JzogaXBJbmZvRGF0YVsnY2l0eSddLCAnY291bnRyeSc6IGlwSW5mb0RhdGFbJ2NvdW50cnlDb2RlJ10udG9Mb3dlckNhc2UoKSwgJ2N1cnJlbnRQbGFjZSc6IGlwSW5mb0RhdGFbJ2NpdHknXSB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGxhY2UoZGF0YSk6IHZvaWQge1xuICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXRDb29raWUoJ2xvY2F0aW9uJywgZGF0YSwgMTAwMDAwMDAwLCAnLycpO1xuICAgICAgICB0aGlzLmN1cnJlbnRQbGFjZSQubmV4dChkYXRhKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRMb2NhdGlvbkZyb21JcEluZm8oKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXBpbmZvX2RhdGEnKTtcbiAgICAgICAgICAgIGxldCBpcEluZm9EYXRhO1xuICAgICAgICAgICAgaWYgKCFsb2NhbERhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ2FsbGluZyBpcCBpbmZvIScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlwSW5mb0pzb24gPSBhd2FpdCB0aGlzLmdldEpzb25Gcm9tSXBJbmZvKCk7XG4gICAgICAgICAgICAgICAgaXBJbmZvRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgJ2xhdCc6IGlwSW5mb0pzb25bJ2xvYyddLnNwbGl0KCcsJylbMF0sXG4gICAgICAgICAgICAgICAgICAgICdsbmcnOiBpcEluZm9Kc29uWydsb2MnXS5zcGxpdCgnLCcpWzFdLFxuICAgICAgICAgICAgICAgICAgICAnY291bnRyeUNvZGUnOiBpcEluZm9Kc29uWydjb3VudHJ5J10udG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgJ2NpdHknOiBpcEluZm9Kc29uWydjaXR5J10udG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lwaW5mb19kYXRhJywgSlNPTi5zdHJpbmdpZnkoaXBJbmZvRGF0YSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpcEluZm9EYXRhID0gSlNPTi5wYXJzZShsb2NhbERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlwSW5mb0RhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRKc29uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy8vaXBpbmZvLmlvL2pzb24/dG9rZW49JyArIGVudmlyb25tZW50LklQSU5GT19BQ0NFU1NfVE9LRU4gKyAnJykudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19