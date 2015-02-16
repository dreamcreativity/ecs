'use strict';

angular.module('EscApp', [
    	'ngRoute',
    	'controllers.staff',
    	'services.staff'
	])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
    	templateUrl: 'views/login.html',
    	controller: 'LoginController'
    });

    $routeProvider.when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController'
    });

    $routeProvider.when('/staffs', {
        templateUrl: 'views/staff/staffs.html',
        controller: 'StaffController'
    });

    $routeProvider.when('/staffs/create', {
        templateUrl: 'views/staff/create.html',
        controller: 'StaffController'
    });

    $routeProvider.when('/staffs/:id', {
        templateUrl: 'views/staff/edit.html',
        controller: 'StaffController'
    });




    $routeProvider.otherwise({redirectTo: '/'});
}])


.controller('pageCtrl', function($rootScope, $location) {
      if($location.path() === '/login'){
        $rootScope.show_partial_view =false;
      }
      else {
        $rootScope.show_partial_view = true;
      }
})

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
  //$httpProvider.interceptors.push('authInterceptor');
});

