// Setup
var Hapi = require("hapi");
var hapiConfig = require('./config/hapi');
var server = new Hapi.Server(8080, "localhost", hapiConfig);
var path = require('path');

// Models
var User = require('./models/user');
var Photo = require('./models/photo');
var Like = require('./models/like');

server.route([{
  path: "/",
  method: "GET",
  handler: function(request, reply) {
    return reply.view("index");
  }
}]);

server.on("request", function(request, event, tags) {
  if (tags.pathData) {
    console.log("Logging pathData: " + request.params.data);
  }
});

module.exports = server;
