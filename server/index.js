'use strict';

// Setup
var Hapi = require('hapi');
var hapiConfig = require('./config/hapi');
var server = new Hapi.Server(process.env.PORT, process.env.HOST, hapiConfig);

// Models
var User = require('./models/user');

// Token
var secretKey = 'kjsdfa92jefw003fj209jf293';

var validateToken = function(token, decodedToken, cb) {
  console.log('Runing validation...');
  console.log('Token: ', token);
  console.log('Decoded token: ', decodedToken);

  User.forge({fid: decodedToken.fid})
  .fetch({require: true})
  .then(function(user) {
    return cb(null, true, user);
  })
  .catch(function() {
    return cb(null, false);
  });
};

server.pack.register(require('hapi-auth-jsonwebtoken'), function() {
  server.auth.strategy('jwt', 'jwt', { key: secretKey, validateFunc: validateToken });

  // Routes
  server.route([{
    path: '/api/users',
    method: 'POST',
    config: { auth: false },
    handler: function(request, reply) {
      User.forge(request.payload)
      .save()
      .then(function(u) {
        reply(u.parse(u.attributes));
      })
      .catch(function(err) {
        reply(err);
      });
    }
  }, {
    path: '/api/current_user',
    method: 'GET',
    config: { auth: 'jwt' },
    handler: function(request, reply) {
      var creds = request.auth.credentials;
      var userProfile = {
        fid: creds.get('fid'),
        email: creds.get('email'),
        first_name: creds.get('firstName'),
        last_name: creds.get('lastName'),
        gender: creds.get('gender')
      };

      reply(userProfile);
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
