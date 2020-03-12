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
                let loggedInUserId;
                this.userService.user.subscribe(data => {
                    this.user = data;
                    if (this.user && this.user.userId) {
                        loggedInUserId = JSON.stringify(this.user.userId);
                    }
                    else {
                        loggedInUserId = null;
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
                let loggedInUserId;
                this.userService.user.subscribe(data => {
                    this.user = data;
                    if (this.user && this.user.userId) {
                        loggedInUserId = this.user.userId;
                    }
                    else {
                        loggedInUserId = null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFpQixNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUk5QyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUMvQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUc1Qyw2QkFBd0IsR0FBRyxDQUFDLGNBQXNCLEVBQUUsa0JBQTBCLEVBQUUsU0FBaUIsRUFBRSxvQkFBNEIsRUFBRSxnQkFBeUIsRUFBRSxFQUFFO1lBQzVKLElBQUk7Z0JBQ0YsTUFBTSxrQkFBa0IsR0FBa0I7b0JBQ3hDLFdBQVcsRUFBRSxjQUFjO29CQUMzQixlQUFlLEVBQUUsa0JBQWtCO29CQUNuQyxNQUFNLEVBQUUsU0FBUztvQkFDakIsZ0JBQWdCLEVBQUUsVUFBVTtvQkFDNUIsVUFBVSxFQUFFLG9CQUFvQjtpQkFDakMsQ0FBQztnQkFDRixZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQ3hDO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN2RTtRQUNILENBQUMsQ0FBQTtRQUVELDhCQUF5QixHQUFHLEdBQUcsRUFBRTtZQUMvQixJQUFJO2dCQUNGLElBQUksY0FBYyxDQUFDO2dCQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2pDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ25EO3lCQUFNO3dCQUNMLGNBQWMsR0FBRyxJQUFJLENBQUM7cUJBQ3ZCO29CQUNELFlBQVksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzFFO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsMkJBQXNCLEdBQUcsQ0FBQyxVQUFrQixFQUFFLGVBQXVCLEVBQUUsRUFBRTtZQUN2RSxJQUFJO2dCQUNGLElBQUksY0FBYyxDQUFDO2dCQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2pDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztxQkFDbkM7eUJBQU07d0JBQ0wsY0FBYyxHQUFHLElBQUksQ0FBQztxQkFDdkI7b0JBQ0QsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnRUFBZ0UsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuRjtRQUNILENBQUMsQ0FBQTtJQW5EK0MsQ0FBQztDQW9EbEQsQ0FBQTtBQXJEWSxvQkFBb0I7SUFEaEMsVUFBVSxFQUFFOzZDQUVzQixXQUFXO0dBRGpDLG9CQUFvQixDQXFEaEM7U0FyRFksb0JBQW9CO0FBdURqQyxNQUFNLFVBQVUsdUJBQXVCLENBQUMsY0FBc0IsRUFBRSxrQkFBMEIsRUFBRSxTQUFpQixFQUFFLG9CQUE0QixFQUFFLGdCQUF5QixFQUFFLG9CQUEwQztJQUNoTixPQUFPLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNwSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVByb2R1Y2VyLCBDb25maWd1cmF0aW9uIH0gZnJvbSAnQHRvd25zY3JpcHQvZGF0YS1jb2xsZWN0b3InO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyLXNlcnZpY2UnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhQ29sbGVjdG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7IH1cbiAgdXNlcjogYW55O1xuXG4gIGluaXRLaW5lc2lzRGF0YUNvbGxlY3RvciA9IChhd3NBY2Nlc3NLZXlJZDogc3RyaW5nLCBhd3NTZWNyZXRBY2Nlc3NLZXk6IHN0cmluZywgYXdzUmVnaW9uOiBzdHJpbmcsIGF3c0tpbmVzaXNTdHJlYW1OYW1lOiBzdHJpbmcsIHJlY29yZEZvcktpbmVzaXM6IGJvb2xlYW4pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YVBpcGVsaW5lQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xuICAgICAgICBhY2Nlc3NLZXlJZDogYXdzQWNjZXNzS2V5SWQsXG4gICAgICAgIHNlY3JldEFjY2Vzc0tleTogYXdzU2VjcmV0QWNjZXNzS2V5LFxuICAgICAgICByZWdpb246IGF3c1JlZ2lvbixcbiAgICAgICAgdW5pcXVlSWRlbnRpZmllcjogJ1NUUkVBTS0xJyxcbiAgICAgICAgc3RyZWFtTmFtZTogYXdzS2luZXNpc1N0cmVhbU5hbWVcbiAgICAgIH07XG4gICAgICBEYXRhUHJvZHVjZXIuaW5pdGlhbGl6ZShkYXRhUGlwZWxpbmVDb25maWcsICFyZWNvcmRGb3JLaW5lc2lzKTtcbiAgICAgIGNvbnNvbGUubG9nKCdpbml0aWFsaXNlZCBraW5lc2lzIG5vdycpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd3ZSBhcmUgZ2V0dGluZyBleGNlcHRpb25zIGluIGluaXRpYWxpemluZyBraW5lc2lzICcgKyBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kUGFnZVZpZXdEYXRhVG9LaW5lc2lzID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbG9nZ2VkSW5Vc2VySWQ7XG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IEpTT04uc3RyaW5naWZ5KHRoaXMudXNlci51c2VySWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBEYXRhUHJvZHVjZXIuY2FsbFBhZ2VWaWV3KGxvZ2dlZEluVXNlcklkKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSB3YXMgZXhjZXB0aW9uIGluIHNlbmRpbmcgZGF0YSBmcm9tIGJvb2tpbmcgZmxvdycgKyBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kQ2xpY2tEYXRhVG9LaW5lc2lzID0gKGV2ZW50TGFiZWw6IHN0cmluZywgY2xpY2tlZExvY2F0aW9uOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlcklkO1xuICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSB0aGlzLnVzZXIudXNlcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBEYXRhUHJvZHVjZXIuY2FsbENsaWNrRXZlbnQoZXZlbnRMYWJlbCwgY2xpY2tlZExvY2F0aW9uLCBsb2dnZWRJblVzZXJJZCk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZXhjZXB0aW9uIHdoaWxlIHNlbmRpbmcgdGhlIGNsaWNrIHN0cmVhbSBkYXRhIGZyb20gbWFya2V0cGxhY2UnICsgZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplRGF0YUNvbGxlY3Rvcihhd3NBY2Nlc3NLZXlJZDogc3RyaW5nLCBhd3NTZWNyZXRBY2Nlc3NLZXk6IHN0cmluZywgYXdzUmVnaW9uOiBzdHJpbmcsIGF3c0tpbmVzaXNTdHJlYW1OYW1lOiBzdHJpbmcsIHJlY29yZEZvcktpbmVzaXM6IGJvb2xlYW4sIGRhdGFDb2xsZWN0b3JTZXJ2aWNlOiBEYXRhQ29sbGVjdG9yU2VydmljZSkge1xuICByZXR1cm4gKCkgPT4gZGF0YUNvbGxlY3RvclNlcnZpY2UuaW5pdEtpbmVzaXNEYXRhQ29sbGVjdG9yKGF3c0FjY2Vzc0tleUlkLCBhd3NTZWNyZXRBY2Nlc3NLZXksIGF3c1JlZ2lvbiwgYXdzS2luZXNpc1N0cmVhbU5hbWUsIHJlY29yZEZvcktpbmVzaXMpO1xufSJdfQ==