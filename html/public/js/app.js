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

    $routeProvider.otherwise({redirectTo: '/'});
}]);
