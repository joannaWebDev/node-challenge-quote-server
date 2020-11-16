// server.js
// This is where your node app starts
//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
//load the quotes JSON
const quotes = require("./quotes.json");
const lodash = require("lodash");
var cors = require('cors');
app.use(cors());
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});
//START OF YOUR CODE...
//ENDPOINTS
//   /quotes            - Should return all quotes (json)
app.get("/quotes", (request, response) => {
  response.json(quotes);
})
//   /quotes/random     - Should return ONE quote (json)
/* app.get("/quotes/random", (request, response) => {
  response.json(pickFromArray(quotes));
}) */

app.get("/quotes/random", (request, response) => {
  const quote = lodash.sample(quotes);
  response.json(quote);
})

app.get("/quotes/search", (request, response) => {
  let word = request.query.word;  
  response.send(findQuotesMatching(quotes, word));
})
const findQuotesMatching = (quotes, searchTerm) => {
return quotes.filter(elem => elem.quote.includes(searchTerm));
}
//...END OF YOUR CODE
//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
//Start our server so that it listens for HTTP requests!                              
const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});