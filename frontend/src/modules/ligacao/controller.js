(function(){
   angular.module('NipCentral')
   .controller('LigacaoCtrl', [
      '$scope',
      '$http',
      'settings',
      'LigacaoService',
      function(
         $scope,
         $http,
         settings,
         LigacaoService) {            
            LigacaoService.get()
            .then(function(response){
                $scope.ligacoes = response.data;
            }, function(err){
                alert(err)
            })   
         }
      ]
   );
})();
