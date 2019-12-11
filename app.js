const verify = require('./index')
var fs = require("fs");

var jsonData = fs.readFileSync("./websites.json", "utf8");

verify.status(jsonData)