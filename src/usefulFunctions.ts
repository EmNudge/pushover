import { promisify } from 'util';
import fs from 'fs';
import { admins } from './firebaseConfig.js';

//captializes the first letter in a string. Turns 'hello how are you' into 'Hello how are you'
function capitalizeFirstLetter(word) {
    return word.substring(0, 1).toUpperCase() + word.slice(1);
}

const isNumber = (str: string) => Number.isFinite(Number(str)) && str.length;

async function setAdminFile() {
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);
    const obj = await readFile('./admins.json');
    const adminObj = JSON.parse(String(obj));

    const servers = await admins.get();
    for (const server of servers.docs) {
        adminObj[server.id] = { members: { users: {}, roles: {} }, commands: {} };
        //add users to admin object in members key
        const users = await admins.doc(server.id).collection('users').get();
        for (const user of users.docs) {
            adminObj[server.id].members.users[user.id] = user.data().name;
        }
        //add roles to admin object in members key
        const roles = await admins.doc(server.id).collection('roles').get();
        for (const role of roles.docs) {
            adminObj[server.id].members.roles[role.id] = role.data().name;
        }
        //add commands to admin object
        const commands = await admins.doc(server.id).collection('commands').get();
        for (const command of commands.docs) {
            adminObj[server.id].commands[command.id] = {
                description: command.data().description,
                syntax: command.data().syntax
            }
        }
    }

    await writeFile('./admins.json', JSON.stringify(adminObj));
}

export {
    capitalizeFirstLetter,
    isNumber,
    setAdminFile
}