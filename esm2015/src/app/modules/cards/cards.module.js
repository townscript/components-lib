import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsFormsModule } from '@townscript/elements';
import { BrowserService } from '../../core/browser.service';
import { SharedModule } from '../../shared/shared.module';
import { TsListingCardComponent } from './ts-listing-card/ts-listing-card.component';
import { ShareEventModalComponent } from './ts-listing-card/share-event-modal/share-event-modal.component';
import { TsCardSkeletonComponent } from './ts-card-skeleton/ts-card-skeleton.component';
let CardsModule = class CardsModule {
};
CardsModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            TsFormsModule,
            SharedModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy9jYXJkcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBMEJ4RixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQUksQ0FBQTtBQUFmLFdBQVc7SUF4QnZCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1Ysc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4Qix1QkFBdUI7U0FDMUI7UUFDRCxPQUFPLEVBQUU7WUFDTCxhQUFhO1lBQ2Isc0JBQXNCO1lBQ3RCLHdCQUF3QjtZQUN4Qix1QkFBdUI7U0FDMUI7UUFDRCxlQUFlLEVBQUU7WUFDYix3QkFBd0I7U0FDM0I7UUFDRCxTQUFTLEVBQUU7WUFDUCxjQUFjO1NBQ2pCO0tBQ0osQ0FBQztHQUNXLFdBQVcsQ0FBSTtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRzRm9ybXNNb2R1bGUgfSBmcm9tICdAdG93bnNjcmlwdC9lbGVtZW50cyc7XG5cbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9icm93c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgVHNMaXN0aW5nQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vdHMtbGlzdGluZy1jYXJkL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi90cy1saXN0aW5nLWNhcmQvc2hhcmUtZXZlbnQtbW9kYWwvc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFRzQ2FyZFNrZWxldG9uQ29tcG9uZW50IH0gZnJvbSAnLi90cy1jYXJkLXNrZWxldG9uL3RzLWNhcmQtc2tlbGV0b24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgVHNGb3Jtc01vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRzTGlzdGluZ0NhcmRDb21wb25lbnQsXG4gICAgICAgIFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCxcbiAgICAgICAgVHNDYXJkU2tlbGV0b25Db21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVHNGb3Jtc01vZHVsZSxcbiAgICAgICAgVHNMaXN0aW5nQ2FyZENvbXBvbmVudCxcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEJyb3dzZXJTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJkc01vZHVsZSB7IH1cbiJdfQ==