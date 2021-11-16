require('dotenv').config();

module.exports = {
    http: {
        proxies: process.env.PROXIES.split(','),
        proxy_username: process.env.PROXY_USERNAME,
        proxy_password: process.env.PROXY_PASSWORD,
        proxy_protocol: process.env.PROXY_PROTOCOL,
    },
    db: {
        host: process.env.DB_MYSQL_HOST,
        user: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASSWORD,
        database: process.env.DB_MYSQL_DATABASE,
    },
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
    },
    dir_app: {
        image_path: 'public/images/'
    },
    search_url: [
        'https://www.google.com/',
        'https://www.yahoo.co.jp/',
    ],
    schedule: parseInt(process.env.SCHEDULE_ENABLED) == 1 ? true : false,
    timezone: process.env.TIME_ZONE || 'Asia/Bangkok',
};