import { OnInit, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { HeaderService } from '../ts-header.service';
import { PlaceService } from '../place.service';
export declare class CitySearchPopupComponent implements OnInit, AfterViewInit {
    private placeService;
    private headerService;
    datepipe: DatePipe;
    cityInput: ElementRef;
    showArrow: boolean;
    activePlace: string;
    activePlaceChange: EventEmitter<String>;
    cityPopupActive: boolean;
    cityPopupActiveChange: EventEmitter<boolean>;
    citySearchActive: boolean;
    placeSearchResults: any;
    router: Router;
    urlArray: any;
    cityQuery: string;
    cityQueryChanged: Subject<string>;
    client: any;
    cityLoading: boolean;
    index: any;
    popularPlaces: any;
    constructor(placeService: PlaceService, headerService: HeaderService, datepipe: DatePipe);
    callSearchCity: (query: any) => void;
    placeChanged: (place: any) => void;
    openCityPopup: () => void;
    searchCity: (text: any) => void;
    getPopularPlaces: () => Promise<void>;
    ngAfterViewInit(): void;
    ngOnInit(): void;
}
