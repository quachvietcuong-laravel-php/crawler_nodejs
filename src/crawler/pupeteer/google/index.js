const cheerio = require('cheerio');
const configs = require('../../../../configs');
const createFloder = require('../../../helper/createFloder');
const {
    capture,
} = require('../helper');

async function getDataGoogle(page, keyURL, keyword, classData, path) {
    try {
        await page.click('[name=q]');
        await page.keyboard.type(keyword);
        await page.keyboard.press('Enter');
        await page.waitForSelector(classData)

        let name = path + keyword;
        await capture(path, `${name}_desktop.png`, page);

        const content = await page.content();
        const $ = cheerio.load(content);

        let links = [];

        $(classData).each((index, element) => {
            let href = $(element).find('a').attr('href');
            if (!href || href.includes(keyURL)) {
                return true;
            };
            let name = $(element).find('h3.LC20lb').text();

            let description = $(element).find('.VwiC3b span').text();

            links.push({
                name: name,
                href: href,
                description: description,
            });
        });

        try {
            await capture(path, `${name}_mobile.png`, page, 411, 736);
            await page.close();

        } catch (error) {
            console.log(error);
            await page.close();
            return [];
        }

        return links;

    } catch (err) {
        console.log(err);
        await page.close();
        return [];
    }
}

module.exports = getDataGoogle;