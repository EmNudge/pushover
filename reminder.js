const { progressReports } = require("./firebaseConfig.js");

function reminder() {

    //02/14/19 9AM UTC = 1550134800
    //02/15/19 9AM UTC = 1550221200
    //24 hour period difference = 86400
}

//gets closest upcoming unix time corresponding to the day of the week
//if the time has passed, even if it's on the same day, it will return a day from the next week
function getUnixTimeStamp(dayOfWeek = 'monday') {
    //turn text into number for use in if statement
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let dayNum;
    for (const [index, day] of days.entries()) {
        if (day.includes(dayOfWeek.toLowerCase())) dayNum = index;
    }

    const currentDate = new Date();
    const dateToGet = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        dayOfWeek: currentDate.getDay(),
        dayOfMonth: currentDate.getDate(),
    }

    //dayOfMonth - dayOfWeek = sunday this week. Add on the dayNum and you get this week's day
    let dayOfMonth = dateToGet.dayOfMonth - dateToGet.dayOfWeek + dayNum
    //if the goal day is less than the current day when converted to ms, the day happens next week
    if (new Date(dateToGet.year, dateToGet.month, dayOfMonth).valueOf() < Date.now()) {
        dayOfMonth += 7
    }

    return new Date(dateToGet.year, dateToGet.month, dayOfMonth).valueOf()
}

module.exports = reminder;