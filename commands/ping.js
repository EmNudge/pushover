module.exports = {
	name: 'ping',
	description: 'returns ping',
	syntax: '',
	async execute(message, args, client) {
		const m = await message.channel.send("Ping? What Ping?");
		m.edit(`Pong!
		Latency is ${m.createdTimestamp - message.createdTimestamp}ms.
		API Latency is ${Math.round(client.ping)}ms`);
	},
};