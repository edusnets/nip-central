(function(){
    angular.module('NipCentral')
    .service('LigacaoService', [
        '$http',
        function($http){
            
            function get(filter){                
                return $http.post('http://www.mocky.io/v2/5997128c13000003028b787e');                
            }

            return {
                get: get
            }
        }
    ])
})();