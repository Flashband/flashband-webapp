'use strict';

var dependencies = ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'angularFileUpload', 'pascalprecht.translate'];

angular.module('flashbandWebapp', dependencies).config(function ($translateProvider, $stateProvider, $urlRouterProvider, AuthenticateAccess, dashboardAbstract) {
  $stateProvider.state(dashboardAbstract, {
    abstract: true,
    templateUrl: 'partials/dashboard.html',
    data: { isPublic: AuthenticateAccess.deny }
  }).state('enable-flashbands', {
    parent: dashboardAbstract,
    controller: 'EnableFlashbandsCtrl',
    url: '/flashbands-enable',
    templateUrl: 'partials/flashbands-enable.html',
    data: { isPublic: AuthenticateAccess.deny }
  }).state('upload-flashbands', {
    parent: dashboardAbstract,
    controller: 'EnableFlashbandsCtrl',
    url: '/flashbands-upload',
    templateUrl: 'partials/flashbands-upload.html',
    data: { isPublic: AuthenticateAccess.deny }
  }).state('finish-flashbands', {
    parent: dashboardAbstract,
    controller: 'EnableFlashbandsCtrl',
    url: '/flashbands-finish',
    templateUrl: 'partials/flashbands-finish.html',
    data: { isPublic: AuthenticateAccess.deny }
  });

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardCtrl',
    data: { isPublic: AuthenticateAccess.deny }
  });

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller: 'AuthenticateCtrl',
    data: { isPublic: AuthenticateAccess.allow }
  });

  $translateProvider.translations('pt-BR', {
    "LOGIN": {
      "TEXT": "Please sign in",
      "BUTTON": "Sign in",
      "MESSAGE": {
        "ERROR": "Invalid credencials!"
      }
    },
    "FLASHBAND": {
      "ENABLE": {
        "TITLE": "Cadastre um lote de pulseiras.",
        "TEXT": "Seja bem vindo. Você ainda não possui nenhuma pulseira cadastrada. Para começar, é só clicar em adicionar pulseiras.",
        "BUTTON": "Cadastrar pulseiras &raquo;"
      }
    }
  });

  $translateProvider.preferredLanguage('pt-BR')

  $urlRouterProvider.otherwise('/login');
}).run(function ($rootScope, FlashbandSessionSrvc, $state) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (next.data.isPublic) return;
    if (FlashbandSessionSrvc.hasUserAuthenticated()) return;

    event.preventDefault();
    $state.go('login');
  });
});
