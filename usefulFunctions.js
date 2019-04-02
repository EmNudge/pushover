const { promisify } = require('util');
const fs = require('fs');
const Discord = require('discord.js');
const { admins } = require('./firebaseConfig.js');

//returns a discord collection of all commands
function getCommands() {
    const commandsCollection = new Discord.Collection();

    //recursive algorithm to loop through folders
    function addCommands(fileArray, folderName = '') {
        for (const fileName of fileArray) {
            if (fileName.includes('.') && !fileName.endsWith('.js')) continue;

            if (fileName.endsWith('.js')) {
                const command = require('./commands/' + folderName + fileName);
                commandsCollection.set(folderName.split('/').join('.') + command.name, command);
                continue;
            }

            //recursively call if it's a folder
            addCommands(
                fs.readdirSync('./commands/' + fileName),
                folderName + fileName + '/'
            );
        }
    }
    addCommands(fs.readdirSync('./commands/'));

    return commandsCollection;
}

//returns true if only one entry in the array fulfils the function.
//returns false if all are false or more than one are true
function onlyOne(array, func) {
    return array.filter(func).length === 1;
}

//captializes the first letter in a string. Turns 'hello how are you' into 'Hello how are you'
function capitalizeFirstLetter(word) {
    return word.substring(0, 1).toUpperCase() + word.slice(1);
}

//checks if the string is a number and contains no string values
function isNumber(string) {
    return /^\d+$/.test(string);
}

async function setAdminFile() {
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);
    const obj = await readFile('./admins.json');
    const adminObj = JSON.parse(obj);

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

//function to return an array of objects with the highest value
function getMax(arrOfObjs, property) {
    const highestVal = Math.max(...arrOfObjs.map(obj => obj[property]));
    return arrOfObjs.filter(obj => obj[property] === highestVal);
}

module.exports = {
    capitalizeFirstLetter,
    onlyOne,
    isNumber,
    getCommands,
    setAdminFile,
    getMax
}