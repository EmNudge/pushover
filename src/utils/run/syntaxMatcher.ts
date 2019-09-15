import { Type, Arg } from '../index'

/** checks if parameter length is within the allowed range */
function argsInRange(syntax: string, length: number): boolean {
  const maxParams = syntax.split(',').length;

  const optionalParamNum = syntax.split('[').length - 1;
  const minParams = maxParams - optionalParamNum;

  const paramsInRange = minParams <= length && length <= maxParams;
  return paramsInRange;
}

/** checks if an argument conforms to the syntax of the parameter */
function argMatchesType(param: string, arg: Arg): boolean {
  // if no type, default to any
  if (!param.includes(':')) return true;

  const type = param.split(':')[1].trim();

  return type === arg.type;
}

/** checks received parameters against function's syntax string */
function argsMatchSyntax(args: Arg[], syntax: string): boolean {
  // return early if no syntax needed and provided
  if (!args.length && !syntax.length) return true;
  if (args.length && !syntax.length) return false;

  if (!argsInRange(syntax, args.length)) return false;

  for (const [index, param] of syntax.split(',').entries()) {
    if (!argMatchesType(param, args[index])) return false;
  }

  return true;
}



export default argsMatchSyntax;

export {
  argsInRange
}