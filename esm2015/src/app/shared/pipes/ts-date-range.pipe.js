import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { DateTime } from 'luxon';
import { UtilityService } from '../services/utilities.service';
let RangeDatePipe = class RangeDatePipe {
    constructor(utilityService) {
        this.utilityService = utilityService;
        this.days = { 'SU': 'Sun', 'MO': 'Mon', 'TU': 'Tue', 'WE': 'Wed', 'TH': 'Thu', 'FR': 'Fri', 'SA': 'Sat' };
        this.deprecatedVsNewTimeZones = this.utilityService.deprecatedVsNewTimeZones;
        this.transform = (rangeDates, eventTimeZone, isRecurrent, args, hideTime) => {
            if (!eventTimeZone) {
                eventTimeZone = "Asia/Kolkata";
            }
            else {
                if (this.deprecatedVsNewTimeZones[eventTimeZone] != undefined)
                    eventTimeZone = this.deprecatedVsNewTimeZones[eventTimeZone];
            }
            if (rangeDates) {
                // for Recurring events
                if (isRecurrent && args['startTime'] && args['recurrenceRule']) {
                    const startTime = args['startTime'];
                    const endTime = args['endTime'];
                    const freq = args['recurrenceRule'].split(';')[0].split('=')[1];
                    let freqLabel = 'Daily';
                    //custom date selected
                    if (args['recurrenceRule'].indexOf("RDATE") > -1) {
                        freqLabel = 'Multiple Dates';
                    }
                    else {
                        // predefined R Rule
                        if (freq.toLowerCase() == 'Weekly'.toLowerCase()) {
                            let byDays = args['recurrenceRule'].split(';')[2].split('=')[1].split(',');
                            if (byDays.length > 2) {
                                freqLabel = 'Multiple Dates';
                            }
                            else {
                                freqLabel = 'Every ';
                                for (let index = 0; index < byDays.length; index++) {
                                    freqLabel += this.days[byDays[index]];
                                    if (index < (byDays.length - 1)) {
                                        freqLabel += ', ';
                                    }
                                }
                            }
                        }
                    }
                    return (hideTime || (endTime == undefined) ? freqLabel : '')
                        + (!hideTime && endTime == undefined ? ' | ' : '')
                        + (hideTime ? '' : (startTime + (endTime != undefined ? ' to ' + endTime : '')));
                }
                else {
                    let local = DateTime.local().setZone(eventTimeZone);
                    // for other events or fallback
                    const date = rangeDates.map(d => DateTime.fromISO(d, { zone: eventTimeZone }).toFormat('dd'));
                    const month = rangeDates.map(d => DateTime.fromISO(d, { zone: eventTimeZone }).toFormat('MMM'));
                    const year = rangeDates.map(d => DateTime.fromISO(d, { zone: eventTimeZone }).toFormat('yy'));
                    const time = DateTime.fromISO(rangeDates[0], { zone: eventTimeZone }).toFormat('hh:mm a');
                    const currYear = new Date().getUTCFullYear() % 100;
                    if (year[0] !== year[1]) {
                        return month[0] + ' ' + date[0] + '\'' + year[0] + ' - ' + month[1] + ' ' + date[1] + '\'' + year[1] + (hideTime ? '' : ' | ' + time);
                    }
                    else {
                        const yearSt = (year[0] - currYear) != 0 ? " '" + year[0] : '';
                        if ((date[0] === date[1]) && (month[0] === month[1])) {
                            return month[0] + ' ' + date[0] + yearSt + (hideTime ? '' : ' | ' + time);
                        }
                        else if ((month[0] !== month[1])) {
                            return month[0] + ' ' + date[0] + yearSt + ' - ' + month[1] + ' ' + date[1] + yearSt + (hideTime ? '' : ' | ' + time);
                        }
                        else {
                            return month[0] + ' ' + date[0] + ' - ' + date[1] + yearSt + (hideTime ? '' : ' | ' + time);
                        }
                    }
                }
            }
            else {
                return null;
            }
        };
    }
};
RangeDatePipe.ctorParameters = () => [
    { type: UtilityService }
];
RangeDatePipe = __decorate([
    Pipe({
        name: 'dateRange'
    })
], RangeDatePipe);
export { RangeDatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZGF0ZS1yYW5nZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3BpcGVzL3RzLWRhdGUtcmFuZ2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFLL0QsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQU10QixZQUFvQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFKbEQsU0FBSSxHQUFRLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO1FBRWpHLDZCQUF3QixHQUFTLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUM7UUFNOUUsY0FBUyxHQUFHLENBQUMsVUFBZSxFQUFFLGFBQWtCLEVBQUUsV0FBaUIsRUFBRSxJQUFVLEVBQUUsUUFBa0IsRUFBTyxFQUFFO1lBRXhHLElBQUcsQ0FBQyxhQUFhLEVBQUU7Z0JBQ2YsYUFBYSxHQUFDLGNBQWMsQ0FBQzthQUNoQztpQkFBTTtnQkFDSCxJQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxTQUFTO29CQUMxRCxhQUFhLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xFO1lBRUQsSUFBSSxVQUFVLEVBQUU7Z0JBQ1osdUJBQXVCO2dCQUN2QixJQUFHLFdBQVcsSUFBSSxJ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cEIsQ0FBQztHQUNXLGFBQWEsQ0ErRXpCO1NBL0VZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IFV0aWxpdHlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzLnNlcnZpY2UnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2RhdGVSYW5nZSdcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gICAgZGF5czogYW55ID0geydTVSc6J1N1bicsJ01PJzogJ01vbicsJ1RVJzogJ1R1ZScsJ1dFJzogJ1dlZCcsJ1RIJzogJ1RodScsJ0ZSJzogJ0ZyaScsJ1NBJzogJ1NhdCd9O1xuXG4gICAgZGVwcmVjYXRlZFZzTmV3VGltZVpvbmVzIDogYW55ID0gdGhpcy51dGlsaXR5U2VydmljZS5kZXByZWNhdGVkVnNOZXdUaW1lWm9uZXM7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxpdHlTZXJ2aWNlOiBVdGlsaXR5U2VydmljZSl7XG5cbiAgICB9XG5cbiAgICB0cmFuc2Zvcm0gPSAocmFuZ2VEYXRlczogYW55LCBldmVudFRpbWVab25lOiBhbnksIGlzUmVjdXJyZW50PzogYW55ICxhcmdzPzogYW55LCBoaWRlVGltZT86IGJvb2xlYW4pOiBhbnkgPT4ge1xuXG4gICAgICAgIGlmKCFldmVudFRpbWVab25lKSB7XG4gICAgICAgICAgICBldmVudFRpbWVab25lPVwiQXNpYS9Lb2xrYXRhXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZih0aGlzLmRlcHJlY2F0ZWRWc05ld1RpbWVab25lc1tldmVudFRpbWVab25lXSAhPSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIGV2ZW50VGltZVpvbmUgPSB0aGlzLmRlcHJlY2F0ZWRWc05ld1RpbWVab25lc1tldmVudFRpbWVab25lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyYW5nZURhdGVzKSB7XG4gICAgICAgICAgICAvLyBmb3IgUmVjdXJyaW5nIGV2ZW50c1xuICAgICAgICAgICAgaWYoaXNSZWN1cnJlbnQgJiYgYXJnc1snc3RhcnRUaW1lJ10gJiYgYXJnc1sncmVjdXJyZW5jZVJ1bGUnXSl7XG5cblxuICAgICAgICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBhcmdzWydzdGFydFRpbWUnXTtcbiAgICAgICAgICAgICAgY29uc3QgZW5kVGltZSA9IGFyZ3NbJ2VuZFRpbWUnXTtcbiAgICAgICAgICAgICAgY29uc3QgZnJlcSAgID0gYXJnc1sncmVjdXJyZW5jZVJ1bGUnXS5zcGxpdCgnOycpWzBdLnNwbGl0KCc9JylbMV07XG4gICAgICAgICAgICAgIGxldCBmcmVxTGFiZWwgPSAnRGFpbHknO1xuICAgICAgICAgICAgICAvL2N1c3RvbSBkYXRlIHNlbGVjdGVkXG4gICAgICAgICAgICAgIGlmKGFyZ3NbJ3JlY3VycmVuY2VSdWxlJ10uaW5kZXhPZihcIlJEQVRFXCIpID4gLTEpe1xuICAgICAgICAgICAgICAgIGZyZXFMYWJlbCA9ICdNdWx0aXBsZSBEYXRlcyc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcHJlZGVmaW5lZCBSIFJ1bGVcbiAgICAgICAgICAgICAgICBpZihmcmVxLnRvTG93ZXJDYXNlKCkgPT0gJ1dlZWtseScudG9Mb3dlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgICBsZXQgYnlEYXlzID0gYXJnc1sncmVjdXJyZW5jZVJ1bGUnXS5zcGxpdCgnOycpWzJdLnNwbGl0KCc9JylbMV0uc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgIGlmKGJ5RGF5cy5sZW5ndGggPiAyKXtcbiAgICAgICAgICAgICAgICAgICAgZnJlcUxhYmVsID0gJ011bHRpcGxlIERhdGVzJztcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZyZXFMYWJlbCA9ICdFdmVyeSAnO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGluZGV4ID0gMDtpbmRleCA8IGJ5RGF5cy5sZW5ndGg7IGluZGV4Kyspe1xuICAgICAgICAgICAgICAgICAgICAgIGZyZXFMYWJlbCArPSB0aGlzLmRheXNbYnlEYXlzW2luZGV4XV07XG4gICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPCAoYnlEYXlzLmxlbmd0aCAtIDEpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyZXFMYWJlbCArPSAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgcmV0dXJuICAoaGlkZVRpbWUgfHwgKGVuZFRpbWUgPT0gdW5kZWZpbmVkKSA/ICBmcmVxTGFiZWwgOiAnJyApXG4gICAgICAgICAgICAgICAgKyAoIWhpZGVUaW1lICYmIGVuZFRpbWUgPT0gdW5kZWZpbmVkID8gJyB8ICcgOiAnJylcbiAgICAgICAgICAgICAgICArIChoaWRlVGltZSA/ICAnJyA6ICggc3RhcnRUaW1lICsgKGVuZFRpbWUgIT0gdW5kZWZpbmVkID8gJyB0byAnICsgZW5kVGltZSA6ICcnICkpICk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxldCBsb2NhbCA9IERhdGVUaW1lLmxvY2FsKCkuc2V0Wm9uZShldmVudFRpbWVab25lKTtcbiAgICAgICAgICAgICAgLy8gZm9yIG90aGVyIGV2ZW50cyBvciBmYWxsYmFja1xuICAgICAgICAgICAgICBjb25zdCBkYXRlID0gcmFuZ2VEYXRlcy5tYXAoZCA9PiBEYXRlVGltZS5mcm9tSVNPKGQgLCB7IHpvbmU6IGV2ZW50VGltZVpvbmUgfSkudG9Gb3JtYXQoJ2RkJykpO1xuICAgICAgICAgICAgICBjb25zdCBtb250aCA9IHJhbmdlRGF0ZXMubWFwKGQgPT4gRGF0ZVRpbWUuZnJvbUlTTyhkLCB7IHpvbmU6IGV2ZW50VGltZVpvbmUgfSkudG9Gb3JtYXQoJ01NTScpKTtcbiAgICAgICAgICAgICAgY29uc3QgeWVhciA9IHJhbmdlRGF0ZXMubWFwKGQgPT4gRGF0ZVRpbWUuZnJvbUlTTyhkLCB7IHpvbmU6IGV2ZW50VGltZVpvbmUgfSkudG9Gb3JtYXQoJ3l5JykpO1xuICAgICAgICAgICAgICBjb25zdCB0aW1lID0gRGF0ZVRpbWUuZnJvbUlTTyhyYW5nZURhdGVzWzBdLCB7IHpvbmU6IGV2ZW50VGltZVpvbmUgfSkudG9Gb3JtYXQoJ2hoOm1tIGEnKTtcblxuICAgICAgICAgICAgICBjb25zdCBjdXJyWWVhciA9IG5ldyBEYXRlKCkuZ2V0VVRDRnVsbFllYXIoKSUgMTAwO1xuICAgICAgICAgICAgICBpZiAoeWVhclswXSAhPT0geWVhclsxXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb250aFswXSArICcgJyArIGRhdGVbMF0gKyAnXFwnJyArIHllYXJbMF0gKyAnIC0gJyArIG1vbnRoWzFdICsgJyAnICsgZGF0ZVsxXSArICdcXCcnICsgeWVhclsxXSArIChoaWRlVGltZSA/ICcnIDogICcgfCAnICsgdGltZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeWVhclN0ID0gKHllYXJbMF0gLSBjdXJyWWVhcikgIT0gMCA/IFwiICdcIit5ZWFyWzBdIDogJyc7XG4gICAgICAgICAgICAgICAgaWYgKChkYXRlWzBdID09PSBkYXRlWzFdKSAmJiAobW9udGhbMF0gPT09IG1vbnRoWzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoWzBdICsgJyAnICsgZGF0ZVswXSArIHllYXJTdCArIChoaWRlVGltZSA/ICcnIDogJyB8ICcgKyB0aW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChtb250aFswXSAhPT0gbW9udGhbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9udGhbMF0gKyAnICcgKyBkYXRlWzBdICsgeWVhclN0ICsgJyAtICcgKyBtb250aFsxXSArICcgJyArIGRhdGVbMV0gKyB5ZWFyU3QgKyAoaGlkZVRpbWUgPyAnJyA6ICcgfCAnICsgdGltZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aFswXSArICcgJyArIGRhdGVbMF0gKyAnIC0gJyArIGRhdGVbMV0gKyB5ZWFyU3QgKyAoaGlkZVRpbWUgPyAnJyA6ICcgfCAnICsgdGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==