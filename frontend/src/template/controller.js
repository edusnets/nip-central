(function(){
   angular.module('NipCentral')
   .controller('NavbarCtrl', [
      '$scope',
      'settings',
      'localStorageService',
      function(
         $scope,
         settings,
         localStorageService) {
             $scope.logout = function(){
                localStorageService.clearAll();
             }
         }
      ]
   );
})();
