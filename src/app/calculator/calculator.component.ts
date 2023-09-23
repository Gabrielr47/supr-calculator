import { Component } from '@angular/core';
import { evaluateExpression } from '../evaluate-expression/evaluate-expression';
import { isValidExpression } from '../valid-expression/valid-expression';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  lastExpressions: string[] = [];
  expression: string = '';
  error: string = '';
  result: number | null = null;
  isValidInput: boolean = false;

  validateAndCalculate(): void {
    this.error = '';
    this.result = null;

    const isValid = this.validate();
    if (isValid) {
      this.calculate();
    }
  }

  validate(): boolean {
    this.isValidInput = isValidExpression(this.expression);
    return this.isValidInput;
  }

  calculate(): void {
    try {
      this.result = evaluateExpression(this.expression);
      this.error = '';
  
      if (this.result === null) {
        return;
      }
      
      this.lastExpressions.push(`Expression: ${this.expression} = ${this.result}`);

      // clean up all repeated (expressions + results)
      this.lastExpressions = this.lastExpressions.filter(
        (expression, index, self) => self.indexOf(expression) === index
      );

    } catch (error) {
      this.error = error as string;
      this.result = null;
    }
  }
}
