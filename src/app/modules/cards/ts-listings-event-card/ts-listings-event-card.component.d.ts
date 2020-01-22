import { OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BrowserService } from '../../../core/browser.service';
import { PlaceService } from '../../layout/components/ts-header/place.service';
import { UtilityService } from '../../../shared/services/utilities.service';
import { Router } from '@angular/router';
export declare class TsListingEventCardComponent implements OnInit, OnDestroy {
    utilityService: UtilityService;
    dialog: MatDialog;
    private browser;
    private placeService;
    eventData: any;
    type: any;
    gridType: any;
    router: Router;
    homeUrl: any;
    subObject: any;
    urlArray: string[];
    hideTime: boolean;
    defaultCardImageUrl: string;
    constructor(utilityService: UtilityService, dialog: MatDialog, browser: BrowserService, placeService: PlaceService);
    ngOnInit(): void;
    buildUrlArray: () => void;
    shareEvent: (event: any) => void;
    ngOnDestroy(): void;
}
