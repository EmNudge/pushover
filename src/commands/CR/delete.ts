import { FunctionArgument } from '../../utils/combinators';
import responsesDb from '../../db/responses.json';
import { Message } from 'discord.js';

module.exports = {
	name: 'delete',
	description: 'delete a custom response',
	syntax: 'responseName: string',
	async execute(message: Message, args: FunctionArgument[]) {
		const name = args[0].value as string;

		const guild = responsesDb[message.guild.id];
		if (!guild) {
			await message.channel.send('This server has not yet set any custom messages');
			return;
		}

		delete guild[name];

		message.channel.send(`The trigger **${name}** has been deleted`);
	}
};
