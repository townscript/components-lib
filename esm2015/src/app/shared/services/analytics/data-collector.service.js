import { __decorate, __param } from "tslib";
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
DataCollectorService.ctorParameters = () => [
    { type: UserService },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
DataCollectorService = __decorate([
    Injectable(),
    __param(1, Inject(PLATFORM_ID))
], DataCollectorService);
export { DataCollectorService };
export function initializeDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis, dataCollectorService) {
    return () => dataCollectorService.initKinesisDataCollector(awsAccessKeyId, awsSecretAccessKey, awsRegion, awsKinesisStreamName, recordForKinesis);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1jb2xsZWN0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQWlCLE1BQU0sNEJBQTRCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSXBELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQy9CLFlBQW9CLFdBQXdCLEVBQStCLFVBQWtCO1FBQXpFLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQStCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFHN0YsNkJBQXdCLEdBQUcsQ0FBQyxjQUFzQixFQUFFLGtCQUEwQixFQUFFLFNBQWlCLEVBQUUsb0JBQTRCLEVBQUUsZ0JBQXlCLEVBQUUsRUFBRTtZQUM1SixJQUFJO2dCQUNGLE1BQU0sa0JBQWtCLEdBQWtCO29CQUN4QyxXQUFXLEVBQUUsY0FBYztvQkFDM0IsZUFBZSxFQUFFLGtCQUFrQjtvQkFDbkMsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLGdCQUFnQixFQUFFLFVBQVU7b0JBQzVCLFVBQVUsRUFBRSxvQkFBb0I7aUJBQ2pDLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN4QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdkU7UUFDSCxDQUFDLENBQUE7UUFFRCw4QkFBeUIsR0FBRyxHQUFHLEVBQUU7WUFDL0IsSUFBSTtnQkFDRixJQUFJLGNBQWMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNqQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNuRDt5QkFBTTt3QkFDTCxjQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUN2QjtvQkFDRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDdEMsWUFBWSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDM0M7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDMUU7UUFDSCxDQUFDLENBQUE7UUFFRCwyQkFBc0IsR0FBRyxDQUFDLFVBQWtCLEVBQUUsZUFBdUIsRUFBRSxFQUFFO1lBQ3ZFLElBQUk7Z0JBQ0YsSUFBSSxjQUFjLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDakMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO3FCQUNuQzt5QkFBTTt3QkFDTCxjQUFjLEdBQUcsSUFBSSxDQUFDO3FCQUN2QjtvQkFFRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDdEMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO3FCQUMxRTtnQkFFSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnRUFBZ0UsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuRjtRQUNILENBQUMsQ0FBQTtJQXpEa0csQ0FBQztDQTBEckcsQ0FBQTs7WUExRGtDLFdBQVc7WUFBMkMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7O0FBRHRELG9CQUFvQjtJQURoQyxVQUFVLEVBQUU7SUFFb0MsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7R0FEdkQsb0JBQW9CLENBMkRoQztTQTNEWSxvQkFBb0I7QUE2RGpDLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxjQUFzQixFQUFFLGtCQUEwQixFQUFFLFNBQWlCLEVBQUUsb0JBQTRCLEVBQUUsZ0JBQXlCLEVBQUUsb0JBQTBDO0lBQ2hOLE9BQU8sR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhUHJvZHVjZXIsIENvbmZpZ3VyYXRpb24gfSBmcm9tICdAdG93bnNjcmlwdC9kYXRhLWNvbGxlY3Rvcic7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFDb2xsZWN0b3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LCApIHsgfVxuICB1c2VyOiBhbnk7XG5cbiAgaW5pdEtpbmVzaXNEYXRhQ29sbGVjdG9yID0gKGF3c0FjY2Vzc0tleUlkOiBzdHJpbmcsIGF3c1NlY3JldEFjY2Vzc0tleTogc3RyaW5nLCBhd3NSZWdpb246IHN0cmluZywgYXdzS2luZXNpc1N0cmVhbU5hbWU6IHN0cmluZywgcmVjb3JkRm9yS2luZXNpczogYm9vbGVhbikgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhUGlwZWxpbmVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgIGFjY2Vzc0tleUlkOiBhd3NBY2Nlc3NLZXlJZCxcbiAgICAgICAgc2VjcmV0QWNjZXNzS2V5OiBhd3NTZWNyZXRBY2Nlc3NLZXksXG4gICAgICAgIHJlZ2lvbjogYXdzUmVnaW9uLFxuICAgICAgICB1bmlxdWVJZGVudGlmaWVyOiAnU1RSRUFNLTEnLFxuICAgICAgICBzdHJlYW1OYW1lOiBhd3NLaW5lc2lzU3RyZWFtTmFtZVxuICAgICAgfTtcbiAgICAgIERhdGFQcm9kdWNlci5pbml0aWFsaXplKGRhdGFQaXBlbGluZUNvbmZpZywgIXJlY29yZEZvcktpbmVzaXMpO1xuICAgICAgY29uc29sZS5sb2coJ2luaXRpYWxpc2VkIGtpbmVzaXMgbm93Jyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ3dlIGFyZSBnZXR0aW5nIGV4Y2VwdGlvbnMgaW4gaW5pdGlhbGl6aW5nIGtpbmVzaXMgJyArIGUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRQYWdlVmlld0RhdGFUb0tpbmVzaXMgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBsb2dnZWRJblVzZXJJZDtcbiAgICAgIHRoaXMudXNlclNlcnZpY2UudXNlci5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnVzZXJJZCkge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gSlNPTi5zdHJpbmdpZnkodGhpcy51c2VyLnVzZXJJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxQYWdlVmlldyhsb2dnZWRJblVzZXJJZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSB3YXMgZXhjZXB0aW9uIGluIHNlbmRpbmcgZGF0YSBmcm9tIGJvb2tpbmcgZmxvdycgKyBlKTtcbiAgICB9XG4gIH1cblxuICBzZW5kQ2xpY2tEYXRhVG9LaW5lc2lzID0gKGV2ZW50TGFiZWw6IHN0cmluZywgY2xpY2tlZExvY2F0aW9uOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGxvZ2dlZEluVXNlcklkO1xuICAgICAgdGhpcy51c2VyU2VydmljZS51c2VyLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy51c2VyID0gZGF0YTtcbiAgICAgICAgaWYgKHRoaXMudXNlciAmJiB0aGlzLnVzZXIudXNlcklkKSB7XG4gICAgICAgICAgbG9nZ2VkSW5Vc2VySWQgPSB0aGlzLnVzZXIudXNlcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvZ2dlZEluVXNlcklkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgRGF0YVByb2R1Y2VyLmNhbGxDbGlja0V2ZW50KGV2ZW50TGFiZWwsIGNsaWNrZWRMb2NhdGlvbiwgbG9nZ2VkSW5Vc2VySWQpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdleGNlcHRpb24gd2hpbGUgc2VuZGluZyB0aGUgY2xpY2sgc3RyZWFtIGRhdGEgZnJvbSBtYXJrZXRwbGFjZScgKyBlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVEYXRhQ29sbGVjdG9yKGF3c0FjY2Vzc0tleUlkOiBzdHJpbmcsIGF3c1NlY3JldEFjY2Vzc0tleTogc3RyaW5nLCBhd3NSZWdpb246IHN0cmluZywgYXdzS2luZXNpc1N0cmVhbU5hbWU6IHN0cmluZywgcmVjb3JkRm9yS2luZXNpczogYm9vbGVhbiwgZGF0YUNvbGxlY3RvclNlcnZpY2U6IERhdGFDb2xsZWN0b3JTZXJ2aWNlKSB7XG4gIHJldHVybiAoKSA9PiBkYXRhQ29sbGVjdG9yU2VydmljZS5pbml0S2luZXNpc0RhdGFDb2xsZWN0b3IoYXdzQWNjZXNzS2V5SWQsIGF3c1NlY3JldEFjY2Vzc0tleSwgYXdzUmVnaW9uLCBhd3NLaW5lc2lzU3RyZWFtTmFtZSwgcmVjb3JkRm9yS2luZXNpcyk7XG59Il19