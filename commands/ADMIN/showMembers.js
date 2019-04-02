const { admins } = require("../../firebaseConfig.js");
const { RichEmbed } = require('discord.js');

module.exports = {
	name: 'showMembers',
  description: 'displays all commands restricted to admins',
  syntax: 'command',
	async execute(message, args, client) {
    const commandsEmbed = new RichEmbed().setColor('#1C8CFF');
    
    const roles = await admins.doc(message.guild.id).collection('roles').get();
    if (roles.docs.length) commandsEmbed.addField('Roles', roles.docs.map(doc => `* ${doc.data().name}\n`).join(''));
    
    const users = await admins.doc(message.guild.id).collection('users').get();
    if (users.docs.length) commandsEmbed.addField('Users', users.docs.map(doc => `* ${doc.data().name}\n`).join(''));

		message.channel.send(commandsEmbed);
	},
};