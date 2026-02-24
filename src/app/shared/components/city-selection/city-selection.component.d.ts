import { OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from '../../../core/cookie.service';
import { SharedService } from '../../../shared/services/shared.service';
export declare class CitySelectionModalComponent implements OnInit {
    data: any;
    dialogRef: MatDialogRef<CitySelectionModalComponent>;
    dialog: MatDialog;
    sharedService: SharedService;
    private cookieService;
    countryCode: string;
    cityPopupActive: any;
    activePlace: any;
    popularCities: any;
    router: any;
    popularCityImageLink: string;
    showLoader: boolean;
    loaderText: string;
    closeSuggestions: boolean;
    constructor(data: any, dialogRef: MatDialogRef<CitySelectionModalComponent>, dialog: MatDialog, sharedService: SharedService, cookieService: CookieService);
    close: () => void;
    getCities: (code: string) => Promise<any>;
    getCityFromLatAndLong: (lat: string, long: string) => Promise<any>;
    detectLocation: () => void;
    setCloseSuggestions: (val: any) => void;
    ngOnInit(): void;
}
