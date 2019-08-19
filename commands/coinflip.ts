import { Message } from 'discord.js'

export default {
	name: 'coinFlip',
	description: 'reacts with a check or X mark',
	syntax: '',
	async execute(message: Message) {
		Math.random() <= .5 ? message.react("✅") : message.react("❎");
	},
};