import { Message, RichEmbed } from 'discord.js';
import fs from 'fs';
import { promisify } from 'util';

module.exports = {
	name: 'showMembers',
  description: 'displays all admins',
  syntax: '',
	async execute(message: Message) {
    if (message.channel.type === 'dm') {
      message.channel.send(`That command must be used within a server`);
      return;
    }

    const commandsEmbed = new RichEmbed().setColor('#1C8CFF');

    const readFile = promisify(fs.readFile);
    const adminsJSON = await readFile('./admins.json');
    const { users, roles } = JSON.parse(String(adminsJSON))[message.guild.id].members;

    if (Object.values(users).length) {
      commandsEmbed.addField('Users', Object.values(users).map(user => `* ${user}\n`).join(''));
    }
    if (Object.values(roles).length) {
      commandsEmbed.addField('Roles', Object.values(roles).map(role => `* ${role}\n`).join(''));
    }

		message.channel.send(commandsEmbed);
	},
};