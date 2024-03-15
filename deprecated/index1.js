const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

// URL of the webpage you want to scrape
const url = "https://beta.boomerang.trade/opp";
// const url = "https://rainbowdarkness.com";

const agent = new https.Agent({
    rejectUnauthorized: false,
  });

// Function to fetch and scrape the webpage
async function scrapeWebpage() {
  try {
    // Make a GET request to the webpage
    const response = await axios.get(url, { httpsAgent: agent });

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data); 

    const listItems = $("div p");
    console.log(listItems.length);
    listItems.each(function (idx, el) {
      console.log($(el).text())
    })

    // $(
    //     "#div1"
    // ).each((i, e) => {
    //     console.log(e + "test")
    // })
    // console.log($("#root > div:nth-child(2) > div.overflow-x-clip > div > div.min-h-\\[100vh\\].flex.flex-col.bg-zinc-100.bg-gradient-to-b.from-blue-800.to-transparent.justify-center > div.text-zinc-100.tracking-wide.font-light.text-2xl.z-10.max-md\\:mb-\\[0px\\].mb-\\[60px\\]"))

    // "#div1 > div > div:nth-child(1) > div > div.border.border-gray-700.py-1.rounded-b-3xl.flex.items-center.justify-center"
    // document.querySelector("#div1 > div > div:nth-child(1) > div > div.border.border-gray-700.py-1.rounded-b-3xl.flex.items-center.justify-center > p"
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to initiate the scraping
scrapeWebpage();