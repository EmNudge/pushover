import getArgs from './getArgs'
import argsMatchSyntax from './syntaxMatcher'
import isRestrictedChannel from './channelRestrictor'
import { Message, Client, Collection } from 'discord.js'
import { Command, Arg } from './../index'


async function runCommand(message: Message, client: Client, commands: Collection<string, Command>) {
    //if it's not in command syntax, ignore
    if (!message.content.split(' ')[0].includes('(') || !message.content.endsWith(')')) return;

    //get everything before the first '(' and use as the command name
    const funcName = message.content.slice(0, message.content.indexOf('('));
    //if the command name isn't valid, ignore
    if (!commands.has(funcName)) return;

    const argString = message.content.slice(message.content.indexOf('(') + 1, -1);
    const args: Arg[] = getArgs(argString);
    const { syntax, channelType } = commands.get(funcName);
    if (!argsMatchSyntax(args, syntax)) {
        message.reply(`Invalid syntax. Please use \`${funcName}(${syntax})\``)
        return;
    }
    if (isRestrictedChannel(message.channel, channelType)) {
        message.reply(`that command must be used in channel type: ${channelType}`);
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