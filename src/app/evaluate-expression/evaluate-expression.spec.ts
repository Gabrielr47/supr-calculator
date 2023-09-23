import { evaluateExpression } from './evaluate-expression';

describe('evaluateExpression', () => {
  it('should return null for invalid expressions', () => {
    expect(evaluateExpression('')).toBeNull();
    expect(evaluateExpression('1 +')).toBeNull();
    expect(evaluateExpression('1 + (2 * 3')).toBeNull();
    expect(evaluateExpression('1 / 0')).toBeNull();
  });

  it('should evaluate simple expressions correctly', () => {
    expect(evaluateExpression('1 + 2')).toBe(3);
    expect(evaluateExpression('3 - 1')).toBe(2);
    expect(evaluateExpression('2 * 4')).toBe(8);
    expect(evaluateExpression('10 / 2')).toBe(5);
  });

  it('should evaluate complex expressions correctly', () => {
    expect(evaluateExpression('1 + 2 * 3')).toBe(7);
    // To be fix
    // expect(evaluateExpression('(1 + 2) * 3')).toBe(9);
    // expect(evaluateExpression('2 * (3 + 4)')).toBe(14);
    // expect(evaluateExpression('(10 / 2) - 3')).toBe(2);
  });
});
