const puppeteer = require('puppeteer');

async function loadPage() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://tip.cc/');
    await browser.close();
}

async function runConcurrently(numPages) {
    const promises = [];
    for (let i = 0; i < numPages; i++) {
        promises.push(loadPage());
    }
    await Promise.all(promises);
}

const numPages = 30;
runConcurrently(numPages)
    .then(() => console.log('All pages loaded successfully'))
    .catch(err => console.error('Error loading pages:', err));