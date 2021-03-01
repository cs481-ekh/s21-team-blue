import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator for the IP Address input field
 * 
 * @param control - the IP Address text box
 */
export function IpAddressValidator(): ValidatorFn { 
    return (control: AbstractControl) : { [key: string]: any} | null => {
        var pattern = "^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$";
        if(control.value !== ''){
            var value = String(control.value);
            if (value.match(/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/))
            {
                return null;
            } else {
                return { 'invalidIp' : true}
            }
        }
        return { 'invalidIp' : true}
    }
}