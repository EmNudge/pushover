import { Type, Param } from './typeDefinitions'

/** checks if parameter length is within the allowed range */
function areParamsInRange(syntax: string, length: number): boolean {
  const maxParams = syntax.split(',').length;

  const optionalParamNum = syntax.split('[').length - 1;
  const minParams = maxParams - optionalParamNum;

  const paramsInRange = minParams <= length && length <= maxParams;
  return paramsInRange;
}

/** checks received parameters against function's syntax string */
function paramsMatchSyntax(params: Param[], syntax: string): boolean {
  if (!areParamsInRange(syntax, params.length)) return false;

  //if types don't match required type
  for (const [index, argument] of syntax.split(',').entries()) {
    // if no type specified, default to any type
    if (!argument.includes(':')) continue;

    const type = argument.split(':')[1].trim();
    const typeName = type[0].toUpperCase() + type.slice(1).toLowerCase();
    if (Type[typeName] !== params[index].type) return false;
  }

  return true;
}



export default paramsMatchSyntax;

export {
  areParamsInRange
}