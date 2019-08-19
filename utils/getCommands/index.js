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
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var fs_1 = require("fs");
function getCommand(path) {
    var command = require(path);
    if (command.__esModule)
        return command["default"];
    return command;
}
function getCommands() {
    var commands = new discord_js_1.Collection();
    //recursive algorithm to loop through folders
    function addCommands(fileArray, folderName) {
        var e_1, _a;
        if (folderName === void 0) { folderName = ''; }
        try {
            for (var fileArray_1 = __values(fileArray), fileArray_1_1 = fileArray_1.next(); !fileArray_1_1.done; fileArray_1_1 = fileArray_1.next()) {
                var fileName = fileArray_1_1.value;
                if (fileName.includes('.') && !fileName.endsWith('.js'))
                    continue;
                if (fileName.endsWith('.js')) {
                    var command = getCommand('../../commands/' + folderName + fileName);
                    var commandName = folderName.split('/').join('.') + command.name;
                    console.log(command);
                    commands.set(commandName, command);
                    continue;
                }
                //recursively call if it's a folder
                addCommands(fs_1.readdirSync('./commands/' + fileName), folderName + fileName + '/');
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fileArray_1_1 && !fileArray_1_1.done && (_a = fileArray_1["return"])) _a.call(fileArray_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    addCommands(fs_1.readdirSync('./commands/'));
    // console.log(commands)
    return commands;
}
exports["default"] = getCommands;
