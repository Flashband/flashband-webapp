'use strict';

angular.module('flashbandWebapp').factory('FlashbandSessionFact', function FlashbandSessionFact (FlashbandStorageFact) {
  var keySession = 'session';

  return {
    getUser: function () {
      return FlashbandStorageFact.get(keySession).user;
    },

    getToken: function () {
      try {
        return FlashbandStorageFact.get(keySession).token;
      } catch(e) {
        return '';
      }
    },

    clearSession: function() {
      return FlashbandStorageFact.set(keySession, null);
    },

    setSession: function(session) {
      return FlashbandStorageFact.set(keySession, session);
    },

    hasUserAuthenticated: function() {
      var logged;

      try {
        var session = FlashbandStorageFact.get(keySession);
        logged = (session && session.user && session.token);
      } catch (err) {
        logged = false;
      }

      return logged;
    }
  };
});
