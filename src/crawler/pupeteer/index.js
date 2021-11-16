const puppeteer = require('puppeteer-extra');
const getDataGoogle = require('./google/index');
const getDataYahoo = require('./yahoo/index');
const getCurrentTime = require('../../helper/getCurrentTime');
const configs = require('../../../configs');
const sleep = require('../../helper/sleep')
const {
    startBrowser,
    setting,
} = require('./helper');


async function crawler(dataURL) {
    let search = configs.search_url;
    let result = [];

    let website_name = dataURL.website_name;
    let keyword = dataURL.keyword_name;

    for (let url of search) {
        let data, browser = await startBrowser();

        if (browser) {
            await sleep(1000);
            let page = await setting(browser);

            try {
                await page.goto(url, {
                    waitUntil: 'networkidle2'
                });
                await page.waitForTimeout(1000);
                data = await checkURL(url, page, website_name, keyword);

            } catch (error) {
                await page.close();
                data = [];
            }

            if (data.length > 0) {
                result = result.concat(data);
            }

            await browser.close();
        }
    }

    return result;
}

async function checkURL(url, page, website_name, keyword) {
    let classData, path, data;

    let time = getCurrentTime();
    let timePath = `${time.year}/${time.month}/${time.day}/`;

    switch (url) {
        case 'https://www.google.com/':
            classData = '.tF2Cxc';

            path = configs.dir_app.image_path + 'google/' + timePath;
            data = await getDataGoogle(page, website_name, keyword, classData, path);
            break;

        case 'https://www.yahoo.co.jp/':
            classData = '.sw-CardBase .sw-Card section';

            path = configs.dir_app.image_path + 'yahoo/' + timePath;
            data = await getDataYahoo(page, website_name, keyword, classData, path);
            break;

        default:
            data = [];
            break;
    }

    return (data) ? data : [];
}

module.exports = crawler;