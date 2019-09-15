import { customReponses } from '../../firebaseConfig';
import { Message } from 'discord.js';

module.exports = {
	name: 'get',
  description: 'retrieve a custom response',
  syntax: 'responseName',
	async execute(message: Message, args: string[]) {
    const dbResponses = await customReponses.doc(message.guild.id).get();
    const responses = dbResponses.data().responses;
    if (!responses.some(response => response.trigger == args[0])) {
      message.channel.send(`${message.author} that is not a valid trigger.`)
    }

    let botResponse;
    for (const [index, response] of responses.entries()) {
      if (response.trigger != args[0]) continue;
      botResponse = responses[index].response;
      break;
    }

    message.channel.send(`${botResponse}`);
	},
};