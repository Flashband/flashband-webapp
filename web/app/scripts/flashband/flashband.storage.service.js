'use strict';

angular.module('flashbandWebapp').service("FlashbandStorageSrvc", function ($cookieStore) {
  var domain = 'flshbnd.strg.';

  return {
    set: function (key, data) {
      return $cookieStore.put(domain.concat(key), data);
    },

    get: function (key) {
      return $cookieStore.get(domain.concat(key));
    }
  };
});
