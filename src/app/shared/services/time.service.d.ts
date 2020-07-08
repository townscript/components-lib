export declare class TimeService {
    constructor();
    convertDateToTimezone: (date: any, timeZoneOffset: any) => any;
    formatLocalDate: (now: any) => any;
    dateTimeWithinHours: (date: Date, hours: number) => boolean;
}
