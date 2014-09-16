'use strict';

angular.module('flashbandWebapp').factory('FlashbandRestSrvc', function(Restangular) {
  return Restangular.withConfig(function (config) {
    config.setBaseUrl('http://localhost:1337');

    config.setDefaultHttpFields({
      withCredentials: true
    });
  });
});
