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
import { SharedModule } from '../../shared/shared.module';
import { DataCollectorService } from '../../shared/services/analytics/data-collector.service';
let TsLoginSignupModule = class TsLoginSignupModule {
};
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
            MatProgressSpinnerModule,
            SharedModule
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
            TsLoginSignupService,
            DataCollectorService
        ]
    })
], TsLoginSignupModule);
export { TsLoginSignupModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tc2lnbnVwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbG9naW5TaWdudXAvbG9naW4tc2lnbnVwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkksT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUMxRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQUN6RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFvQzlGLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0NBQy9CLENBQUE7QUFEWSxtQkFBbUI7SUFsQy9CLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixXQUFXO1lBQ1gsYUFBYTtZQUNiLG1CQUFtQjtZQUNuQixlQUFlO1lBQ2YsZUFBZTtZQUNmLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2QsZ0JBQWdCO1lBQ2hCLHdCQUF3QjtZQUN4QixZQUFZO1NBQ2I7UUFDRCxZQUFZLEVBQUU7WUFDWixzQkFBc0I7WUFDdEIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQix3QkFBd0I7U0FDekI7UUFDRCxPQUFPLEVBQUU7WUFDUCxzQkFBc0I7WUFDdEIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQix3QkFBd0I7U0FDekI7UUFDRCxTQUFTLEVBQUU7WUFDVCxhQUFhO1lBQ2IsV0FBVztZQUNYLG1CQUFtQjtZQUNuQixvQkFBb0I7WUFDcEIsb0JBQW9CO1NBQ3JCO0tBQ0YsQ0FBQztHQUNXLG1CQUFtQixDQUMvQjtTQURZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUc0Zvcm1zTW9kdWxlIH0gZnJvbSAnQHRvd25zY3JpcHQvZWxlbWVudHMnO1xuaW1wb3J0IHsgUmVjYXB0Y2hhTW9kdWxlIH0gZnJvbSAnbmctcmVjYXB0Y2hhJztcbmltcG9ydCB7IE1hdFJpcHBsZU1vZHVsZSwgTWF0U25hY2tCYXJNb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRUb29sdGlwTW9kdWxlLCBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBUc0xvZ2luU2lnbnVwQ29tcG9uZW50IH0gZnJvbSAnLi90cy1sb2dpbi1zaWdudXAvdHMtbG9naW4tc2lnbnVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvY29va2llLnNlcnZpY2UnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi90cy1sb2dpbi1zaWdudXAvbG9naW4tbW9kYWwvbG9naW4tbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEVtYWlsU2VudFNWR0NvbXBvbmVudCB9IGZyb20gJy4vdHMtbG9naW4tc2lnbnVwL2VtYWlsLXNlbnQtc3ZnL2VtYWlsLXNlbnQtc3ZnLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUc0xvZ2luU2lnbnVwU2VydmljZSB9IGZyb20gJy4vdHMtbG9naW4tc2lnbnVwL3RzLWxvZ2luLXNpZ251cC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1hdGlvblNWR0NvbXBvbmVudCB9IGZyb20gJy4vdHMtbG9naW4tc2lnbnVwL2NvbmZpcm1hdGlvbi1zdmcvY29uZmlybWF0aW9uLXN2Zy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0YUNvbGxlY3RvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYW5hbHl0aWNzL2RhdGEtY29sbGVjdG9yLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFRzRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBSZWNhcHRjaGFNb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUc0xvZ2luU2lnbnVwQ29tcG9uZW50LFxuICAgIExvZ2luTW9kYWxDb21wb25lbnQsXG4gICAgRW1haWxTZW50U1ZHQ29tcG9uZW50LFxuICAgIENvbmZpcm1hdGlvblNWR0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVHNMb2dpblNpZ251cENvbXBvbmVudCxcbiAgICBMb2dpbk1vZGFsQ29tcG9uZW50LFxuICAgIEVtYWlsU2VudFNWR0NvbXBvbmVudCxcbiAgICBDb25maXJtYXRpb25TVkdDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29va2llU2VydmljZSxcbiAgICBVc2VyU2VydmljZSxcbiAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgIFRzTG9naW5TaWdudXBTZXJ2aWNlLFxuICAgIERhdGFDb2xsZWN0b3JTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVHNMb2dpblNpZ251cE1vZHVsZSB7XG59XG4iXX0=