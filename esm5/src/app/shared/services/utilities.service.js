import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { config } from './../../core/app-config';
var UtilityService = /** @class */ (function () {
    function UtilityService() {
        var _this = this;
        this.FB_APP_ID = config.FB_APP_ID;
        this.IsJsonString = function (str) {
            try {
                JSON.parse(str);
            }
            catch (e) {
                return false;
            }
            return true;
        };
        this.addFBSDK = function () {
            var that = _this;
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js#version=v2.9&appId=" + that.FB_APP_ID + "&status=true&cookie=true&xfbml=true";
                if (fjs && fjs.parentNode) {
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, 'script', 'facebook-jssdk'));
        };
    }
    UtilityService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], UtilityService);
    return UtilityService;
}());
export { UtilityService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR2pEO0lBSUk7UUFBQSxpQkFDQztRQUhELGNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBSzdCLGlCQUFZLEdBQUcsVUFBQyxHQUFHO1lBQ2YsSUFBSTtnQkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFRCxhQUFRLEdBQUc7WUFDUCxJQUFJLElBQUksR0FBRyxLQUFJLENBQUM7WUFDaEIsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDZixJQUFJLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQUUsT0FBTztpQkFBRTtnQkFDckMsRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsK0RBQStELEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQ0FBcUMsQ0FBQztnQkFDbEksSUFBRyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBQztvQkFDdkIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7SUF0QkQsQ0FBQztJQUxRLGNBQWM7UUFEMUIsVUFBVSxFQUFFOztPQUNBLGNBQWMsQ0E0QjFCO0lBQUQscUJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTVCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi8uLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXRpbGl0eVNlcnZpY2Uge1xuXG4gICAgRkJfQVBQX0lEID0gY29uZmlnLkZCX0FQUF9JRDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIElzSnNvblN0cmluZyA9IChzdHIpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIEpTT04ucGFyc2Uoc3RyKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGFkZEZCU0RLID0gKCkgPT4ge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIChmdW5jdGlvbiAoZCwgcywgaWQpIHtcbiAgICAgICAgICAgIHZhciBqcywgZmpzID0gZC5nZXRFbGVtZW50c0J5VGFnTmFtZShzKVswXTtcbiAgICAgICAgICAgIGlmIChkLmdldEVsZW1lbnRCeUlkKGlkKSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGpzID0gZC5jcmVhdGVFbGVtZW50KHMpOyBqcy5pZCA9IGlkO1xuICAgICAgICAgICAganMuc3JjID0gXCJodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL3Nkay5qcyN2ZXJzaW9uPXYyLjkmYXBwSWQ9XCIgKyB0aGF0LkZCX0FQUF9JRCArIFwiJnN0YXR1cz10cnVlJmNvb2tpZT10cnVlJnhmYm1sPXRydWVcIjtcbiAgICAgICAgICAgIGlmKGZqcyAmJiBmanMucGFyZW50Tm9kZSl7XG4gICAgICAgICAgICAgIGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfShkb2N1bWVudCwgJ3NjcmlwdCcsICdmYWNlYm9vay1qc3NkaycpKTtcbiAgICB9XG59XG4iXX0=