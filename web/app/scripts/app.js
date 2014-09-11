'use strict';

angular.module('flashbandWebapp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'angularFileUpload'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('enable-flashbands', {
        url: '/enable-flashbands',
        templateUrl: 'partials/enable-flashbands.html',
        controller: 'EnableFlashbandsCtrl'
      })
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
