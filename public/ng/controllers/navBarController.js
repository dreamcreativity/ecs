'use strict';

var app = angular.module('AdminApp');

app.controller('NavBarController', [ '$scope','$http','$window','$location', function($scope,$http,$window,$location){
	$scope.ssss = 'test';

	$scope.logout = function(){
		sessionStorage.removeItem('token');
		location = '/admin/login';
	}

}]);
