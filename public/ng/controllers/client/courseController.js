'use strict';
angular.module('ClientApp')
.controller('CalculatorCtrl',function CalculatorCtrl($rootScope,$scope,$http,Courses){
	
	$scope.courseList = [];
	


	Courses.getSimpleList(function(data){
		$scope.courses = data.data;
		console.log($scope.courses);

	})

	var today = new Date();
	$scope.availableYears = [
		today.getFullYear(),
		today.getFullYear()+1,
		today.getFullYear()+2
	];


	$scope.changeStartYear =  function(course, year){

		Courses.getCourstStartDateList({id:course.id, year:year}, function(data){
			course.startDate = data.data[0];
			course.startDates = data.data;
			closeAllSelectList();
		});
	}

	$scope.changeStartDate = function(course, startDate){
		course.startDate =  startDate;
		closeAllSelectList();
	}


	$scope.addCourse = function(course){

		Courses.getCourstStartDateList({id:course._id, year:$scope.availableYears[0]}, function(data){


			console.log(data);
			$scope.courseList.push({
				id : course._id,
				title: course.title,
				selectDuration: { _id: '', title:'Select a Duration'},
				startDate: data.data[0],
				durations: course.durations,
				startDates: data.data,
			});


			closeAllSelectList();


			setTimeout(function(){
				initTitleBox();	
			},50);
		})

		
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