(function(){
   angular.module('NipCentral', [
      'ui.router',
      'ngSanitize',
      'LocalStorageModule',
      'daterangepicker',
      'ngMinimalGrid'
   ])
   .config([
        '$httpProvider',
        '$locationProvider',
        'localStorageServiceProvider',
        'minimalGridConfigProvider',
        function(
            $httpProvider,
            $locationProvider,
            localStorageServiceProvider,
            minimalGridConfigProvider) {

            localStorageServiceProvider
            .setPrefix('')
            .setStorageType('localStorage')
            .setDefaultToCookie(false);

            // $locationProvider.html5Mode(true).hashPrefix('');

            minimalGridConfigProvider.setStatsMessage('Mostrando %1 à %2 de %3 resultados')
            minimalGridConfigProvider.setFirstLabel('Primeiro')
            minimalGridConfigProvider.setLastLabel('Último')

            $httpProvider.interceptors.push([
                '$q',
                'localStorageService',
                '$location',
                'Settings',
                function($q, localStorageService, $location, Settings){
                    return {
                        'request': function (config) {
                            config.headers = config.headers || {};
                            config.headers.Authorization = localStorageService.get(Settings.token);

                            return config;
                        },
                        'responseError': function (response) {                            
                            if (response.status == 401) {
                                localStorageService.clear();                                
                                $location.path('/login')
                            }

                            return $q.reject(response)
                        }
                    };                    
                }
            ]);

            $httpProvider.defaults.useXDomain = true;

            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
   ])
   .constant("env", "dev"); //dev || dev-remote || prod
})();
