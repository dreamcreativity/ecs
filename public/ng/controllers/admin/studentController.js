'use strict';
angular.module('AdminApp')

.controller('StudentCtrl',function StudentCtrl($rootScope,$scope,$http,Students,Courses,Constants,Agents,Promotions,$window){
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

		Constants.get({name:"Country"}, function(result){
			 		var regions = result.data;
			 		var list =[]
			 		for(var i=0; i<regions.length; i++){
			 			list.push({"name" : regions[i]});
			 		}
			 		$scope.regionsList = list;
			 	});

		if(agent_id !=null){
	 			Agents.get({id:agent_id}, function(result){
	 				$scope.agent = result.data;
	 				$scope.hasAgent = true;
	 			});
	 		}
	 }

	 $scope.getPromotionRate = function() {
	 	Promotions.getPromotionByRegion({region: $scope.student.region}, function(result){
	 		if(result.status == 'ok'){
	 			if(result.data) {
	 				$scope.student.pomotionRate = result.data.rate;
	 			}
	 		}
	 	});
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
					$http.post('/api/pdf',{registerId:null,studentId:data.data, type:"New Student"})
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
	$scope.createAccommdation = true;

	 if(student_id !=null){
	 	Students.get({id:student_id}, function(result){
	 		$scope.student = result.data;
	 		$scope.accommodation = $scope.student.accommodation;
	 		if($scope.student.birthday) $scope.student.birthday = new Date($scope.student.birthday);
	 		if($scope.student.healthInsuranceEndDate) $scope.student.healthInsuranceEndDate = new Date($scope.student.healthInsuranceEndDate);
	 		if($scope.student.healthInsuranceStartingDate) $scope.student.healthInsuranceStartingDate = new Date($scope.student.healthInsuranceStartingDate);
	 		if($scope.accommodation !=null){
	 			$scope.accommodation.startDate = new Date($scope.accommodation.startDate);
				$scope.accommodation.endDate = new Date($scope.accommodation.endDate);
				$scope.accommodation.departureDateFromToronto = new Date($scope.accommodation.departureDateFromToronto);
	 			$scope.havingAccommdation = true;
	 			$scope.createAccommdation = false;
	 		}
	 		$scope.flightInfo = $scope.student.flightInfo;
	 		if($scope.flightInfo !=null){
	 			$scope.flightInfo.arrivalDateTime = new Date($scope.flightInfo.arrivalDateTime);
				$scope.flightInfo.departureDateTime = new Date($scope.flightInfo.departureDateTime);
	 		}
	 	});

	 	Students.getRegistrationsByStudent({id:student_id}, function(result){
	 		$scope.registrations = result.data;
	 	});
	 }

	$scope.update = function(isValid) {
		if($scope.student.agent !=null) {
			$scope.student.agent = $scope.student.agent._id;
		}
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
	 				ShowGritterCenter('System Notification','Accommodation has been updated');
		 			setInterval(function(){
	  					 $window.location='/admin/student/edit/' +student_id;
					}, 2000); 	
	 			}
	 			else{
	 				ShowGritterCenter('System Notification','Fail');
	 			}
	 		});
	 }

	 $scope.createNewAccommdation = function(isValid){
	 	Accommodations.create({accommodation :$scope.accommodation, flightInfo : $scope.flightInfo, studentId : student_id}, function(result){
				if(result.status == 'ok' && result.messages == 'successed'){
	 				ShowGritterCenter('System Notification','Accommodation has been created');
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
	 		Students.createExtendingCourse({student_id: student_id, courseList : $scope.courseList, agent : $scope.student.agent}, function(result){
	 			if(result.status == 'ok' && result.messages =='successed'){
	 				ShowGritterCenter('System Notification','Courses has been successfully registered');
	 				setInterval(function(){
	 					$window.location='/admin/student/edit/'+ student_id;
	 				}, 2000); 
	 			}
	 		});
	 	}
	 }

})

.controller('ProgramEditCtrl', function ($rootScope,$scope,$http,Students,Courses,Constants,ProgramRegister,$window){
	var program_id = url_params.id;
	var student_id = url_params.studentid;
		loading();

	function loading() {
		ProgramRegister.get({id:program_id}, function(result){
			$scope.studentid = student_id;
			$scope.course = result.data;
			$scope.duration = $scope.course.duration;
			$scope.course.year = new Date($scope.course.startDate).getFullYear();
			$scope.course.startDate = new Date($scope.course.startDate);
			$scope.updateCourse = result.data;
		});
	}


});















































