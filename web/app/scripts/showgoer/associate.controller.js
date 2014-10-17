'use strict';

angular.module('flashbandWebapp').controller('AssociateCtrl', function ($scope, $timeout, FlashbandRestFact,  $state, flashbandNfcReader) {
  $scope.listShowgoers = [];
  $scope.showGoerSearch = '';
  $scope.showGoerSelected = false;
  $scope.showMessageNewShowGoer = false;
  $scope.flashbandTag = '';
  $scope.reading = false;

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

    $scope.stop = function(){
        $timeout.cancel(mytimeout);
    }

    var handleMessage = function(err) {
      console.log(err);

      $scope.message = {
        type: err.type,
        text: err.data
      };
    };

    var finishAssociation = function() {
      FlashbandRestFact.getConnection().service('showgoer').one(showgoerId).one('associate', $scope.flashbandTag).post().then(function() {
        $state.go('showgoer-associate', {showgoer: showgoerId});
      }, function(err) {
        err.type = 'warning';
        handleMessage(err);
        $scope.flashbandTag = '';
      });
    };

    var nfcReaderResponse = function(nfc) {
      $scope.$apply(function() {
        $scope.reading = false;
        if (!nfc) {
          return handleMessage({type: 'danger', data: 'Not Found'});
        }

        if (nfc.success) {
            $scope.flashbandTag = nfc.data.tag;
          return finishAssociation();
        }
        $scope.flashbandTag = '';

        if (nfc.error && nfc.error.timeout) {
          return handleMessage({type: 'warning', data: 'FLASHBAND.ASSOCIATE.MESSAGES.TIMEOUT'});
        }
        handleMessage({type: 'warning', data: nfc.error});
      });
    }

    var chromeSendMessage = function() {
      $scope.reading = true;

      chrome.runtime.sendMessage(flashbandNfcReader.appId, {
        action: 'read',
        params: {
          timeout: flashbandNfcReader.timeout
        }
      }, nfcReaderResponse);

      $scope.timeout = 5;
      $scope.onTimeout = function(){
        $scope.timeout--;
        if ($scope.timeout > 0) {
            nfcReaderTimeout = $timeout($scope.onTimeout,1000);
        }
        else if($scope.reading) {
          $scope.reading = false;
          handleMessage({type: 'danger', data: 'Not Found'});
        }
      }

      var nfcReaderTimeout = $timeout($scope.onTimeout,1000);
      handleMessage({type: 'info', data: 'FLASHBAND.ASSOCIATE.MESSAGES.READING'});
    }

    if ($scope.flashbandTag.length > 0) {
      return finishAssociation();
    }

    chromeSendMessage();


  };
});
