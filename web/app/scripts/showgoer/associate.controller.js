'use strict';

angular.module('flashbandWebapp').controller('AssociateCtrl', function ($scope, FlashbandRestFact,  $state) {
  $scope.listShowgoers = [];
  $scope.showGoerSearch = "";
  $scope.showGoerSelected = false;

  $scope.changeShowGoer = function(showGoer) {
    $scope.showGoerSelected = showGoer;
  };

  $scope.searchByArg = function() {
    var listSuccessfully = function(showGoers) {
      $scope.listShowgoers = showGoers;
      $scope.showGoerSelected = false;
    };

    FlashbandRestFact.getConnection().service('showgoer').getList({s: $scope.showGoerSearch}).then(listSuccessfully);
  };

  $scope.associateShowGoer = function() {
    $state.go('showgoer-associate', {showgoer: $scope.showGoerSelected.id});
  };
});
