import { __decorate, __param } from "tslib";
import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var CookieService = /** @class */ (function () {
    function CookieService(platformId) {
        var _this = this;
        this.platformId = platformId;
        this.deleteCookie = function (name) {
            _this.setCookie(name, '', -1, '/');
        };
        this.setCookie = function (name, value, expireDays, path) {
            if (path === void 0) { path = ''; }
            if (isPlatformBrowser(_this.platformId)) {
                var d = new Date();
                d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
                var expires = 'expires=' + d.toUTCString();
                var host = '.' + window.location.host.split('.').splice(1).join('.');
                document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '') + ';domain=' + host;
            }
        };
    }
    CookieService.prototype.getCookie = function (name) {
        if (isPlatformBrowser(this.platformId)) {
            var ca = document.cookie.split(';');
            var caLen = ca.length;
            var cookieName = name + "=";
            var c = void 0;
            for (var i = 0; i < caLen; i += 1) {
                c = ca[i].replace(/^\s+/g, '');
                if (c.indexOf(cookieName) === 0) {
                    return c.substring(cookieName.length, c.length);
                }
            }
        }
        return null;
    };
    CookieService.ctorParameters = function () { return [
        { type: InjectionToken, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    CookieService = __decorate([
        Injectable(),
        __param(0, Inject(PLATFORM_ID))
    ], CookieService);
    return CookieService;
}());
export { CookieService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9jb3JlL2Nvb2tpZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3BEO0lBRUUsdUJBQXlDLFVBQWtDO1FBQTNFLGlCQUFrRjtRQUF6QyxlQUFVLEdBQVYsVUFBVSxDQUF3QjtRQW1CcEUsaUJBQVksR0FBRyxVQUFDLElBQVk7WUFDakMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQTtRQUVNLGNBQVMsR0FBRyxVQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsVUFBa0IsRUFBRSxJQUFpQjtZQUFqQixxQkFBQSxFQUFBLFNBQWlCO1lBQ3BGLElBQUksaUJBQWlCLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN0QyxJQUFNLENBQUMsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUMzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzFELElBQU0sT0FBTyxHQUFXLFVBQVUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JELElBQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkUsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDdkg7UUFDSCxDQUFDLENBQUE7SUEvQmdGLENBQUM7SUFFM0UsaUNBQVMsR0FBaEIsVUFBaUIsSUFBWTtRQUMzQixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFNLEVBQUUsR0FBa0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBTSxLQUFLLEdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxJQUFNLFVBQVUsR0FBTSxJQUFJLE1BQUcsQ0FBQztZQUM5QixJQUFJLENBQUMsU0FBUSxDQUFDO1lBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakQ7YUFDRjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkFqQm9ELGNBQWMsdUJBQXRELE1BQU0sU0FBQyxXQUFXOztJQUZwQixhQUFhO1FBRHpCLFVBQVUsRUFBRTtRQUdFLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BRnJCLGFBQWEsQ0FtQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQW5DWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvb2tpZVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogSW5qZWN0aW9uVG9rZW48T2JqZWN0PiwgKSB7IH1cblxuICBwdWJsaWMgZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBjb25zdCBjYTogQXJyYXk8c3RyaW5nPiA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgICAgY29uc3QgY2FMZW46IG51bWJlciA9IGNhLmxlbmd0aDtcbiAgICAgIGNvbnN0IGNvb2tpZU5hbWUgPSBgJHtuYW1lfT1gO1xuICAgICAgbGV0IGM6IHN0cmluZztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYUxlbjsgaSArPSAxKSB7XG4gICAgICAgIGMgPSBjYVtpXS5yZXBsYWNlKC9eXFxzKy9nLCAnJyk7XG4gICAgICAgIGlmIChjLmluZGV4T2YoY29va2llTmFtZSkgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcoY29va2llTmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVDb29raWUgPSAobmFtZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgdGhpcy5zZXRDb29raWUobmFtZSwgJycsIC0xLCAnLycpO1xuICB9XG5cbiAgcHVibGljIHNldENvb2tpZSA9IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyZURheXM6IG51bWJlciwgcGF0aDogc3RyaW5nID0gJycpOiB2b2lkID0+IHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3QgZDogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyBleHBpcmVEYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICBjb25zdCBleHBpcmVzOiBzdHJpbmcgPSAnZXhwaXJlcz0nICsgZC50b1VUQ1N0cmluZygpO1xuICAgICAgY29uc3QgaG9zdCA9ICcuJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0LnNwbGl0KCcuJykuc3BsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyB2YWx1ZSArICc7ICcgKyBleHBpcmVzICsgKHBhdGgubGVuZ3RoID4gMCA/ICc7IHBhdGg9JyArIHBhdGggOiAnJykgKyAnO2RvbWFpbj0nICsgaG9zdDtcbiAgICB9XG4gIH1cblxufVxuIl19