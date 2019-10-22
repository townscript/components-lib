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
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
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
    return LayoutModule;
}());
export { LayoutModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2xheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUVqRSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3hCLGFBQWEsRUFDYixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2xCLE1BQU0sb0JBQW9CLENBQUM7QUFvQzVCO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixZQUFZO1FBakN4QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixXQUFXO2dCQUNYLGdCQUFnQjtnQkFDaEIsZUFBZTtnQkFDZixpQkFBaUI7Z0JBQ2pCLG1CQUFtQjtnQkFDbkIsYUFBYTthQUNkO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGlCQUFpQjtnQkFDakIsaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLHdCQUF3QjtnQkFDeEIsaUJBQWlCO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLGlCQUFpQjtnQkFDakIsaUJBQWlCO2dCQUNqQixlQUFlO2dCQUNmLHdCQUF3QjtnQkFDeEIsaUJBQWlCO2FBQ2xCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1gsUUFBUTtnQkFDUixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsV0FBVztnQkFDWCxhQUFhO2FBQ2Q7U0FDRixDQUFDO09BQ1csWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBUc0Zvcm1zTW9kdWxlIH0gZnJvbSAnQHRvd25zY3JpcHQvZWxlbWVudHMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1hdFJpcHBsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuXG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvYnJvd3Nlci5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3RpbWUuc2VydmljZSc7XG5pbXBvcnQgeyBUc0xvZ2luU2lnbnVwTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9sb2dpblNpZ251cC9sb2dpbi1zaWdudXAubW9kdWxlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5cbmltcG9ydCB7XG4gIFRzSGVhZGVyQ29tcG9uZW50LFxuICBUc0Zvb3RlckNvbXBvbmVudCxcbiAgU2VhcmNoQ29tcG9uZW50LFxuICBDaXR5U2VhcmNoUG9wdXBDb21wb25lbnQsXG4gIEZvb3RlclNlcnZpY2UsXG4gIEhlYWRlclNlcnZpY2UsXG4gIFVzZXJNZW51Q29tcG9uZW50XG59IGZyb20gJy4vY29tcG9uZW50cy9pbmRleCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBUc0xvZ2luU2lnbnVwTW9kdWxlLFxuICAgIFRzRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVHNIZWFkZXJDb21wb25lbnQsXG4gICAgVHNGb290ZXJDb21wb25lbnQsXG4gICAgU2VhcmNoQ29tcG9uZW50LFxuICAgIENpdHlTZWFyY2hQb3B1cENvbXBvbmVudCxcbiAgICBVc2VyTWVudUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVHNIZWFkZXJDb21wb25lbnQsXG4gICAgVHNGb290ZXJDb21wb25lbnQsXG4gICAgU2VhcmNoQ29tcG9uZW50LFxuICAgIENpdHlTZWFyY2hQb3B1cENvbXBvbmVudCxcbiAgICBVc2VyTWVudUNvbXBvbmVudFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUaW1lU2VydmljZSxcbiAgICBEYXRlUGlwZSxcbiAgICBIZWFkZXJTZXJ2aWNlLFxuICAgIEJyb3dzZXJTZXJ2aWNlLFxuICAgIFVzZXJTZXJ2aWNlLFxuICAgIEZvb3RlclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMYXlvdXRNb2R1bGUgeyB9XG4iXX0=