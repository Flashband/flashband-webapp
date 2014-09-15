'use strict';

angular.module('flashbandWebapp').controller('AuthenticateCtrl', function ($scope, $state, AuthenticateSrvc) {
  $scope.messageError = false;

  $scope.login = function(credencials) {

    var successfully = function(user) {
      $state.go('dashboard');
    };

    var loginFail = function(rason) {
      $scope.messageError = "Invalid credencials!";
    };

    AuthenticateSrvc.login(credencials).then(successfully, loginFail);
  };
});
