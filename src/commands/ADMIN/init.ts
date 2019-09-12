import { admins } from 'firebaseConfig.js';
import { Message } from 'discord.js';

module.exports = {
	name: 'init',
  description: 'initialize admin DB',
  syntax: '[name]',
	async execute(message: Message, args: string[]) {
    const name = args[0].length ? args[0] : message.guild.name;
    await admins.doc(message.guild.id).set({ name });

    //add all admin commands
    await admins.doc(message.guild.id).collection('commands').doc('ADMIN.add').set({
      description: 'make a user or group admin',
      syntax: '@user @role ...[, adminGroupIfPossible]'
    })
    await admins.doc(message.guild.id).collection('commands').doc('ADMIN.init').set({
      description: 'initialize admin DB',
      syntax: '[name]'
    })
    await admins.doc(message.guild.id).collection('commands').doc('ADMIN.remove').set({
      description: 'make a user or group no longer admin',
      syntax: '@user @role ...'
    })
    await admins.doc(message.guild.id).collection('commands').doc('ADMIN.set').set({
      description: 'set admin restriction on a command',
      syntax: 'command'
    })
    await admins.doc(message.guild.id).collection('commands').doc('ADMIN.showCommands').set({
      description: 'displays all commands restricted to admins',
      syntax: ''
    })
    await admins.doc(message.guild.id).collection('commands').doc('ADMIN.showMembers').set({
      description: 'displays all admins',
      syntax: ''
    })
    await admins.doc(message.guild.id).collection('commands').doc('ADMIN.unset').set({
      description: 'remove admin restriction on a command',
      syntax: 'command'
    })
    
		message.channel.send(`${message.author} admin DB initialized with name of **${name}**`);
	},
};