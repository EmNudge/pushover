const { progressReports } = require("../../firebaseConfig.js");

module.exports = {
	name: 'addUser',
  description: 'add use to progress reports',
  syntax: '@user @user ...[, @role @role ...]',
	async execute(message, args, client) {
    //if no first argument or no user mentions and no IDs, return
		if (!args[0].length || (!message.mentions.users && !/^\d+$/.args[0].split(' ')[0])) {
			message.channel.send(`${message.author} that command must have the syntax: \n \`addUserToPR(\@user \@user ...[, \@role \@role ...])\` or \`addUserToPR(userID userID ...[, roleID roleID ...])\``);
			return;
    }

    const users = [],
          roles = [],
          rolesList = [];
    
    //checks if there is a first parameter and if it's a number
    if (args[0].split(' ')[0] && /^\d+$/.test(args[0].split(' ')[0])) {
      try {
        for (const role of args[1].split(' ')) {
          const roleClass = await  message.guild.roles.get(role);
          roles.push({
            name: roleClass.name,
            id: roleClass.id,
          })
          rolesList.push(roleClass)
        }
        for (const user of args[0].split(' ')) {
          const userClass = await client.fetchUser(user);
          await progressReports.doc(message.guild.id).collection('members').doc(userClass.id).set({
            name: userClass.tag,
            day: 'Monday',
            roles
          });
          users.push(userClass);
        }
      } catch(err) {
        message.channel.send(`${message.author} one of those IDs were not valid. Please check it again.`);
        console.log(err);
        return;
      }
    }

    //go through all roles and turn it into an array of objects
    message.mentions.roles.map(role => {
      roles.push({
        name: role.name,
        id: role.id
      });
      rolesList.push(role);
    });

    //loop through mentioned users and add them to DB with their roles and with their snowflake as the id
    message.mentions.users.map(async user => {
      users.push(user)
      await progressReports.doc(message.guild.id).collection('members').doc(user.id).set({
        name: user.tag,
        day: 'Monday',
        roles
      });
    });
		
    message.channel.send(`${message.author} Added ${users.map(user => `*${user.username + '#' + user.discriminator}*`).join(', ')} to DB with ${rolesList.length ? 'the role(s) of ' + rolesList.map(role => `*${role.name}*`).join(', ') : 'no roles attached'}`);
    for (const user of users) {
      user.send(`Hey! I am Pushover, a bot built for team organization.\n\nYou have just been added to a \`Progress Reports\` list for the server **${message.guild}**.\nYou will be asked to provide reports of progress each week on Monday. You can change this day by using the \`changeDay(serverID, dayOfWeek)\` command. \n\nAll commands sent via PMs will require a server ID. The server ID for ${message.guild} is **${message.guild.id}**.`);
    }
	},
};