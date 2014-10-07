'use strict';

angular.module('flashbandWebapp').controller('AssociateCtrl', function ($scope, FlashbandRestFact,  $state) {
  $scope.listShowgoers = [];
  $scope.showGoerSearch = "";
  $scope.showGoerSelected = false;

  $scope.changeShowGoer = function(showGoer) {
    $scope.message = false;
    $scope.showGoerSelected = false;

    if (showGoer.flashband) {
      return $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.ASSOCIATE.MESSAGES.ASSOCIATED'
      };
    }

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
    var showgoerId = $scope.showGoerSelected.id;
    var flashbandTag = "04760b3a532880";

    FlashbandRestFact.getConnection().service('showgoer').one(showgoerId).one('associate', flashbandTag).post().then(function() {
      $state.go('showgoer-associate', {showgoer: showgoerId});
    }, function() {
      $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.ASSOCIATE.MESSAGES.ERROR'
      };
    });
  };
});
