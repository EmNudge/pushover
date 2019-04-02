const { customReponses } = require('../../firebaseConfig.js');
const { RichEmbed } = require('discord.js');

module.exports = {
	name: 'show',
  description: 'retrieve all responses',
  syntax: '',
	async execute(message, args, client) {
    const responsesEmbed = new RichEmbed().setColor('#1C8CFF').setTitle('Custom Responses');
    const dbResponses = await customReponses.doc(message.guild.id).get();

    let embedText = '';
    for (const response of dbResponses.data().responses) {
      embedText += `* ${response.trigger}: ${response.response}\n`;
    }
    responsesEmbed.setDescription(embedText);

    message.channel.send(responsesEmbed);
	},
};