'use strict';

angular.module('flashbandWebapp').factory("FlashbandStorageFact", function FlashbandStorageFact ($cookieStore) {
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
