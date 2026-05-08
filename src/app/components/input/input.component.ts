// src/app/components/input/input.component.ts

import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="input-wrapper">
      <label [for]="id()" class="input-label">{{ label() }}</label>
      <div class="input-container">
        @if (icon()) {
          <span class="input-icon">{{ icon() }}</span>
        }
        <input
          [id]="id()"
          [type]="type()"
          [formControl]="control()"
          [placeholder]="placeholder()"
          class="input-field"
          [ngClass]="{ 'has-icon': icon(), 'has-error': control().invalid && control().touched }"
        />
      </div>
      @if (control().invalid && control().touched) {
        <span class="error-message">{{ errorMessage() }}</span>
      }
    </div>
  `,
  styles: [`
    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .input-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }
    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-icon {
      position: absolute;
      left: 0.75rem;
      color: #9ca3af;
      font-size: 1rem;
    }
    .input-field {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-field.has-icon {
      padding-left: 2.5rem;
    }
    .input-field:focus {
      outline: none;
      border-color: #059669;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
    }
    .input-field.has-error {
      border-color: #ef4444;
    }
    .input-field.has-error:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    .error-message {
      font-size: 0.75rem;
      color: #ef4444;
    }
  `],
})
export class InputComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly icon = input<string>('');
  readonly control = input.required<FormControl>();
  readonly errorMessage = input<string>('This field is required');
}
