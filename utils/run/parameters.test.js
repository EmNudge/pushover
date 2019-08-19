"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var chai_1 = require("chai");
var typeDefinitions_1 = require("./typeDefinitions");
var syntaxMatcher_1 = __importStar(require("./syntaxMatcher"));
var getArgs_1 = __importDefault(require("./getArgs"));
describe('checks if parameters match a given syntax', function () {
    it('knows the correct types', function () {
        var params = getArgs_1["default"]('42234, hello, function()');
        chai_1.expect(params[0].type).equal(typeDefinitions_1.Type.Number);
        chai_1.expect(params[1].type).equal(typeDefinitions_1.Type.String);
        chai_1.expect(params[2].type).equal(typeDefinitions_1.Type.Function);
    });
    it('has the correct parameter number', function () {
        var paramStr = '42234, hello, function()';
        var params = getArgs_1["default"](paramStr);
        var inRange = syntaxMatcher_1.argsInRange(paramStr, params.length);
        chai_1.expect(inRange).equal(true);
    });
    it('has the correct parameter number - optional', function () {
        var syntax = 'num, string[, func()]';
        var paramStr = '42234, hello';
        var params = getArgs_1["default"](paramStr);
        var inRange = syntaxMatcher_1.argsInRange(syntax, params.length);
        chai_1.expect(inRange).equal(true);
    });
    it('matches the syntax', function () {
        var params = getArgs_1["default"]('42234, hello, function()');
        var matchSyntax1 = syntaxMatcher_1["default"](params, 'num: number, str: string, func: function');
        chai_1.expect(matchSyntax1).equal(true);
        var matchSyntax2 = syntaxMatcher_1["default"](params, 'num: number, func: function, func: function');
        chai_1.expect(matchSyntax2).equal(false);
        var matchSyntax3 = syntaxMatcher_1["default"](params, 'num: number, str1: string, func: function, str2: string');
        chai_1.expect(matchSyntax3).equal(false);
        var matchSyntax4 = syntaxMatcher_1["default"](params, 'num: number, str: string');
        chai_1.expect(matchSyntax4).equal(false);
    });
});
