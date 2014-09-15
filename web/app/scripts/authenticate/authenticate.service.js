'use strict';

angular.module('flashbandWebapp').service('AuthenticateSrvc', function (Restangular, FlashbandRest) {
  FlashbandRest.addElementTransformer('authenticate', false, function (authenticate) {
    authenticate.addRestangularMethod('login', 'post', '');
    return authenticate;
  });

  return FlashbandRest.one('authenticate');
});
