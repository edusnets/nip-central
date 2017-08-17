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
            }
         })
         .state('app.login', {
            url: 'login',
            views: {
               'content': {
                  controller : 'LoginCtrl',
                  templateUrl: 'src/modules/login/view.html'
               }
            }
         })
         .state('app.ligacao', {
            url: 'ligacao',
            views: {
               'content': {
                  controller : 'LigacaoCtrl',
                  templateUrl: 'src/modules/ligacao/view.html'
               }
            }
         });
      }
   ]);
})();
