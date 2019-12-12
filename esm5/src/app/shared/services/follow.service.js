import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user-service';
import { config } from '../../core/app-config';
import { Router, NavigationEnd } from '@angular/router';
var FollowService = /** @class */ (function () {
    function FollowService(http, userService, router) {
        var _this = this;
        this.http = http;
        this.userService = userService;
        this.router = router;
        this.baseUrl = config.baseUrl;
        this.apiServerUrl = this.baseUrl + 'api/';
        this.listingsUrl = this.baseUrl + 'listings/';
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
            _this.router.events.subscribe(function (ev) {
                if (ev instanceof NavigationEnd) {
                    if (_this.user && _this.user.userId) {
                        _this.getFollowData(_this.user.userId);
                    }
                }
            });
        });
    }
    FollowService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, UserService,
            Router])
    ], FollowService);
    return FollowService;
}());
export { FollowService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvZm9sbG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3hEO0lBVUksdUJBQW9CLElBQWdCLEVBQVUsV0FBd0IsRUFDOUQsTUFBYztRQUR0QixpQkFnQkM7UUFoQm1CLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUM5RCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVHRCLFlBQU8sR0FBVyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLGlCQUFZLEdBQVcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDN0MsZ0JBQVcsR0FBVyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUd6QyxnQkFBVyxHQUE0QixJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUNqRixlQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQW1CN0MscUJBQWdCLEdBQUcsVUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDcEMsSUFBTSxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQztZQUNGLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUE7UUFDRCxrQkFBYSxHQUFHLFVBQUMsRUFBRTtZQUNmLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDdEUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBQ0QsYUFBUSxHQUFHLFVBQUMsWUFBWTtZQUNwQixPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLEdBQUcsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQTtRQUNELHFCQUFnQixHQUFHLFVBQUMsSUFBSTtZQUNwQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUFqQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNoQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4QztZQUVELEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQUU7Z0JBQzlCLElBQUksRUFBRSxZQUFZLGFBQWEsRUFBRTtvQkFDL0IsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUMvQixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3hDO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUExQlEsYUFBYTtRQUR6QixVQUFVLEVBQUU7aURBV2lCLFVBQVUsRUFBdUIsV0FBVztZQUN0RCxNQUFNO09BWGIsYUFBYSxDQStDekI7SUFBRCxvQkFBQztDQUFBLEFBL0NELElBK0NDO1NBL0NZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi9jb3JlL2FwcC1jb25maWcnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvbGxvd1NlcnZpY2Uge1xuXG4gICAgYmFzZVVybDogU3RyaW5nID0gY29uZmlnLmJhc2VVcmw7XG4gICAgYXBpU2VydmVyVXJsOiBTdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnYXBpLyc7XG4gICAgbGlzdGluZ3NVcmw6IFN0cmluZyA9IHRoaXMuYmFzZVVybCArICdsaXN0aW5ncy8nO1xuXG4gICAgdXNlcjogYW55O1xuICAgIHByaXZhdGUgZm9sbG93RGF0YSQ6IEJlaGF2aW9yU3ViamVjdDxPYmplY3Q+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPYmplY3Q+KG51bGwpO1xuICAgIGZvbGxvd0RhdGEgPSB0aGlzLmZvbGxvd0RhdGEkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRGb2xsb3dEYXRhKHRoaXMudXNlci51c2VySWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldikgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXYgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rm9sbG93RGF0YSh0aGlzLnVzZXIudXNlcklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY3JlYXRlRm9sbG93RGF0YSA9ICh0eXBlLCB0eXBlSWQsIHVzZXJJZCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIHR5cGVJZDogdHlwZUlkLFxuICAgICAgICAgICAgdXNlcklkOiB1c2VySWRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMubGlzdGluZ3NVcmwgKyAnZm9sbG93RGF0YS9mb2xsb3cnLCBkYXRhKTtcbiAgICB9XG4gICAgZ2V0Rm9sbG93RGF0YSA9IChpZCkgPT4ge1xuICAgICAgICB0aGlzLmh0dHAuZ2V0KHRoaXMubGlzdGluZ3NVcmwgKyAnZm9sbG93RGF0YS8/dXNlcklkPScgKyBpZCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZvbGxvd0RhdGEocmVzWydkYXRhJ10pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdW5mb2xsb3cgPSAoZm9sbG93RGF0YUlkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmxpc3RpbmdzVXJsICsgJ2ZvbGxvd0RhdGEvdW5mb2xsb3cvJyArIGZvbGxvd0RhdGFJZCwge30pO1xuICAgIH1cbiAgICB1cGRhdGVGb2xsb3dEYXRhID0gKGRhdGEpOiB2b2lkID0+IHtcbiAgICAgICAgdGhpcy5mb2xsb3dEYXRhJC5uZXh0KGRhdGEpO1xuICAgIH1cblxufVxuIl19