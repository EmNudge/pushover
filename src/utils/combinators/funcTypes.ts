import {
	choice,
	letter,
	digit,
	digits,
	char,
	sequenceOf,
	many,
	many1,
	sepBy,
	sepBy1,
	anythingExcept,
	str,
	possibly,
	anyOfString,
} from "arcsecond";

// takes a char to check for over a long string of text. Stops when it hits that char
const manyExcept = singleChar => many(anythingExcept(char(singleChar))).map(res => res.join(''))

// takes a parser to enclose and a parser to check for.
// usually the pattern is a parser and then a manyExcept(parser)
// essentially the same as `between`, but in a different syntax since prettier doesn't like the other one
const enclosed = (start, mainParser, end = start) => sequenceOf([start, mainParser, end]).map(res => res[1])

// either text inside "" or inside '' 
const string = choice([
	enclosed(char('"'), manyExcept('"')),
	enclosed(char("'"), manyExcept("'"))
])

// get true or false from 'true' and 'false'
const boolean = choice([
	str('true'),
	str('false')
]).map(res => {
	if (res === 'true') return true;
	return false;
})

const number = digits.map(res => Number(res))

// allows any combination of letters and numbers as long
// as it starts with a letter
const variableName = sequenceOf([letter, many(choice([letter, digit]))]).map(
	res => res[0] + res[1].join("")
);

// allows this.Sort.OF.naming.SCHEME
const funcName = sepBy(char('.'))(variableName)

// a host is anything before the routes. This includes:
// 'hello', 'site', and 'com' in hello.site.com.
const urlHostChars = many(choice([
	letter,
	digit,
	char('-'),
])).map(res => res.join(''))

// this just encompases all valid chars in a URL
const urlChars = many(choice([
	anyOfString('.?=#%&/'),
	letter,
	digit,
])).map(res => res.join(''))

const link = sequenceOf([
	str('http'),
	possibly(char('s')),
	str('://'),
	urlHostChars,
	char('.'),
	urlHostChars,
	urlChars,
]).map(res => res.join(''))

// disallows leading or ending `-`. It is only allowed between chars
const digitsOrLetters = many1(choice([letter, digit])).map(res => res.join(''))
const channelName = sepBy1(char('-'))(digitsOrLetters).map(res => res.filter(Boolean).join('-'))

const channel = sequenceOf([
	char('#'),
	channelName,
]).map(res => res.join(''))


export { variableName, funcName, string, boolean, number, link, enclosed, channel };
  