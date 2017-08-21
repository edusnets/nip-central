(function(){
   angular.module('NipCentral')
   .service("Settings", ['env', '$location',
   		function(env, $location){
			var api = "";

			var apiOptions = {
				local : "http://localhost/nip-central/backend",
				remote : "http://192.168.63.95:4445/api"
			};			

			if(env === 'dev') {				
				api = apiOptions.local;
			} else if(env === 'dev-remote'){				
				api = apiOptions.remote;				
			} else if(env === 'prod'){
				var port = "";
				
				if($location.port() != ""){
					port = ":" + $location.port();
				}								

				api = $location.protocol()+"://"+$location.host()+port+"/api";
			}          			

			return {
				api: api,
				token: 'nip_central'
			}
   		}
    ]);
})();
