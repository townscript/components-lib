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
let CardsModule = class CardsModule {
};
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
export { CardsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9jYXJkcy9jYXJkcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELHdGQUF3RjtBQUN4RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN4RyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQTZCbEgsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztDQUFJLENBQUE7QUFBZixXQUFXO0lBM0J2QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osYUFBYTtZQUNiLFlBQVk7WUFDWixnQkFBZ0I7WUFDaEIsbUJBQW1CO1NBQ3RCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsMEJBQTBCO1lBQzFCLHdCQUF3QjtZQUN4Qix1QkFBdUI7WUFDdkIsMkJBQTJCO1NBQzlCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsMEJBQTBCO1lBQzFCLHdCQUF3QjtZQUN4Qix1QkFBdUI7WUFDdkIsMkJBQTJCO1NBQzlCO1FBQ0QsZUFBZSxFQUFFO1lBQ2Isd0JBQXdCO1NBQzNCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsY0FBYztTQUNqQjtLQUNKLENBQUM7R0FDVyxXQUFXLENBQUk7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUc0Zvcm1zTW9kdWxlIH0gZnJvbSAnQHRvd25zY3JpcHQvZWxlbWVudHMnO1xuaW1wb3J0IHsgTGF6eUxvYWRJbWFnZU1vZHVsZSB9IGZyb20gJ25nLWxhenlsb2FkLWltYWdlJztcbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9icm93c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuLy8gaW1wb3J0IHsgVHNMaXN0aW5nQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vdHMtbGlzdGluZy1jYXJkL3RzLWxpc3RpbmctY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHNDYXJkU2tlbGV0b25Db21wb25lbnQgfSBmcm9tICcuL3RzLWNhcmQtc2tlbGV0b24vdHMtY2FyZC1za2VsZXRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgVHNMaXN0aW5nRXZlbnRDYXJkQ29tcG9uZW50IH0gZnJvbSAnLi90cy1saXN0aW5ncy1ldmVudC1jYXJkL3RzLWxpc3RpbmdzLWV2ZW50LWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlRXZlbnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vdHMtbGlzdGluZ3MtZXZlbnQtY2FyZC9zaGFyZS1ldmVudC1tb2RhbC9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUc0Zvcm1zTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIExhenlMb2FkSW1hZ2VNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICAvLyBUc0xpc3RpbmdDYXJkQ29tcG9uZW50LFxuICAgICAgICBTaGFyZUV2ZW50TW9kYWxDb21wb25lbnQsXG4gICAgICAgIFRzQ2FyZFNrZWxldG9uQ29tcG9uZW50LFxuICAgICAgICBUc0xpc3RpbmdFdmVudENhcmRDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgLy8gVHNMaXN0aW5nQ2FyZENvbXBvbmVudCxcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBUc0NhcmRTa2VsZXRvbkNvbXBvbmVudCxcbiAgICAgICAgVHNMaXN0aW5nRXZlbnRDYXJkQ29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgU2hhcmVFdmVudE1vZGFsQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQnJvd3NlclNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENhcmRzTW9kdWxlIHsgfVxuIl19