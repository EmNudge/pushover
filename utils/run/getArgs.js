"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
exports.__esModule = true;
var typeDefinitions_1 = require("./typeDefinitions");
function getTypeOfValue(value) {
    var isFunction = value.split(' ')[0].includes('(') && value.slice(-1) === ')';
    if (isFunction)
        return typeDefinitions_1.Type.Function;
    var isNumber = /^\d+$/.test(value);
    if (isNumber)
        return typeDefinitions_1.Type.Number;
    return typeDefinitions_1.Type.String;
}
function getArg(value) {
    return {
        type: getTypeOfValue(value),
        value: value.replace(/^"|^'|'$|"$/g, '')
    };
}
function getArgs(paramStr) {
    var e_1, _a;
    var args = [];
    var startStr = 0;
    var parentheses = 0;
    var quotes = 0;
    try {
        for (var _b = __values(__spread(paramStr).entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), index = _d[0], char = _d[1];
            //if the argument is over and there's no odd amount of closures
            var isSeparater = char === ',' || index === paramStr.length - 1;
            var evenQuotes = quotes % 2 === 0 || char === '"' || char === "'";
            var evenParentheses = parentheses % 2 === 0 || char === ')';
            if (isSeparater && evenQuotes && evenParentheses) {
                //use whole rest of string if we're up to the last character (to include index + 1)
                var value = index !== paramStr.length - 1
                    ? paramStr.slice(startStr, index)
                    : paramStr.slice(startStr);
                args.push(getArg(value.trim()));
                startStr = index + 1;
                continue;
            }
            else if (index === paramStr.length - 1) {
                throw new Error("non well-formed function params.\n      quotes: " + quotes + " parentheses: " + parentheses);
            }
            if (char === '(' || char === ')')
                parentheses++;
            if (char === '"' || char === "'")
                quotes++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return args;
}
exports["default"] = getArgs;
