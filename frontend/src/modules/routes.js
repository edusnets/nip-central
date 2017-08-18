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
                  templateUrl: 'src/template/parts/navbar.html'
               },
               'main@app': {
                  templateUrl: 'src/template/parts/main-content.html'
               }
            }, 
            resolve: ['localStorageService', 'settings', '$location',
                function(localStorageService, settings, $location) {                    
                    if(!localStorageService.get(settings.token)){                        
                        $location.path('/login')
                    }
                }
            ]
         })         
         .state('app.ligacao', {
            url: 'ligacao',
            views: {
               'content': {
                  controller : 'LigacaoCtrl',
                  templateUrl: 'src/modules/ligacao/view.html'
               }
            }
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
                        $location.path('/ligacao')
                    }
                }
            ]
         });
      }
   ]);
})();
