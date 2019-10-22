import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TsFormsModule } from '@townscript/elements';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserService } from '../../core/browser.service';
import { TimeService } from '../../shared/services/time.service';
import { TsLoginSignupModule } from '../../modules/loginSignup/login-signup.module';
import { UserService } from '../../shared/services/user-service';
import { TsHeaderComponent, TsFooterComponent, SearchComponent, CitySearchPopupComponent, FooterService, HeaderService, UserMenuComponent } from './components/index';
let LayoutModule = class LayoutModule {
};
LayoutModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            HttpClientModule,
            MatRippleModule,
            MatSnackBarModule,
            TsLoginSignupModule,
            TsFormsModule
        ],
        declarations: [
            TsHeaderComponent,
            TsFooterComponent,
            SearchComponent,
            CitySearchPopupComponent,
            UserMenuComponent
        ],
        exports: [
            TsHeaderComponent,
            TsFooterComponent,
            SearchComponent,
            CitySearchPopupComponent,
            UserMenuComponent
        ],
        providers: [
            TimeService,
            DatePipe,
            HeaderService,
            BrowserService,
            UserService,
            FooterService
        ]
    })
], LayoutModule);
export { LayoutModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2xheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVqRSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3hCLGFBQWEsRUFDYixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sb0JBQW9CLENBQUM7QUFvQzVCLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FBSSxDQUFBO0FBQWhCLFlBQVk7SUFqQ3hCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixXQUFXO1lBQ1gsZ0JBQWdCO1lBQ2hCLGVBQWU7WUFDZixpQkFBaUI7WUFDakIsbUJBQW1CO1lBQ25CLGFBQWE7U0FDZDtRQUNELFlBQVksRUFBRTtZQUNaLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsZUFBZTtZQUNmLHdCQUF3QjtZQUN4QixpQkFBaUI7U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxpQkFBaUI7WUFDakIsaUJBQWlCO1lBQ2pCLGVBQWU7WUFDZix3QkFBd0I7WUFDeEIsaUJBQWlCO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsV0FBVztZQUNYLFFBQVE7WUFDUixhQUFhO1lBQ2IsY0FBYztZQUNkLFdBQVc7WUFDWCxhQUFhO1NBQ2Q7S0FDRixDQUFDO0dBQ1csWUFBWSxDQUFJO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRzRm9ybXNNb2R1bGUgfSBmcm9tICdAdG93bnNjcmlwdC9lbGVtZW50cyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTWF0UmlwcGxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRTbmFja0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5cbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9icm93c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvdGltZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRzTG9naW5TaWdudXBNb2R1bGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2xvZ2luU2lnbnVwL2xvZ2luLXNpZ251cC5tb2R1bGUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1zZXJ2aWNlJztcblxuaW1wb3J0IHtcbiAgVHNIZWFkZXJDb21wb25lbnQsXG4gIFRzRm9vdGVyQ29tcG9uZW50LFxuICBTZWFyY2hDb21wb25lbnQsXG4gIENpdHlTZWFyY2hQb3B1cENvbXBvbmVudCxcbiAgRm9vdGVyU2VydmljZSxcbiAgSGVhZGVyU2VydmljZSxcbiAgVXNlck1lbnVDb21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzL2luZGV4JztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIFRzTG9naW5TaWdudXBNb2R1bGUsXG4gICAgVHNGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUc0hlYWRlckNvbXBvbmVudCxcbiAgICBUc0Zvb3RlckNvbXBvbmVudCxcbiAgICBTZWFyY2hDb21wb25lbnQsXG4gICAgQ2l0eVNlYXJjaFBvcHVwQ29tcG9uZW50LFxuICAgIFVzZXJNZW51Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUc0hlYWRlckNvbXBvbmVudCxcbiAgICBUc0Zvb3RlckNvbXBvbmVudCxcbiAgICBTZWFyY2hDb21wb25lbnQsXG4gICAgQ2l0eVNlYXJjaFBvcHVwQ29tcG9uZW50LFxuICAgIFVzZXJNZW51Q29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFRpbWVTZXJ2aWNlLFxuICAgIERhdGVQaXBlLFxuICAgIEhlYWRlclNlcnZpY2UsXG4gICAgQnJvd3NlclNlcnZpY2UsXG4gICAgVXNlclNlcnZpY2UsXG4gICAgRm9vdGVyU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExheW91dE1vZHVsZSB7IH1cbiJdfQ==