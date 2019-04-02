const { RichEmbed } = require('discord.js');

module.exports = {
	name: 'quote',
	description: 'quotes a specific user based on a link ID',
	syntax: 'messageLink',
	async execute(message, args, client) {
		const quoteEmbed = new RichEmbed().setColor('#1C8CFF');
		if (!args[0].startsWith('https://discordapp.com/channels/')) {
			message.channel.send(`${message.author} that command requires a post link as the argument. You can copy post links by turning on developer mode and clicking \`Copy Link\` in the 3 dot menu on any post.`)
			return;
		}
		const [serverID, channelID, postID] = args[0].split('/').slice(4);

		const quotedChannel = client.channels.get(channelID);
		const quotedServer = client.guilds.get(serverID);

		const quotedPost = await quotedChannel.fetchMessage(postID);
		if (!quotedPost.content) {
			message.channel.send(`${message.author} that post has no content to quote.`)
			return;
		}

		quoteEmbed.setAuthor(quotedPost.author.tag, quotedPost.author.displayAvatarURL);
		quoteEmbed.setDescription(quotedPost.content);
		quoteEmbed.addField('Quote Location', `Server: **${quotedServer.name}**  \nChannel: **#${quotedChannel.name}**`)

		//add createdAt and EditedAt to footer
		let createdMessage = 'created at ' + quotedPost.createdAt;
		if (quotedPost.editedAt) createdMessage += ' and edited at ' + quotedPost.editedAt;
		quoteEmbed.setFooter(createdMessage, 'http://simpleicon.com/wp-content/uploads/clock-time-1.png');

		message.channel.send(quoteEmbed);
	},
};