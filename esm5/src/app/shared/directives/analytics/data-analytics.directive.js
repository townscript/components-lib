import * as tslib_1 from "tslib";
import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { DataCollectorService } from '../../services/analytics/data-collector.service';
var DataAnalyticsDirective = /** @class */ (function () {
    function DataAnalyticsDirective(elementRef, dataCollectorService) {
        this.elementRef = elementRef;
        this.dataCollectorService = dataCollectorService;
    }
    DataAnalyticsDirective.prototype.ngOnInit = function () {
    };
    DataAnalyticsDirective.prototype.clickEvent = function (event) {
        try {
            event.stopPropagation();
            var currentNode = this.elementRef.nativeElement;
            var tempClickLocation = "";
            while (currentNode.nodeType == 1 || currentNode.parentNode != null) {
                if (currentNode.hasAttribute('clickLocation')) {
                    (tempClickLocation === "") ? tempClickLocation += currentNode.attributes['clickLocation'].nodeValue : tempClickLocation += '-' + currentNode.attributes['clickLocation'].nodeValue;
                }
                currentNode = currentNode.parentNode;
            }
            this.clickLocation = tempClickLocation;
            console.log(this.eventLabel);
            console.log(this.clickLocation);
            if (this.eventLabel) {
                this.dataCollectorService.sendClickDataToKinesis(this.eventLabel, this.clickLocation);
            }
        }
        catch (e) {
            console.log('exception occurred');
            console.log(e);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DataAnalyticsDirective.prototype, "eventLabel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DataAnalyticsDirective.prototype, "clickLocation", void 0);
    tslib_1.__decorate([
        HostListener('click', ['$event']),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], DataAnalyticsDirective.prototype, "clickEvent", null);
    DataAnalyticsDirective = tslib_1.__decorate([
        Directive({
            selector: '[appDataAnalytics]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, DataCollectorService])
    ], DataAnalyticsDirective);
    return DataAnalyticsDirective;
}());
export { DataAnalyticsDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1hbmFseXRpY3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2RpcmVjdGl2ZXMvYW5hbHl0aWNzL2RhdGEtYW5hbHl0aWNzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUt2RjtJQUdFLGdDQUE0QixVQUFzQixFQUFtQixvQkFBMEM7UUFBbkYsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFtQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQy9HLENBQUM7SUFDRCx5Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUdELDJDQUFVLEdBQVYsVUFBVyxLQUFVO1FBRW5CLElBQUk7WUFDQSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDaEQsSUFBSSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFFM0IsT0FBTyxXQUFXLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDbEUsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUM3QyxDQUFDLGlCQUFpQixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUNwTDtnQkFDRCxXQUFXLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQzthQUN0QztZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsaUJBQWlCLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDaEMsSUFBRyxJQUFJLENBQUMsVUFBVSxFQUFDO2dCQUNqQixJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDdkY7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7SUFDSCxDQUFDO0lBL0JRO1FBQVIsS0FBSyxFQUFFOzs4REFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O2lFQUF1QjtJQU8vQjtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs0REF3QmpDO0lBaENVLHNCQUFzQjtRQUhsQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsb0JBQW9CO1NBQy9CLENBQUM7aURBSXdDLFVBQVUsRUFBeUMsb0JBQW9CO09BSHBHLHNCQUFzQixDQWlDbEM7SUFBRCw2QkFBQztDQUFBLEFBakNELElBaUNDO1NBakNZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhQ29sbGVjdG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9kYXRhLWNvbGxlY3Rvci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcERhdGFBbmFseXRpY3NdJ1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhQW5hbHl0aWNzRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZXZlbnRMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBjbGlja0xvY2F0aW9uOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlYWRvbmx5IGRhdGFDb2xsZWN0b3JTZXJ2aWNlOiBEYXRhQ29sbGVjdG9yU2VydmljZSkge1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja0V2ZW50KGV2ZW50OiBhbnkpIHtcbiAgICBcbiAgICB0cnkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB0ZW1wQ2xpY2tMb2NhdGlvbiA9IFwiXCI7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09IDEgfHwgY3VycmVudE5vZGUucGFyZW50Tm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmhhc0F0dHJpYnV0ZSgnY2xpY2tMb2NhdGlvbicpKSB7XG4gICAgICAgICAgICAodGVtcENsaWNrTG9jYXRpb24gPT09IFwiXCIpID8gdGVtcENsaWNrTG9jYXRpb24gKz0gY3VycmVudE5vZGUuYXR0cmlidXRlc1snY2xpY2tMb2NhdGlvbiddLm5vZGVWYWx1ZSA6IHRlbXBDbGlja0xvY2F0aW9uICs9ICctJyArIGN1cnJlbnROb2RlLmF0dHJpYnV0ZXNbJ2NsaWNrTG9jYXRpb24nXS5ub2RlVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaWNrTG9jYXRpb24gPSB0ZW1wQ2xpY2tMb2NhdGlvbjtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ldmVudExhYmVsKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGlja0xvY2F0aW9uKTtcbiAgICAgICAgaWYodGhpcy5ldmVudExhYmVsKXtcbiAgICAgICAgICB0aGlzLmRhdGFDb2xsZWN0b3JTZXJ2aWNlLnNlbmRDbGlja0RhdGFUb0tpbmVzaXModGhpcy5ldmVudExhYmVsLCB0aGlzLmNsaWNrTG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ2V4Y2VwdGlvbiBvY2N1cnJlZCcpO1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG59Il19