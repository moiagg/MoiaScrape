const axios = require("axios");
const express = require("express");
const router = express.Router();
const request = require("request");



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

  // request(url, (error, response, html) => {
    require('../src/MoiCrawler')(url)
    // First we'll check to make sure no errors occurred when making the request
    // require('../src/adaCheck')(url,error,response,html)
    // });
  });
  
  module.exports = router;
  