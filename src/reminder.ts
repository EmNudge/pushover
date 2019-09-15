const cron = require("node-cron");
import { progressReports } from "./firebaseConfig.js";

function reminder(client) {
    //called so that it will be run on startup
    sendMsgs(client);

    //on the 0th minute of the 0th hour every day, send the messages
    cron.schedule('0 0 * * *', () => sendMsgs(client), { timezone: "America/New_York" });
}

async function sendMsgs(client) {
    const servers = await progressReports.get();
    for (const server of servers.docs) {
        //checking to see if it has been a week and add 1 to the week counter if so
        const datePortions = server.data().lastUpdated.split(' ');
        datePortions[2] = parseInt(datePortions[2]) + 7;
        const hasBeenAWeek = new Date(datePortions.join(' ')).getDate() < new Date().getDate();
        if (hasBeenAWeek) {
            await progressReports.doc(server.id).set({
                week: server.data().week + 1
            }, { merge: true })
        }

        //get members from the server
        const members = await progressReports.doc(server.id).collection('members').get();
        for (const member of members.docs) {
            //if it isn't the day to remind the user about progress reports, continue to next person
            const isDayToRemind = member.data().day.includes(Date().split(' ')[0]);
            if (!isDayToRemind) {
                if (member.data().reminded) {
                    await progressReports.doc(server.id).collection('members').doc(member.id).set({ 
                        reminded: false 
                    }, { merge: true });
                }    
                continue;
            } else if (member.data().reminded) {
                continue;
            }

            const userToMessage = await client.fetchUser(member.id);
            userToMessage.send(`It's ${member.data().day}!\nSend a progress report to the server of **${server.data().name}** with the id of **${server.id}** by using the command \`PR.send(serverID[, message/number])\``);

            //let the DB know that we've reminded them for today
            await progressReports.doc(server.id).collection('members').doc(member.id).set({ reminded: true }, { merge: true });
        }
    }

    console.log('-----------------');
    console.log('Reminders have been sent out for the day with the date of');
    console.log(Date());
    console.log('-----------------');
}

module.exports = reminder;