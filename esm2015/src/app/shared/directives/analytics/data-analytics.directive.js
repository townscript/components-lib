import { __decorate } from "tslib";
import { Directive, Input, OnInit, HostListener, ElementRef } from '@angular/core';
import { DataCollectorService } from '../../services/analytics/data-collector.service';
let DataAnalyticsDirective = class DataAnalyticsDirective {
    constructor(elementRef, dataCollectorService) {
        this.elementRef = elementRef;
        this.dataCollectorService = dataCollectorService;
    }
    ngOnInit() {
    }
    clickEvent(event) {
        try {
            event.stopPropagation();
            let currentNode = this.elementRef.nativeElement;
            let tempClickLocation = "";
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
    }
};
DataAnalyticsDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DataCollectorService }
];
__decorate([
    Input()
], DataAnalyticsDirective.prototype, "eventLabel", void 0);
__decorate([
    Input()
], DataAnalyticsDirective.prototype, "clickLocation", void 0);
__decorate([
    HostListener('click', ['$event'])
], DataAnalyticsDirective.prototype, "clickEvent", null);
DataAnalyticsDirective = __decorate([
    Directive({
        selector: '[appDataAnalytics]'
    })
], DataAnalyticsDirective);
export { DataAnalyticsDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1hbmFseXRpY3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2RpcmVjdGl2ZXMvYW5hbHl0aWNzL2RhdGEtYW5hbHl0aWNzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFLdkYsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFHakMsWUFBNEIsVUFBc0IsRUFBbUIsb0JBQTBDO1FBQW5GLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBbUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUMvRyxDQUFDO0lBQ0QsUUFBUTtJQUNSLENBQUM7SUFHRCxVQUFVLENBQUMsS0FBVTtRQUVuQixJQUFJO1lBQ0EsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ2hELElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1lBRTNCLE9BQU8sV0FBVyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7Z0JBQ2xFLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRTtvQkFDN0MsQ0FBQyxpQkFBaUIsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDcEw7Z0JBQ0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7YUFDdEM7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLGlCQUFpQixDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hDLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBQztnQkFDakIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZGO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBOUJ5QyxVQUFVO1lBQXlDLG9CQUFvQjs7QUFGdEc7SUFBUixLQUFLLEVBQUU7MERBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzZEQUF1QjtBQU8vQjtJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3REF3QmpDO0FBaENVLHNCQUFzQjtJQUhsQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO0tBQy9CLENBQUM7R0FDVyxzQkFBc0IsQ0FpQ2xDO1NBakNZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhQ29sbGVjdG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FuYWx5dGljcy9kYXRhLWNvbGxlY3Rvci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcERhdGFBbmFseXRpY3NdJ1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhQW5hbHl0aWNzRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZXZlbnRMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBjbGlja0xvY2F0aW9uOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlYWRvbmx5IGRhdGFDb2xsZWN0b3JTZXJ2aWNlOiBEYXRhQ29sbGVjdG9yU2VydmljZSkge1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBjbGlja0V2ZW50KGV2ZW50OiBhbnkpIHtcbiAgICBcbiAgICB0cnkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB0ZW1wQ2xpY2tMb2NhdGlvbiA9IFwiXCI7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09IDEgfHwgY3VycmVudE5vZGUucGFyZW50Tm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmhhc0F0dHJpYnV0ZSgnY2xpY2tMb2NhdGlvbicpKSB7XG4gICAgICAgICAgICAodGVtcENsaWNrTG9jYXRpb24gPT09IFwiXCIpID8gdGVtcENsaWNrTG9jYXRpb24gKz0gY3VycmVudE5vZGUuYXR0cmlidXRlc1snY2xpY2tMb2NhdGlvbiddLm5vZGVWYWx1ZSA6IHRlbXBDbGlja0xvY2F0aW9uICs9ICctJyArIGN1cnJlbnROb2RlLmF0dHJpYnV0ZXNbJ2NsaWNrTG9jYXRpb24nXS5ub2RlVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsaWNrTG9jYXRpb24gPSB0ZW1wQ2xpY2tMb2NhdGlvbjtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ldmVudExhYmVsKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGlja0xvY2F0aW9uKTtcbiAgICAgICAgaWYodGhpcy5ldmVudExhYmVsKXtcbiAgICAgICAgICB0aGlzLmRhdGFDb2xsZWN0b3JTZXJ2aWNlLnNlbmRDbGlja0RhdGFUb0tpbmVzaXModGhpcy5ldmVudExhYmVsLCB0aGlzLmNsaWNrTG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ2V4Y2VwdGlvbiBvY2N1cnJlZCcpO1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG59Il19