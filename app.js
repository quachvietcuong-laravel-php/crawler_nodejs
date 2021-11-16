// const cheerio = require('cheerio');
// const puppeteer = require('puppeteer-extra');
// const UserAgent = require('user-agents')
// const userAgent = new UserAgent({ deviceCategory: 'desktop' });

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const configs = require('./configs');
const mysql = require('./src/mysql/index');
const { runCron } = require('./src/schedule');

// async function crawler(searchURL, dataURL) {
//     let result = [];
//     for (let url of searchURL) {
//         for (let [keyURL, valueKeyWord] of Object.entries(dataURL)) {
//             let browser;
//             try {
//                 browser = await puppeteer.launch({
//                     ignoreDefaultArgs: [
//                         '--disable-extensions'
//                     ],
//                     args: [
//                         '--no-sandbox',
//                         '--disable-setuid-sandbox',
//                         '--ignore-certificate-errors',
//                         '--disable-dev-profile',
//                     ],
//                 });

//                 for (let keyword of valueKeyWord) {
//                     await sleep(1000);
//                     let data = await crawlerDetails(browser, url, keyURL, keyword);

//                     if (data.length > 0) {
//                         result = result.concat(data);
//                     }
//                 }
//                 await browser.close();
//             } catch (err) {
//                 console.log("Could not create a browser : ", err);
//                 await browser.close();
//             }
//         }
//     }
//     return result;
// }

// async function crawlerDetails(browser, url, keyURL, keyword) {
//     let page = await browser.newPage();

//     await page.emulateTimezone('Asia/Ho_Chi_Minh');

//     try {
//         await page.goto(url, {
//             waitUntil: 'networkidle2'
//         });

//     } catch (error) {
//         await page.close();
//         return [];
//     }

//     return await getData(url, page, keyURL, keyword);
// }

// async function getData(url, page, keyURL, keyword) {
//     await page.setUserAgent(userAgent.toString());
//     await page.waitForTimeout(1000);

//     let classData, data;

//     if (url.includes('google')) {
//         classData = '.tF2Cxc';
//         data = await getDataGoogle(page, keyURL, keyword, classData);
//     }

//     if (url.includes('yahoo')) {
//         classData = '.sw-CardBase .sw-Card section';
//         data = await getDataYahoo(page, keyURL, keyword, classData);
//     }

//     return (data) ? data : [];
// }

// async function getDataYahoo(page, keyURL, keyword, classData) {
//     try {
//         let path = `yahoo_${keyword}`;

//         await page.click('input[name=p]');
//         await page.keyboard.type(keyword);
//         await page.keyboard.press('Enter');

//         await page.waitForSelector(classData)
//         await capture(page, `${path}_desktop.png`);

//         const content = await page.content();
//         const $ = cheerio.load(content);

//         let links = [];

//         $(classData).each((index, element) => {
//             let href = $(element).find('.sw-Card__section--header .sw-Card__headerSpace .sw-Card__title a').attr('href');
//             if (!href || href.includes(keyURL)) {
//                 return true;
//             };
//             let name = $(element).find('.sw-Card__section--header .sw-Card__headerSpace .sw-Card__title a h3.sw-Card__titleMain span').text();

//             let description = $(element).find('.sw-Card__section .sw-Card__space .sw-Card__floatContainer .sw-Card__summary').text();

//             links.push({
//                 name: name,
//                 href: href,
//                 description: description,
//             })
//         })

//         try {
//             await capture(page, `${path}_mobile.png`, 411, 736);
//             await page.close();

//         } catch (error) {
//             console.log(error);
//             await page.close();
//             return [];
//         }

//         return links;

//     } catch (err) {
//         console.log(err);
//         await page.close();
//         return [];
//     }
// }

// async function getDataGoogle(page, keyURL, keyword, classData) {
//     try {
//         let path = `google_${keyword}`;

//         await page.click('[name=q]');
//         await page.keyboard.type(keyword);
//         await page.keyboard.press('Enter');

//         await page.waitForSelector(classData)
//         await capture(page, `${path}_desktop.png`);

//         const content = await page.content();
//         const $ = cheerio.load(content);

//         let links = [];

//         $(classData).each((index, element) => {
//             let href = $(element).find('a').attr('href');
//             if (!href || href.includes(keyURL)) {
//                 return true;
//             };
//             let name = $(element).find('h3.LC20lb').text();

//             let description = $(element).find('.VwiC3b span').text();

//             links.push({
//                 name: name,
//                 href: href,
//                 description: description,
//             })
//         })

//         try {
//             await capture(page, `${path}_mobile.png`, 411, 736);
//             await page.close();

//         } catch (error) {
//             console.log(error);
//             await page.close();
//             return [];
//         }

//         return links;

//     } catch (err) {
//         console.log(err);
//         await page.close();
//         return [];
//     }
// }

// async function capture(page, path, width = null, height = null) {
//     let check = true;
//     if (width && height) {
//         width = parseInt(width);
//         height = parseInt(height);

//         if (Number.isInteger(width) && Number.isInteger(height)) {
//             await page.setViewport({
//                 width: width,
//                 height: height,
//                 isMobile: true,
//             });
//         } else {
//             check = false;
//         }
//     }

//     if (check) {
//         await page.screenshot({
//             path: path,
//             fullPage: true,
//         });
//     }
// }

(async() => {
    mysql.connect((err) => {
        if (err) throw err;
        console.log("MySQL is Connected!");
    });
    runCron();
    // let searchURL = [
    //     'https://www.google.com/',
    //     'https://www.yahoo.co.jp/',
    // ];
    // let dataURL = {
    //     'https://www.eposcard.co.jp/': [
    //         'エポス',
    //         'エポスカード',
    //         'えぽす',
    //         'えぽすかーど',
    //         'まるい',
    //         'マルイ',
    //         'エポス　カード',
    //         'えぽす　かーど',
    //         'マルイ　カード',
    //     ]
    // }
    // let data = await crawler(searchURL, dataURL);
    // console.log(data);
})();