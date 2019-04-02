const { getCommands } = require('../usefulFunctions.js');
const { RichEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'returns the descriptor for a command',
	syntax: 'commandName',
	async execute(message, args, client) {
		const commands = getCommands();
		const commandName = args[0].includes('(') ? args[0].substring(0, args[0].indexOf('(')) : args[0];

		if (!commands.has(commandName)) {
			message.channel.send(`${message.author} That is not a valid command`);
			return;
		}

		const { description, syntax } = commands.get(commandName);

		const meetingEmbed = new RichEmbed().setColor('#1C8CFF');
		//add line for syntax if there is a syntax property
		const embedDescription = `**description**: ${description}\n**syntax**: ${commandName}(${syntax})`;
		meetingEmbed.setTitle(commandName).setDescription(embedDescription);

		message.channel.send(meetingEmbed);
	},
};