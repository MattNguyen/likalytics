var path = require('path');

module.exports = {
  views: {
    engines: {
      html: require("handlebars")
    },
    path: path.resolve(__dirname, '..', 'server/views')
  },
  debug: {
    request: ["received"]
  }
};
