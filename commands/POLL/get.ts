import { RichEmbed, Message, Client, TextChannel, MessageReaction, Collection } from 'discord.js';


function getHighestReactions(reactions: Collection<string, MessageReaction>) {
    const highestVal = Math.max(...reactions.map((obj: MessageReaction) => obj.count));
    return reactions.filter((obj: MessageReaction) => obj.count === highestVal);
}

async function getResults(reactions: Collection<string, MessageReaction>) {
    const pollResults = [];
    let totalReactionCount = 0;
    for (const reaction of reactions.array()) {
        pollResults.push(`${reaction.count} of ${reaction.emoji}`);
        totalReactionCount += reaction.count;
    }

    return { 
        pollResults: pollResults.join('\n'), 
        totalReactionCount,
    };
}

export default {
    name: 'get',
    description: 'retrieves poll data from any user',
    syntax: 'postID',
    async execute(message: Message, args: string[], client: Client) {
        const [serverID, channelID, postID] = args[0].split('/').slice(4);

        const quotedChannel = client.channels.get(channelID);
        if (!(quotedChannel instanceof TextChannel)) {
            message.reply('The poll needs to be in a discord server.');
            return;
        }
        
        const pollResultsEmbed = new RichEmbed().setColor('#1C8CFF');

        const quotedPost = await quotedChannel.fetchMessage(postID);
        const { pollResults, totalReactionCount } = await getResults(quotedPost.reactions)
        const descText = [pollResults]

        const winners = getHighestReactions(quotedPost.reactions);
        descText.push('\n' + (winners.size > 1 ? 'Tied:' : 'Winner:'));

        for (const reaction of winners.array()) {
            const percentage = Math.round(reaction.count/totalReactionCount*100);
            descText.push(`${reaction.emoji} with ${reaction.count} votes - ${percentage}% of the total`);
        }

        pollResultsEmbed.setTitle('Poll Results');
        pollResultsEmbed.setDescription(descText.join('\n'));

        message.channel.send(pollResultsEmbed)
    }
}