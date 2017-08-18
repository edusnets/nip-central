(function(){
    angular.module('NipCentral')
    .service('LigacaoService', [
       '$http',
        'settings',
        function($http, settings){

            function get(filter){                
                return $http.post(settings + '/ligacao', filter);                
            }

            return {
                get: get
            }
        }
    ])
})();