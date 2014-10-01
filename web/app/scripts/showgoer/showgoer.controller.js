'use strict';

angular.module('flashbandWebapp').controller('ShowgoerCtrl', function ($scope, $state, $stateParams, FlashbandRestFact) {
  $scope.message = false;

  $scope.showgoer = {
    doctype: undefined,
    docnumber: ""
  };
  
  $scope.docTypes = [{
    type: undefined,
    name: "Selecione o documento"
  }, {
    type: "cpf",
    name: "CPF"
  }];

  $scope.saveShowgoer = function() {
    console.log($scope.showgoerForm);
    if ($scope.showgoerForm.$invalid) 
      return $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.SHOWGOER.MESSAGES.REQUIRED'
      };
    var successfully = function() {
      $state.go('showgoer-saved', {message: 'saved'}); 
    };
    var saveFail = function() {
      $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.SHOWGOER.MESSAGES.DUPLICATED'
      };
    };
    FlashbandRestFact.getConnection().service('showgoer').post($scope.showgoer).then(successfully, saveFail);
  };

  if ($stateParams && $stateParams["message"]) {
    var stateMessage = $stateParams['message'].toUpperCase();
    
    $scope.message = {
      type: 'success',
      text: 'FLASHBAND.SHOWGOER.MESSAGES.'.concat(stateMessage)
    };
  }
});
