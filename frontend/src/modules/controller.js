(function(){
   angular.module('NipCentral')
   .controller('NavbarCtrl', [
      '$scope',
      'settings',
      'localStorageService',
      'TemplateService',
      function(
         $scope,
         settings,
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
