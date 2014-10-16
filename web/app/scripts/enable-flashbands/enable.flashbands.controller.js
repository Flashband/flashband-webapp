'use strict';

angular.module('flashbandWebapp').controller('EnableFlashbandsCtrl', function EnableFlashbandsCtrl ($scope, $upload, $state, $stateParams, FlashbandSessionFact, FlashbandRestFact, flashbandApiServer) {
  $scope.files = [];
  $scope.nameBatch = '';
  $scope.message = false;
  $scope.totFlashbands = false;
  $scope.uploadPercent = false;
  $scope.messageSuccess = false;
  $scope.errorExtension = false;
  $scope.listErrors = [];

  FlashbandRestFact.getConnection().one('flashband').one('summary').get().then(function(res) {
    $scope.totFlashbands = res.total;
  });

  if ($stateParams && $stateParams.state) {
    var flashbandsEnabled = parseInt($stateParams.state);
    $scope.messageSuccess = flashbandsEnabled > 0;
    $scope.totFlashbands = flashbandsEnabled;
  }

  $scope.setFile = function(files) {
    if (_.isEmpty(files)) { return; }
    $scope.errorExtension = files[0].name.substring(files[0].name.length-3) !== 'csv';
    if (!$scope.errorExtension) { $scope.files = files; }
  };

  $scope.saveFlashbands = function() {
    $scope.message = false;

    if (_.isEmpty($scope.files) || _.isEmpty($scope.nameBatch)) {
      $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.MESSAGE.ERROR.VALIDATION'
      };

      return;
    }

    if ($scope.errorExtension) { return; }

    var onSuccessUpload = function(res) {
      $scope.uploadPercent = false;
      $state.go('finish-flashbands', {state: res.data.flashbandsEnabled});
    };

    var onProgressUpload = function(evt) {
      $scope.uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
    };

    var onErrorUpload = function(ranson) {
      $scope.uploadPercent = false;
      $scope.message = {
        type: 'danger',
        text: 'FLASHBAND.MESSAGE.ERROR.UPLOAD'
      };

      $scope.listErrors = ranson.data;
    };

    $scope.upload = $upload.upload({
      method: 'POST',
      url: flashbandApiServer.concat('/flashband/enable'),
      headers: {'Authorization': 'Token token='.concat(FlashbandSessionFact.getToken())},
      data: { name: $scope.nameBatch },
      file: $scope.files,
      fileFormDataName: 'flashbands'
    }).then(onSuccessUpload, onErrorUpload, onProgressUpload);
  };
});
