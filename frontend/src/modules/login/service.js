(function(){
    angular.module('NipCentral')
    .service('LoginService', [
        '$http',
        'settings',
        function($http, settings){

            function entrar(credentials){
                return $http.post(settings.api + '/login', credentials);                
            }

            return {
                entrar: entrar
            }
        }
    ])
})();