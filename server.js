// The most common status codes are 200, 302, 304, 404, and 500. Can you figure out why?

// 200 OK: This status code indicates that the request was successful, and the server has returned the requested data. It's the most common status code you'll see when browsing the web.
// 302 Found: This status code indicates that the requested resource has been temporarily moved to a new URL. The client should make a new request using the new URL provided in the response header.
// 304 Not Modified: This status code is returned when the client sends a conditional request (using the If-Modified-Since or If-None-Match headers) to the server. If the resource has not been modified since the last time the client requested it, the server will return this status code instead of the resource itself, saving bandwidth.
// 404 Not Found: This status code indicates that the requested resource was not found on the server. This can happen if the URL is incorrect or if the resource has been deleted or moved.
// 500 Internal Server Error: This status code indicates that there was an error on the server while processing the request. This can happen due to a variety of reasons, including misconfigured servers, bugs in the server software, or issues with the server's hardware or network.

/*
'use strict';

//We require the http module, which is included as part of Node's standard library.
var http = require('http');
//We decide on a port to attach our server to. We're using process.env.PORT. process.env is an object that can read from all of the environment variables in our shell
var port = process.env.PORT || 8000;


// We're creating an instance of a server, using the createServer method of http. This makes a new instance of the class Server. We're passing in a function that will get called later.
// We're telling our server to listen for any incoming HTTP Requests on the port we configured earlier. Anytime the server gets a request on that port, the function we defined on line 4 will run. Once the server attaches successfully to the port, it will run the callback function, letting you know the server has been set up properly. 
// The server can fail to attach to the port if the port is already in use. Similar to how you can't dock two boats in the same port, you can't attach two servers to the same port!
// First, take a look at the callback function - it takes two arguments - req and res. These stand for request and response, respectively.
var server = http.createServer(function(req, res) {
  var guests = ['Mary', 'Don'];
  // We're just turning the array into a string. The only thing we can really send via HTTP is a string, so we have to turn all of our data into strings before we send it.
  var guestsJSON = JSON.stringify(guests);

  // We're configuring the information we need to send back to whoever sent us a request. Really, all we're doing is building up the string of text that you saw in the "What is an HTTP Response?" section. Using the setHeader method adds a key (the name of the header) and value to the response we'll be sending out.
  res.setHeader('Content-Type', 'application/json');
  // The end method is our server's way of saying "ship it!" - it sends the response, and tells the client "there won't be more stuff coming after this".
  res.end(guestsJSON);
});

server.listen(port, function() {
  console.log('Listening on port', port);
});



//In a separate Terminal tab, send the following HTTP request to the server.

//$ http GET localhost:8000/
//  your HTTP server handles every HTTP request the same way, regardless of the request's method or path. It would be much more useful if your HTTP server could send back different HTTP responses based on the information inside the HTTP requests.
*/


/*
// Let's fix that by refactoring the server.js file with the following code.

'use strict';

var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    var guests = ['Mary', 'Don'];
    var guestsJSON = JSON.stringify(guests);

    res.setHeader('Content-Type', 'application/json');
    res.end(guestsJSON);
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});


// In a separate Terminal tab, send the following HTTP request to the server.

// $ http GET localhost:8000/
// doesn't work
// try this $ http GET localhost:8000/guests
// it workds!

*/


/*

// Try your own : The HTTP Server should handle an HTTP GET Method Request, where the URL is "/cats"
// When someone visits "localhost:8000/cats", they should get a response back that says "meow"


'use strict';

var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/cats') {
    var cats = ['meow'];
    var catsJSON = JSON.stringify(cats);

    res.setHeader('Content-Type', 'application/json');
    res.end(catsJSON);
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});

// run this is terminal
// node server.js
// http GET localhost:8000/cats

// Manually restarting a Node.js HTTP server gets old fast. Plus, it's easy to forget to do it every time you refactor your code.
// download nodemon to make it easier
// download globabally
// $ npm install -g nodemon

// Terminate the existing server with Ctrl + C, but this time run it with the nodemon command.
// $ nodemon server.js
*/



/*
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(guestsJSON);
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});


//Now, save the server.js file and add the following data to the guests.json file.

// $ echo '["Mary", "Don"]' > guests.json
// Send the following HTTP request to the server.

// $ http GET localhost:8000/guests

// Right now, your HTTP server can only send back all the records from the database. It would be much more useful if your HTTP server could send back individual records as well.

// Let's fix that by refactoring the server.js file with the following code.

*/


'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(guestsJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/guests/0') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      var guests = JSON.parse(guestsJSON);
      var guestJSON = JSON.stringify(guests[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(guestJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/guests/1') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      var guests = JSON.parse(guestsJSON);
      var guestJSON = JSON.stringify(guests[1]);

      res.setHeader('Content-Type', 'application/json');
      res.end(guestJSON);
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});


//$ http GET localhost:8000/guests
// now try this;
//$ http GET localhost:8000/guests/0
//$ http GET localhost:8000/guests/1



