import { Message } from 'discord.js'
import { progressReports } from 'firebaseConfig';
import { capitalizeFirstLetter, onlyOne, isNumber } from 'usefulFunctions';

module.exports = {
	name: 'changeDay',
	description: 'change day set for progress reports',
	async execute(message: Message, args: string[]) {
    let guildID: string, dayOfWeek: string;
    if (message.guild) {
      guildID = message.guild.id;
      dayOfWeek = args[0];
      //if bot can delete the message, delete it
      if (message.deletable) message.delete();
    } else {
      guildID = args[0];
      dayOfWeek = args[1];
    }


    //if no first argument or not a valid day
    const days = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ]
		if (!isNumber(guildID) || !onlyOne(days, day => day.includes(dayOfWeek.toLowerCase()))) {
			message.author.send(`That command must have the syntax: \n \`changeDay(serverID, dayOfWeek)\` or \`changeDay(dayOfWeek)\` when used in a server.`);
			return;
    }

    try {
      const guild = await progressReports.doc(guildID).get();
      if (!guild.exists) throw `Guild ID of ${guildID} is not a valid ID`
      const profile = await progressReports.doc(guildID).collection('members').doc(message.author.id).get();
      if (!profile.exists) throw `User of ${message.author.id} is not in Guild of ${guildID}`

      let dayToSet = '';
      //loop through days and set the day to the proper full spelling instead of dayOfWeek
      for (const day of days) {
        if (!day.includes(dayOfWeek.toLowerCase())) continue;
        dayToSet = capitalizeFirstLetter(day);
      }
      await progressReports.doc(guildID).collection('members').doc(message.author.id).set(
        { day: dayToSet },
        { merge: true }
      );
      message.author.send(`Your reminder day for the server **${guild.data().name}** has been set to \`${dayToSet}\``);
    } catch (err) {
      console.log(err)
      message.author.send(`${guildID} is either not a valid server ID or not a server you are set up in.`);
    }

	},
};