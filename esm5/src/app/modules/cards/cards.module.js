import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsFormsModule } from '@townscript/elements';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserService } from '../../core/browser.service';
import { SharedModule } from '../../shared/shared.module';
// import { TsListingCardComponent } from './ts-listing-card/ts-listing-card.component';
import { TsCardSkeletonComponent } from './ts-card-skeleton/ts-card-skeleton.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TsListingEventCardComponent } from './ts-listings-event-card/ts-listings-event-card.component';
import { ShareEventModalComponent } from './ts-listings-event-card/share-event-modal/share-event-modal.component';
var CardsModule = /** @class */ (function () {
    function CardsModule() {
    }
    CardsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                TsFormsModule,
                SharedModule,
                MatTooltipModule,
                LazyLoadImageModule
            ],
            declarations: [
                // TsListingCardComponent,
                ShareEventModalComponent,
                TsCardSkeletonComponent,
                TsListingEventCardComponent
            ],
            exports: [
                // TsListingCardComponent,
                ShareEventModalComponent,
                TsCardSkeletonComponent,
                TsListingEventCardComponent
            ],
            entryComponents: [
                ShareEventModalComponent
            ],
            providers: [
                BrowserService
            ]
        })
    ], CardsModule);
    return CardsModule;
}());
export { CardsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy9jYXJkcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELHdGQUF3RjtBQUN4RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN4RyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQTZCbEg7SUFBQTtJQUEyQixDQUFDO0lBQWYsV0FBVztRQTNCdkIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixZQUFZO2dCQUNaLGdCQUFnQjtnQkFDaEIsbUJBQW1CO2FBQ3RCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDBCQUEwQjtnQkFDMUIsd0JBQXdCO2dCQUN4Qix1QkFBdUI7Z0JBQ3ZCLDJCQUEyQjthQUM5QjtZQUNELE9BQU8sRUFBRTtnQkFDTCwwQkFBMEI7Z0JBQzFCLHdCQUF3QjtnQkFDeEIsdUJBQXVCO2dCQUN2QiwyQkFBMkI7YUFDOUI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2Isd0JBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGNBQWM7YUFDakI7U0FDSixDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBQSxBQUE1QixJQUE0QjtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRzRm9ybXNNb2R1bGUgfSBmcm9tICdAdG93bnNjcmlwdC9lbGVtZW50cyc7XG5pbXBvcnQgeyBMYXp5TG9hZEltYWdlTW9kdWxlIH0gZnJvbSAnbmctbGF6eWxvYWQtaW1hZ2UnO1xuaW1wb3J0IHsgQnJvd3NlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2Jyb3dzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG4vLyBpbXBvcnQgeyBUc0xpc3RpbmdDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi90cy1saXN0aW5nLWNhcmQvdHMtbGlzdGluZy1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudCB9IGZyb20gJy4vdHMtY2FyZC1za2VsZXRvbi90cy1jYXJkLXNrZWxldG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBUc0xpc3RpbmdFdmVudENhcmRDb21wb25lbnQgfSBmcm9tICcuL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQvdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi90cy1saXN0aW5ncy1ldmVudC1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFRzRm9ybXNNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgTGF6eUxvYWRJbWFnZU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIC8vIFRzTGlzdGluZ0NhcmRDb21wb25lbnQsXG4gICAgICAgIFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCxcbiAgICAgICAgVHNDYXJkU2tlbGV0b25Db21wb25lbnQsXG4gICAgICAgIFRzTGlzdGluZ0V2ZW50Q2FyZENvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICAvLyBUc0xpc3RpbmdDYXJkQ29tcG9uZW50LFxuICAgICAgICBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQsXG4gICAgICAgIFRzQ2FyZFNrZWxldG9uQ29tcG9uZW50LFxuICAgICAgICBUc0xpc3RpbmdFdmVudENhcmRDb21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBCcm93c2VyU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FyZHNNb2R1bGUgeyB9XG4iXX0=