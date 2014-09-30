'use strict';

angular.module('flashbandWebapp').controller('AuthenticateCtrl', function AuthenticateCtrl ($scope, $state, FlashbandRestFact, FlashbandSessionFact) {
  $scope.message = false;

  $scope.login = function(credencials) {
    var successfully = function(session) {
      FlashbandSessionFact.setSession(session);
      $state.go('dashboard');
    };

    var loginFail = function(rason) {
      $scope.message = {
        type: 'alert',
        text: 'LOGIN.MESSAGE.ERROR'
      };
    };

    FlashbandSessionFact.clearSession();
    FlashbandRestFact.getConnection().service('login').post(credencials).then(successfully, loginFail);
  };
});
