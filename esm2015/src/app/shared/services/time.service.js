import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { rrulestr } from 'rrule';
let TimeService = class TimeService {
    constructor() {
        this.convertDateToTimezone = (date, timeZoneOffset) => {
            const dateVar = DateTime.fromISO(date, { zone: timeZoneOffset });
            const dateString = DateTime.fromISO(dateVar).toString();
            return this.formatLocalDate(new Date(dateString));
        };
        this.formatLocalDate = (now) => {
            const tzo = -now.getTimezoneOffset(), dif = tzo >= 0 ? '+' : '-', pad = function (num) {
                const norm = Math.abs(Math.floor(num));
                return (norm < 10 ? '0' : '') + norm;
            };
            return now.getFullYear()
                + '-' + pad(now.getMonth() + 1)
                + '-' + pad(now.getDate())
                + 'T' + pad(now.getHours())
                + ':' + pad(now.getMinutes())
                + ':' + pad(now.getSeconds())
                + '.000'
                + dif + pad(tzo / 60)
                + pad(tzo % 60);
        };
        this.dateTimeWithinHours = (date, hours) => {
            const compareDate = Date.now() + (hours * 60 * 60 * 1000);
            const dateTime = date.getTime();
            return compareDate > dateTime && dateTime > Date.now();
        };
        this.nextOccurenceFromRRule = (startDate, endDate, rruleString, recTime) => {
            const ddMMyyyyDate = DateTime.fromJSDate(startDate).toFormat('dd-MM-yyyy');
            const dtstart = DateTime.fromFormat(`${ddMMyyyyDate} ${recTime}`, 'dd-MM-yyyy hh:mm a').toJSDate();
            const rrule = rrulestr(rruleString, { 'dtstart': dtstart });
            const recDates = rrule.between(dtstart, endDate, true).filter(date => date > new Date());
            return recDates.length > 0 ? recDates[0] : startDate;
        };
    }
};
TimeService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], TimeService);
export { TimeService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3NlcnZpY2VzL3RpbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFHakMsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUVwQjtRQUdBLDBCQUFxQixHQUFHLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBTyxFQUFFO1lBQ2xELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDakUsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4RCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUE7UUFFRCxvQkFBZSxHQUFHLENBQUMsR0FBRyxFQUFPLEVBQUU7WUFDM0IsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFDaEMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUMxQixHQUFHLEdBQUcsVUFBVSxHQUFHO2dCQUNmLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDekMsQ0FBQyxDQUFDO1lBQ04sT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFO2tCQUNsQixHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7a0JBQzdCLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2tCQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztrQkFDekIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7a0JBQzNCLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO2tCQUMzQixNQUFNO2tCQUNOLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztrQkFDbkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUE7UUFFRCx3QkFBbUIsR0FBRyxDQUFDLElBQVUsRUFBRSxLQUFhLEVBQVcsRUFBRTtZQUN6RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUMxRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsT0FBTyxXQUFXLEdBQUcsUUFBUSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0QsQ0FBQyxDQUFBO1FBRUQsMkJBQXNCLEdBQUcsQ0FBQyxTQUFlLEVBQUUsT0FBYSxFQUFFLFdBQW1CLEVBQUUsT0FBZSxFQUFRLEVBQUU7WUFFcEcsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0UsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFlBQVksSUFBSSxPQUFPLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRW5HLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUM1RCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN6RixPQUFPLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN6RCxDQUFDLENBQUE7SUF4Q0QsQ0FBQztDQXlDSixDQUFBO0FBNUNZLFdBQVc7SUFEdkIsVUFBVSxFQUFFOztHQUNBLFdBQVcsQ0E0Q3ZCO1NBNUNZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCB7IHJydWxlc3RyIH0gZnJvbSAncnJ1bGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGltZVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgY29udmVydERhdGVUb1RpbWV6b25lID0gKGRhdGUsIHRpbWVab25lT2Zmc2V0KTogYW55ID0+IHtcbiAgICAgICAgY29uc3QgZGF0ZVZhciA9IERhdGVUaW1lLmZyb21JU08oZGF0ZSwgeyB6b25lOiB0aW1lWm9uZU9mZnNldCB9KTtcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IERhdGVUaW1lLmZyb21JU08oZGF0ZVZhcikudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0TG9jYWxEYXRlKG5ldyBEYXRlKGRhdGVTdHJpbmcpKTtcbiAgICB9XG5cbiAgICBmb3JtYXRMb2NhbERhdGUgPSAobm93KTogYW55ID0+IHtcbiAgICAgICAgY29uc3QgdHpvID0gLW5vdy5nZXRUaW1lem9uZU9mZnNldCgpLFxuICAgICAgICAgICAgZGlmID0gdHpvID49IDAgPyAnKycgOiAnLScsXG4gICAgICAgICAgICBwYWQgPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybSA9IE1hdGguYWJzKE1hdGguZmxvb3IobnVtKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChub3JtIDwgMTAgPyAnMCcgOiAnJykgKyBub3JtO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vdy5nZXRGdWxsWWVhcigpXG4gICAgICAgICAgICArICctJyArIHBhZChub3cuZ2V0TW9udGgoKSArIDEpXG4gICAgICAgICAgICArICctJyArIHBhZChub3cuZ2V0RGF0ZSgpKVxuICAgICAgICAgICAgKyAnVCcgKyBwYWQobm93LmdldEhvdXJzKCkpXG4gICAgICAgICAgICArICc6JyArIHBhZChub3cuZ2V0TWludXRlcygpKVxuICAgICAgICAgICAgKyAnOicgKyBwYWQobm93LmdldFNlY29uZHMoKSlcbiAgICAgICAgICAgICsgJy4wMDAnXG4gICAgICAgICAgICArIGRpZiArIHBhZCh0em8gLyA2MClcbiAgICAgICAgICAgICsgcGFkKHR6byAlIDYwKTtcbiAgICB9XG5cbiAgICBkYXRlVGltZVdpdGhpbkhvdXJzID0gKGRhdGU6IERhdGUsIGhvdXJzOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgY29tcGFyZURhdGUgPSBEYXRlLm5vdygpICsgKGhvdXJzICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICBjb25zdCBkYXRlVGltZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICByZXR1cm4gY29tcGFyZURhdGUgPiBkYXRlVGltZSAmJiBkYXRlVGltZSA+IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgbmV4dE9jY3VyZW5jZUZyb21SUnVsZSA9IChzdGFydERhdGU6IERhdGUsIGVuZERhdGU6IERhdGUsIHJydWxlU3RyaW5nOiBzdHJpbmcsIHJlY1RpbWU6IHN0cmluZyk6IERhdGUgPT4ge1xuXG4gICAgICAgIGNvbnN0IGRkTU15eXl5RGF0ZSA9IERhdGVUaW1lLmZyb21KU0RhdGUoc3RhcnREYXRlKS50b0Zvcm1hdCgnZGQtTU0teXl5eScpO1xuICAgICAgICBjb25zdCBkdHN0YXJ0ID0gRGF0ZVRpbWUuZnJvbUZvcm1hdChgJHtkZE1NeXl5eURhdGV9ICR7cmVjVGltZX1gLCAnZGQtTU0teXl5eSBoaDptbSBhJykudG9KU0RhdGUoKTtcblxuICAgICAgICBjb25zdCBycnVsZSA9IHJydWxlc3RyKHJydWxlU3RyaW5nLCB7ICdkdHN0YXJ0JzogZHRzdGFydCB9KTtcbiAgICAgICAgY29uc3QgcmVjRGF0ZXMgPSBycnVsZS5iZXR3ZWVuKGR0c3RhcnQsIGVuZERhdGUsIHRydWUpLmZpbHRlcihkYXRlID0+IGRhdGUgPiBuZXcgRGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIHJlY0RhdGVzLmxlbmd0aCA+IDAgPyByZWNEYXRlc1swXSA6IHN0YXJ0RGF0ZTtcbiAgICB9XG59XG4iXX0=