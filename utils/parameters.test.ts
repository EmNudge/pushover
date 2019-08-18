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
    const params1 = getParams('42234, hello, function()');
    const matchSyntax1 = paramsMatchSyntax(params1, 'num, string, func()');
    
    expect(matchSyntax1).equal(true);
    
    const params2 = getParams('42234, hello, function()');
    const matchSyntax2 = paramsMatchSyntax(params2, 'num, func(), func()');
    expect(matchSyntax2).equal(false);
  }); 
});