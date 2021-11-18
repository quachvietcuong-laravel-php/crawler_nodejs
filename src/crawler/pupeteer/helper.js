const configs = require('../../../configs');
const UserAgent = require('user-agents')
const userAgent = new UserAgent({ deviceCategory: 'desktop' });
const createFloder = require('../../helper/createFloder');
const puppeteer = require('puppeteer-extra');
// const pluginProxy = require('puppeteer-extra-plugin-proxy');
// const getProxyDetail = require('../../helper/getProxyDetail');


// const ProxyDetail = getProxyDetail();
// puppeteer.use(pluginProxy({
//     address: ProxyDetail.address,
//     port: ProxyDetail.port,
//     credentials: {
//         username: configs.http.proxy_username,
//         password: configs.http.proxy_password
//     }
// }));

const puppeteerArgs = {
    headless: true, // false is open chromium, true is not open (true is better performance)
    ignoreDefaultArgs: [
        '--disable-extensions'
    ],
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--disable-dev-profile',
        '--disable-web-security',
    ],
}

async function startBrowser() {
    let browser;
    try {
        browser = await puppeteer.launch(puppeteerArgs);
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
        return null;
    }
    return browser;
}

async function setting(browser) {
    let page = await browser.newPage();

    await page.emulateTimezone(configs.timezone);
    await page.setUserAgent(userAgent.toString());

    return page;
}

async function capture(path, name, page, width = null, height = null) {
    try {
        await createFloder(path);
        let check = true;
        if (width && height) {
            width = parseInt(width);
            height = parseInt(height);

            if (Number.isInteger(width) && Number.isInteger(height)) {
                await page.setViewport({
                    width: width,
                    height: height,
                    isMobile: true,
                });
            } else {
                check = false;
            }
        }

        if (check) {
            await page.screenshot({
                path: name,
                fullPage: true,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    startBrowser,
    puppeteerArgs,
    capture,
    setting,
}