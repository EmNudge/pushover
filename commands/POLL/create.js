module.exports = {
	name: 'create',
	description: 'creates a poll',
	syntax: 'poll title, [emoji] = [poll choice], [emoji] = [poll choice], ...',
	async execute(message, args, client) {
        const title = args[0];
        const reactions = [];
        for (const reactionArg of args.slice(1)) {
            let emoji = reactionArg.split(' ')[0];
            if (emoji.includes(':')) {
                const snowflake = emoji.split(':')[2].slice(0, -1);
                emoji = message.guild.emojis.get(snowflake);
            }
            reactions.push(emoji);
        }

        const botMessage = await message.channel.send(`${title}\n\n${args.slice(1).join('\n')}`);
        for (const reaction of reactions) {
            await botMessage.react(reaction);
        }
	},
};