import * as tslib_1 from "tslib";
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
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(2, Inject(DOCUMENT)),
        tslib_1.__param(3, Inject(PLATFORM_ID))
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3JEO0lBTUkscUJBQW9CLGNBQThCLEVBQVUsYUFBNEIsRUFBNEIsUUFBYSxFQUNoRyxVQUFrQztRQUQvQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQ2hHLGVBQVUsR0FBVixVQUFVLENBQXdCO1FBTDNELFVBQUssR0FBcUMsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBRTNGLFNBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSTdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDcEMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakQ7U0FDSjtJQUNMLENBQUM7SUFFRCxnQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNYLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFlLENBQWdCLElBQUksQ0FBQyxDQUFDO1NBQ3pEO0lBQ0wsQ0FBQzs7Z0JBcEJtQyxjQUFjO2dCQUF5QixhQUFhO2dEQUFHLE1BQU0sU0FBQyxRQUFRO2dCQUM3RCxjQUFjLHVCQUF0RCxNQUFNLFNBQUMsV0FBVzs7SUFQZCxXQUFXO1FBRHZCLFVBQVUsRUFBRTtRQU9rRixtQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdEcsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BUGYsV0FBVyxDQTJCdkI7SUFBRCxrQkFBQztDQUFBLEFBM0JELElBMkJDO1NBM0JZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVXRpbGl0eVNlcnZpY2UgfSBmcm9tICcuL3V0aWxpdGllcy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgdXNlciQ6IEJlaGF2aW9yU3ViamVjdDwoT2JqZWN0IHwgbnVsbCk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPYmplY3QgfCBudWxsPihudWxsKTtcbiAgICBkb2N1bWVudElzQWNjZXNzaWJsZTogYm9vbGVhbjtcbiAgICB1c2VyID0gdGhpcy51c2VyJC5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbGl0eVNlcnZpY2U6IFV0aWxpdHlTZXJ2aWNlLCBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBJbmplY3Rpb25Ub2tlbjxPYmplY3Q+KSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRJc0FjY2Vzc2libGUgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudElzQWNjZXNzaWJsZSkge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IHRoaXMuY29va2llU2VydmljZS5nZXRDb29raWUoJ3Rvd25zY3JpcHQtdXNlcicpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dvdCB1c2VyIGZyb20gY29va2llJyk7XG4gICAgICAgICAgICBpZiAodXNlciAhPSBudWxsICYmIHVzZXIubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgIHRoaXMudXRpbGl0eVNlcnZpY2UuSXNKc29uU3RyaW5nKHVzZXIpICYmXG4gICAgICAgICAgICAgICAgdGhpcy51dGlsaXR5U2VydmljZS5Jc0pzb25TdHJpbmcoKEpTT04ucGFyc2UodXNlcikpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVXNlcihKU09OLnBhcnNlKEpTT04ucGFyc2UodXNlcikpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVVzZXIoZGF0YSk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy51c2VyJC5uZXh0KGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51c2VyJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8T2JqZWN0IHwgbnVsbD4obnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=