const puppeteer = require('puppeteer');
const { KnownDevices } = require('puppeteer');

// const iPhone = KnownDevices['iPhone 6'];

const url = "https://beta.boomerang.trade/";
const browserWS = "ws://127.0.0.1:9222/devtools/browser/62dc34b0-769d-4208-8061-4b812693563d";


async function sendOrder() {
    try {
        // const browser = await puppeteer.launch({ headless: false });
        const browser = await puppeteer.connect({ browserWSEndpoint: browserWS })
        const page = await browser.newPage();
        // // await page.emulate(iPhone);

        await page.goto(url);

        // await page.waitForFunction(() => {
        //     const div = document.querySelector('your-div-selector');
        //     return div && div.getAttribute('aria-hidden') === 'true';
        // });
        await page.waitForSelector('wcm-modal');

        // const els = await page.$$('.flex.justify-center > div > div > div > div');
        setTimeout(async () => {
            const els = await page.$$('.flex.justify-between.text-white.font-bold > div');
        
            for (const el of els) {
                const text = await el.$eval('p', p => p.innerText)
                console.log('text', text)
            }

            // const selectBuySelector = await page.$$('.rounded-lg.focus:bg-gray-400.bg-gray-300.flex.justify-between.items-center.cursor-pointer')
            // const selectBuy = await selectBuySelector.$(a)
            // await selectBuy.click();
        }, 3000)

    } catch (e) {
        console.log(e.message)
    }
}


sendOrder();

// const els = await page.$$('.flex.justify-center > div > div > div > div');
