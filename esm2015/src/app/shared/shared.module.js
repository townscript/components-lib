import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from './services/time.service';
import { ApiService } from './services/api-service';
import { UserService } from './services/user-service';
import { RangeDatePipe } from './pipes/ts-date-range.pipe';
import { FollowComponent } from './components/follow/follow.component';
import { FollowService } from './services/follow.service';
import { TextOverflowClampDirective } from './pipes/text-overflow.directive';
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
        providers: [TimeService, ApiService, UserService, FollowService]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zaGFyZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWtCN0UsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUFJLENBQUE7QUFBaEIsWUFBWTtJQWhCeEIsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1YsYUFBYTtZQUNiLGVBQWU7WUFDZiwwQkFBMEI7U0FDN0I7UUFDRCxPQUFPLEVBQUU7WUFDTCxZQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCxlQUFlO1lBQ2YsYUFBYTtZQUNiLDBCQUEwQjtTQUM3QjtRQUNELFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQztLQUNuRSxDQUFDO0dBQ1csWUFBWSxDQUFJO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXBpLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBSYW5nZURhdGVQaXBlIH0gZnJvbSAnLi9waXBlcy90cy1kYXRlLXJhbmdlLnBpcGUnO1xuaW1wb3J0IHsgRm9sbG93Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZvbGxvdy9mb2xsb3cuY29tcG9uZW50JztcbmltcG9ydCB7IEZvbGxvd1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2ZvbGxvdy5zZXJ2aWNlJztcbmltcG9ydCB7IFRleHRPdmVyZmxvd0NsYW1wRGlyZWN0aXZlIH0gZnJvbSAnLi9waXBlcy90ZXh0LW92ZXJmbG93LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJhbmdlRGF0ZVBpcGUsXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgUmFuZ2VEYXRlUGlwZSxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1RpbWVTZXJ2aWNlLCBBcGlTZXJ2aWNlLCBVc2VyU2VydmljZSwgRm9sbG93U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHsgfVxuIl19