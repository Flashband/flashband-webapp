'use strict';

angular.module('flashbandWebapp').controller('ShowgoerCtrl', function ($scope, $state, $stateParams, FlashbandRestFact, docTypes) {
  $scope.message = false;
  $scope.totShowgoers = 0;

  $scope.showgoer = {
    docType: undefined,
    docNumber: null,
    phone: '',
    vip: false
  };

  FlashbandRestFact.getConnection().one('showgoer').one('summary').get().then(function(res) {
    $scope.totShowgoers = res.total;
  });

  $scope.docTypes = docTypes;

  $scope.saveShowgoer = function () {
    if ($scope.showgoerForm.$invalid) {
      $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.SHOWGOER.MESSAGES.REQUIRED'
      };
      return;
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

  if ($stateParams) {
    if ($stateParams.message) {
      var stateMessage = $stateParams.message.toUpperCase();

      $scope.message = {
        type: 'success',
        text: 'FLASHBAND.SHOWGOER.MESSAGES.'.concat(stateMessage)
      };
    }

    if ($stateParams.showgoer) {
      $scope.message = {
        type: 'success',
        text: 'FLASHBAND.ASSOCIATE.MESSAGES.SUCCESS'
      };
    }
  }
});
