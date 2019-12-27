import { PipeTransform } from '@angular/core';
export declare class RangeDatePipe implements PipeTransform {
    days: any;
    deprecatedVsNewTimeZones: any;
    transform: (rangeDates: any, eventTimeZone: any, isRecurrent?: any, args?: any) => any;
}
