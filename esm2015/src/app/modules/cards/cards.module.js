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
let CardsModule = class CardsModule {
};
CardsModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            TsFormsModule,
            SharedModule,
            MatTooltipModule,
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
export { CardsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy9jYXJkcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBMkJyRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQUksQ0FBQTtBQUFmLFdBQVc7SUF6QnZCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtZQUNaLGdCQUFnQjtTQUNuQjtRQUNELFlBQVksRUFBRTtZQUNWLHNCQUFzQjtZQUN0Qix3QkFBd0I7WUFDeEIsdUJBQXVCO1NBQzFCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsYUFBYTtZQUNiLHNCQUFzQjtZQUN0Qix3QkFBd0I7WUFDeEIsdUJBQXVCO1NBQzFCO1FBQ0QsZUFBZSxFQUFFO1lBQ2Isd0JBQXdCO1NBQzNCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsY0FBYztTQUNqQjtLQUNKLENBQUM7R0FDVyxXQUFXLENBQUk7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUc0Zvcm1zTW9kdWxlIH0gZnJvbSAnQHRvd25zY3JpcHQvZWxlbWVudHMnO1xuXG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvYnJvd3Nlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFRzTGlzdGluZ0NhcmRDb21wb25lbnQgfSBmcm9tICcuL3RzLWxpc3RpbmctY2FyZC90cy1saXN0aW5nLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vdHMtbGlzdGluZy1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudCB9IGZyb20gJy4vdHMtY2FyZC1za2VsZXRvbi90cy1jYXJkLXNrZWxldG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUc0Zvcm1zTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVHNMaXN0aW5nQ2FyZENvbXBvbmVudCxcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBUc0Zvcm1zTW9kdWxlLFxuICAgICAgICBUc0xpc3RpbmdDYXJkQ29tcG9uZW50LFxuICAgICAgICBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQsXG4gICAgICAgIFRzQ2FyZFNrZWxldG9uQ29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQnJvd3NlclNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENhcmRzTW9kdWxlIHsgfVxuIl19