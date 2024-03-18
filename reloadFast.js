const puppeteer = require('puppeteer');

const url = "https://beta.boomerang.trade/opp";

let counter = 0;
let profitNum = 1.2;

async function getText() {
    // Define the function to perform all operations
    const performOperations = async (page) => {
        if (counter === 0) {
            console.log("Entered beta.boomerang.trade/opp");
        } else {
            console.log("Refreshed page");
        }

        await page.reload();
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
                profitableGroups.push(groupedTexts[i]);
            }
        }

        if (profitableGroups.length > 0) {
            console.log(profitableGroups);
        } else {
            console.log(`No trading pair above ${profitNum}% profit...`);
        }
    };

    // Start the operations
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await performOperations(page);

    // Set interval to refresh the page and perform operations
    setInterval(async () => {
        await performOperations(page);
    }, 15000);
}

getText();