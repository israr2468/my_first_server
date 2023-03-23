// Extending Routes
// Using an if statement works for our two routes, but it doesn't scale well if we have many routes. 
// Instead, we can create a file named routes.js and use an object to define routes in a more scalable way.
// index.js 

var http   = require('http');
var routes = require('./routes');

var handleRequest = function (req, res) {
  if(routes[req.url] !== undefined) {
    routes[req.url](req, res);
  } else {
    res.end("404, no such route");
  }
};

var server = http.createServer(handleRequest);

server.listen(8000, function() {
  console.log("Listening...");
});