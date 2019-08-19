const { promisify } = require('util');
import * as fs from 'fs';

async function userIsAdmin(message) {
    const isOwner = message.channel.type === 'dm' || message.author.id === message.ownerID;
    if (isOwner) return true;
    //we know it's not a dm and the author isn't an owner

    const readFile = promisify(fs.readFile);
    const obj = await readFile('./admins.json');
    const adminObj = JSON.parse(obj);
    const { roles, users } = adminObj[message.guild.id].members;
    for (const role in roles) {
        if (message.member.roles.has(role)) return true;
    }
    for (const user in users) {
        if (message.author.id === user) return true;
    }
}

async function isAdminCommand(command, serverID) {
    const readFile = promisify(fs.readFile);
    const obj = await readFile('./admins.json');
    const adminObj = JSON.parse(obj);

    if (!adminObj[serverID]) return command.includes('ADMIN');
    return !!adminObj[serverID] && !!adminObj[serverID].commands[command];
}