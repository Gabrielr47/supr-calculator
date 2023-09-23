import { isValidExpression } from './valid-expression';

describe('isValidExpression', () => {
  it('should return false for an empty expression', () => {
    expect(isValidExpression('')).toBe(false);
  });

  it('should return true for a valid expression', () => {
    expect(isValidExpression('3 + 2 + 4')).toBe(true);
    expect(isValidExpression('-2')).toBe(true);
    expect(isValidExpression('+2')).toBe(true);
    // To be fix
    // expect(isValidExpression('sin(sin(30) + cos(20))')).toBe(true);
    // expect(isValidExpression('sin(30) + cos(20)')).toBe(true);
  });

  it('should return false for an invalid expression', () => {
    expect(isValidExpression('sin(30')).toBe(false);
    expect(isValidExpression('3 + +')).toBe(false);
    // To be fix
    // expect(isValidExpression('sin(1)+cos(2')).toBe(false);
    // expect(isValidExpression('3+')).toBe(false);
  });

  it('should handle negative numbers correctly', () => {
    expect(isValidExpression('-1+2')).toBe(true);
    // To be fix
    // expect(isValidExpression('(-1+2)*3')).toBe(true);
    // expect(isValidExpression('sin(-1)+cos(-2)')).toBe(true);
  });
});
