'use strict';



angular.module('flashbandWebapp').controller('StatusCtrl', function ($scope, $sails, $q, FlashbandRestFact, $interval, DTColumnDefBuilder, DTOptionsBuilder, DTColumnBuilder, $translate) {

  $scope.totFlashbands = 0;
  
  var showgoers = null
    , showgoersDeferred = $q.defer();

  // Save firt socket connection list of showgoers.
  showgoersDeferred.promise.then(function (list) {
    showgoers = list;
  });

  /**
   * Updates a given showgoer to the list.
   */
  function updateShowgoerList(showgoer) {
    if (showgoers) {
      var index = null;
      showgoers.forEach(function (current, i) {
        index = current.id === showgoer.id ? i : index;
      });

      if (index) {
        showgoers[index].zone = showgoer.zone;
        showgoers[index].status = showgoer.status;
      } else {
        showgoers.push(showgoer);
      }
    }
  }

  $sails.on('connect', function () {

    // Try and get showgoers via socket.
    $sails.get("/showgoer").success(showgoersDeferred.resolve);

    // Listen for frondoor enter events.
    $sails.on('frontdoor:enter', function (message) {
      message.showgoer.zone = message.entrance.zone;
      message.showgoer.status = 'in';
      updateShowgoerList(message.showgoer);
      $scope.dtOptions.reloadData();
    });

    // Listen for frondoor leave events.
    $sails.on('frontdoor:leave', function (message) {
      message.showgoer.zone = '';
      message.showgoer.status = 'out';
      updateShowgoerList(message.showgoer);
      $scope.dtOptions.reloadData();
    });
  });
  
  $scope.zones = [
   { id: undefined,  name: 'Todos'},
   { id: '1', name: 'Sala 01'},
   { id: '2', name: 'Sala 02'},
   { id: '3', name: 'Sala 03'},
   { id: '4', name: 'Sala 04'},
   { id: '5', name: 'Sala 05'},
   { id: '6', name: 'Sala WBM'},
   { id: '7', name: 'Sala MMAA'},
   { id: '8', name: 'Stand Patrocinador 01'},
   { id: '9', name: 'Stand Patrocinador 02'},
   { id: '10', name: 'Stand Patrocinador 03'},
   { id: '11', name: 'Lounge Agile Alliance'},
   { id: '12', name: 'Entrada/Saída (Agile)'}
  ];

  $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
    return (showgoers ? $q.when(showgoers) : showgoersDeferred.promise).then(function(list) {
      var newList = [];
  
      if (!list) return newList;
      if (list.empty) return newList;
  
      list.forEach(function(item) {
  
        var validVip = true;
        if ($scope.vipParam) validVip = item.vip;
  
        var validZone = true;
        if ($scope.zoneParam) validZone = item.zone === $scope.zoneParam;
  
        if (item.vip)
          item.vipst = 'Sim';
        else
          item.vipst = 'Não';

        if (validVip && validZone) {
          $translate('FLASHBAND.SHOWGOER.DOCTYPE.'.concat(item.docType.toUpperCase())).then(function(t) {
            item.document = t.concat(': ', item.docNumber);
          });
  
          $translate('FLASHBAND.SHOWGOER.STATUS.'.concat(item.status.toUpperCase())).then(function(t) {
            item.status = t;
          });
  
          newList.push(item);
        }
      });
  
      return newList;
    });
  });
  
  $scope.dtOptions.language = {
    'sEmptyTable': 'Nenhum registro encontrado',
    'sInfo': 'Mostrando de _START_ até _END_ de _TOTAL_ visitantes',
    'sInfoEmpty': 'Sem registros.',
    'sInfoFiltered': '(Filtrados de _MAX_ registros)',
    'sInfoPostFix': '',
    'sInfoThousands': '.',
    'sLengthMenu': '_MENU_ resultados por página',
    'sLoadingRecords': 'Carregando...',
    'sProcessing': 'Processando...',
    'sZeroRecords': 'Nenhum registro encontrado',
    'sSearch': 'Pesquisar',
    'oPaginate': {
        'sNext': 'Próximo',
        'sPrevious': 'Anterior',
        'sFirst': 'Primeiro',
        'sLast': 'Último'
    },
    'oAria': {
        'sSortAscending': ': Ordenar colunas de forma ascendente',
        'sSortDescending': ': Ordenar colunas de forma descendente'
    }
  };
  
  $scope.dtColumns = [
    DTColumnBuilder.newColumn('name').withTitle('Visitante'),
    DTColumnBuilder.newColumn('vipst').withTitle('Vip'),
    DTColumnBuilder.newColumn('document').withTitle('Documento'),
    DTColumnBuilder.newColumn('phone').withTitle('Telefone'),
    DTColumnBuilder.newColumn('status').withTitle('Situação')
  ];
  
  $scope.vipMatch = function(criteria) {
    return function(item) {
      return !criteria || (criteria && item.vip);
    };
  };
  
  $scope.zoneMatch= function(criteria) {
    return function(item) {
      return !criteria || (item.zone === criteria);
    };
  };
  
  FlashbandRestFact.getConnection().one('flashband').one('summary').get().then(function(res) {
    $scope.totFlashbands = res.total;
  });
});
