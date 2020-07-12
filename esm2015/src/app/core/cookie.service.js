import * as tslib_1 from "tslib";
import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
let CookieService = class CookieService {
    constructor(platformId) {
        this.platformId = platformId;
        this.deleteCookie = (name) => {
            this.setCookie(name, '', -1, '/');
        };
        this.setCookie = (name, value, expireDays, path = '') => {
            if (isPlatformBrowser(this.platformId)) {
                const d = new Date();
                d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
                const expires = 'expires=' + d.toUTCString();
                const host = '.' + window.location.host.split('.').splice(1).join('.');
                document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '') + ';domain=' + host;
                console.log('updated cookie after location setting is ' + document.cookie);
            }
        };
    }
    getCookie(name) {
        if (isPlatformBrowser(this.platformId)) {
            const ca = document.cookie.split(';');
            const caLen = ca.length;
            const cookieName = `${name}=`;
            let c;
            for (let i = 0; i < caLen; i += 1) {
                c = ca[i].replace(/^\s+/g, '');
                if (c.indexOf(cookieName) === 0) {
                    return c.substring(cookieName.length, c.length);
                }
            }
        }
        return null;
    }
};
CookieService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [InjectionToken])
], CookieService);
export { CookieService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9jb3JlL2Nvb2tpZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3BELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFFeEIsWUFBeUMsVUFBa0M7UUFBbEMsZUFBVSxHQUFWLFVBQVUsQ0FBd0I7UUFtQnBFLGlCQUFZLEdBQUcsQ0FBQyxJQUFZLEVBQVEsRUFBRTtZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFBO1FBRU0sY0FBUyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxVQUFrQixFQUFFLE9BQWUsRUFBRSxFQUFRLEVBQUU7WUFDOUYsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3RDLE1BQU0sQ0FBQyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxPQUFPLEdBQVcsVUFBVSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDckQsTUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2RSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdEgsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUU7UUFDSCxDQUFDLENBQUE7SUFoQ2dGLENBQUM7SUFFM0UsU0FBUyxDQUFDLElBQVk7UUFDM0IsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsTUFBTSxFQUFFLEdBQWtCLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sS0FBSyxHQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDaEMsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUM5QixJQUFJLENBQVMsQ0FBQztZQUVkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUMvQixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2pEO2FBQ0Y7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQWlCRixDQUFBO0FBcENZLGFBQWE7SUFEekIsVUFBVSxFQUFFO0lBR0UsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBOzZDQUFxQixjQUFjO0dBRnhELGFBQWEsQ0FvQ3pCO1NBcENZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lELCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29va2llU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBJbmplY3Rpb25Ub2tlbjxPYmplY3Q+LCApIHsgfVxuXG4gIHB1YmxpYyBnZXRDb29raWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IGNhOiBBcnJheTxzdHJpbmc+ID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG4gICAgICBjb25zdCBjYUxlbjogbnVtYmVyID0gY2EubGVuZ3RoO1xuICAgICAgY29uc3QgY29va2llTmFtZSA9IGAke25hbWV9PWA7XG4gICAgICBsZXQgYzogc3RyaW5nO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhTGVuOyBpICs9IDEpIHtcbiAgICAgICAgYyA9IGNhW2ldLnJlcGxhY2UoL15cXHMrL2csICcnKTtcbiAgICAgICAgaWYgKGMuaW5kZXhPZihjb29raWVOYW1lKSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhjb29raWVOYW1lLmxlbmd0aCwgYy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZUNvb2tpZSA9IChuYW1lOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICB0aGlzLnNldENvb2tpZShuYW1lLCAnJywgLTEsICcvJyk7XG4gIH1cblxuICBwdWJsaWMgc2V0Q29va2llID0gKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhwaXJlRGF5czogbnVtYmVyLCBwYXRoOiBzdHJpbmcgPSAnJyk6IHZvaWQgPT4ge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICBjb25zdCBkOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIGQuc2V0VGltZShkLmdldFRpbWUoKSArIGV4cGlyZURheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgICAgIGNvbnN0IGV4cGlyZXM6IHN0cmluZyA9ICdleHBpcmVzPScgKyBkLnRvVVRDU3RyaW5nKCk7XG4gICAgICBjb25zdCBob3N0ID0gJy4nICsgd2luZG93LmxvY2F0aW9uLmhvc3Quc3BsaXQoJy4nKS5zcGxpY2UoMSkuam9pbignLicpO1xuICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9JyArIHZhbHVlICsgJzsgJyArIGV4cGlyZXMgKyAocGF0aC5sZW5ndGggPiAwID8gJzsgcGF0aD0nICsgcGF0aCA6ICcnKSArICc7ZG9tYWluPScgKyBob3N0O1xuICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgY29va2llIGFmdGVyIGxvY2F0aW9uIHNldHRpbmcgaXMgJyArIGRvY3VtZW50LmNvb2tpZSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==