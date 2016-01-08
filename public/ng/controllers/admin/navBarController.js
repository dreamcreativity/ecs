'use strict';

angular.module('AdminApp')


.controller('NavSideMenuController',  function($scope,$rootScope){




})


.controller('NavBarController',  function($scope,$rootScope,$http,$window,$location,StaffAccount){


	$scope.logout = function(){
		sessionStorage.removeItem('token');
		location = '/admin/login';
	}

	function getAccountInfo(){
		
		return StaffAccount.query({});
	}




	// $scope.info = getAccountInfo();
	// $rootScope.accountInfo = $scope.info.data;
	// console.log($rootScope.accountInfo);

	StaffAccount.query({},function(result){

		$scope.info = result;

		$rootScope.accountInfo = $scope.info.data;

	});

});

