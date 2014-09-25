'use strict';

angular.module('flashbandWebapp').factory('FlashbandRestSrvc', function(Restangular, FlashbandSessionSrvc) {
  return Restangular.withConfig(function (config) {
    config.setBaseUrl('http://localhost:1337');
    config.setDefaultHeaders({'Accept': 'application/json'});
    config.setDefaultHeaders({'Authorization': 'Token token='.concat(FlashbandSessionSrvc.getToken())});
  });
});
