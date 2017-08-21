(function(){
    angular.module('NipCentral')
    .service('LigacaoService', [
       '$http',
        'settings',
        function($http, settings){

            function get(filter){                
                return $http.post(settings.api + '/ligacao', filter);                
            }

            return {
                get: get
            }
        }
    ])
})();