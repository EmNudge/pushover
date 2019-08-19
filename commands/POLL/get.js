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
var discord_js_1 = require("discord.js");
function getHighestReactions(reactions) {
    var highestVal = Math.max.apply(Math, __spread(reactions.map(function (obj) { return obj.count; })));
    return reactions.filter(function (obj) { return obj.count === highestVal; });
}
function getResults(reactions) {
    return __awaiter(this, void 0, void 0, function () {
        var pollResults, totalReactionCount, _a, _b, reaction;
        var e_1, _c;
        return __generator(this, function (_d) {
            pollResults = [];
            totalReactionCount = 0;
            try {
                for (_a = __values(reactions.array()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    reaction = _b.value;
                    pollResults.push(reaction.count + " of " + reaction.emoji);
                    totalReactionCount += reaction.count;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return [2 /*return*/, {
                    pollResults: pollResults.join('\n'),
                    totalReactionCount: totalReactionCount
                }];
        });
    });
}
exports["default"] = {
    name: 'get',
    description: 'retrieves poll data from any user',
    syntax: 'postID',
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, serverID, channelID, postID, quotedChannel, pollResultsEmbed, quotedPost, _b, pollResults, totalReactionCount, descText, winners, _c, _d, reaction, percentage;
            var e_2, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = __read(args[0].split('/').slice(4), 3), serverID = _a[0], channelID = _a[1], postID = _a[2];
                        quotedChannel = client.channels.get(channelID);
                        if (!(quotedChannel instanceof discord_js_1.TextChannel)) {
                            message.reply('The poll needs to be in a discord server.');
                            return [2 /*return*/];
                        }
                        pollResultsEmbed = new discord_js_1.RichEmbed().setColor('#1C8CFF');
                        return [4 /*yield*/, quotedChannel.fetchMessage(postID)];
                    case 1:
                        quotedPost = _f.sent();
                        return [4 /*yield*/, getResults(quotedPost.reactions)];
                    case 2:
                        _b = _f.sent(), pollResults = _b.pollResults, totalReactionCount = _b.totalReactionCount;
                        descText = [pollResults];
                        winners = getHighestReactions(quotedPost.reactions);
                        descText.push('\n' + (winners.size > 1 ? 'Tied:' : 'Winner:'));
                        try {
                            for (_c = __values(winners.array()), _d = _c.next(); !_d.done; _d = _c.next()) {
                                reaction = _d.value;
                                percentage = Math.round(reaction.count / totalReactionCount * 100);
                                descText.push(reaction.emoji + " with " + reaction.count + " votes - " + percentage + "% of the total");
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_e = _c["return"])) _e.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        pollResultsEmbed.setTitle('Poll Results');
                        pollResultsEmbed.setDescription(descText.join('\n'));
                        message.channel.send(pollResultsEmbed);
                        return [2 /*return*/];
                }
            });
        });
    }
};
