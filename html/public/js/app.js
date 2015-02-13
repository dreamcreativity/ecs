'use strict';

angular.module('EscApp', [
    	'ngRoute',
    	'controllers.staff',
    	'services.staff'
	])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
    	templateUrl: 'subviews/login.html',
    	controller: 'StaffController'
    });

    $routeProvider.when('/home', {
    	templateUrl: 'subviews/home.html',
    	controller: 'StaffController'
    });

    $routeProvider.when('/staffs', {
    	templateUrl: 'subviews/staffs.html',
    	controller: 'StaffController'
    });

    $routeProvider.when('/admin/dashboard', {
        templateUrl: 'subviews/dashboard.html',
        controller: 'StaffController'
    });



    $routeProvider.otherwise({redirectTo: '/'});
}])

.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      if (response.status === 403) {
        console.log('please log in ');
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

