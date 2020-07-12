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
                    console.log('returned value from get location for ipinfo is ' + ipInfoData);
                    const data = {
                        'city': ipInfoData['city'],
                        'country': ipInfoData['countryCode'] ? ipInfoData['countryCode'].toLowerCase() : 'in',
                        'currentPlace': ipInfoData['city']
                    };
                    if (!this.cookieService.getCookie('location')) {
                        this.setLocationCookie(data);
                        this.updatePlace(data);
                    }
                });
            }
        }
    }
    setLocationCookie(data) {
        console.log('updating place in components with ');
        console.log(data);
        data = JSON.stringify(data);
        console.log(' strigified data setting in cookie for location is ' + data);
        this.cookieService.setCookie('location', data, 100, '/');
    }
    updatePlace(data) {
        this.currentPlace$.next(data);
    }
    getLocationFromIpInfo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (isPlatformBrowser(this.platformId)) {
                let ipInfoCookieData = this.cookieService.getCookie('ipInfoData');
                let localData = localStorage.getItem('ipinfo_data');
                if (ipInfoCookieData && !localData) {
                    console.log('ipinfo2 cookie set before localstorage data setting ' + ipInfoCookieData);
                    ipInfoCookieData = decodeURIComponent(ipInfoCookieData);
                    console.log('decoded value is ' + ipInfoCookieData);
                    const jsonIpInfoCookie = JSON.parse(ipInfoCookieData);
                    const localDataJson = { 'countryCode': '', 'city': '' };
                    localDataJson.countryCode = jsonIpInfoCookie.country;
                    localDataJson.city = jsonIpInfoCookie.city;
                    localData = JSON.stringify(localDataJson);
                    console.log('localdata after complete parsing is ' + localData);
                    localStorage.setItem('ipinfo_data', ipInfoCookieData);
                }
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
                    this.callMaxMindTest();
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
    callMaxMindTest() {
        this.http.get('https://nqjmyz4jvh.execute-api.ap-south-1.amazonaws.com/countryISOCode').subscribe(data => console.log('successful maxmind invocation from place service'), error => console.log('failed invocation for maxmind from place service'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFLdkQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQU1yQixZQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQTRCLFFBQWEsRUFDaEcsVUFBa0MsRUFDdkQsSUFBZ0I7UUFGUixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2hHLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ3ZELFNBQUksR0FBSixJQUFJLENBQVk7UUFOcEIsa0JBQWEsR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFFakYsVUFBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FB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Z0JBQ0QsT0FBTyxVQUFVLENBQUM7YUFDckI7UUFDTCxDQUFDO0tBQUE7SUFFRCxpQkFBaUI7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsRyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHdFQUF3RSxDQUFDLENBQUMsU0FBUyxDQUM3RixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0RBQWtELENBQUMsRUFDdkUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQzNFLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTs7QUE5RlksWUFBWTtJQUh4QixVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBTzZGLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7NkNBRFksY0FBYyxFQUF5QixhQUFhLFVBQzNDLGNBQWM7UUFDekMsVUFBVTtHQVJuQixZQUFZLENBOEZ4QjtTQTlGWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUGxhY2VTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY3VycmVudFBsYWNlJDogQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4oe30pO1xuICAgIGRvY3VtZW50SXNBY2Nlc3NpYmxlOiBib29sZWFuO1xuICAgIHBsYWNlID0gdGhpcy5jdXJyZW50UGxhY2UkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IEluamVjdGlvblRva2VuPE9iamVjdD4sXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50SXNBY2Nlc3NpYmxlID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5jb29raWVTZXJ2aWNlLmdldENvb2tpZSgnbG9jYXRpb24nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb3QgbG9jYXRpb24gZnJvbSBjb29raWUnICsgbG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9IG51bGwgJiYgbG9jYXRpb24ubGVuZ3RoID4gMCAmJiB0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKEpTT04ucGFyc2UobG9jYXRpb24pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhdGlvbkZyb21JcEluZm8oKS50aGVuKGlwSW5mb0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmV0dXJuZWQgdmFsdWUgZnJvbSBnZXQgbG9jYXRpb24gZm9yIGlwaW5mbyBpcyAnICsgaXBJbmZvRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnY2l0eSc6IGlwSW5mb0RhdGFbJ2NpdHknXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb3VudHJ5JzogaXBJbmZvRGF0YVsnY291bnRyeUNvZGUnXSA/IGlwSW5mb0RhdGFbJ2NvdW50cnlDb2RlJ10udG9Mb3dlckNhc2UoKSA6ICdpbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnY3VycmVudFBsYWNlJzogaXBJbmZvRGF0YVsnY2l0eSddXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb29raWVTZXJ2aWNlLmdldENvb2tpZSgnbG9jYXRpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhdGlvbkNvb2tpZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExvY2F0aW9uQ29va2llKGRhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIHBsYWNlIGluIGNvbXBvbmVudHMgd2l0aCAnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2coJyBzdHJpZ2lmaWVkIGRhdGEgc2V0dGluZyBpbiBjb29raWUgZm9yIGxvY2F0aW9uIGlzICcgKyBkYXRhKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldENvb2tpZSgnbG9jYXRpb24nLCBkYXRhLCAxMDAsICcvJyk7XG4gICAgfVxuXG4gICAgdXBkYXRlUGxhY2UoZGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRQbGFjZSQubmV4dChkYXRhKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIGdldExvY2F0aW9uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGxldCBpcEluZm9Db29raWVEYXRhID0gdGhpcy5jb29raWVTZXJ2aWNlLmdldENvb2tpZSgnaXBJbmZvRGF0YScpO1xuICAgICAgICAgICAgbGV0IGxvY2FsRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpcGluZm9fZGF0YScpO1xuICAgICAgICAgICAgaWYgKGlwSW5mb0Nvb2tpZURhdGEgJiYgIWxvY2FsRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpcGluZm8yIGNvb2tpZSBzZXQgYmVmb3JlIGxvY2Fsc3RvcmFnZSBkYXRhIHNldHRpbmcgJyArIGlwSW5mb0Nvb2tpZURhdGEpO1xuICAgICAgICAgICAgICAgIGlwSW5mb0Nvb2tpZURhdGEgPSBkZWNvZGVVUklDb21wb25lbnQoaXBJbmZvQ29va2llRGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlY29kZWQgdmFsdWUgaXMgJyArIGlwSW5mb0Nvb2tpZURhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGpzb25JcEluZm9Db29raWUgPSBKU09OLnBhcnNlKGlwSW5mb0Nvb2tpZURhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YUpzb24gPSB7ICdjb3VudHJ5Q29kZSc6ICcnLCAnY2l0eSc6ICcnIH07XG4gICAgICAgICAgICAgICAgbG9jYWxEYXRhSnNvbi5jb3VudHJ5Q29kZSA9IGpzb25JcEluZm9Db29raWUuY291bnRyeTtcbiAgICAgICAgICAgICAgICBsb2NhbERhdGFKc29uLmNpdHkgPSBqc29uSXBJbmZvQ29va2llLmNpdHk7XG4gICAgICAgICAgICAgICAgbG9jYWxEYXRhID0gSlNPTi5zdHJpbmdpZnkobG9jYWxEYXRhSnNvbik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvY2FsZGF0YSBhZnRlciBjb21wbGV0ZSBwYXJzaW5nIGlzICcgKyBsb2NhbERhdGEpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpcGluZm9fZGF0YScsIGlwSW5mb0Nvb2tpZURhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGlwSW5mb0RhdGE7XG4gICAgICAgICAgICBpZiAoIWxvY2FsRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYWxsaW5nIGlwIGluZm8hJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXBJbmZvSnNvbiA9IGF3YWl0IHRoaXMuZ2V0SnNvbkZyb21JcEluZm8oKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpcEluZm9EYXRhID0geyAnY291bnRyeUNvZGUnOiAnaW4nLCAnY2l0eSc6ICdpbmRpYScgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaXBJbmZvSnNvbikge1xuICAgICAgICAgICAgICAgICAgICBpcEluZm9EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdW50cnlDb2RlJzogaXBJbmZvSnNvblsnY291bnRyeSddLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAnY2l0eSc6IGlwSW5mb0pzb25bJ2NpdHknXS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpcGluZm9fZGF0YScsIEpTT04uc3RyaW5naWZ5KGlwSW5mb0RhdGEpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxNYXhNaW5kVGVzdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcobG9jYWxEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBpcEluZm9EYXRhID0gSlNPTi5wYXJzZShsb2NhbERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpcEluZm9EYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SnNvbkZyb21JcEluZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvL2lwaW5mby5pby9qc29uP3Rva2VuPScgKyBjb25maWcuSVBJTkZPX0FDQ0VTU19UT0tFTiArICcnKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBjYWxsTWF4TWluZFRlc3QoKSB7XG4gICAgICAgIHRoaXMuaHR0cC5nZXQoJ2h0dHBzOi8vbnFqbXl6NGp2aC5leGVjdXRlLWFwaS5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb20vY291bnRyeUlTT0NvZGUnKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKCdzdWNjZXNzZnVsIG1heG1pbmQgaW52b2NhdGlvbiBmcm9tIHBsYWNlIHNlcnZpY2UnKSxcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKCdmYWlsZWQgaW52b2NhdGlvbiBmb3IgbWF4bWluZCBmcm9tIHBsYWNlIHNlcnZpY2UnKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==