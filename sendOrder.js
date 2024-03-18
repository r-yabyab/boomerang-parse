const puppeteer = require('puppeteer');
const { KnownDevices } = require('puppeteer');

// const iPhone = KnownDevices['iPhone 6'];

const url = "https://beta.boomerang.trade/";
const url2 = "https://rainbowdarkness.com";


async function sendOrder() {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // // await page.emulate(iPhone);
    // // page.setUserAgent

    await page.goto(url);

    const page2 = await browser.newPage();
    await page2.goto(url2)
    // await page.waitForSelector('.flex.justify-between.text-white.font-bold > div');

    // const els = await page.$$('.flex.justify-between.text-white.font-bold > div');

    // for (const el of els) {
    //     const text = await el.$eval('div', p => p.innerText)
    //     console.log('text', text)

    // }

    //     console.log(els.length)
    
    // await browser.close();

    let tabs = await browser.pages();
    for (let tab of tabs) {
        let title = await tab.title()
        console.log(title)
    }
    console.log(tabs)

}


sendOrder();