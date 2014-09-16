'use strict';

var dependencies = ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'angularFileUpload'];

angular.module('flashbandWebapp', dependencies).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('enable-flashbands', {
      url: '/enable-flashbands',
      templateUrl: 'partials/enable-flashbands.html',
      controller: 'EnableFlashbandsCtrl',
      data: {
        isPublic: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'AuthenticateCtrl',
      data: {
        isPublic: true
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl',
      data: {
        isPublic: false
      }
    });

  $urlRouterProvider.otherwise('/login');
});
