'use strict';

angular.module('flashbandWebapp').controller('StatusCtrl', function ($scope, FlashbandRestFact) {
  $scope.totFlashbands = 0;
  $scope.listShowgoers = [];
  $scope.dtOptions = {
    language: {
      'sEmptyTable': 'Nenhum registro encontrado',
      'sInfo': 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
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

  FlashbandRestFact.getConnection().all('showgoer').getList().then(function(list) {
    $scope.listShowgoers = list;
  });

  FlashbandRestFact.getConnection().one('flashband').one('summary').get().then(function(res) {
    $scope.totFlashbands = res.total;
  });
});
