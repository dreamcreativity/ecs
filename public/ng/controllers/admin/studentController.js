'use strict';
angular.module('AdminApp')

.controller('StudentCtrl',function StudentCtrl($rootScope,$scope,$http,Students,Agents,$window){
	 var token = sessionStorage.token;
	 $scope.students = getAllStudents();


	 console.log($scope.students);
	 $scope.agents = Agents.query();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 $scope.create = function(isValid){
	 	Students.save($scope.student,function(result){
	 		    var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/student/all';
 		})
	 }

 	function getAllStudents(){
 		return Students.query();
 	}




})

.controller('StudentEditCtrl', function StudentEditCtrl($rootScope,$scope,$http,Students,Courses,Constants,$window) {
	var student_id = url_params.id;
	loading();

	 if(student_id !=null){
	 	Students.get({id:student_id}, function(result){
	 		$scope.student = result.data;
	 	});
	 	
	 }


	 function loading() {
	 	$scope.courseList =[];
	 	$scope.displayCourses = [];
	 	var today = new Date();
		$scope.availableYears = [today.getFullYear(),today.getFullYear()+1,today.getFullYear()+2];
		$scope.isDisabled = false;
		$scope.corseLevel = [];

		Courses.getSimpleList(function(data){
			$scope.courses = data.data;
		});

		Constants.get({name : "CourseLevel"}, function(result){
			if(result.status =="ok"){
				$scope.corseLevel = result.data;
			}
		});
	 }

	$scope.update = function(isValid) {
	 	Students.update($scope.student, function(result){
	 			var message = result.messages;	    
	 			 ShowGritterCenter('System Notification','Student has been updated');
	 			setInterval(function(){
  					 $window.location='/admin/student/all';
				}, 2000); 
	 	})
	 }

	 $scope.registerCourse = function(isValid){
	 	for (var i = 0; i < $scope.courseList.length; i++) {
	 			$scope.student.programRegistration.push($scope.courseList[i]);
	 	};
	 	// Students.save($scope.student,function(err, result){
	 	// 			ShowGritterCenter('System Notification','Student has been updated');
		 // 			setInterval(function(){
	  // 					 $window.location='/admin/student/all';
			// 		}, 2000); 
 		// });
	 }




	$scope.addNewRow = function() {
		$scope.newrowShow = true;
		$("#addrow_button").attr("disabled", true)
		//$scope.$apply();
	}

	$scope.addCourse = function(course) {
		if(typeof course != "undefined"){
			if (typeof course.startDate == "undefined" ||typeof course.duration == "undefined" ||typeof course.year == "undefined") {
					ShowGritterCenter('System Notification','Please enter complete course information');
			}
			else{
				$scope.courseList.push({
					id : course._id,
					tag : course.tag,
					title: course.title,
					level: course.level,
					startDate: course.startDate,
					duration: course.duration,
					year:course.year
				});
				$scope.newrowShow = false
				delete $scope.course
				$("#addrow_button").attr("disabled", false)
				if($scope.courseList.length > 0) {
					$("#submit_button").attr("disabled", false)
				}
			}
		}
		else {
			ShowGritterCenter('System Notification','Please enter complete course information');
		}
	}

	$scope.removeRow = function(){
		$scope.newrowShow = false
		$("#addrow_button").attr("disabled", false)
	}

	$scope.removeCourse = function(course){
		var index = $scope.courseList.indexOf(course);
		$scope.courseList.splice(index, 1);
		if($scope.courseList.length == 0) $("#submit_button").attr("disabled", true)    

	}


	$scope.changeCourse = function(targetCourse){
		Courses.getCourstStartDateList({id:targetCourse._id,year:$scope.availableYears[0]},function(data){
			$scope.course.availableYears = $scope.availableYears;
			$scope.course.startDates = data.data
		});
	}

	$scope.changeStartDate = function(course, startDate){
		course.startDate =  startDate;
	}

	$scope.changeStartYear =  function(course){
		if(typeof course != "undefined"){
			Courses.getCourstStartDateList({id:course._id, year:course.year}, function(data){
				course.startDate = data.data[0];
				course.startDates = data.data;
				//closeAllSelectList();
			});
		}}

});













