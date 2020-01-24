import {
	choice,
	letters,
	digit,
	digits,
	char,
	sequenceOf,
	many,
	optionalWhitespace,
	sepBy,
	anythingExcept,
	str,
} from "arcsecond";

import { Type } from '../index'

const typeToEnum = {
	number: Type.Number,
	string: Type.String,
	channel: Type.Channel,
	link: Type.Link,
	user: Type.User,
	role: Type.Role,
}

// parse strings like "num: number | string, name: string[, channel: channel | string]"
// what may be really difficult here is recursive allowing optional params via [[]], but still using it as a separator
// I stopped writing this since I realized the approach I was taking would let some things go through and/or get blocked.

// take type string and return Enum version
const type = choice([
	str('number'),
	str('string'),
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
	types: res[4],
	optional: false,
}))

// either allow " [ , " or just " , " as a parameter separator
// in actuality it is malformed if there is a "[," and no ending "]", but it doesn't really matter
const paramSeparator = sequenceOf([
	optionalWhitespace,
	choice([
		sequenceOf([
			char('['),
			optionalWhitespace,
			char(','),
		]),
		char(','),
	]),
	optionalWhitespace,
])

const prototypeParser = sequenceOf([
	sepBy(paramSeparator)(param),
	many(char(']'))
]).map(res => {
	const [params, brackets] = res
	const startingOptional = params.length - brackets.length
})

export { prototypeParser }