'use strict';

// Setup
var Hapi = require('hapi');
var hapiConfig = require('./config/hapi');
var server = new Hapi.Server(8080, 'localhost', hapiConfig);

// Models
var User = require('./models/user');

// Token
var secretKey = 'kjsdfa92jefw003fj209jf293';

server.pack.register(require('hapi-auth-jsonwebtoken'), function() {
  server.auth.strategy('jwt', 'jwt', { key: secretKey });

  // Routes
  server.route([{
    path: '/api/users',
    method: 'POST',
    config: { auth: false },
    handler: function(request, reply) {
      User.forge(request.payload)
      .save()
      .then(function(u) {
        reply(u);
      })
      .catch(function(err) {
        console.log(err);
        reply(err);
      });
    }
  }]);
});

server.on('request', function(request, event, tags) {
  if (tags.pathData) {
    console.log('Logging pathData: ' + request.params.data);
  }
});

server.start(function() {
  console.log('Hapi server started @' , server.info.uri);
});
