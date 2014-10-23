'use strict';

angular.module('flashbandWebapp').controller('StatusCtrl', function ($scope, FlashbandRestFact) {
  $scope.totFlashbands = 0;

  FlashbandRestFact.getConnection().one('flashband').one('summary').get().then(function(res) {
    $scope.totFlashbands = res.total;
  });
});
