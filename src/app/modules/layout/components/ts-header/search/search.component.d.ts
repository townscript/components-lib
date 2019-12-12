import { OnInit, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TimeService } from '../../../../../shared/services/time.service';
import { PlaceService } from '../place.service';
import { HeaderService } from '../ts-header.service';
import { UtilityService } from '../../../../../shared/services/utilities.service';
export declare class SearchComponent implements OnInit {
    private utilityService;
    private headerService;
    private placeService;
    private timeService;
    datepipe: DatePipe;
    cityInput: ElementRef;
    citySuggestions: ElementRef;
    searchResultsEle: ElementRef;
    algoliaIndexName: any;
    searchText: string;
    searchTextChanged: Subject<string>;
    searchActive: boolean;
    citySearchActive: boolean;
    cityPopupActive: boolean;
    placeSearchResults: any;
    searchResults: any;
    activePlace: string;
    cityQuery: string;
    cityQueryChanged: Subject<string>;
    activePlaceBackup: string;
    client: any;
    index: any;
    homeUrl: string;
    router: Router;
    urlArray: any;
    host: any;
    popularPlaces: any;
    constructor(utilityService: UtilityService, headerService: HeaderService, placeService: PlaceService, timeService: TimeService, datepipe: DatePipe);
    callAlgolia: (text: any) => void;
    filterDataForSearchResult: (data: any) => void;
    clickout(event: any): void;
    navigateToListing: (interest: string) => void;
    navigateToEventPage: (eventCode: string) => void;
    search: (text: any) => void;
    getPopularPlaces: () => Promise<void>;
    ngOnInit(): void;
}
