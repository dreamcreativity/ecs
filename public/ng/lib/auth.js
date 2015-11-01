//auth

'use strict';

var app = angular.module('esc.auth', [])

app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
	    config.headers = config.headers || {};
  		if ($window.sessionStorage.token) {
  			config.headers.api_token = sessionStorage.token ;
  	    //console.log($window.sessionStorage.token );
  		}
  		return config;
    },
    responseError: function (response) {
      console.log(response.status);
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      if (response.status === 403) {
        //console.log('please log in ');
        var pathname = $window.location.pathname.substr($window.location.pathname.indexOf("/")+1).split(/\//)[0];
        if(pathname == 'admin'){
          window.location = '/admin/login';
        }
        else window.location = '/agent/login';
      }
      return response || $q.when(response);
    }
  };
})


.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
