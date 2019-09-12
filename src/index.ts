import { Client } from 'discord.js'
import getCommands from './utils/getCommands'
import runCommand from './utils/run'
const { token } = require("./config.json");
// const { setAdminFile } = require('./usefulFunctions.js');
// const reminder = require('./reminder.js');

const client = new Client();
const commands = getCommands();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //idk man, trying to advertise a bit.
  client.user.setActivity("my code", { type: "STREAMING", url: "https://www.twitch.tv/emnudge" });

	// setAdminFile();
  // reminder(client);
});

client.on('message', async message => {
	await runCommand(message, client, commands);
});

client.on('error', console.error);

//DISCORD LOGIN NOT INCLUDED IN THIS GIT
//GIT YOUR OWN (sorry, bad pun, my bad)
client.login(token);