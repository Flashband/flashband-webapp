'use strict';

angular.module('flashbandWebapp').service('AuthenticateSrvc', function (Restangular, FlashbandRestSrvc) {
  FlashbandRestSrvc.addElementTransformer('authenticate', false, function (authenticate) {
    authenticate.addRestangularMethod('login', 'post', '');
    return authenticate;
  });

  return FlashbandRestSrvc.one('authenticate');
});
