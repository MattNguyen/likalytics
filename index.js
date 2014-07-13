// Setup
var Hapi = require("hapi");
var dbConfig = require('./config/database');
var hapiConfig = require('./config/hapi');
var knex = require('knex')(dbConfig.knex);
var bookshelf = require('bookshelf')(knex);
var server = new Hapi.Server(8080, "localhost", hapiConfig);

// Exports
module.exports.bookshelf = bookshelf;

// Models
var User = require('./app/models/user')(bookshelf);
var Photo = require('./app/models/photo')(bookshelf);
var Like = require('./app/models/like')(bookshelf);

// Server
server.pack.register(require("bell"), function(err) {
  server.auth.strategy("facebook", "bell", {
    provider: "facebook",
    password: "cookie_encryption_password",
    clientId: "304928876346637",
    clientSecret: "98493d11700388648a985e14e686cd96",
    isSecure: false
  });

  server.route({
    method: ["GET", "POST"],
    path: "/login",
    config: {
      auth: "facebook",
      handler: function(request, reply) {
        return reply.redirect("/");
      }
    }
  });
});

server.route({
  path: "/",
  method: "GET",
  handler: function(request, reply) {
    return reply.view("index");
  }
});

server.on("request", function(request, event, tags) {
  if (tags.pathData) {
    console.log("Logging pathData: " + request.params.data);
  }
});

server.start(function() {
  console.log("Hapi server started @" , server.info.uri);
});
