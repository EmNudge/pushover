const Discord = require('discord.js');
const { token } = require("./config.json");
const { getCommands, getCommandArgs } = require('./usefulFunctions.js');

const client = new Discord.Client();
client.commands = getCommands();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //idk man, trying to advertise a bit.
  client.user.setActivity("my code", { type: "STREAMING", url: "https://www.twitch.tv/emnudge" });
});

client.on('message', async message => {
    const args = getCommandArgs(message.content, client.commands);
    //if command isn't a function or has invalid syntax, ignore
    if (typeof args !== "object") return;

    const funcName = message.content.slice(0, message.content.indexOf('('));
    try {
        client.commands.get(funcName).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('Whoops! Error occurred!');
    }
});

client.on('error', console.error);

client.login(token);