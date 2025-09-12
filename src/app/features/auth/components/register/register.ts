import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input';
import { AuthServices } from '../../services/auth';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RegisterCredentials } from '../../models/auth.model';
import { Users } from '../../../../infrastructures/mocks/users';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null;
}
@Component({
  selector: 'app-register',
  imports: [InputComponent, ReactiveFormsModule, FormsModule, ...TRANSLATE_IMPORTS],
  templateUrl: './register.html',
})
export class Register extends BaseComponent {
  private fb = inject(FormBuilder);
  authServices = inject(AuthServices);
  users = Users;
  registerForm: FormGroup;
  loading = signal(false);
  error = signal('');
  isDisabled = true;
  submitted = false;

  constructor() {
    super();
    this.registerForm = this.fb.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
        role: new FormControl('user'),
      },
      { validators: passwordMatchValidator },
    );
  }

  getFormError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);

    if (field?.errors) {
      if (field.errors['required']) return 'connexionPage.requiredField';
      if (field.errors['email']) return 'connexionPage.invalidEmailFormat';
      if (field.errors['minlength']) return 'connexionPage.minimumCharacters';
    }

    if (fieldName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch')) {
      return 'connexionPage.passwordMismatch';
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    if (!field) return false;

    if (fieldName === 'password' || fieldName === 'confirmPassword') {
      return field.invalid && (field.dirty || field.touched);
    }

    return field.invalid && this.submitted;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    if (this.registerForm.valid) {
      try {
        this.authServices.register(this.registerForm.value as RegisterCredentials);
        this.registerForm.reset();
        this.submitted = false;
      } catch (error: unknown) {
        this.error.set((error as Error).message || 'Erreur lors de l’enregistrement');
      }
    }
  }
}
