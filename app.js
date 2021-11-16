const configs = require('./configs');
const mysql = require('./src/mysql/index');
const { runCron } = require('./src/schedule');


(async() => {
    mysql.connect((err) => {
        if (err) throw err;
        console.log("MySQL is Connected!");
    });
    runCron();
})();