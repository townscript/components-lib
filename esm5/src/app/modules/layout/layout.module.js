import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TsFormsModule } from '@townscript/elements';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserService } from '../../core/browser.service';
import { TimeService } from '../../shared/services/time.service';
import { TsLoginSignupModule } from '../../modules/loginSignup/login-signup.module';
import { UserService } from '../../shared/services/user-service';
import { TsHeaderComponent } from './components/ts-header/ts-header.component';
import { TsFooterComponent } from './components/ts-footer/ts-footer.component';
import { SearchComponent } from './components/ts-header/search/search.component';
import { UserMenuComponent } from './components/ts-header/user-menu/user-menu.component';
import { HeaderService } from './components/ts-header/ts-header.service';
import { FooterService } from './components/ts-footer/ts-footer.service';
import { SharedModule } from '../../shared/shared.module';
import { DataCollectorService } from '../../shared/services/analytics/data-collector.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HamburgerMenuComponent } from './components/ts-header/hamburger-menu/hamburger-menu.component';
import { SearchSuggestionComponent } from './components/ts-header/search-suggestion/search-suggestion.component';
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                SharedModule,
                FormsModule,
                MatRippleModule,
                MatSnackBarModule,
                TsLoginSignupModule,
                TsFormsModule,
                LazyLoadImageModule
            ],
            declarations: [
                TsHeaderComponent,
                TsFooterComponent,
                SearchComponent,
                UserMenuComponent,
                HamburgerMenuComponent,
                SearchSuggestionComponent,
            ],
            exports: [
                TsHeaderComponent,
                TsFooterComponent,
                SearchComponent,
                UserMenuComponent,
                HamburgerMenuComponent,
                SearchSuggestionComponent
            ],
            providers: [
                TimeService,
                DatePipe,
                HeaderService,
                BrowserService,
                UserService,
                FooterService,
                DataCollectorService
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());
export { LayoutModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0b3duc2NyaXB0L2NvbXBvbmVudHMvIiwic291cmNlcyI6WyJzcmMvYXBwL21vZHVsZXMvbGF5b3V0L2xheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDekYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDOUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDeEcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0VBQXNFLENBQUM7QUF1Q2pIO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixZQUFZO1FBckN4QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsZUFBZTtnQkFDZixpQkFBaUI7Z0JBQ2pCLG1CQUFtQjtnQkFDbkIsYUFBYTtnQkFDYixtQkFBbUI7YUFDcEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osaUJBQWlCO2dCQUNqQixpQkFBaUI7Z0JBQ2pCLGVBQWU7Z0JBQ2YsaUJBQWlCO2dCQUNqQixzQkFBc0I7Z0JBQ3RCLHlCQUF5QjthQUMxQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxpQkFBaUI7Z0JBQ2pCLGlCQUFpQjtnQkFDakIsZUFBZTtnQkFDZixpQkFBaUI7Z0JBQ2pCLHNCQUFzQjtnQkFDdEIseUJBQXlCO2FBQzFCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFdBQVc7Z0JBQ1gsUUFBUTtnQkFDUixhQUFhO2dCQUNiLGNBQWM7Z0JBQ2QsV0FBVztnQkFDWCxhQUFhO2dCQUNiLG9CQUFvQjthQUNyQjtTQUNGLENBQUM7T0FDVyxZQUFZLENBQUk7SUFBRCxtQkFBQztDQUFBLEFBQTdCLElBQTZCO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRzRm9ybXNNb2R1bGUgfSBmcm9tICdAdG93bnNjcmlwdC9lbGVtZW50cyc7XG5pbXBvcnQgeyBNYXRSaXBwbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcblxuaW1wb3J0IHsgQnJvd3NlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2Jyb3dzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBUaW1lU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy90aW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgVHNMb2dpblNpZ251cE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvbG9naW5TaWdudXAvbG9naW4tc2lnbnVwLm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuaW1wb3J0IHsgVHNIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHMtaGVhZGVyL3RzLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHNGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHMtZm9vdGVyL3RzLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RzLWhlYWRlci9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyTWVudUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90cy1oZWFkZXIvdXNlci1tZW51L3VzZXItbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVhZGVyU2VydmljZSB9IGZyb20gJy4vY29tcG9uZW50cy90cy1oZWFkZXIvdHMtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRm9vdGVyU2VydmljZSB9IGZyb20gJy4vY29tcG9uZW50cy90cy1mb290ZXIvdHMtZm9vdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgRGF0YUNvbGxlY3RvclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvYW5hbHl0aWNzL2RhdGEtY29sbGVjdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF6eUxvYWRJbWFnZU1vZHVsZSB9IGZyb20gJ25nLWxhenlsb2FkLWltYWdlJztcbmltcG9ydCB7IEhhbWJ1cmdlck1lbnVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdHMtaGVhZGVyL2hhbWJ1cmdlci1tZW51L2hhbWJ1cmdlci1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hTdWdnZXN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RzLWhlYWRlci9zZWFyY2gtc3VnZ2VzdGlvbi9zZWFyY2gtc3VnZ2VzdGlvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgVHNMb2dpblNpZ251cE1vZHVsZSxcbiAgICBUc0Zvcm1zTW9kdWxlLFxuICAgIExhenlMb2FkSW1hZ2VNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVHNIZWFkZXJDb21wb25lbnQsXG4gICAgVHNGb290ZXJDb21wb25lbnQsXG4gICAgU2VhcmNoQ29tcG9uZW50LFxuICAgIFVzZXJNZW51Q29tcG9uZW50LFxuICAgIEhhbWJ1cmdlck1lbnVDb21wb25lbnQsXG4gICAgU2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRzSGVhZGVyQ29tcG9uZW50LFxuICAgIFRzRm9vdGVyQ29tcG9uZW50LFxuICAgIFNlYXJjaENvbXBvbmVudCxcbiAgICBVc2VyTWVudUNvbXBvbmVudCxcbiAgICBIYW1idXJnZXJNZW51Q29tcG9uZW50LFxuICAgIFNlYXJjaFN1Z2dlc3Rpb25Db21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVGltZVNlcnZpY2UsXG4gICAgRGF0ZVBpcGUsXG4gICAgSGVhZGVyU2VydmljZSxcbiAgICBCcm93c2VyU2VydmljZSxcbiAgICBVc2VyU2VydmljZSxcbiAgICBGb290ZXJTZXJ2aWNlLFxuICAgIERhdGFDb2xsZWN0b3JTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTGF5b3V0TW9kdWxlIHsgfVxuIl19