// Setup
var Hapi = require("hapi");
var hapiConfig = require('./config/hapi');
var jwt = require('jsonwebtoken');
var server = new Hapi.Server(8080, "localhost", hapiConfig);
var path = require('path');

// Models
var User = require('./models/user');
var Photo = require('./models/photo');
var Like = require('./models/like');

// Token
var secretKey = 'kjsdfa92jefw003fj209jf293';

server.pack.register(require('hapi-auth-jsonwebtoken'), function(err) {
  server.auth.strategy('jwt', 'jwt', { key: secretKey });
  server.route([{
    path: "/api/users",
    method: "POST",
    config: { auth: false },
    handler: function(request, reply) {
      var user = User.forge(request.payload);
      var token = jwt.sign(user.toJSON(), secretKey);

      user.set("session_token", token);

      user.save()
      .then(function() {
        reply({token: token});
      });
    }
  }]);
});

server.on("request", function(request, event, tags) {
  if (tags.pathData) {
    console.log("Logging pathData: " + request.params.data);
  }
});

server.start(function() {
  console.log("Hapi server started @" , server.info.uri);
});
