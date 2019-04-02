const { customReponses } = require('../../firebaseConfig.js');

const mongoose = require('mongoose');
const Response = require('../../models/response');

module.exports = {
	name: 'set',
  description: 'create a custom response',
  syntax: 'responseName, custom response message',
	async execute(message, args, client) {
    console.log(args)

    const userResponse = args.slice(1).join(', ');
    if (!userResponse.length) {
      message.channel.send(`${message.author} The response cannot be empty. \`CR.delete()\` can be used to remove triggers`);
      return;
    }

    const previousResponse = await Response.findOne({ trigger: args[0] });
    if (previousResponse) {
      await Response.updateOne({ trigger: args[0] }, { trigger: args[0], reply: args[1] });
      await message.reply(
        `Overwrote old reply to trigger \`${args[0]}\` of \`${previousResponse.reply}\` with ${args[1]}`
      );
      return;
    }

    try {
      const response = new Response({ _id: mongoose.Types.ObjectId(), trigger: args[0], reply: args[1] })
      await response.save()
    } catch(err) {
      console.log(err)
    }
    message.reply(`successfully did stuff`)
	},
};