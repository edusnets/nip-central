(function(){
    angular.module('NipCentral')
    .service('TemplateService', [
        'localStorageService',
        function(localStorageService){
            var get = function(){
                var explodeToken    = localStorageService.get('nip_central').split('.');
                return JSON.parse(window.atob(explodeToken[1]));
            }

            return {
                get: get
            }
        }
    ])
})();