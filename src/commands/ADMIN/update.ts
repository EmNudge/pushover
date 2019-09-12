import { promisify } from 'util';
import { admins } from 'firebaseConfig'
import { Message } from 'discord.js';
import fs from 'fs';

module.exports = {
	name: 'update',
  description: 'update admins.json file',
  syntax: '',
	async execute(message: Message) {
    //this command only updates the admin commands for this server to save on DB calls
    //it is thus not an exact copy from usefulFunctions.js

    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);
    const obj = await readFile('./admins.json');
    const adminObj = JSON.parse(String(obj));
    const serverID = message.guild.id;

    adminObj[serverID] = { members: { users: {}, roles: {} }, commands: {} };
    //add users to admin object in members key
    const users = await admins.doc(serverID).collection('users').get();
    for (const user of users.docs) {
      adminObj[serverID].members.users[user.id] = user.data().name;
    }
    //add roles to admin object in members key
    const roles = await admins.doc(serverID).collection('roles').get();
    for (const role of roles.docs) {
    adminObj[serverID].members.roles[role.id] = role.data().name;
    }
    //add commands to admin object
    const commands = await admins.doc(serverID).collection('commands').get();
    for (const command of commands.docs) {
      adminObj[serverID].commands[command.id] = {
        description: command.data().description,
        syntax: command.data().syntax
      }
    }

    await writeFile('./admins.json', JSON.stringify(adminObj));
    
		message.channel.send(`${message.author} Local DB updated`);
	},
};