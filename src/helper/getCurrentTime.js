const { format } = require('date-fns-tz');
const configs = require('../../configs');

function getCurrentTime() {
    let pattern = 'dd/MM/yyyy - HH:mm:ss:SSS';
    let output = format(new Date(), pattern, { timeZone: configs.timezone });

    let dateArgs = output.match(/\d{2,4}/g);

    let day = parseInt(dateArgs[0]);
    let month = parseInt(dateArgs[1]);
    let year = parseInt(dateArgs[2]);
    let hour = parseInt(dateArgs[3]);
    let minutes = parseInt(dateArgs[4]);
    let seconds = parseInt(dateArgs[5]);
    let milliseconds = parseInt(dateArgs[6]);

    return {
        time: output,
        day: day,
        month: month,
        year: year,
        hour: hour,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
    }
}

module.exports = getCurrentTime;