import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PollService } from '../../../services/poll-service';
import type { Poll, PollStatus } from '../../../types/poll.types';
import { UpperCasePipe, DatePipe } from '@angular/common';
@Component({
  selector: 'app-poll-list',
  imports: [RouterLink, UpperCasePipe, DatePipe],
  templateUrl: './poll-list.html',
  styleUrl: './poll-list.css',
})
export class PollListComponent {
  readonly pollService = inject(PollService);

  readonly polls = signal<Poll[]>([]);
  readonly isLoading = signal(false);
  readonly isLoadingMore = signal(false);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly selectedStatus = signal<PollStatus | 'all'>('all');

  readonly statusFilters: { value: PollStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'closed', label: 'Closed' },
  ];

  readonly hasMorePages = computed(() => this.currentPage() < this.totalPages());

  constructor() {
    this.loadPolls();
  }

  loadPolls(reset = true): void {
    if (reset) {
      this.currentPage.set(1);
      this.polls.set([]);
    }

    this.isLoading.set(true);
    this.error.set(null);

    const statusParam = this.selectedStatus() === 'all' ? undefined : this.selectedStatus();

    this.pollService.getPolls(statusParam, this.currentPage()).subscribe({
      next: (response) => {
        const newPolls = response.data.data;
        this.polls.update((existing) => (reset ? newPolls : [...existing, ...newPolls]));
        this.totalPages.set(response.data.meta.totalPages);
        this.isLoading.set(false);
        this.isLoadingMore.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.isLoadingMore.set(false);
        this.error.set(err.error?.message || 'Failed to load polls');
      },
    });
  }

  loadMore(): void {
    if (this.isLoadingMore() || !this.hasMorePages()) return;
    this.isLoadingMore.set(true);
    this.currentPage.update((p) => p + 1);
    this.loadPolls(false);
  }

  onStatusChange(status: PollStatus | 'all'): void {
    this.selectedStatus.set(status);
    this.loadPolls(true);
  }

  getStatusClass(status: string): string {
    return `badge-${status}`;
  }
}
