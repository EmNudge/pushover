import { FunctionArgument } from '../../utils/combinators';
import responsesDb from '../../db/responses.json';
import { Message } from 'discord.js';

module.exports = {
	name: 'get',
	description: 'retrieve a custom response',
	syntax: 'responseName: string',
	async execute(message: Message, args: FunctionArgument[]) {
    const guild = responsesDb[message.guild.id];
    
		if (!guild) {
			await message.channel.send('This server has not yet set any custom messages');
			return;
		}

		const name = args[0].value as string;
		const response = guild[name];

		if (!response) {
			await message.channel.send('That trigger has no associated response set.');
			return;
		}

		await message.channel.send(response);
	}
};
