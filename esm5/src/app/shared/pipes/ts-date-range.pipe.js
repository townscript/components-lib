import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
import { DateTime } from 'luxon';
var RangeDatePipe = /** @class */ (function () {
    function RangeDatePipe() {
        var _this = this;
        this.days = { 'SU': 'Sun', 'MO': 'Mon', 'TU': 'Tue', 'WE': 'Wed', 'TH': 'Thu', 'FR': 'Fri', 'SA': 'Sat' };
        this.transform = function (rangeDates, isRecurrent, args) {
            if (rangeDates) {
                // for Recurring events
                if (isRecurrent && args['startTime'] != undefined) {
                    var startTime = args['startTime'];
                    var freq = args['recurrenceRule'].split(';')[0].split('=')[1];
                    var freqLabel = 'Daily';
                    //custom date selected
                    if (args['recurrenceRule'].indexOf("RDATE") > -1) {
                        freqLabel = 'Multiple Dates';
                    }
                    else {
                        // predefined R Rule
                        if (freq.toLowerCase() == 'Weekly'.toLowerCase()) {
                            var byDays = args['recurrenceRule'].split(';')[2].split('=')[1].split(',');
                            if (byDays.length > 2) {
                                freqLabel = 'Multiple Dates';
                            }
                            else {
                                freqLabel = 'Every ';
                                for (var index = 0; index < byDays.length; index++) {
                                    freqLabel += _this.days[byDays[index]];
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
                    // for other events or fallback
                    var date = rangeDates.map(function (d) { return DateTime.fromISO(d).toFormat('dd'); });
                    var month = rangeDates.map(function (d) { return DateTime.fromISO(d).toFormat('MMM'); });
                    var year = rangeDates.map(function (d) { return DateTime.fromISO(d).toFormat('yy'); });
                    var time = DateTime.fromISO(rangeDates[0]).toFormat('hh:mm a');
                    var currYear = new Date().getUTCFullYear() % 100;
                    if (year[0] !== year[1]) {
                        return month[0] + ' ' + date[0] + '\'' + year[0] + ' - ' + month[1] + ' ' + date[1] + '\'' + year[1] + ' | ' + time;
                    }
                    else {
                        var yearSt = (year[0] - currYear) != 0 ? " '" + year[0] : '';
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
    RangeDatePipe = tslib_1.__decorate([
        Pipe({
            name: 'dateRange'
        })
    ], RangeDatePipe);
    return RangeDatePipe;
}());
export { RangeDatePipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtZGF0ZS1yYW5nZS5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL3BpcGVzL3RzLWRhdGUtcmFuZ2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUtqQztJQUhBO1FBQUEsaUJBOERDO1FBekRHLFNBQUksR0FBUSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztRQUVqRyxjQUFTLEdBQUcsVUFBQyxVQUFlLEVBQUUsV0FBaUIsRUFBRSxJQUFVO1lBQ3ZELElBQUksVUFBVSxFQUFFO2dCQUNaLHVCQUF1QjtnQkFDdkIsSUFBRyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsRUFBQztvQkFHL0MsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNwQyxJQUFNLElBQUksR0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUM7b0JBQ3hCLHNCQUFzQjtvQkFDdEIsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7d0JBQzlDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztxQkFDOUI7eUJBQU07d0JBQ0wsb0JBQW9CO3dCQUNwQixJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUM7NEJBQzlDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUMzRSxJQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO2dDQUNuQixTQUFTLEdBQUcsZ0JBQWdCLENBQUM7NkJBQzlCO2lDQUFNO2dDQUNMLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0NBQ3JCLEtBQUksSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFDO29DQUMvQyxTQUFTLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQ0FDdEMsSUFBRyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFDO3dDQUM3QixTQUFTLElBQUksSUFBSSxDQUFDO3FDQUNuQjtpQ0FDRjs2QkFDRjt5QkFDRjtxQkFDRjtvQkFDRCxPQUFRLFNBQVMsR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDO2lCQUN2QztxQkFBTTtvQkFDTCwrQkFBK0I7b0JBQy9CLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO29CQUNyRSxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztvQkFDdkUsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUM7b0JBQ3JFLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUVqRSxJQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxHQUFFLEdBQUcsQ0FBQztvQkFDbEQsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUN2QixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQztxQkFDckg7eUJBQU07d0JBQ0wsSUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ3BELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFFLEtBQUssR0FBRyxJQUFJLENBQUM7eUJBQ3hEOzZCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ2xDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQzt5QkFDckc7NkJBQU07NEJBQ0wsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO3lCQUMzRTtxQkFDRjtpQkFDRjthQUNKO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDLENBQUE7SUFDTCxDQUFDO0lBM0RZLGFBQWE7UUFIekIsSUFBSSxDQUFDO1lBQ0YsSUFBSSxFQUFFLFdBQVc7U0FDcEIsQ0FBQztPQUNXLGFBQWEsQ0EyRHpCO0lBQUQsb0JBQUM7Q0FBQSxBQTNERCxJQTJEQztTQTNEWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZGF0ZVJhbmdlJ1xufSlcbmV4cG9ydCBjbGFzcyBSYW5nZURhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgICBkYXlzOiBhbnkgPSB7J1NVJzonU3VuJywnTU8nOiAnTW9uJywnVFUnOiAnVHVlJywnV0UnOiAnV2VkJywnVEgnOiAnVGh1JywnRlInOiAnRnJpJywnU0EnOiAnU2F0J307XG5cbiAgICB0cmFuc2Zvcm0gPSAocmFuZ2VEYXRlczogYW55LCBpc1JlY3VycmVudD86IGFueSAsYXJncz86IGFueSk6IGFueSA9PiB7XG4gICAgICAgIGlmIChyYW5nZURhdGVzKSB7XG4gICAgICAgICAgICAvLyBmb3IgUmVjdXJyaW5nIGV2ZW50c1xuICAgICAgICAgICAgaWYoaXNSZWN1cnJlbnQgJiYgYXJnc1snc3RhcnRUaW1lJ10gIT0gdW5kZWZpbmVkKXtcblxuXG4gICAgICAgICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IGFyZ3NbJ3N0YXJ0VGltZSddO1xuICAgICAgICAgICAgICBjb25zdCBmcmVxICAgPSBhcmdzWydyZWN1cnJlbmNlUnVsZSddLnNwbGl0KCc7JylbMF0uc3BsaXQoJz0nKVsxXTtcbiAgICAgICAgICAgICAgbGV0IGZyZXFMYWJlbCA9ICdEYWlseSc7XG4gICAgICAgICAgICAgIC8vY3VzdG9tIGRhdGUgc2VsZWN0ZWRcbiAgICAgICAgICAgICAgaWYoYXJnc1sncmVjdXJyZW5jZVJ1bGUnXS5pbmRleE9mKFwiUkRBVEVcIikgPiAtMSl7XG4gICAgICAgICAgICAgICAgZnJlcUxhYmVsID0gJ011bHRpcGxlIERhdGVzJztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwcmVkZWZpbmVkIFIgUnVsZVxuICAgICAgICAgICAgICAgIGlmKGZyZXEudG9Mb3dlckNhc2UoKSA9PSAnV2Vla2x5Jy50b0xvd2VyQ2FzZSgpKXtcbiAgICAgICAgICAgICAgICAgIGxldCBieURheXMgPSBhcmdzWydyZWN1cnJlbmNlUnVsZSddLnNwbGl0KCc7JylbMl0uc3BsaXQoJz0nKVsxXS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgaWYoYnlEYXlzLmxlbmd0aCA+IDIpe1xuICAgICAgICAgICAgICAgICAgICBmcmVxTGFiZWwgPSAnTXVsdGlwbGUgRGF0ZXMnO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZnJlcUxhYmVsID0gJ0V2ZXJ5ICc7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaW5kZXggPSAwO2luZGV4IDwgYnlEYXlzLmxlbmd0aDsgaW5kZXgrKyl7XG4gICAgICAgICAgICAgICAgICAgICAgZnJlcUxhYmVsICs9IHRoaXMuZGF5c1tieURheXNbaW5kZXhdXTtcbiAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA8IChieURheXMubGVuZ3RoIC0gMSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJlcUxhYmVsICs9ICcsICc7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAgZnJlcUxhYmVsICsgJyB8ICcgKyBzdGFydFRpbWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBmb3Igb3RoZXIgZXZlbnRzIG9yIGZhbGxiYWNrXG4gICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSByYW5nZURhdGVzLm1hcChkID0+IERhdGVUaW1lLmZyb21JU08oZCkudG9Gb3JtYXQoJ2RkJykpO1xuICAgICAgICAgICAgICBjb25zdCBtb250aCA9IHJhbmdlRGF0ZXMubWFwKGQgPT4gRGF0ZVRpbWUuZnJvbUlTTyhkKS50b0Zvcm1hdCgnTU1NJykpO1xuICAgICAgICAgICAgICBjb25zdCB5ZWFyID0gcmFuZ2VEYXRlcy5tYXAoZCA9PiBEYXRlVGltZS5mcm9tSVNPKGQpLnRvRm9ybWF0KCd5eScpKTtcbiAgICAgICAgICAgICAgY29uc3QgdGltZSA9IERhdGVUaW1lLmZyb21JU08ocmFuZ2VEYXRlc1swXSkudG9Gb3JtYXQoJ2hoOm1tIGEnKTtcblxuICAgICAgICAgICAgICBjb25zdCBjdXJyWWVhciA9IG5ldyBEYXRlKCkuZ2V0VVRDRnVsbFllYXIoKSUgMTAwO1xuICAgICAgICAgICAgICBpZiAoeWVhclswXSAhPT0geWVhclsxXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb250aFswXSArICcgJyArIGRhdGVbMF0gKyAnXFwnJyArIHllYXJbMF0gKyAnIC0gJyArIG1vbnRoWzFdICsgJyAnICsgZGF0ZVsxXSArICdcXCcnICsgeWVhclsxXSArICcgfCAnICsgdGltZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyU3QgPSAoeWVhclswXSAtIGN1cnJZZWFyKSAhPSAwID8gXCIgJ1wiK3llYXJbMF0gOiAnJztcbiAgICAgICAgICAgICAgICBpZiAoKGRhdGVbMF0gPT09IGRhdGVbMV0pICYmIChtb250aFswXSA9PT0gbW9udGhbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9udGhbMF0gKyAnICcgKyBkYXRlWzBdICsgeWVhclN0ICsnIHwgJyArIHRpbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgobW9udGhbMF0gIT09IG1vbnRoWzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoWzBdICsgJyAnICsgZGF0ZVswXSArIHllYXJTdCArICcgLSAnICsgbW9udGhbMV0gKyAnICcgKyBkYXRlWzFdICsgeWVhclN0ICsgJyB8ICcgKyB0aW1lO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbW9udGhbMF0gKyAnICcgKyBkYXRlWzBdICsgJyAtICcgKyBkYXRlWzFdICsgeWVhclN0ICsgJyB8ICcgKyB0aW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=