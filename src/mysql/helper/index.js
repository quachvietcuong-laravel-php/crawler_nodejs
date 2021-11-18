const mysql = require('../index');

function selectAndGetArrayData(table_name, condition, columns, callback) {
    try {
        if (columns.length <= 0) callback([]);
        let query = `SELECT * FROM ${table_name} ${condition}`;

        mysql.query(query, (error, result) => {
            let data = [];

            if (error) {
                console.log(error);
                callback([]);
            }

            result.forEach((element, index) => {
                let column = []
                for (let i = 0; i < columns.length; i++) {
                    column.push(element[columns[i]])
                }
                if (column.length > 0) {
                    data.push(column);
                }
            });

            callback(data);
        });

    } catch (err) {
        console.log(err);
        callback([]);
    }
}

module.exports = {
    selectAndGetArrayData,
}