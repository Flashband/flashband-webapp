'use strict';

angular.module('flashbandWebapp').controller('AssociateCtrl', function ($scope, FlashbandRestFact,  $state, flashbandNfcReader) {
  $scope.listShowgoers = [];
  $scope.showGoerSearch = '';
  $scope.showGoerSelected = false;
  $scope.showMessageNewShowGoer = false;
  $scope.flashbandTag = '';

  $scope.changeShowGoer = function(showGoer) {
    $scope.message = false;
    $scope.showGoerSelected = false;

    if (showGoer.flashband) {
      $scope.message = {
        type: 'warning',
        text: 'FLASHBAND.ASSOCIATE.MESSAGES.ASSOCIATED'
      };

      return;
    }

    $scope.showGoerSelected = showGoer;
  };

  $scope.searchByArg = function() {
    var listSuccessfully = function(showGoers) {
      $scope.showMessageNewShowGoer = !showGoers.length;
      $scope.listShowgoers = showGoers;
      $scope.showGoerSelected = false;
    };

    FlashbandRestFact.getConnection().service('showgoer/search').getList({s: $scope.showGoerSearch}).then(listSuccessfully);
  };

  $scope.associateShowGoer = function() {
    var showgoerId = $scope.showGoerSelected.id;

    var handleMessage = function(err) {
      console.log(err);
      $scope.message = {
        type: 'warning',
        text: err.data
      };
    };

    var finishAssociation = function() {
      FlashbandRestFact.getConnection().service('showgoer').one(showgoerId).one('associate', $scope.flashbandTag).post().then(function() {
        $state.go('showgoer-associate', {showgoer: showgoerId});
      }, handleMessage);
    };

    chrome.runtime.sendMessage(flashbandNfcReader.appId, {action: 'read', params: { timeout: flashbandNfcReader.timeout }}, function(nfc) {
      $scope.$apply(function() {
        if (!nfc) {
          return finishAssociation();
        }

        if (nfc.success) {
          $scope.flashbandTag = nfc.data.tag;
          return finishAssociation();
        } 
        $scope.flashbandTag = '';
        if (nfc.error && nfc.error.timeout) {
          return handleMessage({data: 'FLASHBAND.ASSOCIATE.MESSAGES.TIMEOUT'});
        }
        handleMessage({data: nfc.error});
      });
    });
  };
});
