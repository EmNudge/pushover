import matchesPrototype from './syntaxMatcher'
import isRestrictedChannel from './channelRestrictor'
import { Message, Client, Collection } from 'discord.js'
import { Command } from '../index'
import { prototypeParser, functionParser } from '../combinators/'


async function runCommand(message: Message, client: Client, commands: Collection<string, Command>) {
    // first a dirty check to see if it has a closing paren
    // can't check opening since parser allows for whitespace which is hard to check for
    // without a parser. Cheaper to just let the parser handle it from here.
    if (!message.content.trim().endsWith(')')) return;

    // expensive check to extract all the data using a recursive parser combinator
    const parserFunc = functionParser.run(message.content)

    if (parserFunc.isError) return;

    // name: string[], args: string[]
    const { name, args } = parserFunc.result
    const funcName = name.join('.')

    //if the command name isn't valid, ignore
    if (!commands.has(funcName)) return;

    const { syntax, channelType } = commands.get(funcName);

    const parsedPrototype = prototypeParser.run(syntax).result
    
    if (!matchesPrototype(parserFunc.result, parsedPrototype)) {
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