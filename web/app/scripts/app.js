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
    url: '/flashbands-finish/:state',
    templateUrl: 'partials/flashbands-enable.html',
    data: { isPublic: AuthenticateAccess.deny }
  });

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardCtrl',
    data: { isPublic: AuthenticateAccess.deny }
  });

  $stateProvider.state('showgoer', {
    parent: dashboardAbstract,
    url: '/showgoer',
    templateUrl: 'partials/showgoer.html',
    controller: 'ShowgoerCtrl',
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
        "BUTTON": "Cadastrar pulseiras &raquo;",
        "SAVE": "Importar arquivo e cadstrar flashbands",
        "CANCEL": "Cancelar",
        "PLACEHOLDER": "Digite o nome do lote de pulseiras",
        "FILE": "Arquivo que será importado: <b>{{nameFile}}</b>"
      },
      "UPLOAD": {
        "BTN": "Carregar arquivo .csv",
        "TEXT": "Você pode cadastrar todo o lote de pulseiras recebidas de uma só vez.",
        "CANCEL": "Cancelar Upload"
      },
      "MESSAGE": {
        "SUCCESS": "O lote foi cadastrado e {{totalFlashbands}} pulseiras foram adicionadas com sucesso!",
        "TOTAL": "Você possui {{totalFlashbands}} pulseiras cadastradas. Para cadastrar um novo lote, é só clicar em adicionar pulseiras.",
         "ERROR": {
           "VALIDATION": "Campos obrigatórios! Nome do lote ou arquivo para importação não foi informado.",
           "UPLOAD": "Ocorreu algum erro na importação do arquivo. <p>Por favor verifique se o arquivo é o correto ou entre em contato com a equipe da 4ON</p>",
           "FILE": "Arquivo inválido. Por favor informe um arquivo CSV com as flashbands corretas."
         }
      },
      "SHOWGOER": {
        "TITLE": "Cadastre um showgoer",
        "TEXT": "Você ainda não possui nenhum showgoer cadastrado. Para começar é só clicar em cadastrar showgoer.",
        "BUTTON": "Cadastrar showgoer"
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
