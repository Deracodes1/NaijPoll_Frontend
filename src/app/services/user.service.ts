import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { UserProfile } from '../types/user.types';
import type { ApiSuccessResponse } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getProfile(userId: string): Observable<ApiSuccessResponse<UserProfile>> {
    return this.http.get<ApiSuccessResponse<UserProfile>>(`${this.apiUrl}/users/${userId}`);
  }
}
