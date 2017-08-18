(function(){
   angular.module('NipCentral', [
      'ui.router',
      'ngSanitize',
      'LocalStorageModule'
   ])
   .config([
        '$httpProvider',
        '$locationProvider',
        'localStorageServiceProvider',
        function(
            $httpProvider,
            $locationProvider,
            localStorageServiceProvider) {

            localStorageServiceProvider
            .setPrefix('')
            .setStorageType('localStorage')
            .setDefaultToCookie(false);

            // $locationProvider.html5Mode(true).hashPrefix('');

            $httpProvider.interceptors.push([
                '$q',
                'localStorageService',
                '$location',
                'settings',
                function($q, localStorageService, $location, settings){
                    return {
                        'request': function (config) {
                            config.headers = config.headers || {};
                            config.headers.Authorization = 'Bearer ' + localStorageService.get(settings.token);

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
   .constant("settings", {
      api: "http://localhost:8080",
      token: 'nip_central'
   });
})();
