module.exports = {
  views: {
    engines: {
      jade: require("jade")
    },
    path: "./views"
  },
  debug: {
    request: ["received"]
  }
};
