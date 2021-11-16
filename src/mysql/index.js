const mysql = require('mysql');
const configs = require('../../configs');


const connection = mysql.createConnection({
    host: configs.db.host,
    user: configs.db.user,
    password: configs.db.password,
    database: configs.db.database
});

module.exports = connection;