import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsFormsModule } from '@townscript/elements';
import { BrowserService } from '../../core/browser.service';
import { SharedModule } from '../../shared/shared.module';
import { TsListingCardComponent } from './ts-listing-card/ts-listing-card.component';
import { ShareEventModalComponent } from './ts-listing-card/share-event-modal/share-event-modal.component';
import { TsCardSkeletonComponent } from './ts-card-skeleton/ts-card-skeleton.component';
import { MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
var CardsModule = /** @class */ (function () {
    function CardsModule() {
    }
    CardsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                TsFormsModule,
                SharedModule,
                MatTooltipModule,
                RouterModule.forRoot([])
            ],
            declarations: [
                TsListingCardComponent,
                ShareEventModalComponent,
                TsCardSkeletonComponent
            ],
            exports: [
                TsFormsModule,
                TsListingCardComponent,
                ShareEventModalComponent,
                TsCardSkeletonComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy9jYXJkcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWdDL0M7SUFBQTtJQUEyQixDQUFDO0lBQWYsV0FBVztRQTlCdkIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osYUFBYTtnQkFDYixZQUFZO2dCQUNaLGdCQUFnQjtnQkFDaEIsWUFBWSxDQUFDLE9BQU8sQ0FDcEIsRUFFQyxDQUNBO2FBQ0o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLHVCQUF1QjthQUMxQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxhQUFhO2dCQUNiLHNCQUFzQjtnQkFDdEIsd0JBQXdCO2dCQUN4Qix1QkFBdUI7YUFDMUI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2Isd0JBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGNBQWM7YUFDakI7U0FDSixDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBQSxBQUE1QixJQUE0QjtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRzRm9ybXNNb2R1bGUgfSBmcm9tICdAdG93bnNjcmlwdC9lbGVtZW50cyc7XG5cbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9icm93c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgVHNMaXN0aW5nQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vdHMtbGlzdGluZy1jYXJkL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi90cy1saXN0aW5nLWNhcmQvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFRzQ2FyZFNrZWxldG9uQ29tcG9uZW50IH0gZnJvbSAnLi90cy1jYXJkLXNrZWxldG9uL3RzLWNhcmQtc2tlbGV0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUc0Zvcm1zTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JSb290KFxuICAgICAgICBbXG5cbiAgICAgICAgXVxuICAgICAgICApXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVHNMaXN0aW5nQ2FyZENvbXBvbmVudCxcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBUc0Zvcm1zTW9kdWxlLFxuICAgICAgICBUc0xpc3RpbmdDYXJkQ29tcG9uZW50LFxuICAgICAgICBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQsXG4gICAgICAgIFRzQ2FyZFNrZWxldG9uQ29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQnJvd3NlclNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENhcmRzTW9kdWxlIHsgfVxuIl19