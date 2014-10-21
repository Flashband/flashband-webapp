'use strict';

module.exports = function (req, res, next) {
  res.on('finish', function() {
    LoggerService.logRequest(req, res);
  });

  next();
};
