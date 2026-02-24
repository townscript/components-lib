import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
export declare class HamburgerMenuComponent implements OnInit {
    private dialog;
    datepipe: DatePipe;
    private readonly router;
    user: any;
    activePlace: String;
    countryCode: String;
    urlArray: string[];
    active: boolean;
    constructor(dialog: MatDialog, datepipe: DatePipe, router: Router);
    buildUrlArray: () => void;
    openLogin: (callback?: any) => void;
    reloadOnLogout: (event: any) => void;
    openCityPopup: () => void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
}
