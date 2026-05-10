import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PollService } from '../../../services/poll-service';
import type { Poll, PollStatus } from '../../../types/poll.types';
import { UpperCasePipe, DatePipe } from '@angular/common';
@Component({
  selector: 'app-poll-detail',
  imports: [RouterLink, UpperCasePipe, DatePipe],
  templateUrl: './poll-detail.html',
  styleUrl: './poll-detail.css',
})
export class PollDetailComponent {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly pollService = inject(PollService);

  readonly poll = signal<Poll | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly actionLoading = signal(false);
  readonly actionError = signal<string | null>(null);
  readonly actionSuccess = signal<string | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPoll(id);
    } else {
      this.error.set('No poll ID provided');
    }
  }

  loadPoll(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.pollService.getPoll(id).subscribe({
      next: (response) => {
        this.poll.set(response.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 404) {
          this.error.set('Poll not found');
        } else {
          this.error.set(err.error?.message || 'Failed to load poll');
        }
      },
    });
  }

  activatePoll(): void {
    this.updateStatus('active');
  }

  closePoll(): void {
    const pollId = this.poll()?.id;
    if (!pollId) return;

    this.performAction(() => this.pollService.closePoll(pollId), 'Poll closed successfully');
  }

  deletePoll(): void {
    const pollId = this.poll()?.id;
    if (!pollId) return;

    if (!confirm('Are you sure you want to delete this poll? This cannot be undone.')) {
      return;
    }

    this.performAction(
      () => this.pollService.deletePoll(pollId),
      'Poll deleted successfully',
      true,
    );
  }

  private updateStatus(status: PollStatus): void {
    const pollId = this.poll()?.id;
    if (!pollId) return;

    this.performAction(
      () => this.pollService.updatePollStatus(pollId, status),
      `Poll ${status}d successfully`,
    );
  }

  private performAction(action: () => any, successMsg: string, navigateAway = false): void {
    this.actionLoading.set(true);
    this.actionError.set(null);
    this.actionSuccess.set(null);

    action().subscribe({
      next: () => {
        this.actionLoading.set(false);
        this.actionSuccess.set(successMsg);
        if (navigateAway) {
          setTimeout(() => this.router.navigate(['/admin/polls']), 1000);
        } else {
          // Refresh poll data
          const id = this.poll()?.id;
          if (id) this.loadPoll(id);
        }
      },
      error: (err: any) => {
        this.actionLoading.set(false);
        if (err.status === 401) {
          this.actionError.set('Session expired. Please login again.');
        } else {
          this.actionError.set(err.error?.message || 'Action failed. Please try again.');
        }
      },
    });
  }
}
