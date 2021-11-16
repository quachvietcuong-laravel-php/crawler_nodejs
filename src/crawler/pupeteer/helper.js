const configs = require('../../../configs');
const UserAgent = require('user-agents')
const userAgent = new UserAgent({ deviceCategory: 'desktop' });
const createFloder = require('../../helper/createFloder');

const puppeteerArgs = {
    headless: true, // false is open chromium, true is not open
    ignoreDefaultArgs: [
        '--disable-extensions'
    ],
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--disable-dev-profile',
    ],
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
    puppeteerArgs,
    capture,
    setting,
}