import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { isValidExpression } from '../valid-expression/valid-expression';

import { CalculatorComponent } from './calculator.component';
import { HttpClientModule } from '@angular/common/http';
import { RandService } from '../rand.service';
import { of } from 'rxjs';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [FormsModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validate', () => {
    it('should return true for valid expressions', () => {
      expect(isValidExpression('1 + 2')).toBeTrue();
      expect(isValidExpression('42+24')).toBeTrue();
      expect(isValidExpression('3 * (4 - 2)')).toBeTrue();
    });

    it('should return false for invalid expressions', () => {
      expect(isValidExpression('1 +')).toBeFalse();
      expect(isValidExpression('42 -')).toBeFalse();
      expect(isValidExpression('3 * (4 - 2')).toBeFalse();
    });

    it('should update isValidInput property', () => {
      component.expression = '1 + 2';
      component.validate();
      expect(component.isValidInput).toBeTrue();

      component.expression = '1 +';
      component.validate();
      expect(component.isValidInput).toBeFalse();
    });
  });

  describe('calculate', () => {
    it('should set result property for valid expressions', () => {
      component.expression = '1 + 2';
      component.calculate();
      expect(component.result).toBe(3);

      component.expression = '3 * (4 - 2)';
      component.calculate();
      expect(component.result).toBe(6);
    });

    it('should update lastExpressions property for valid expressions', () => {
      component.expression = '1 + 2';
      component.calculate();
      expect(component.lastExpressions).toEqual([
        'Expression: 1 + 2 Result: 3',
      ]);

      component.expression = '3 * (4 - 2)';
      component.calculate();
      expect(component.lastExpressions).toEqual([
        'Expression: 1 + 2 Result: 3',
        'Expression: 3 * (4 - 2) Result: 6',
      ]);
    });

    it('should not update lastExpressions property for invalid expressions', () => {
      component.expression = '1 +';
      component.calculate();
      expect(component.lastExpressions).toEqual([]);

      component.expression = '3 * (4 - 2';
      component.calculate();
      expect(component.lastExpressions).toEqual([]);
    });
  });

  describe('validateAndCalculate', () => {
    it('should set error property for invalid expressions', () => {
      component.expression = '1 +';
      component.validateAndCalculate();
      expect(component.error).toBe('Expression is not valid');

      component.expression = '3 * (4 - 2';
      component.validateAndCalculate();
      expect(component.error).toBe('Expression is not valid');
    });

    it('should call calculate method for valid expressions', () => {
      spyOn(component, 'calculate');
      component.expression = '1 + 2';
      component.validateAndCalculate();
      expect(component.calculate).toHaveBeenCalled();
    });
  });

  describe('rand', () => {
    it('should append a random number to the expression', () => {
      const randService = TestBed.inject(RandService);
      spyOn(randService, 'getRandomNumber').and.returnValue(of(42));
      component.expression = '1 +';
      component.rand();
      expect(component.expression).toBe('1 + 42');
    });

    it('should call validateAndCalculate after appending the number', () => {
      const randService = TestBed.inject(RandService);
      spyOn(randService, 'getRandomNumber').and.returnValue(of(42));
      spyOn(component, 'validateAndCalculate');
      component.rand();
      expect(component.validateAndCalculate).toHaveBeenCalled();
    });
  });
});
