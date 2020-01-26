import { Type } from '../utils/index'
import {runCommand} from '../utils/run'
import { Message } from 'discord.js'
import { FunctionArgument, ParsedFunctionResult } from '../utils/combinators'

export default {
	name: 'delete',
	description: 'runs a command and deletes the user message once the command is complete',
	syntax: `calledFunctionWithArgs: ${Type.Executable}`,
	async execute(message: Message, args: FunctionArgument[]) {
		//delete the command. The entire point of this function
		if (message.deletable) {
			await message.delete();
		} else {
			await message.channel.send(`I do not have delete permissions.`);
			return;
		}

		await runCommand(message, args[0].value as ParsedFunctionResult);
	},
};