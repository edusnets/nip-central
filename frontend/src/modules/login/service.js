(function(){
    angular.module('NipCentral')
    .service('LoginService', [
        '$http',
        'Settings',
        function($http, Settings){

            function entrar(credentials){
                return $http.post(Settings.api + '/login', credentials);                
            }

            return {
                entrar: entrar
            }
        }
    ])
})();