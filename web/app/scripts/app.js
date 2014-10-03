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

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller: 'AuthenticateCtrl',
    data: { isPublic: AuthenticateAccess.allow }
  }).state('logout', {
    url: '/logout',
    templateUrl: 'partials/login.html',
    controller: 'AuthenticateCtrl',
    data: { isPublic: AuthenticateAccess.deny }
  });

  $translateProvider.translations('pt-BR', {
    "LOGIN": {
      "TEXT": "Seja bem vindo!",
      "BUTTON": "entrar",
      "PLACEHOLDER": {
        "EMAIL": "Digite seu email",
        "PASSWORD": "Digite sua senha"
      },
      "MESSAGE": {
        "ERROR": "Usuário ou senha não conferem. Por favor, corrija e tente novamente.",
        "LOGOUT": "Sua sessão foi finalizada com sucesso. Obrigado!"
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
        "TOTAL": "Você possui {{totalFlashbands}} pulseira{{plural}} cadastrada{{plural}}. Para cadastrar um novo lote, é só clicar em adicionar pulseiras.",
         "ERROR": {
           "VALIDATION": "Campos obrigatórios! Nome do lote ou arquivo para importação não foi informado.",
           "UPLOAD": "Ocorreu algum erro na importação do arquivo. Por favor verifique se o arquivo é o correto ou entre em contato com a equipe da 4ON",
           "FILE": "Arquivo inválido. Por favor informe um arquivo CSV com as flashbands corretas."
         }
      }
    }
  });

  $translateProvider.preferredLanguage('pt-BR');

  $urlRouterProvider.otherwise('/login');
}).run(function ($rootScope, FlashbandSessionFact, $state) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (next.data.isPublic) return;
    if (FlashbandSessionFact.hasUserAuthenticated()) return;

    event.preventDefault();
    $state.go('login');
  });
});
