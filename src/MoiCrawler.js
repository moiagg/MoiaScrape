const request = require('request');
const cheerio = require('cheerio');
var URL = require('url-parse');



const MoiCrawler = (start_url) => {
    console.log('project init')
    
    const START_URL = start_url;
    
    const pagesVisited = {};
    let numPagesVisited = 0;
    const pagesToVisit = [];
    const url = new URL(START_URL)
    const baseURL = url.protocol + "//"+url.hostname

    pagesToVisit.push(START_URL)
    
    
    const CollectUrl = ($) => {
        console.log('Gathering Links');
        
        var relativeLinks = $("a[href^='/']");
        relativeLinks.each(function() {
            pagesToVisit.push(baseURL + $(this).attr('href'));
        });
        
        // var absoluteLinks = $("a[href^='http']");
        // absoluteLinks.each(function() {
            //     pagesToVisit.push($(this).attr('href'));
            // });
            
            console.log('Found ' + relativeLinks.length + ' relative links');
            // console.log('Found ' + allAbsoluteLinks.length + ' absolute links');
        };
        
        const visitPage =(url, callback)=>{
            //adds to page list
            pagesVisited[url]=true
            numPagesVisited++
            
            // Make Request
            let currentPage = url
            console.log(`Current Page: ${currentPage}`)
            
            request(url,(error,res,html)=>{
                // Check status
                console.log(`Status Code: ${res.statusCode}`)
                if(res.statusCode!==200){
                    callback();
                }
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                const $ = cheerio.load(html);
                // Perform ADA Check
                require('./adaCheck')(url, error, res, html,$)
                CollectUrl($)
                callback()
            })
        }
        
        const crawl = () => {
            if (pagesToVisit == 0) {
                console.log("Reached max limit of number of pages to visit.");
                return;
            }
            const nextPage = pagesToVisit.pop()
            if (nextPage in pagesVisited) {
                // Already Visited
                crawl()
            } else {
                // New Page
                visitPage(nextPage, crawl)
            }
        }
        crawl()
    }
    
    
    module.exports = MoiCrawler;
    