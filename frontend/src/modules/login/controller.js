(function(){
   angular.module('NipCentral')
   .controller('LoginCtrl', [
      '$scope',
      '$http',
      '$state',
      'localStorageService',
      'LoginService',
      'TemplateService',
      'settings',
      function(
         $scope,
         $http,
         $state,
         localStorageService,
         LoginService,
         TemplateService,
         settings) {

            $scope.user = {
                username: "",
                password: ""
            }

            $scope.entrar = function() {
                if (localStorageService.isSupported) {
                    LoginService.entrar($scope.user)
                    .then(function(result) {    
                        localStorageService.set(settings.token, result.data.data.token)
                        $state.go('app.ligacao')
                    },
                    function() {                        
                        alert("Acesso não autorizado!")
                    });

                } else {
                    var link = "https://developer.mozilla.org/pt-BR/docs/Web/API/Window/Window.localStorage";
                    
                    alert("Para acessar o sistema é necessário habilitar a propriedade LocalStorage. Mais informações: " + link);
                }
            }
         }
      ]
   );
})();
