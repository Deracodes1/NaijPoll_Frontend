import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PollService } from '../../services/poll-service';
import { AuthService } from '../../services/auth.service';
import { PollCardComponent } from '../../components/pollcard/pollcard';
import { ButtonComponent } from '../../components/button/button.component';
import type { Poll } from '../../types/poll.types';
import type { PollMeta } from '../../types/poll.types';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PollCardComponent, ButtonComponent, TitleCasePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  readonly pollService = inject(PollService);
  readonly authService = inject(AuthService);

  readonly polls = signal<Poll[]>([]);
  readonly meta = signal<PollMeta | null>(null);
  readonly activeFilter = signal<string>('all');
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(1);

  readonly filters = ['all', 'active', 'closed', 'draft'];

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(page: number = 1, append: boolean = false): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.pollService.getPolls(this.activeFilter(), page).subscribe({
      next: (response) => {
        if (append) {
          this.polls.update((existing) => [...existing, ...response.data.data]);
        } else {
          this.polls.set(response.data.data);
        }
        this.meta.set(response.data.meta);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to load polls');
        this.isLoading.set(false);
      },
    });
  }

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
    this.currentPage.set(1);
    this.loadPolls(1, false);
  }

  loadMore(): void {
    const nextPage = this.currentPage() + 1;
    this.currentPage.set(nextPage);
    this.loadPolls(nextPage, true);
  }

  canLoadMore(): boolean {
    const m = this.meta();
    return !!m && m.page < m.totalPages;
  }

  get isAuthenticated(): boolean {
    return !!this.authService.getToken();
  }

  get userState(): string | null {
    return this.authService.user()?.state || null;
  }
}
