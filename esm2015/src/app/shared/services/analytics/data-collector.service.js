import * as tslib_1 from "tslib";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DataProducer } from '@townscript/data-collector';
import { UserService } from '../user-service';
import { isPlatformBrowser } from '@angular/common';
let DataCollectorService = class DataCollectorService {
    constructor(userService, platformId) {
        this.userService = userService;
        this.platformId = platformId;
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
                    if (isPlatformBrowser(this.platformId)) {
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
                let loggedInUserId;
                this.userService.user.subscribe(data => {
                    this.user = data;
                    if (this.user && this.user.userId) {
                        loggedInUserId = this.user.userId;
                    }
                    else {
                        loggedInUserId = null;
                    }
                    if (isPlatformBrowser(this.platformId)) {
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
    tslib_1.__param(1, Inject(PLATFORM_ID)),
    tslib_1.__metadata("design:paramtypes", [UserService, Object])
], DataCollectorService);
export { DataCollectorService };
export function initializeDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis, dataCollectorService) {
    return () => dataCollectorService.initKinesisDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQWlCLE1BQU0sNEJBQTRCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSXBELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQy9CLFlBQW9CLFdBQXdCLEVBQStCLFVBQWtCO1FBQXpFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQStCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFHN0YsNkJBQXdCLEdBQUcsQ0FBQyxjQUFzQixFQUFFLGtCQUEwQixFQUFFLFNBQWlCLEVBQUUsb0JBQTRCLEVBQUUsZ0JBQXlCLEVBQUUsRUFBRTtZQUM1SixJQUFJO2dCQUNGLE1BQU0sa0JBQWtCLEdBQWtCO29CQUN4QyxXQUFXLEVBQUUsY0FBYztvQkFDM0IsZUFBZSxFQUFFLGtCQUFrQjtvQkFDbkMsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLGdCQUFnQixFQUFFLFVBQVU7b0JBQzVCLFVBQVUsRUFBRSxvQkFBb0I7aUJBQ2pDLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN4QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdkU7UUFDSCxDQUFDLENBQUE7UUFFRCw4QkFBeUIsR0FBRyxHQUFHLEVBQUU7WUFDL0IsSUFBSTtnQkFDRixJQUFJLGNBQWMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNuRDt5QkFBTTt3QkFDTCxjQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUN2QjtvQkFDRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDdEMsWUFBWSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDM0M7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDMUU7UUFDSCxDQUFDLENBQUE7UUFFRCwyQkFBc0IsR0FBRyxDQUFDLFVBQWtCLEVBQUUsZUFBdUIsRUFBRSxFQUFFO1lBQ3ZFLElBQUk7Z0JBQ0YsSUFBSSxjQUFjLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDakMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUNuQzt5QkFBTTt3QkFDTCxjQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUN2QjtvQkFFRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDdEMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO3FCQUMxRTtnQkFFSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnRUFBZ0UsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuRjtRQUNILENBQUMsQ0FBQTtJQXpEa0csQ0FBQztDQTBEckcsQ0FBQTtBQTNEWSxvQkFBb0I7SUFEaEMsVUFBVSxFQUFFO0lBRW9DLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTs2Q0FBakMsV0FBVyxFQUEyQyxNQUFNO0dBRGxGLG9CQUFvQixDQTJEaEM7U0EzRFksb0JBQW9CO0FBNkRqQyxNQUFNLFVBQVUsdUJBQXVCLENBQUMsY0FBc0IsRUFBRSxrQkFBMEIsRUFBRSxTQUFpQixFQUFFLG9CQUE0QixFQUFFLGdCQUF5QixFQUFFLG9CQUEwQztJQUNoTixPQUFPLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNwSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0YVByb2R1Y2VyLCBDb25maWd1cmF0aW9uIH0gZnJvbSAnQHRvd25zY3JpcHQvZGF0YS1jb2xsZWN0b3InO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRhQ29sbGVjdG9yU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCwgKSB7IH1cbiAgdXNlcjogYW55O1xuXG4gIGluaXRLaW5lc2lzRGF0YUNvbGxlY3RvciA9IChhd3NBY2Nlc3NLZXlJZDogc3RyaW5nLCBhd3NTZWNyZXRBY2Nlc3NLZXk6IHN0cmluZywgYXdzUmVnaW9uOiBzdHJpbmcsIGF3c0tpbmVzaXNTdHJlYW1OYW1lOiBzdHJpbmcsIHJlY29yZEZvcktpbmVzaXM6IGJvb2xlYW4pID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YVBpcGVsaW5lQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xuICAgICAgICBhY2Nlc3NLZXlJZDogYXdzQWNjZXNzS2V5SWQsXG4gICAgICAgIHNlY3JldEFjY2Vzc0tleTogYXdzU2VjcmV0QWNjZXNzS2V5LFxuICAgICAgICByZWdpb246IGF3c1JlZ2lvbixcbiAgICAgICAgdW5pcXVlSWRlbnRpZmllcjogJ1NUUkVBTS0xJyxcbiAgICAgICAgc3RyZWFtTmFtZTogYXdzS2luZXNpc1N0cmVhbU5hbWVcbiAgICAgIH07XG4gICAgICBEYXRhUHJvZHVjZXIuaW5pdGlhbGl6ZShkYXRhUGlwZWxpbmVDb25maWcsICFyZWNvcmRGb3JLaW5lc2lzKTtcbiAgICAgIGNvbnNvbGUubG9nKCdpbml0aWFsaXNlZCBraW5lc2lzIG5vdycpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd3ZSBhcmUgZ2V0dGluZyBleGNlcHRpb25zIGluIGluaXRpYWxpemluZyBraW5lc2lzICcgKyBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kUGFnZVZpZXdEYXRhVG9LaW5lc2lzID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbG9nZ2VkSW5Vc2VySWQ7XG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLnVzZXIuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnVzZXIgPSBkYXRhO1xuICAgICAgICBpZiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IEpTT04uc3RyaW5naWZ5KHRoaXMudXNlci51c2VySWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgIERhdGFQcm9kdWNlci5jYWxsUGFnZVZpZXcobG9nZ2VkSW5Vc2VySWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygndGhlcmUgd2FzIGV4Y2VwdGlvbiBpbiBzZW5kaW5nIGRhdGEgZnJvbSBib29raW5nIGZsb3cnICsgZSk7XG4gICAgfVxuICB9XG5cbiAgc2VuZENsaWNrRGF0YVRvS2luZXNpcyA9IChldmVudExhYmVsOiBzdHJpbmcsIGNsaWNrZWRMb2NhdGlvbjogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBsb2dnZWRJblVzZXJJZDtcbiAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gdGhpcy51c2VyLnVzZXJJZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2dnZWRJblVzZXJJZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgIERhdGFQcm9kdWNlci5jYWxsQ2xpY2tFdmVudChldmVudExhYmVsLCBjbGlja2VkTG9jYXRpb24sIGxvZ2dlZEluVXNlcklkKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZXhjZXB0aW9uIHdoaWxlIHNlbmRpbmcgdGhlIGNsaWNrIHN0cmVhbSBkYXRhIGZyb20gbWFya2V0cGxhY2UnICsgZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplRGF0YUNvbGxlY3Rvcihhd3NBY2Nlc3NLZXlJZDogc3RyaW5nLCBhd3NTZWNyZXRBY2Nlc3NLZXk6IHN0cmluZywgYXdzUmVnaW9uOiBzdHJpbmcsIGF3c0tpbmVzaXNTdHJlYW1OYW1lOiBzdHJpbmcsIHJlY29yZEZvcktpbmVzaXM6IGJvb2xlYW4sIGRhdGFDb2xsZWN0b3JTZXJ2aWNlOiBEYXRhQ29sbGVjdG9yU2VydmljZSkge1xuICByZXR1cm4gKCkgPT4gZGF0YUNvbGxlY3RvclNlcnZpY2UuaW5pdEtpbmVzaXNEYXRhQ29sbGVjdG9yKGF3c0FjY2Vzc0tleUlkLCBhd3NTZWNyZXRBY2Nlc3NLZXksIGF3c1JlZ2lvbiwgYXdzS2luZXNpc1N0cmVhbU5hbWUsIHJlY29yZEZvcktpbmVzaXMpO1xufSJdfQ==