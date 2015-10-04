'use strict';
angular.module('ClientApp')
.controller('CalendarCtrl',function CalendarCtrl($rootScope,$scope,$http,Courses){
	
	$scope.courseList = [];
	$scope.displayCourses = [];
	$scope.calculatedTotal = 0;
	$scope.selectedCurrency = 'Canadian Dollors';

	$scope.currencyList = [
		{ code: 'CAD', description: 'Canadian Dollors', rate: 1.0 },
		{ code: 'USD', description: 'USA Dollors', rate: 1.34 }
	];

	$scope.selectedCurrency = $scope.currencyList[0];


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

	var doCalculation =  function(){
   		$scope.displayCourses = [];
      	var total = 0;

		angular.forEach($scope.courseList, function(course, key) {
			
			if(course.selectDuration.week > 0){

				// deep copy dreation course object
				var tempCourse= jQuery.extend(true, {}, course);
				tempCourse.selectDuration.price *= $scope.selectedCurrency.rate;

				total += tempCourse.selectDuration.price;
				var courseStartDate = new Date(tempCourse.startDate);
				var courseEndDate = new Date(courseStartDate.valueOf());
				courseEndDate.setDate( courseEndDate.getDate() + 7 * tempCourse.selectDuration.week);
			
				$scope.displayCourses.push({
					title: tempCourse.title,
					startDate: tempCourse.startDate,
					endDate: courseEndDate.toJSON(),
					duration: tempCourse.selectDuration
				});			
			}


		}, function(){

		});
      	$scope.calculatedTotal = total;

	}



	$scope.$watch(
	  'courseList',
	  function(newValue,oldValue) {
	  		doCalculation();
	  }, 
	  true
	);

	$scope.$watch(
	  'selectedCurrency',
	  function(newValue,oldValue) {
	  		doCalculation();
	  }, 
	  true
	);

	$scope.changeCurrency =  function(inputCurrency){
		$scope.selectedCurrency = inputCurrency;
		closeAllSelectList();
	}

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
				selectDuration: { _id: '', title:'Select a Duration', price: 0, week : 0},
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
		currentCourse.selectDuration =  { _id: '', title:'Select a Duration', price: 0, week : 0},
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