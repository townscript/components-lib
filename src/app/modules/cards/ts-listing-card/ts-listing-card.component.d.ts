import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BrowserService } from '../../../core/browser.service';
import { PlaceService } from '../../layout/components/ts-header/place.service';
export declare class TsListingCardComponent implements OnInit {
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
    constructor(dialog: MatDialog, browser: BrowserService, placeService: PlaceService);
    shareEvent: (event: any) => void;
    ngOnInit(): void;
}
