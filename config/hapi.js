module.exports = {
  views: {
    engines: {
      jade: require("jade")
    },
    path: "./app/views"
  },
  debug: {
    request: ["received"]
  }
};
