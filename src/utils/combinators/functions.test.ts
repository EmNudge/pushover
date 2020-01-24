import { expect } from 'chai';
import { functionParser, args, argsInParens } from './functions';

const checkCombinator = ({ res, shouldFail = false, expectedRes = res.result }) => {
  // should fail or not
  expect(res.isError).to.be[String(shouldFail)];

  // deep or regular equality if result is an object
  const equality = typeof res.result === 'object' ? 'eql' : 'equal';
  expect(res.result).to[equality](expectedRes);

  // if doesn't fail, but it's supposed to (or vice versa), log it
  if (res.isError !== shouldFail) console.log(res);
};

describe('Function Parsing', () => {
  it('should separate parameters', () => {
    const res = args.run('3123321, "hello my friend" , true,false');
    
    checkCombinator({ res, expectedRes: [3123321, 'hello my friend', true, false] });
  });
  
  it('should separate params in parens', () => {
    const res = argsInParens.run('( 3123321, "hello my friend" , true,false )');

    checkCombinator({ res, expectedRes: [3123321, 'hello my friend', true, false] });
  })

  it('should parse a function', () => {
    const res = functionParser.run('killMe  ( 32, "what is up?!", true )  ')

    checkCombinator({ res, expectedRes: { name: ['killMe'], args: [32, "what is up?!", true] } });
  })

  it('should parse a function recursively', () => {
    const res = functionParser.run('killMe  ( killMe(32), "what is up?!", true )  ')

    checkCombinator({ res, expectedRes: { name: ['killMe'], args: [{ name: ['killMe'], args: [32] }, "what is up?!", true] } });
  })
});
