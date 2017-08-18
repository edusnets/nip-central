(function(){
   angular.module('NipCentral')
   .controller('LigacaoCtrl', [
      '$scope',
      '$http',
      'settings',
      'LigacaoService',
      'searchFilter',
      function(
         $scope,
         $http,
         settings,
         LigacaoService,
         searchFilter) {
            
        }
    ])
   .controller('LigacaoPesquisaCtrl', [
      '$scope',
      '$http',
      '$state',
      'settings',
      'LigacaoService',
      'searchFilter',
      function(
         $scope,
         $http,
         $state,
         settings,
         LigacaoService,
         searchFilter) {
             
            $scope.rows = [];

            $scope.fields = [{
                key: 'calldate',
                title: 'Data',
                sortable: true
            }, {
                key: 'realclid',
                title: 'CallerID',
                sortable: true
            }, {
                key: 'realsrc',
                title: 'Origem',
                sortable: true
            }, {
                key: 'realdst',
                title: 'Destino',
                sortable: true
            }, {
                key: 'duration',
                title: 'Duração',
                sortable: true,
                hide: 'hidden-sm hidden-xs'
            }, {
                key: 'billsec',
                title: 'Tarifado',
                sortable: true,
                hide: 'hidden-sm hidden-xs'
            },{
                key: 'disposition',
                title: 'Status',
                sortable: true
            }, {
                key: 'valor',
                title: 'Valor',
                sortable: true
            }, {
                key: 'accountcode',
                title: 'Conta',
                sortable: true
            }, {
                key: 'realtransf',
                title: 'Transferido Por',
                sortable: true,
                hide: 'hidden-sm hidden-xs'
            }, {
                key: 'realtipotransf',
                title: 'Tipo Transf.',
                sortable: true,
                hide: 'hidden-sm hidden-xs'
            }, {
                key: 'linkedid',
                title: 'Id',
                sortable: true,
                hide: 'hidden-sm hidden-xs'
            }];
            
            $scope.showDetails = function (item) {
                $state.go('app.ligacao.detalhes', {detalhes:item})                
            }

            $scope.openDatepicker = function(e){
                $(e.currentTarget).prev().focus();
                e.preventDefault();
            }

            $scope.range = {
                startDate: moment(moment().subtract(6, 'days'), moment()).format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            }

            $scope.$watch('range', function(newRange){
                if(newRange){
                    LigacaoService.get({
                        date_start : newRange.startDate,
                        date_end : newRange.endDate
                    }).then(function(response){                        
                        $scope.rows = searchFilter(response.data, $scope.search);
                        $scope.originalRows = response.data;
                    });
                }                
            });

            $scope.$watch('search', function(newStr){
                $scope.rows = searchFilter($scope.originalRows, newStr);
            });
        
            $scope.options = {
                locale: {
                    format: 'DD/MM/YYYY',
                    separator: '-',
                    applyLabel: "Confirmar",
                    fromLabel: "De",
                    toLabel: "Até",
                    cancelLabel: 'Cancelar',
                    customRangeLabel: 'Período Customizado',
                    daysOfWeek: [
                        'Dom',
                        'Seg',
                        'Ter',
                        'Qua',
                        'Qui',
                        'Sex',
                        'Sáb'
                    ],
                    firstDay: 1,
                    monthNames: [
                        'Janeiro',
                        'Fevereiro',
                        'Março',
                        'Abril',
                        'Maio',
                        'Junho',
                        'Julho',
                        'Agosto',
                        'Setembro',
                        'Outrubro',
                        'Novembro',
                        'Dezembro'
                    ]
                },
                ranges: {
                    'Hoje': [
                        moment().subtract(0, 'days'), moment()
                    ],
                    'Últimos 7 dias': [
                        moment().subtract(6, 'days'), moment()
                    ],
                    'Últimos 30 dias': [
                        moment().subtract(29, 'days'), moment()
                    ]
                }
            }
         }
      ]
   )
   .controller('LigacaoDetalhesCtrl', [
      '$scope',
      '$http',
      'settings',
      'LigacaoService',
      'searchFilter',
      '$stateParams',
      function(
         $scope,
         $http,
         settings,
         LigacaoService,
         searchFilter,
         $stateParams) {
            $scope.detalhes = $stateParams.detalhes;


            console.log($scope.detalhes)
        }
    ])
   .filter('search', function() {
        return function(rows, str) {
            rows = rows || [];
            
            return rows.filter(function(row){
                return Object.keys(row).some(function(key){
                    return new RegExp(str, 'gi').test(row[key].toString());
                })
            });
        };
    })
})();
