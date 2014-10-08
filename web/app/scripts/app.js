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
      templateUrl: 'partials/showgoer-start.html',
      controller: 'ShowgoerCtrl',
      data: { isPublic: AuthenticateAccess.deny }
  }).state('showgoer-new', {
    parent: dashboardAbstract,
    url: '/showgoer/new',
    templateUrl: 'partials/showgoer-new.html',
    controller: 'ShowgoerCtrl',
    data: { isPublic: AuthenticateAccess.deny }
  }).state('showgoer-search', {
    parent: dashboardAbstract,
    url: '/showgoer/search',
    templateUrl: 'partials/showgoer-search.html',
    controller: 'AssociateCtrl',
    data: { isPublic: AuthenticateAccess.deny }
  }).state('showgoer-associate', {
    parent: dashboardAbstract,
    url: '/showgoer/:showgoer/associate',
    templateUrl: 'partials/showgoer-start.html',
    controller: 'ShowgoerCtrl',
    data: { isPublic: AuthenticateAccess.deny }
  }).state('showgoer-saved', {
    parent: dashboardAbstract,
    url: '/showgoer/:message',
    templateUrl: 'partials/showgoer-start.html',
    controller: 'ShowgoerCtrl',
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
    "Blocked Flashband": "Opa, essa flashband está bloqueada. Utilize outra flashband para fazer vinculação.",
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
        "SUCCESS": "O lote foi cadastrado e {{totalFlashbands}} pulseira{{plural}} adicionada{{plural}} com sucesso!",
        "TOTAL": "Você possui {{totalFlashbands}} pulseira{{plural}} cadastrada{{plural}}. Para cadastrar um novo lote, é só clicar em adicionar pulseiras.",
         "ERROR": {
           "VALIDATION": "Campos obrigatórios! Nome do lote ou arquivo para importação não foi informado.",
           "UPLOAD": "Ocorreu algum erro na importação do arquivo. Por favor verifique se o arquivo é o correto ou entre em contato com a equipe da 4ON",
           "FILE": "Arquivo inválido. Por favor informe um arquivo CSV com as flashbands corretas."
         }
      },
      "MENU": {
        "FLASHBANDS": "Pulseiras",
        "SHOWGOER": "Showgoer"
      },

      "SHOWGOER": {
        "TEXT": {
          "TITLE": "Cadastre um ShowGoer",
          "START": "Você ainda não possui nenhum ShowGoer cadastrado. Para começar é só clicar em cadastrar ShowGoer.",
          "CREATED": "Você possui {{totalShowgoers}} ShowGoer{{plural}} cadastrado{{plural}}. Para adicionar um novo ShowGoer, é só clicar em cadastrar ShowGoer. Para vincular um ShowGoer cadastrado a uma pulseira, é só clicar em vincular ShowGoer.",
          "NEW": "Para começar, basta informar o nome do ShowGoer. Depois escolha o tipo de documento e informe o número do documento."
        },
        "BUTTON": {
          "SAVE": "Cadastrar",
          "CANCEL": "Cancelar",
          "NEW": "Cadastrar ShowGoer",
          "ASSOCIATE": "Vincular ShowGoer"
        },
        "MESSAGES": {
          "SAVED": "ShowGoer cadastrado com sucesso.",
          "REQUIRED": "Todos os campos são obrigatórios. Verifique e tente novamente.",
          "DUPLICATED": "Opa, esse documento já está cadastrado. Talvez você tenha errado o número. Corrija ou cadastre outro ShowGoer."
        },
        "PLACEHOLDER": {
          "NAME": "Informe o nome do ShowGoer",
          "DOCTYPE": "Selecione o documento",
          "DOCNUMBER": {
            "cpf": "Informe o número do CPF",
            "rg": "Informe o número do RG",
            "cnh": "Informe o número da carteira de motorista",
            "passport": "Informe o número do passaporte"
          }
        },
        "DOCTYPE": {
          "RG": "RG",
          "CPF": "CPF",
          "CNH": "Carteira de motorista",
          "PASSPORT": "Passaporte",
          "UNDEFINED": "Selecione o documento"
        }
      },

      "ASSOCIATE": {
        "TEXT": {
          "TITLE": "Vincular ShowGoer",
          "NEW": "Para vincular um ShowGoer a uma pulseira, basta buscar pelo nome ou número do documento cadastrado. Depois é só clicar em vincular e aproximar a pulseira do leitor."
        },
        "MESSAGES": {
          "SUCCESS": "ShowGoer vinculado com sucesso.",
          "ASSOCIATED": "Opa, esse ShowGoer já foi vinculado a uma pulseira.",
          "SHOWGOER": "Não existem visitantes cadastrados com esse nome ou documento. Por favor, corrija ou"
        },
        "TABLE": {
          "SEL": "Selecionar",
          "NAME": "Showoger",
          "DOCTYPE": "Documento",
          "DOCNUMBER": "Número"
        },
        "BUTTON": {
          "CANCEL": "Cancelar",
          "ASSOCIATE": "Vincular",
          "SEARCH": "buscar",
          "SHOWGOER": "cadastre um novo visitante."
        },
        "PLACEHOLDER": {
          "SHOWGOER": "Digite o nome ou documento do visitante.",
          "TAG": "Digite o número da flashband aqui"
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
