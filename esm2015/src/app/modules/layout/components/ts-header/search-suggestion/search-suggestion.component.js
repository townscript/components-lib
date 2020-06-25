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
export { SearchSuggestionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHRvd25zY3JpcHQvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sYXlvdXQvY29tcG9uZW50cy90cy1oZWFkZXIvc2VhcmNoLXN1Z2dlc3Rpb24vc2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTy9FLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBTXBDO1FBRlUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBRWpDLENBQUM7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBRztRQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FFRixDQUFBO0FBbEJVO0lBQVIsS0FBSyxFQUFFO3VEQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7NkRBQVk7QUFDVjtJQUFULE1BQU0sRUFBRTsrREFBd0M7QUFKdEMseUJBQXlCO0lBTHJDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsb3VCQUFpRDs7S0FFbEQsQ0FBQztHQUNXLHlCQUF5QixDQW9CckM7U0FwQlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtc2VhcmNoLXN1Z2dlc3Rpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLXN1Z2dlc3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtc3VnZ2VzdGlvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFN1Z2dlc3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGl0ZW07XG4gIEBJbnB1dCgpIHNlYXJjaFRleHQ7XG4gIEBPdXRwdXQoKSBpdGVtU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgaXNBY3RpdmU6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgc2V0QWN0aXZlKHZhbCkge1xuICAgIHRoaXMuaXNBY3RpdmUgPSB2YWw7XG4gIH1cblxuICBzZWxlY3RJdGVtKCkge1xuICAgIHRoaXMuaXRlbVNlbGVjdGVkLmVtaXQodGhpcy5pdGVtKTtcbiAgfVxuXG59XG4iXX0=