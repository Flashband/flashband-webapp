'use strict';

angular.module('flashbandWebapp').controller('AuthenticateCtrl', function ($scope, $state, AuthenticateSrvc, FlashbandSessionSrvc) {
  $scope.messageError = false;

  $scope.login = function(credencials) {
    var successfully = function(session) {
      FlashbandSessionSrvc.setSession(session);
      $state.go('dashboard');
    };

    var loginFail = function(rason) {
      $scope.messageError = "Invalid credencials!";
    };

    FlashbandSessionSrvc.clearSession();
    AuthenticateSrvc.login(credencials).then(successfully, loginFail);
  };
});
