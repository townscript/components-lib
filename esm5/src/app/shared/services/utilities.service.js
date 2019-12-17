import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
var UtilityService = /** @class */ (function () {
    function UtilityService() {
        var _this = this;
        this.FB_APP_ID = environment.FB_APP_ID;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBR2xFO0lBSUk7UUFBQSxpQkFDQztRQUhELGNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBS2xDLGlCQUFZLEdBQUcsVUFBQyxHQUFHO1lBQ2YsSUFBSTtnQkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFFRCxhQUFRLEdBQUc7WUFDUCxJQUFJLElBQUksR0FBRyxLQUFJLENBQUM7WUFDaEIsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDZixJQUFJLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQUUsT0FBTztpQkFBRTtnQkFDckMsRUFBRSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsK0RBQStELEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQ0FBcUMsQ0FBQztnQkFDbEksSUFBRyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBQztvQkFDdkIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUE7SUF0QkQsQ0FBQztJQUxRLGNBQWM7UUFEMUIsVUFBVSxFQUFFOztPQUNBLGNBQWMsQ0E0QjFCO0lBQUQscUJBQUM7Q0FBQSxBQTVCRCxJQTRCQztTQTVCWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLy4uLy4uLy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVdGlsaXR5U2VydmljZSB7XG5cbiAgICBGQl9BUFBfSUQgPSBlbnZpcm9ubWVudC5GQl9BUFBfSUQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBJc0pzb25TdHJpbmcgPSAoc3RyKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBhZGRGQlNESyA9ICgpID0+IHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAoZnVuY3Rpb24gKGQsIHMsIGlkKSB7XG4gICAgICAgICAgICB2YXIganMsIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07XG4gICAgICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTsganMuaWQgPSBpZDtcbiAgICAgICAgICAgIGpzLnNyYyA9IFwiaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9zZGsuanMjdmVyc2lvbj12Mi45JmFwcElkPVwiICsgdGhhdC5GQl9BUFBfSUQgKyBcIiZzdGF0dXM9dHJ1ZSZjb29raWU9dHJ1ZSZ4ZmJtbD10cnVlXCI7XG4gICAgICAgICAgICBpZihmanMgJiYgZmpzLnBhcmVudE5vZGUpe1xuICAgICAgICAgICAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oZG9jdW1lbnQsICdzY3JpcHQnLCAnZmFjZWJvb2stanNzZGsnKSk7XG4gICAgfVxufVxuIl19