import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from '../index'
import path from 'path';

/** return the same object whether using export default or module.exports */
function getCommand(path): Command {
    const command = require(path);
    if (command.__esModule) return command.default
    return command;
}

function getCommands(): Collection<string, Command> {
    const commands: Collection<string, Command> = new Collection();

    //recursive algorithm to loop through folders
    function addCommands(fileArray: string[], folderName: string = '') {
        for (const fileName of fileArray) {
            if (fileName.includes('.') && !fileName.endsWith('.js')) continue;

            if (fileName.endsWith('.js')) {
                const dir = path.join(__dirname, '../../commands/', folderName, fileName);
                const command: Command = getCommand(dir);
                const commandName: string = folderName.split('/').join('.') + command.name;
                commands.set(commandName, command);
                continue;
            }

            //recursively call if it's a folder
            const dir = path.join(__dirname, '../../commands/', fileName);
            addCommands(
                readdirSync(dir),
                folderName + fileName + '/'
            );
        }
    }

    const dir = path.join(__dirname, '../../commands/');
    addCommands(readdirSync(dir));

    return commands;
}

export default getCommands;