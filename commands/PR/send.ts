import { Message } from 'discord.js'
import { Type } from 'utils/index'
import { progressReports } from 'firebaseConfig';
import { isNumber } from 'usefulFunctions';

module.exports = {
	name: 'send',
  description: 'send a progress reports',
  syntax: `serverID: ${Type.String} [, message/number]`,
	async execute(message: Message, args: string[]) {
    const currentDate = Date().split(' ').slice(1, 4).join(' ');
    const msgLimit = 10; //how many messages up can the user ask the bot to go
    let report = '';

		if (message.guild) { //if message sent in a server instead of DMs, error out
			message.author.send(`That command must be used here, in DMs. If you're looking for **${message.guild}**'s server ID, it is:\n**${message.guild.id}**`);
			return;
    }
		if (!args[0]) { //if no first argument, error out
			message.author.send(`That command requires a server ID with the syntax of \`PR.send(serverID[, message/number])\``);
			return;
    }

    //if the second argument isn't a number, set report as second argument
    if (!isNumber(args[1])) report = args.slice(1).join(', ');
    
    //If it is a number, but over msgLimit, reject that report
    if (isNumber(args[1]) && parseInt(args[1]) > msgLimit) {
      message.author.send(`That number is too high. Please choose a number lower than the past 10 messages.`);
			return;
    } else if (isNumber(args[1])) {
      //if number and under msgLimit, grab those messages and set their value to the report string
      const messages = await message.channel.fetchMessages({ limit: parseInt(args[1]) + 1 });
      let messageArray = messages.filter(m => m.author.id === message.author.id && m.content !== message.content).map(m => '\n' + m.content);
      messageArray.reverse();
      report = messageArray.join('');
    } else if (args.length == 1) {
      //if only serverID is present
      const messages = await message.channel.fetchMessages({ limit: msgLimit });
      
      const messageArray = [];
      for (const [index, m] of Array.from(messages.values()).entries()) {
        if (!index) continue; //ignore first index since that's the same message
        if (m.author.id !== message.author.id) break;
        messageArray.push(m.content + '\n');
      }
      messageArray.reverse();
      report = messageArray.join('');
    }
    
    const guild = await progressReports.doc(args[0]).get();
    const profile = await progressReports.doc(args[0]).collection('members').doc(message.author.id).get();
    if (!guild.exists || !profile.exists) {
      message.author.send(`${args[0]} is either is not a valid server ID or not a server you are set up in`);
      return;
    }

    await progressReports.doc(args[0]).collection('members').doc(message.author.id).collection(`week ${guild.data().week}`).doc().set({
      shortDate: currentDate,
      longDate: Date(),
      unixDate: Date.now(),
      report
    })

    message.author.send(`You have added a progress report for the week on the server **${guild.data().name}** of:\n${report}`);
	},
};
