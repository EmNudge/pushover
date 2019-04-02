const { customReponses } = require('../../firebaseConfig.js');

module.exports = {
	name: 'set',
  description: 'create a custom response',
  syntax: 'responseName, custom response message',
	async execute(message, args, client) {
    const userResponse = args.slice(1).join(', ');
    if (!userResponse.length) {
      message.channel.send(`${message.author} The response cannot be empty. \`CR.delete()\` can be used to remove triggers`);
      return;
    }

    let responses = [];
    const dbResponses = await customReponses.doc(message.guild.id).get();
    if (dbResponses.data().responses) responses = dbResponses.data().responses;

    //checking if the trigger already exists
    let previousResponse;
    const reponseExists = responses.some(response => response.trigger == args[0]);
    if (reponseExists) {
      for (const [index, response] of responses.entries()) {
        if (response.trigger != args[0]) continue;
        previousResponse = responses[index].response;
        responses[index].response = userResponse;
        break;
      }
    } else {
      responses.push({
        trigger: args[0],
        response: userResponse
      });
    }

    await customReponses.doc(message.guild.id).set({ responses });

    message.channel.send(`The trigger **${args[0]}** has been ${reponseExists ? `overwritten from:\n \`${previousResponse} \`\nand` : ``} set to the response of: \n\`${userResponse} \``);
	},
};