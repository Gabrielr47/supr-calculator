/*
    Task B - Evaluate Expression

    Given a valid expression evaluate. 
    For example, sin(30) + cos(20) = −0.5799495623. 
    Do not use any external libraries for this part.
*/

export function evaluateExpression(expression: string): number | null {
  try {
    const result = evaluatePostfixExpression(convertToPostfix(expression));

    if (isNaN(result)) {
      return null;
    }

    return result;
  } catch (error) {
    return null;
  }
}

function convertToPostfix(expression: string): (number | string)[] {
  const operators: string[] = [];
  const output: (number | string)[] = [];
  const precedence: Record<string, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    sin: 3,
    cos: 3,
    tan: 3,
  };

  const tokens = expression.split(/\s+/);

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      // If the token is a number, push it to the output queue.
      output.push(parseFloat(token));
    } else if (token in precedence) {
      // If the token is an operator or a trigonometric function, handle it.
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== '(' &&
        precedence[token] <= precedence[operators[operators.length - 1]]
      ) {
        output.push(operators.pop() as string);
      }
      operators.push(token);
    } else if (token === '(') {
      // If the token is an opening parenthesis, push it to the operator stack.
      operators.push(token);
    } else if (token === ')') {
      // If the token is a closing parenthesis, pop operators from the stack to the output until an opening parenthesis is encountered.
      while (operators.length > 0 && operators[operators.length - 1] !== '(') {
        output.push(operators.pop() as string);
      }
      if (operators.length === 0 || operators[operators.length - 1] !== '(') {
        throw new Error('Unmatched closing parenthesis.');
      }
      operators.pop(); // Pop the opening parenthesis.
    } else {
      throw new Error('Invalid token: ' + token);
    }
  }

  // Pop any remaining operators from the stack to the output.
  while (operators.length > 0) {
    if (operators[operators.length - 1] === '(') {
      throw new Error('Unmatched opening parenthesis.');
    }
    output.push(operators.pop() as string);
  }

  return output;
}

function evaluatePostfixExpression(expression: (number | string)[]): number {
  const stack: number[] = [];

  for (const token of expression) {
    if (typeof token === 'number') {
      // If the token is a number, push it onto the stack.
      stack.push(token);
    } else if (token in Math) {
      // If the token is a trigonometric function, apply it to the value on the stack.
      const arg = stack.pop() as number;
      if (token === 'sin') {
        stack.push(Math.sin(arg));
      } else if (token === 'cos') {
        stack.push(Math.cos(arg));
      } else if (token === 'tan') {
        stack.push(Math.tan(arg));
      }
    } else {
      // If the token is an operator, pop the top two values from the stack, apply the operator, and push the result back onto the stack.
      const b = stack.pop() as number;
      const a = stack.pop() as number;
      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          if (b === 0) {
            throw new Error('Division by zero.');
          }
          stack.push(a / b);
          break;
        default:
          throw new Error('Invalid operator: ' + token);
      }
    }
  }

  if (stack.length !== 1) {
    throw new Error('Invalid expression.');
  }
  return stack.pop() as number;
}
