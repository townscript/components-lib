import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let SearchSuggestionComponent = class SearchSuggestionComponent {
    constructor() {
        this.itemSelected = new EventEmitter();
    }
    ngOnInit() {
        this.isActive = false;
    }
    setActive(val) {
        this.isActive = val;
    }
    selectItem() {
        this.itemSelected.emit(this.item);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SearchSuggestionComponent.prototype, "item", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SearchSuggestionComponent.prototype, "searchText", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SearchSuggestionComponent.prototype, "itemSelected", void 0);
SearchSuggestionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-search-suggestion',
        template: "<div class=\"list-item flex flex-row cursor-pointer\" [ngClass]=\"isActive? 'activeItem':''\">\n    <i matRipple class=\"px-4 text-xl mdi mdi-magnify text-gray-400 md:text-xl align-middle\"></i>\n    <div class=\"flex-grow self-center\" *ngIf=\"item.suggestion.includes(searchText)\">\n        <span class=\"text-gray-800 font-light\">{{searchText}}</span>\n        <span>{{item.suggestion.replace(searchText,\"\")}}</span>\n    </div>\n    <div class=\"flex-grow self-center\" *ngIf=\"!item.suggestion.includes(searchText)\">\n        <span>{{item.suggestion}}</span>                                \n    </div>\n</div>\n",
        styles: [".color-blue{color:#3782c4}.background-blue{background:#3782c4}.activeItem{background-color:#ededed}"]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], SearchSuggestionComponent);
export { SearchSuggestionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvc2VhcmNoLXN1Z2dlc3Rpb24vc2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTy9FLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBTXBDO1FBRlUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBRWpDLENBQUM7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBRztRQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FFRixDQUFBO0FBbEJVO0lBQVIsS0FBSyxFQUFFOzt1REFBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzs2REFBWTtBQUNWO0lBQVQsTUFBTSxFQUFFOzsrREFBd0M7QUFKdEMseUJBQXlCO0lBTHJDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsMG5CQUFpRDs7S0FFbEQsQ0FBQzs7R0FDVyx5QkFBeUIsQ0FvQnJDO1NBcEJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXNlYXJjaC1zdWdnZXN0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1zdWdnZXN0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hTdWdnZXN0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBpdGVtO1xuICBASW5wdXQoKSBzZWFyY2hUZXh0O1xuICBAT3V0cHV0KCkgaXRlbVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIGlzQWN0aXZlOiBib29sZWFuO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIHNldEFjdGl2ZSh2YWwpIHtcbiAgICB0aGlzLmlzQWN0aXZlID0gdmFsO1xuICB9XG5cbiAgc2VsZWN0SXRlbSgpIHtcbiAgICB0aGlzLml0ZW1TZWxlY3RlZC5lbWl0KHRoaXMuaXRlbSk7XG4gIH1cblxufVxuIl19