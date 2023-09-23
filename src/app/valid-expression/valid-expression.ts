/*
    Task A - Valid Expression

    Write program that reads a mathematical expression and determines
    whether such an expression is valid. For this exercise consider only

    the following operators: +, −, ∗, /,sin, cos, tan.
    Do not use any external libraries for this part.
*/

export function isValidExpression(expression: string): boolean {
  // Remove spaces from the expression
  expression = expression.replace(/\s/g, '');

  // Define a regular expression pattern for valid operators and functions
  const validOperators = /[+\-*/()]/;
  const validFunctions = /(sin|cos|tan)\(/;

  // Helper function to check if a character is a valid operator or function
  function isOperator(char: string): boolean {
    return validOperators.test(char) || validFunctions.test(char);
  }

  // Function to validate the expression recursively
  function validateExpression(start: number, end: number): boolean {
    if (start > end) {
      return false; // Empty expression is not valid
    }

    let stack: string[] = [];
    let lastOperator = true; // Indicates that the last character was an operator

    for (let i = start; i <= end; i++) {
      const char = expression[i];

      if (isOperator(char)) {
        if (lastOperator) {
          if (char !== '-' && char !== '+' && char !== '(') {
            return false; // Two consecutive operators or an operator after an open parenthesis are not allowed
          }
        }

        lastOperator = true;

        if (char === '(') {
          stack.push(char);
        } else if (char === ')') {
          if (stack.length === 0 || stack.pop() !== '(') {
            return false; // Unmatched closing parenthesis
          }
        } else if (validFunctions.test(char)) {
          // Check for valid function calls
          let functionEnd = expression.indexOf(')', i + 1);
          if (
            functionEnd === -1 ||
            !validateExpression(i + 3, functionEnd - 1)
          ) {
            return false;
          }
          i = functionEnd;
        }
      } else {
        lastOperator = false;
      }
    }

    // Check if there are unmatched opening parentheses
    if (stack.length !== 0) {
      return false;
    }

    return !lastOperator;
  }

  return validateExpression(0, expression.length - 1);
}
