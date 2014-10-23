'use strict';

angular.module('flashbandWebapp').controller('StatusCtrl', function ($scope, FlashbandRestFact) {
  $scope.totFlashbands = 0;
  $scope.listShowgoers = [];

  FlashbandRestFact.getConnection().all('showgoer').getList().then(function(list) {
    $scope.listShowgoers = list;
  });

  FlashbandRestFact.getConnection().one('flashband').one('summary').get().then(function(res) {
    $scope.totFlashbands = res.total;
  });
});
