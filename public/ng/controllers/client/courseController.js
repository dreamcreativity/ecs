'use strict';
angular.module('ClientApp')
.controller('CalculatorCtrl',function CalculatorCtrl($rootScope,$scope,$http,Courses){
	
	$scope.courseList = [];
	$scope.cid = '55e91280359487e339e074c2';


	Courses.getSimpleList(function(data){
		$scope.courses = data.data;
		console.log($scope.courses);
	})



	$scope.addCourse = function(course){
		$scope.courseList.push({
			id : course._id,
			title: course.title,
			selectDuration: { _id: '', title:'Select a Duration'},
			durations: course.durations,
		});


		closeAllSelectList();


		setTimeout(function(){
			initTitleBox();	
		},50);
		
		//console.log($scope.courseList);
	}

	$scope.changeCourse = function(currentCourse, targetCourse){

		currentCourse.id = targetCourse._id;
		currentCourse.title = targetCourse.title;
		currentCourse.selectDuration =  { _id: '', title:'Select a Duration'};
		currentCourse.durations = targetCourse.durations;
		closeAllSelectList();

	}

	$scope.changeDuration = function(currentDuration, targetDuration){

		currentDuration._id = targetDuration._id;
		currentDuration.title = targetDuration.title;
		currentDuration.price = targetDuration.price;
		currentDuration.week = targetDuration.week;

		//currentDuration = targetDuration;
		console.log(currentDuration);
		closeAllSelectList();

	}


	$scope.show = function(course){
		console.log($scope.courseList);
	}
	
});