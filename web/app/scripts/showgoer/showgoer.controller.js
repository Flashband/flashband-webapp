'use strict';

angular.module('flashbandWebapp').controller('ShowgoerCtrl', function ($scope, $state, $stateParams) {
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
    if ($scope.showgoerForm.$valid) return $state.go('showgoer-saved', {message: 'saved'}); 
    $scope.message = {
      type: 'warning',
      text: 'FLASHBAND.SHOWGOER.MESSAGES.REQUIRED'
    };
  };

  if ($stateParams && $stateParams["message"]) {
    var stateMessage = $stateParams['message'].toUpperCase();
    
    $scope.message = {
      type: 'success',
      text: 'FLASHBAND.SHOWGOER.MESSAGES.'.concat(stateMessage)
    };
  }
});
