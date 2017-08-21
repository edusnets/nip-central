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
      'ProgressBarsStorage',
      function(
         $scope,
         $http,
         $state,
         settings,
         LigacaoService,
         searchFilter,
         ProgressBarsStorage) {
            
            var progressBarTop = ProgressBarsStorage.get('main');
            $scope.rows = [];

            function fancyTimeFormat(time)
            {   
                // Hours, minutes and seconds
                var hrs = ~~(time / 3600);
                var mins = ~~((time % 3600) / 60);
                var secs = time % 60;

                // Output like "1:01" or "4:03:59" or "123:03:59"
                var ret = "";

                if (hrs > 0) {
                    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
                }

                ret += "" + mins + ":" + (secs < 10 ? "0" : "");
                ret += "" + secs;
                return ret;
            }

            $scope.fields = [{
                key: 'date',
                title: 'Data',
                sortable: true,
                formatDate: 'dd/MM/yyyy HH:mm:ss'
            }, {
                key: 'caller_id',
                title: 'CallerID',
                sortable: true
            }, {
                key: 'origem',
                title: 'Origem',
                sortable: true
            }, {
                key: 'destino',
                title: 'Destino',
                sortable: true
            }, {
                key: 'duracao',
                title: 'Duração',
                sortable: true,
                hide: 'hidden-sm hidden-xs',
                onRender: function(val){
                  return fancyTimeFormat(val);
                }
            }, {
                key: 'faturado',
                title: 'Tarifado',
                sortable: true,
                hide: 'hidden-sm hidden-xs',
                onRender: function(val){
                  return fancyTimeFormat(val);
                }
            },{
                key: 'status',
                title: 'Status',
                sortable: true
            }, {
                key: 'valor',
                title: 'Valor',
                sortable: true
            }, {
                key: 'conta',
                title: 'Conta',
                sortable: true
            }, {
                key: 'transferido_por',
                title: 'Transferido Por',
                sortable: true,
                hide: 'hidden-sm hidden-xs'
            }, {
                key: 'tipo_transferencia',
                title: 'Tipo Transf.',
                sortable: true,
                hide: 'hidden-sm hidden-xs'
            }, {
                key: 'sentido',
                title: 'Sentido',
                sortable: true,
                hide: 'hidden-sm hidden-xs'
            }, {
                key: 'id',
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
                startDate: moment(),
                endDate: moment()
            }

            $scope.$watch('range', function(newRange){
                if(newRange){
                    progressBarTop.start();
                    LigacaoService.get({
                        date_start : newRange.startDate,
                        date_end : newRange.endDate
                    }).then(function(response){                        
                        $scope.rows = searchFilter(response.data.data, $scope.search);
                        $scope.originalRows = response.data.data;
                    }).finally(function(){
                        progressBarTop.done();
                    });
                }                
            });

            $scope.$watch('search', function(newStr){
                $scope.rows = searchFilter($scope.originalRows, newStr);
            });

            $scope.options = {
                locale: {
                    format: 'DD/MM/YYYY',
                    separator: ' - ',
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
                dateLimit: { 
                    "days":31 
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
