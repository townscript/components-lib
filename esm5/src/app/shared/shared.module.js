import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowComponent } from './components/follow/follow.component';
import { RangeDatePipe } from './pipes/ts-date-range.pipe';
import { TextOverflowClampDirective } from './pipes/text-overflow.directive';
import { TimeService } from './services/time.service';
import { UserService } from './services/user-service';
import { FollowService } from './services/follow.service';
import { DataAnalyticsDirective } from './directives/analytics/data-analytics.directive';
import { DataCollectorService } from './services/analytics/data-collector.service';
import { UtilityService } from './services/utilities.service';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                RangeDatePipe,
                FollowComponent,
                TextOverflowClampDirective,
                DataAnalyticsDirective
            ],
            imports: [
                CommonModule
            ],
            exports: [
                FollowComponent,
                RangeDatePipe,
                TextOverflowClampDirective,
                DataAnalyticsDirective
            ],
            providers: [TimeService, UserService, FollowService, DataCollectorService, UtilityService]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zaGFyZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQXFCOUQ7SUFBQTtJQUE0QixDQUFDO0lBQWhCLFlBQVk7UUFsQnhCLFFBQVEsQ0FBQztZQUNOLFlBQVksRUFBRTtnQkFDVixhQUFhO2dCQUNiLGVBQWU7Z0JBQ2YsMEJBQTBCO2dCQUMxQixzQkFBc0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGVBQWU7Z0JBQ2YsYUFBYTtnQkFDYiwwQkFBMEI7Z0JBQzFCLHNCQUFzQjthQUN6QjtZQUNELFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGNBQWMsQ0FBQztTQUM3RixDQUFDO09BQ1csWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZvbGxvd0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb2xsb3cvZm9sbG93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYW5nZURhdGVQaXBlIH0gZnJvbSAnLi9waXBlcy90cy1kYXRlLXJhbmdlLnBpcGUnO1xuaW1wb3J0IHsgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUgfSBmcm9tICcuL3BpcGVzL3RleHQtb3ZlcmZsb3cuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBGb2xsb3dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb2xsb3cuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhQW5hbHl0aWNzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FuYWx5dGljcy9kYXRhLWFuYWx5dGljcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YUNvbGxlY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2FuYWx5dGljcy9kYXRhLWNvbGxlY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUmFuZ2VEYXRlUGlwZSxcbiAgICAgICAgRm9sbG93Q29tcG9uZW50LFxuICAgICAgICBUZXh0T3ZlcmZsb3dDbGFtcERpcmVjdGl2ZSxcbiAgICAgICAgRGF0YUFuYWx5dGljc0RpcmVjdGl2ZVxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRm9sbG93Q29tcG9uZW50LFxuICAgICAgICBSYW5nZURhdGVQaXBlLFxuICAgICAgICBUZXh0T3ZlcmZsb3dDbGFtcERpcmVjdGl2ZSxcbiAgICAgICAgRGF0YUFuYWx5dGljc0RpcmVjdGl2ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbVGltZVNlcnZpY2UsIFVzZXJTZXJ2aWNlLCBGb2xsb3dTZXJ2aWNlLCBEYXRhQ29sbGVjdG9yU2VydmljZSwgVXRpbGl0eVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7IH1cbiJdfQ==