import { __decorate } from "tslib";
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
import { CountDownComponent } from './components/count-down/count-down.component';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            declarations: [
                RangeDatePipe,
                FollowComponent,
                TextOverflowClampDirective,
                DataAnalyticsDirective,
                CitySelectionModalComponent,
                CitySearchPopupComponent,
                CountDownComponent
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
                CitySearchPopupComponent,
                CountDownComponent
            ],
            providers: [SharedService, TimeService, UserService, FollowService, DataCollectorService, UtilityService]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zaGFyZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDbkcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDOUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNERBQTRELENBQUM7QUFDdEcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBNEJsRjtJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQTFCeEIsUUFBUSxDQUFDO1lBQ04sWUFBWSxFQUFFO2dCQUNWLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZiwwQkFBMEI7Z0JBQzFCLHNCQUFzQjtnQkFDdEIsMkJBQTJCO2dCQUMzQix3QkFBd0I7Z0JBQ3hCLGtCQUFrQjthQUNyQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLHdCQUF3QjtnQkFDeEIsV0FBVzthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGVBQWU7Z0JBQ2YsYUFBYTtnQkFDYiwwQkFBMEI7Z0JBQzFCLHNCQUFzQjtnQkFDdEIsMkJBQTJCO2dCQUMzQix3QkFBd0I7Z0JBQ3hCLGtCQUFrQjthQUNyQjtZQUNELFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLENBQUM7U0FDNUcsQ0FBQztPQUNXLFlBQVksQ0FBSTtJQUFELG1CQUFDO0NBQUEsQUFBN0IsSUFBNkI7U0FBaEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBGb2xsb3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9sbG93L2ZvbGxvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmFuZ2VEYXRlUGlwZSB9IGZyb20gJy4vcGlwZXMvdHMtZGF0ZS1yYW5nZS5waXBlJztcbmltcG9ydCB7IFRleHRPdmVyZmxvd0NsYW1wRGlyZWN0aXZlIH0gZnJvbSAnLi9waXBlcy90ZXh0LW92ZXJmbG93LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUaW1lU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGltZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgRm9sbG93U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9sbG93LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YUFuYWx5dGljc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbmFseXRpY3MvZGF0YS1hbmFseXRpY3MuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhdGFDb2xsZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hbmFseXRpY3MvZGF0YS1jb2xsZWN0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsaXR5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2l0eVNlbGVjdGlvbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NpdHktc2VsZWN0aW9uL2NpdHktc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1zcGlubmVyJztcbmltcG9ydCB7IENpdHlTZWFyY2hQb3B1cENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jaXR5LXNlYXJjaC1wb3B1cC9jaXR5LXNlYXJjaC1wb3B1cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb3VudERvd25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY291bnQtZG93bi9jb3VudC1kb3duLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJhbmdlRGF0ZVBpcGUsXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUsXG4gICAgICAgIERhdGFBbmFseXRpY3NEaXJlY3RpdmUsXG4gICAgICAgIENpdHlTZWxlY3Rpb25Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgQ2l0eVNlYXJjaFBvcHVwQ29tcG9uZW50LFxuICAgICAgICBDb3VudERvd25Db21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgUmFuZ2VEYXRlUGlwZSxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUsXG4gICAgICAgIERhdGFBbmFseXRpY3NEaXJlY3RpdmUsXG4gICAgICAgIENpdHlTZWxlY3Rpb25Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgQ2l0eVNlYXJjaFBvcHVwQ29tcG9uZW50LFxuICAgICAgICBDb3VudERvd25Db21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1NoYXJlZFNlcnZpY2UsIFRpbWVTZXJ2aWNlLCBVc2VyU2VydmljZSwgRm9sbG93U2VydmljZSwgRGF0YUNvbGxlY3RvclNlcnZpY2UsIFV0aWxpdHlTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUgeyB9XG4iXX0=