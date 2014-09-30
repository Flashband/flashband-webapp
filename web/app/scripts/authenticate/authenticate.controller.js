'use strict';

angular.module('flashbandWebapp').controller('AuthenticateCtrl', function AuthenticateCtrl ($scope, $state, FlashbandRestFact, FlashbandSessionFact) {
  $scope.message = false;
  $scope.showLougoutMessage = false;

  var isLogout = $state.current.name == "logout";

  if (isLogout) {
    FlashbandSessionFact.clearSession();

    $scope.message = {
      type: 'info',
      text: 'LOGIN.MESSAGE.LOGOUT'
    };
  };

  $scope.login = function(credencials) {
    var successfully = function(session) {
      FlashbandSessionFact.setSession(session);
      $state.go('dashboard');
    };

    var loginFail = function(rason) {
      $scope.message = {
        type: 'warning',
        text: 'LOGIN.MESSAGE.ERROR'
      };
    };

    FlashbandSessionFact.clearSession();
    FlashbandRestFact.getConnection().service('login').post(credencials).then(successfully, loginFail);
  };
});
