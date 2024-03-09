const axios = require('axios');
const cheerio = require('cheerio');

// URL of the webpage you want to scrape
const url = "https://beta.boomerang.trade/opp";

// Function to fetch and scrape the webpage
async function scrapeWebpage() {
  try {
    // Make a GET request to the webpage
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data); 

    // Example: Extracting values from elements with a class of 'percentage'
    const percentageValues = [];
    $('.percentage').each((index, element) => {
      // Extract the text content and parse the number (remove % sign)
      const percentage = parseFloat($(element).text().replace('%', ''));
      percentageValues.push(percentage);
    });

    // Log the extracted values
    console.log('Percentage Values:', percentageValues);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to initiate the scraping
scrapeWebpage();