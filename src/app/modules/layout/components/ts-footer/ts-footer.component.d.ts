import { OnInit } from '@angular/core';
import { FooterService } from './ts-footer.service';
export declare class TsFooterComponent implements OnInit {
    private footerService;
    popularCities: any;
    showBuilding: boolean;
    copyrightYear: number;
    constructor(footerService: FooterService);
    getPopularCities: () => Promise<any>;
    ngOnInit(): void;
}
