// src/app/services/auth.service.ts

import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import type {
  RegisterPayload,
  RegisterResponseData,
  ApiSuccessResponse,
  ApiErrorResponse,
} from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/v1';

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);

  register(payload: RegisterPayload): Observable<ApiSuccessResponse<RegisterResponseData>> {
    this.isLoading.set(true);
    this.error.set(null);
    this.success.set(false);

    return this.http
      .post<ApiSuccessResponse<RegisterResponseData>>(
        `${this.apiUrl}/auth/register`,
        payload
      )
      .pipe(
        catchError((error) => {
          const apiError = error.error as ApiErrorResponse;
          const message = Array.isArray(apiError.message)
            ? apiError.message.join(', ')
            : apiError.message || 'An unexpected error occurred';
          this.error.set(message);
          this.isLoading.set(false);
          return throwError(() => error);
        })
      );
  }

  saveToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  clearToken(): void {
    sessionStorage.removeItem('access_token');
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
