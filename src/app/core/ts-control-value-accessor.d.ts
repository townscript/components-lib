import { ControlValueAccessor } from '@angular/forms';
export declare abstract class TsControlValueAccessor implements ControlValueAccessor {
    onChangePropagation: any;
    registerOnChange(fn: any): void;
    onTouchedPropagation: any;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    abstract writeValue(obj: any): void;
}
