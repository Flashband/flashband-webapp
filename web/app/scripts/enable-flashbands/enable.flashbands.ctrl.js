'use strict';

angular.module('flashbandWebapp').controller('EnableFlashbandsCtrl', function EnableFlashbandsCtrl ($scope, $upload, $state, $stateParams, FlashbandSessionFact, FlashbandRestFact) {
  $scope.files = []
  $scope.nameBatch = ""
  $scope.message = false;
  $scope.totFlashbands = false;
  $scope.uploadPercent = false;
  $scope.messageSuccess = false;
  $scope.errorExtension = false;

  FlashbandRestFact.getConnection().one('flashband').one('enable').get().then(function(res) {
    $scope.totFlashbands = res.total;
  });

  if ($stateParams && $stateParams["state"]) {
    var flashbands_enabled = parseInt($stateParams['state'], 10);
    $scope.messageSuccess = flashbands_enabled > 0;
    $scope.totFlashbands = flashbands_enabled;
  }

  $scope.setFile = function(files) {
    if (_.isEmpty(files)) return;
    $scope.errorExtension = files[0].name.substring(files[0].name.length-3) !== "csv";
    if (!$scope.errorExtension) $scope.files = files;
  };

  $scope.saveFlashbands = function() {
    $scope.message = false;

    if (_.isEmpty($scope.files) || _.isEmpty($scope.nameBatch)) {
      return $scope.message = {
        type: "warning",
        text: "FLASHBAND.MESSAGE.ERROR.VALIDATION"
      };
    }

    if ($scope.errorExtension) return;

    var onSuccessUpload = function(res) {
      $scope.uploadPercent = false;
      $state.go("finish-flashbands", {state: res.data.flashbands_enabled});
    };

    var onProgressUpload = function(evt) {
      $scope.uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
    };

    var onErrorUpload = function() {
      $scope.uploadPercent = false;
      $scope.message = {
        type: 'danger',
        text: 'FLASHBAND.MESSAGE.ERROR.UPLOAD'
      };
    };

    $scope.upload = $upload.upload({
      method: 'POST',
      url: 'http://localhost:1337/flashband/enable',
      headers: {'Authorization': 'Token token='.concat(FlashbandSessionFact.getToken())},
      data: { name: $scope.nameBatch },
      file: $scope.files,
      fileFormDataName: 'flashbands'
    }).then(onSuccessUpload, onErrorUpload, onProgressUpload);
  };
});
