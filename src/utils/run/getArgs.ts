import { Type, Arg } from '../index'

function getTypeOfValue(value: string): Type {
  const isFunction: boolean = value.split(' ')[0].includes('(') && value.slice(-1) === ')';
  if (isFunction) return Type.Function;

  const isNumber = /^\d+$/.test(value);
  if (isNumber) return Type.Number;
          
  return Type.String;
}

function getArg(value: string): Arg {
  return { 
    type: getTypeOfValue(value), 
    value: value.replace(/^"|^'|'$|"$/g, ''),
  }
}

function getArgs(paramStr: string): Arg[] {
  const args: Arg[] = [];

  let startStr: number = 0;
  let	parentheses: number = 0;
  let	quotes: number = 0;

  for (const [index, char] of [...paramStr].entries()) {
    //if the argument is over and there's no odd amount of closures
    const isSeparater: boolean = char === ',' || index === paramStr.length - 1;
    const evenQuotes: boolean = quotes % 2 === 0 || char === '"' || char === "'";
    const evenParentheses: boolean = parentheses % 2 === 0 || char === ')';
        
    if (isSeparater && evenQuotes && evenParentheses) {
      //use whole rest of string if we're up to the last character (to include index + 1)
      const value = index !== paramStr.length - 1 
        ? paramStr.slice(startStr, index)
        : paramStr.slice(startStr);
      
      args.push(getArg(value.trim()));
      startStr = index + 1;
      continue;
    } else if (index === paramStr.length - 1) {
      throw new Error(`non well-formed function params.
      quotes: ${quotes} parentheses: ${parentheses}`);
    }

    if (char === '(' || char === ')') parentheses++;
    if (char === '"' || char === "'") quotes++;
  }

  return args;
}

export default getArgs;