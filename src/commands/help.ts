import { Type } from '../utils/index';
import { RichEmbed, Message } from 'discord.js';
import { FunctionArgument } from '../utils/combinators';
import { commands } from '../index';

export default {
	name: 'help',
	description: 'Returns the descriptor for a command. \nWill list commands if no argument is present.',
	syntax: `[commandName: ${Type.String} | ${Type.Function}]`,
	async execute(message: Message, args: FunctionArgument[]) {
		if (!args.length) {
			const embed = new RichEmbed().setColor('#1C8CFF');
			const cmds = [...commands.keys()].filter(cmd => !cmd.startsWith('ADMIN')).join(', ')
			embed.setTitle('Commands').setDescription(cmds)

			await message.channel.send(embed);
			return;
		}

		const commandName = args[0].value as string;

		if (!commands.has(commandName)) {
			message.reply(`that is not a valid command`);
			return;
		}

		const { description, syntax } = commands.get(commandName);

		const helpEmbed = new RichEmbed().setColor('#1C8CFF');

		const embedDescription = [description, '', `**syntax**: ${commandName}(${syntax})`].join('\n');
		helpEmbed.setTitle(commandName).setDescription(embedDescription);

		await message.channel.send(helpEmbed);
	}
};
