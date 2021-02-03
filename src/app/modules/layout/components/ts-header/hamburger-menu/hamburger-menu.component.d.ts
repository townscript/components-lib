import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
export declare class HamburgerMenuComponent implements OnInit {
    private dialog;
    datepipe: DatePipe;
    user: any;
    activePlace: String;
    countryCode: String;
    active: boolean;
    constructor(dialog: MatDialog, datepipe: DatePipe);
    openLogin: (callback?: any) => void;
    reloadOnLogout: (event: any) => void;
    openCityPopup: () => void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
}
