(function(){
    angular.module('NipCentral')
    .service('LoginService', [
        '$http',
        function($http){

            function entrar(credentials){
                if((credentials.email == 'brabo.rodrigo@gmail.com') && (credentials.password == '123')){
                    return $http.get('http://www.mocky.io/v2/59963aca110000cf0bcc4413');
                } else {
                    return $http.get('http://www.mocky.io/v2/59963dba110000f30bcc4416');
                }                
            }

            return {
                entrar: entrar
            }
        }
    ])
})();