'use strict';

angular.module('flashbandWebapp').controller('StatusCtrl', function ($scope, FlashbandRestFact) {
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

  $scope.dtOptions = {
    language: {
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
    }
  };

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

  FlashbandRestFact.getConnection().all('showgoer').getList().then(function(list) {
    $scope.listShowgoers = list;
  });

  FlashbandRestFact.getConnection().one('flashband').one('summary').get().then(function(res) {
    $scope.totFlashbands = res.total;
  });
});
