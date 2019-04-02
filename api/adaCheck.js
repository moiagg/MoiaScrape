const axios = require("axios");
const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");

// @route GET api/auth/test
// @desc TESTS AUTH ROUTE
// @access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Auth Works"
  });
});

router.post("/scrape", (req, res) => {
  const { url } = req.body;
  res.json({
    msg: "Moia Scrape",
    url: url
  });

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request(url, (error, response, html) => {
    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      const $ = cheerio.load(html);

      // Finally, we'll define the variables we're going to capture

      let title;
      const json = {
        title: "",
        numberOfLinks: "",
        missingLinkTitle: "",
        numberOfImages: "",
        missingImagesAlt: "",
        numberOfVideo: "",
        missingVideoAlt: ""
      };
      // Functions
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
      const checkLinks = () => {
        if (json.numberOfLinks !== 0) {
          console.log("We Have Links That Need Checking...");
          let i = 0;
          $("a").filter(index => {
            const data = $("a")[index];
            const title = data.attribs.title;
            if (!title) {
              missingLinkTitle = i++;
            }
          });
          json.missingLinkTitle = missingLinkTitle;
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
            if (alt) {
            } else {
              missingImagesAlt = i++;
            }
          });
          json.missingImagesAlt = missingImagesAlt;
        } else {
          console.log("There Are No Links On This Page...");
        }
      };
      const checkVideos = () => {
        if (json.numberOfVideo !== 0) {
          console.log("We Have Links That Need Checking...");
          let i = 0;
          $("video").filter(index => {
            const data = $("video")[index];
            const alt = data.attribs.alt;
            if (alt) {
            } else {
              missingVideoAlt = i++;
            }
          });
          json.missingVideoAlt = missingVideoAlt;
        } else {
          console.log("There Are No Links On This Page...");
        }
      };



      getPageTitle();
      getNumOfLinks();
      getNumOfImages();
      getNumOfVideo();
      checkLinks();
      checkImages();
      checkVideos();
      console.log(json);
    } else {
      console.log(error);
    }
  });
});

module.exports = router;
