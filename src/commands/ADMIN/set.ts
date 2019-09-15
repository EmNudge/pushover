import { admins } from "../../firebaseConfig.js";
import { Message } from 'discord.js';
import getCommands from '../../utils/getCommands';

module.exports = {
	name: 'set',
  description: 'set admin restriction on a command',
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

    const { description, syntax } = commands.get(commandName);
    
    await admins.doc(message.guild.id).collection('commands').doc(commandName).set({
      description,
      syntax
    });
    
		message.channel.send(`${message.author} **${commandName}** has been set to be admin restricted`);
	},
};