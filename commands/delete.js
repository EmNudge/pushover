const { getCommandArgs } = require('../usefulFunctions.js');

module.exports = {
	name: 'delete',
	description: 'runs a command and deletes the user message once the command is complete',
	syntax: 'command(params)',
	async execute(message, args, client) {
		const commandToDelete = args.join(', ');
		const funcName = commandToDelete.slice(0, commandToDelete.indexOf('('));
		
		const messageArgs = getCommandArgs(commandToDelete, client.commands);
		//if command isn't a function or has invalid syntax, error
		if (typeof messageArgs !== "object") {
			message.channel.send(`That is either not a valid command or contains invalid syntax.`)
			return;
		}

		//delete the command. The entire point of this function
		if (message.deletable) {
			message.delete();
		} else {
			message.channel.send(`I do not have delete permissions.`)
			return;
		}

		try {
			client.commands.get(funcName).execute(message, messageArgs, client);
		} catch (error) {
			console.error(error);
			message.reply('Whoops! Error occurred!');
		}
	},
};