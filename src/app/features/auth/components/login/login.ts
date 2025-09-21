import { Component, inject, signal } from '@angular/core';
import { InputComponent } from '../../../../shared/components/design-system/input/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServices } from '../../services/auth';
import { Users } from '../../../../infrastructures/mocks/users';
import { LoginCredentials } from '../../models/auth.model';
import { BaseComponent } from '../../../../shared/components/base-translate/base-translate';
import { TRANSLATE_IMPORTS } from '../../../../shared/imports/translate-imports';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ReactiveFormsModule, FormsModule, ...TRANSLATE_IMPORTS],
  templateUrl: './login.html',
})
export class Login extends BaseComponent {
  private fb = inject(FormBuilder);
  authServices = inject(AuthServices);
  users = Users;
  loginForm: FormGroup;
  loading = signal(false);
  error = signal('');
  isDisabled = true;
  submitted = false;

  constructor() {
    super();
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  getFormError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

    if (field?.errors) {
      if (field.errors['required']) return 'connexionPage.requiredField';
      if (field.errors['email']) return 'connexionPage.invalidEmailFormat';
      if (field.errors['minlength']) return 'connexionPage.minimumCharacters';
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    if (!field) return false;

    return field.invalid && this.submitted;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    if (this.loginForm.valid) {
      try {
        this.authServices.login(this.loginForm.value as LoginCredentials);
        this.loginForm.reset();
        this.submitted = false;
      } catch (error: unknown) {
        this.error.set((error as Error).message || 'Erreur lors de la connexion');
      }
    }
  }
}
