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
                    if (loggedInUserId) {
                        DataProducer.callPageView(loggedInUserId);
                    }
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
                    if (loggedInUserId) {
                        DataProducer.callClickEvent(eventLabel, clickedLocation, loggedInUserId);
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFpQixNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUk5QyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUMvQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUc1Qyw2QkFBd0IsR0FBRyxDQUFDLGNBQXNCLEVBQUUsa0JBQTBCLEVBQUUsU0FBaUIsRUFBRSxvQkFBNEIsRUFBRSxnQkFBeUIsRUFBRSxFQUFFO1lBQzVKLElBQUk7Z0JBQ0YsTUFBTSxrQkFBa0IsR0FBa0I7b0JBQ3hDLFdBQVcsRUFBRSxjQUFjO29CQUMzQixlQUFlLEVBQUUsa0JBQWtCO29CQUNuQyxNQUFNLEVBQUUsU0FBUztvQkFDakIsZ0JBQWdCLEVBQUUsVUFBVTtvQkFDNUIsVUFBVSxFQUFFLG9CQUFvQjtpQkFDakMsQ0FBQztnQkFDRixZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RTtRQUNILENBQUMsQ0FBQTtRQUVELDhCQUF5QixHQUFHLEdBQUcsRUFBRTtZQUMvQixJQUFJO2dCQUNGLElBQUksY0FBYyxHQUFrQixJQUFJLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDakMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUNuQztvQkFDRCxJQUFJLGNBQWMsRUFBRTt3QkFDbEIsWUFBWSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDM0M7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDMUU7UUFDSCxDQUFDLENBQUE7UUFFRCwyQkFBc0IsR0FBRyxDQUFDLFVBQWtCLEVBQUUsZUFBdUIsRUFBRSxFQUFFO1lBQ3ZFLElBQUk7Z0JBQ0YsSUFBSSxjQUFjLEdBQWtCLElBQUksQ0FBQztnQkFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ25DO29CQUNELElBQUksY0FBYyxFQUFFO3dCQUNsQixZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7cUJBQzFFO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ25GO1FBQ0gsQ0FBQyxDQUFBO0lBbkQrQyxDQUFDO0NBb0RsRCxDQUFBO0FBckRZLG9CQUFvQjtJQURoQyxVQUFVLEVBQUU7NkNBRXNCLFdBQVc7R0FEakMsb0JBQW9CLENBcURoQztTQXJEWSxvQkFBb0I7QUF1RGpDLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxjQUFzQixFQUFFLGtCQUEwQixFQUFFLFNBQWlCLEVBQUUsb0JBQTRCLEVBQUUsZ0JBQXlCLEVBQUUsb0JBQTBDO0lBQ2hOLE9BQU8sR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhUHJvZHVjZXIsIENvbmZpZ3VyYXRpb24gfSBmcm9tICdAdG93bnNjcmlwdC9kYXRhLWNvbGxlY3Rvcic7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3VzZXItc2VydmljZSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFDb2xsZWN0b3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UpIHsgfVxuICB1c2VyOiBhbnk7XG5cbiAgaW5pdEtpbmVzaXNEYXRhQ29sbGVjdG9yID0gKGF3c0FjY2Vzc0tleUlkOiBzdHJpbmcsIGF3c1NlY3JldEFjY2Vzc0tleTogc3RyaW5nLCBhd3NSZWdpb246IHN0cmluZywgYXdzS2luZXNpc1N0cmVhbU5hbWU6IHN0cmluZywgcmVjb3JkRm9yS2luZXNpczogYm9vbGVhbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhUGlwZWxpbmVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgIGFjY2Vzc0tleUlkOiBhd3NBY2Nlc3NLZXlJZCxcbiAgICAgICAgc2VjcmV0QWNjZXNzS2V5OiBhd3NTZWNyZXRBY2Nlc3NLZXksXG4gICAgICAgIHJlZ2lvbjogYXdzUmVnaW9uLFxuICAgICAgICB1bmlxdWVJZGVudGlmaWVyOiAnU1RSRUFNLTEnLFxuICAgICAgICBzdHJlYW1OYW1lOiBhd3NLaW5lc2lzU3RyZWFtTmFtZVxuICAgICAgfTtcbiAgICAgIERhdGFQcm9kdWNlci5pbml0aWFsaXplKGRhdGFQaXBlbGluZUNvbmZpZywgIXJlY29yZEZvcktpbmVzaXMpO1xuICAgICAgY29uc29sZS5sb2coJ2luaXRpYWxpc2VkIGtpbmVzaXMgbm93Jyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3dlIGFyZSBnZXR0aW5nIGV4Y2VwdGlvbnMgaW4gaW5pdGlhbGl6aW5nIGtpbmVzaXMgJyArIGUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRQYWdlVmlld0RhdGFUb0tpbmVzaXMgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBsb2dnZWRJblVzZXJJZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IHRoaXMudXNlci51c2VySWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvZ2dlZEluVXNlcklkKSB7XG4gICAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxQYWdlVmlldyhsb2dnZWRJblVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSB3YXMgZXhjZXB0aW9uIGluIHNlbmRpbmcgZGF0YSBmcm9tIGJvb2tpbmcgZmxvdycgKyBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kQ2xpY2tEYXRhVG9LaW5lc2lzID0gKGV2ZW50TGFiZWw6IHN0cmluZywgY2xpY2tlZExvY2F0aW9uOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlcklkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gdGhpcy51c2VyLnVzZXJJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9nZ2VkSW5Vc2VySWQpIHtcbiAgICAgICAgICBEYXRhUHJvZHVjZXIuY2FsbENsaWNrRXZlbnQoZXZlbnRMYWJlbCwgY2xpY2tlZExvY2F0aW9uLCBsb2dnZWRJblVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdleGNlcHRpb24gd2hpbGUgc2VuZGluZyB0aGUgY2xpY2sgc3RyZWFtIGRhdGEgZnJvbSBtYXJrZXRwbGFjZScgKyBlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVEYXRhQ29sbGVjdG9yKGF3c0FjY2Vzc0tleUlkOiBzdHJpbmcsIGF3c1NlY3JldEFjY2Vzc0tleTogc3RyaW5nLCBhd3NSZWdpb246IHN0cmluZywgYXdzS2luZXNpc1N0cmVhbU5hbWU6IHN0cmluZywgcmVjb3JkRm9yS2luZXNpczogYm9vbGVhbiwgZGF0YUNvbGxlY3RvclNlcnZpY2U6IERhdGFDb2xsZWN0b3JTZXJ2aWNlKSB7XG4gIHJldHVybiAoKSA9PiBkYXRhQ29sbGVjdG9yU2VydmljZS5pbml0S2luZXNpc0RhdGFDb2xsZWN0b3IoYXdzQWNjZXNzS2V5SWQsIGF3c1NlY3JldEFjY2Vzc0tleSwgYXdzUmVnaW9uLCBhd3NLaW5lc2lzU3RyZWFtTmFtZSwgcmVjb3JkRm9yS2luZXNpcyk7XG59Il19