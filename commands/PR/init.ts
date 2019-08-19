const { progressReports } = require("../../firebaseConfig.js");

module.exports = {
	name: 'init',
	description: 'sets up DB for Progress Reports',
	syntax: '[server name]',
	async execute(message, args, client) {
		const { name, id } = message.guild;
		const nameToSet = args[0].length ? args.join(' ') : name;

		await progressReports.doc(id).set({
			name: nameToSet,
			week: 1,
			lastUpdated: Date()
		});
		
		message.channel.send(`${message.author} This server has been initialized for Progress Reports with the name of **${nameToSet}**`);
	},
};