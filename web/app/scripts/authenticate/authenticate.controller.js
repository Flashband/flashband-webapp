'use strict';

angular.module('flashbandWebapp').controller('AuthenticateCtrl', function ($scope, $state, AuthenticateSrvc) {
  $scope.login = function(credencials) {
    $scope.messageError = false;

    var successfully = function(user) {
      $state.go('dashboard');
    };

    var loginFail = function(rason) {
      $scope.messageError = rason;
    };

    AuthenticateSrvc.login(credencials).then(successfully, loginFail);
  };
});
