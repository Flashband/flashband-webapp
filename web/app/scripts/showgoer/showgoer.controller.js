'use strict';

angular.module('flashbandWebapp').controller('ShowgoerCtrl', function ($scope, $state, $stateParams, FlashbandRestFact, docTypes) {
  $scope.message = false;
  $scope.totShowgoers = 0;

  $scope.showgoer = {
    doctype: undefined,
    docnumber: null
  };

  FlashbandRestFact.getConnection().one('showgoer').one('summary').get().then(function(res) {
    $scope.totShowgoers = res.total;
  });

  $scope.docTypes = docTypes;

  $scope.saveShowgoer = function () {
    if ($scope.showgoerForm.$invalid) {
      return $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.SHOWGOER.MESSAGES.REQUIRED'
      };
    }

    var successfully = function () {
      $state.go('showgoer-saved', {message: 'saved'});
    };

    var saveFail = function () {
      $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.SHOWGOER.MESSAGES.DUPLICATED'
      };
    };

    FlashbandRestFact.getConnection().service('showgoer').post($scope.showgoer).then(successfully, saveFail);
  };

  if ($stateParams && $stateParams['message']) {
    var stateMessage = $stateParams['message'].toUpperCase();

    $scope.message = {
      type: 'success',
      text: 'FLASHBAND.SHOWGOER.MESSAGES.'.concat(stateMessage)
    };
  }
});
