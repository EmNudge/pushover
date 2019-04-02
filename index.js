const Discord = require('discord.js');
const { token } = require("./config.json");
const { getCommands, setAdminFile } = require('./usefulFunctions.js');
const reminder = require('./reminder.js');
const runCommand = require('./runCommand.js');

const client = new Discord.Client();
client.commands = getCommands();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //idk man, trying to advertise a bit.
  client.user.setActivity("my code", { type: "STREAMING", url: "https://www.twitch.tv/emnudge" });

	setAdminFile();
  reminder(client);
});

client.on('message', async message => {
	await runCommand(message, client);
});

client.on('error', console.error);

//DISCORD LOGIN NOT INCLUDED IN THIS GIT
//GIT YOUR OWN (sorry, bad pun, my bad)
client.login(token);