import { Component, OnDestroy } from '@angular/core';
import { evaluateExpression } from '../evaluate-expression/evaluate-expression';
import { isValidExpression } from '../valid-expression/valid-expression';
import { RandService } from '../rand.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnDestroy {
  lastExpressions: string[] = [];
  expression: string = '';
  error: string = '';
  result: number | null = null;
  isValidInput: boolean = false;
  randNumber: number = 0;
  subscription$: Subscription = new Subscription();

  constructor(private randService: RandService) {}

  rand() {
    this.subscription$ = this.randService.getRandomNumber().subscribe(
      (data: number) => {
        this.expression = `${this.expression} ${data.toString()}`;
        this.validateAndCalculate();
      },
      (error) => {
        this.error = 'Fetching random number failed';
        console.error(error);
      },
    );
  }

  validateAndCalculate(): void {
    this.error = '';
    this.result = null;

    if (!this.validate()) {
      this.error = 'Expression is not valid';
      return;
    }

    this.calculate();
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

      this.lastExpressions.push(
        `Expression: ${this.expression} Result: ${this.result}`,
      );

      // clean up all repeated (expressions + results)
      this.lastExpressions = this.lastExpressions.filter(
        (expression, index, self) => self.indexOf(expression) === index,
      );
    } catch (error) {
      this.error = error as string;
      this.result = null;
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
