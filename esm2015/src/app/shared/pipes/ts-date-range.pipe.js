import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { DateTime } from 'luxon';
let RangeDatePipe = class RangeDatePipe {
    constructor() {
        this.days = { 'SU': 'Sun', 'MO': 'Mon', 'TU': 'Tue', 'WE': 'Wed', 'TH': 'Thu', 'FR': 'Fri', 'SA': 'Sat' };
        this.deprecatedVsNewTimeZones = {
            'Australia/ACT': 'Australia/Sydney',
            'Australia/LHI': 'Australia/Lord_Howe',
            'Australia/North': 'Australia/Darwin',
            'Australia/NSW': 'Australia/Sydney',
            'Australia/Queensland': 'Australia/Brisbane',
            'Australia/South': 'Australia/Adelaide',
            'Australia/Tasmania': 'Australia/Hobart',
            'Australia/Victoria': 'Australia/Melbourne',
            'Australia/West': 'Australia/Perth',
            'Brazil/Acre': 'America/Rio_Branco',
            'Brazil/DeNoronha': 'America/Noronha',
            'Brazil/East': 'America/Sao_Paulo',
            'Brazil/West': 'America/Manaus',
            'Canada/Atlantic': 'America/Halifax',
            'Canada/Central': 'America/Winnipeg',
            'Canada/Eastern': 'America/Toronto',
            'Canada/Mountain': 'America/Edmonton',
            'Canada/Newfoundland': 'America/St_Johns',
            'Canada/Pacific': 'America/Vancouver',
            'Canada/Saskatchewan': 'America/Regina',
            'Canada/Yukon': 'America/Whitehorse',
            'CET': 'Europe/Paris.',
            'Chile/Continental': 'America/Santiago',
            'Chile/EasterIsland': 'Pacific/Easter',
            'CST6CDT': 'America/Chicago.',
            'Cuba': 'America/Havana',
            'EET': 'Europe/Sofia.',
            'Egypt': 'Africa/Cairo',
            'Eire': 'Europe/Dublin',
            'EST': 'America/Cancun.',
            'EST5EDT': 'America/New_York.',
            'Etc/Greenwich': 'Etc/GMT',
            'Etc/Universal': 'Etc/UTC',
            'Etc/Zulu': 'Etc/UTC',
            'GB': 'Europe/London',
            'GB-Eire': 'Europe/London',
            'GMT+0': 'Etc/GMT',
            'GMT0': 'Etc/GMT',
            'GMT−0': 'Etc/GMT',
            'Greenwich': 'Etc/GMT',
            'Hongkong': 'Asia/Hong_Kong',
            'HST': 'Pacific/Honolulu.',
            'Iceland': 'Atlantic/Reykjavik',
            'Iran': 'Asia/Tehran',
            'Israel': 'Asia/Jerusalem',
            'Jamaica': 'America/Jamaica',
            'Japan': 'Asia/Tokyo',
            'Kwajalein': 'Pacific/Kwajalein',
            'Libya': 'Africa/Tripoli',
            'MET': 'Europe/Paris.',
            'Mexico/BajaNorte': 'America/Tijuana',
            'Mexico/BajaSur': 'America/Mazatlan',
            'Mexico/General': 'America/Mexico_City',
            'MST': 'America/Phoenix.',
            'MST7MDT': 'America/Denver.',
            'Navajo': 'America/Denver',
            'NZ': 'Pacific/Auckland',
            'NZ-CHAT': 'Pacific/Chatham',
            'Poland': 'Europe/Warsaw',
            'Portugal': 'Europe/Lisbon',
            'PRC': 'Asia/Shanghai',
            'PST8PDT': 'America/Los_Angeles.',
            'ROC': 'Asia/Taipei',
            'ROK': 'Asia/Seoul',
            'Singapore': 'Asia/Singapore',
            'Turkey': 'Europe/Istanbul',
            'UCT': 'Etc/UCT',
            'Universal': 'Etc/UTC',
            'US/Alaska': 'America/Anchorage',
            'US/Aleutian': 'America/Adak',
            'US/Arizona': 'America/Phoenix',
            'US/Central': 'America/Chicago',
            'US/Eastern': 'America/New_York',
            'US/East-Indiana': 'America/Indiana/Indianapolis',
            'US/Hawaii': 'Pacific/Honolulu',
            'US/Indiana-Starke': 'America/Indiana/Knox',
            'US/Michigan': 'America/Detroit',
            'US/Mountain': 'America/Denver',
            'US/Pacific': 'America/Los_Angeles',
            'US/Pacific-New': 'America/Los_Angeles',
            'US/Samoa': 'Pacific/Pago_Pago',
            'WET': 'Europe/Lisbon.',
            'W-SU': 'Europe/Moscow',
            'Zulu': 'Etc/UTC'
        };
        this.transform = (rangeDates, eventTimeZone, isRecurrent, args) => {
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
                    return freqLabel + ' | ' + startTime;
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
                        return month[0] + ' ' + date[0] + '\'' + year[0] + ' - ' + month[1] + ' ' + date[1] + '\'' + year[1] + ' | ' + time;
                    }
                    else {
                        const yearSt = (year[0] - currYear) != 0 ? " '" + year[0] : '';
                        if ((date[0] === date[1]) && (month[0] === month[1])) {
                            return month[0] + ' ' + date[0] + yearSt + ' | ' + time;
                        }
                        else if ((month[0] !== month[1])) {
                            return month[0] + ' ' + date[0] + yearSt + ' - ' + month[1] + ' ' + date[1] + yearSt + ' | ' + time;
                        }
                        else {
                            return month[0] + ' ' + date[0] + ' - ' + date[1] + yearSt + ' | ' + time;
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
RangeDatePipe = tslib_1.__decorate([
    Pipe({
        name: 'dateRange'
    })
], RangeDatePipe);
export { RangeDatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZGF0ZS1yYW5nZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3BpcGVzL3RzLWRhdGUtcmFuZ2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUtqQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBSDFCO1FBS0ksU0FBSSxHQUFRLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO1FBRWpHLDZCQUF3QixHQUFTO1lBQ2pDLGVBQWUsRUFBQyxrQkFBa0I7WUFDbEMsZUFBZSxFQUFDLHFCQUFxQjtZQUNyQyxpQkFBaUIsRUFBQyxrQkFBa0I7WUFDcEMsZUFBZSxFQUFDLGtCQUFrQjtZQUNsQyxzQkFBc0IsRUFBQyxvQkFBb0I7WUFDM0MsaUJBQWlCLEVBQUMsb0JBQW9CO1lBQ3RDLG9CQUFvQixFQUFDLGtCQUFrQjtZQUN2QyxvQkFBb0IsRUFBQyxxQkFBcUI7WUFDMUMsZ0JBQWdCLEVBQUMsaUJBQWlCO1lBQ2xDLGFBQWEsRUFBQyxvQkFBb0I7WUFDbEMsa0JBQWtCLEVBQUMsaUJBQWlCO1lBQ3BDLGFBQWEsRUFBQyxtQkFBbUI7WUFDakMsYUFBYSxFQUFDLGdCQUFnQjtZQUM5QixpQkFBaUIsRUFBQyxpQkFBaUI7WUFDbkMsZ0JBQWdCLEVBQUMsa0JBQWtCO1lBQ25DLGdCQUFnQixFQUFDLGlCQUFpQjtZQUNsQyxpQkFBaUIsRUFBQyxrQkFBa0I7WUFDcEMscUJBQXFCLEVB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QUksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQzt5QkFDckc7NkJBQU07NEJBQ0wsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO3lCQUMzRTtxQkFDRjtpQkFDRjthQUNKO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDLENBQUE7SUFDTCxDQUFDO0NBQUEsQ0FBQTtBQTNKWSxhQUFhO0lBSHpCLElBQUksQ0FBQztRQUNGLElBQUksRUFBRSxXQUFXO0tBQ3BCLENBQUM7R0FDVyxhQUFhLENBMkp6QjtTQTNKWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZGF0ZVJhbmdlJ1xufSlcbmV4cG9ydCBjbGFzcyBSYW5nZURhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgICBkYXlzOiBhbnkgPSB7J1NVJzonU3VuJywnTU8nOiAnTW9uJywnVFUnOiAnVHVlJywnV0UnOiAnV2VkJywnVEgnOiAnVGh1JywnRlInOiAnRnJpJywnU0EnOiAnU2F0J307XG5cbiAgICBkZXByZWNhdGVkVnNOZXdUaW1lWm9uZXMgOiBhbnkgPSB7XG4gICAgJ0F1c3RyYWxpYS9BQ1QnOidBdXN0cmFsaWEvU3lkbmV5JyxcbiAgICAnQXVzdHJhbGlhL0xISSc6J0F1c3RyYWxpYS9Mb3JkX0hvd2UnLFxuICAgICdBdXN0cmFsaWEvTm9ydGgnOidBdXN0cmFsaWEvRGFyd2luJyxcbiAgICAnQXVzdHJhbGlhL05TVyc6J0F1c3RyYWxpYS9TeWRuZXknLFxuICAgICdBdXN0cmFsaWEvUXVlZW5zbGFuZCc6J0F1c3RyYWxpYS9CcmlzYmFuZScsXG4gICAgJ0F1c3RyYWxpYS9Tb3V0aCc6J0F1c3RyYWxpYS9BZGVsYWlkZScsXG4gICAgJ0F1c3RyYWxpYS9UYXNtYW5pYSc6J0F1c3RyYWxpYS9Ib2JhcnQnLFxuICAgICdBdXN0cmFsaWEvVmljdG9yaWEnOidBdXN0cmFsaWEvTWVsYm91cm5lJyxcbiAgICAnQXVzdHJhbGlhL1dlc3QnOidBdXN0cmFsaWEvUGVydGgnLFxuICAgICdCcmF6aWwvQWNyZSc6J0FtZXJpY2EvUmlvX0JyYW5jbycsXG4gICAgJ0JyYXppbC9EZU5vcm9uaGEnOidBbWVyaWNhL05vcm9uaGEnLFxuICAgICdCcmF6aWwvRWFzdCc6J0FtZXJpY2EvU2FvX1BhdWxvJyxcbiAgICAnQnJhemlsL1dlc3QnOidBbWVyaWNhL01hbmF1cycsXG4gICAgJ0NhbmFkYS9BdGxhbnRpYyc6J0FtZXJpY2EvSGFsaWZheCcsXG4gICAgJ0NhbmFkYS9DZW50cmFsJzonQW1lcmljYS9XaW5uaXBlZycsXG4gICAgJ0NhbmFkYS9FYXN0ZXJuJzonQW1lcmljYS9Ub3JvbnRvJyxcbiAgICAnQ2FuYWRhL01vdW50YWluJzonQW1lcmljYS9FZG1vbnRvbicsXG4gICAgJ0NhbmFkYS9OZXdmb3VuZGxhbmQnOidBbWVyaWNhL1N0X0pvaG5zJyxcbiAgICAnQ2FuYWRhL1BhY2lmaWMnOidBbWVyaWNhL1ZhbmNvdXZlcicsXG4gICAgJ0NhbmFkYS9TYXNrYXRjaGV3YW4nOidBbWVyaWNhL1JlZ2luYScsXG4gICAgJ0NhbmFkYS9ZdWtvbic6J0FtZXJpY2EvV2hpdGVob3JzZScsXG4gICAgJ0NFVCc6J0V1cm9wZS9QYXJpcy4nLFxuICAgICdDaGlsZS9Db250aW5lbnRhbCc6J0FtZXJpY2EvU2FudGlhZ28nLFxuICAgICdDaGlsZS9FYXN0ZXJJc2xhbmQnOidQYWNpZmljL0Vhc3RlcicsXG4gICAgJ0NTVDZDRFQnOidBbWVyaWNhL0NoaWNhZ28uJyxcbiAgICAnQ3ViYSc6J0FtZXJpY2EvSGF2YW5hJyxcbiAgICAnRUVUJzonRXVyb3BlL1NvZmlhLicsXG4gICAgJ0VneXB0JzonQWZyaWNhL0NhaXJvJyxcbiAgICAnRWlyZSc6J0V1cm9wZS9EdWJsaW4nLFxuICAgICdFU1QnOidBbWVyaWNhL0NhbmN1bi4nLFxuICAgICdFU1Q1RURUJzonQW1lcmljYS9OZXdfWW9yay4nLFxuICAgICdFdGMvR3JlZW53aWNoJzonRXRjL0dNVCcsXG4gICAgJ0V0Yy9Vbml2ZXJzYWwnOidFdGMvVVRDJyxcbiAgICAnRXRjL1p1bHUnOidFdGMvVVRDJyxcbiAgICAnR0InOidFdXJvcGUvTG9uZG9uJyxcbiAgICAnR0ItRWlyZSc6J0V1cm9wZS9Mb25kb24nLFxuICAgICdHTVQrMCc6J0V0Yy9HTVQnLFxuICAgICdHTVQwJzonRXRjL0dNVCcsXG4gICAgJ0dNVOKIkjAnOidFdGMvR01UJyxcbiAgICAnR3JlZW53aWNoJzonRXRjL0dNVCcsXG4gICAgJ0hvbmdrb25nJzonQXNpYS9Ib25nX0tvbmcnLFxuICAgICdIU1QnOidQYWNpZmljL0hvbm9sdWx1LicsXG4gICAgJ0ljZWxhbmQnOidBdGxhbnRpYy9SZXlramF2aWsnLFxuICAgICdJcmFuJzonQXNpYS9UZWhyYW4nLFxuICAgICdJc3JhZWwnOidBc2lhL0plcnVzYWxlbScsXG4gICAgJ0phbWFpY2EnOidBbWVyaWNhL0phbWFpY2EnLFxuICAgICdKYXBhbic6J0FzaWEvVG9reW8nLFxuICAgICdLd2FqYWxlaW4nOidQYWNpZmljL0t3YWphbGVpbicsXG4gICAgJ0xpYnlhJzonQWZyaWNhL1RyaXBvbGknLFxuICAgICdNRVQnOidFdXJvcGUvUGFyaXMuJyxcbiAgICAnTWV4aWNvL0JhamFOb3J0ZSc6J0FtZXJpY2EvVGlqdWFuYScsXG4gICAgJ01leGljby9CYWphU3VyJzonQW1lcmljYS9NYXphdGxhbicsXG4gICAgJ01leGljby9HZW5lcmFsJzonQW1lcmljYS9NZXhpY29fQ2l0eScsXG4gICAgJ01TVCc6J0FtZXJpY2EvUGhvZW5peC4nLFxuICAgICdNU1Q3TURUJzonQW1lcmljYS9EZW52ZXIuJyxcbiAgICAnTmF2YWpvJzonQW1lcmljYS9EZW52ZXInLFxuICAgICdOWic6J1BhY2lmaWMvQXVja2xhbmQnLFxuICAgICdOWi1DSEFUJzonUGFjaWZpYy9DaGF0aGFtJyxcbiAgICAnUG9sYW5kJzonRXVyb3BlL1dhcnNhdycsXG4gICAgJ1BvcnR1Z2FsJzonRXVyb3BlL0xpc2JvbicsXG4gICAgJ1BSQyc6J0FzaWEvU2hhbmdoYWknLFxuICAgICdQU1Q4UERUJzonQW1lcmljYS9Mb3NfQW5nZWxlcy4nLFxuICAgICdST0MnOidBc2lhL1RhaXBlaScsXG4gICAgJ1JPSyc6J0FzaWEvU2VvdWwnLFxuICAgICdTaW5nYXBvcmUnOidBc2lhL1NpbmdhcG9yZScsXG4gICAgJ1R1cmtleSc6J0V1cm9wZS9Jc3RhbmJ1bCcsXG4gICAgJ1VDVCc6J0V0Yy9VQ1QnLFxuICAgICdVbml2ZXJzYWwnOidFdGMvVVRDJyxcbiAgICAnVVMvQWxhc2thJzonQW1lcmljYS9BbmNob3JhZ2UnLFxuICAgICdVUy9BbGV1dGlhbic6J0FtZXJpY2EvQWRhaycsXG4gICAgJ1VTL0FyaXpvbmEnOidBbWVyaWNhL1Bob2VuaXgnLFxuICAgICdVUy9DZW50cmFsJzonQW1lcmljYS9DaGljYWdvJyxcbiAgICAnVVMvRWFzdGVybic6J0FtZXJpY2EvTmV3X1lvcmsnLFxuICAgICdVUy9FYXN0LUluZGlhbmEnOidBbWVyaWNhL0luZGlhbmEvSW5kaWFuYXBvbGlzJyxcbiAgICAnVVMvSGF3YWlpJzonUGFjaWZpYy9Ib25vbHVsdScsXG4gICAgJ1VTL0luZGlhbmEtU3RhcmtlJzonQW1lcmljYS9JbmRpYW5hL0tub3gnLFxuICAgICdVUy9NaWNoaWdhbic6J0FtZXJpY2EvRGV0cm9pdCcsXG4gICAgJ1VTL01vdW50YWluJzonQW1lcmljYS9EZW52ZXInLFxuICAgICdVUy9QYWNpZmljJzonQW1lcmljYS9Mb3NfQW5nZWxlcycsXG4gICAgJ1VTL1BhY2lmaWMtTmV3JzonQW1lcmljYS9Mb3NfQW5nZWxlcycsXG4gICAgJ1VTL1NhbW9hJzonUGFjaWZpYy9QYWdvX1BhZ28nLFxuICAgICdXRVQnOidFdXJvcGUvTGlzYm9uLicsXG4gICAgJ1ctU1UnOidFdXJvcGUvTW9zY293JyxcbiAgICAnWnVsdSc6J0V0Yy9VVEMnXG4gICAgfTtcblxuICAgIHRyYW5zZm9ybSA9IChyYW5nZURhdGVzOiBhbnksIGV2ZW50VGltZVpvbmU6IGFueSwgaXNSZWN1cnJlbnQ/OiBhbnkgLGFyZ3M/OiBhbnkpOiBhbnkgPT4ge1xuXG4gICAgICAgIGlmKCFldmVudFRpbWVab25lKSB7XG4gICAgICAgICAgICBldmVudFRpbWVab25lPVwiQXNpYS9Lb2xrYXRhXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZih0aGlzLmRlcHJlY2F0ZWRWc05ld1RpbWVab25lc1tldmVudFRpbWVab25lXSAhPSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgIGV2ZW50VGltZVpvbmUgPSB0aGlzLmRlcHJlY2F0ZWRWc05ld1RpbWVab25lc1tldmVudFRpbWVab25lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyYW5nZURhdGVzKSB7XG4gICAgICAgICAgICAvLyBmb3IgUmVjdXJyaW5nIGV2ZW50c1xuICAgICAgICAgICAgaWYoaXNSZWN1cnJlbnQgJiYgYXJnc1snc3RhcnRUaW1lJ10gJiYgYXJnc1sncmVjdXJyZW5jZVJ1bGUnXSl7XG5cblxuICAgICAgICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBhcmdzWydzdGFydFRpbWUnXTtcbiAgICAgICAgICAgICAgY29uc3QgZnJlcSAgID0gYXJnc1sncmVjdXJyZW5jZVJ1bGUnXS5zcGxpdCgnOycpWzBdLnNwbGl0KCc9JylbMV07XG4gICAgICAgICAgICAgIGxldCBmcmVxTGFiZWwgPSAnRGFpbHknO1xuICAgICAgICAgICAgICAvL2N1c3RvbSBkYXRlIHNlbGVjdGVkXG4gICAgICAgICAgICAgIGlmKGFyZ3NbJ3JlY3VycmVuY2VSdWxlJ10uaW5kZXhPZihcIlJEQVRFXCIpID4gLTEpe1xuICAgICAgICAgICAgICAgIGZyZXFMYWJlbCA9ICdNdWx0aXBsZSBEYXRlcyc7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcHJlZGVmaW5lZCBSIFJ1bGVcbiAgICAgICAgICAgICAgICBpZihmcmVxLnRvTG93ZXJDYXNlKCkgPT0gJ1dlZWtseScudG9Mb3dlckNhc2UoKSl7XG4gICAgICAgICAgICAgICAgICBsZXQgYnlEYXlzID0gYXJnc1sncmVjdXJyZW5jZVJ1bGUnXS5zcGxpdCgnOycpWzJdLnNwbGl0KCc9JylbMV0uc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgIGlmKGJ5RGF5cy5sZW5ndGggPiAyKXtcbiAgICAgICAgICAgICAgICAgICAgZnJlcUxhYmVsID0gJ011bHRpcGxlIERhdGVzJztcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZyZXFMYWJlbCA9ICdFdmVyeSAnO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGluZGV4ID0gMDtpbmRleCA8IGJ5RGF5cy5sZW5ndGg7IGluZGV4Kyspe1xuICAgICAgICAgICAgICAgICAgICAgIGZyZXFMYWJlbCArPSB0aGlzLmRheXNbYnlEYXlzW2luZGV4XV07XG4gICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPCAoYnlEYXlzLmxlbmd0aCAtIDEpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyZXFMYWJlbCArPSAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gIGZyZXFMYWJlbCArICcgfCAnICsgc3RhcnRUaW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbGV0IGxvY2FsID0gRGF0ZVRpbWUubG9jYWwoKS5zZXRab25lKGV2ZW50VGltZVpvbmUpO1xuICAgICAgICAgICAgICAvLyBmb3Igb3RoZXIgZXZlbnRzIG9yIGZhbGxiYWNrXG4gICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSByYW5nZURhdGVzLm1hcChkID0+IERhdGVUaW1lLmZyb21JU08oZCAsIHsgem9uZTogZXZlbnRUaW1lWm9uZSB9KS50b0Zvcm1hdCgnZGQnKSk7XG4gICAgICAgICAgICAgIGNvbnN0IG1vbnRoID0gcmFuZ2VEYXRlcy5tYXAoZCA9PiBEYXRlVGltZS5mcm9tSVNPKGQsIHsgem9uZTogZXZlbnRUaW1lWm9uZSB9KS50b0Zvcm1hdCgnTU1NJykpO1xuICAgICAgICAgICAgICBjb25zdCB5ZWFyID0gcmFuZ2VEYXRlcy5tYXAoZCA9PiBEYXRlVGltZS5mcm9tSVNPKGQsIHsgem9uZTogZXZlbnRUaW1lWm9uZSB9KS50b0Zvcm1hdCgneXknKSk7XG4gICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBEYXRlVGltZS5mcm9tSVNPKHJhbmdlRGF0ZXNbMF0sIHsgem9uZTogZXZlbnRUaW1lWm9uZSB9KS50b0Zvcm1hdCgnaGg6bW0gYScpO1xuXG4gICAgICAgICAgICAgIGNvbnN0IGN1cnJZZWFyID0gbmV3IERhdGUoKS5nZXRVVENGdWxsWWVhcigpJSAxMDA7XG4gICAgICAgICAgICAgIGlmICh5ZWFyWzBdICE9PSB5ZWFyWzFdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoWzBdICsgJyAnICsgZGF0ZVswXSArICdcXCcnICsgeWVhclswXSArICcgLSAnICsgbW9udGhbMV0gKyAnICcgKyBkYXRlWzFdICsgJ1xcJycgKyB5ZWFyWzFdICsgJyB8ICcgKyB0aW1lO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHllYXJTdCA9ICh5ZWFyWzBdIC0gY3VyclllYXIpICE9IDAgPyBcIiAnXCIreWVhclswXSA6ICcnO1xuICAgICAgICAgICAgICAgIGlmICgoZGF0ZVswXSA9PT0gZGF0ZVsxXSkgJiYgKG1vbnRoWzBdID09PSBtb250aFsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aFswXSArICcgJyArIGRhdGVbMF0gKyB5ZWFyU3QgKycgfCAnICsgdGltZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChtb250aFswXSAhPT0gbW9udGhbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9udGhbMF0gKyAnICcgKyBkYXRlWzBdICsgeWVhclN0ICsgJyAtICcgKyBtb250aFsxXSArICcgJyArIGRhdGVbMV0gKyB5ZWFyU3QgKyAnIHwgJyArIHRpbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aFswXSArICcgJyArIGRhdGVbMF0gKyAnIC0gJyArIGRhdGVbMV0gKyB5ZWFyU3QgKyAnIHwgJyArIHRpbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==