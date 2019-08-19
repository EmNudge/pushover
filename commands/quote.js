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
exports.__esModule = true;
var discord_js_1 = require("discord.js");
exports["default"] = {
    name: 'quote',
    description: 'quotes a specific user based on a link ID',
    syntax: 'messageLink',
    execute: function (message, args, client) {
        return __awaiter(this, void 0, void 0, function () {
            var quoteEmbed, _a, serverID, channelID, postID, quotedChannel, quotedServer, quotedPost, createdMessage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        quoteEmbed = new discord_js_1.RichEmbed().setColor('#1C8CFF');
                        if (!args[0].startsWith('https://discordapp.com/channels/')) {
                            message.channel.send(message.author + " that command requires a post link as the argument. You can copy post links by turning on developer mode and clicking `Copy Link` in the 3 dot menu on any post.");
                            return [2 /*return*/];
                        }
                        _a = __read(args[0].split('/').slice(4), 3), serverID = _a[0], channelID = _a[1], postID = _a[2];
                        quotedChannel = client.channels.get(channelID);
                        quotedServer = client.guilds.get(serverID);
                        return [4 /*yield*/, quotedChannel.fetchMessage(postID)];
                    case 1:
                        quotedPost = _b.sent();
                        if (!quotedPost.content) {
                            message.channel.send(message.author + " that post has no content to quote.");
                            return [2 /*return*/];
                        }
                        quoteEmbed.setAuthor(quotedPost.author.tag, quotedPost.author.displayAvatarURL);
                        quoteEmbed.setDescription(quotedPost.content);
                        quoteEmbed.addField('Quote Location', "Server: **" + quotedServer.name + "**  \nChannel: **#" + quotedChannel.name + "**");
                        createdMessage = 'created at ' + quotedPost.createdAt;
                        if (quotedPost.editedAt)
                            createdMessage += ' and edited at ' + quotedPost.editedAt;
                        quoteEmbed.setFooter(createdMessage, 'https://i.imgur.com/RBDAlpD.png');
                        message.channel.send(quoteEmbed);
                        return [2 /*return*/];
                }
            });
        });
    }
};
