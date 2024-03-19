const puppeteer = require('puppeteer');

const url = "https://beta.boomerang.trade/opp";

let counter = 0;
let profitNum = 1;

async function getText(startTime) {

    if (counter === 0) {
        console.log("Entered beta.boomerang.trade/opp")
    } else {
        console.log()
        console.log("Refreshed page")
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    // page.setUserAgent

    await page.goto(url);
    await page.waitForSelector('#div1 > div > div');

    const texts = await page.$$eval('#div1 > div > div p', paragraphs => {
        return paragraphs.map(p => p.innerText);
    });

    const groupedTexts = [];
    const profitableGroups = [];

    // parses profit text
    for (let i = 2; i < texts.length; i += 3) {
        texts[i] = parseFloat(texts[i].match(/\d+\.\d+/)[0]);
    }

    // groups
    for (let i = 0; i < texts.length; i += 3) {
        groupedTexts.push({
            Buy: texts[i],
            Sell: texts[i + 1],
            Profit: texts[i + 2]
        });
    }

    for (let i =0; i<groupedTexts.length; i++) {
        if (groupedTexts[i].Profit > profitNum) {
            profitableGroups.push(groupedTexts[i])
        }
        // console.log(groupedTexts[i].Profit)
    }

    console.log(groupedTexts);

    if (profitableGroups.length > 0) {
        console.log(profitableGroups)
    } else {
        console.log(`No trading pair above ${profitNum}% profit...`)
    }
    
    const elapsedTime = Math.round((Date.now() - startTime) / 1000);
    console.log(`Elapsed time: ${elapsedTime} seconds`);
    counter++;
    
    await browser.close();

}

let startTime = Date.now();
let nextStartTime = startTime;

getText(startTime);

// Refresh every 20 seconds
setInterval(() => {
    startTime = Date.now();
    nextStartTime = startTime;

    nextStartTime = getText(nextStartTime);
}, 12000);