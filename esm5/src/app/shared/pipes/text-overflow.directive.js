import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import * as clampLibImported from 'text-overflow-clamp';
var clampLib = clampLibImported;
// tslint:disable-next-line: directive-selector
var TextOverflowClampDirective = /** @class */ (function () {
    function TextOverflowClampDirective(el) {
        this.el = el;
    }
    TextOverflowClampDirective.prototype.ngAfterViewInit = function () {
        clampLib(this.el.nativeElement, this.lines);
    };
    tslib_1.__decorate([
        Input('clamp'),
        tslib_1.__metadata("design:type", Number)
    ], TextOverflowClampDirective.prototype, "lines", void 0);
    TextOverflowClampDirective = tslib_1.__decorate([
        Directive({ selector: '[clamp]' }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], TextOverflowClampDirective);
    return TextOverflowClampDirective;
}());
export { TextOverflowClampDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1vdmVyZmxvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvcGlwZXMvdGV4dC1vdmVyZmxvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFNUUsT0FBTyxLQUFLLGdCQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBRXhELElBQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDO0FBRWxDLCtDQUErQztBQUUvQztJQUdJLG9DQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUNsQyxDQUFDO0lBRUQsb0RBQWUsR0FBZjtRQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQVBlO1FBQWYsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7NkRBQWU7SUFEckIsMEJBQTBCO1FBRHRDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztpREFJUCxVQUFVO09BSHpCLDBCQUEwQixDQVN0QztJQUFELGlDQUFDO0NBQUEsQUFURCxJQVNDO1NBVFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBjbGFtcExpYkltcG9ydGVkIGZyb20gJ3RleHQtb3ZlcmZsb3ctY2xhbXAnO1xuXG5jb25zdCBjbGFtcExpYiA9IGNsYW1wTGliSW1wb3J0ZWQ7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2xhbXBdJyB9KVxuZXhwb3J0IGNsYXNzIFRleHRPdmVyZmxvd0NsYW1wRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KCdjbGFtcCcpIGxpbmVzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBjbGFtcExpYih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMubGluZXMpO1xuICAgIH1cbn0iXX0=