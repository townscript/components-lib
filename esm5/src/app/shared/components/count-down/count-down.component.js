import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
var CountDownComponent = /** @class */ (function () {
    function CountDownComponent() {
        this.reached = new EventEmitter();
        this.wasReached = false;
    }
    CountDownComponent.prototype.dhms = function (t) {
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;
        var retArr = [];
        if (days > 0) {
            retArr.push(days + ' days');
            retArr.push(hours + ' hours');
        }
        else if (hours > 0) {
            retArr.push(hours + ' hours');
            retArr.push(minutes + ' mins');
        }
        else if (minutes > 0) {
            retArr.push(minutes + ' mins');
            retArr.push(seconds + ' secs');
        }
        else {
            retArr.push(seconds + ' secs');
        }
        return retArr.join(' ');
    };
    CountDownComponent.prototype.ngOnInit = function () {
        var _this = this;
        setInterval(function () {
            if (_this.wasReached) {
                return;
            }
            var now = new Date();
            var dateDifference = _this.date.getTime() - now.getTime();
            if ((dateDifference < 1000 && dateDifference > 0) || dateDifference < 0 && !_this.wasReached) {
                _this.wasReached = true;
                _this.reached.emit(_this.wasReached);
                return;
            }
            var unixSecTime = Math.floor((_this.date.getTime() - new Date().getTime()) / 1000);
            _this.counterText = _this.dhms(unixSecTime);
        }, 1000);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], CountDownComponent.prototype, "date", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], CountDownComponent.prototype, "reached", void 0);
    CountDownComponent = tslib_1.__decorate([
        Component({
            selector: 'ts-countdown',
            template: '<span>{{counterText}}</span>'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CountDownComponent);
    return CountDownComponent;
}());
export { CountDownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQtZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9jb3VudC1kb3duL2NvdW50LWRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTS9FO0lBT0k7UUFIVSxZQUFPLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUQsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUduQixDQUFDO0lBRUQsaUNBQUksR0FBSixVQUFLLENBQUM7UUFDRixJQUFJLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLENBQUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUM1QixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQztTQUNqQzthQUFNLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztTQUNsQzthQUFNLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUM7U0FDbEM7UUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUdELHFDQUFRLEdBQVI7UUFBQSxpQkFtQkM7UUFqQkcsV0FBVyxDQUFDO1lBQ1IsSUFBSSxLQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixPQUFPO2FBQ1Y7WUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQU0sY0FBYyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRTNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRTtnQkFDekYsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsT0FBTzthQUNWO1lBRUQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3BGLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBdkRRO1FBQVIsS0FBSyxFQUFFOzBDQUFPLElBQUk7b0RBQUM7SUFFVjtRQUFULE1BQU0sRUFBRTswQ0FBVSxZQUFZO3VEQUErQjtJQUpyRCxrQkFBa0I7UUFKOUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLDhCQUE4QjtTQUMzQyxDQUFDOztPQUNXLGtCQUFrQixDQTBEOUI7SUFBRCx5QkFBQztDQUFBLEFBMURELElBMERDO1NBMURZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0cy1jb3VudGRvd24nLFxuICAgIHRlbXBsYXRlOiAnPHNwYW4+e3tjb3VudGVyVGV4dH19PC9zcGFuPidcbn0pXG5leHBvcnQgY2xhc3MgQ291bnREb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGRhdGU6IERhdGU7XG4gICAgY291bnRlclRleHQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgcmVhY2hlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHdhc1JlYWNoZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGRobXModCkge1xuICAgICAgICBsZXQgZGF5cywgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHM7XG4gICAgICAgIGRheXMgPSBNYXRoLmZsb29yKHQgLyA4NjQwMCk7XG4gICAgICAgIHQgLT0gZGF5cyAqIDg2NDAwO1xuICAgICAgICBob3VycyA9IE1hdGguZmxvb3IodCAvIDM2MDApICUgMjQ7XG4gICAgICAgIHQgLT0gaG91cnMgKiAzNjAwO1xuICAgICAgICBtaW51dGVzID0gTWF0aC5mbG9vcih0IC8gNjApICUgNjA7XG4gICAgICAgIHQgLT0gbWludXRlcyAqIDYwO1xuICAgICAgICBzZWNvbmRzID0gdCAlIDYwO1xuXG4gICAgICAgIGNvbnN0IHJldEFycjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgaWYgKGRheXMgPiAwKSB7XG4gICAgICAgICAgICByZXRBcnIucHVzaChkYXlzICsgJyBkYXlzJyk7XG4gICAgICAgICAgICByZXRBcnIucHVzaChob3VycyArICcgaG91cnMnKTtcbiAgICAgICAgfSBlbHNlIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgICAgIHJldEFyci5wdXNoKGhvdXJzICsgJyBob3VycycpO1xuICAgICAgICAgICAgcmV0QXJyLnB1c2gobWludXRlcyArICcgbWlucycpO1xuICAgICAgICB9IGVsc2UgaWYgKG1pbnV0ZXMgPiAwKSB7XG4gICAgICAgICAgICByZXRBcnIucHVzaChtaW51dGVzICsgJyBtaW5zJyk7XG4gICAgICAgICAgICByZXRBcnIucHVzaChzZWNvbmRzICsgJyBzZWNzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXRBcnIucHVzaChzZWNvbmRzICsgJyBzZWNzJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmV0QXJyLmpvaW4oJyAnKTtcbiAgICB9XG5cblxuICAgIG5nT25Jbml0KCkge1xuXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLndhc1JlYWNoZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlRGlmZmVyZW5jZSA9IHRoaXMuZGF0ZS5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpO1xuXG4gICAgICAgICAgICBpZiAoKGRhdGVEaWZmZXJlbmNlIDwgMTAwMCAmJiBkYXRlRGlmZmVyZW5jZSA+IDApIHx8IGRhdGVEaWZmZXJlbmNlIDwgMCAmJiAhdGhpcy53YXNSZWFjaGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXNSZWFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWNoZWQuZW1pdCh0aGlzLndhc1JlYWNoZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdW5peFNlY1RpbWUgPSBNYXRoLmZsb29yKCh0aGlzLmRhdGUuZ2V0VGltZSgpIC0gbmV3IERhdGUoKS5nZXRUaW1lKCkpIC8gMTAwMCk7XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXJUZXh0ID0gdGhpcy5kaG1zKHVuaXhTZWNUaW1lKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxufVxuIl19