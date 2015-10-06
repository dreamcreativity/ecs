'use strict';

angular.module('AdminApp')

.controller('NavBarController',  function($scope,$http,$window,$location,StaffAccount){
	$scope.ssss = 'test';

	$scope.logout = function(){
		sessionStorage.removeItem('token');
		location = '/admin/login';
	}

	function getAccountInfo(){
		
		return StaffAccount.query({});
	}

	$scope.info = getAccountInfo();

	//console.log($scope.info);

});

