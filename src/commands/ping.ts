import { Message } from 'discord.js'
import { client } from '../index'

export default {
	name: 'ping',
	description: 'returns ping',
	syntax: '',
	async execute(message: Message) {
		const m = await message.channel.send("Ping? What Ping?") as Message;
		
		m.edit(`Pong!
		Latency is ${m.createdTimestamp - message.createdTimestamp}ms.
		API Latency is ${Math.round(client.ping)}ms`);
	},
};