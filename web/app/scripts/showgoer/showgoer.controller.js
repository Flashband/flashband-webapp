'use strict';

angular.module('flashbandWebapp').controller('ShowgoerCtrl', function ($scope) {
  $scope.showgoer = {
    doctype: "",
    docnumber: ""
  };
  $scope.docTypes = [{
    type: "",
    name: "Selecione o documento"
  }, {
    type: "cpf",
    name: "CPF"
  }];
});
