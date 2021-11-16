const puppeteer = require('puppeteer-extra');
const getDataGoogle = require('./google/index');
const getDataYahoo = require('./yahoo/index');
const getCurrentTime = require('../../helper/getCurrentTime');
const configs = require('../../../configs');
const sleep = require('../../helper/sleep')
const {
    puppeteerArgs,
    setting,
} = require('./helper');


async function crawler(dataURL) {
    let search = configs.search_url;
    let result = [];

    for (let url of search) {
        let browser;
        try {
            browser = await puppeteer.launch({...puppeteerArgs });
            await sleep(1000);
            let data = await crawlerDetails(browser, url, dataURL.website_name, dataURL.keyword_name);

            if (data.length > 0) {
                result = result.concat(data);
            }

            await browser.close();

        } catch (err) {
            console.log("Could not create a browser : ", err);
        }
    }

    return result;
}

async function crawlerDetails(browser, url, keyURL, keyword) {
    let page = await setting(browser);

    try {
        await page.goto(url, {
            waitUntil: 'networkidle2'
        });

    } catch (error) {
        await page.close();
        return [];
    }

    return await getData(url, page, keyURL, keyword);
}

async function getData(url, page, keyURL, keyword) {
    await page.waitForTimeout(1000);

    let classData, data, path;
    let time = getCurrentTime();
    let timePath = `${time.year}/${time.month}/${time.day}/`;

    if (url.includes('google')) {
        classData = '.tF2Cxc';

        path = configs.dir_app.image_path + 'google/' + timePath;
        data = await getDataGoogle(page, keyURL, keyword, classData, path);
    }

    if (url.includes('yahoo')) {
        classData = '.sw-CardBase .sw-Card section';

        path = configs.dir_app.image_path + 'yahoo/' + timePath;
        data = await getDataYahoo(page, keyURL, keyword, classData, path);
    }

    return (data) ? data : [];
}

module.exports = crawler;