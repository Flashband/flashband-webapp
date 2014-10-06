'use strict';

angular.module('flashbandWebapp').controller('AssociateCtrl', function ($scope, FlashbandRestFact) {
  $scope.listShowgoers = [];
  $scope.showGoerSearch = "";

  $scope.searchByArg = function() {
    var listSuccessfully = function(showGoers) {
      $scope.listShowgoers = showGoers;
    };

    FlashbandRestFact.getConnection().service('showgoer').getList({s: $scope.showGoerSearch}).then(listSuccessfully);
  };
});
