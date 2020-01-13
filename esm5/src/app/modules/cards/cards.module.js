import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsFormsModule } from '@townscript/elements';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserService } from '../../core/browser.service';
import { SharedModule } from '../../shared/shared.module';
import { TsListingCardComponent } from './ts-listing-card/ts-listing-card.component';
import { ShareEventModalComponent } from './ts-listing-card/share-event-modal/share-event-modal.component';
import { TsCardSkeletonComponent } from './ts-card-skeleton/ts-card-skeleton.component';
import { MatTooltipModule } from '@angular/material';
import { TsListingEventCardComponent } from './ts-listings-event-card/ts-listings-event-card.component';
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
                LazyLoadImageModule
            ],
            declarations: [
                TsListingCardComponent,
                ShareEventModalComponent,
                TsCardSkeletonComponent,
                TsListingEventCardComponent
            ],
            exports: [
                TsListingCardComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy9jYXJkcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBNkJ4RztJQUFBO0lBQTJCLENBQUM7SUFBZixXQUFXO1FBM0J2QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFlBQVk7Z0JBQ1osZ0JBQWdCO2dCQUNoQixtQkFBbUI7YUFDdEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLHVCQUF1QjtnQkFDdkIsMkJBQTJCO2FBQzlCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHNCQUFzQjtnQkFDdEIsd0JBQXdCO2dCQUN4Qix1QkFBdUI7Z0JBQ3ZCLDJCQUEyQjthQUM5QjtZQUNELGVBQWUsRUFBRTtnQkFDYix3QkFBd0I7YUFDM0I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsY0FBYzthQUNqQjtTQUNKLENBQUM7T0FDVyxXQUFXLENBQUk7SUFBRCxrQkFBQztDQUFBLEFBQTVCLElBQTRCO1NBQWYsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHNGb3Jtc01vZHVsZSB9IGZyb20gJ0B0b3duc2NyaXB0L2VsZW1lbnRzJztcbmltcG9ydCB7IExhenlMb2FkSW1hZ2VNb2R1bGUgfSBmcm9tICduZy1sYXp5bG9hZC1pbWFnZSc7XG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvYnJvd3Nlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFRzTGlzdGluZ0NhcmRDb21wb25lbnQgfSBmcm9tICcuL3RzLWxpc3RpbmctY2FyZC90cy1saXN0aW5nLWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vdHMtbGlzdGluZy1jYXJkL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudCB9IGZyb20gJy4vdHMtY2FyZC1za2VsZXRvbi90cy1jYXJkLXNrZWxldG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgVHNMaXN0aW5nRXZlbnRDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi90cy1saXN0aW5ncy1ldmVudC1jYXJkL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgVHNGb3Jtc01vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgICAgICBMYXp5TG9hZEltYWdlTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVHNMaXN0aW5nQ2FyZENvbXBvbmVudCxcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudCxcbiAgICAgICAgVHNMaXN0aW5nRXZlbnRDYXJkQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFRzTGlzdGluZ0NhcmRDb21wb25lbnQsXG4gICAgICAgIFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCxcbiAgICAgICAgVHNDYXJkU2tlbGV0b25Db21wb25lbnQsXG4gICAgICAgIFRzTGlzdGluZ0V2ZW50Q2FyZENvbXBvbmVudFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEJyb3dzZXJTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJkc01vZHVsZSB7IH1cbiJdfQ==