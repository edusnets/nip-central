(function(){
    angular.module('NipCentral')
    .service('TemplateService', [
        'localStorageService',
        function(localStorageService){
            var get = function(){
                if(localStorageService.get('nip_central')){
                    var explodeToken = localStorageService.get('nip_central').split('.');
                    return JSON.parse(window.atob(explodeToken[1]));
                } else {
                    return;
                }               
            }

            return {
                get: get
            }
        }
    ])
})();