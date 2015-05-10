var env = process.env;

module.exports = {
  httpPort   : process.env.PORT || env.httpPort || 3000
};
