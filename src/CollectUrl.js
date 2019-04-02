const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const CollectUrl = ($) =>{
    console.log('Gathering Links')
    var allRelativeLinks = [];
    var allAbsoluteLinks = [];

    var relativeLinks = $("a[href^='/']");
    relativeLinks.each(function () {
        allRelativeLinks.push($(this).attr('href'));

    });

    var absoluteLinks = $("a[href^='http']");
    absoluteLinks.each(function () {
        allAbsoluteLinks.push($(this).attr('href'));
    });

    console.log("Found " + allRelativeLinks.length + " relative links");
    console.log("Found " + allAbsoluteLinks.length + " absolute links");
}

module.exports = CollectUrl;