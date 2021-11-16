const cheerio = require('cheerio');
const {
    capture,
} = require('../helper');


async function getDataYahoo(page, keyURL, keyword, classData, path) {
    try {
        await page.click('input[name=p]');
        await page.keyboard.type(keyword);
        await page.keyboard.press('Enter');
        await page.waitForSelector(classData)

        let name = path + keyword;
        await capture(path, `${name}_desktop.png`, page);

        const content = await page.content();
        const $ = cheerio.load(content);

        let links = [];

        $(classData).each((index, element) => {
            let href = $(element).find('.sw-Card__section--header .sw-Card__headerSpace .sw-Card__title a').attr('href');
            if (!href || href.includes(keyURL)) {
                return true;
            };
            let name = $(element).find('.sw-Card__section--header .sw-Card__headerSpace .sw-Card__title a h3.sw-Card__titleMain span').text();

            let description = $(element).find('.sw-Card__section .sw-Card__space .sw-Card__floatContainer .sw-Card__summary').text();

            links.push({
                name: name,
                href: href,
                description: description,
            })
        })

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

module.exports = getDataYahoo;