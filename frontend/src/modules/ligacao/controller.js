(function () {
  angular.module('NipCentral')
    .controller('LigacaoCtrl', [
      '$scope',
      '$rootScope',
      'LigacaoService',
      'searchFilter',
      function (
        $scope,
        $rootScope,
        LigacaoService,
        searchFilter) {
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
      'ProgressBarsStorage',
      function (
        $scope,
        $rootScope,
        $state,
        LigacaoService,
        searchFilter,
        ProgressBarsStorage) {

        var progressBarTop = ProgressBarsStorage.get('main');

        $rootScope.state = 'app.ligacao';

        $scope.rows = [];

        function fancyTimeFormat(time) {
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

        function ptBrFormat(datetime) {
          return datetime.substr(8, 2) + '/' + datetime.substr(5, 2) + '/' + datetime.substr(0, 4) + ' ' + datetime.substr(11, 8)
        }

        $scope.fields = [{
          key: 'date',
          title: 'Data',
          sortable: true,
          onRender: function (val) {
            return ptBrFormat(val)
          }
          // formatDate: 'dd/MM/yyyy HH:mm:ss'
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
            return fancyTimeFormat(val);
          }
        }, {
          key: 'faturado',
          title: 'Tarifado',
          sortable: true,
          hide: 'hidden-sm hidden-xs',
          onRender: function (val) {
            return fancyTimeFormat(val);
          }
        }, {
          key: 'status',
          title: 'Status',
          sortable: true,
          onRender: function (val) {
            if (val == 'ANSWERED' || val == 'Atendida') {
              return 'Atendida';
            } else if (val == 'NOT ANSWER' || val == 'Não atendida') {
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

        function translateStatus(status){
          switch(status){
            case 'ANSWERED':
              return 'Atendida';
              break;

            case 'NO ANSWER':
              return 'Não atendida';
              break;
          }
        }

        $scope.showDetails = function (item) {
          item.dateView = ptBrFormat(item.date)
          item.duracaoView = fancyTimeFormat(item.duracao);
          item.faturadoView = fancyTimeFormat(item.faturado);
          item.status = translateStatus(item.status);
          $state.go('app.ligacao.detalhes', { id: item.id , detalhes: item})
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

          $scope.rows = searchFilter($scope.originalRows, [$scope.sentido, $scope.status, $scope.searchString]);
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

          $scope.rows = searchFilter($scope.originalRows, [$scope.sentido, $scope.status, $scope.searchString]);
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
              $scope.rows = searchFilter(response.data.data, [$scope.sentido, $scope.status, $scope.searchString]);
              $scope.originalRows = response.data.data;
            }).finally(function () {
              progressBarTop.done();
            });
          }
        });

        $scope.$watch('search', function (newStr) {
          $scope.searchString = newStr;
          $scope.rows = searchFilter($scope.originalRows, [newStr, $scope.status, $scope.sentido]);
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
      function (
        $scope,
        $rootScope,
        $stateParams,
        LigacaoService,
        $location) {

        function fancyTimeFormat(time) {
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

        function ptBrFormat(datetime) {
          return datetime.substr(8, 2) + '/' + datetime.substr(5, 2) + '/' + datetime.substr(0, 4) + ' ' + datetime.substr(11, 8)
        }

        function translateStatus(status){
          switch(status){
            case 'ANSWERED':
              return 'Atendida';
              break;

            case 'NO ANSWER':
              return 'Não atendida';
              break;
          }
        }

        $scope.audioFile = false;
        
        $rootScope.state = 'app.ligacao.detalhes';
        var ligacaoID = parseInt($stateParams.id)
        if (!$stateParams.detalhes) {
          LigacaoService.getDetails(ligacaoID).then(function (resp) {
            $scope.detalhes = resp.data.data
            $scope.detalhes.dateView      = ptBrFormat(resp.data.data.date);
            $scope.detalhes.duracaoView   = fancyTimeFormat(resp.data.data.duracao);
            $scope.detalhes.faturadoView  = fancyTimeFormat(resp.data.data.faturado);
            $scope.detalhes.status        = translateStatus(resp.data.data.status);
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
              if(result.data.data.audio == undefined){
                $scope.audioFileHidden  = true;
              }else{
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
    .filter('search', function () {

      function fancyTimeFormat(time) {
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

      function ptBrFormat(datetime) {
        return datetime.substr(8, 2) + '/' + datetime.substr(5, 2) + '/' + datetime.substr(0, 4) + ' ' + datetime.substr(11, 8)
      }

      Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      };

      return function (rows, str) {
        rows = rows || [];
        return rows.filter(function (row) {
          var rowArray = Object.keys(row).map(function (key) { return row[key]; });
          var rowTest = angular.copy(row);
          rowTest['duracao'] = fancyTimeFormat(rowTest['duracao']);
          rowTest['faturado'] = fancyTimeFormat(rowTest['faturado']);
          rowTest['date'] = ptBrFormat(rowTest['date']);

          var fullRowStr = '';
          var elementItem = '';

          for (elementItem in rowTest) {
            fullRowStr += rowTest[elementItem] + '|';
          }

          if (str && Array.isArray(str)) {
            var find = 0;
            var validParams = 0;

            for (var i = 0; i < str.length; i++) {
              if (str[i] != '' && str[i] != undefined) {
                validParams++;
                if (new RegExp(str[i], 'gi').test(fullRowStr)) {
                  find++;
                }
              }
            }

            if (find == validParams) {
              return true;
            }
          }

          return Object.keys(rowTest).some(function (key) {
            if (rowTest[key]) {
              return new RegExp(str, 'gi').test(rowTest[key].toString());
            }
          });
        });
      };
    })
})();
