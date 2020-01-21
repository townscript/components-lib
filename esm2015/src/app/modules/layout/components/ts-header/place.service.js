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
                    const data = { 'city': ipInfoData['city'],
                        'country': ipInfoData['countryCode'] ? ipInfoData['countryCode'].toLowerCase() : 'in',
                        'currentPlace': ipInfoData['city'] };
                    if (!this.cookieService.getCookie('location'))
                        this.updatePlace(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFLdkQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQU1yQixZQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQTRCLFFBQWEsRUFDaEcsVUFBa0MsRUFDdkQsSUFBZ0I7UUFGUixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2hHLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ3ZELFNBQUksR0FBSixJQUFJLENBQVk7UUFOcEIsa0JBQWEsR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFFakYsVUFBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FB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QyxDQUFDO3FCQUN0QztpQkFDSjtnQkFDRCxPQUFPLFVBQVUsQ0FBQzthQUNyQjtRQUNMLENBQUM7S0FBQTtJQUVELGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xHLENBQUM7Q0FDSixDQUFBOztBQTdEWSxZQUFZO0lBSHhCLFVBQVUsQ0FBQztRQUNSLFVBQVUsRUFBRSxNQUFNO0tBQ3JCLENBQUM7SUFPNkYsbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RHLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTs2Q0FEWSxjQUFjLEVBQXlCLGFBQWEsVUFDM0MsY0FBYztRQUN6QyxVQUFVO0dBUm5CLFlBQVksQ0E2RHhCO1NBN0RZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3V0aWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vLi4vLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQbGFjZVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50UGxhY2UkOiBCZWhhdmlvclN1YmplY3Q8T2JqZWN0PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T2JqZWN0Pih7fSk7XG4gICAgZG9jdW1lbnRJc0FjY2Vzc2libGU6IGJvb2xlYW47XG4gICAgcGxhY2UgPSB0aGlzLmN1cnJlbnRQbGFjZSQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSwgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogSW5qZWN0aW9uVG9rZW48T2JqZWN0PixcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudElzQWNjZXNzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0Q29va2llKCdsb2NhdGlvbicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dvdCBsb2NhdGlvbiBmcm9tIGNvb2tpZScgKyBsb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24gIT0gbnVsbCAmJiBsb2NhdGlvbi5sZW5ndGggPiAwICYmIHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2UoSlNPTi5wYXJzZShsb2NhdGlvbikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvY2F0aW9uRnJvbUlwSW5mbygpLnRoZW4oaXBJbmZvRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7ICdjaXR5JzogaXBJbmZvRGF0YVsnY2l0eSddLFxuICAgICAgICAgICAgICAgICAgICAgICdjb3VudHJ5JzogaXBJbmZvRGF0YVsnY291bnRyeUNvZGUnXSA/IGlwSW5mb0RhdGFbJ2NvdW50cnlDb2RlJ10udG9Mb3dlckNhc2UoKSA6ICdpbicsXG4gICAgICAgICAgICAgICAgICAgICAgJ2N1cnJlbnRQbGFjZSc6IGlwSW5mb0RhdGFbJ2NpdHknXSB9O1xuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5jb29raWVTZXJ2aWNlLmdldENvb2tpZSgnbG9jYXRpb24nKSlcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGxhY2UoZGF0YSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygndXBkYXRpbmcgcGxhY2UgaW4gY29tcG9uZW50cyB3aXRoICcpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0Q29va2llKCdsb2NhdGlvbicsIGRhdGEsIDEwMCwgJy8nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50UGxhY2UkLm5leHQoZGF0YSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0TG9jYXRpb25Gcm9tSXBJbmZvKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lwaW5mb19kYXRhJyk7XG4gICAgICAgICAgICBsZXQgaXBJbmZvRGF0YTtcbiAgICAgICAgICAgIGlmICghbG9jYWxEYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhbGxpbmcgaXAgaW5mbyEnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpcEluZm9Kc29uID0gYXdhaXQgdGhpcy5nZXRKc29uRnJvbUlwSW5mbygpO1xuICAgICAgICAgICAgICAgIGlwSW5mb0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICdsYXQnOiBpcEluZm9Kc29uWydsb2MnXS5zcGxpdCgnLCcpWzBdLFxuICAgICAgICAgICAgICAgICAgICAnbG5nJzogaXBJbmZvSnNvblsnbG9jJ10uc3BsaXQoJywnKVsxXSxcbiAgICAgICAgICAgICAgICAgICAgJ2NvdW50cnlDb2RlJzogaXBJbmZvSnNvblsnY291bnRyeSddLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICdjaXR5JzogaXBJbmZvSnNvblsnY2l0eSddLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpcGluZm9fZGF0YScsIEpTT04uc3RyaW5naWZ5KGlwSW5mb0RhdGEpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKGxvY2FsRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXBJbmZvRGF0YSA9IEpTT04ucGFyc2UobG9jYWxEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXBJbmZvRGF0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEpzb25Gcm9tSXBJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnLy9pcGluZm8uaW8vanNvbj90b2tlbj0nICsgY29uZmlnLklQSU5GT19BQ0NFU1NfVE9LRU4gKyAnJykudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19