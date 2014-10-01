'use strict';

angular.module('flashbandWebapp').controller('ShowgoerCtrl', function ($scope) {
  $scope.showgoer = {
    doctype: ""
  };
  $scope.docTypes = [{
    type: "",
    name: "Selecione o documento"
  }];
});
