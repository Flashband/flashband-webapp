'use strict';

angular.module('flashbandWebapp').controller('AssociateCtrl', function ($scope, FlashbandRestFact,  $state) {
  $scope.listShowgoers = [];
  $scope.showGoerSearch = "";
  $scope.showGoerSelected = false;
  $scope.showMessageNewShowGoer = false;
  $scope.flashbandTag = "";

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
      $scope.showMessageNewShowGoer = !showGoers.length;
      $scope.listShowgoers = showGoers;
      $scope.showGoerSelected = false;
    };

    FlashbandRestFact.getConnection().service('showgoer').getList({s: $scope.showGoerSearch}).then(listSuccessfully);
  };

  $scope.associateShowGoer = function() {
    var showgoerId = $scope.showGoerSelected.id;

    FlashbandRestFact.getConnection().service('showgoer').one(showgoerId).one('associate', $scope.flashbandTag).post().then(function() {
      $state.go('showgoer-associate', {showgoer: showgoerId});
    }, function(err) {
      $scope.message = {
        type: 'warning',
        text: err.data
      };
    });
  };
});

