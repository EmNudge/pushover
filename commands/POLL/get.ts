import { RichEmbed, Message, Client } from 'discord.js';
const { getMax } = require('../../usefulFunctions.js');

export default {
    name: 'get',
    description: 'retrieves poll data from any user',
    syntax: 'postID',
    async execute(message: Message, args, client: Client) {
        const [serverID, channelID, postID] = args[0].split('/').slice(4);

		const quotedChannel = client.channels.get(channelID);
        // const quotedServer = client.guilds.get(serverID);
        
        const pollResultsEmbed = new RichEmbed().setColor('#1C8CFF');
        
        console.log(quotedChannel)
        console.log(channelID, postID)
        return;

        // let pollResults = '';
        // let totalReactionCount = 0;
        // const duplicatedNames = [];
        // const quotedPost = await quotedChannel.fetchMessage(postID);
        // quotedPost.reactions.map(async reaction => {
        //     pollResults += `\n${reaction.count} of ${reaction.emoji}`
        //     totalReactionCount += reaction.count;
        //     const users = await reaction.fetchUsers();
        //     users.map(user => {
        //         duplicatedNames.push(user.id)
        //     })
        //     console.log(duplicatedNames)
        // });

        // const winners = getMax(quotedPost.reactions, 'count');
        // pollResults += winners.size > 1 ? '\n\nTied:' : '\n\nWinner:';
        // winners.map(reaction => {
        //     pollResults += `\n${reaction.emoji} with ${reaction.count} votes - ${parseInt(reaction.count/totalReactionCount*10000)/100}% of the total`;
        // })

        // pollResultsEmbed.setTitle('Poll Results');
        // pollResultsEmbed.setDescription(pollResults);

        // //check for duplicates - users who reacted more than once

        // message.channel.send(pollResultsEmbed)
    }
}