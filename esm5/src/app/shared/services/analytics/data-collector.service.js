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
                    if (loggedInUserId_1) {
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
                var loggedInUserId_2 = null;
                _this.userService.user.subscribe(function (data) {
                    _this.user = data;
                    if (_this.user && _this.user.userId) {
                        loggedInUserId_2 = _this.user.userId;
                    }
                    if (loggedInUserId_2) {
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
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], DataCollectorService);
    return DataCollectorService;
}());
export { DataCollectorService };
export function initializeDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis, dataCollectorService) {
    return function () { return dataCollectorService.initKinesisDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFpQixNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUk5QztJQUNFLDhCQUFvQixXQUF3QjtRQUE1QyxpQkFBaUQ7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFHNUMsNkJBQXdCLEdBQUcsVUFBQyxjQUFzQixFQUFFLGtCQUEwQixFQUFFLFNBQWlCLEVBQUUsb0JBQTRCLEVBQUUsZ0JBQXlCO1lBQ3hKLElBQUk7Z0JBQ0YsSUFBTSxrQkFBa0IsR0FBa0I7b0JBQ3hDLFdBQVcsRUFBRSxjQUFjO29CQUMzQixlQUFlLEVBQUUsa0JBQWtCO29CQUNuQyxNQUFNLEVBQUUsU0FBUztvQkFDakIsZ0JBQWdCLEVBQUUsVUFBVTtvQkFDNUIsVUFBVSxFQUFFLG9CQUFvQjtpQkFDakMsQ0FBQztnQkFDRixZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RTtRQUNILENBQUMsQ0FBQTtRQUVELDhCQUF5QixHQUFHO1lBQzFCLElBQUk7Z0JBQ0YsSUFBSSxnQkFBYyxHQUFrQixJQUFJLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7b0JBQ2xDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2pDLGdCQUFjLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ25DO29CQUNELElBQUksZ0JBQWMsRUFBRTt3QkFDbEIsWUFBWSxDQUFDLFlBQVksQ0FBQyxnQkFBYyxDQUFDLENBQUM7cUJBQzNDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzFFO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsMkJBQXNCLEdBQUcsVUFBQyxVQUFrQixFQUFFLGVBQXVCO1lBQ25FLElBQUk7Z0JBQ0YsSUFBSSxnQkFBYyxHQUFrQixJQUFJLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7b0JBQ2xDLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2pDLGdCQUFjLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ25DO29CQUNELElBQUksZ0JBQWMsRUFBRTt3QkFDbEIsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGdCQUFjLENBQUMsQ0FBQztxQkFDMUU7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0VBQWdFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbkY7UUFDSCxDQUFDLENBQUE7SUFuRCtDLENBQUM7SUFEdEMsb0JBQW9CO1FBRGhDLFVBQVUsRUFBRTtpREFFc0IsV0FBVztPQURqQyxvQkFBb0IsQ0FxRGhDO0lBQUQsMkJBQUM7Q0FBQSxBQXJERCxJQXFEQztTQXJEWSxvQkFBb0I7QUF1RGpDLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxjQUFzQixFQUFFLGtCQUEwQixFQUFFLFNBQWlCLEVBQUUsb0JBQTRCLEVBQUUsZ0JBQXlCLEVBQUUsb0JBQTBDO0lBQ2hOLE9BQU8sY0FBTSxPQUFBLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsRUFBcEksQ0FBb0ksQ0FBQztBQUNwSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVByb2R1Y2VyLCBDb25maWd1cmF0aW9uIH0gZnJvbSAnQHRvd25zY3JpcHQvZGF0YS1jb2xsZWN0b3InO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyLXNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhQ29sbGVjdG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7IH1cbiAgdXNlcjogYW55O1xuXG4gIGluaXRLaW5lc2lzRGF0YUNvbGxlY3RvciA9IChhd3NBY2Nlc3NLZXlJZDogc3RyaW5nLCBhd3NTZWNyZXRBY2Nlc3NLZXk6IHN0cmluZywgYXdzUmVnaW9uOiBzdHJpbmcsIGF3c0tpbmVzaXNTdHJlYW1OYW1lOiBzdHJpbmcsIHJlY29yZEZvcktpbmVzaXM6IGJvb2xlYW4pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YVBpcGVsaW5lQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xuICAgICAgICBhY2Nlc3NLZXlJZDogYXdzQWNjZXNzS2V5SWQsXG4gICAgICAgIHNlY3JldEFjY2Vzc0tleTogYXdzU2VjcmV0QWNjZXNzS2V5LFxuICAgICAgICByZWdpb246IGF3c1JlZ2lvbixcbiAgICAgICAgdW5pcXVlSWRlbnRpZmllcjogJ1NUUkVBTS0xJyxcbiAgICAgICAgc3RyZWFtTmFtZTogYXdzS2luZXNpc1N0cmVhbU5hbWVcbiAgICAgIH07XG4gICAgICBEYXRhUHJvZHVjZXIuaW5pdGlhbGl6ZShkYXRhUGlwZWxpbmVDb25maWcsICFyZWNvcmRGb3JLaW5lc2lzKTtcbiAgICAgIGNvbnNvbGUubG9nKCdpbml0aWFsaXNlZCBraW5lc2lzIG5vdycpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd3ZSBhcmUgZ2V0dGluZyBleGNlcHRpb25zIGluIGluaXRpYWxpemluZyBraW5lc2lzICcgKyBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kUGFnZVZpZXdEYXRhVG9LaW5lc2lzID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbG9nZ2VkSW5Vc2VySWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSB0aGlzLnVzZXIudXNlcklkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2dnZWRJblVzZXJJZCkge1xuICAgICAgICAgIERhdGFQcm9kdWNlci5jYWxsUGFnZVZpZXcobG9nZ2VkSW5Vc2VySWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhlcmUgd2FzIGV4Y2VwdGlvbiBpbiBzZW5kaW5nIGRhdGEgZnJvbSBib29raW5nIGZsb3cnICsgZSk7XG4gICAgfVxuICB9XG5cbiAgc2VuZENsaWNrRGF0YVRvS2luZXNpcyA9IChldmVudExhYmVsOiBzdHJpbmcsIGNsaWNrZWRMb2NhdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBsb2dnZWRJblVzZXJJZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IHRoaXMudXNlci51c2VySWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvZ2dlZEluVXNlcklkKSB7XG4gICAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxDbGlja0V2ZW50KGV2ZW50TGFiZWwsIGNsaWNrZWRMb2NhdGlvbiwgbG9nZ2VkSW5Vc2VySWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZXhjZXB0aW9uIHdoaWxlIHNlbmRpbmcgdGhlIGNsaWNrIHN0cmVhbSBkYXRhIGZyb20gbWFya2V0cGxhY2UnICsgZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplRGF0YUNvbGxlY3Rvcihhd3NBY2Nlc3NLZXlJZDogc3RyaW5nLCBhd3NTZWNyZXRBY2Nlc3NLZXk6IHN0cmluZywgYXdzUmVnaW9uOiBzdHJpbmcsIGF3c0tpbmVzaXNTdHJlYW1OYW1lOiBzdHJpbmcsIHJlY29yZEZvcktpbmVzaXM6IGJvb2xlYW4sIGRhdGFDb2xsZWN0b3JTZXJ2aWNlOiBEYXRhQ29sbGVjdG9yU2VydmljZSkge1xuICByZXR1cm4gKCkgPT4gZGF0YUNvbGxlY3RvclNlcnZpY2UuaW5pdEtpbmVzaXNEYXRhQ29sbGVjdG9yKGF3c0FjY2Vzc0tleUlkLCBhd3NTZWNyZXRBY2Nlc3NLZXksIGF3c1JlZ2lvbiwgYXdzS2luZXNpc1N0cmVhbU5hbWUsIHJlY29yZEZvcktpbmVzaXMpO1xufSJdfQ==