import { PipeTransform } from '@angular/core';
import { UtilityService } from '../services/utilities.service';
export declare class RangeDatePipe implements PipeTransform {
    private utilityService;
    days: any;
    deprecatedVsNewTimeZones: any;
    constructor(utilityService: UtilityService);
    transform: (rangeDates: any, eventTimeZone: any, isRecurrent?: any, args?: any) => any;
}
