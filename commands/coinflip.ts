export default {
	name: 'coinFlip',
	description: 'reacts with a check or X mark',
	syntax: '',
	async execute(message) {
		Math.random() <= .5 ? message.react("✅") : message.react("❎");
	},
};