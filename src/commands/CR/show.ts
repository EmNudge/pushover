import responsesDb from '../../db/responses.json';
import { Message, RichEmbed } from 'discord.js';

module.exports = {
	name: 'show',
  description: 'retrieve all responses',
  syntax: '',
	async execute(message: Message) {
    const guild = responsesDb[message.guild.id]

    if (!guild || !Object.keys(guild).length) {
      await message.channel.send('There are no triggers set for this server');
      return;
    }

    const responsesEmbed = new RichEmbed().setColor('#1C8CFF').setTitle('Custom Responses');

    const embedText = [];
    for (const name of Object.keys(guild)) {
      const response = guild[name]
      embedText.push(`* ${name}: ${response}`)
    }

    responsesEmbed.setDescription(embedText.join('\n'));

    await message.channel.send(responsesEmbed);
	},
};