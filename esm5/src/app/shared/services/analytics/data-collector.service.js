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
                var loggedInUserId_1 = null;
                _this.userService.user.subscribe(function (data) {
                    _this.user = data;
                    if (_this.user && _this.user.userId) {
                        loggedInUserId_1 = _this.user.userId;
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
                var loggedInUserId_2 = null;
                _this.userService.user.subscribe(function (data) {
                    _this.user = data;
                    if (_this.user && _this.user.userId) {
                        loggedInUserId_2 = _this.user.userId;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFpQixNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUk5QztJQUNFLDhCQUFvQixXQUF3QjtRQUE1QyxpQkFBaUQ7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFHNUMsNkJBQXdCLEdBQUcsVUFBQyxjQUFxQixFQUFFLGtCQUF5QixFQUFFLFNBQWdCLEVBQUUsb0JBQTJCLEVBQUUsZ0JBQXdCO1lBQ25KLElBQUk7Z0JBQ0YsSUFBTSxrQkFBa0IsR0FBa0I7b0JBQ3hDLFdBQVcsRUFBRSxjQUFjO29CQUMzQixlQUFlLEVBQUUsa0JBQWtCO29CQUNuQyxNQUFNLEVBQUUsU0FBUztvQkFDakIsZ0JBQWdCLEVBQUUsVUFBVTtvQkFDNUIsVUFBVSxFQUFFLG9CQUFvQjtpQkFDakMsQ0FBQztnQkFDRixZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RTtRQUNILENBQUMsQ0FBQTtRQUVELDhCQUF5QixHQUFHO1lBQzFCLElBQUk7Z0JBQ0YsSUFBSSxnQkFBYyxHQUFHLElBQUksQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtvQkFDbEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDL0IsZ0JBQWMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztxQkFDckM7b0JBQ0QsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBYyxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzFFO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsMkJBQXNCLEdBQUcsVUFBQyxVQUFrQixFQUFFLGVBQXVCO1lBQ25FLElBQUk7Z0JBQ0YsSUFBSSxnQkFBYyxHQUFHLElBQUksQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtvQkFDbEMsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDL0IsZ0JBQWMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztxQkFDckM7b0JBQ0QsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGdCQUFjLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0VBQWdFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbkY7UUFDSCxDQUFDLENBQUE7SUEvQytDLENBQUM7SUFEdEMsb0JBQW9CO1FBRGhDLFVBQVUsRUFBRTtpREFFc0IsV0FBVztPQURqQyxvQkFBb0IsQ0FpRGhDO0lBQUQsMkJBQUM7Q0FBQSxBQWpERCxJQWlEQztTQWpEWSxvQkFBb0I7QUFtRGpDLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxjQUFxQixFQUFFLGtCQUF5QixFQUFFLFNBQWdCLEVBQUUsb0JBQTJCLEVBQUUsZ0JBQXdCLEVBQUUsb0JBQTBDO0lBQzNNLE9BQU8sY0FBTSxPQUFBLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsRUFBcEksQ0FBb0ksQ0FBQztBQUNwSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVByb2R1Y2VyLCBDb25maWd1cmF0aW9uIH0gZnJvbSAnQHRvd25zY3JpcHQvZGF0YS1jb2xsZWN0b3InO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyLXNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhQ29sbGVjdG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7IH1cbiAgdXNlcjphbnk7XG5cbiAgaW5pdEtpbmVzaXNEYXRhQ29sbGVjdG9yID0gKGF3c0FjY2Vzc0tleUlkOnN0cmluZywgYXdzU2VjcmV0QWNjZXNzS2V5OnN0cmluZywgYXdzUmVnaW9uOnN0cmluZywgYXdzS2luZXNpc1N0cmVhbU5hbWU6c3RyaW5nLCByZWNvcmRGb3JLaW5lc2lzOmJvb2xlYW4gKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRhdGFQaXBlbGluZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgYWNjZXNzS2V5SWQ6IGF3c0FjY2Vzc0tleUlkLFxuICAgICAgICBzZWNyZXRBY2Nlc3NLZXk6IGF3c1NlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgcmVnaW9uOiBhd3NSZWdpb24sXG4gICAgICAgIHVuaXF1ZUlkZW50aWZpZXI6ICdTVFJFQU0tMScsXG4gICAgICAgIHN0cmVhbU5hbWU6IGF3c0tpbmVzaXNTdHJlYW1OYW1lXG4gICAgICB9O1xuICAgICAgRGF0YVByb2R1Y2VyLmluaXRpYWxpemUoZGF0YVBpcGVsaW5lQ29uZmlnLCAhcmVjb3JkRm9yS2luZXNpcyk7XG4gICAgICBjb25zb2xlLmxvZygnaW5pdGlhbGlzZWQga2luZXNpcyBub3cnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2UgYXJlIGdldHRpbmcgZXhjZXB0aW9ucyBpbiBpbml0aWFsaXppbmcga2luZXNpcyAnICsgZSk7XG4gICAgfVxuICB9XG5cbiAgc2VuZFBhZ2VWaWV3RGF0YVRvS2luZXNpcyA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlcklkID0gbnVsbDtcbiAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSB0aGlzLnVzZXIudXNlcklkO1xuICAgICAgICB9XG4gICAgICAgIERhdGFQcm9kdWNlci5jYWxsUGFnZVZpZXcobG9nZ2VkSW5Vc2VySWQpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3RoZXJlIHdhcyBleGNlcHRpb24gaW4gc2VuZGluZyBkYXRhIGZyb20gYm9va2luZyBmbG93JyArIGUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRDbGlja0RhdGFUb0tpbmVzaXMgPSAoZXZlbnRMYWJlbDogc3RyaW5nLCBjbGlja2VkTG9jYXRpb246IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbG9nZ2VkSW5Vc2VySWQgPSBudWxsO1xuICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IHRoaXMudXNlci51c2VySWQ7XG4gICAgICAgIH1cbiAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxDbGlja0V2ZW50KGV2ZW50TGFiZWwsIGNsaWNrZWRMb2NhdGlvbiwgbG9nZ2VkSW5Vc2VySWQpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ2V4Y2VwdGlvbiB3aGlsZSBzZW5kaW5nIHRoZSBjbGljayBzdHJlYW0gZGF0YSBmcm9tIG1hcmtldHBsYWNlJyArIGUpO1xuICAgIH1cbiAgfSAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplRGF0YUNvbGxlY3Rvcihhd3NBY2Nlc3NLZXlJZDpzdHJpbmcsIGF3c1NlY3JldEFjY2Vzc0tleTpzdHJpbmcsIGF3c1JlZ2lvbjpzdHJpbmcsIGF3c0tpbmVzaXNTdHJlYW1OYW1lOnN0cmluZywgcmVjb3JkRm9yS2luZXNpczpib29sZWFuICxkYXRhQ29sbGVjdG9yU2VydmljZTogRGF0YUNvbGxlY3RvclNlcnZpY2UpIHtcbiAgcmV0dXJuICgpID0+IGRhdGFDb2xsZWN0b3JTZXJ2aWNlLmluaXRLaW5lc2lzRGF0YUNvbGxlY3Rvcihhd3NBY2Nlc3NLZXlJZCwgYXdzU2VjcmV0QWNjZXNzS2V5LCBhd3NSZWdpb24sIGF3c0tpbmVzaXNTdHJlYW1OYW1lLCByZWNvcmRGb3JLaW5lc2lzKTtcbn0iXX0=