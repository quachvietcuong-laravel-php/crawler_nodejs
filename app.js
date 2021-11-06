const cheerio = require('cheerio');
const puppeteer = require('puppeteer-extra');
const UserAgent = require('random-useragent');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin())


function randomUserAgent() { 
    return UserAgent.getRandom((user) => {
        return parseFloat(user.browserVersion) >= 20;
    });
}

async function crawler(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            ignoreDefaultArgs: [
                '--disable-extensions'
            ],
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox', 
                '--ignore-certificate-errors', 
                '--start-fullscreen', 
                '--disable-dev-profile', 
            ],
        });

    } catch (err) {
        console.log("Could not create a browser : ", err);
        return [];
    }

    let page = await browser.newPage();

    await page.emulateTimezone('Asia/Ho_Chi_Minh');
    await page.setDefaultNavigationTimeout(0);
   
    try {
        await page.goto(url, { 
            waitUntil: 'networkidle2' 
        });

    } catch (error) {
        await page.close();
        await browser.close();
        return [];
    }

    await page.setUserAgent(randomUserAgent());    
    await page.waitForTimeout(1000);
    await page.screenshot({ 
        path: 'fullpage.png',
        fullPage: true,
    });
    
    const content = await page.content();
    const $ = cheerio.load(content);

    let links = [];
        
    $('.tF2Cxc').each((index, element) => {
        let href = $(element).find('a').attr('href');
        let name = $(element).find('h3.LC20lb').text();

        let description = $(element).find('.VwiC3b span').text();

        links.push({
            name: name,
            href: href,
            description: description,
        })
    })

    try {
        await page.close();
        await browser.close();

    } catch (error) {
        console.log(error);
        return [];
    }

    return links;
}

(async () => {
    let data = await crawler('https://www.google.com/search?q=laravel&btnK=T%C3%ACm+tr%C3%AAn+Google&sxsrf=AOaemvK7k4H9LOFap9opyCJCp5qKX8g2lw%3A1635857534325&source=hp&ei=fjSBYZ-dEYHKmAXq7pjQAw&iflsig=ALs-wAMAAAAAYYFCjqGg1dll1XJpF57RMlijCpm7yssJ');
    console.log(data);
})();