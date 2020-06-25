import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var SearchSuggestionComponent = /** @class */ (function () {
    function SearchSuggestionComponent() {
        this.itemSelected = new EventEmitter();
    }
    SearchSuggestionComponent.prototype.ngOnInit = function () {
        this.isActive = false;
    };
    SearchSuggestionComponent.prototype.setActive = function (val) {
        this.isActive = val;
    };
    SearchSuggestionComponent.prototype.selectItem = function () {
        this.itemSelected.emit(this.item);
    };
    tslib_1.__decorate([
        Input()
    ], SearchSuggestionComponent.prototype, "item", void 0);
    tslib_1.__decorate([
        Input()
    ], SearchSuggestionComponent.prototype, "searchText", void 0);
    tslib_1.__decorate([
        Output()
    ], SearchSuggestionComponent.prototype, "itemSelected", void 0);
    SearchSuggestionComponent = tslib_1.__decorate([
        Component({
            selector: 'app-search-suggestion',
            template: "<div class=\"list-item flex flex-row cursor-pointer\" [ngClass]=\"isActive? 'activeItem':''\">\n    <div>\n        <i matRipple class=\"px-4 text-xl mdi mdi-magnify text-gray-600 md:text-xl align-middle\"></i>\n    </div>\n    <div class=\"flex-grow self-center truncate\" *ngIf=\"item.suggestion.includes(searchText)\">\n        <span class=\"font-normal text-gray-800\">{{searchText}}</span>\n        <span class=\"font-semibold\">{{item.suggestion.replace(searchText,\"\")}}</span>\n    </div>\n    <div class=\"flex-grow self-center truncate\" *ngIf=\"!item.suggestion.includes(searchText)\">\n        <span class=\"font-normal text-gray-800\">{{item.suggestion}}</span>                                \n    </div>\n</div>\n",
            styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.activeItem{background-color:#ededed}"]
        })
    ], SearchSuggestionComponent);
    return SearchSuggestionComponent;
}());
export { SearchSuggestionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvc2VhcmNoLXN1Z2dlc3Rpb24vc2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTy9FO0lBTUU7UUFGVSxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFFakMsQ0FBQztJQUVqQiw0Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVELDZDQUFTLEdBQVQsVUFBVSxHQUFHO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDdEIsQ0FBQztJQUVELDhDQUFVLEdBQVY7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQWhCUTtRQUFSLEtBQUssRUFBRTsyREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFO2lFQUFZO0lBQ1Y7UUFBVCxNQUFNLEVBQUU7bUVBQXdDO0lBSnRDLHlCQUF5QjtRQUxyQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLG91QkFBaUQ7O1NBRWxELENBQUM7T0FDVyx5QkFBeUIsQ0FvQnJDO0lBQUQsZ0NBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQXBCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1zZWFyY2gtc3VnZ2VzdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtc3VnZ2VzdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1zdWdnZXN0aW9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoU3VnZ2VzdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgaXRlbTtcbiAgQElucHV0KCkgc2VhcmNoVGV4dDtcbiAgQE91dHB1dCgpIGl0ZW1TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBzZXRBY3RpdmUodmFsKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHZhbDtcbiAgfVxuXG4gIHNlbGVjdEl0ZW0oKSB7XG4gICAgdGhpcy5pdGVtU2VsZWN0ZWQuZW1pdCh0aGlzLml0ZW0pO1xuICB9XG5cbn1cbiJdfQ==