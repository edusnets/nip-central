(function () {
  angular.module('NipCentral')
    .controller('LigacaoCtrl', [
      '$scope',
      '$rootScope',
      'LigacaoService',
      function (
        $scope,
        $rootScope,
        LigacaoService) {
        $scope.$on('$stateChangeStart',
          function (event, toState, toParams, fromState, fromParams) {
            $scope.state = toState.name;
          })
      }
    ])
    .controller('LigacaoPesquisaCtrl', [
      '$scope',
      '$rootScope',
      '$state',
      'LigacaoService',
      'searchFilter',
      'searchwithFilter',
      'ProgressBarsStorage',
      'fancytimeFilter',
      'ptbrdateFilter',
      'maptranslateFilter',
      function (
        $scope,
        $rootScope,
        $state,
        LigacaoService,
        searchFilter,
        searchwithFilter,
        ProgressBarsStorage,
        fancytimeFilter,
        ptbrdateFilter,
        maptranslateFilter) {

        var progressBarTop = ProgressBarsStorage.get('main');

        $rootScope.state = 'app.ligacao';

        $scope.rows = [];

        $scope.fields = [{
          key: 'date',
          title: 'Data',
          sortable: true,
          onRender: function (val) {
            return ptbrdateFilter(val)
          }
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
          onRender: function (val) {
            return fancytimeFilter(val);
          }
        }, {
          key: 'faturado',
          title: 'Tarifado',
          sortable: true,
          hide: 'hidden-sm hidden-xs',
          onRender: function (val) {
            return fancytimeFilter(val);
          }
        }, {
          key: 'status',
          title: 'Status',
          sortable: true,
          onRender: function (val) {
            if (val == 'ANSWERED' || val == 'Atendida') {
              return 'Atendida';
            } else if (val == 'NO ANSWER' || val == 'Não atendida') {
              return 'Não atendida';
            }
          }
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
          title: 'Transf. Por',
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
          key: 'ligacao_id',
          title: 'Id',
          sortable: true,
          hide: 'hidden-sm hidden-xs'
        }];

        $scope.showDetails = function (item) {
          item.dateView = ptbrdateFilter(item.date)
          item.duracaoView = fancytimeFilter(item.duracao);
          item.faturadoView = fancytimeFilter(item.faturado);
          item.statusView = maptranslateFilter(item.status);

          $state.go('app.ligacao.detalhes', { id: item.id, detalhes: item })
        }

        $scope.openDatepicker = function (e) {
          $(e.currentTarget).prev().focus();
          e.preventDefault();
        }

        $scope.sentido = '';
        $scope.status = '';
        $scope.searchString = '';

        $scope.statusBtn = {
          todas: true,
          at: false,
          na: false
        };

        $scope.setStatus = function (newStatus) {
          switch (newStatus) {
            case 'AT':
              $scope.statusBtn = {
                todas: false,
                at: true,
                na: false
              };
              $scope.status = 'ANSWERED';
              break;

            case 'NA':
              $scope.statusBtn = {
                todas: false,
                at: false,
                na: true
              };
              $scope.status = 'NO ANSWER';
              break;

            default:
              $scope.statusBtn = {
                todas: true,
                at: false,
                na: false
              };
              $scope.status = '';
              break;
          }

          // $scope.rows = searchFilter($scope.originalRows, [$scope.sentido, $scope.status, $scope.searchString]);
          $scope.rows = searchFilter($scope.originalRows, $scope.sentido);
          $scope.rows = searchFilter($scope.rows, $scope.status);
          $scope.rows = searchwithFilter($scope.rows, $scope.searchString);
        }

        $scope.statusBtnSentido = {
          todas: true,
          entrante: false,
          sainte: false,
          interno: false,
          forward: false
        };

        $scope.setSentido = function (sentido) {
          switch (sentido) {
            case 'entrante':
              $scope.statusBtnSentido = {
                todas: false,
                entrante: true,
                sainte: false,
                interno: false,
                forward: false
              };
              $scope.sentido = 'Entrante';
              break;

            case 'sainte':
              $scope.statusBtnSentido = {
                todas: false,
                entrante: false,
                sainte: true,
                interno: false,
                forward: false
              };
              $scope.sentido = 'Sainte';
              break;

            case 'interno':
              $scope.statusBtnSentido = {
                todas: false,
                entrante: false,
                sainte: false,
                interno: true,
                forward: false
              };
              $scope.sentido = 'Interno';
              break;

            case 'forward':
              $scope.statusBtnSentido = {
                todas: false,
                entrante: false,
                sainte: false,
                interno: false,
                forward: true
              };
              $scope.sentido = 'Forward';
              break;

            default:
              $scope.statusBtnSentido = {
                todas: true,
                entrante: false,
                sainte: false,
                interno: false,
                forward: false
              };
              $scope.sentido = '';
              break;
          }
          // $scope.rows = searchFilter($scope.originalRows, [$scope.sentido, $scope.status, $scope.searchString]);
          $scope.rows = searchFilter($scope.originalRows, $scope.sentido);
          $scope.rows = searchFilter($scope.rows, $scope.status);
          $scope.rows = searchwithFilter($scope.rows, $scope.searchString);
        }

        $scope.range = {
          startDate: moment(),
          endDate: moment()
        }

        $scope.$watch('range', function (newRange) {
          if (newRange) {
            progressBarTop.start();
            LigacaoService.get({
              date_start: newRange.startDate.startOf('day'),
              date_end: newRange.endDate.startOf('day')
            }).then(function (response) {
              // $scope.rows = searchFilter(response.data.data, [$scope.sentido, $scope.status, $scope.searchString]);
              $scope.originalRows = response.data.data;
              $scope.rows = searchFilter($scope.originalRows, $scope.sentido);
              $scope.rows = searchFilter($scope.rows, $scope.status);
              $scope.rows = searchwithFilter($scope.rows, $scope.searchString);
            }).finally(function () {
              progressBarTop.done();
            });
          }
        });

        $scope.$watch('search', function (newStr) {
          $scope.searchString = newStr;
          // $scope.rows = searchFilter($scope.originalRows, [$scope.sentido, $scope.status, newStr]);
          $scope.rows = searchFilter($scope.originalRows, $scope.sentido);
          $scope.rows = searchFilter($scope.rows, $scope.status);
          $scope.rows = searchwithFilter($scope.rows, $scope.searchString);
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
              'Outubro',
              'Novembro',
              'Dezembro'
            ]
          },
          dateLimit: {
            "days": 31
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
      '$rootScope',
      '$stateParams',
      'LigacaoService',
      '$location',
      'fancytimeFilter',
      'ptbrdateFilter',
      'maptranslateFilter',
      function (
        $scope,
        $rootScope,
        $stateParams,
        LigacaoService,
        $location,
        fancytimeFilter,
        ptbrdateFilter,
        maptranslateFilter) {

        $scope.audioFile = false;

        $rootScope.state = 'app.ligacao.detalhes';
        var ligacaoID = parseInt($stateParams.id)
        if (!$stateParams.detalhes) {
          LigacaoService.getDetails(ligacaoID).then(function (resp) {
            $scope.detalhes = resp.data.data
            $scope.detalhes.dateView = ptbrdateFilter(resp.data.data.date);
            $scope.detalhes.duracaoView = fancytimeFilter(resp.data.data.duracao);
            $scope.detalhes.faturadoView = fancytimeFilter(resp.data.data.faturado);
            $scope.detalhes.statusView = maptranslateFilter(resp.data.data.status);
            getAudio();
          }, function () {
            console.error('fail to retrieve call details')
          })
        } else {
          $scope.detalhes = $stateParams.detalhes;
          getAudio()
        }

        function getAudio() {
          $scope.audioFileHidden = false;
          $scope.audioFileLoading = true;

          LigacaoService.getAudio($scope.detalhes.id).then(
            function (result) {
              if (result.data.data.audio == undefined) {
                $scope.audioFileHidden = true;
              } else {
                $scope.audioFile = true;
                $scope.audioFile = result.data.data.audio;
                $scope.audioFileLoading = false;
              }
              $scope.audioFileLoading = false;
            },
            function (result) {
              console.error('fail to retrieve audio call')
            }
          );
        }
      }
    ])
})();
