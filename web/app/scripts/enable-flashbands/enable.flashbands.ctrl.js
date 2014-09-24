'use strict';

angular.module('flashbandWebapp').controller('EnableFlashbandsCtrl', function ($scope, $upload, $state, $stateParams) {
  $scope.files = []
  $scope.nameBatch = ""
  $scope.message = false;
  $scope.totFlashbands = 0;
  $scope.uploadPercent = false;
  $scope.messageSuccess = false;
  $scope.errorExtension = false;

  if ($stateParams && $stateParams["state"]) {
    $scope.messageSuccess = $stateParams["state"] === "success";
    $scope.totFlashbands = 123.123;
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

    var onSuccessUpload = function() {
      $scope.uploadPercent = false;
      $state.go("finish-flashbands", {state: "success"});
    };

    var onProgressUpload = function(evt) {
      $scope.uploadPercent = parseInt(100.0 * evt.loaded / evt.total);
    };

    var onErrorUpload = function() {
      $scope.uploadPercent = false;
      $scope.message = {
        type: "danger",
        text: "FLASHBAND.MESSAGE.ERROR.UPLOAD"
      };
    };

    $scope.upload = $upload.upload({
      method: 'POST',
      url: 'http://localhost:1337/flashband/enable',
      data: { name: $scope.nameBatch },
      file: $scope.files,
      fileFormDataName: 'flashbands'
    }).then(onSuccessUpload, onErrorUpload, onProgressUpload);
  };
});
