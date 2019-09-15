import { Type } from '../utils/index'
import runCommand from '../utils/run'
import getCommands from '../utils/getCommands'
import { Message, Client } from 'discord.js'

export default {
	name: 'delete',
	description: 'runs a command and deletes the user message once the command is complete',
	syntax: `command(params): ${Type.CalledFunction}`,
	async execute(message: Message, args: string[], client: Client) {
		//delete the command. The entire point of this function
		if (message.deletable) {
			message.delete();
		} else {
			message.channel.send(`I do not have delete permissions.`);
			return;
		}

		//a bit hacky, but slightly changes the context of this message object by changing the content
		message.content = args[0];

		await runCommand(message, client, getCommands());
	},
};