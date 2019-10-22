import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDatePipe, TextOverflowClampDirective } from './pipes/index';
import { FollowComponent } from './components/follow/follow.component';
import { TimeService, UserService, FollowService } from './services/index';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
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
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3NoYXJlZC9zaGFyZWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLDBCQUEwQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQ0gsV0FBVyxFQUNYLFdBQVcsRUFDWCxhQUFhLEVBQ2hCLE1BQU0sa0JBQWtCLENBQUM7QUFrQjFCO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixZQUFZO1FBaEJ4QixRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1YsYUFBYTtnQkFDYixlQUFlO2dCQUNmLDBCQUEwQjthQUM3QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxZQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsZUFBZTtnQkFDZixhQUFhO2dCQUNiLDBCQUEwQjthQUM3QjtZQUNELFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDO1NBQ3ZELENBQUM7T0FDVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUFBLEFBQTdCLElBQTZCO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgUmFuZ2VEYXRlUGlwZSwgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmUgfSBmcm9tICcuL3BpcGVzL2luZGV4JztcbmltcG9ydCB7IEZvbGxvd0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb2xsb3cvZm9sbG93LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIFRpbWVTZXJ2aWNlLFxuICAgIFVzZXJTZXJ2aWNlLFxuICAgIEZvbGxvd1NlcnZpY2Vcbn0gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJhbmdlRGF0ZVBpcGUsXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEZvbGxvd0NvbXBvbmVudCxcbiAgICAgICAgUmFuZ2VEYXRlUGlwZSxcbiAgICAgICAgVGV4dE92ZXJmbG93Q2xhbXBEaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1RpbWVTZXJ2aWNlLCBVc2VyU2VydmljZSwgRm9sbG93U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHsgfVxuIl19