'use strict';

const http = require('http');
const port = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world this is my first server');
});

server.listen(port, function() {
  console.log('Listening on port', port);
});



