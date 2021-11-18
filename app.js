const mysql = require('./src/mysql/index');
const { runCron } = require('./src/cronjob');


(async() => {
    mysql.connect((err) => {
        if (err) throw err;
        console.log("MySQL is Connected!");
    });
    runCron();
})();