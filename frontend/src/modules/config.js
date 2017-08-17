(function(){
   angular.module('NipCentral', [
      'ui.router',
      'ngSanitize'
   ])
   .config([
        '$httpProvider',
        '$locationProvider',
        function(
            $httpProvider,
            $locationProvider) {

            $locationProvider.html5Mode(true).hashPrefix('');
            
            $httpProvider.defaults.useXDomain = true;            
            delete $httpProvider.defaults.headers.common['X-Requested-With'];            
        }
   ])
   .constant("settings", {
      api: "http://localhost:8080"
   });
})();
