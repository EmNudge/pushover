import { expect } from 'chai';
import { string, variableName, funcName, boolean } from './functions';

const checkCombinator = ({ res, shouldFail = false, expectedRes = res.result }) => {
  // should fail or not
  expect(res.isError).to.be[String(shouldFail)];

  // deep or regular equality if result is an object
  const equality = typeof res.result === 'object' ? 'eql' : 'equal';
  expect(res.result).to[equality](expectedRes);

  // if doesn't fail, but it's supposed to (or vice versa), log it
  if (res.isError !== shouldFail) console.log(res);
};

describe('Function Type Parsing', () => {
  it('should parse variable names correctly', () => {
    const res1 = variableName.run('c00lKid');
    const res2 = variableName.run('0hMan');

    checkCombinator({ res: res1, expectedRes: 'c00lKid' });
    checkCombinator({ res: res2, shouldFail: true });
  });

  it('should parse function names correctly', () => {
    const res1 = funcName.run('This.IS.a.Function.name');
    const res2 = funcName.run('invalid function name');

    checkCombinator({ res: res1, expectedRes: ['This', 'IS', 'a', 'Function', 'name'] });
    checkCombinator({ res: res2, expectedRes: ['invalid'] });
  });

  it('should capture strings', () => {
    const res1 = string.run(`" Hello this is a string!! "`);
    const res2 = string.run(`' Hello this is a "string!!" '`);

    checkCombinator({ res: res1, expectedRes: ' Hello this is a string!! ' });
    checkCombinator({ res: res2, expectedRes: ' Hello this is a "string!!" ' });
  });

  it('should capture booleans', () => {
    const res1 = boolean.run(`true`);
    const res2 = boolean.run(`false`);
    const res3 = boolean.run(`True`);
    const res4 = boolean.run(`False`);

    checkCombinator({ res: res1, expectedRes: true });
    checkCombinator({ res: res2, expectedRes: false });
    checkCombinator({ res: res3, shouldFail: true });
    checkCombinator({ res: res4, shouldFail: true });
  });
});
