//auth

'use strict';

var app = angular.module('esc.auth', [])

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
	    config.headers = config.headers || {};

      console.log('999999999999999');
      console.log($window.sessionStorage.token);
  		if ($window.sessionStorage.token) {


  			config.headers.api_token = $window.sessionStorage.token ;
  	    console.log(config.headers.api_token );
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
          //window.location = '/admin/login';
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
