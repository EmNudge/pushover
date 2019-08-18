

/** checks if parameter length is within the allowed range */
function areParamsInRange(syntax: string, length: number): boolean {
  const maxParams = syntax.length > 0 ? syntax.split(',').length : 0;
  const minParams = syntax.split(',').length - (syntax.includes('[') ? syntax.split('[').length + 1 : 1);
  const paramsInRange = minParams < length && length < maxParams;
  return paramsInRange;
}

/** checks received parameters against function's syntax string */
function paramsMatchSyntax(types: Param[], syntax: string): boolean {
  //don't allow more or fewer commands than syntax allows for
  if (!areParamsInRange(syntax, types.length)) return false;

  //if types don't match require type
  for (const [index, argument] of syntax.split(',').entries()) {
    if (argument.includes('(') && types[index].type !== Type.Function) return false;
  }

  return true;
}