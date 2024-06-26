import { __decorate, __param } from "tslib";
import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from '../../core/cookie.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { UtilityService } from './utilities.service';
var UserService = /** @class */ (function () {
    function UserService(utilityService, cookieService, document, platformId) {
        this.utilityService = utilityService;
        this.cookieService = cookieService;
        this.document = document;
        this.platformId = platformId;
        this.user$ = new BehaviorSubject(null);
        this.user = this.user$.asObservable();
        this.documentIsAccessible = isPlatformBrowser(this.platformId);
        if (this.documentIsAccessible) {
            var user = this.cookieService.getCookie('townscript-user');
            console.log('got user from cookie');
            if (user != null && user.length > 0 &&
                this.utilityService.IsJsonString(user) &&
                this.utilityService.IsJsonString((JSON.parse(user)))) {
                this.updateUser(JSON.parse(JSON.parse(user)));
            }
        }
    }
    UserService.prototype.updateUser = function (data) {
        if (data) {
            this.user$.next(data);
        }
        else {
            this.user$ = new BehaviorSubject(null);
        }
    };
    UserService.ctorParameters = function () { return [
        { type: UtilityService },
        { type: CookieService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: InjectionToken, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    UserService = __decorate([
        Injectable(),
        __param(2, Inject(DOCUMENT)),
        __param(3, Inject(PLATFORM_ID))
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3JEO0lBTUkscUJBQW9CLGNBQThCLEVBQVUsYUFBNEIsRUFBNEIsUUFBYSxFQUNoRyxVQUFrQztRQUQvQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2hHLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBTDNELFVBQUssR0FBcUMsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBRTNGLFNBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSTdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDcEMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakQ7U0FDSjtJQUNMLENBQUM7SUFFRCxnQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNYLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO1NBQ3pEO0lBQ0wsQ0FBQzs7Z0JBcEJtQyxjQUFjO2dCQUF5QixhQUFhO2dEQUFHLE1BQU0sU0FBQyxRQUFRO2dCQUM3RCxjQUFjLHVCQUF0RCxNQUFNLFNBQUMsV0FBVzs7SUFQZCxXQUFXO1FBRHZCLFVBQVUsRUFBRTtRQU9rRixXQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN0RyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQVBmLFdBQVcsQ0EyQnZCO0lBQUQsa0JBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQTNCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi91dGlsaXRpZXMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHVzZXIkOiBCZWhhdmlvclN1YmplY3Q8KE9iamVjdCB8IG51bGwpPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T2JqZWN0IHwgbnVsbD4obnVsbCk7XG4gICAgZG9jdW1lbnRJc0FjY2Vzc2libGU6IGJvb2xlYW47XG4gICAgdXNlciA9IHRoaXMudXNlciQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSwgcHJpdmF0ZSBjb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogSW5qZWN0aW9uVG9rZW48T2JqZWN0Pikge1xuICAgICAgICB0aGlzLmRvY3VtZW50SXNBY2Nlc3NpYmxlID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0Q29va2llKCd0b3duc2NyaXB0LXVzZXInKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnb3QgdXNlciBmcm9tIGNvb2tpZScpO1xuICAgICAgICAgICAgaWYgKHVzZXIgIT0gbnVsbCAmJiB1c2VyLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnV0aWxpdHlTZXJ2aWNlLklzSnNvblN0cmluZyh1c2VyKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKChKU09OLnBhcnNlKHVzZXIpKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVzZXIoSlNPTi5wYXJzZShKU09OLnBhcnNlKHVzZXIpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVVc2VyKGRhdGEpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMudXNlciQubmV4dChkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE9iamVjdCB8IG51bGw+KG51bGwpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19