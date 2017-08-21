(function(){
   angular.module('NipCentral')
   .controller('NavbarCtrl', [
      '$scope',
      'localStorageService',
      function(
         $scope,
         localStorageService) {
             $scope.logout = function(){
                localStorageService.clearAll();
             }
         }
      ]
   );
})();
