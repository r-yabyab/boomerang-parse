const puppeteer = require('puppeteer');

// const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";
const url = "https://beta.boomerang.trade/opp";
// const url = "https://rainbowdarkness.com";
// const url = "https://www.last.fm/user/TruffleDucky";
const browserWS = "ws://127.0.0.1:9222/devtools/browser/d516b9f2-71eb-435a-97e7-038edbbbe6a4";

async function main() {
    try {
        
        // const browser = await puppeteer.launch({ headless: true });
        const browser = await puppeteer.connect({ browserWSEndpoint: browserWS})
        const page = await browser.newPage();
        // page.setUserAgent

        await page.goto(url)
        await page.waitForSelector('#div1 > div > div')

        const els = await page.$$('#div1 > div > div')

        for (const el of els) {
            const text = await el.$eval('p', p => p.innerText)
            console.log('text', text);
        }

        const texts = await page.$$eval('#div1 > div > div p', paragraphs => {
            return paragraphs.map(p => p.innerText);
        });

        console.log(texts)

        console.log(els.length)

    } catch (e) {
        console.log('error', e)
    }
}

main();