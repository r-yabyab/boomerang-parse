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


    // $(
    //     "#div1"
    // ).each((i, e) => {
    //     console.log(e + "test")
    // })

    console.log($("#root > div > div.bg-\\[\\#0e1424\\].font-bricolagegrotesques > nav > div.w-\\[70\\%\\].lg\\:text-\\[12\\.5px\\].\\32 xl\\:text-\\[15\\.5px\\].flex.items-center"))
    // console.log($("#div1 > div > div:nth-child(1) > div"))

    // "#div1 > div > div:nth-child(1) > div > div.border.border-gray-700.py-1.rounded-b-3xl.flex.items-center.justify-center"
    // document.querySelector("#div1 > div > div:nth-child(1) > div > div.border.border-gray-700.py-1.rounded-b-3xl.flex.items-center.justify-center > p"
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to initiate the scraping
scrapeWebpage();