// server.js
// This is where your node app starts
//load the 'express' module which makes writing webservers easy
const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');

//load the quotes JSON
const quotes = require("./quotes.json");
const quotesById = require("./quotes-with-id.json");

const lodash = require("lodash");

var cors = require('cors');
const { request, response } = require("express");
app.use(cors());
app.use(bodyParser.json());
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
});
//   /quotes/random     - Should return ONE quote (json)
/* app.get("/quotes/random", (request, response) => {
  response.json(pickFromArray(quotes));
}) */

app.get("/quotes/random", (request, response) => {
  const quote = lodash.sample(quotes);
  response.json(quote);
});

//GET quote by id
app.get("/quotes/:id", (request, response) => {
  let id = request.params.id;
  id = Number(id);
  const quote = quotesById.filter((el) =>  el.id === id);
  response.send(quote);
});
//POST quote
app.post("/quotes/addquote", (request, response) => {
  const data = request.body;
  data.id = quotesById[quotesById.length - 1].id +1;

  let newQuoteJson = quotesById;
  newQuoteJson.push(data);

  fs.writeFile("./quotes-with-id.json", JSON.stringify(newQuoteJson),() => {});

  response.send('POST your quote!');
})

//DELETE quote
app.delete("/quotes/:id", (request, response) => {
  let id = request.params.id;
  id = Number(id);

  let newQuoteJson = quotesById;
  let quote = newQuoteJson.filter((el) => el.id ===id);
  console.log(quote);
  const index = newQuoteJson.indexOf(quote[0]);
  newQuoteJson.splice(index,1);

  fs.writeFile("./quotes-with-id.json", JSON.stringify(newQuoteJson),() => {});

  response.send("DELETE a quote!");
})

//...END OF YOUR CODE
//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
app.get("/quotes/search", (request, response) => {
  let word = request.query.word;  
  response.send(findQuotesMatching(quotes, word));
});
const findQuotesMatching = (quotes, searchTerm) => {
return quotes.filter(elem => elem.quote.includes(searchTerm));
};

function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
//Start our server so that it listens for HTTP requests!                              
const listener = app.listen(3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});