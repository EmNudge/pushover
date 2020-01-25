import { prototypeParser as pp } from './prototype'
import { functionParser as fp } from './functions'
import { Type } from '../index'

/// function parser interfaces. From least to most specific
export interface FunctionArgument {
  type: Type;
  value: String | Boolean | Number | ParsedFunction;
}
export interface ParsedFunctionResult {
  name: string[];
  args: FunctionArgument[];
}
export interface ParsedFunction {
  isError: Boolean;
  error?: String;
  result: ParsedFunctionResult;
  index: Number;
  data: null;
}
export interface FunctionParser {
  run: (String) => ParsedFunction;
}

/// prototype parser interfaces. From least to most specific
export interface PrototypeArgument {
  name: string;
  types: Type[];
}
export interface ParsedPrototypeResult {
  args: PrototypeArgument[];
  optional: null | ParsedPrototypeResult;
}
export interface ParsedPrototype {
  isError: Boolean;
  error?: String;
  result: ParsedPrototypeResult;
  index: Number;
  data: null;
}
export interface PrototypeParser {
  run: (String) => ParsedPrototype;
}

export const functionParser = fp as FunctionParser;
export const prototypeParser = pp as PrototypeParser;