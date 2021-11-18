const mysql = require('../mysql/index');
const sleep = require('../helper/sleep');
const { queueCrawlerInSearchEngine } = require('../queue/index');
const { searchEngineCrawler } = require('../spider/index');

queueCrawlerInSearchEngine.process(async(job, done) => {
    await sleep(4000);
    await searchEngineCrawler(job.data.data);
    done();
});

const crawlerInSearchEngine = async() => {
    let options = {
        priority: 1,
        removeOnComplete: true,
        removeOnFail: true
    };
    let query = `
        SELECT websites.url, keywords.name, keywords.id
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