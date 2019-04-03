const axios = require('axios');
const express = require('express');
const router = express.Router();
const request = require('request');

// @route GET api/auth/test
// @desc TESTS AUTH ROUTE
// @access Public
router.get('/test', (req, res) => {
	res.json({
		msg: 'Api Test'
	});
});

// @route POST moiscrape/scrape
// @desc SCRAPES WEBPAGE AND CHECKS FOR ADA ISSUES
// @access Public
router.post('/scrape', (req, res) => {
	const { url } = req.body;
	res.json({
		msg: 'Moia Scrape',
		url: url
	});
	// Begins Scraping
	require('../src/MoiCrawler')(url);
});

module.exports = router;
