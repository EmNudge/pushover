import { expect } from 'chai';
import { prototypeParser, param } from './prototype';
import { Type } from '../index';

const checkCombinator = ({ res, shouldFail = false, expectedRes = res.result }) => {
	// should fail or not
	expect(res.isError).to.be[String(shouldFail)];

	// deep or regular equality if result is an object
	const equality = typeof res.result === 'object' ? 'eql' : 'equal';
	expect(res.result).to[equality](expectedRes);

	// if doesn't fail, but it's supposed to (or vice versa), log it
	if (res.isError !== shouldFail) console.log(res);
};

describe('Prototype Parsing', () => {
	it('should parse a prototype parameter', () => {
		const res1 = param.run('myName: number');
		const res2 = param.run('myName: number | string');
		const res3 = param.run('myName:number|string');
		const res4 = param.run('myName  :  number  |   string');

		checkCombinator({ res: res1, expectedRes: { name: 'myName', types: [Type.Number] } });
		checkCombinator({ res: res2, expectedRes: { name: 'myName', types: [Type.Number, Type.String] } });
		checkCombinator({ res: res3, expectedRes: { name: 'myName', types: [Type.Number, Type.String] } });
		checkCombinator({ res: res4, expectedRes: { name: 'myName', types: [Type.Number, Type.String] } });
	});

	it('should parse a list of params', () => {
		const res1 = prototypeParser.run('name: string, age: number | string');

		checkCombinator({
			res: res1,
			expectedRes: {
				args: [{ name: 'name', types: [Type.String] }, { name: 'age', types: [Type.Number, Type.String] }],
				optional: null
			}
		});
	});

	it('can parse all types', () => {
    const res1 = prototypeParser.run('a: number | string | boolean | function | variable | channel | link | user | role');
		const res2 = prototypeParser.run(
			'a: number, b: string, c: boolean, d: function, e: variable, f: channel, g: link, h: user, i: role'
		);

		checkCombinator({
			res: res1,
			expectedRes: {
				args: [
					{
						name: 'a',
						types: [
							Type.Number,
							Type.String,
							Type.Boolean,
							Type.Function,
							Type.Variable,
							Type.Channel,
							Type.Link,
							Type.User,
							Type.Role
						]
					}
				],
				optional: null
			}
		});

		checkCombinator({
			res: res2,
			expectedRes: {
				args: [
					{ name: 'a', types: [Type.Number] },
					{ name: 'b', types: [Type.String] },
					{ name: 'c', types: [Type.Boolean] },
					{ name: 'd', types: [Type.Function] },
					{ name: 'e', types: [Type.Variable] },
					{ name: 'f', types: [Type.Channel] },
					{ name: 'g', types: [Type.Link] },
					{ name: 'h', types: [Type.User] },
					{ name: 'i', types: [Type.Role] }
				],
				optional: null
			}
		});
	});

	it('should parse optional params', () => {
		const res1 = prototypeParser.run('name: string[, age: number | string]');

		checkCombinator({
			res: res1,
			expectedRes: {
				args: [{ name: 'name', types: [Type.String] }],
				optional: {
					args: [{ name: 'age', types: [Type.Number, Type.String] }],
					optional: null
				}
			}
		});
	});

	it('should parse nested optional params', () => {
		const res1 = prototypeParser.run('name: string[, age: number | string[, channel: channel]]');
		const res2 = prototypeParser.run('name: string[, age: number | string, channel: channel]');

		checkCombinator({
			res: res1,
			expectedRes: {
				args: [{ name: 'name', types: [Type.String] }],
				optional: {
					args: [{ name: 'age', types: [Type.Number, Type.String] }],
					optional: {
						args: [{ name: 'channel', types: [Type.Channel] }],
						optional: null
					}
				}
			}
		});

		checkCombinator({
			res: res2,
			expectedRes: {
				args: [{ name: 'name', types: [Type.String] }],
				optional: {
					args: [
						{ name: 'age', types: [Type.Number, Type.String] },
						{ name: 'channel', types: [Type.Channel] }
					],
					optional: null
				}
			}
		});
	});
});
