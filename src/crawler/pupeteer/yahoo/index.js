const cheerio = require('cheerio');
const {
    capture,
} = require('../helper');


async function getDataYahoo(page, dataURL, classData, path) {
    try {
        let keyword = dataURL.name;

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
            let url = $(element).find('.sw-Card__section--header .sw-Card__headerSpace .sw-Card__title a').attr('href');
            if (!url || url.includes(dataURL.url)) {
                return true;
            };

            let search_site = 'yahoo';
            let keyword_id = dataURL.id;

            links.push([
                url, search_site, keyword_id
            ]);
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

module.exports = getDataYahoo;