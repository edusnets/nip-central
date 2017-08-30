(function(){
   angular.module('NipCentral')
   .config([
      '$stateProvider',
      '$urlRouterProvider',
      function(
         $stateProvider,
         $urlRouterProvider) {

         $urlRouterProvider.otherwise('/login');
         
         $stateProvider
         .state('app', {
            url: '',
            views: {
               'app': {
                  templateUrl: 'src/template/app.html'
               },
               'navbar@app': {
                  templateUrl: 'src/template/parts/navbar.html',
                  controller: 'NavbarCtrl'
               },
               'main@app': {
                  templateUrl: 'src/template/parts/main-content.html'
               }
            }, 
            resolve: ['localStorageService', 'Settings', '$location', '$q',
                function(localStorageService, Settings, $location, $q) {
                    return $q(function(resolve, reject) {
                        if(localStorageService.get(Settings.token)){
                            resolve()                           
                        } else {                            
                            location.href = '/login';
                        }
                    }).then(function(){
                        return true;
                    })
                    
                }
            ]
         })         
         .state('app.ligacao', {            
            url: '/ligacao',
            views: {
               'content': {
                  controller : 'LigacaoCtrl',
                  templateUrl: 'src/modules/ligacao/wrap.view.html'
               },
               'ligacao@app.ligacao': {
                  controller : 'LigacaoPesquisaCtrl',
                  templateUrl: 'src/modules/ligacao/pesquisa.view.html'
               }
            }
         })
         .state('app.ligacao.detalhes', {
            url: '/detalhes/:id',
            views: {
               'details@app.ligacao': {
                  controller : 'LigacaoDetalhesCtrl',
                  templateUrl: 'src/modules/ligacao/detalhes.view.html'
               }
            },
            params: {detalhes : null}
         })
        .state('login', {
            url: '/login',
            views: {
               'app': {
                  controller : 'LoginCtrl',
                  templateUrl: 'src/modules/login/view.html'
               }
            },
            resolve: ['localStorageService', 'Settings', '$location',
                function(localStorageService, Settings, $location) {
                    if(localStorageService.get(Settings.token)){                            
                        $location.path('/ligacao');
                    }                    
                }
            ]
         });
      }
   ]);
})();
