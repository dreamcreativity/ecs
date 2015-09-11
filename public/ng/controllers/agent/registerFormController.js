'use strict';
angular.module('AgentApp')

.controller('StudentRegister', function StudentRegister($rootScope, $scope, $http, Registrations,Courses, $window){
	$scope.courseList =[];
	$scope.displayCourses = [];
	var today = new Date();
	$scope.availableYears = [
	today.getFullYear(),
	today.getFullYear()+1,
	today.getFullYear()+2
	];

	$scope.$watch(
		'courseList',
		function(newValue,oldValue) {
			$scope.displayCourses = [];
			var total = 0;

			angular.forEach($scope.courseList, function(course, key) {
				
				if(course.selectDuration.week > 0){
					total += course.selectDuration.price;
					var courseStartDate = new Date(course.startDate);
					var courseEndDate = new Date(courseStartDate.valueOf());
					courseEndDate.setDate( courseEndDate.getDate() + 7 * course.selectDuration.week);

					$scope.displayCourses.push({
						title: course.title,
						startDate: course.startDate,
						endDate: courseEndDate.toJSON(),
						duration: course.selectDuration.week
					});			
				}


			}, function(){

			});
			$scope.calculatedTotal = total;
			console.log(total);

		}, 
		true
		);

	Registrations.query(function(result){
		$scope.registrations = result;
	});

	Courses.getSimpleList(function(data){
		$scope.courses = data.data;
	});

	$scope.register = function(isValid){
		Registrations.save($scope.student, function(result){
			var message = result.messages;	  
		});
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
})


.controller('StudentRegisterDetail',function StudentRegisterDetail($rootScope,$scope,$http,Registrations,$window){
	var registrationId = url_params.id;
	loading();

	function loading() {
		if(registrationId !=null){
			Registrations.get({id:registrationId}, function(result){
				$scope.registration = result.data;
			});
		};
	}

	$scope.toggle = function() {
		console.log("here");
		var htmlContext = angular.element('#formPrint');
		$http.get('/api/pdf')
		.success(function(data,status,headers,config){
			console.log("success to pdf")
		})
		.error(function(data,status,headers,config){
			console.log("fail to pdf")
		});
	}
})

.controller("InvitationCtrl", function InvitationCtrl($rootScope,$scope,$http,$window){
	$scope.create = function() {
		$http.post('/api/invitation/sendEmail',{email:$scope.email, agentId:"55da132f8c7e89c5060c77cb"})
		.success(function(data,status,headers,config){
			console.log("success to send invitation")
		})
		.error(function(data,status,headers,config){
			console.log("fail to send invitation")
		});
	}
});