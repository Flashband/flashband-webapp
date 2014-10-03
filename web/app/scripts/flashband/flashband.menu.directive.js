'use strict';

angular.module('flashbandWebapp').directive('flashbandMenu', function flashbandMenu () {
  return {
    restrict: 'AE',
    templateUrl: 'partials/menu.html',
    link: function(scope) {
      scope.menus = [{
        sref: 'enable-flashbands',
        label: 'pulseiras'
      }];

      scope.menus.push({
        sref: 'logout',
        label: 'sair'
      });
    }
  };
});
