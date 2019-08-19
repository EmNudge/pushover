import { meetingTopics } from 'firebaseConfig';
import { RichEmbed, Message, Client, TextChannel } from 'discord.js';

module.exports = {
	name: 'show',
	description: 'adds a topic to the topic channel and database',
	syntax: '',
	async execute(message: Message, args: string[], client: Client) {
		const topicDocExists = await meetingTopics.doc(message.guild.id).get();
		if (!topicDocExists.exists) {
			message.channel.send(`${message.author} your server doesn't have an initialized meeting topics channel. \n Set one with \`setTopicChannel(#channel-name)\``);
			return;
		}
		const querySnapshot = await meetingTopics.doc(message.guild.id).collection('topics').get();

		const meetingEmbed = new RichEmbed().setColor('#1C8CFF');

		const priorities = {
			high: [],
			medium: [],
			low: [],
		}

		//add each topic into the array corresponding to its priority
		for (const doc of querySnapshot.docs) {
			priorities[doc.data().priority.toLowerCase()].push(doc.data().topic);
		}
		//if a priority isn't empty, add it to the embed
		for (const priority in priorities) {
			if (!priorities[priority].length) continue;
			meetingEmbed.addField(priority + ' priority', priorities[priority].map(todo => '* ' + todo));
		}

		//footer contains the logo, "Meeting Topics", and then the time it was posted
		meetingEmbed.setTimestamp().setFooter('Meeting Topics', 'https://cdn.discordapp.com/icons/414880062228267008/b2a7ba2b1d69300e7aeb7829843e1d3e.webp')
		
		const settings = await meetingTopics.doc(message.guild.id).get();
		const channel: TextChannel = (await client.channels.get(settings.data().channel) as TextChannel);

		//check if old message exists and hasn't been deleted. If so, delete it.
		if (settings.data().message) {
			try {
				const oldMessage = await channel.fetchMessage(settings.data().message);
				oldMessage.delete();
			} catch(err) {
				console.log('Message has already been deleted or bot has no delete permissions');
			}
		}

		//send the embed and commit its ID to the database. If it doesn't exist, create it. If it does, update it.
		const sentEmbed: Message = (await channel.send(meetingEmbed) as Message);
		meetingTopics.doc(message.guild.id).set({ message: sentEmbed.id }, { merge: true });

		if (!!args[0]) {
			message.channel.send(`${message.author} that command doesn\'t accept arguments, but the meeting topics have been shown in ${channel} regardeless`);
			return;
		}
		message.channel.send(`${message.author} the meeting topics have been shown in ${channel}`);
	},
};