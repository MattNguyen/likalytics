// Setup
var Hapi = require("hapi");
var hapiConfig = require('./config/hapi');
var server = new Hapi.Server(8080, "localhost", hapiConfig);

// Models
var User = require('./app/models/user');
var Photo = require('./app/models/photo');
var Like = require('./app/models/like');

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
        var profile = request.auth.credentials.profile;
        var userProfile = {
          fid: profile.id,
          email: profile.email.toLowerCase(),
          first_name: profile.raw.first_name,
          last_name: profile.raw.last_name,
          gender: profile.raw.gender
        };

        new User(userProfile).fetch({require: true})
          .then(function(user) {
            console.log(user.toJSON());
          })
          .catch(User.NotFoundError, function() {
            new User(userProfile).save().then(function(user) {
              console.log(user.toJSON());
            });
          });

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
