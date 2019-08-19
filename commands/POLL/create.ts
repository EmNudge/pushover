import { Message, Emoji } from 'discord.js'

export default {
	name: 'create',
	description: 'creates a poll',
	syntax: 'poll title, [emoji] = [poll choice], [emoji] = [poll choice], ...',
	async execute(message: Message, args: string[]) {
        const title = args[0];
        const reactions: any[] = [];

        for (const reactionArg of args.slice(1)) {
            let emoji: Emoji | string = reactionArg.split(' ')[0];

            if (emoji.includes(':')) {
                const snowflake = emoji.split(':')[2].slice(0, -1);
                emoji = message.guild.emojis.get(snowflake);
            }
            reactions.push(emoji);
        }

        const botMessage: Message = (await message.channel.send(`${title}\n\n${args.slice(1).join('\n')}`) as Message);
        for (const reaction of reactions) {
            await botMessage.react(reaction);
        }
	},
};