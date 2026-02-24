import { OnInit, EventEmitter } from '@angular/core';
export declare class CountDownComponent implements OnInit {
    date: Date;
    counterText: string;
    reached: EventEmitter<boolean>;
    wasReached: boolean;
    constructor();
    dhms(t: any): string;
    ngOnInit(): void;
}
