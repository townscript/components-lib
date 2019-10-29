import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { DateTime } from 'luxon';
let RangeDatePipe = class RangeDatePipe {
    constructor() {
        this.transform = (rangeDates, args) => {
            if (rangeDates) {
                const date = rangeDates.map(d => DateTime.fromISO(d).toFormat('dd'));
                const month = rangeDates.map(d => DateTime.fromISO(d).toFormat('MMM'));
                const year = rangeDates.map(d => DateTime.fromISO(d).toFormat('yy'));
                const time = DateTime.fromISO(rangeDates[0]).toFormat('hh:mm a');
                if (year[0] !== year[1]) {
                    return month[0] + ' ' + date[0] + '\'' + year[0] + ' - ' + month[1] + ' ' + date[1] + '\'' + year[1] + ' | ' + time;
                }
                else {
                    if ((date[0] === date[1]) && (month[0] === month[1])) {
                        return month[0] + ' ' + date[0] + ' | ' + time;
                    }
                    else if ((month[0] !== month[1])) {
                        return month[0] + ' ' + date[0] + ' - ' + month[1] + ' ' + date[1] + ' | ' + time;
                    }
                    else {
                        return month[0] + ' ' + date[0] + ' - ' + date[1] + ' | ' + time;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZGF0ZS1yYW5nZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3BpcGVzL3RzLWRhdGUtcmFuZ2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUtqQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBSDFCO1FBS0ksY0FBUyxHQUFHLENBQUMsVUFBZSxFQUFFLElBQVUsRUFBTyxFQUFFO1lBQzdDLElBQUksVUFBVSxFQUFFO2dCQUNaLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUN2SDtxQkFBTTtvQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNsRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7cUJBQ2xEO3lCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ2hDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7cUJBQ3JGO3lCQUFNO3dCQUNILE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO3FCQUNwRTtpQkFDSjthQUNKO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDLENBQUE7SUFDTCxDQUFDO0NBQUEsQ0FBQTtBQXZCWSxhQUFhO0lBSHpCLElBQUksQ0FBQztRQUNGLElBQUksRUFBRSxXQUFXO0tBQ3BCLENBQUM7R0FDVyxhQUFhLENBdUJ6QjtTQXZCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZGF0ZVJhbmdlJ1xufSlcbmV4cG9ydCBjbGFzcyBSYW5nZURhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgICB0cmFuc2Zvcm0gPSAocmFuZ2VEYXRlczogYW55LCBhcmdzPzogYW55KTogYW55ID0+IHtcbiAgICAgICAgaWYgKHJhbmdlRGF0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSByYW5nZURhdGVzLm1hcChkID0+IERhdGVUaW1lLmZyb21JU08oZCkudG9Gb3JtYXQoJ2RkJykpO1xuICAgICAgICAgICAgY29uc3QgbW9udGggPSByYW5nZURhdGVzLm1hcChkID0+IERhdGVUaW1lLmZyb21JU08oZCkudG9Gb3JtYXQoJ01NTScpKTtcbiAgICAgICAgICAgIGNvbnN0IHllYXIgPSByYW5nZURhdGVzLm1hcChkID0+IERhdGVUaW1lLmZyb21JU08oZCkudG9Gb3JtYXQoJ3l5JykpO1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IERhdGVUaW1lLmZyb21JU08ocmFuZ2VEYXRlc1swXSkudG9Gb3JtYXQoJ2hoOm1tIGEnKTtcbiAgICAgICAgICAgIGlmICh5ZWFyWzBdICE9PSB5ZWFyWzFdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoWzBdICsgJyAnICsgZGF0ZVswXSArICdcXCcnICsgeWVhclswXSArICcgLSAnICsgbW9udGhbMV0gKyAnICcgKyBkYXRlWzFdICsgJ1xcJycgKyB5ZWFyWzFdICsgJyB8ICcgKyB0aW1lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoKGRhdGVbMF0gPT09IGRhdGVbMV0pICYmIChtb250aFswXSA9PT0gbW9udGhbMV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aFswXSArICcgJyArIGRhdGVbMF0gKyAnIHwgJyArIHRpbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgobW9udGhbMF0gIT09IG1vbnRoWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9udGhbMF0gKyAnICcgKyBkYXRlWzBdICsgJyAtICcgKyBtb250aFsxXSArICcgJyArIGRhdGVbMV0gKyAnIHwgJyArIHRpbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoWzBdICsgJyAnICsgZGF0ZVswXSArICcgLSAnICsgZGF0ZVsxXSArICcgfCAnICsgdGltZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==