'use strict';
angular.module('ClientApp')
.controller('MenuCtrl',function RegisterCtrl($rootScope,$scope,Courses,$window){
	
	
	Courses.query(function(result){

		$scope.courses = result.data;
		console.log($scope.courses );
	});

});
