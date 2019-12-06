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
let PlaceService = class PlaceService {
    constructor(cookieService, document, platformId, http) {
        this.cookieService = cookieService;
        this.document = document;
        this.platformId = platformId;
        this.http = http;
        this.currentPlace$ = new BehaviorSubject(null);
        this.place = this.currentPlace$.asObservable();
        this.documentIsAccessible = isPlatformBrowser(this.platformId);
        if (this.documentIsAccessible) {
            const location = this.cookieService.getCookie('location');
            console.log('got location from cookie' + location);
            if (location != null && location.length > 0) {
                this.updatePlace(JSON.parse(location));
            }
            else {
                this.getLocationFromIpInfo().then(ipInfoData => {
                    const data = { 'city': ipInfoData['city'], 'country': ipInfoData['countryCode'].toLowerCase(), 'currentPlace': ipInfoData['city'] };
                    this.updatePlace(data);
                });
            }
        }
    }
    updatePlace(data) {
        console.log('updating place in components with ' + data);
        data = JSON.stringify(data);
        this.cookieService.setCookie('location', data, 100000000, '/');
        this.currentPlace$.next(data);
    }
    getLocationFromIpInfo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (isPlatformBrowser(this.platformId)) {
                const localData = localStorage.getItem('ipinfo_data');
                let ipInfoData;
                if (!localData) {
                    console.log('Calling ip info!');
                    const ipInfoJson = yield this.getJsonFromIpInfo();
                    ipInfoData = {
                        'lat': ipInfoJson['loc'].split(',')[0],
                        'lng': ipInfoJson['loc'].split(',')[1],
                        'countryCode': ipInfoJson['country'].toLowerCase(),
                        'city': ipInfoJson['city'].toLowerCase()
                    };
                    localStorage.setItem('ipinfo_data', JSON.stringify(ipInfoData));
                }
                else {
                    ipInfoData = JSON.parse(localData);
                }
                return ipInfoData;
            }
        });
    }
    getJsonFromIpInfo() {
        return this.http.get('//ipinfo.io/json?token=' + environment.IPINFO_ACCESS_TOKEN + '').toPromise();
    }
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
export { PlaceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBS2xELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFNckIsWUFBb0IsYUFBNEIsRUFBNEIsUUFBYSxFQUN4RCxVQUFrQyxFQUN2RCxJQUFnQjtRQUZSLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQTRCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDeEQsZUFBVSxHQUFWLFVBQVUsQ0FBd0I7UUFDdkQsU0FBSSxHQUFKLElBQUksQ0FBWTtRQU5wQixrQkFBYSxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUVuRixVQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUt0QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzNCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxh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LGFBQWEsVUFDSCxjQUFjO1FBQ3pDLFVBQVU7R0FSbkIsWUFBWSxDQXVEeEI7U0F2RFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL2Nvb2tpZS5zZXJ2aWNlJztcbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4vLi4vLi4vLi4vLi4vLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUGxhY2VTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY3VycmVudFBsYWNlJDogQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4obnVsbCk7XG4gICAgZG9jdW1lbnRJc0FjY2Vzc2libGU6IGJvb2xlYW47XG4gICAgcGxhY2UgPSB0aGlzLmN1cnJlbnRQbGFjZSQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBJbmplY3Rpb25Ub2tlbjxPYmplY3Q+LFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudElzQWNjZXNzaWJsZSA9IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50SXNBY2Nlc3NpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ2xvY2F0aW9uJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ290IGxvY2F0aW9uIGZyb20gY29va2llJyArIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbiAhPSBudWxsICYmIGxvY2F0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKEpTT04ucGFyc2UobG9jYXRpb24pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhdGlvbkZyb21JcEluZm8oKS50aGVuKGlwSW5mb0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geyAnY2l0eSc6IGlwSW5mb0RhdGFbJ2NpdHknXSwgJ2NvdW50cnknOiBpcEluZm9EYXRhWydjb3VudHJ5Q29kZSddLnRvTG93ZXJDYXNlKCksICdjdXJyZW50UGxhY2UnOiBpcEluZm9EYXRhWydjaXR5J10gfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGFjZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVBsYWNlKGRhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIHBsYWNlIGluIGNvbXBvbmVudHMgd2l0aCAnICsgZGF0YSk7XG4gICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldENvb2tpZSgnbG9jYXRpb24nLCBkYXRhLCAxMDAwMDAwMDAsICcvJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFBsYWNlJC5uZXh0KGRhdGEpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldExvY2F0aW9uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpcGluZm9fZGF0YScpO1xuICAgICAgICAgICAgbGV0IGlwSW5mb0RhdGE7XG4gICAgICAgICAgICBpZiAoIWxvY2FsRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYWxsaW5nIGlwIGluZm8hJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXBJbmZvSnNvbiA9IGF3YWl0IHRoaXMuZ2V0SnNvbkZyb21JcEluZm8oKTtcbiAgICAgICAgICAgICAgICBpcEluZm9EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAnbGF0JzogaXBJbmZvSnNvblsnbG9jJ10uc3BsaXQoJywnKVswXSxcbiAgICAgICAgICAgICAgICAgICAgJ2xuZyc6IGlwSW5mb0pzb25bJ2xvYyddLnNwbGl0KCcsJylbMV0sXG4gICAgICAgICAgICAgICAgICAgICdjb3VudHJ5Q29kZSc6IGlwSW5mb0pzb25bJ2NvdW50cnknXS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAnY2l0eSc6IGlwSW5mb0pzb25bJ2NpdHknXS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXBpbmZvX2RhdGEnLCBKU09OLnN0cmluZ2lmeShpcEluZm9EYXRhKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXBJbmZvRGF0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEpzb25Gcm9tSXBJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnLy9pcGluZm8uaW8vanNvbj90b2tlbj0nICsgZW52aXJvbm1lbnQuSVBJTkZPX0FDQ0VTU19UT0tFTiArICcnKS50b1Byb21pc2UoKTtcbiAgICB9XG59XG4iXX0=