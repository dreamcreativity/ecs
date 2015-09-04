'use strict';
angular.module('ClientApp')
.controller('CalculatorCtrl',function CalculatorCtrl($rootScope,$scope,$http,Courses){
	
	$scope.courseList = [];

	Courses.getSimpleList(function(data){
		$scope.courses = data.data;
		console.log($scope.courses);
	})



	$scope.addCourse = function(course){
		$scope.courseList.push({
			id : course._id,
			title: course.title,
			duration: '',
			
		});
	}
	
});