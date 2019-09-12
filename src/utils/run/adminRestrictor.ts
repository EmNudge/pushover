import { promisify } from 'util';
import * as fs from 'fs';
import { Message } from 'discord.js'

async function userIsAdmin(message: Message): Promise<boolean> {
    const isOwner = message.channel.type === 'dm' || message.author.id === message.guild.ownerID;
    if (isOwner) return true;
    //we know it's not a dm and the author isn't an owner

    const readFile = promisify(fs.readFile);
    const adminObj = await readFile('./admins.json');

    const { roles, users } = adminObj[message.guild.id].members;
    for (const role in roles) {
        if (message.member.roles.has(role)) return true;
    }
    for (const user in users) {
        if (message.author.id === user) return true;
    }

    return false;
}

async function isAdminCommand(funcName: string, serverID: string): Promise<boolean> {
    const readFile = promisify(fs.readFile);
    const adminObj = await readFile('./admins.json');

    if (!adminObj[serverID]) return funcName.includes('ADMIN');
    return !!(adminObj[serverID] && adminObj[serverID].commands[funcName]);
}

async function adminRestricted(funcName: string, message: Message): Promise<boolean> {
    //check if the command is admin restricted and user is an admin
    const isAdmin = await userIsAdmin(message);
	const isAdminCmd = await isAdminCommand(funcName, message.guild.id);
    
    return !isAdmin && isAdminCmd;
}

export default adminRestricted;