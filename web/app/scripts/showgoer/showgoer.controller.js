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
    $state.go('showgoer-saved', {message: 'saved'});
  };

  if ($stateParams && $stateParams["message"]) {
    var stateMessage = $stateParams['message'].toUpperCase();
    
    $scope.message = {
      type: 'success',
      text: 'FLASHBAND.SHOWGOER.MESSAGES.'.concat(stateMessage)
    };
  }
});
