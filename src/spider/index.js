const mysql = require('../mysql/index');
const crawler = require('../crawler/pupeteer/index');
const { differentDimensionalArray } = require('../helper/differentDimensionalArray');
const {
    selectAndGetArrayData,
} = require('../mysql/helper/index');


const searchEngineCrawler = async(data) => {
    let table_name = 'illegal';
    let condition = `WHERE keyword_id = ${data.id}`;
    let columns = [
        'url', 'search_site', 'keyword_id'
    ];

    selectAndGetArrayData(table_name, condition, columns, async(old_data) => {
        let value_increase, value_decrease,
            new_data = await crawler(data);

        switch (new_data.length) {
            case 0:
                value_increase = [];
                break;

            default:
                value_increase = differentDimensionalArray(old_data, new_data);
                value_decrease = differentDimensionalArray(new_data, old_data);
                break;
        }

        if (value_increase.length > 0) {
            let query = `
                INSERT INTO illegal (url, search_site, keyword_id) 
                VALUES ?
            `;
            mysql.query(query, [value_increase], (error, result) => {
                if (error) throw error;
                console.log(`${data.url} - ${data.name}: \n+ ilegal increase: ${result.affectedRows}\n+ ilegal decrease: ${value_decrease.length}\n`);
            });

        } else {
            console.log(`${data.url} - ${data.name}: \n+ ilegal increase: ${value_increase.length}\n+ ilegal decrease: ${value_decrease.length}\n`);
        }
    });
}

module.exports = {
    searchEngineCrawler
}