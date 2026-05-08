// src/app/components/select/select.component.ts

import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="select-wrapper">
      <label [for]="id()" class="select-label">{{ label() }}</label>
      <div class="select-container">
        @if (icon()) {
          <span class="select-icon">{{ icon() }}</span>
        }
        <select
          [id]="id()"
          [formControl]="control()"
          class="select-field"
          [ngClass]="{ 'has-icon': icon(), 'has-error': control().invalid && control().touched }"
        >
          <option value="" disabled selected>{{ placeholder() }}</option>
          @for (option of options(); track option) {
            <option [value]="option">{{ option }}</option>
          }
        </select>
      </div>
      @if (control().invalid && control().touched) {
        <span class="error-message">{{ errorMessage() }}</span>
      }
    </div>
  `,
  styles: [`
    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .select-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }
    .select-container {
      position: relative;
      display: flex;
      align-items: center;
    }
    .select-icon {
      position: absolute;
      left: 0.75rem;
      color: #9ca3af;
      font-size: 1rem;
    }
    .select-field {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      background-color: white;
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
    }
    .select-field.has-icon {
      padding-left: 2.5rem;
    }
    .select-field:focus {
      outline: none;
      border-color: #059669;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
    }
    .select-field.has-error {
      border-color: #ef4444;
    }
    .error-message {
      font-size: 0.75rem;
      color: #ef4444;
    }
  `],
})
export class SelectComponent {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly placeholder = input<string>('Select an option');
  readonly icon = input<string>('');
  readonly control = input.required<FormControl>();
  readonly options = input.required<string[]>();
  readonly errorMessage = input<string>('Please select an option');
}
