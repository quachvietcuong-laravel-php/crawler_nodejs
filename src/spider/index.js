const mysql = require('../mysql/index');
const { queueCrawlerInSearchEngine } = require('../queue/index');
const crawler = require('../crawler/pupeteer/index')

queueCrawlerInSearchEngine.process(async(job, done) => {
    await crawler(job.data.data);
    done();
});

const crawlerInSearchEngine = async() => {
    let options = {
        priority: 1,
        removeOnComplete: true,
        removeOnFail: true
    };
    let query = `
        SELECT websites.website_name, keywords.keyword_name
        FROM websites
        INNER JOIN keywords ON websites.id = keywords.website_id
    `;

    mysql.query(query, async(err, result, fields) => {
        if (err) throw err;
        for (let element of result) {
            let data = {
                data: element
            };
            await queueCrawlerInSearchEngine.add(data, options);
        }
    });
}

module.exports = {
    crawlerInSearchEngine
}