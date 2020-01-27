import { Message } from 'discord.js';
import { FunctionArgument } from '../../utils/combinators';
import responsesDb from '../../db/responses.json';
import { writeFile } from 'fs';
import { promisify } from 'util';

module.exports = {
	name: 'set',
	description: 'create a custom response',
	syntax: 'responseName: string, customResponseMessage: string | link',
	async execute(message: Message, args: FunctionArgument[]) {
		const name = args[0].value as string;
		const response = args[1].value as string;

		if (!response.length) {
			await message.channel.send(
				`${message.author} The response cannot be empty. \`CR.delete()\` can be used to remove triggers`
			);
			return;
		}

		if (!responsesDb[message.guild.id]) {
			responsesDb[message.guild.id] = {};
		}

		const oldRes = responsesDb[message.guild.id][name];
		responsesDb[message.guild.id][name] = response;

		const writePromise = promisify(writeFile);
		await writePromise(`${process.cwd()}/src/db/responses.json`, JSON.stringify(responsesDb));

		await message.channel.send(
			`The trigger \`${name}\` has been ${oldRes
				? `overwritten from:\n \`${oldRes} \`\nand`
				: ``} set to the response of: \n\`${response}\``
		);
	}
};
