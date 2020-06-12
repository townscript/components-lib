import { OnInit, ElementRef } from '@angular/core';
import { DataCollectorService } from '../../services/analytics/data-collector.service';
export declare class DataAnalyticsDirective implements OnInit {
    readonly elementRef: ElementRef;
    private readonly dataCollectorService;
    eventLabel: string;
    clickLocation: string;
    constructor(elementRef: ElementRef, dataCollectorService: DataCollectorService);
    ngOnInit(): void;
    clickEvent(event: any): void;
}
