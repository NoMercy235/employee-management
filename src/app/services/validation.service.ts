import { AbstractControl } from '@angular/forms';
import { EMPLOYEE_STEPS } from '../templates/employee.model';

export class ValidationService {
  static isValidStep(control: AbstractControl) {
    const exists = Object.keys(EMPLOYEE_STEPS)
      .map(key => EMPLOYEE_STEPS[key])
      .find(step => step === control.value);

    return exists ? null : { validStep: true };
  }
}
