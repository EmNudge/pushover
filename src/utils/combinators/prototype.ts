import {
	choice,
	letters,
	digit,
	digits,
	char,
	sequenceOf,
	recursiveParser,
	optionalWhitespace,
	sepBy,
	possibly,
	str,
} from "arcsecond";

import { Type } from '../index'

import { enclosed } from './funcTypes'

const typeToEnum = {
	number: Type.Number,
	string: Type.String,
	boolean: Type.Boolean,
	function: Type.Function,
	executable: Type.Executable,
	channel: Type.Channel,
	link: Type.Link,
	user: Type.User,
	role: Type.Role,
}

// parse strings like "num: number | string, name: string[, channel: channel | string]"

// take type string and return Enum version
const type = choice([
	str('number'),
	str('string'),
	str('boolean'),
	str('function'),
	str('executable'),
	str('channel'),
	str('link'),
	str('user'),
	str('role'),
]).map(res => typeToEnum[res])

const barSeparator = sequenceOf([
	optionalWhitespace,
	char('|'),
	optionalWhitespace,
])
const types = sepBy(barSeparator)(type)

const param = sequenceOf([
	letters,
	optionalWhitespace,
	char(':'),
	optionalWhitespace,
	types
]).map(res => ({
	name: res[0],
	types: res[4]
}))


const commaSeparator = sequenceOf([
	optionalWhitespace,
	char(","),
	optionalWhitespace
]);

// brackets to enclose a new bunch of params
const openBracket = sequenceOf([
	optionalWhitespace,
	char('['),
	optionalWhitespace,
])
const closeBracket = sequenceOf([
	optionalWhitespace,
	char(']'),
	optionalWhitespace,
])

// allows for optional params. Must use recursiveParser since it's recursive 
const optionalPrototype = enclosed(
	openBracket, 
	recursiveParser(() => prototypeParser), 
	closeBracket
)

// allows for a leading comma in order to have nested recursive optional params
// get parsed correctly
const prototypeParser = sequenceOf([
	possibly(commaSeparator),
	sepBy(commaSeparator)(param),
	possibly(optionalPrototype)
]).map(res => ({
	args: res[1],
	optional: res[2],
}))


export { prototypeParser, param }