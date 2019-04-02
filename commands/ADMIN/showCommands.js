const { admins } = require("../../firebaseConfig.js");
const { RichEmbed } = require('discord.js');

module.exports = {
	name: 'showCommands',
  description: 'displays all commands restricted to admins',
  syntax: 'command',
	async execute(message, args, client) {
    const commandsEmbed = new RichEmbed().setColor('#1C8CFF');
    
    const querySnapshot = await admins.doc(message.guild.id).collection('commands').get();
    for (const doc of querySnapshot.docs) {
      commandsEmbed.addField(doc.id, doc.data().description);
    }

		message.channel.send(commandsEmbed);
	},
};