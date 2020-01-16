import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { config } from '../../../core/app-config';
var TsLoginSignupService = /** @class */ (function () {
    function TsLoginSignupService(http) {
        var _this = this;
        this.http = http;
        this.token = config.token;
        this.baseUrl = config.baseUrl;
        this.apiServerUrl = this.baseUrl + 'api/';
        this.headers = new HttpHeaders().set('Authorization', this.token);
        this.CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY = config.CAPTCHA_SITE_INVISIBLE_CAPTCHA_KEY;
        this.getUserSignUpDetails = function (emailId) {
            var params = new HttpParams({ fromString: "email=" + emailId });
            return _this.http.get(_this.apiServerUrl + 'user/getusersignupdetails', { params: params, headers: _this.headers }).toPromise();
        };
        this.loginWithTownscript = function (emailId, password) {
            var formData = new FormData();
            formData.set('emailId', emailId);
            formData.set('password', password);
            return _this.http.post(_this.apiServerUrl + 'user/loginwithtownscript', formData, { headers: _this.headers }).toPromise();
        };
        this.registerWithTownscriptWithCaptcha = function (formData) {
            return _this.http.post(_this.apiServerUrl + 'user/registerwithtownscriptwithcaptcha', formData, { headers: _this.headers, responseType: 'text' }).toPromise();
        };
        this.sendForgotPwdEmail = function (emailId) {
            var forgotPassword = new FormData();
            forgotPassword.set('emailId', emailId);
            return _this.http.post(_this.apiServerUrl + 'verify/sendforgotpwdemail', forgotPassword, { headers: _this.headers }).toPromise();
        };
        this.resendVerificationCode = function (rdurl, emailId) {
            var formData = new FormData();
            formData.append('rdurl', rdurl);
            formData.append('emailid', emailId);
            return _this.http.post(_this.apiServerUrl + 'user/resendverificationcode', formData, { headers: _this.headers });
        };
    }
    TsLoginSignupService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], TsLoginSignupService);
    return TsLoginSignupService;
}());
export { TsLoginSignupService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtbG9naW4tc2lnbnVwLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2xvZ2luU2lnbnVwL3RzLWxvZ2luLXNpZ251cC90cy1sb2dpbi1zaWdudXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHbEQ7SUFTRSw4QkFBb0IsSUFBZ0I7UUFBcEMsaUJBQ0M7UUFEbUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQVBwQyxVQUFLLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM3QixZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxpQkFBWSxHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRTdDLFlBQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdELHVDQUFrQyxHQUFHLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQztRQUsvRSx5QkFBb0IsR0FBRyxVQUFDLE9BQWU7WUFDckMsSUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbEUsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsWUFBWSxHQUFHLDJCQUEyQixFQUNsRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzNELENBQUMsQ0FBQTtRQUVELHdCQUFtQixHQUFHLFVBQUMsT0FBZSxFQUFFLFFBQWdCO1lBQ3RELElBQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDaEMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkMsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxHQUFHLDBCQUEwQixFQUNsRSxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckQsQ0FBQyxDQUFBO1FBRUQsc0NBQWlDLEdBQUcsVUFBQyxRQUFhO1lBQ2hELE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksR0FBRyx3Q0FBd0MsRUFDaEYsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0UsQ0FBQyxDQUFBO1FBRUQsdUJBQWtCLEdBQUcsVUFBQyxPQUFlO1lBQ25DLElBQU0sY0FBYyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDdEMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkMsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxHQUFHLDJCQUEyQixFQUNuRSxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0QsQ0FBQyxDQUFBO1FBRUQsMkJBQXNCLEdBQUcsVUFBQyxLQUFhLEVBQUUsT0FBZTtZQUN0RCxJQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksR0FBRyw2QkFBNkIsRUFDckUsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQTtJQWxDRCxDQUFDO0lBVlUsb0JBQW9CO1FBRGhDLFVBQVUsRUFBRTtpREFVZSxVQUFVO09BVHpCLG9CQUFvQixDQTZDaEM7SUFBRCwyQkFBQztDQUFBLEFBN0NELElBNkNDO1NBN0NZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRzTG9naW5TaWdudXBTZXJ2aWNlIHtcblxuICB0b2tlbjogc3RyaW5nID0gY29uZmlnLnRva2VuO1xuICBiYXNlVXJsOiBTdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgYXBpU2VydmVyVXJsOiBTdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnYXBpLyc7XG5cbiAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMudG9rZW4pO1xuICBDQVBUQ0hBX1NJVEVfSU5WSVNJQkxFX0NBUFRDSEFfS0VZID0gY29uZmlnLkNBUFRDSEFfU0lURV9JTlZJU0lCTEVfQ0FQVENIQV9LRVk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gIH1cblxuICBnZXRVc2VyU2lnblVwRGV0YWlscyA9IChlbWFpbElkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKHsgZnJvbVN0cmluZzogYGVtYWlsPWAgKyBlbWFpbElkIH0pO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYXBpU2VydmVyVXJsICsgJ3VzZXIvZ2V0dXNlcnNpZ251cGRldGFpbHMnLFxuICAgICAgeyBwYXJhbXM6IHBhcmFtcywgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgbG9naW5XaXRoVG93bnNjcmlwdCA9IChlbWFpbElkOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybURhdGEuc2V0KCdlbWFpbElkJywgZW1haWxJZCk7XG4gICAgZm9ybURhdGEuc2V0KCdwYXNzd29yZCcsIHBhc3N3b3JkKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlTZXJ2ZXJVcmwgKyAndXNlci9sb2dpbndpdGh0b3duc2NyaXB0JyxcbiAgICAgIGZvcm1EYXRhLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KS50b1Byb21pc2UoKTtcbiAgfVxuXG4gIHJlZ2lzdGVyV2l0aFRvd25zY3JpcHRXaXRoQ2FwdGNoYSA9IChmb3JtRGF0YTogYW55KTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlTZXJ2ZXJVcmwgKyAndXNlci9yZWdpc3RlcndpdGh0b3duc2NyaXB0d2l0aGNhcHRjaGEnLFxuICAgICAgZm9ybURhdGEsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzLCByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KS50b1Byb21pc2UoKTtcbiAgfVxuXG4gIHNlbmRGb3Jnb3RQd2RFbWFpbCA9IChlbWFpbElkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIGNvbnN0IGZvcmdvdFBhc3N3b3JkID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9yZ290UGFzc3dvcmQuc2V0KCdlbWFpbElkJywgZW1haWxJZCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYXBpU2VydmVyVXJsICsgJ3ZlcmlmeS9zZW5kZm9yZ290cHdkZW1haWwnLFxuICAgICAgZm9yZ290UGFzc3dvcmQsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgcmVzZW5kVmVyaWZpY2F0aW9uQ29kZSA9IChyZHVybDogc3RyaW5nLCBlbWFpbElkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgncmR1cmwnLCByZHVybCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCdlbWFpbGlkJywgZW1haWxJZCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYXBpU2VydmVyVXJsICsgJ3VzZXIvcmVzZW5kdmVyaWZpY2F0aW9uY29kZScsXG4gICAgICBmb3JtRGF0YSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gIH1cbn1cbiJdfQ==