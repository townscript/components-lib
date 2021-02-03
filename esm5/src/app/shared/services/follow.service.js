import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user-service';
import { config } from '../../core/app-config';
import { NavigationEnd } from '@angular/router';
var FollowService = /** @class */ (function () {
    function FollowService(http, userService) {
        var _this = this;
        this.http = http;
        this.userService = userService;
        this.baseUrl = config.baseUrl;
        this.apiServerUrl = this.baseUrl + 'api/';
        this.listingsUrl = this.baseUrl + 'listings/';
        this.router = config.router;
        this.followData$ = new BehaviorSubject(null);
        this.followData = this.followData$.asObservable();
        this.createFollowData = function (type, typeId, userId) {
            var data = {
                type: type,
                typeId: typeId,
                userId: userId
            };
            return _this.http.post(_this.listingsUrl + 'followData/follow', data);
        };
        this.getFollowData = function (id) {
            _this.http.get(_this.listingsUrl + 'followData/?userId=' + id).subscribe(function (res) {
                _this.updateFollowData(res['data']);
            });
        };
        this.unfollow = function (followDataId) {
            return _this.http.post(_this.listingsUrl + 'followData/unfollow/' + followDataId, {});
        };
        this.updateFollowData = function (data) {
            _this.followData$.next(data);
        };
        this.userService.user.subscribe(function (data) {
            _this.user = data;
            if (_this.user && _this.user.userId) {
                _this.getFollowData(_this.user.userId);
            }
            if (_this.router && _this.router.events) {
                _this.router.events.subscribe(function (ev) {
                    if (ev instanceof NavigationEnd) {
                        if (_this.user && _this.user.userId) {
                            _this.getFollowData(_this.user.userId);
                        }
                    }
                });
            }
        });
    }
    FollowService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: UserService }
    ]; };
    FollowService = __decorate([
        Injectable()
    ], FollowService);
    return FollowService;
}());
export { FollowService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvZm9sbG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQVUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHeEQ7SUFVSSx1QkFBb0IsSUFBZ0IsRUFBVSxXQUF3QjtRQUF0RSxpQkFpQkM7UUFqQm1CLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVJ0RSxZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxpQkFBWSxHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzdDLGdCQUFXLEdBQVcsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDakQsV0FBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFZixnQkFBVyxHQUFtQyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDL0YsZUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFvQjdDLHFCQUFnQixHQUFHLFVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNO1lBQ3BDLElBQU0sSUFBSSxHQUFHO2dCQUNULElBQUksRUFBRSxJQUFJO2dCQUNWLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUM7WUFDRixPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUFBO1FBQ0Qsa0JBQWEsR0FBRyxVQUFDLEVBQUU7WUFDZixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7Z0JBQ3RFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUNELGFBQVEsR0FBRyxVQUFDLFlBQVk7WUFDcEIsT0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsV0FBVyxHQUFHLHNCQUFzQixHQUFHLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RixDQUFDLENBQUE7UUFDRCxxQkFBZ0IsR0FBRyxVQUFDLElBQUk7WUFDcEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFBO1FBbkNHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDaEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUMvQixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEM7WUFFRCxJQUFJLEtBQUksQ0FBQyxNQUFNLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ25DLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQUU7b0JBQzVCLElBQUksRUFBRSxZQUFZLGFBQWEsRUFBRTt3QkFDN0IsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUMvQixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3hDO3FCQUNKO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQWpCeUIsVUFBVTtnQkFBdUIsV0FBVzs7SUFWN0QsYUFBYTtRQUR6QixVQUFVLEVBQUU7T0FDQSxhQUFhLENBZ0R6QjtJQUFELG9CQUFDO0NBQUEsQUFoREQsSUFnREM7U0FoRFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uL2NvcmUvYXBwLWNvbmZpZyc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9sbG93U2VydmljZSB7XG5cbiAgICBiYXNlVXJsOiBTdHJpbmcgPSBjb25maWcuYmFzZVVybDtcbiAgICBhcGlTZXJ2ZXJVcmw6IFN0cmluZyA9IHRoaXMuYmFzZVVybCArICdhcGkvJztcbiAgICBsaXN0aW5nc1VybDogU3RyaW5nID0gdGhpcy5iYXNlVXJsICsgJ2xpc3RpbmdzLyc7XG4gICAgcm91dGVyID0gY29uZmlnLnJvdXRlcjtcbiAgICB1c2VyOiBhbnk7XG4gICAgcHJpdmF0ZSBmb2xsb3dEYXRhJDogQmVoYXZpb3JTdWJqZWN0PE9iamVjdCB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPYmplY3QgfCBudWxsPihudWxsKTtcbiAgICBmb2xsb3dEYXRhID0gdGhpcy5mb2xsb3dEYXRhJC5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEZvbGxvd0RhdGEodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlciAmJiB0aGlzLnJvdXRlci5ldmVudHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEZvbGxvd0RhdGEodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZUZvbGxvd0RhdGEgPSAodHlwZSwgdHlwZUlkLCB1c2VySWQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICB0eXBlSWQ6IHR5cGVJZCxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcklkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmxpc3RpbmdzVXJsICsgJ2ZvbGxvd0RhdGEvZm9sbG93JywgZGF0YSk7XG4gICAgfVxuICAgIGdldEZvbGxvd0RhdGEgPSAoaWQpID0+IHtcbiAgICAgICAgdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzVXJsICsgJ2ZvbGxvd0RhdGEvP3VzZXJJZD0nICsgaWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb2xsb3dEYXRhKHJlc1snZGF0YSddKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVuZm9sbG93ID0gKGZvbGxvd0RhdGFJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5saXN0aW5nc1VybCArICdmb2xsb3dEYXRhL3VuZm9sbG93LycgKyBmb2xsb3dEYXRhSWQsIHt9KTtcbiAgICB9XG4gICAgdXBkYXRlRm9sbG93RGF0YSA9IChkYXRhKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuZm9sbG93RGF0YSQubmV4dChkYXRhKTtcbiAgICB9XG5cbn1cbiJdfQ==