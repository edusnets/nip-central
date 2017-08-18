(function(){
    angular.module('NipCentral')
    .service('LigacaoService', [
        '$http',
        function($http){
            function get(){
                return $http.get('http://www.mocky.io/v2/59964c8f110000020dcc4424');
            }

            return {
                get: get
            }
        }
    ])
})();