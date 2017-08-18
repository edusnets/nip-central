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
            url: '/',
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
            resolve: ['localStorageService', 'settings', '$location',
                function(localStorageService, settings, $location) {                    
                    if(!localStorageService.get(settings.token)){                        
                        $location.href('/login')
                    }
                }
            ]
         })         
         .state('app.ligacao', {
            url: 'ligacao',
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
            url: '/detalhes',
            views: {
               'ligacao@app.ligacao': {
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
            resolve: ['localStorageService', 'settings', '$location',
                function(localStorageService, settings, $location) {                    
                    if(localStorageService.get(settings.token)){                        
                        $location.href('/ligacao')
                    }
                }
            ]
         });
      }
   ]);
})();
