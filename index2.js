const puppeteer = require('puppeteer');

// const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";
const url = "https://beta.boomerang.trade/opp";
// const url = "https://rainbowdarkness.com";
// const url = "https://www.last.fm/user/TruffleDucky";

async function main() {
    try {
        
        const browser = await puppeteer.launch({ headless: true });
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