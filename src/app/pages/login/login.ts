import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AlertComponent } from '../../components/alert/alert.component';
import type { LoginPayload } from '../../types/auth.types';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, AlertComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  canSubmit(): boolean {
    return this.loginForm.valid && !this.authService.isLoading();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const payload: LoginPayload = this.loginForm.value;

    this.authService.login(payload).subscribe({
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
