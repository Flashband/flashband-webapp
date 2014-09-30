'use strict';

angular.module('flashbandWebapp').factory('FlashbandRestFact', function FlashbandRestFact (Restangular, FlashbandSessionFact) {
  return {
    getConnection: function getConnection () {
      return Restangular.withConfig(function (config) {
        config.setBaseUrl('http://localhost:1337');
        config.setDefaultHeaders({'Accept': 'application/json'});
        config.setDefaultHeaders({'Authorization': 'Token token='.concat(FlashbandSessionFact.getToken())});
      });
    }
  };
});
