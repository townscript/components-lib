import { ElementRef, AfterViewInit } from '@angular/core';
export declare class TextOverflowClampDirective implements AfterViewInit {
    private el;
    lines: number;
    constructor(el: ElementRef);
    ngAfterViewInit(): void;
}
