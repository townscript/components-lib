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
    DataCollectorService.ctorParameters = function () { return [
        { type: UserService },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    DataCollectorService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(1, Inject(PLATFORM_ID))
    ], DataCollectorService);
    return DataCollectorService;
}());
export { DataCollectorService };
export function initializeDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis, dataCollectorService) {
    return function () { return dataCollectorService.initKinesisDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQWlCLE1BQU0sNEJBQTRCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSXBEO0lBQ0UsOEJBQW9CLFdBQXdCLEVBQStCLFVBQWtCO1FBQTdGLGlCQUFvRztRQUFoRixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUErQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBRzdGLDZCQUF3QixHQUFHLFVBQUMsY0FBc0IsRUFBRSxrQkFBMEIsRUFBRSxTQUFpQixFQUFFLG9CQUE0QixFQUFFLGdCQUF5QjtZQUN4SixJQUFJO2dCQUNGLElBQU0sa0JBQWtCLEdBQWtCO29CQUN4QyxXQUFXLEVBQUUsY0FBYztvQkFDM0IsZUFBZSxFQUFFLGtCQUFrQjtvQkFDbkMsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLGdCQUFnQixFQUFFLFVBQVU7b0JBQzVCLFVBQVUsRUFBRSxvQkFBb0I7aUJBQ2pDLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN4QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdkU7UUFDSCxDQUFDLENBQUE7UUFFRCw4QkFBeUIsR0FBRztZQUMxQixJQUFJO2dCQUNGLElBQUksZ0JBQWMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtvQkFDbEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDakMsZ0JBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ25EO3lCQUFNO3dCQUNMLGdCQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUN2QjtvQkFDRCxJQUFJLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDdEMsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBYyxDQUFDLENBQUM7cUJBQzNDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzFFO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsMkJBQXNCLEdBQUcsVUFBQyxVQUFrQixFQUFFLGVBQXVCO1lBQ25FLElBQUk7Z0JBQ0YsSUFBSSxnQkFBYyxDQUFDO2dCQUNuQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO29CQUNsQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxnQkFBYyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUNuQzt5QkFBTTt3QkFDTCxnQkFBYyxHQUFHLElBQUksQ0FBQztxQkFDdkI7b0JBRUQsSUFBSSxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQ3RDLFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxnQkFBYyxDQUFDLENBQUM7cUJBQzFFO2dCQUVILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQyxDQUFBO0lBekRrRyxDQUFDOztnQkFBbkUsV0FBVztnQkFBMkMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7O0lBRHRELG9CQUFvQjtRQURoQyxVQUFVLEVBQUU7UUFFb0MsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BRHZELG9CQUFvQixDQTJEaEM7SUFBRCwyQkFBQztDQUFBLEFBM0RELElBMkRDO1NBM0RZLG9CQUFvQjtBQTZEakMsTUFBTSxVQUFVLHVCQUF1QixDQUFDLGNBQXNCLEVBQUUsa0JBQTBCLEVBQUUsU0FBaUIsRUFBRSxvQkFBNEIsRUFBRSxnQkFBeUIsRUFBRSxvQkFBMEM7SUFDaE4sT0FBTyxjQUFNLE9BQUEsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFwSSxDQUFvSSxDQUFDO0FBQ3BKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhUHJvZHVjZXIsIENvbmZpZ3VyYXRpb24gfSBmcm9tICdAdG93bnNjcmlwdC9kYXRhLWNvbGxlY3Rvcic7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFDb2xsZWN0b3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LCApIHsgfVxuICB1c2VyOiBhbnk7XG5cbiAgaW5pdEtpbmVzaXNEYXRhQ29sbGVjdG9yID0gKGF3c0FjY2Vzc0tleUlkOiBzdHJpbmcsIGF3c1NlY3JldEFjY2Vzc0tleTogc3RyaW5nLCBhd3NSZWdpb246IHN0cmluZywgYXdzS2luZXNpc1N0cmVhbU5hbWU6IHN0cmluZywgcmVjb3JkRm9yS2luZXNpczogYm9vbGVhbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhUGlwZWxpbmVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgIGFjY2Vzc0tleUlkOiBhd3NBY2Nlc3NLZXlJZCxcbiAgICAgICAgc2VjcmV0QWNjZXNzS2V5OiBhd3NTZWNyZXRBY2Nlc3NLZXksXG4gICAgICAgIHJlZ2lvbjogYXdzUmVnaW9uLFxuICAgICAgICB1bmlxdWVJZGVudGlmaWVyOiAnU1RSRUFNLTEnLFxuICAgICAgICBzdHJlYW1OYW1lOiBhd3NLaW5lc2lzU3RyZWFtTmFtZVxuICAgICAgfTtcbiAgICAgIERhdGFQcm9kdWNlci5pbml0aWFsaXplKGRhdGFQaXBlbGluZUNvbmZpZywgIXJlY29yZEZvcktpbmVzaXMpO1xuICAgICAgY29uc29sZS5sb2coJ2luaXRpYWxpc2VkIGtpbmVzaXMgbm93Jyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3dlIGFyZSBnZXR0aW5nIGV4Y2VwdGlvbnMgaW4gaW5pdGlhbGl6aW5nIGtpbmVzaXMgJyArIGUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRQYWdlVmlld0RhdGFUb0tpbmVzaXMgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBsb2dnZWRJblVzZXJJZDtcbiAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxQYWdlVmlldyhsb2dnZWRJblVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSB3YXMgZXhjZXB0aW9uIGluIHNlbmRpbmcgZGF0YSBmcm9tIGJvb2tpbmcgZmxvdycgKyBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kQ2xpY2tEYXRhVG9LaW5lc2lzID0gKGV2ZW50TGFiZWw6IHN0cmluZywgY2xpY2tlZExvY2F0aW9uOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlcklkO1xuICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSB0aGlzLnVzZXIudXNlcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxDbGlja0V2ZW50KGV2ZW50TGFiZWwsIGNsaWNrZWRMb2NhdGlvbiwgbG9nZ2VkSW5Vc2VySWQpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdleGNlcHRpb24gd2hpbGUgc2VuZGluZyB0aGUgY2xpY2sgc3RyZWFtIGRhdGEgZnJvbSBtYXJrZXRwbGFjZScgKyBlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVEYXRhQ29sbGVjdG9yKGF3c0FjY2Vzc0tleUlkOiBzdHJpbmcsIGF3c1NlY3JldEFjY2Vzc0tleTogc3RyaW5nLCBhd3NSZWdpb246IHN0cmluZywgYXdzS2luZXNpc1N0cmVhbU5hbWU6IHN0cmluZywgcmVjb3JkRm9yS2luZXNpczogYm9vbGVhbiwgZGF0YUNvbGxlY3RvclNlcnZpY2U6IERhdGFDb2xsZWN0b3JTZXJ2aWNlKSB7XG4gIHJldHVybiAoKSA9PiBkYXRhQ29sbGVjdG9yU2VydmljZS5pbml0S2luZXNpc0RhdGFDb2xsZWN0b3IoYXdzQWNjZXNzS2V5SWQsIGF3c1NlY3JldEFjY2Vzc0tleSwgYXdzUmVnaW9uLCBhd3NLaW5lc2lzU3RyZWFtTmFtZSwgcmVjb3JkRm9yS2luZXNpcyk7XG59Il19