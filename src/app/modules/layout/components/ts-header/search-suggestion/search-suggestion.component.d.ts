import { OnInit, EventEmitter } from '@angular/core';
export declare class SearchSuggestionComponent implements OnInit {
    item: any;
    searchText: any;
    itemSelected: EventEmitter<any>;
    isActive: boolean;
    constructor();
    ngOnInit(): void;
    setActive(val: any): void;
    selectItem(): void;
}
