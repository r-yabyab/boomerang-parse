const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');
const xpath = require('xpath');
const dom = require('@xmldom/xmldom').DOMParser;

// const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";
// const url = "https://beta.boomerang.trade/opp";
const url = "https://rainbowdarkness.com";
// const url = "https://www.last.fm/user/TruffleDucky";


const agent = new https.Agent({
    rejectUnauthorized: false,
  });

async function scrapeData() {
    try {
      // Fetch HTML of the page we want to scrape
      const { data } = await axios.get(url, { httpsAgent: agent },);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data);
      // Select all the list items in plainlist class
    //   const listItems = $(".div-col");
      // const listItems = $("#mantle_skin");
      // const listItems1 = $(`#root > div:nth-child(2) > div.overflow-x-clip > div > div.min-h-\[100vh\].flex.flex-col.bg-zinc-100.bg-gradient-to-b.from-blue-800.to-transparent.justify-center > div.text-zinc-100.tracking-wide.font-light.text-2xl.z-10.max-md\:mb-\[0px\].mb-\[60px\]`);
  
      const listItems = $('div:not([class])')
      //   const listItems = ".pt-4"
      // Stores data for all countries
      // Use .each method to loop through the li we selected
    //   listItems.each((idx, el) => {
    //     // Object holding data for each country/jurisdiction
    //     const country = 
    //     { 
    //         name: "", 
    //         // iso3: "" 
    //     };
    //     // Select the text content of a and span elements
    //     // Store the textcontent in the above object
    //     // country.name = $(el).children("div").text();
    //     // country.iso3 = $(el).children("p").text();
    //     // console.log($(el).children("div").text());
    //     console.log($(el).text());
    //     // Populate countries array with country data
    //     countries.push(country);
    //   });
      console.log(data)

      // Logs countries array to the console
    //   console.log(countries);
      // Write countries array in countries.json file
    //   fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log("Successfully written data to file");
    //   });
    } catch (err) {
      console.error(err);
    }
  }
  // Invoke the above function
  scrapeData();