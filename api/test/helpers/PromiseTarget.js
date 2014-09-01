module.exports = function(deferred) {
  var promise = deferred.promise;

  promise.fail(function(reason) {
    expect.fail(reason);
  });

  return promise;
};
