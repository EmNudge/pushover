import { Client } from 'discord.js';
import getCommands from './utils/getCommands';
import { parseAndRun } from './utils/run';

// Yes, we are exporting from index. It's weird, I know.
export const client = new Client();
export const commands = getCommands();

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`);

	await client.user.setActivity('type: help()', { type: 'PLAYING' });
});

client.on('message', async (message) => {
	await parseAndRun(message);
});

client.on('error', console.error);

// DISCORD LOGIN NOT INCLUDED IN THIS GIT
// GIT YOUR OWN (sorry, bad pun, my bad)
client.login(/* token here */);
