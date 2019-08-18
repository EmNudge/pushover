const { promisify } = require('util');
const fs = require('fs');

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

function getTypes(params: string) {
	const types  = [];
	
	let startStr = 0,
		parentheses = 0,
		quotes = 0;

	for (const [index, char] of params.split('').entries()) {
        //if the argument is over and there's no odd amount of closures
        const isSeparater: boolean = char === ',' || index === params.length - 1;
        const evenQuotes: boolean = quotes % 2 === 0 || char === '"' || char === "'";
        const evenParentheses: boolean = parentheses % 2 === 0 || char === ')';

		if (isSeparater && evenQuotes && evenParentheses) {
            //use whole rest of string if we're up to the last character (to include index + 1)
            let value = params.slice(startStr, index);
            if (index === params.length - 1) value = params.slice(startStr);
            //removes spaces at start and end of argument
            value = value.replace(/^\s+|\s+$/g, '');
            
			let type = 'string';
			if (value.split(' ')[0].includes('(') && value.slice(-1) === ')') type = 'function';
            if (/^\d+$/.test(value)) type = 'number';

			types.push({ type, value: value.replace(/^"|^'|'$|"$/g, '') });
			startStr = index + 1;
			continue;
        } else if (index === params.length - 1) {
            //if there's an invalid amount of quotes or parentheses
            console.log(`quotes: ${quotes} parentheses: ${parentheses}`)
			return 'INVALID SYNTAX';
        }

		if (char === '(' || char === ')') parentheses++;
		if (char === '"' || char === "'") quotes++;
    }

	return types;
}

function typesAreValid(types, syntax): boolean {
    //if types returned as an error
    if (typeof types === 'string') return false;

    //don't allow more or fewer commands than syntax allows for
    const maxParams = syntax.length > 0 ? syntax.split(',').length : 0;
    const minParams = syntax.split(',').length - (syntax.includes('[') ? syntax.split('[').length + 1 : 1);
    if (maxParams < types.length) return false;
    if (minParams > types.length) return false;

    //if types don't match require type
    for (const [index, argument] of syntax.split(',').entries()) {
        if (argument.includes('ID') && types[index].type !== 'number') return false;
        if (argument.includes('(') && types[index].type !== 'function') return false;
    }

    return true;
}

async function runCommand(message, client) {
    //if it's not in command syntax, ignore
    if (!message.content.split(' ')[0].includes('(') || !message.content.endsWith(')')) return;

    //get everything before the first '(' and use as the command name
    const funcName = message.content.slice(0, message.content.indexOf('('));
    //if the command name isn't valid, ignore
    if (!client.commands.has(funcName)) return;

    //get everything between first '(' and last ')' and pass it to getTypes()
    const args: any = getTypes(message.content.slice(message.content.indexOf('(') + 1, -1));

    //check if the command is admin restricted and user is an admin
    const isAdmin = await userIsAdmin(message);
	const isAdminCmd = await isAdminCommand(funcName, message.guild.id);
    //restrict if user is not an admin and it's an admin command
	if (!isAdmin && isAdminCmd) {
		message.channel.send(message.author + ' Unfortunately that command is admin restricted and you are not listed as an admin');
		return;
    }

    //check if the types from the arguments match the requird syntax
    const { syntax, bypassCheck } = client.commands.get(funcName);
    if (!typesAreValid(args, syntax) && !bypassCheck) {
        message.reply(`Invalid syntax. Please use \`${funcName}(${syntax})\``)
        return;
    }
    
    //if all tests pass, try to run the command
    try {
		client.commands.get(funcName).execute(message, args.map(arg => arg.value), client);
	} catch (error) {
		console.error(error);
		message.reply('Whoops! Error occurred!');
	}
}

module.exports = runCommand;