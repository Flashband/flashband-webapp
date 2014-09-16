'use strict';

angular.module('flashbandWebapp').service("FlashbandSessionSrvc", function (FlashbandStorageSrvc) {
  var keySession = "session";

  return {
    getUser: function () {
      return FlashbandStorageSrvc.get(keySession).user;
    },

    getToken: function () {
      return FlashbandStorageSrvc.get(keySession).token;
    },

    clearSession: function() {
      return FlashbandStorageSrvc.set(keySession, null);
    },

    setSession: function(session) {
      return FlashbandStorageSrvc.set(keySession, session);
    },

    hasUserAuthenticated: function() {
      var logged;

      try {
        var session = FlashbandStorageSrvc.get(keySession);
        logged = (session && session.user && session.token);
      } catch (err) {
        logged = false;
      }

      return logged;
    }
  };
});
