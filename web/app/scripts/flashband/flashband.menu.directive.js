'use strict';

angular.module('flashbandWebapp').directive('flashbandMenu', function() {
  return {
    restrict: 'AE',
    templateUrl: 'partials/menu.html',
    link: function(scope, elem, attrs) {
      scope.menus = [{
        sref: 'enable-flashbands',
        label: 'pulseiras'
      }, {
        sref: 'dashboard',
        label: 'item do menu'
      }, {
        sref: 'dashboard',
        label: 'outro item do menu'
      }];
    }
  };
});