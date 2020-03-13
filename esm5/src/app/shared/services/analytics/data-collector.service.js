import * as tslib_1 from "tslib";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DataProducer } from '@townscript/data-collector';
import { UserService } from '../user-service';
import { isPlatformBrowser } from '@angular/common';
var DataCollectorService = /** @class */ (function () {
    function DataCollectorService(userService, platformId) {
        var _this = this;
        this.userService = userService;
        this.platformId = platformId;
        this.initKinesisDataCollector = function (awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis) {
            try {
                var dataPipelineConfig = {
                    accessKeyId: awsAccessKeyId,
                    secretAccessKey: awsSecretAccessKey,
                    region: awsRegion,
                    uniqueIdentifier: 'STREAM-1',
                    streamName: awsKinesisStreamName
                };
                DataProducer.initialize(dataPipelineConfig, !recordForKinesis);
                console.log('initialised kinesis now');
            }
            catch (e) {
                console.log('we are getting exceptions in initializing kinesis ' + e);
            }
        };
        this.sendPageViewDataToKinesis = function () {
            try {
                var loggedInUserId_1;
                _this.userService.user.subscribe(function (data) {
                    _this.user = data;
                    if (_this.user && _this.user.userId) {
                        loggedInUserId_1 = JSON.stringify(_this.user.userId);
                    }
                    else {
                        loggedInUserId_1 = null;
                    }
                    if (isPlatformBrowser(_this.platformId)) {
                        DataProducer.callPageView(loggedInUserId_1);
                    }
                });
            }
            catch (e) {
                console.log('there was exception in sending data from booking flow' + e);
            }
        };
        this.sendClickDataToKinesis = function (eventLabel, clickedLocation) {
            try {
                var loggedInUserId_2;
                _this.userService.user.subscribe(function (data) {
                    _this.user = data;
                    if (_this.user && _this.user.userId) {
                        loggedInUserId_2 = _this.user.userId;
                    }
                    else {
                        loggedInUserId_2 = null;
                    }
                    if (isPlatformBrowser(_this.platformId)) {
                        DataProducer.callClickEvent(eventLabel, clickedLocation, loggedInUserId_2);
                    }
                });
            }
            catch (e) {
                console.log('exception while sending the click stream data from marketplace' + e);
            }
        };
    }
    DataCollectorService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Inject(PLATFORM_ID)),
        tslib_1.__metadata("design:paramtypes", [UserService, Object])
    ], DataCollectorService);
    return DataCollectorService;
}());
export { DataCollectorService };
export function initializeDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis, dataCollectorService) {
    return function () { return dataCollectorService.initKinesisDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQWlCLE1BQU0sNEJBQTRCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSXBEO0lBQ0UsOEJBQW9CLFdBQXdCLEVBQStCLFVBQWtCO1FBQTdGLGlCQUFvRztRQUFoRixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUErQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBRzdGLDZCQUF3QixHQUFHLFVBQUMsY0FBc0IsRUFBRSxrQkFBMEIsRUFBRSxTQUFpQixFQUFFLG9CQUE0QixFQUFFLGdCQUF5QjtZQUN4SixJQUFJO2dCQUNGLElBQU0sa0JBQWtCLEdBQWtCO29CQUN4QyxXQUFXLEVBQUUsY0FBYztvQkFDM0IsZUFBZSxFQUFFLGtCQUFrQjtvQkFDbkMsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLGdCQUFnQixFQUFFLFVBQVU7b0JBQzVCLFVBQVUsRUFBRSxvQkFBb0I7aUJBQ2pDLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN4QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdkU7UUFDSCxDQUFDLENBQUE7UUFFRCw4QkFBeUIsR0FBRztZQUMxQixJQUFJO2dCQUNGLElBQUksZ0JBQWMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtvQkFDbEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDakMsZ0JBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ25EO3lCQUFNO3dCQUNMLGdCQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUN2QjtvQkFDRCxJQUFJLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDdEMsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBYyxDQUFDLENBQUM7cUJBQzNDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzFFO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsMkJBQXNCLEdBQUcsVUFBQyxVQUFrQixFQUFFLGVBQXVCO1lBQ25FLElBQUk7Z0JBQ0YsSUFBSSxnQkFBYyxDQUFDO2dCQUNuQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO29CQUNsQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxnQkFBYyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUNuQzt5QkFBTTt3QkFDTCxnQkFBYyxHQUFHLElBQUksQ0FBQztxQkFDdkI7b0JBRUQsSUFBSSxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQ3RDLFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxnQkFBYyxDQUFDLENBQUM7cUJBQzFFO2dCQUVILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQyxDQUFBO0lBekRrRyxDQUFDO0lBRHpGLG9CQUFvQjtRQURoQyxVQUFVLEVBQUU7UUFFb0MsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO2lEQUFqQyxXQUFXLEVBQTJDLE1BQU07T0FEbEYsb0JBQW9CLENBMkRoQztJQUFELDJCQUFDO0NBQUEsQUEzREQsSUEyREM7U0EzRFksb0JBQW9CO0FBNkRqQyxNQUFNLFVBQVUsdUJBQXVCLENBQUMsY0FBc0IsRUFBRSxrQkFBMEIsRUFBRSxTQUFpQixFQUFFLG9CQUE0QixFQUFFLGdCQUF5QixFQUFFLG9CQUEwQztJQUNoTixPQUFPLGNBQU0sT0FBQSxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLEVBQXBJLENBQW9JLENBQUM7QUFDcEosQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFQcm9kdWNlciwgQ29uZmlndXJhdGlvbiB9IGZyb20gJ0B0b3duc2NyaXB0L2RhdGEtY29sbGVjdG9yJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YUNvbGxlY3RvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsICkgeyB9XG4gIHVzZXI6IGFueTtcblxuICBpbml0S2luZXNpc0RhdGFDb2xsZWN0b3IgPSAoYXdzQWNjZXNzS2V5SWQ6IHN0cmluZywgYXdzU2VjcmV0QWNjZXNzS2V5OiBzdHJpbmcsIGF3c1JlZ2lvbjogc3RyaW5nLCBhd3NLaW5lc2lzU3RyZWFtTmFtZTogc3RyaW5nLCByZWNvcmRGb3JLaW5lc2lzOiBib29sZWFuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGFQaXBlbGluZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgYWNjZXNzS2V5SWQ6IGF3c0FjY2Vzc0tleUlkLFxuICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IGF3c1NlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgcmVnaW9uOiBhd3NSZWdpb24sXG4gICAgICAgIHVuaXF1ZUlkZW50aWZpZXI6ICdTVFJFQU0tMScsXG4gICAgICAgIHN0cmVhbU5hbWU6IGF3c0tpbmVzaXNTdHJlYW1OYW1lXG4gICAgICB9O1xuICAgICAgRGF0YVByb2R1Y2VyLmluaXRpYWxpemUoZGF0YVBpcGVsaW5lQ29uZmlnLCAhcmVjb3JkRm9yS2luZXNpcyk7XG4gICAgICBjb25zb2xlLmxvZygnaW5pdGlhbGlzZWQga2luZXNpcyBub3cnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2UgYXJlIGdldHRpbmcgZXhjZXB0aW9ucyBpbiBpbml0aWFsaXppbmcga2luZXNpcyAnICsgZSk7XG4gICAgfVxuICB9XG5cbiAgc2VuZFBhZ2VWaWV3RGF0YVRvS2luZXNpcyA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlcklkO1xuICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXIudXNlcklkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICBEYXRhUHJvZHVjZXIuY2FsbFBhZ2VWaWV3KGxvZ2dlZEluVXNlcklkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3RoZXJlIHdhcyBleGNlcHRpb24gaW4gc2VuZGluZyBkYXRhIGZyb20gYm9va2luZyBmbG93JyArIGUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRDbGlja0RhdGFUb0tpbmVzaXMgPSAoZXZlbnRMYWJlbDogc3RyaW5nLCBjbGlja2VkTG9jYXRpb246IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbG9nZ2VkSW5Vc2VySWQ7XG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IHRoaXMudXNlci51c2VySWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICBEYXRhUHJvZHVjZXIuY2FsbENsaWNrRXZlbnQoZXZlbnRMYWJlbCwgY2xpY2tlZExvY2F0aW9uLCBsb2dnZWRJblVzZXJJZCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ2V4Y2VwdGlvbiB3aGlsZSBzZW5kaW5nIHRoZSBjbGljayBzdHJlYW0gZGF0YSBmcm9tIG1hcmtldHBsYWNlJyArIGUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGFDb2xsZWN0b3IoYXdzQWNjZXNzS2V5SWQ6IHN0cmluZywgYXdzU2VjcmV0QWNjZXNzS2V5OiBzdHJpbmcsIGF3c1JlZ2lvbjogc3RyaW5nLCBhd3NLaW5lc2lzU3RyZWFtTmFtZTogc3RyaW5nLCByZWNvcmRGb3JLaW5lc2lzOiBib29sZWFuLCBkYXRhQ29sbGVjdG9yU2VydmljZTogRGF0YUNvbGxlY3RvclNlcnZpY2UpIHtcbiAgcmV0dXJuICgpID0+IGRhdGFDb2xsZWN0b3JTZXJ2aWNlLmluaXRLaW5lc2lzRGF0YUNvbGxlY3Rvcihhd3NBY2Nlc3NLZXlJZCwgYXdzU2VjcmV0QWNjZXNzS2V5LCBhd3NSZWdpb24sIGF3c0tpbmVzaXNTdHJlYW1OYW1lLCByZWNvcmRGb3JLaW5lc2lzKTtcbn0iXX0=