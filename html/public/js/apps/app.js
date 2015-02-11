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
    $routeProvider.when('/staffs', {
    	templateUrl: 'subviews/staffs.html',
    	controller: 'StaffController'
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);

//--------------OR-----------------------

/*
var app = angular.module('EscApp',['ngRoute','controllers.staff','services.staff']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.when('/staffs', {
		templateUrl: 'subviews/staffs.html',
		controller: 'StaffController'
	});

	$routeProvider.otherwise({redirectTo: '/'});
}]);

app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
*/