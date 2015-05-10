var env = process.env;

module.exports = {
  loggerName : 'dont-get-board',
  httpPort   : process.env.PORT || env.httpPort || 3000,
  session : {
    secret : process.env.DGB_PASSPORT_SECRET || 'localhostsecret'
  },
  mongoDb : {
    uri : process.env.MONGOLAB_URI || 'mongodb://localhost/dontgetboard'
  },
  mailGun : {
    key : process.env.DGB_MAILGUN_API_KEY,
    domain : process.env.DGB_MAILGUN_DOMAIN
  },
  mailChimp : {
    key : process.env.DGB_MAILCHIMP_API_KEY,
    listId : process.env.DGB_MAILCHIMP_LIST_ID
  }
};
