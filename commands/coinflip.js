module.exports = {
	name: 'coinFlip',
	description: 'reacts with a check or X mark',
	syntax: '',
	async execute(message, args, client) {
		Math.random() <= .5 ? message.react("✅") : message.react("❎");
	},
};