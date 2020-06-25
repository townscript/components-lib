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
PlaceService.ctorParameters = () => [
    { type: UtilityService },
    { type: CookieService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: InjectionToken, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: HttpClient }
];
PlaceService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PlaceService_Factory() { return new PlaceService(i0.ɵɵinject(i1.UtilityService), i0.ɵɵinject(i2.CookieService), i0.ɵɵinject(i3.DOCUMENT), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i4.HttpClient)); }, token: PlaceService, providedIn: "root" });
PlaceService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(2, Inject(DOCUMENT)),
    tslib_1.__param(3, Inject(PLATFORM_ID))
], PlaceService);
export { PlaceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2NvbXBvbmVudHMvdHMtaGVhZGVyL3BsYWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDL0UsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFLdkQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQU1yQixZQUFvQixjQUE4QixFQUFVLGFBQTRCLEVBQTRCLFFBQWEsRUFDaEcsVUFBa0MsRUFDdkQsSUFBZ0I7UUFGUixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2hHLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBQ3ZELFNBQUksR0FBSixJQUFJLENBQVk7UUFOcEIsa0JBQWEsR0FBNEIsSUFBSSxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFFakYsVUFBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUMzQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDdkYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUMzQyxNQUFNLElBQUksR0FBRzt3QkFDVCxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQzt3QkFDMUIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNyRixjQUFjLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQztxQkFDckMsQ0FBQztvQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzFCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFSyxxQkFBcUI7O1lBQ3ZCLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLFVBQVUsQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFDaEMsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzFELFVBQVUsR0FBRyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDO29CQUMxRCxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLFVBQVUsRUFBRTt3QkFDWixVQUFVLEdBQUc7NEJBQ1QsYUFBYSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUU7NEJBQ2xELE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxFQUFFO3lCQUMzQyxDQUFDO3FCQUNMO29CQUNELFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztpQkFDbkU7cUJBQU07b0JBQ0gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDN0MsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3RDO2lCQUNKO2dCQUNELE9BQU8sVUFBVSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQztLQUFBO0lBRUQsaUJBQWlCO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEcsQ0FBQztDQUNKLENBQUE7O1lBNUR1QyxjQUFjO1lBQXlCLGFBQWE7NENBQUcsTUFBTSxTQUFDLFFBQVE7WUFDN0QsY0FBYyx1QkFBdEQsTUFBTSxTQUFDLFdBQVc7WUFDTCxVQUFVOzs7QUFSbkIsWUFBWTtJQUh4QixVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBTzZGLG1CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN0RyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7R0FQZixZQUFZLENBa0V4QjtTQWxFWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLy4uLy4uLy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUGxhY2VTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgY3VycmVudFBsYWNlJDogQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9iamVjdD4oe30pO1xuICAgIGRvY3VtZW50SXNBY2Nlc3NpYmxlOiBib29sZWFuO1xuICAgIHBsYWNlID0gdGhpcy5jdXJyZW50UGxhY2UkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsaXR5U2VydmljZTogVXRpbGl0eVNlcnZpY2UsIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSwgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IEluamVjdGlvblRva2VuPE9iamVjdD4sXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50SXNBY2Nlc3NpYmxlID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5jb29raWVTZXJ2aWNlLmdldENvb2tpZSgnbG9jYXRpb24nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb3QgbG9jYXRpb24gZnJvbSBjb29raWUnICsgbG9jYXRpb24pO1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uICE9IG51bGwgJiYgbG9jYXRpb24ubGVuZ3RoID4gMCAmJiB0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyhsb2NhdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlKEpTT04ucGFyc2UobG9jYXRpb24pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2NhdGlvbkZyb21JcEluZm8oKS50aGVuKGlwSW5mb0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NpdHknOiBpcEluZm9EYXRhWydjaXR5J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAnY291bnRyeSc6IGlwSW5mb0RhdGFbJ2NvdW50cnlDb2RlJ10gPyBpcEluZm9EYXRhWydjb3VudHJ5Q29kZSddLnRvTG93ZXJDYXNlKCkgOiAnaW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2N1cnJlbnRQbGFjZSc6IGlwSW5mb0RhdGFbJ2NpdHknXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ2xvY2F0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxhY2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVBsYWNlKGRhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIHBsYWNlIGluIGNvbXBvbmVudHMgd2l0aCAnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldENvb2tpZSgnbG9jYXRpb24nLCBkYXRhLCAxMDAsICcvJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFBsYWNlJC5uZXh0KGRhdGEpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldExvY2F0aW9uRnJvbUlwSW5mbygpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpcGluZm9fZGF0YScpO1xuICAgICAgICAgICAgbGV0IGlwSW5mb0RhdGE7XG4gICAgICAgICAgICBpZiAoIWxvY2FsRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYWxsaW5nIGlwIGluZm8hJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXBJbmZvSnNvbiA9IGF3YWl0IHRoaXMuZ2V0SnNvbkZyb21JcEluZm8oKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpcEluZm9EYXRhID0geyAnY291bnRyeUNvZGUnOiAnaW4nLCAnY2l0eSc6ICdpbmRpYScgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaXBJbmZvSnNvbikge1xuICAgICAgICAgICAgICAgICAgICBpcEluZm9EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdW50cnlDb2RlJzogaXBJbmZvSnNvblsnY291bnRyeSddLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAnY2l0eSc6IGlwSW5mb0pzb25bJ2NpdHknXS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpcGluZm9fZGF0YScsIEpTT04uc3RyaW5naWZ5KGlwSW5mb0RhdGEpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKGxvY2FsRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXBJbmZvRGF0YSA9IEpTT04ucGFyc2UobG9jYWxEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaXBJbmZvRGF0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEpzb25Gcm9tSXBJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnLy9pcGluZm8uaW8vanNvbj90b2tlbj0nICsgY29uZmlnLklQSU5GT19BQ0NFU1NfVE9LRU4gKyAnJykudG9Qcm9taXNlKCk7XG4gICAgfVxufVxuIl19