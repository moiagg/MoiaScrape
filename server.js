var express = require("express");
const bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== "production";
app.use(cors());
//Routes
const adaCheck = require("./api/adaCheck");
// Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
//USE ROUTES
app.use("/moiscrape", adaCheck);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
