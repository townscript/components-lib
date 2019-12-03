import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowComponent } from './components/follow/follow.component';
import { RangeDatePipe } from './pipes/ts-date-range.pipe';
import { TextOverflowClampDirective } from './pipes/text-overflow.directive';
import { TimeService } from './services/time.service';
import { UserService } from './services/user-service';
import { FollowService } from './services/follow.service';
let SharedModule = class SharedModule {
};
SharedModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            RangeDatePipe,
            FollowComponent,
            TextOverflowClampDirective
        ],
        imports: [
            CommonModule
        ],
        exports: [
            FollowComponent,
            RangeDatePipe,
            TextOverflowClampDirective
        ],
        providers: [TimeService, UserService, FollowService]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zaGFyZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBbUIxRCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUksQ0FBQTtBQUFoQixZQUFZO0lBaEJ4QixRQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDVixhQUFhO1lBQ2IsZUFBZTtZQUNmLDBCQUEwQjtTQUM3QjtRQUNELE9BQU8sRUFBRTtZQUNMLFlBQVk7U0FDZjtRQUNELE9BQU8sRUFBRTtZQUNMLGVBQWU7WUFDZixhQUFhO1lBQ2IsMEJBQTBCO1NBQzdCO1FBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUM7S0FDdkQsQ0FBQztHQUNXLFlBQVksQ0FBSTtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IEZvbGxvd0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb2xsb3cvZm9sbG93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYW5nZURhdGVQaXBlIH0gZnJvbSAnLi9waXBlcy90cy1kYXRlLXJhbmdlLnBpcGUnO1xuaW1wb3J0IHsgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUgfSBmcm9tICcuL3BpcGVzL3RleHQtb3ZlcmZsb3cuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBGb2xsb3dTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb2xsb3cuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUmFuZ2VEYXRlUGlwZSxcbiAgICAgICAgRm9sbG93Q29tcG9uZW50LFxuICAgICAgICBUZXh0T3ZlcmZsb3dDbGFtcERpcmVjdGl2ZVxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgRm9sbG93Q29tcG9uZW50LFxuICAgICAgICBSYW5nZURhdGVQaXBlLFxuICAgICAgICBUZXh0T3ZlcmZsb3dDbGFtcERpcmVjdGl2ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbVGltZVNlcnZpY2UsIFVzZXJTZXJ2aWNlLCBGb2xsb3dTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUgeyB9XG4iXX0=