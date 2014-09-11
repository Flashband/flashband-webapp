'use strict';

angular.module('flashbandWebapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'AuthenticateCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl'
      });

    $urlRouterProvider.otherwise('/login');
  })
;
