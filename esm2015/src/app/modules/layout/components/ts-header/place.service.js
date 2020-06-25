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
let PlaceService = class PlaceService {
    constructor(utilityService, cookieService, document, platformId, http) {
        this.utilityService = utilityService;
        this.cookieService = cookieService;
        this.document = document;
        this.platformId = platformId;
        this.http = http;
        this.currentPlace$ = new BehaviorSubject({});
        this.place = this.currentPlace$.asObservable();
        this.documentIsAccessible = isPlatformBrowser(this.platformId);
        if (this.documentIsAccessible) {
            const location = this.cookieService.getCookie('location');
            console.log('got location from cookie' + location);
            if (location != null && location.length > 0 && this.utilityService.IsJsonString(location)) {
                this.updatePlace(JSON.parse(location));
            }
            else {
                this.getLocationFromIpInfo().then(ipInfoData => {
                    const data = {
                        'city': ipInfoData['city'],
                        'country': ipInfoData['countryCode'] ? ipInfoData['countryCode'].toLowerCase() : 'in',
                        'currentPlace': ipInfoData['city']
                    };
                    if (!this.cookieService.getCookie('location')) {
                        this.updatePlace(data);
                    }
                });
            }
        }
    }
    updatePlace(data) {
        console.log('updating place in components with ');
        console.log(data);
        data = JSON.stringify(data);
        this.cookieService.setCookie('location', data, 100, '/');
        this.currentPlace$.next(data);
    }
    getLocationFromIpInfo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (isPlatformBrowser(this.platformId)) {
                const localData = localStorage.getItem('ipinfo_data');
                let ipInfoData;
                if (!localData) {
                    console.log('Calling ip info!');
                    const ipInfoJson = yield this.getJsonFromIpInfo().catch(err => {
                        ipInfoData = { 'countryCode': 'in', 'city': 'india' };
                    });
                    if (ipInfoJson) {
                        ipInfoData = {
                            'countryCode': ipInfoJson['country'].toLowerCase(),
                            'city': ipInfoJson['city'].toLowerCase()
                        };
                    }
                    localStorage.setItem('ipinfo_data', JSON.stringify(ipInfoData));
                }
                else {
                    if (this.utilityService.IsJsonString(localData)) {
                        ipInfoData = JSON.parse(localData);
                    }
                }
                return ipInfoData;
            }
        });
    }
    getJsonFromIpInfo() {
        return this.http.get('//ipinfo.io/json?token=' + config.IPINFO_ACCESS_TOKEN + '').toPromise();
    }
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
export { PlaceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFLdkQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQU1yQixZQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQTRCLFFBQWEsRUFDaEcsVUFBa0MsRUFDdkQsSUFBZ0I7UUFGUixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2hHLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ3ZELFNBQUksR0FBSixJQUFJLENBQVk7UUFOcEIsa0JBQWEsR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFFakYsVUFBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FB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LENBQUM7cUJBQ3RDO2lCQUNKO2dCQUNELE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQztLQUFBO0lBRUQsaUJBQWlCO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEcsQ0FBQztDQUNKLENBQUE7O0FBbEVZLFlBQVk7SUFIeEIsVUFBVSxDQUFDO1FBQ1IsVUFBVSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQU82RixtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEcsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBOzZDQURZLGNBQWMsRUFBeUIsYUFBYSxVQUMzQyxjQUFjO1FBQ3pDLFVBQVU7R0FSbkIsWUFBWSxDQWtFeEI7U0FsRVksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2Nvb2tpZS5zZXJ2aWNlJztcbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi8uLi8uLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBsYWNlU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGN1cnJlbnRQbGFjZSQ6IEJlaGF2aW9yU3ViamVjdDxPYmplY3Q+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPYmplY3Q+KHt9KTtcbiAgICBkb2N1bWVudElzQWNjZXNzaWJsZTogYm9vbGVhbjtcbiAgICBwbGFjZSA9IHRoaXMuY3VycmVudFBsYWNlJC5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLCBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBJbmplY3Rpb25Ub2tlbjxPYmplY3Q+LFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudElzQWNjZXNzaWJsZSA9IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50SXNBY2Nlc3NpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ2xvY2F0aW9uJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ290IGxvY2F0aW9uIGZyb20gY29va2llJyArIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbiAhPSBudWxsICYmIGxvY2F0aW9uLmxlbmd0aCA+IDAgJiYgdGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcobG9jYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGFjZShKU09OLnBhcnNlKGxvY2F0aW9uKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9jYXRpb25Gcm9tSXBJbmZvKCkudGhlbihpcEluZm9EYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjaXR5JzogaXBJbmZvRGF0YVsnY2l0eSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdW50cnknOiBpcEluZm9EYXRhWydjb3VudHJ5Q29kZSddID8gaXBJbmZvRGF0YVsnY291bnRyeUNvZGUnXS50b0xvd2VyQ2FzZSgpIDogJ2luJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjdXJyZW50UGxhY2UnOiBpcEluZm9EYXRhWydjaXR5J11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0Q29va2llKCdsb2NhdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQbGFjZShkYXRhKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZyBwbGFjZSBpbiBjb21wb25lbnRzIHdpdGggJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXRDb29raWUoJ2xvY2F0aW9uJywgZGF0YSwgMTAwLCAnLycpO1xuICAgICAgICB0aGlzLmN1cnJlbnRQbGFjZSQubmV4dChkYXRhKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRMb2NhdGlvbkZyb21JcEluZm8oKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXBpbmZvX2RhdGEnKTtcbiAgICAgICAgICAgIGxldCBpcEluZm9EYXRhO1xuICAgICAgICAgICAgaWYgKCFsb2NhbERhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ2FsbGluZyBpcCBpbmZvIScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlwSW5mb0pzb24gPSBhd2FpdCB0aGlzLmdldEpzb25Gcm9tSXBJbmZvKCkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXBJbmZvRGF0YSA9IHsgJ2NvdW50cnlDb2RlJzogJ2luJywgJ2NpdHknOiAnaW5kaWEnIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGlwSW5mb0pzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaXBJbmZvRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb3VudHJ5Q29kZSc6IGlwSW5mb0pzb25bJ2NvdW50cnknXS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NpdHknOiBpcEluZm9Kc29uWydjaXR5J10udG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXBpbmZvX2RhdGEnLCBKU09OLnN0cmluZ2lmeShpcEluZm9EYXRhKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhbERhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlwSW5mb0RhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRKc29uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJy8vaXBpbmZvLmlvL2pzb24/dG9rZW49JyArIGNvbmZpZy5JUElORk9fQUNDRVNTX1RPS0VOICsgJycpLnRvUHJvbWlzZSgpO1xuICAgIH1cbn1cbiJdfQ==