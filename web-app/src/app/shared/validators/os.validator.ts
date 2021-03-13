import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator for the Operating System input field
 * 
 * @param control - the Operating System text box
 */
export function OperatingSystemValidator(): ValidatorFn { 
    return (control: AbstractControl) : { [key: string]: any} | null => {
        if(control.value !== '') {
            var value = String(control.value);
            if (value.match(/[,]+/)) // Do not allow commas in the OS name field
            {
                return { 'invalidOs' : true};
            } else {
                return null;
            }
        }
        return { 'invalidOs' : true}
    }
}