import { expect } from "chai";
import { Type } from './typeDefinitions'
import paramsMatchSyntax, { areParamsInRange } from './syntaxMatcher'
import getParams from './getParams'

describe('checks if parameters match a given syntax', function() {
  it('knows the correct types', function() {
    const params = getParams('42234, hello, function()');
    expect(params[0].type).equal(Type.Number);
    expect(params[1].type).equal(Type.String);
    expect(params[2].type).equal(Type.Function);
  })
  
  it('has the correct parameter number', function() {
    const paramStr = '42234, hello, function()';
    const params = getParams(paramStr);
    const inRange = areParamsInRange(paramStr, params.length)
    expect(inRange).equal(true);
  })

  it('has the correct parameter number - optional', function() {
    const syntax = 'num, string[, func()]'
    const paramStr = '42234, hello';

    const params = getParams(paramStr);
    const inRange = areParamsInRange(syntax, params.length)
    expect(inRange).equal(true);
  })

  it('matches the syntax', function() {
    const params = getParams('42234, hello, function()');
    
    const matchSyntax1 = paramsMatchSyntax(params, 'num: number, str: string, func: function');
    expect(matchSyntax1).equal(true);
    
    const matchSyntax2 = paramsMatchSyntax(params, 'num: number, func: function, func: function');
    expect(matchSyntax2).equal(false);

    const matchSyntax3 = paramsMatchSyntax(params, 'num: number, str1: string, func: function, str2: string');
    expect(matchSyntax3).equal(false);

    const matchSyntax4 = paramsMatchSyntax(params, 'num: number, str: string');
    expect(matchSyntax4).equal(false);
  }); 
});