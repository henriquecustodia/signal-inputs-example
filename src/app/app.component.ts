import { Component, computed, effect, input, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";

function toUpperCase(value: string): string {
  return value.toUpperCase();
}

@Component({
  selector: "app-example",
  standalone: true,
  template: `
    <h1>Optional Input</h1>
    <div>{{ optionalInput() }}</div>

    <h1>Optional Input + Initial value</h1>
    <div>{{ optionalInputWithInitialvalue() }}</div>

    <h1>Optional Input + Initial value + Transform</h1>
    <div>{{ optionalInputInitialValueWithTransform() }}</div>

    <h1>Optional Input + Initial value + Transform + Alias</h1>
    <div>{{ optionalInputInitialValueWithAlias() }}</div>

    <hr>

    <h1>Required Input</h1>
    <div>{{ requiredInput() }}</div>

    <h1>Required Input + Transform</h1>
    <div>{{ requiredInputWithTransform() }}</div>

    <h1>Required Input + Transform + Alias</h1>
    <div>{{ requiredInputWithAlias() }}</div>

    <hr>
    
    <h1>Computed (Could work like a setter?)</h1>
    <div>{{ computedValue() }}</div>

  `,
})
export class ExampleComponent {
  optionalInput = input<string>();

  optionalInputWithInitialvalue = input('OK, I have a value');

  optionalInputInitialValueWithTransform = input('OK, I have a value', { transform: toUpperCase });
  
  optionalInputInitialValueWithAlias = input('OK, I have a value', { transform: toUpperCase, alias: 'optionalInputWithAlias' });

  requiredInput = input.required();

  requiredInputWithTransform = input.required({ transform: toUpperCase });

  requiredInputWithAlias = input.required({
    transform: toUpperCase,
    alias: "withAlias",
  });

  computedValue = computed(() => `optionalInput + optionalInputInitialValueWithAlias = ${this.optionalInput()} + ${this.optionalInputInitialValueWithAlias()}`)
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ExampleComponent, FormsModule],
  template: ` 
    <input  [(ngModel)]="value" />

    <app-example 
      [optionalInput]="value"
      [optionalInputWithInitialvalue]="value"
      [optionalInputInitialValueWithTransform]="value"
      [optionalInputWithAlias]="value"
      [requiredInput]="value" 
      [requiredInputWithTransform]="value" 
      [withAlias]="value" /> 
  `,
  styles: [],
})
export class AppComponent {
  value = 'test';
}
