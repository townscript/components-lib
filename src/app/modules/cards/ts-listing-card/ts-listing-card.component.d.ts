import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BrowserService } from '../../../core/browser.service';
import { PlaceService } from '../../layout/components/ts-header/place.service';
import { UtilityService } from '../../../shared/services/utilities.service';
export declare class TsListingCardComponent implements OnInit {
    utilityService: UtilityService;
    dialog: MatDialog;
    private browser;
    private placeService;
    eventData: any;
    type: any;
    topicData: any;
    gridType: any;
    router: any;
    urgencyMessage: boolean;
    homeUrl: string;
    goingCounter: boolean;
    moreIcons: boolean;
    defaultCardImageUrl: string;
    urlArray: any;
    constructor(utilityService: UtilityService, dialog: MatDialog, browser: BrowserService, placeService: PlaceService);
    buildUrlArray: () => void;
    shareEvent: (event: any) => void;
    ngOnInit(): void;
}
