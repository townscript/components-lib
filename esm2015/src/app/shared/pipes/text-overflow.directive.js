import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as clampLibImported from 'text-overflow-clamp';
const clampLib = clampLibImported;
// tslint:disable-next-line: directive-selector
let TextOverflowClampDirective = class TextOverflowClampDirective {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        clampLib(this.el.nativeElement, this.lines);
    }
};
TextOverflowClampDirective.ctorParameters = () => [
    { type: ElementRef }
];
tslib_1.__decorate([
    Input('clamp')
], TextOverflowClampDirective.prototype, "lines", void 0);
TextOverflowClampDirective = tslib_1.__decorate([
    Directive({ selector: '[clamp]' })
], TextOverflowClampDirective);
export { TextOverflowClampDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1vdmVyZmxvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9zaGFyZWQvcGlwZXMvdGV4dC1vdmVyZmxvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUUsT0FBTyxLQUFLLGdCQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBRXhELE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDO0FBRWxDLCtDQUErQztBQUUvQyxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQUduQyxZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUNsQyxDQUFDO0lBRUQsZUFBZTtRQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNKLENBQUE7O1lBTjJCLFVBQVU7O0FBRmxCO0lBQWYsS0FBSyxDQUFDLE9BQU8sQ0FBQzt5REFBZTtBQURyQiwwQkFBMEI7SUFEdEMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDO0dBQ3RCLDBCQUEwQixDQVN0QztTQVRZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgY2xhbXBMaWJJbXBvcnRlZCBmcm9tICd0ZXh0LW92ZXJmbG93LWNsYW1wJztcblxuY29uc3QgY2xhbXBMaWIgPSBjbGFtcExpYkltcG9ydGVkO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NsYW1wXScgfSlcbmV4cG9ydCBjbGFzcyBUZXh0T3ZlcmZsb3dDbGFtcERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIEBJbnB1dCgnY2xhbXAnKSBsaW5lczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY2xhbXBMaWIodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmxpbmVzKTtcbiAgICB9XG59Il19