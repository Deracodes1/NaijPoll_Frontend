import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { Poll, PollsResponse, ResultsResponse } from '../types/poll.types';
import type { ApiSuccessResponse } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getPolls(
    status?: string,
    page: number = 1,
    limit: number = 10,
  ): Observable<ApiSuccessResponse<PollsResponse>> {
    let url = `${this.apiUrl}/polls?page=${page}&limit=${limit}`;
    if (status && status !== 'all') {
      url += `&status=${status}`;
    }
    return this.http.get<ApiSuccessResponse<PollsResponse>>(url);
  }

  getPoll(id: string): Observable<ApiSuccessResponse<Poll>> {
    return this.http.get<ApiSuccessResponse<Poll>>(`${this.apiUrl}/polls/${id}`);
  }
  submitVote(pollId: string, optionId: string) {
    return this.http.post<{
      success: boolean;
      statusCode: number;
      data: any;
      message: string;
    }>(`${this.apiUrl}/polls/${pollId}/votes`, { optionId });
  }
  getPollResults(pollId: string, state?: string) {
    let url = `${this.apiUrl}/polls/${pollId}/votes/results`;

    if (state && state !== 'All States') {
      url += `?state=${encodeURIComponent(state)}`;
    }

    return this.http.get<ResultsResponse>(url);
  }
}
