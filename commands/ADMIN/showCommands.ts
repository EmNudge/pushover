import { Message, RichEmbed } from 'discord.js';
import fs from 'fs';
import { promisify } from 'util';

module.exports = {
	name: 'showCommands',
  description: 'displays all commands restricted to admins',
  syntax: '',
	async execute(message: Message) {
    if (message.channel.type === 'dm') {
      message.channel.send(`That command must be used within a server`);
      return;
    }

    const commandsEmbed = new RichEmbed().setColor('#1C8CFF');
    
    const readFile = promisify(fs.readFile);
    const adminsJSON = await readFile('./admins.json');
    const commands = JSON.parse(String(adminsJSON))[message.guild.id].commands;
    for (const command in commands) {
      commandsEmbed.addField(command, commands[command].description);
    }

		message.channel.send(commandsEmbed);
	},
};