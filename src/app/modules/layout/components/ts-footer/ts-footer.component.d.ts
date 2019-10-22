import { OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from '../../../../shared/services/index';
import { FooterService } from './ts-footer.service';
import { PlaceService } from '../ts-header/place.service';
export declare class TsFooterComponent implements OnInit, OnDestroy {
    private dialog;
    private userService;
    private footerService;
    private placeService;
    source: string;
    popularEvents: any;
    recentBlogs: any;
    popularReads: {
        title: string;
        url: string;
    }[];
    popularCities: any;
    popularEventsData: any;
    countryCityMap: any;
    city: any;
    placeId: string;
    myBookingsURL: string;
    subObject: any;
    constructor(dialog: MatDialog, userService: UserService, footerService: FooterService, placeService: PlaceService);
    openContactUs: () => void;
    openMyBooking: () => void;
    redirectToMyBookings: () => void;
    openLogin: () => void;
    getCityFromCityCode: (code: string) => Promise<any>;
    getPopularEvents: () => Promise<any>;
    getPopularCities: () => Promise<any>;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
