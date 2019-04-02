const { customReponses } = require('../../firebaseConfig.js');

module.exports = {
	name: 'delete',
  description: 'delete a custom response',
  syntax: 'responseName',
	async execute(message, args, client) {
    const dbResponses = await customReponses.doc(message.guild.id).get();
    const responses = dbResponses.data().responses;

    if (!responses.some(response => response.trigger == args[0]) || typeof responses == "undefined") {
      message.channel.send(`The trigger **${args[0]}** does not currently exist`);
      return;
    }

    for (const [index, response] of responses.entries()) {
      if (response.trigger != args[0]) continue;
      responses.splice(index, 1);
      break;
    }

    await customReponses.doc(message.guild.id).set({ responses });

    message.channel.send(`The trigger **${args[0]}** has been deleted`);
	},
};