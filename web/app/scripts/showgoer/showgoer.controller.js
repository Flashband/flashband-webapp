'use strict';

angular.module('flashbandWebapp').controller('ShowgoerCtrl', function ($scope) {
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
});
