import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user-service';
import { config } from '../../core/app-config';
var FollowService = /** @class */ (function () {
    function FollowService(http, userService) {
        var _this = this;
        this.http = http;
        this.userService = userService;
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
        });
    }
    FollowService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, UserService])
    ], FollowService);
    return FollowService;
}());
export { FollowService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sbG93LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvc2VydmljZXMvZm9sbG93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUcvQztJQVVJLHVCQUFvQixJQUFnQixFQUFVLFdBQXdCO1FBQXRFLGlCQU9DO1FBUG1CLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVJ0RSxZQUFPLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxpQkFBWSxHQUFXLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzdDLGdCQUFXLEdBQVcsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFHekMsZ0JBQVcsR0FBNEIsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDakYsZUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFVN0MscUJBQWdCLEdBQUcsVUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU07WUFDcEMsSUFBTSxJQUFJLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQztZQUNGLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUE7UUFDRCxrQkFBYSxHQUFHLFVBQUMsRUFBRTtZQUNmLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUcscUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRztnQkFDdEUsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBQ0QsYUFBUSxHQUFHLFVBQUMsWUFBWTtZQUNwQixPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLEdBQUcsc0JBQXNCLEdBQUcsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQTtRQUNELHFCQUFnQixHQUFHLFVBQUMsSUFBSTtZQUNwQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUF6QkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNoQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQy9CLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWpCUSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtpREFXaUIsVUFBVSxFQUF1QixXQUFXO09BVjdELGFBQWEsQ0FzQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQXRDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi4vLi4vY29yZS9hcHAtY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZvbGxvd1NlcnZpY2Uge1xuXG4gICAgYmFzZVVybDogU3RyaW5nID0gY29uZmlnLmJhc2VVcmw7XG4gICAgYXBpU2VydmVyVXJsOiBTdHJpbmcgPSB0aGlzLmJhc2VVcmwgKyAnYXBpLyc7XG4gICAgbGlzdGluZ3NVcmw6IFN0cmluZyA9IHRoaXMuYmFzZVVybCArICdsaXN0aW5ncy8nO1xuXG4gICAgdXNlcjogYW55O1xuICAgIHByaXZhdGUgZm9sbG93RGF0YSQ6IEJlaGF2aW9yU3ViamVjdDxPYmplY3Q+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxPYmplY3Q+KG51bGwpO1xuICAgIGZvbGxvd0RhdGEgPSB0aGlzLmZvbGxvd0RhdGEkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Rm9sbG93RGF0YSh0aGlzLnVzZXIudXNlcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZUZvbGxvd0RhdGEgPSAodHlwZSwgdHlwZUlkLCB1c2VySWQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICB0eXBlSWQ6IHR5cGVJZCxcbiAgICAgICAgICAgIHVzZXJJZDogdXNlcklkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmxpc3RpbmdzVXJsICsgJ2ZvbGxvd0RhdGEvZm9sbG93JywgZGF0YSk7XG4gICAgfVxuICAgIGdldEZvbGxvd0RhdGEgPSAoaWQpID0+IHtcbiAgICAgICAgdGhpcy5odHRwLmdldCh0aGlzLmxpc3RpbmdzVXJsICsgJ2ZvbGxvd0RhdGEvP3VzZXJJZD0nICsgaWQpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb2xsb3dEYXRhKHJlc1snZGF0YSddKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVuZm9sbG93ID0gKGZvbGxvd0RhdGFJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5saXN0aW5nc1VybCArICdmb2xsb3dEYXRhL3VuZm9sbG93LycgKyBmb2xsb3dEYXRhSWQsIHt9KTtcbiAgICB9XG4gICAgdXBkYXRlRm9sbG93RGF0YSA9IChkYXRhKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuZm9sbG93RGF0YSQubmV4dChkYXRhKTtcbiAgICB9XG5cbn1cbiJdfQ==