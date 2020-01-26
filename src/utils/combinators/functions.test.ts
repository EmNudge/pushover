import { expect } from "chai";
import { functionParser, args, argsInParens } from "./functions";
import { Type } from "../index";

const checkCombinator = ({
  res,
  shouldFail = false,
  expectedRes = res.result
}) => {
  // should fail or not
  expect(res.isError).to.be[String(shouldFail)];

  // deep or regular equality if result is an object
  const equality = typeof res.result === "object" ? "eql" : "equal";
  expect(res.result).to[equality](expectedRes);

  // if doesn't fail, but it's supposed to (or vice versa), log it
  if (res.isError !== shouldFail) console.log(res);
};

describe("Function Parsing", () => {
  it("should separate parameters", () => {
    const res = args.run('3123321, "hello my friend" , true,false');

    checkCombinator({
      res,
      expectedRes: [
        { type: Type.Number, value: 3123321 },
        { type: Type.String, value: "hello my friend" },
        { type: Type.Boolean, value: true },
        { type: Type.Boolean, value: false }
      ]
    });
  });

  it("should work with all types", () => {
    const res1 = args.run('1234, "string", bigBoy, true, false');
    const res2 = args.run(`https://google.com, <#907088875861745716>`);
    const res3 = args.run(`<@!9070888758617457164>, <@&9070888758617457164>`);

    checkCombinator({
      res: res1,
      expectedRes: [
        { type: Type.Number, value: 1234 },
        { type: Type.String, value: "string" },
        { type: Type.Function, value: ["bigBoy"] },
        { type: Type.Boolean, value: true },
        { type: Type.Boolean, value: false }
      ]
    });
    checkCombinator({
      res: res2,
      expectedRes: [
        { type: Type.Link, value: "https://google.com" },
        { type: Type.Channel, value: "907088875861745716" }
      ]
    });
    checkCombinator({
      res: res3,
      expectedRes: [
        { type: Type.User, value: "9070888758617457164" },
        { type: Type.Role, value: "9070888758617457164" }
      ]
    });
  });

  it("should separate params in parens", () => {
    const res = argsInParens.run('( 3123321, "hello my friend" , true,false )');

    checkCombinator({
      res,
      expectedRes: [
        { type: Type.Number, value: 3123321 },
        { type: Type.String, value: "hello my friend" },
        { type: Type.Boolean, value: true },
        { type: Type.Boolean, value: false }
      ]
    });
  });

  it("should parse a function", () => {
    const res = functionParser.run('killMe  ( 32, "what is up?!", true )  ');

    checkCombinator({
      res,
      expectedRes: {
        name: ["killMe"],
        args: [
          { type: Type.Number, value: 32 },
          { type: Type.String, value: "what is up?!" },
          { type: Type.Boolean, value: true }
        ]
      }
    });
  });

  it("should parse an empty function", () => {
    const res = functionParser.run('emptyFunction()');

    debugger;

    checkCombinator({
      res,
      expectedRes: {
        name: ["emptyFunction"],
        args: []
      }
    });
  });

  it("should parse a function recursively", () => {
    const res = functionParser.run(
      'killMe  ( killMe(32), "what is up?!", true )  '
    );

    checkCombinator({
      res,
      expectedRes: {
        name: ["killMe"],
        args: [
          {
            type: Type.Executable,
            value: {
              name: ["killMe"],
              args: [{ type: Type.Number, value: 32 }]
            }
          },
          { type: Type.String, value: "what is up?!" },
          { type: Type.Boolean, value: true }
        ]
      }
    });
  });
});
