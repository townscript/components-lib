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
let SharedModule = class SharedModule {
};
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
        providers: [TimeService, UserService, FollowService, DataCollectorService]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zaGFyZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBcUJuRixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUksQ0FBQTtBQUFoQixZQUFZO0lBbEJ4QixRQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDVixhQUFhO1lBQ2IsZUFBZTtZQUNmLDBCQUEwQjtZQUMxQixzQkFBc0I7U0FDekI7UUFDRCxPQUFPLEVBQUU7WUFDTCxZQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCxlQUFlO1lBQ2YsYUFBYTtZQUNiLDBCQUEwQjtZQUMxQixzQkFBc0I7U0FDekI7UUFDRCxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQztLQUM3RSxDQUFDO0dBQ1csWUFBWSxDQUFJO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRm9sbG93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZvbGxvdy9mb2xsb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFJhbmdlRGF0ZVBpcGUgfSBmcm9tICcuL3BpcGVzL3RzLWRhdGUtcmFuZ2UucGlwZSc7XG5pbXBvcnQgeyBUZXh0T3ZlcmZsb3dDbGFtcERpcmVjdGl2ZSB9IGZyb20gJy4vcGlwZXMvdGV4dC1vdmVyZmxvdy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGltZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RpbWUuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdXNlci1zZXJ2aWNlJztcbmltcG9ydCB7IEZvbGxvd1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ZvbGxvdy5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFBbmFseXRpY3NEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYW5hbHl0aWNzL2RhdGEtYW5hbHl0aWNzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEYXRhQ29sbGVjdG9yU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYW5hbHl0aWNzL2RhdGEtY29sbGVjdG9yLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJhbmdlRGF0ZVBpcGUsXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUsXG4gICAgICAgIERhdGFBbmFseXRpY3NEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgUmFuZ2VEYXRlUGlwZSxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUsXG4gICAgICAgIERhdGFBbmFseXRpY3NEaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1RpbWVTZXJ2aWNlLCBVc2VyU2VydmljZSwgRm9sbG93U2VydmljZSwgRGF0YUNvbGxlY3RvclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7IH1cbiJdfQ==