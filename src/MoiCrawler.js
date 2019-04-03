const request = require('request');
const cheerio = require('cheerio');
var URL = require('url-parse');
const fs = require('fs')

const MoiCrawler = (start_url) => {
	console.log('Project Init');

	const START_URL = start_url;

	let numPagesVisited = 0;
	const pagesVisited = {};
	const pagesToVisit = [];
	const adaReport = [];

	const url = new URL(START_URL);
	const baseURL = url.protocol + '//' + url.hostname;

	pagesToVisit.push(START_URL);

	const CollectUrl = ($) => {
		console.log('Gathering Links');
		//Internal Links
		var relativeLinks = $("a[href^='/']");
		relativeLinks.each(function() {
			pagesToVisit.push(baseURL + $(this).attr('href'));
		});

		// var absoluteLinks = $("a[href^='http']");
		// absoluteLinks.each(function() {
		//         pagesToVisit.push($(this).attr('href'));
		//     });

		console.log('Found ' + relativeLinks.length + ' Relative Links');
		// console.log('Found ' + absoluteLinks.length + ' absolute links');
	};

	const visitPage = (url, callback) => {
		//adds to page list
		pagesVisited[url] = true;
		numPagesVisited++;

		// Make Request
		let currentPage = url;
		console.log(`Current Page: ${currentPage}`);

		request(url, (error, res, html) => {
			// Check status
			console.log(`Status Code: ${res.statusCode}`);
			if (res.statusCode !== 200) {
				callback();
			}
			// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
			const $ = cheerio.load(html);
			// Perform ADA Check
			const adaData = require('./adaCheck')(url, error, res, html, $);

			adaReport.push(adaData);
			CollectUrl($);
			callback();
		});
    };
    
    const createJsonFile = (adaReport) => {
        fs.writeFile('.temp/adaReport.json', JSON.stringify(adaReport, null, 2), function (err) {
            
            console.log('File successfully written! - Check your project directory for the output.json file');

        })
    }

	const crawl = () => {
		if (pagesToVisit == 0) {
			console.log('Reached Max Limit of Number of Pages to Visit.', `Total of ${adaReport.length} page(s)`);
			adaReport['Total Pages Reviewed'] = adaReport.length;
			const totalPages = adaReport['Total Pages Reviewed'];
			adaReport.push(totalPages);
			// Removes Duplicate Review Total
			adaReport.pop();
            // creates json file
            createJsonFile(adaReport)
			return;
		}
		const nextPage = pagesToVisit.pop();
		if (nextPage in pagesVisited) {
			// Already Visited
			crawl();
		} else {
			// New Page
			visitPage(nextPage, crawl);
		}
	};
	crawl();
};

module.exports = MoiCrawler;
