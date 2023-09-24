import { isValidExpression } from './valid-expression';

describe('isValidExpression', () => {
  it('should return false for an empty expression', () => {
    expect(isValidExpression('')).toBe(false);
  });

  it('should return true for a valid expression', () => {
    expect(isValidExpression('3 + 2 + 4')).toBe(true);
    expect(isValidExpression('-2')).toBe(true);
    expect(isValidExpression('+2')).toBe(true);
    expect(isValidExpression('(4 - 2) * 3')).toBe(true);
    expect(isValidExpression('3 * (4 - 2)')).toBe(true);
    expect(isValidExpression('(12 + 12) * (4 + 44)')).toBe(true);
    expect(isValidExpression('tan(30)')).toBe(true);
    expect(isValidExpression('sin(30) + cos(20)')).toBe(true);
  });

  it('should return false for an invalid expression', () => {
    expect(isValidExpression('sin(30')).toBe(false);
    expect(isValidExpression('3 + +')).toBe(false);
    expect(isValidExpression('3+')).toBe(false);
    expect(isValidExpression('sin(1)+cos(2')).toBe(false);
  });

  it('should handle negative numbers correctly', () => {
    expect(isValidExpression('-1+2')).toBe(true);
    expect(isValidExpression('(1 + 2) * 3')).toBe(true);
    expect(isValidExpression('(-1+2)*3')).toBe(true);
    expect(isValidExpression('sin(-1)+cos(-2)')).toBe(true);
    expect(isValidExpression('sin(40) - tan(42)')).toBe(true);
  });
});
