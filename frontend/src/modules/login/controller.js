(function(){
   angular.module('NipCentral')
   .controller('LoginCtrl', [
      '$scope',
      '$http',
      'settings',
      function(
         $scope,
         $http,
         settings) {
            console.log('login')
         }
      ]
   );
})();
