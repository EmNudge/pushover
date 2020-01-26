import {
	choice,
	letter,
	digit,
	digits,
	char,
	sequenceOf,
	many,
	sepBy,
	anythingExcept,
	str,
	possibly,
	anyOfString,
	between
} from 'arcsecond';

import { Type } from '../index';

// takes a char to check for over a long string of text. Stops when it hits that char
const manyExcept = (singleChar) => many(anythingExcept(char(singleChar))).map((res) => res.join(''));

// takes a parser to enclose and a parser to check for.
// usually the pattern is a parser and then a manyExcept(parser)
// essentially the same as `between`, but in a different syntax since prettier doesn't like the other one
const enclosed = (start, mainParser, end = start) => sequenceOf([start, mainParser, end]).map((res) => res[1]);

// either text inside "" or inside ''
const string = choice([enclosed(char('"'), manyExcept('"')), enclosed(char("'"), manyExcept("'"))]).map((res) => ({
	type: Type.String,
	value: res
}));

// get true or false from 'true' and 'false'
const boolean = choice([str('true'), str('false')]).map((res) => {
	const value = res === 'true';
	return { type: Type.Boolean, value };
});

const number = digits.map((res) => ({ type: Type.Number, value: Number(res) }));

// allows any combination of letters and numbers as long
// as it starts with a letter
const command = sequenceOf([letter, many(choice([letter, digit]))]).map((res) => res[0] + res[1].join(''));

// allows this.Sort.OF.naming.SCHEME
const funcName = sepBy(char('.'))(command);

// copying command, but we need to map it do a different data structure, so we can't reuse it.
const variable = sequenceOf([letter, many(choice([letter, digit]))]).map((res) => ({
	value: res[0] + res[1].join(''),
	type: Type.Variable
}));

// a host is anything before the routes. This includes:
// 'hello', 'site', and 'com' in hello.site.com.
const urlHostChars = many(choice([letter, digit, char('-')])).map((res) => res.join(''));

// this just encompases all valid chars in a URL
const urlChars = many(choice([anyOfString('.?=#%&/'), letter, digit])).map((res) => res.join(''));

const link = sequenceOf([
	str('http'),
	possibly(char('s')),
	str('://'),
	urlHostChars,
	char('.'),
	urlHostChars,
	urlChars
]).map((res) => ({ type: Type.Link, value: res.join('') }));

// If a user types out a role, user, or channel out correctly,
// it will look like this to the bot:
//
// channel format: <#907088875861745716>
// user format:    <@!9070888758617457164>
// role format:    <@&9070888758617457164>

const asXML = between(char('<'))(char('>'));

const channel = asXML(
	sequenceOf([char('#'), digits]).map((res) => ({
		type: Type.Channel,
		value: res[1]
	}))
);

const user = asXML(sequenceOf([char('@'), char('!'), digits]).map((res) => ({ type: Type.User, value: res[2] })));

const role = asXML(sequenceOf([char('@'), char('&'), digits]).map((res) => ({ type: Type.Role, value: res[2] })));

export { variable, funcName, string, boolean, number, link, enclosed, channel, user, role };
