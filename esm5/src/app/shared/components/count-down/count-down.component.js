import { __decorate } from "tslib";
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
    __decorate([
        Input()
    ], CountDownComponent.prototype, "date", void 0);
    __decorate([
        Output()
    ], CountDownComponent.prototype, "reached", void 0);
    CountDownComponent = __decorate([
        Component({
            selector: 'ts-countdown',
            template: '<span>{{counterText}}</span>'
        })
    ], CountDownComponent);
    return CountDownComponent;
}());
export { CountDownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQtZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9jb3VudC1kb3duL2NvdW50LWRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTS9FO0lBT0k7UUFIVSxZQUFPLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUQsZUFBVSxHQUFHLEtBQUssQ0FBQztJQUduQixDQUFDO0lBRUQsaUNBQUksR0FBSixVQUFLLENBQUM7UUFDRixJQUFJLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLENBQUMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUM1QixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQztTQUNqQzthQUFNLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztTQUNsQzthQUFNLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUM7U0FDbEM7UUFFRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUdELHFDQUFRLEdBQVI7UUFBQSxpQkFtQkM7UUFqQkcsV0FBVyxDQUFDO1lBQ1IsSUFBSSxLQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixPQUFPO2FBQ1Y7WUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQU0sY0FBYyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRTNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRTtnQkFDekYsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsT0FBTzthQUNWO1lBRUQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3BGLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBdkRRO1FBQVIsS0FBSyxFQUFFO29EQUFZO0lBRVY7UUFBVCxNQUFNLEVBQUU7dURBQXFEO0lBSnJELGtCQUFrQjtRQUo5QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsOEJBQThCO1NBQzNDLENBQUM7T0FDVyxrQkFBa0IsQ0EwRDlCO0lBQUQseUJBQUM7Q0FBQSxBQTFERCxJQTBEQztTQTFEWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndHMtY291bnRkb3duJyxcbiAgICB0ZW1wbGF0ZTogJzxzcGFuPnt7Y291bnRlclRleHR9fTwvc3Bhbj4nXG59KVxuZXhwb3J0IGNsYXNzIENvdW50RG93bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBkYXRlOiBEYXRlO1xuICAgIGNvdW50ZXJUZXh0OiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIHJlYWNoZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB3YXNSZWFjaGVkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBkaG1zKHQpIHtcbiAgICAgICAgbGV0IGRheXMsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzO1xuICAgICAgICBkYXlzID0gTWF0aC5mbG9vcih0IC8gODY0MDApO1xuICAgICAgICB0IC09IGRheXMgKiA4NjQwMDtcbiAgICAgICAgaG91cnMgPSBNYXRoLmZsb29yKHQgLyAzNjAwKSAlIDI0O1xuICAgICAgICB0IC09IGhvdXJzICogMzYwMDtcbiAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3IodCAvIDYwKSAlIDYwO1xuICAgICAgICB0IC09IG1pbnV0ZXMgKiA2MDtcbiAgICAgICAgc2Vjb25kcyA9IHQgJSA2MDtcblxuICAgICAgICBjb25zdCByZXRBcnI6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGlmIChkYXlzID4gMCkge1xuICAgICAgICAgICAgcmV0QXJyLnB1c2goZGF5cyArICcgZGF5cycpO1xuICAgICAgICAgICAgcmV0QXJyLnB1c2goaG91cnMgKyAnIGhvdXJzJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAwKSB7XG4gICAgICAgICAgICByZXRBcnIucHVzaChob3VycyArICcgaG91cnMnKTtcbiAgICAgICAgICAgIHJldEFyci5wdXNoKG1pbnV0ZXMgKyAnIG1pbnMnKTtcbiAgICAgICAgfSBlbHNlIGlmIChtaW51dGVzID4gMCkge1xuICAgICAgICAgICAgcmV0QXJyLnB1c2gobWludXRlcyArICcgbWlucycpO1xuICAgICAgICAgICAgcmV0QXJyLnB1c2goc2Vjb25kcyArICcgc2VjcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0QXJyLnB1c2goc2Vjb25kcyArICcgc2VjcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldEFyci5qb2luKCcgJyk7XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy53YXNSZWFjaGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZURpZmZlcmVuY2UgPSB0aGlzLmRhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcblxuICAgICAgICAgICAgaWYgKChkYXRlRGlmZmVyZW5jZSA8IDEwMDAgJiYgZGF0ZURpZmZlcmVuY2UgPiAwKSB8fCBkYXRlRGlmZmVyZW5jZSA8IDAgJiYgIXRoaXMud2FzUmVhY2hlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMud2FzUmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWFjaGVkLmVtaXQodGhpcy53YXNSZWFjaGVkKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXhTZWNUaW1lID0gTWF0aC5mbG9vcigodGhpcy5kYXRlLmdldFRpbWUoKSAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIDEwMDApO1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyVGV4dCA9IHRoaXMuZGhtcyh1bml4U2VjVGltZSk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cbn1cbiJdfQ==