const { admins } = require("../../firebaseConfig.js");

module.exports = {
	name: 'init',
  description: 'initialize admin DB',
  syntax: '[name]',
	async execute(message, args, client) {
    const name = args[0].length ? args[0] : message.guild.name;
    await admins.doc(message.guild.id).set({ name });
    
		message.channel.send(`${message.author} admin DB initialized with name of **${name}**`);
	},
};