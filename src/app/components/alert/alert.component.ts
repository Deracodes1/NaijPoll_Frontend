// src/app/components/alert/alert.component.ts

import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

type AlertType = 'error' | 'success' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="alert" [ngClass]="'alert-' + type()">
      <span class="alert-icon">{{ icon() }}</span>
      <span class="alert-message">{{ message() }}</span>
    </div>
  `,
  styles: [`
    .alert {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
    }
    .alert-error {
      background-color: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
    .alert-success {
      background-color: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    .alert-info {
      background-color: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
    }
    .alert-icon {
      font-size: 1.125rem;
      flex-shrink: 0;
    }
  `],
})
export class AlertComponent {
  readonly message = input.required<string>();
  readonly type = input<AlertType>('error');

  icon(): string {
    const icons: Record<AlertType, string> = {
      error: '⚠️',
      success: '✅',
      info: 'ℹ️',
    };
    return icons[this.type()];
  }
}
