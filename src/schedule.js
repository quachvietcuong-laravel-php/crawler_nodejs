const cron = require('node-cron');
const cronConfigs = require('./helper/cronConfig');
const configs = require('../configs');
const { crawlerInSearchEngine } = require('./spider/index');


const runCron = () => {
    switch (configs.schedule) {
        case true:
            // cron.schedule('0 */24 * * *', () => {
            console.log('****** running a task every 00:00 daily');
            crawlerInSearchEngine()
                // }, {...cronConfigs });
            break;

        default:
            console.log('Cron was disabled.');
            break;
    }
}

module.exports = {
    runCron
}