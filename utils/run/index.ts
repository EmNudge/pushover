import getParams from './getArgs'
import argsMatchSyntax from './syntaxMatcher'
import { Message, Client, Collection } from 'discord.js'
import { Command } from '../index'

async function runCommand(message: Message, client: Client, commands: Collection<string, Command>) {
    //if it's not in command syntax, ignore
    if (!message.content.split(' ')[0].includes('(') || !message.content.endsWith(')')) return;

    //get everything before the first '(' and use as the command name
    const funcName = message.content.slice(0, message.content.indexOf('('));
    //if the command name isn't valid, ignore
    if (!commands.has(funcName)) return;

    //get everything between first '(' and last ')' and pass it to getTypes()
    const args: any = getParams(message.content.slice(message.content.indexOf('(') + 1, -1));

    //check if the types from the arguments match the requird syntax
    const { syntax } = commands.get(funcName);
    if (!argsMatchSyntax(args, syntax)) {
        message.reply(`Invalid syntax. Please use \`${funcName}(${syntax})\``)
        return;
    }
    
    //if all tests pass, try to run the command
    try {
		commands.get(funcName).execute(message, args.map(arg => arg.value), client);
	} catch (error) {
		console.error(error);
		message.reply('Whoops! Error occurred!');
	}
}

export default runCommand;