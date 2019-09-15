import { Message } from 'discord.js';
import { admins } from '../../firebaseConfig'
import getCommands from '../../utils/getCommands'

module.exports = {
	name: 'unset',
  description: 'remove admin restriction on a command',
  syntax: 'command',
	async execute(message: Message, args: string[]) {
    const commands = getCommands();
    const commandName = args[0].includes('(') ? args[0].substring(0, args[0].indexOf('(')) : args[0];
    
    if (message.guild.ownerID != message.author.id)  {
      message.channel.send(`${message.author} only a server owner may use this command`);
      return;
    }

		if (!commands.has(commandName)) {
			message.channel.send(`${message.author} That is not a valid command`);
			return;
    }
    
    const command = await admins.doc(message.guild.id).collection('commands').doc(commandName).get();
    if (!command.exists) {
      message.channel.send(`${message.author} That command was never admin restricted`);
			return;
    }
    
    await admins.doc(message.guild.id).collection('commands').doc(commandName).delete();
    
		message.channel.send(`${message.author} **${commandName}** is no longer admin restricted`);
	},
};