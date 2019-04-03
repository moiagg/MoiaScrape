const cheerio = require("cheerio");
const checkAda = (url, error, response, html,$) => {
    if (!error) {
        
        // Finally, we'll define the variables we're going to capture

        let title;
        const json = {
            errors: {},
            title: "",
            numberOfLinks: "",
            missingLinkTitle: "",
            missingLinkText: "",
            numberOfImages: "",
            missingImagesAlt: "",
            numberOfVideo: "",
            missingVideoAlt: ""
        };
        // Functions
        // GETS ELEMENTS THAT NEED TO BE CHECKED
        const getPageTitle = () => {
            if (
                $("head title").text() == undefined ||
                $("head title").text() == null ||
                $("head title").text().length == 0
            ) {
                console.log("Page Title is Missing");
            } else {
                title = $("head title").text();
            }
            json.title = title;
        };
        const getNumOfLinks = () => {
            numberOfLinks = $("a").length;
            json.numberOfLinks = numberOfLinks;
        };

        const getNumOfImages = () => {
            numberOfImages = $("img").length;
            json.numberOfImages = numberOfImages;
        };

        const getNumOfVideo = () => {
            numberOfVideo = $("video").length;
            json.numberOfVideo = numberOfVideo;
        };
        // Checks Elements For ADA Issues
        const checkLinks = () => {
            if (json.numberOfLinks !== 0) {
                console.log("We Have Links That Need Checking...");
                let i = 0;
                $("a").filter(index => {
                    const data = $("a")[index];
                    const title = data.attribs.title;
                    const linkText = data.children[0].data
                    if (!title || title == 'undefined') {
                        missingLinkTitle = i++;
                    }

                    if (!linkText||linkText=='undefined') {
                        missingLinkText = i++;
                    }
                });
                json.missingLinkTitle = missingLinkTitle;
                json.missingLinkText = missingLinkText;
            } else {
                console.log("There Are No Links On This Page...");
            }
        };
        const checkImages = () => {
            if (json.numberOfImages !== 0) {
                console.log("We Have Links That Need Checking...");
                let i = 0;
                $("img").filter(index => {
                    const data = $("img")[index];
                    const alt = data.attribs.alt;
                    if (!alt || alt == 'undefined') {
                        missingImagesAlt = i++;
                    }
                });
                json.missingImagesAlt = missingImagesAlt;
            } else {
                console.log("There Are No Images On This Page...");
            }
        };
        const checkVideos = () => {
            if (json.numberOfVideo !== 0) {
                console.log("We Have Links That Need Checking...");
                let i = 0;
                $("video").filter(index => {
                    const data = $("video")[index];
                    const alt = data.attribs.alt;
                    if (!altalt == 'undefined') {
                        missingVideoAlt = i++;
                    }
                });
                json.missingVideoAlt = missingVideoAlt;
            } else {
                console.log("There Are No Videos On This Page...");
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
        console.log(json);
        return json
    } else {
        console.log(error);
        return error
    }

}
module.exports = checkAda