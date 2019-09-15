import { meetingTopics } from '../../firebaseConfig';

module.exports = {
	name: 'setChannel',
	description: 'sets a channel for the bot to post meeting topics to',
	syntax: '#channel-name',
	async execute(message, args, client) {
		if (!args[0].length || !message.mentions.channels.array().length) {
			message.channel.send(`${message.author} that command must have the syntax: \n \`setTopicChannel(#some-channel)\``);
			return;
		}

		//grabs the first channel the user mentioned
		const channel = message.mentions.channels.first();

		await meetingTopics.doc(message.guild.id).set({ channel: channel.id });
		
		message.channel.send(`${message.author} ${channel} has been set as the channel for this bot to post meeting topics to`);
	},
};