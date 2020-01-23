import { ValidatorFn, AbstractControlOptions, AsyncValidatorFn, FormGroup, FormControl, ValidationErrors } from '@angular/forms';

export default function createFormGroup<T>(
    data: T = {} as T,
    validatorOrOpts: Partial<Record<
        keyof T,
        ValidatorFn |
        ValidatorFn[] |
        AbstractControlOptions>> = {} as any,
    asyncValidator: Partial<Record<
        keyof T,
        AsyncValidatorFn | AsyncValidatorFn[]>> = {} as any
    ) {
        let controls = {};
        Object.keys(data).map(k => controls[k] = new FormControl(data[k], validatorOrOpts[k], asyncValidator[k]));
    return new FormGroup(controls);
}

export function getControlErrors<T>(form: FormGroup, name: Extract<keyof T, string>): ValidationErrors {
    return form.get(name).errors;
}