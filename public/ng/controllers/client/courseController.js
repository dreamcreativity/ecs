'use strict';
angular.module('ClientApp')
.controller('CalculatorCtrl',function CalculatorCtrl($rootScope,$scope,$http,Courses){
	
	$scope.courseList = [];
	$scope.calculatedCourses = [];
	$scope.calculatedTotal = 0;


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

	$scope.$watch(
	  'courseList',
	  function(newValue,oldValue) {
	   	
	      	var total = 0;

			angular.forEach($scope.courseList, function(course, key) {
				total += course.selectDuration.price;
			}, function(){

			});
	      	$scope.calculatedTotal = total;
	      	console.log(total);
		  	    
	  }, 
	  true
	);


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
			$scope.courseList.push({
				id : course._id,
				title: course.title,
				selectDuration: { _id: '', title:'Select a Duration', price: 0, week : 1},
				startDate: data.data[0],
				durations: course.durations,
				startDates: data.data,
			});
			closeAllSelectList();
			setTimeout(function(){
				initTitleBox();	
			},50);
		})


	}

	$scope.changeCourse = function(currentCourse, targetCourse){

		currentCourse.id = targetCourse._id;
		currentCourse.title = targetCourse.title;
		currentCourse.selectDuration =  { _id: '', title:'Select a Duration', price: 0, week : 1},
		currentCourse.durations = targetCourse.durations;
		closeAllSelectList();

	}

	$scope.changeDuration = function(currentDuration, targetDuration){

		currentDuration._id = targetDuration._id;
		currentDuration.title = targetDuration.title;
		currentDuration.price = targetDuration.price;
		currentDuration.week = targetDuration.week;

		closeAllSelectList();

	}



	
});