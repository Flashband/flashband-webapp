'use strict';

angular.module('flashbandWebapp').factory('FlashbandRestFact', function FlashbandRestFact (Restangular, FlashbandSessionFact, flashbandApiServer) {
  return {
    getConnection: function getConnection () {
      return Restangular.withConfig(function (config) {
        config.setBaseUrl(flashbandApiServer);
        config.setDefaultHeaders({'Accept': 'application/json'});
        config.setDefaultHeaders({'Authorization': 'Token token='.concat(FlashbandSessionFact.getToken())});
      });
    }
  };
});
