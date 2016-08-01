'use strict';
angular.module('ClientApp')
.controller('MenuCtrl',function RegisterCtrl($rootScope,$scope,Courses,$window){
	Courses.getMenuCourseList(function(result){
		$scope.courses = result.data;
	});

});
