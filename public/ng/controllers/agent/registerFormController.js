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
	$scope.addDisplay = "Add new Course"


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
	  		//doCalculation();
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

	$scope.addNewRow = function() {
		$scope.newrowShow = !$scope.newrowShow;

		$scope.addDisplay = $scope.newrowShow ? "Cancel" : "Add new Course"
		//$scope.$apply();
	}

	$scope.addCourse = function(course) {
		if(typeof course != "undefined"){
			if (typeof course.startDate == "undefined" ||
				typeof course.duration == "undefined" ||
				typeof course.year == "undefined"
				) {
				ShowGritterCenter('System Notification','Please enter complete course information');
			}
		else{
			$scope.courseList.push({
				id : course._id,
				title: course.title,
				startDate: course.startDate,
				duration: course.duration,
				year:course.year
			});
		}
	}
	else {
		ShowGritterCenter('System Notification','Please enter complete course information');
	}
}

	$scope.removeCourse = function(){
		var len = $scope.courseList.length;
		if(len > 0) {
			$scope.courseList.splice(len-1, 1);
		}
	}


	$scope.changeCourse = function(targetCourse){
		Courses.getCourstStartDateList({id:targetCourse._id,year:$scope.availableYears[0]},function(data){
					$scope.course.availableYears = $scope.availableYears;
					$scope.course.startDates = data.data
				});
	}

	$scope.changeStartDate = function(course, startDate){
		course.startDate =  startDate;
		//closeAllSelectList();
	}

	$scope.changeStartYear =  function(course){
		if(typeof course != "undefined"){
			Courses.getCourstStartDateList({id:course._id, year:course.year}, function(data){
				course.startDate = data.data[0];
				course.startDates = data.data;
			//closeAllSelectList();
		});
		}
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
})


 .directive('requiredSelect', function () {
    return {
      restrict: 'AE',
      require: 'ngModel',
      link: function(scope, elm, attr, ctrl) {

        if (!ctrl) return;
          attr.requiredSelect = true; // force truthy in case we are on non input element

          var validator = function(value) {
            if (attr.requiredSelect && ctrl.$isEmpty(value)) {
              ctrl.$setValidity('requiredSelect', false);
              return;
            } else {
              ctrl.$setValidity('requiredSelect', true);
              return value;
            }
          };

          ctrl.$formatters.push(validator);
          ctrl.$parsers.unshift(validator);

          attr.$observe('requiredSelect', function() {
            validator(ctrl.$viewValue);
          });
      }
    };
  });