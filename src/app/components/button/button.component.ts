// src/app/components/button/button.component.ts

import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      class="btn"
      [ngClass]="{ 'btn-loading': loading(), 'btn-disabled': disabled() }"
    >
      @if (loading()) {
        <span class="spinner"></span>
      }
      <span [class.hidden]="loading()">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    .btn {
      width: 100%;
      padding: 0.875rem 1.5rem;
      background-color: #059669;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s, opacity 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .btn:hover:not(:disabled) {
      background-color: #047857;
    }
    .btn-disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .btn-loading {
      cursor: wait;
    }
    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .hidden {
      opacity: 0;
    }
  `],
})
export class ButtonComponent {
  readonly type = input<'button' | 'submit'>('submit');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
}
