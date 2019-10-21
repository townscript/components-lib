import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let TsCardSkeletonComponent = class TsCardSkeletonComponent {
    constructor() {
        this.gridType = "list";
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], TsCardSkeletonComponent.prototype, "gridType", void 0);
TsCardSkeletonComponent = tslib_1.__decorate([
    Component({
        selector: 'ts-card-skeleton',
        template: "<div class=\"w-full flex\">\n    <div class=\"w-full\">\n        <div class=\"bg-white border border-gray-300 card flex flex-col  overflow-hidden rounded translate-3d-none-after w-full\"\n            [ngClass]=\"{'md:flex-row': gridType=='list'}\">\n            <div class=\"w-full relative p-24 text-primary-500\"\n                [ngClass]=\"{'lg:w-2/3 md:w-2/3 md:p-0': gridType=='list'}\">\n                <div class=\"absolute top-0 left-0 h-full w-full\">\n                    <span class=\"skeleton-box group-hover:scale-110 transition-transform transform-center block h-full\">\n                    </span>\n                </div>\n            </div>\n            <div class=\"flex flex-col flex-grow w-full\">\n                <div class=\"pl-4 pr-4 pt-4 mb-4 text-left relative flex-grow\">\n                    <h3 class=\"text-lg font-bold text-gray-darkest mr-10\">\n                        <span class=\"skeleton-box h-5 w-1/6 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-1/2 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-2/4 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-2/5 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-2/3 inline-block\"></span>\n                        <span class=\"skeleton-box h-5 w-3/4 inline-block\"></span>\n                    </h3>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
        styles: [".skeleton-box{position:relative;overflow:hidden;background-color:#e2e8f0}.skeleton-box::after{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);background-image:-webkit-gradient(linear,left top,right top,color-stop(0,rgba(255,255,255,0)),color-stop(20%,rgba(255,255,255,.2)),color-stop(60%,rgba(255,255,255,.5)),to(rgba(255,255,255,0)));background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0));-webkit-animation:1.5s infinite shimmer;animation:1.5s infinite shimmer;content:''}@-webkit-keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TsCardSkeletonComponent);
export { TsCardSkeletonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHMtY2FyZC1za2VsZXRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdG93bnNjcmlwdC9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tb2R1bGVzL2NhcmRzL3RzLWNhcmQtc2tlbGV0b24vdHMtY2FyZC1za2VsZXRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3pELElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBR2xDO1FBRFMsYUFBUSxHQUFXLE1BQU0sQ0FBQztJQUNuQixDQUFDO0lBRWpCLFFBQVE7SUFDUixDQUFDO0NBRUYsQ0FBQTtBQU5VO0lBQVIsS0FBSyxFQUFFOzt5REFBMkI7QUFGeEIsdUJBQXVCO0lBTG5DLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsbytDQUFnRDs7S0FFakQsQ0FBQzs7R0FDVyx1QkFBdUIsQ0FRbkM7U0FSWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndHMtY2FyZC1za2VsZXRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi90cy1jYXJkLXNrZWxldG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHMtY2FyZC1za2VsZXRvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRzQ2FyZFNrZWxldG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBncmlkVHlwZTogc3RyaW5nID0gXCJsaXN0XCI7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19