import { admins } from "../../firebaseConfig.js";
import { Message } from 'discord.js';

module.exports = {
	name: 'remove',
  description: 'make a user or group no longer admin',
  syntax: '@user @role...',
	async execute(message: Message, args: string[]) {
		if (!args[0].length || (!message.mentions.users && message.mentions.roles)) {
			message.channel.send(`${message.author} that command must have the syntax: \n \`ADMIN.remove(\@user \@role \@user...)\``);
			return;
    }
   
    if (message.mentions.roles.size) {
      message.mentions.roles.map(async role => {
        const dbRole = await admins.doc(message.guild.id).collection('roles').doc(role.id).get();
        if (dbRole.exists) {
          await admins.doc(message.guild.id).collection('roles').doc(role.id).delete();
          message.channel.send(`**${dbRole.data().name}** is no longer an administrative role`);
          return;
        }
        message.channel.send(`${role} was not found to be an admin in the database`);
      });
    }
    
    if (message.mentions.users.size) {
      message.mentions.users.map(async user => {
        const dbUser = await admins.doc(message.guild.id).collection('users').doc(user.id).get();
        if (dbUser.exists) {
          await admins.doc(message.guild.id).collection('users').doc(user.id).delete();
          message.channel.send(`**${dbUser.data().name}** is no longer an admin`);
          return;
        }
        message.channel.send(`${user} was not found to be an admin in the database`);
      });
    }
	},
};