import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TsFormsModule } from '@townscript/elements';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatRippleModule, MatSnackBarModule, MatInputModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';
import { TsLoginSignupComponent } from './ts-login-signup/ts-login-signup.component';
import { UserService } from '../../shared/services/user-service';
import { CookieService } from '../../core/cookie.service';
import { NotificationService } from '../../shared/services/notification.service';
import { LoginModalComponent } from './ts-login-signup/login-modal/login-modal.component';
import { EmailSentSVGComponent } from './ts-login-signup/email-sent-svg/email-sent-svg.component';
import { TsLoginSignupService } from './ts-login-signup/ts-login-signup.service';
import { ConfirmationSVGComponent } from './ts-login-signup/confirmation-svg/confirmation-svg.component';
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
                MatRippleModule,
                MatSnackBarModule,
                MatInputModule,
                MatTooltipModule,
                MatProgressSpinnerModule
            ],
            declarations: [
                TsLoginSignupComponent,
                LoginModalComponent,
                EmailSentSVGComponent,
                ConfirmationSVGComponent
            ],
            exports: [
                TsLoginSignupComponent,
                LoginModalComponent,
                EmailSentSVGComponent,
                ConfirmationSVGComponent
            ],
            providers: [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tc2lnbnVwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvbG9naW4tc2lnbnVwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkksT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUMxRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQWtDekc7SUFBQTtJQUFtQyxDQUFDO0lBQXZCLG1CQUFtQjtRQWhDL0IsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxhQUFhO2dCQUNiLG1CQUFtQjtnQkFDbkIsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGlCQUFpQjtnQkFDakIsY0FBYztnQkFDZCxnQkFBZ0I7Z0JBQ2hCLHdCQUF3QjthQUN6QjtZQUNELFlBQVksRUFBRTtnQkFDWixzQkFBc0I7Z0JBQ3RCLG1CQUFtQjtnQkFDbkIscUJBQXFCO2dCQUNyQix3QkFBd0I7YUFDekI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1Asc0JBQXNCO2dCQUN0QixtQkFBbUI7Z0JBQ25CLHFCQUFxQjtnQkFDckIsd0JBQXdCO2FBQ3pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxtQkFBbUI7Z0JBQ25CLG9CQUFvQjthQUNyQjtTQUNGLENBQUM7T0FDVyxtQkFBbUIsQ0FBSTtJQUFELDBCQUFDO0NBQUEsQUFBcEMsSUFBb0M7U0FBdkIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRzRm9ybXNNb2R1bGUgfSBmcm9tICdAdG93bnNjcmlwdC9lbGVtZW50cyc7XG5pbXBvcnQgeyBSZWNhcHRjaGFNb2R1bGUgfSBmcm9tICduZy1yZWNhcHRjaGEnO1xuaW1wb3J0IHsgTWF0UmlwcGxlTW9kdWxlLCBNYXRTbmFja0Jhck1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFRzTG9naW5TaWdudXBDb21wb25lbnQgfSBmcm9tICcuL3RzLWxvZ2luLXNpZ251cC90cy1sb2dpbi1zaWdudXAuY29tcG9uZW50JztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9jb29raWUuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3RzLWxvZ2luLXNpZ251cC9sb2dpbi1tb2RhbC9sb2dpbi1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRW1haWxTZW50U1ZHQ29tcG9uZW50IH0gZnJvbSAnLi90cy1sb2dpbi1zaWdudXAvZW1haWwtc2VudC1zdmcvZW1haWwtc2VudC1zdmcuY29tcG9uZW50JztcbmltcG9ydCB7IFRzTG9naW5TaWdudXBTZXJ2aWNlIH0gZnJvbSAnLi90cy1sb2dpbi1zaWdudXAvdHMtbG9naW4tc2lnbnVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uU1ZHQ29tcG9uZW50IH0gZnJvbSAnLi90cy1sb2dpbi1zaWdudXAvY29uZmlybWF0aW9uLXN2Zy9jb25maXJtYXRpb24tc3ZnLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgVHNGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJlY2FwdGNoYU1vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVHNMb2dpblNpZ251cENvbXBvbmVudCxcbiAgICBMb2dpbk1vZGFsQ29tcG9uZW50LFxuICAgIEVtYWlsU2VudFNWR0NvbXBvbmVudCxcbiAgICBDb25maXJtYXRpb25TVkdDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRzTG9naW5TaWdudXBDb21wb25lbnQsXG4gICAgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICBFbWFpbFNlbnRTVkdDb21wb25lbnQsXG4gICAgQ29uZmlybWF0aW9uU1ZHQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIENvb2tpZVNlcnZpY2UsXG4gICAgVXNlclNlcnZpY2UsXG4gICAgTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICBUc0xvZ2luU2lnbnVwU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRzTG9naW5TaWdudXBNb2R1bGUgeyB9XG4iXX0=