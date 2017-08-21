(function(){
   angular.module('NipCentral')
   .controller('NavbarCtrl', [
      '$scope',
      'localStorageService',
      'TemplateService',
      function(
         $scope,
         localStorageService,
         TemplateService) {
             $scope.payload = TemplateService.get();
         
             $scope.logout = function(){
                localStorageService.clearAll();
             }
         }
      ]
   );
})();
