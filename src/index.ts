import { Client } from 'discord.js';
import getCommands from './utils/getCommands';
import { parseAndRun } from './utils/run';
const { token } = require('./config.json');
// const { setAdminFile } = require('./usefulFunctions.js');
// const reminder = require('./reminder.js');

// Yes, we are exporting from index. It's weird, I know.
export const client = new Client();
export const commands = getCommands();

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);

	//idk man, trying to advertise a bit.
	await client.user.setActivity('my code', { type: 'STREAMING', url: 'https://www.twitch.tv/emnudge' });

	// setAdminFile();
	// reminder(client);
});

client.on('message', async (message) => {
	await parseAndRun(message);
});

client.on('error', console.error);

//DISCORD LOGIN NOT INCLUDED IN THIS GIT
//GIT YOUR OWN (sorry, bad pun, my bad)
client.login(token);
