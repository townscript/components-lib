import * as tslib_1 from "tslib";
import { Directive, Input, OnInit, HostListener, ElementRef } from '@angular/core';
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
    DataAnalyticsDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DataCollectorService }
    ]; };
    tslib_1.__decorate([
        Input()
    ], DataAnalyticsDirective.prototype, "eventLabel", void 0);
    tslib_1.__decorate([
        Input()
    ], DataAnalyticsDirective.prototype, "clickLocation", void 0);
    tslib_1.__decorate([
        HostListener('click', ['$event'])
    ], DataAnalyticsDirective.prototype, "clickEvent", null);
    DataAnalyticsDirective = tslib_1.__decorate([
        Directive({
            selector: '[appDataAnalytics]'
        })
    ], DataAnalyticsDirective);
    return DataAnalyticsDirective;
}());
export { DataAnalyticsDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1hbmFseXRpY3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2RpcmVjdGl2ZXMvYW5hbHl0aWNzL2RhdGEtYW5hbHl0aWNzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFLdkY7SUFHRSxnQ0FBNEIsVUFBc0IsRUFBbUIsb0JBQTBDO1FBQW5GLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBbUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUMvRyxDQUFDO0lBQ0QseUNBQVEsR0FBUjtJQUNBLENBQUM7SUFHRCwyQ0FBVSxHQUFWLFVBQVcsS0FBVTtRQUVuQixJQUFJO1lBQ0EsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1lBQ2hELElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1lBRTNCLE9BQU8sV0FBVyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7Z0JBQ2xFLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsRUFBRTtvQkFDN0MsQ0FBQyxpQkFBaUIsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDcEw7Z0JBQ0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7YUFDdEM7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLGlCQUFpQixDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hDLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBQztnQkFDakIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZGO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7Z0JBN0J1QyxVQUFVO2dCQUF5QyxvQkFBb0I7O0lBRnRHO1FBQVIsS0FBSyxFQUFFOzhEQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTtpRUFBdUI7SUFPL0I7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7NERBd0JqQztJQWhDVSxzQkFBc0I7UUFIbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO09BQ1csc0JBQXNCLENBaUNsQztJQUFELDZCQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FqQ1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFDb2xsZWN0b3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYW5hbHl0aWNzL2RhdGEtY29sbGVjdG9yLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwRGF0YUFuYWx5dGljc10nXG59KVxuZXhwb3J0IGNsYXNzIERhdGFBbmFseXRpY3NEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBldmVudExhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsaWNrTG9jYXRpb246IHN0cmluZztcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVhZG9ubHkgZGF0YUNvbGxlY3RvclNlcnZpY2U6IERhdGFDb2xsZWN0b3JTZXJ2aWNlKSB7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIGNsaWNrRXZlbnQoZXZlbnQ6IGFueSkge1xuICAgIFxuICAgIHRyeSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBsZXQgY3VycmVudE5vZGUgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IHRlbXBDbGlja0xvY2F0aW9uID0gXCJcIjtcblxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUubm9kZVR5cGUgPT0gMSB8fCBjdXJyZW50Tm9kZS5wYXJlbnROb2RlICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAoY3VycmVudE5vZGUuaGFzQXR0cmlidXRlKCdjbGlja0xvY2F0aW9uJykpIHtcbiAgICAgICAgICAgICh0ZW1wQ2xpY2tMb2NhdGlvbiA9PT0gXCJcIikgPyB0ZW1wQ2xpY2tMb2NhdGlvbiArPSBjdXJyZW50Tm9kZS5hdHRyaWJ1dGVzWydjbGlja0xvY2F0aW9uJ10ubm9kZVZhbHVlIDogdGVtcENsaWNrTG9jYXRpb24gKz0gJy0nICsgY3VycmVudE5vZGUuYXR0cmlidXRlc1snY2xpY2tMb2NhdGlvbiddLm5vZGVWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xpY2tMb2NhdGlvbiA9IHRlbXBDbGlja0xvY2F0aW9uO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmV2ZW50TGFiZWwpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNsaWNrTG9jYXRpb24pO1xuICAgICAgICBpZih0aGlzLmV2ZW50TGFiZWwpe1xuICAgICAgICAgIHRoaXMuZGF0YUNvbGxlY3RvclNlcnZpY2Uuc2VuZENsaWNrRGF0YVRvS2luZXNpcyh0aGlzLmV2ZW50TGFiZWwsIHRoaXMuY2xpY2tMb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZXhjZXB0aW9uIG9jY3VycmVkJyk7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn0iXX0=