import matchesPrototype from './syntaxMatcher'
import isRestrictedChannel from './channelRestrictor'
import { Message, Client, Collection } from 'discord.js'
import { Command, Arg } from '../index'
import { functionParser } from '../combinators/functions'
import { prototypeParser } from '../combinators/prototype'


async function runCommand(message: Message, client: Client, commands: Collection<string, Command>) {
    // first a dirty check to see if it has both parens
    if (!message.content.includes('(') || !message.content.trim().endsWith(')')) return;

    // expensive check to extract all the data using a recursive parser combinator
    const parserFunc = functionParser.run(message.content)

    if (parserFunc.isError) return;

    // name: string[], args: string[]
    const { name, args } = parserFunc.result
    const funcName = name.join('.')

    //if the command name isn't valid, ignore
    if (!commands.has(funcName)) return;

    const { syntax, channelType } = commands.get(funcName);

    const parsedPrototype = prototypeParser.run(syntax)
    
    if (!matchesPrototype(args, parsedPrototype)) {
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