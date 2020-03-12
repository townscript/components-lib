import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DataProducer } from '@townscript/data-collector';
import { UserService } from '../user-service';
var DataCollectorService = /** @class */ (function () {
    function DataCollectorService(userService) {
        var _this = this;
        this.userService = userService;
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
                    DataProducer.callPageView(loggedInUserId_1);
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
                    DataProducer.callClickEvent(eventLabel, clickedLocation, loggedInUserId_2);
                });
            }
            catch (e) {
                console.log('exception while sending the click stream data from marketplace' + e);
            }
        };
    }
    DataCollectorService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], DataCollectorService);
    return DataCollectorService;
}());
export { DataCollectorService };
export function initializeDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis, dataCollectorService) {
    return function () { return dataCollectorService.initKinesisDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFpQixNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUk5QztJQUNFLDhCQUFvQixXQUF3QjtRQUE1QyxpQkFBaUQ7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFHNUMsNkJBQXdCLEdBQUcsVUFBQyxjQUFzQixFQUFFLGtCQUEwQixFQUFFLFNBQWlCLEVBQUUsb0JBQTRCLEVBQUUsZ0JBQXlCO1lBQ3hKLElBQUk7Z0JBQ0YsSUFBTSxrQkFBa0IsR0FBa0I7b0JBQ3hDLFdBQVcsRUFBRSxjQUFjO29CQUMzQixlQUFlLEVBQUUsa0JBQWtCO29CQUNuQyxNQUFNLEVBQUUsU0FBUztvQkFDakIsZ0JBQWdCLEVBQUUsVUFBVTtvQkFDNUIsVUFBVSxFQUFFLG9CQUFvQjtpQkFDakMsQ0FBQztnQkFDRixZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RTtRQUNILENBQUMsQ0FBQTtRQUVELDhCQUF5QixHQUFHO1lBQzFCLElBQUk7Z0JBQ0YsSUFBSSxnQkFBYyxDQUFDO2dCQUNuQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO29CQUNsQyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxnQkFBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDbkQ7eUJBQU07d0JBQ0wsZ0JBQWMsR0FBRyxJQUFJLENBQUM7cUJBQ3ZCO29CQUNELFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQWMsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMxRTtRQUNILENBQUMsQ0FBQTtRQUVELDJCQUFzQixHQUFHLFVBQUMsVUFBa0IsRUFBRSxlQUF1QjtZQUNuRSxJQUFJO2dCQUNGLElBQUksZ0JBQWMsQ0FBQztnQkFDbkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtvQkFDbEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDakMsZ0JBQWMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztxQkFDbkM7eUJBQU07d0JBQ0wsZ0JBQWMsR0FBRyxJQUFJLENBQUM7cUJBQ3ZCO29CQUNELFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxnQkFBYyxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQyxDQUFBO0lBbkQrQyxDQUFDO0lBRHRDLG9CQUFvQjtRQURoQyxVQUFVLEVBQUU7aURBRXNCLFdBQVc7T0FEakMsb0JBQW9CLENBcURoQztJQUFELDJCQUFDO0NBQUEsQUFyREQsSUFxREM7U0FyRFksb0JBQW9CO0FBdURqQyxNQUFNLFVBQVUsdUJBQXVCLENBQUMsY0FBc0IsRUFBRSxrQkFBMEIsRUFBRSxTQUFpQixFQUFFLG9CQUE0QixFQUFFLGdCQUF5QixFQUFFLG9CQUEwQztJQUNoTixPQUFPLGNBQU0sT0FBQSxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLEVBQXBJLENBQW9JLENBQUM7QUFDcEosQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFQcm9kdWNlciwgQ29uZmlndXJhdGlvbiB9IGZyb20gJ0B0b3duc2NyaXB0L2RhdGEtY29sbGVjdG9yJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci1zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YUNvbGxlY3RvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkgeyB9XG4gIHVzZXI6IGFueTtcblxuICBpbml0S2luZXNpc0RhdGFDb2xsZWN0b3IgPSAoYXdzQWNjZXNzS2V5SWQ6IHN0cmluZywgYXdzU2VjcmV0QWNjZXNzS2V5OiBzdHJpbmcsIGF3c1JlZ2lvbjogc3RyaW5nLCBhd3NLaW5lc2lzU3RyZWFtTmFtZTogc3RyaW5nLCByZWNvcmRGb3JLaW5lc2lzOiBib29sZWFuKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGFQaXBlbGluZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgYWNjZXNzS2V5SWQ6IGF3c0FjY2Vzc0tleUlkLFxuICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IGF3c1NlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgcmVnaW9uOiBhd3NSZWdpb24sXG4gICAgICAgIHVuaXF1ZUlkZW50aWZpZXI6ICdTVFJFQU0tMScsXG4gICAgICAgIHN0cmVhbU5hbWU6IGF3c0tpbmVzaXNTdHJlYW1OYW1lXG4gICAgICB9O1xuICAgICAgRGF0YVByb2R1Y2VyLmluaXRpYWxpemUoZGF0YVBpcGVsaW5lQ29uZmlnLCAhcmVjb3JkRm9yS2luZXNpcyk7XG4gICAgICBjb25zb2xlLmxvZygnaW5pdGlhbGlzZWQga2luZXNpcyBub3cnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2UgYXJlIGdldHRpbmcgZXhjZXB0aW9ucyBpbiBpbml0aWFsaXppbmcga2luZXNpcyAnICsgZSk7XG4gICAgfVxuICB9XG5cbiAgc2VuZFBhZ2VWaWV3RGF0YVRvS2luZXNpcyA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlcklkO1xuICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXIudXNlcklkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxQYWdlVmlldyhsb2dnZWRJblVzZXJJZCk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhlcmUgd2FzIGV4Y2VwdGlvbiBpbiBzZW5kaW5nIGRhdGEgZnJvbSBib29raW5nIGZsb3cnICsgZSk7XG4gICAgfVxuICB9XG5cbiAgc2VuZENsaWNrRGF0YVRvS2luZXNpcyA9IChldmVudExhYmVsOiBzdHJpbmcsIGNsaWNrZWRMb2NhdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBsb2dnZWRJblVzZXJJZDtcbiAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gdGhpcy51c2VyLnVzZXJJZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxDbGlja0V2ZW50KGV2ZW50TGFiZWwsIGNsaWNrZWRMb2NhdGlvbiwgbG9nZ2VkSW5Vc2VySWQpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ2V4Y2VwdGlvbiB3aGlsZSBzZW5kaW5nIHRoZSBjbGljayBzdHJlYW0gZGF0YSBmcm9tIG1hcmtldHBsYWNlJyArIGUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGFDb2xsZWN0b3IoYXdzQWNjZXNzS2V5SWQ6IHN0cmluZywgYXdzU2VjcmV0QWNjZXNzS2V5OiBzdHJpbmcsIGF3c1JlZ2lvbjogc3RyaW5nLCBhd3NLaW5lc2lzU3RyZWFtTmFtZTogc3RyaW5nLCByZWNvcmRGb3JLaW5lc2lzOiBib29sZWFuLCBkYXRhQ29sbGVjdG9yU2VydmljZTogRGF0YUNvbGxlY3RvclNlcnZpY2UpIHtcbiAgcmV0dXJuICgpID0+IGRhdGFDb2xsZWN0b3JTZXJ2aWNlLmluaXRLaW5lc2lzRGF0YUNvbGxlY3Rvcihhd3NBY2Nlc3NLZXlJZCwgYXdzU2VjcmV0QWNjZXNzS2V5LCBhd3NSZWdpb24sIGF3c0tpbmVzaXNTdHJlYW1OYW1lLCByZWNvcmRGb3JLaW5lc2lzKTtcbn0iXX0=