import {
	choice,
	char,
	sequenceOf,
	optionalWhitespace,
	sepBy,
	recursiveParser,
} from "arcsecond";

import { boolean, string, number, variableName, funcName } from './funcTypes'


const commaSeparator = sequenceOf([
	optionalWhitespace,
	char(","),
	optionalWhitespace
]);


// allow strings, numbers, booleans, and variable names, separated by commas
const args = sepBy(commaSeparator)(choice([
	string,
	number,
	boolean,
	recursiveParser(() => functionParser)
]));

// just allows ( these ), not really much more than that
const argsInParens = sequenceOf([
	char('('),
	optionalWhitespace,
	args,
	optionalWhitespace,
	char(')')
]).map(res => res[2])


const functionParser = sequenceOf([funcName, optionalWhitespace, argsInParens]).map(res => ({
	name: res[0],
	args: res[2]
}));

export { functionParser, args, variableName, funcName, string, boolean, argsInParens };
  