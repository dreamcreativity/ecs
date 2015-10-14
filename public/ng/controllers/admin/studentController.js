'use strict';
angular.module('AdminApp')

.controller('StudentCtrl',function StudentCtrl($rootScope,$scope,$http,Students,Courses,Constants,Agents,$window){
	 var token = sessionStorage.token;
	 var agent_id =null;
	 if (typeof(url_params) !== 'undefined') {
	 		agent_id = url_params.id;
		}
	$scope.hasAgent = false;
	 loading();
	 $scope.students = getAllStudents();

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

		if(agent_id !=null){
	 			Agents.get({id:agent_id}, function(result){
	 				$scope.agent = result.data;
	 				$scope.hasAgent = true;
	 			});
	 		}
	 }

	 $scope.create = function(isValid){
	 	if($scope.agent) {
	 		$scope.student.agent = $scope.agent._id;
	 	}
	 	$http.post('/api/student/register',{student : $scope.student, 
				accommodation : $scope.accommodation, 
				flightInfo : $scope.flightInfo, 
				courseList : $scope.courseList})
			.success(function(data,status,headers,config){
				if(data.messages == "successed"){
					$http.post('/api/pdf',{registerId:data.data.student, type:"New Student"})
					.success(function(data,status,headers,config){
						if(data.status == "successed"){
							$http.post('/api/registration/sendEmail',{student:$scope.student,
								agent: $scope.agent,
								subject:"success registration", 
								context: "Welcome", 
								attachments : [data.data]})
							.success(function(data,status,headers,config){
								ShowGritterCenter('System Notification','Success to registration');
								setInterval(function(){
									$window.location='/admin/student/all';
								}, 2000); 
							})
							.error(function(data,status,headers,config){
								console.log("fail to send registration email")
							});
						}
					})
					.error(function(data,status,headers,config){
						console.log("fail to pdf")
					});
				}
			})
			.error(function(data,status,headers,config){
				console.log("fail to send registration email")
			});
	 }

 	function getAllStudents(){
 		return Students.query();
 	}

	
})

.controller('StudentEditCtrl', function StudentEditCtrl($rootScope,$scope,$http,Students,Accommodations,Courses,Constants,$window) {
	var student_id = url_params.id;
	$scope.havingAccommdation = false;

	 if(student_id !=null){
	 	Students.get({id:student_id}, function(result){
	 		$scope.student = result.data;
	 		$scope.accommodation = $scope.student.accommodation;
	 		if($scope.accommodation !=null){
	 			$scope.accommodation.startDate = new Date($scope.accommodation.startDate);
				$scope.accommodation.endDate = new Date($scope.accommodation.endDate);
				$scope.accommodation.departureDateFromToronto = new Date($scope.accommodation.departureDateFromToronto);
	 			$scope.havingAccommdation = true;
	 		}
	 	});
	 }

	$scope.update = function(isValid) {
	 	Students.update($scope.student, function(result){
	 			var message = result.messages;	    
	 			 ShowGritterCenter('System Notification','Student has been updated');
	 			setInterval(function(){
  					 $window.location='/admin/student/edit/' +student_id;
				}, 2000); 
	 	})
	 }


	 $scope.submitAccommdation = function(isValid){
	 	var acc = $scope.accommodation;
	 		Accommodations.update(acc, function(result){
				if(result.status == 'ok' && result.messages == 'successed'){
	 				ShowGritterCenter('System Notification','Student has been updated');
		 			setInterval(function(){
	  					 $window.location='/admin/student/edit/' +student_id;
					}, 2000); 	
	 			}
	 			else{
	 				ShowGritterCenter('System Notification','Fail');
	 			}
	 		});
	 }


})

.controller('StudentExtending', function ($rootScope,$scope,$http,Students,Courses,Constants,$window){
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


	 $scope.extendingCourse =function() {
	 	if(!$scope.courseList.length){
	 		ShowGritterCenter('System Notification','Courses cannot be empty');
	 	}
	 	else {
	 		Students.createExtendingCourse({student_id: student_id, courseList : $scope.courseList}, function(result){
	 			if(result.status == 'ok' && result.messages =='successed'){
	 				ShowGritterCenter('System Notification','Courses has been successfully registered');
	 				setInterval(function(){
	 					$window.location='/admin/student/edit/'+ student_id;
	 				}, 2000); 
	 			}
	 		});
	 	}
	 }

});















































