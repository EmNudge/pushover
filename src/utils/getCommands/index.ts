import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Command } from 'src/types'

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
                const command: Command = getCommand('../../commands/' + folderName + fileName);
                const commandName: string = folderName.split('/').join('.') + command.name;
                commands.set(commandName, command);
                continue;
            }

            //recursively call if it's a folder
            addCommands(
                readdirSync('./commands/' + fileName),
                folderName + fileName + '/'
            );
        }
    }

    addCommands(readdirSync('./commands/'));

    return commands;
}

export default getCommands;