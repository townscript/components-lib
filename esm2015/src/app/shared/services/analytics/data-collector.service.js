import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DataProducer } from '@townscript/data-collector';
import { UserService } from '../user-service';
let DataCollectorService = class DataCollectorService {
    constructor(userService) {
        this.userService = userService;
        this.initKinesisDataCollector = (awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis) => {
            try {
                const dataPipelineConfig = {
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
        this.sendPageViewDataToKinesis = () => {
            try {
                let loggedInUserId = null;
                this.userService.user.subscribe(data => {
                    this.user = data;
                    if (this.user && this.user.userId) {
                        loggedInUserId = this.user.userId;
                    }
                    DataProducer.callPageView(loggedInUserId);
                });
            }
            catch (e) {
                console.log('there was exception in sending data from booking flow' + e);
            }
        };
        this.sendClickDataToKinesis = (eventLabel, clickedLocation) => {
            try {
                let loggedInUserId = null;
                this.userService.user.subscribe(data => {
                    this.user = data;
                    if (this.user && this.user.userId) {
                        loggedInUserId = this.user.userId;
                    }
                    DataProducer.callClickEvent(eventLabel, clickedLocation, loggedInUserId);
                });
            }
            catch (e) {
                console.log('exception while sending the click stream data from marketplace' + e);
            }
        };
    }
};
DataCollectorService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [UserService])
], DataCollectorService);
export { DataCollectorService };
export function initializeDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis, dataCollectorService) {
    return () => dataCollectorService.initKinesisDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFpQixNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUk5QyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUMvQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUc1Qyw2QkFBd0IsR0FBRyxDQUFDLGNBQXFCLEVBQUUsa0JBQXlCLEVBQUUsU0FBZ0IsRUFBRSxvQkFBMkIsRUFBRSxnQkFBd0IsRUFBRyxFQUFFO1lBQ3hKLElBQUk7Z0JBQ0YsTUFBTSxrQkFBa0IsR0FBa0I7b0JBQ3hDLFdBQVcsRUFBRSxjQUFjO29CQUMzQixlQUFlLEVBQUUsa0JBQWtCO29CQUNuQyxNQUFNLEVBQUUsU0FBUztvQkFDakIsZ0JBQWdCLEVBQUUsVUFBVTtvQkFDNUIsVUFBVSxFQUFFLG9CQUFvQjtpQkFDakMsQ0FBQztnQkFDRixZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RTtRQUNILENBQUMsQ0FBQTtRQUVELDhCQUF5QixHQUFHLEdBQUcsRUFBRTtZQUMvQixJQUFJO2dCQUNGLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUMvQixjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ3JDO29CQUNELFlBQVksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzFFO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsMkJBQXNCLEdBQUcsQ0FBQyxVQUFrQixFQUFFLGVBQXVCLEVBQUUsRUFBRTtZQUN2RSxJQUFJO2dCQUNGLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUMvQixjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ3JDO29CQUNELFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0VBQWdFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbkY7UUFDSCxDQUFDLENBQUE7SUEvQytDLENBQUM7Q0FnRGxELENBQUE7QUFqRFksb0JBQW9CO0lBRGhDLFVBQVUsRUFBRTs2Q0FFc0IsV0FBVztHQURqQyxvQkFBb0IsQ0FpRGhDO1NBakRZLG9CQUFvQjtBQW1EakMsTUFBTSxVQUFVLHVCQUF1QixDQUFDLGNBQXFCLEVBQUUsa0JBQXlCLEVBQUUsU0FBZ0IsRUFBRSxvQkFBMkIsRUFBRSxnQkFBd0IsRUFBRSxvQkFBMEM7SUFDM00sT0FBTyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDcEosQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFQcm9kdWNlciwgQ29uZmlndXJhdGlvbiB9IGZyb20gJ0B0b3duc2NyaXB0L2RhdGEtY29sbGVjdG9yJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci1zZXJ2aWNlJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0YUNvbGxlY3RvclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkgeyB9XG4gIHVzZXI6YW55O1xuXG4gIGluaXRLaW5lc2lzRGF0YUNvbGxlY3RvciA9IChhd3NBY2Nlc3NLZXlJZDpzdHJpbmcsIGF3c1NlY3JldEFjY2Vzc0tleTpzdHJpbmcsIGF3c1JlZ2lvbjpzdHJpbmcsIGF3c0tpbmVzaXNTdHJlYW1OYW1lOnN0cmluZywgcmVjb3JkRm9yS2luZXNpczpib29sZWFuICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhUGlwZWxpbmVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgIGFjY2Vzc0tleUlkOiBhd3NBY2Nlc3NLZXlJZCxcbiAgICAgICAgc2VjcmV0QWNjZXNzS2V5OiBhd3NTZWNyZXRBY2Nlc3NLZXksXG4gICAgICAgIHJlZ2lvbjogYXdzUmVnaW9uLFxuICAgICAgICB1bmlxdWVJZGVudGlmaWVyOiAnU1RSRUFNLTEnLFxuICAgICAgICBzdHJlYW1OYW1lOiBhd3NLaW5lc2lzU3RyZWFtTmFtZVxuICAgICAgfTtcbiAgICAgIERhdGFQcm9kdWNlci5pbml0aWFsaXplKGRhdGFQaXBlbGluZUNvbmZpZywgIXJlY29yZEZvcktpbmVzaXMpO1xuICAgICAgY29uc29sZS5sb2coJ2luaXRpYWxpc2VkIGtpbmVzaXMgbm93Jyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3dlIGFyZSBnZXR0aW5nIGV4Y2VwdGlvbnMgaW4gaW5pdGlhbGl6aW5nIGtpbmVzaXMgJyArIGUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRQYWdlVmlld0RhdGFUb0tpbmVzaXMgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBsb2dnZWRJblVzZXJJZCA9IG51bGw7XG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gdGhpcy51c2VyLnVzZXJJZDtcbiAgICAgICAgfVxuICAgICAgICBEYXRhUHJvZHVjZXIuY2FsbFBhZ2VWaWV3KGxvZ2dlZEluVXNlcklkKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSB3YXMgZXhjZXB0aW9uIGluIHNlbmRpbmcgZGF0YSBmcm9tIGJvb2tpbmcgZmxvdycgKyBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kQ2xpY2tEYXRhVG9LaW5lc2lzID0gKGV2ZW50TGFiZWw6IHN0cmluZywgY2xpY2tlZExvY2F0aW9uOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlcklkID0gbnVsbDtcbiAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSB0aGlzLnVzZXIudXNlcklkO1xuICAgICAgICB9XG4gICAgICAgIERhdGFQcm9kdWNlci5jYWxsQ2xpY2tFdmVudChldmVudExhYmVsLCBjbGlja2VkTG9jYXRpb24sIGxvZ2dlZEluVXNlcklkKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdleGNlcHRpb24gd2hpbGUgc2VuZGluZyB0aGUgY2xpY2sgc3RyZWFtIGRhdGEgZnJvbSBtYXJrZXRwbGFjZScgKyBlKTtcbiAgICB9XG4gIH0gIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZURhdGFDb2xsZWN0b3IoYXdzQWNjZXNzS2V5SWQ6c3RyaW5nLCBhd3NTZWNyZXRBY2Nlc3NLZXk6c3RyaW5nLCBhd3NSZWdpb246c3RyaW5nLCBhd3NLaW5lc2lzU3RyZWFtTmFtZTpzdHJpbmcsIHJlY29yZEZvcktpbmVzaXM6Ym9vbGVhbiAsZGF0YUNvbGxlY3RvclNlcnZpY2U6IERhdGFDb2xsZWN0b3JTZXJ2aWNlKSB7XG4gIHJldHVybiAoKSA9PiBkYXRhQ29sbGVjdG9yU2VydmljZS5pbml0S2luZXNpc0RhdGFDb2xsZWN0b3IoYXdzQWNjZXNzS2V5SWQsIGF3c1NlY3JldEFjY2Vzc0tleSwgYXdzUmVnaW9uLCBhd3NLaW5lc2lzU3RyZWFtTmFtZSwgcmVjb3JkRm9yS2luZXNpcyk7XG59Il19