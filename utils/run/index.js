"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var getArgs_1 = __importDefault(require("./getArgs"));
var syntaxMatcher_1 = __importDefault(require("./syntaxMatcher"));
var adminRestrictor_1 = __importDefault(require("./adminRestrictor"));
function runCommand(message, client, commands) {
    return __awaiter(this, void 0, void 0, function () {
        var funcName, args, syntax;
        return __generator(this, function (_a) {
            //if it's not in command syntax, ignore
            if (!message.content.split(' ')[0].includes('(') || !message.content.endsWith(')'))
                return [2 /*return*/];
            funcName = message.content.slice(0, message.content.indexOf('('));
            //if the command name isn't valid, ignore
            if (!commands.has(funcName))
                return [2 /*return*/];
            args = getArgs_1["default"](message.content.slice(message.content.indexOf('(') + 1, -1));
            if (adminRestrictor_1["default"](funcName, message)) {
                message.channel.send(message.author + ' Unfortunately that command is admin restricted and you are not listed as an admin');
                return [2 /*return*/];
            }
            syntax = commands.get(funcName).syntax;
            if (!syntaxMatcher_1["default"](args, syntax)) {
                message.reply("Invalid syntax. Please use `" + funcName + "(" + syntax + ")`");
                return [2 /*return*/];
            }
            //if all tests pass, try to run the command
            try {
                commands.get(funcName).execute(message, args.map(function (arg) { return arg.value; }), client);
            }
            catch (error) {
                console.error(error);
                message.reply('Whoops! Error occurred!');
            }
            return [2 /*return*/];
        });
    });
}
exports["default"] = runCommand;
