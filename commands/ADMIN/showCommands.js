const fs = require('fs');
const { promisify } = require('util');
const { RichEmbed } = require('discord.js');

module.exports = {
	name: 'showCommands',
  description: 'displays all commands restricted to admins',
  syntax: '',
	async execute(message, args, client) {
    if (message.channel.type === 'dm') {
      message.channel.send(`That command must be used within a server`);
      return;
    }

    const commandsEmbed = new RichEmbed().setColor('#1C8CFF');
    
    const readFile = promisify(fs.readFile);
    const adminsJSON = await readFile('./admins.json');
    const commands = JSON.parse(adminsJSON)[message.guild.id].commands;
    for (const command in commands) {
      commandsEmbed.addField(command, commands[command].description);
    }

		message.channel.send(commandsEmbed);
	},
};