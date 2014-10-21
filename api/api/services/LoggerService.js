'use strict';

var winston = require('winston');
var MongoDB = require('winston-mongodb').MongoDB;

var loggerService = new (winston.Logger)({
  transports: [
    new (MongoDB)({ db: 'devFlashLogger', nativeParser: true, safe: true })
    //new (winston.transports.Console)({ json: false, timestamp: true }),
    //new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
  ],

  exceptionHandlers: [
    new (MongoDB)({ db: 'devFlashLogger', nativeParser: true, safe: true })
    //new (winston.transports.Console)({ json: false, timestamp: true }),
    //new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
  ],

  exitOnError: false
});

module.exports = {
  logRequest: function(req, res, callback) {
    var withToken = false;

    if (Boolean(req.headers.authorization)) {
      var spliter = req.headers.authorization.split('Token token=');
      if (spliter.length === 2) { withToken = spliter[1]; }
    }

    loggerService.info('request', {
      user: req.user,
      token: withToken,
      route: req.route,
      query: req.query,
      params: req.body,
      headers: req.headers,
      options: req.options,
      response: res.falshbandResponse
    });

    if (callback) callback();
  }
};
