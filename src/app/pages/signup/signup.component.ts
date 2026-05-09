// src/app/pages/signup/signup.component.ts

import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../components/input/input.component';
import { SelectComponent } from '../../components/select/select.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { PasswordChecklistComponent } from '../../components/password-checklist/password-checklist.component';
import { NIGERIAN_STATES } from '../../data/nigerian-states';
import type { RegisterPayload } from '../../types/auth.types';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    AlertComponent,
    PasswordChecklistComponent,
  ],
  templateUrl: './signup.html',
  styleUrl: './styles.css',
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly states = NIGERIAN_STATES;
  readonly showPassword = signal(false);

  readonly signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    state: ['', Validators.required],
    password: ['', Validators.required],
  });

  get nameControl() {
    return this.signupForm.get('name') as FormControl;
  }

  get emailControl() {
    return this.signupForm.get('email') as FormControl;
  }

  get stateControl() {
    return this.signupForm.get('state') as FormControl;
  }

  get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }

  canSubmit(): boolean {
    const password = this.passwordControl.value || '';
    const allRequirementsMet = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ].every(Boolean);

    return this.signupForm.valid && allRequirementsMet && !this.authService.isLoading();
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    if (this.signupForm.invalid || !this.canSubmit()) return;

    const payload: RegisterPayload = this.signupForm.value;

    this.authService.register(payload).subscribe({
      next: (response) => {
        this.authService.saveToken(response.data.access_token);
        this.authService.saveUser(response.data.user);
        this.authService.setSuccess();
        this.router.navigate(['/']);
      },
      error: () => {
        // Error handled in service
      },
    });
  }
}
