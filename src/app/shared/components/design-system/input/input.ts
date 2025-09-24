import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() required = false;
  @Input() errorMessage = '';
  @Input() hasError = false;

  @Input() digitsOnly = false;
  @Input() cardNumberFormatter = false;
  @Input() expirationMask = false;
  @Input() maxlength?: number;
  @Input() phoneFormatter = false;

  value = '';
  disabled = false;
  inputId = `custom-input-${Math.random().toString(36).substring(2, 9)}`;

  private onChange: (value: string) => void = () => {
    return;
  };
  private onTouched: () => void = () => {
    return;
  };

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let val = target.value;

    if (this.digitsOnly) val = val.replace(/\D/g, '').slice(0, 3);
    if (this.cardNumberFormatter) val = this.formatCardNumber(val);
    if (this.expirationMask) val = this.formatExpiration(val);
    if (this.phoneFormatter) val = this.formatPhone(val);
    if (this.maxlength) val = val.slice(0, this.maxlength);

    target.value = val;
    this.value = val;
    this.onChange(val);
  }

  onBlur(): void {
    this.onTouched();
  }

  // Formatte numéro de carte en groupes de 4
  private formatCardNumber(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trimEnd();
  }

  private formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    return digits.replace(/(\d{2})(?=\d)/g, '$1 ').trimEnd();
  }

  // Formatte expiration en MM/YY
  private formatExpiration(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }
}
