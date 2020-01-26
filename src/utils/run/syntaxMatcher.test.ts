import { expect } from 'chai';
import { functionParser, prototypeParser } from '../combinators'
import matchesPrototype from './syntaxMatcher';

describe('Syntax Matching', () => {
	it('should match arguments length', () => {
		const parsedPrototype1 = prototypeParser.run('name: string, age: string | number').result;
		const parsedPrototype2 = prototypeParser.run('').result;

		const parsedFunction1 = functionParser.run('test("EmNudge", 26)').result;
		const parsedFunction2 = functionParser.run('test("EmNudge", "26")').result;
		const parsedFunction3 = functionParser.run('emptyFunction()').result;

		const matches1 = matchesPrototype(parsedFunction1, parsedPrototype1);
		const matches2 = matchesPrototype(parsedFunction2, parsedPrototype1);
    debugger;
    const matches3 = matchesPrototype(parsedFunction3, parsedPrototype2);
    

		expect(matches1).to.true;
		expect(matches2).to.true;
		expect(matches3).to.true;
	});

	it('should match arguments type', () => {
		const parsedPrototype = prototypeParser.run('name: string, age: number').result;

		const parsedFunction1 = functionParser.run('test("EmNudge", 26)').result;
		const parsedFunction2 = functionParser.run('test("EmNudge", "26")').result;
		const parsedFunction3 = functionParser.run('test("EmNudge", https://example.com)').result;

		const matches1 = matchesPrototype(parsedFunction1, parsedPrototype);
		const matches2 = matchesPrototype(parsedFunction2, parsedPrototype);
		const matches3 = matchesPrototype(parsedFunction3, parsedPrototype);

		expect(matches1).to.true;
		expect(matches2).to.false;
		expect(matches3).to.false;
	});

	it('should be okay with optional params', () => {
		const parsedPrototype = prototypeParser.run('name: string[, age: string | number]').result;

		const parsedFunction1 = functionParser.run('test("EmNudge")').result;
		const parsedFunction2 = functionParser.run('test("EmNudge", 26)').result;

		const matches1 = matchesPrototype(parsedFunction1, parsedPrototype);
		const matches2 = matchesPrototype(parsedFunction2, parsedPrototype);

		expect(matches1).to.true;
		expect(matches2).to.true;
	});

	it('should not be okay with mismatched params', () => {
		const parsedPrototype = prototypeParser.run('name: string, age: string | number').result;

		const parsedFunction1 = functionParser.run('test("EmNudge")').result;
		const parsedFunction2 = functionParser.run('test("EmNudge", 26, https://example.com)').result;

		const matches1 = matchesPrototype(parsedFunction1, parsedPrototype);
		const matches2 = matchesPrototype(parsedFunction2, parsedPrototype);

		expect(matches1).to.false;
		expect(matches2).to.false;
	});

	it('should handle optional params required length', () => {
		const parsedPrototype = prototypeParser.run('name: string[, age: string | number, height: string]').result;

		const parsedFunction1 = functionParser.run(`test("EmNudge")`).result;
		const parsedFunction2 = functionParser.run('test("EmNudge", 26)').result;
		const parsedFunction3 = functionParser.run(`test("EmNudge", 26, "6'4''")`).result;

		const matches1 = matchesPrototype(parsedFunction1, parsedPrototype);
		const matches2 = matchesPrototype(parsedFunction2, parsedPrototype);
		const matches3 = matchesPrototype(parsedFunction3, parsedPrototype);

		expect(matches1).to.true;
		expect(matches2).to.false;
		expect(matches3).to.true;
	});

	it('should handle deep optional param length', () => {
		const parsedPrototype = prototypeParser.run('name: string[, age: string | number[, height: string]]').result;

		const parsedFunction1 = functionParser.run(`test("EmNudge")`).result;
		const parsedFunction2 = functionParser.run('test("EmNudge", 26)').result;
		const parsedFunction3 = functionParser.run(`test("EmNudge", 26, "6'4''")`).result;

		const matches1 = matchesPrototype(parsedFunction1, parsedPrototype);
		const matches2 = matchesPrototype(parsedFunction2, parsedPrototype);
		const matches3 = matchesPrototype(parsedFunction3, parsedPrototype);

		expect(matches1).to.true;
		expect(matches2).to.true;
		expect(matches3).to.true;
	});
});
