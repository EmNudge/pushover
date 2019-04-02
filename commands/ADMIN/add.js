const { admins } = require("../../firebaseConfig.js");

module.exports = {
	name: 'add',
  description: 'make a user or group admin',
  syntax: '@user @role ...[, adminGroupIfPossible]',
	async execute(message, args, client) {
		if (!args[0].length || (!message.mentions.users && message.mentions.roles)) {
			message.channel.send(`${message.author} that command must have the syntax: \n \`admin(\@user \@role \@user...[, adminGroupIfPossible])\``);
			return;
		}

    //separating DB commits to functions to emit a message once all are added
		async function addRoles() {
			//loop through mentioned roles and add role to DB or specific users if 2nd param is 'true'
			message.mentions.roles.map(async role => {
				if (args[1] === 'true') {
          role.members.map(async user => {
            await admins.doc(message.guild.id).collection('users').doc(user.id).set({
              name: user.user.tag
            });
          })
					return
        }
        
        await admins.doc(message.guild.id).collection('roles').doc(role.id).set({
          name: role.name
        });
	
			});
    }
    
    async function addUsers() {
      //loop through mentioned singular users and add them to DB
      message.mentions.users.map(async user => {
        await admins.doc(message.guild.id).collection('users').doc(user.id).set({
          name: user.tag
        })
      })
    }
    
    await Promise.all([addUsers(), addRoles()].map(
      promise => promise.catch(err => console.error(err))
    ));
    
		message.channel.send(`${message.author} All users added to DB as administrators`);
	},
};