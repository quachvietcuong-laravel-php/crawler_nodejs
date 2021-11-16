const Queue = require('bull');
const configs = require('../../configs');


const queueCrawlerInSearchEngine = new Queue(
    'crawler_in_search_engine',
    `redis://${configs.redis.host}:${configs.redis.port}`, {
        limiter: {
            max: 10,
            duration: 1000
        }
    }
);

module.exports = {
    queueCrawlerInSearchEngine,
}