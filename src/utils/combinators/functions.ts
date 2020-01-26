import {
	choice,
	char,
	sequenceOf,
	optionalWhitespace,
	sepBy,
	recursiveParser,
} from "arcsecond";

import { boolean, string, number, funcName, link, channel, user, role } from './funcTypes'
import { Type } from '../index'

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
	channel,
	user,
	role,
	link,
	recursiveParser(() => functionParser).map(res => ({ type: Type.Executable, value: res })),
	funcName,
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
	name: res[0].value,
	args: res[2]
}));

export { functionParser, args, argsInParens };
  