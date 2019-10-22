import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TsFormsModule } from '@townscript/elements';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule, MatSnackBarModule, MatInputModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';
import { TsLoginSignupComponent } from './ts-login-signup/ts-login-signup.component';
import { ApiService } from '../../shared/services/api-service';
import { UserService } from '../../shared/services/user-service';
import { CookieService } from '../../core/cookie.service';
import { NotificationService } from '../../shared/services/notification.service';
import { LoginModalComponent } from './ts-login-signup/login-modal/login-modal.component';
import { EmailSentSVGComponent } from './ts-login-signup/email-sent-svg/email-sent-svg.component';
import { TsLoginSignupService } from './ts-login-signup/ts-login-signup.service';
var TsLoginSignupModule = /** @class */ (function () {
    function TsLoginSignupModule() {
    }
    TsLoginSignupModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                TsFormsModule,
                ReactiveFormsModule,
                RecaptchaModule,
                HttpClientModule,
                MatRippleModule,
                MatSnackBarModule,
                MatInputModule,
                MatTooltipModule,
                MatProgressSpinnerModule
            ],
            declarations: [
                TsLoginSignupComponent,
                LoginModalComponent,
                EmailSentSVGComponent
            ],
            exports: [
                TsLoginSignupComponent,
                LoginModalComponent,
                EmailSentSVGComponent
            ],
            providers: [
                ApiService,
                CookieService,
                UserService,
                NotificationService,
                TsLoginSignupService
            ]
        })
    ], TsLoginSignupModule);
    return TsLoginSignupModule;
}());
export { TsLoginSignupModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tc2lnbnVwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvbG9naW4tc2lnbnVwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkksT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDbEcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFrQ2pGO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixtQkFBbUI7UUFoQy9CLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsYUFBYTtnQkFDYixtQkFBbUI7Z0JBQ25CLGVBQWU7Z0JBQ2YsZ0JBQWdCO2dCQUNoQixlQUFlO2dCQUNmLGlCQUFpQjtnQkFDakIsY0FBYztnQkFDZCxnQkFBZ0I7Z0JBQ2hCLHdCQUF3QjthQUN6QjtZQUNELFlBQVksRUFBRTtnQkFDWixzQkFBc0I7Z0JBQ3RCLG1CQUFtQjtnQkFDbkIscUJBQXFCO2FBQ3RCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHNCQUFzQjtnQkFDdEIsbUJBQW1CO2dCQUNuQixxQkFBcUI7YUFDdEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsVUFBVTtnQkFDVixhQUFhO2dCQUNiLFdBQVc7Z0JBQ1gsbUJBQW1CO2dCQUNuQixvQkFBb0I7YUFDckI7U0FDRixDQUFDO09BQ1csbUJBQW1CLENBQUk7SUFBRCwwQkFBQztDQUFBLEFBQXBDLElBQW9DO1NBQXZCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUc0Zvcm1zTW9kdWxlIH0gZnJvbSAnQHRvd25zY3JpcHQvZWxlbWVudHMnO1xuaW1wb3J0IHsgUmVjYXB0Y2hhTW9kdWxlIH0gZnJvbSAnbmctcmVjYXB0Y2hhJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNYXRSaXBwbGVNb2R1bGUsIE1hdFNuYWNrQmFyTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSwgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHNMb2dpblNpZ251cENvbXBvbmVudCB9IGZyb20gJy4vdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGktc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEVtYWlsU2VudFNWR0NvbXBvbmVudCB9IGZyb20gJy4vdHMtbG9naW4tc2lnbnVwL2VtYWlsLXNlbnQtc3ZnL2VtYWlsLXNlbnQtc3ZnLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUc0xvZ2luU2lnbnVwU2VydmljZSB9IGZyb20gJy4vdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBUc0Zvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgUmVjYXB0Y2hhTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRzTG9naW5TaWdudXBDb21wb25lbnQsXG4gICAgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICBFbWFpbFNlbnRTVkdDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRzTG9naW5TaWdudXBDb21wb25lbnQsXG4gICAgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICBFbWFpbFNlbnRTVkdDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQXBpU2VydmljZSxcbiAgICBDb29raWVTZXJ2aWNlLFxuICAgIFVzZXJTZXJ2aWNlLFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgVHNMb2dpblNpZ251cFNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUc0xvZ2luU2lnbnVwTW9kdWxlIHsgfVxuIl19