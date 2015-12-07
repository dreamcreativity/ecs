'use strict';
angular.module('ClientApp')
.controller('OnlineTestCtrl',function RegisterCtrl($rootScope,$scope,Constants,Students,$window){
	
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.email = '';
	$scope.country = '';

	Constants.get({name: 'Country'}, function(result){
		$scope.countries = result.data;		

		console.log($scope.countries);
	});


	$scope.start = function(){

		
	};
});
