'use strict';
angular.module('ClientApp')
.controller('CalculatorCtrl',function CalculatorCtrl($rootScope,$scope,$http,Courses){
	
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
			
			if(course.selectDuration.week > 0 ){
				// deep copy dreation course object
				var tempCourse= jQuery.extend(true, {}, course);

				if(tempCourse.level == 'PartTime' || tempCourse.level == 'Standard' || tempCourse.level == 'Intensive' ){

					tempCourse.selectDuration.price *= $scope.selectedCurrency.rate;

					if(tempCourse.level == 'PartTime')
						tempCourse.selectDuration.price = tempCourse.selectDuration.pricePartTime;
					if(tempCourse.level == 'Standard')
						tempCourse.selectDuration.price = tempCourse.selectDuration.priceStandard;
					if(tempCourse.level == 'Intensive')
						tempCourse.selectDuration.price = tempCourse.selectDuration.priceIntensive;


					total += tempCourse.selectDuration.price;
					var courseStartDate = new Date(tempCourse.startDate);
					var courseEndDate = new Date(courseStartDate.valueOf());
					courseEndDate.setDate( courseEndDate.getDate() + 7 * tempCourse.selectDuration.week);
				
					$scope.displayCourses.push({
						title: tempCourse.title,
						startDate: tempCourse.startDate,
						endDate: courseEndDate.toJSON(),
						duration: tempCourse.selectDuration,
						level: tempCourse.level
					});	

				}


		
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
				selectDuration: { _id: '', title:'Select a duration', price: 0, week : 0},
				startDate: data.data[0],
				durations: course.durations,
				level: 'Select a Program',
				startDates: data.data,
			});
			closeAllSelectList();
			setTimeout(function(){
				initTitleBox();	
			},50);
		})


	}

	$scope.clearAllSelectCourse = function(){
		$scope.courseList = [];
	}


	$scope.changeCourse = function(currentCourse, targetCourse){

		currentCourse.id = targetCourse._id;
		currentCourse.title = targetCourse.title;
		currentCourse.selectDuration =  { _id: '', title:'Select a Duration', price: 0, week : 0},
		currentCourse.durations = targetCourse.durations;
		closeAllSelectList();

		$scope.changeStartYear(currentCourse,$scope.availableYears[0]);

	}

	$scope.changeDuration = function(currentCourse, targetDuration){

		currentCourse.selectDuration._id = targetDuration._id;
		currentCourse.selectDuration.title = targetDuration.title;
		currentCourse.selectDuration.price = targetDuration.price;
		currentCourse.selectDuration.week = targetDuration.week;
		currentCourse.selectDuration.priceIntensive = targetDuration.priceIntensive;
		currentCourse.selectDuration.priceStandard = targetDuration.priceStandard;
		currentCourse.selectDuration.pricePartTime = targetDuration.pricePartTime;
		currentCourse.level = 'Select a level';
		closeAllSelectList();

	}

	$scope.changeLevel = function(currentCourse, targetLevel){

		currentCourse.level = targetLevel;
		closeAllSelectList();

	}





	
});