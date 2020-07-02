import { RichEmbed, Message, TextChannel, DMChannel } from 'discord.js';
import { Type } from '../utils/index'
import { FunctionArgument } from '../utils/combinators'
import { client } from '../index'

export default {
	name: 'quote',
	description: 'quotes a specific user based on a link ID',
	syntax: `messageLink: ${Type.Link}`,
	async execute(message: Message, args: FunctionArgument[]) {
		const quoteEmbed = new RichEmbed().setColor('#1C8CFF');
		const link = args[0].value as string;

		if (!link.startsWith('https://discordapp.com/channels/')) {
			message.reply('that command requires a post link as the argument. You can copy post links by turning on developer mode and clicking `Copy Link` in the 3 dot menu on any post.')
			return;
		}
		const [serverID, channelID, postID] = link.split('/').slice(4);

		const quotedChannel: TextChannel | DMChannel = client.channels.get(channelID) as TextChannel;
		const quotedServer = client.guilds.get(serverID);

		const quotedPost = await quotedChannel.fetchMessage(postID);
		if (!quotedPost.content) {
			message.channel.send(`${message.author} that post has no content to quote.`)
			return;
		}

		quoteEmbed.setAuthor(quotedPost.author.tag, quotedPost.author.displayAvatarURL);
		quoteEmbed.setDescription(quotedPost.content);

		let channelText = ''
		if (!('name' in quotedChannel)) channelText = ` \nChannel: **#${(quotedChannel as TextChannel).name}**`

		quoteEmbed.addField('Quote Location', `Server: **${quotedServer.name}**` + channelText)

		//add createdAt and EditedAt to footer
		let createdMessage = 'created at ' + quotedPost.createdAt;
		if (quotedPost.editedAt) createdMessage += ' and edited at ' + quotedPost.editedAt;
		quoteEmbed.setFooter(createdMessage, 'https://i.imgur.com/RBDAlpD.png');

		message.channel.send(quoteEmbed);
	},
};