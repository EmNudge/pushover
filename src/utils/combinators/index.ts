import { prototypeParser as pp } from './prototype'
import { functionParser as fp } from './functions'
import { Type } from '../index'

/// function parser interfaces. From least to most specific
export interface FunctionArgument {
  type: Type;
  value: string | boolean | number | ParsedFunctionResult;
}
export interface ParsedFunctionResult {
  name: string[];
  args: FunctionArgument[];
}
export interface ParsedFunction {
  isError: boolean;
  error?: string;
  result: ParsedFunctionResult;
  index: number;
  data: null;
}
export interface FunctionParser {
  run: (string) => ParsedFunction;
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
  isError: boolean;
  error?: string;
  result: ParsedPrototypeResult;
  index: number;
  data: null;
}
export interface PrototypeParser {
  run: (string) => ParsedPrototype;
}

export const functionParser = fp as FunctionParser;
export const prototypeParser = pp as PrototypeParser;