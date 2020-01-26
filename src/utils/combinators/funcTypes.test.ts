import { expect } from "chai";
import {
  string,
  variable,
  funcName,
  boolean,
  link,
  channel,
  user,
  role
} from "./funcTypes";
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

describe("Function Type Parsing", () => {
  it("should parse variable names correctly", () => {
    const res1 = variable.run("c00lKid");
    const res2 = variable.run("0hMan");

    checkCombinator({ res: res1, expectedRes: { type: Type.Variable, value: "c00lKid" } });
    checkCombinator({ res: res2, shouldFail: true });
  });

  it("should parse function names correctly", () => {
    const res1 = funcName.run("This.IS.a.Function.name");
    const res2 = funcName.run("invalid function name");

    checkCombinator({
      res: res1,
      expectedRes: ["This", "IS", "a", "Function", "name"]
    });
    checkCombinator({ res: res2, expectedRes: ["invalid"] });
  });

  it("should capture strings", () => {
    const res1 = string.run(`" Hello this is a string!! "`);
    const res2 = string.run(`' Hello this is a "string!!" '`);

    checkCombinator({
      res: res1,
      expectedRes: { type: Type.String, value: " Hello this is a string!! " }
    });
    checkCombinator({
      res: res2,
      expectedRes: { type: Type.String, value: ' Hello this is a "string!!" ' }
    });
  });

  it("should capture booleans", () => {
    const res1 = boolean.run(`true`);
    const res2 = boolean.run(`false`);
    const res3 = boolean.run(`True`);
    const res4 = boolean.run(`False`);

    checkCombinator({
      res: res1,
      expectedRes: { type: Type.Boolean, value: true }
    });
    checkCombinator({
      res: res2,
      expectedRes: { type: Type.Boolean, value: false }
    });
    checkCombinator({ res: res3, shouldFail: true });
    checkCombinator({ res: res4, shouldFail: true });
  });

  it("should capture links", () => {
    const res1 = link.run(`https://google.com`);
    const res2 = link.run(`https://domains.google.com/site/?=%`);
    const res3 = link.run(`http://1-1.org`);
    const res4 = link.run(`google.com`);

    checkCombinator({
      res: res1,
      expectedRes: { type: Type.Link, value: "https://google.com" }
    });
    checkCombinator({
      res: res2,
      expectedRes: {
        type: Type.Link,
        value: `https://domains.google.com/site/?=%`
      }
    });
    checkCombinator({
      res: res3,
      expectedRes: { type: Type.Link, value: `http://1-1.org` }
    });
    checkCombinator({ res: res4, shouldFail: true });
  });

  it("should parse channels, users, and roles", () => {
    const res1 = channel.run(`<#907088875861745716>`);
    const res2 = user.run(`<@!9070888758617457164>`);
    const res3 = role.run(`<@&9070888758617457164>`);

    checkCombinator({
      res: res1,
      expectedRes: { type: Type.Channel, value: `907088875861745716` }
    });
    checkCombinator({
      res: res2,
      expectedRes: { type: Type.User, value: `9070888758617457164` }
    });
    checkCombinator({
      res: res3,
      expectedRes: { type: Type.Role, value: `9070888758617457164` }
    });
  });
});
