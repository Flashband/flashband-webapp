'use strict';

angular.module('flashbandWebapp').controller('AuthenticateCtrl', function($scope, $state, AuthenticateSrvc, FlashbandSessionSrvc) {
  $scope.message = false;

  $scope.login = function(credencials) {
    var successfully = function(session) {
      FlashbandSessionSrvc.setSession(session);
      $state.go('dashboard');
    };

    var loginFail = function(rason) {
      $scope.message = {
        type: 'alert',
        text: 'LOGIN.MESSAGE.ERROR'
      };
    };

    FlashbandSessionSrvc.clearSession();
    AuthenticateSrvc.login(credencials).then(successfully, loginFail);
  };
});
