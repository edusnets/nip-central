(function(){
   angular.module('NipCentral')
   .controller('LigacaoCtrl', [
      '$scope',
      '$http',
      'settings',
      function(
         $scope,
         $http,
         settings) {            
            console.log('ligação')
         }
      ]
   );
})();
