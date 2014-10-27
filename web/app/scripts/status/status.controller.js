'use strict';

angular.module('flashbandWebapp').controller('StatusCtrl', function ($scope, FlashbandRestFact, $interval, DTColumnDefBuilder, DTOptionsBuilder, DTColumnBuilder, $translate) {
  $scope.totFlashbands = 0;
  $scope.listShowgoers = [];

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
    return FlashbandRestFact.getConnection().all('showgoer').getList().then(function(list) {
      var newList = [];

      if (!list) return newList;
      if (list.empty) return newList;

      list.forEach(function(item) {

        var validVip = true;
        if ($scope.vipParam) validVip = item.vip;

        var validZone = true;
        if ($scope.zoneParam) validZone = item.zone === $scope.zoneParam;

        if (validVip && validZone) {
          $translate('FLASHBAND.SHOWGOER.DOCTYPE.'.concat(item.docType.toUpperCase())).then(function(t) {
            item.docNumber = t.concat(': ', item.docNumber);
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
    DTColumnBuilder.newColumn('docNumber').withTitle('Documento'),
    DTColumnBuilder.newColumn('phone').withTitle('Telefone'),
    DTColumnBuilder.newColumn('status').withTitle('Situação')
  ];

  $interval(function() {
    $scope.dtOptions.reloadData();
  }, 1000);

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
