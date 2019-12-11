import { OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from '../../../../shared/services/user-service';
import { PlaceService } from './place.service';
import { HeaderService } from './ts-header.service';
export declare class TsHeaderComponent implements OnInit {
    private headerService;
    private placeService;
    private dialog;
    private userService;
    Components: Array<String>;
    backState: boolean;
    source: string;
    shadow: boolean;
    citySuggestions: ElementRef;
    userMenuEle: ElementRef;
    user: any;
    router: any;
    urlArray: any;
    userMenu: any;
    host: string;
    activePlace: string;
    activeCity: string;
    activeCountryCode: string;
    homePageUrl: string;
    s3BucketUrl: any;
    cityPopupActive: boolean;
    popularPlaces: any;
    constructor(headerService: HeaderService, placeService: PlaceService, dialog: MatDialog, userService: UserService);
    clickout: (event: any) => void;
    openLogin: (callback?: any) => void;
    navigateToDashboard: () => void;
    createEventClick: () => void;
    navigateToMobileSearch: () => void;
    openMyProfileComponent: () => void;
    closeMyProfileComponent: (event: any) => void;
    goBack: () => void;
    goToHomePage: () => void;
    getPopularPlaces: () => Promise<void>;
    ngOnInit(): void;
}
