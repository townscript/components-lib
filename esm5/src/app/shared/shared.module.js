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
import { SharedService } from './services/shared.service';
import { CitySelectionModalComponent } from './components/city-selection/city-selection.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CitySearchPopupComponent } from './components/city-search-popup/city-search-popup.component';
import { FormsModule } from '@angular/forms';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                RangeDatePipe,
                FollowComponent,
                TextOverflowClampDirective,
                DataAnalyticsDirective,
                CitySelectionModalComponent,
                CitySearchPopupComponent
            ],
            imports: [
                CommonModule,
                MatProgressSpinnerModule,
                FormsModule
            ],
            exports: [
                FollowComponent,
                RangeDatePipe,
                TextOverflowClampDirective,
                DataAnalyticsDirective,
                CitySelectionModalComponent,
                CitySearchPopupComponent
            ],
            providers: [SharedService, TimeService, UserService, FollowService, DataCollectorService, UtilityService]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zaGFyZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdEcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBMEI3QztJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQXhCeEIsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFO2dCQUNWLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZiwwQkFBMEI7Z0JBQzFCLHNCQUFzQjtnQkFDdEIsMkJBQTJCO2dCQUMzQix3QkFBd0I7YUFDM0I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWix3QkFBd0I7Z0JBQ3hCLFdBQVc7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDTCxlQUFlO2dCQUNmLGFBQWE7Z0JBQ2IsMEJBQTBCO2dCQUMxQixzQkFBc0I7Z0JBQ3RCLDJCQUEyQjtnQkFDM0Isd0JBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLGNBQWMsQ0FBQztTQUM1RyxDQUFDO09BQ1csWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZvbGxvd0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb2xsb3cvZm9sbG93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYW5nZURhdGVQaXBlIH0gZnJvbSAnLi9waXBlcy90cy1kYXRlLXJhbmdlLnBpcGUnO1xuaW1wb3J0IHsgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUgfSBmcm9tICcuL3BpcGVzL3RleHQtb3ZlcmZsb3cuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBGb2xsb3dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb2xsb3cuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhQW5hbHl0aWNzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FuYWx5dGljcy9kYXRhLWFuYWx5dGljcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0YUNvbGxlY3RvclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2FuYWx5dGljcy9kYXRhLWNvbGxlY3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91dGlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDaXR5U2VsZWN0aW9uTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2l0eS1zZWxlY3Rpb24vY2l0eS1zZWxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXInO1xuaW1wb3J0IHsgQ2l0eVNlYXJjaFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NpdHktc2VhcmNoLXBvcHVwL2NpdHktc2VhcmNoLXBvcHVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUmFuZ2VEYXRlUGlwZSxcbiAgICAgICAgRm9sbG93Q29tcG9uZW50LFxuICAgICAgICBUZXh0T3ZlcmZsb3dDbGFtcERpcmVjdGl2ZSxcbiAgICAgICAgRGF0YUFuYWx5dGljc0RpcmVjdGl2ZSxcbiAgICAgICAgQ2l0eVNlbGVjdGlvbk1vZGFsQ29tcG9uZW50LFxuICAgICAgICBDaXR5U2VhcmNoUG9wdXBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgUmFuZ2VEYXRlUGlwZSxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUsXG4gICAgICAgIERhdGFBbmFseXRpY3NEaXJlY3RpdmUsXG4gICAgICAgIENpdHlTZWxlY3Rpb25Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgQ2l0eVNlYXJjaFBvcHVwQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtTaGFyZWRTZXJ2aWNlLCBUaW1lU2VydmljZSwgVXNlclNlcnZpY2UsIEZvbGxvd1NlcnZpY2UsIERhdGFDb2xsZWN0b3JTZXJ2aWNlLCBVdGlsaXR5U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHsgfVxuIl19