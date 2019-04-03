const cheerio = require('cheerio');

const checkAda = (url, error, response, html, $) => {
	if (!error) {
		// Finally, we'll define the variables we're going to capture
		let title;
		const json = {
			url: url,
			title: '',
			numberOfLinks: 0,
			missingLinkTitle: 0,
			missingLinkText: 0,
			numberOfImages: 0,
			missingImagesAlt: 0,
			numberOfVideo: 0,
			missingVideoAlt: 0,
			errors: {}
		};

		// Functions
		// GETS ELEMENTS THAT NEED TO BE CHECKED
		const getPageTitle = () => {
			if (
				$('head title').text() == undefined ||
				$('head title').text() == null ||
				$('head title').text().length == 0
			) {
				console.log('Page Title is Missing');
			} else {
				title = $('head title').text();
			}
			json.title = title;
		};
		const getNumOfLinks = () => {
			numberOfLinks = $('a').length;
			json.numberOfLinks = numberOfLinks;
		};
		const getNumOfImages = () => {
			numberOfImages = $('img').length;
			json.numberOfImages = numberOfImages;
        };
		const getNumOfVideo = () => {
			numberOfVideo = $('video').length;
			json.numberOfVideo = numberOfVideo;
        };
        
		// Checks Elements For ADA Issues
		const checkLinks = () => {
			if (json.numberOfLinks !== 0) {
				// console.log("We Have Links That Need Checking...");
				let i = 0;

				$('a').filter((index) => {
					const data = $('a')[index];
					// console.log(data.text())
					const title = data.attribs.title;
					let linkText;
					if (!data.children[0].data){
					    linkText = 'undefined'
					} else {
					    linkText = data.children[0].data
					}

					if (!title || title == 'undefined') {
						missingLinkTitle = i++;
					}
					// Fix link text
					// if (!linkText||linkText=='undefined') {
					//     missingLinkText = i++;
					// }
				});
				json.missingLinkTitle = missingLinkTitle;
				// json.missingLinkText = missingLinkText;
			}
		};
		const checkImages = () => {
			if (json.numberOfImages !== 0) {
				// console.log("We Have Links That Need Checking...");
				let i = 0;
				$('img').filter((index) => {
					const data = $('img')[index];
					const alt = data.attribs.alt;
					if (!alt || alt == 'undefined') {
						missingImagesAlt = i++;
					}
				});
				json.missingImagesAlt = missingImagesAlt;
			}
		};
		const checkVideos = () => {
			if (json.numberOfVideo !== 0) {
				// console.log("We Have Links That Need Checking...");
				let i = 0;
				$('video').filter((index) => {
					const data = $('video')[index];
					const alt = data.attribs.alt;
					if (!alt || alt == 'undefined') {
						missingVideoAlt = i++;
					}
				});
				json.missingVideoAlt = missingVideoAlt;
			}
		};

		// init project
		getPageTitle();
		getNumOfLinks();
		getNumOfImages();
		getNumOfVideo();
		checkLinks();
		checkImages();
		checkVideos();

		return json;
	}
};

module.exports = checkAda;
