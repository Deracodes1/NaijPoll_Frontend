// src/app/services/auth.service.ts

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import type { UserProfile } from '../types/user.types';
import type {
  RegisterPayload,
  RegisterResponseData,
  ApiSuccessResponse,
  ApiErrorResponse,
  LoginPayload,
  LoginResponseData,
} from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);
  readonly user = signal<UserProfile | null>(this.getStoredUser());

  register(payload: RegisterPayload): Observable<ApiSuccessResponse<RegisterResponseData>> {
    this.isLoading.set(true);
    this.error.set(null);
    this.success.set(false);

    return this.http
      .post<ApiSuccessResponse<RegisterResponseData>>(`${this.apiUrl}/auth/register`, payload)
      .pipe(
        catchError((error) => {
          const apiError = error.error as ApiErrorResponse;
          const message = Array.isArray(apiError.message)
            ? apiError.message.join(', ')
            : apiError.message || 'An unexpected error occurred';
          this.error.set(message);
          this.isLoading.set(false);
          return throwError(() => error);
        }),
      );
  }
  login(payload: LoginPayload): Observable<ApiSuccessResponse<LoginResponseData>> {
    this.isLoading.set(true);
    this.error.set(null);
    this.success.set(false);

    return this.http
      .post<ApiSuccessResponse<LoginResponseData>>(`${this.apiUrl}/auth/login`, payload)
      .pipe(
        catchError((error) => {
          const apiError = error.error as ApiErrorResponse;
          const message = Array.isArray(apiError.message)
            ? apiError.message.join(', ')
            : apiError.message || 'Invalid credentials';
          this.error.set(message);
          this.isLoading.set(false);
          return throwError(() => error);
        }),
      );
  }

  saveToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
  saveUser(user: UserProfile): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.user.set(user);
  }

  getStoredUser(): UserProfile | null {
    const stored = sessionStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }
  clearAuth(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    this.user.set(null);
  }

  setSuccess(): void {
    this.success.set(true);
    this.isLoading.set(false);
    this.error.set(null);
  }

  resetState(): void {
    this.isLoading.set(false);
    this.error.set(null);
    this.success.set(false);
  }
}
