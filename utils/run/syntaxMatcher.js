"use strict";
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
exports.__esModule = true;
var typeDefinitions_1 = require("./typeDefinitions");
/** checks if parameter length is within the allowed range */
function argsInRange(syntax, length) {
    var maxParams = syntax.split(',').length;
    var optionalParamNum = syntax.split('[').length - 1;
    var minParams = maxParams - optionalParamNum;
    var paramsInRange = minParams <= length && length <= maxParams;
    return paramsInRange;
}
exports.argsInRange = argsInRange;
/** checks if an argument conforms to the syntax of the parameter */
function argMatchesType(param, arg) {
    // if no type, default to any
    if (!param.includes(':'))
        return true;
    var type = param.split(':')[1].trim();
    var typeName = type[0].toUpperCase() + type.slice(1).toLowerCase();
    return typeDefinitions_1.Type[typeName] === arg.type;
}
/** checks received parameters against function's syntax string */
function argsMatchSyntax(args, syntax) {
    var e_1, _a;
    // return early if no syntax needed and provided
    if (!args.length && !syntax.length)
        return true;
    if (!argsInRange(syntax, args.length))
        return false;
    try {
        for (var _b = __values(syntax.split(',').entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), index = _d[0], param = _d[1];
            if (!argMatchesType(param, args[index]))
                return false;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
exports["default"] = argsMatchSyntax;
