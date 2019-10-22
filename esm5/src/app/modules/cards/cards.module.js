import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsFormsModule } from '@townscript/elements';
import { BrowserService } from '../../core/browser.service';
import { SharedModule } from '../../shared/shared.module';
import { TsListingCardComponent } from './ts-listing-card/ts-listing-card.component';
import { ShareEventModalComponent } from './ts-listing-card/share-event-modal/share-event-modal.component';
import { TsCardSkeletonComponent } from './ts-card-skeleton/ts-card-skeleton.component';
var CardsModule = /** @class */ (function () {
    function CardsModule() {
    }
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
    return CardsModule;
}());
export { CardsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy9jYXJkcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBMEJ4RjtJQUFBO0lBQTJCLENBQUM7SUFBZixXQUFXO1FBeEJ2QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFlBQVk7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDVixzQkFBc0I7Z0JBQ3RCLHdCQUF3QjtnQkFDeEIsdUJBQXVCO2FBQzFCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGFBQWE7Z0JBQ2Isc0JBQXNCO2dCQUN0Qix3QkFBd0I7Z0JBQ3hCLHVCQUF1QjthQUMxQjtZQUNELGVBQWUsRUFBRTtnQkFDYix3QkFBd0I7YUFDM0I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsY0FBYzthQUNqQjtTQUNKLENBQUM7T0FDVyxXQUFXLENBQUk7SUFBRCxrQkFBQztDQUFBLEFBQTVCLElBQTRCO1NBQWYsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHNGb3Jtc01vZHVsZSB9IGZyb20gJ0B0b3duc2NyaXB0L2VsZW1lbnRzJztcblxuaW1wb3J0IHsgQnJvd3NlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2Jyb3dzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBUc0xpc3RpbmdDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi90cy1saXN0aW5nLWNhcmQvdHMtbGlzdGluZy1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQgfSBmcm9tICcuL3RzLWxpc3RpbmctY2FyZC9zaGFyZS1ldmVudC1tb2RhbC9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHNDYXJkU2tlbGV0b25Db21wb25lbnQgfSBmcm9tICcuL3RzLWNhcmQtc2tlbGV0b24vdHMtY2FyZC1za2VsZXRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUc0Zvcm1zTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVHNMaXN0aW5nQ2FyZENvbXBvbmVudCxcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBUc0Zvcm1zTW9kdWxlLFxuICAgICAgICBUc0xpc3RpbmdDYXJkQ29tcG9uZW50LFxuICAgICAgICBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQsXG4gICAgICAgIFRzQ2FyZFNrZWxldG9uQ29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQnJvd3NlclNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENhcmRzTW9kdWxlIHsgfVxuIl19