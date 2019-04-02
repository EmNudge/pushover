const { meetingTopics } = require("../../firebaseConfig.js");

module.exports = {
	name: 'add',
	description: 'adds a topic to the topic channel and database',
	syntax: 'multi-word-topic[, low/medium/high]',
	async execute(message, args, client) {
		const priorities = ['low', 'medium', 'high']
		if (!args.length) {
			message.channel.send(`${message.author} that command must have the syntax: \n \`addTopic(topic to add[, low/medium/high])\``);
			return;
		}
		const topic = args[0];
		const priority = args[1] ? args[1] : 'low';

		const topicDocExists = await meetingTopics.doc(message.guild.id).get();
		if (!topicDocExists.exists) {
			message.channel.send(`${message.author} your server doesn't have an initialized meeting topics channel`);
			return;
		}

		await meetingTopics.doc(message.guild.id).collection('topics').doc().set({ priority, topic });
		
		message.channel.send(`${message.author} your topic has been added to the database. Update the topics channel with the \`showtopics\` command`);
	},
};