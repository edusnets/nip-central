(function(){
    angular.module('NipCentral')
    .service('LigacaoService', [
       '$http',
        'Settings',
        function($http, Settings){

            function get(filter){                
                return $http.post(Settings.api + '/ligacao', filter);                
            }

            return {
                get: get
            }
        }
    ])
})();