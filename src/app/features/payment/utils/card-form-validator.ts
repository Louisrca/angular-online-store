import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cardNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.replace(/\s+/g, '');
    const regex = /^\d{13,19}$/;
    return value && !regex.test(value) ? { invalidCardNumber: true } : null;
  };
}

export function expirationDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (value && !regex.test(value)) return { invalidExpiration: true };

    if (regex.test(value)) {
      const [month, year] = value.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return { expired: true };
      }
    }

    return null;
  };
}

export function cvvValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const regex = /^\d{3,4}$/;
    return value && !regex.test(value) ? { invalidCvv: true } : null;
  };
}
