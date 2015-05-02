'use strict';

angular.module('AdminApp',['esc.auth']).controller('NavBarController', [ '$scope','$http','$window','$location', function($scope,$http,$window,$location){
	$scope.ssss = 'test';

	$scope.logout = function(){
		sessionStorage.removeItem('token');
		location = '/admin/login';
	}

}]);
