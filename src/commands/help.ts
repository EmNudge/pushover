import { Type } from '../utils/index'
import { RichEmbed, Message } from 'discord.js';
import { FunctionArgument } from '../utils/combinators'
import { commands } from '../index'

export default {
	name: 'help',
	description: 'returns the descriptor for a command',
	syntax: `commandName: ${Type.String} | ${Type.Variable}`,
	async execute(message: Message, args: FunctionArgument[]) {
		const commandName = args[0].value as string;

		console.log({commandName})

		if (!commands.has(commandName)) {
			message.reply(`that is not a valid command`);
			return;
		}

		const { description, syntax } = commands.get(commandName);

		const meetingEmbed = new RichEmbed().setColor('#1C8CFF');
		//add line for syntax if there is a syntax property
		const embedDescription = `**description**: ${description}\n**syntax**: ${commandName}(${syntax})`;
		meetingEmbed.setTitle(commandName).setDescription(embedDescription);

		await message.channel.send(meetingEmbed);
	},
};