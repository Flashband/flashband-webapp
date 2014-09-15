'use strict';

angular.module('flashbandWebapp').controller('AuthenticateCtrl', function ($scope, $state, AuthenticateSrvc, SessionSrvc) {
  $scope.messageError = false;

  $scope.login = function(credencials) {
    var successfully = function(session) {
      SessionSrvc.setSession(session);
      $state.go('dashboard');
    };

    var loginFail = function(rason) {
      $scope.messageError = "Invalid credencials!";
    };

    SessionSrvc.clearSession();
    AuthenticateSrvc.login(credencials).then(successfully, loginFail);
  };
});
