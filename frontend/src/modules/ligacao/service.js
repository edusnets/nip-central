(function(){
    angular.module('NipCentral')
    .service('LigacaoService', [
       '$http',
        'Settings',
        function($http, Settings){

            function get(filter){
                return $http.post(Settings.api + '/ligacao', filter);                
            }

            function getAudio(id){
                return $http.get(Settings.api + '/ligacao/audio/' + id);                
            }

            function getDetails(id){
                return $http.get(Settings.api + '/ligacao/' + id)
            }

            return {
                get: get,
                getAudio: getAudio,
                getDetails: getDetails
            }
        }
    ])
})();