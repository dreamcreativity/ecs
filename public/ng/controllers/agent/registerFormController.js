'use strict';
angular.module('AgentApp')

.controller('StudentRegister', function StudentRegister($rootScope, $scope, $http, Students,Courses,Constants,Accommodations,FlightInfos, AgentTokens, $window){
	loading();

	//Loaded all info in register form
	function loading(){
		var token = sessionStorage.token;
		$scope.courseList =[];
		$scope.displayCourses = [];
		var today = new Date();
		$scope.availableYears = [today.getFullYear(),today.getFullYear()+1,today.getFullYear()+2];
		$scope.isDisabled = false;
		$scope.corseLevel = [];

		AgentTokens.post({token:token}, function(result){
			$scope.currentAgent = result.data;

			Students.getStudentsByAgent({id: $scope.currentAgent._id}, function(result){
				$scope.registrations = result;
			});
		});

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
	}

	$scope.checkForm = function(){
		var step1 = ($scope.registerForm.firstname.$valid && $scope.registerForm.lastname.$valid && $scope.registerForm.birthday.$valid
			&& $scope.registerForm.age.$valid && $scope.registerForm.citizenship.$valid && $scope.address.province.$valid
			&& $scope.registerForm.postcode.$valid && $scope.registerForm.city.$valid && $scope.registerForm.email.$valid
			&& $scope.registerForm.country.$valid && $scope.registerForm.telephone.$valid && $scope.registerForm.emergency.$valid);
	}

	//register 3
	$scope.register = function(isValid){
		$scope.student.agent = $scope.currentAgent._id;
		$http.post('/api/student/register',{student : $scope.student,  
			agent : $scope.currentAgent._id,
			accommodation : $scope.accommodation, 
			flightInfo : $scope.flightInfo, 
			courseList : $scope.courseList})
		.success(function(data,status,headers,config){
			if(data.messages == "successed"){
				$http.post('/api/pdf',{registerId:null, studentId:data.data, type:"New Student"})
				.success(function(data,status,headers,config){
					if(data.status == "successed"){
						$http.post('/api/registration/sendEmail',{student:$scope.student, 
							agent: $scope.currentAgent,
							subject:"success registration", 
							context: "Welcome", 
							attachments : [data.data]})
						.success(function(data,status,headers,config){
							ShowGritterCenter('System Notification','Success to registration');
							setInterval(function(){
								$window.location='/agent/student/all';
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
})

.controller('StudentRegisterDetail',function StudentRegisterDetail($rootScope,$scope,$http,$location,Students,Constants,AgentTokens,Accommodations,FlightInfos,$window){
	var tabNum = $location.absUrl().split("#/")[1];

	if (typeof(tabNum) !== 'undefined') {
		switch (tabNum){
			case "p1":
			angular.element("#tab1").addClass("active");
			angular.element("#p1").addClass("active");
			break;
			case "p2":
			angular.element("#tab2").addClass("active");
			angular.element("#p2").addClass("active");
			break;
			case "p3":
			angular.element("#tab3").addClass("active");
			angular.element("#p3").addClass("active");
			break;
			default:
			angular.element("#tab1").addClass("active");
			angular.element("#p1").addClass("active");
		}
	}
	else {
		angular.element("#tab1").addClass("active");
		angular.element("#p1").addClass("active");
	}

	var obj_id = url_params.id;
	var currentAgent_id = null;
	var token = sessionStorage.token;
	$scope.havingAccommdation = false;
	$scope.createAccommdation = true;
	loading();

	function loading() {
		AgentTokens.post({token:token}, function(result){
			currentAgent_id = result.data._id;
		});

		if(obj_id !=null){
			Students.get({id:obj_id}, function(result){
				$scope.student = result.data;
				$scope.programs = result.data.programRegistration;
				$scope.accommodation = result.data.accommodation;
				if($scope.student.birthday) $scope.student.birthday = new Date($scope.student.birthday);
				if($scope.student.healthInsuranceEndDate) $scope.student.healthInsuranceEndDate = new Date($scope.student.healthInsuranceEndDate);
				if($scope.student.healthInsuranceStartingDate) $scope.student.healthInsuranceStartingDate = new Date($scope.student.healthInsuranceStartingDate);
				if($scope.student.healthInsuranceStartingDate) $scope.student.healthInsuranceStartingDate = new Date($scope.student.healthInsuranceStartingDate);
				if($scope.accommodation !=null){
					$scope.accommodation.startDate = new Date($scope.accommodation.startDate);
					$scope.accommodation.endDate = new Date($scope.accommodation.endDate);
					$scope.accommodation.departureDateFromToronto = new Date($scope.accommodation.departureDateFromTorontos);
					$scope.havingAccommdation = true;
					$scope.createAccommdation = false;
				}
				$scope.flightInfo = $scope.student.flightInfo;
				if($scope.flightInfo !=null){
					$scope.flightInfo.arrivalDateTime = new Date($scope.flightInfo.arrivalDateTime);
					$scope.flightInfo.departureDateTime = new Date($scope.flightInfo.departureDateTime);
				}
			});

Students.getRegistrationsByStudent({id:obj_id}, function(result){
	$scope.registrations = result.data;
});
}

Constants.get({name:"Country"}, function(result){
	var regions = result.data;
	var list =[]
	for(var i=0; i<regions.length; i++){
		list.push({"name" : regions[i]});
	}
	$scope.regionsList = list;
});
}

$scope.update = function(isValid) {
	Students.updateByAgent($scope.student, function(result){
		var message = result.messages;	    
		ShowGritterCenter('System Notification','Student has been updated');
		setInterval(function(){
			$window.location.reload();
		}, 2000); 
	})
}


$scope.submitAccommdation = function(isValid){
	var acc = $scope.accommodation;
	var flightInfo = $scope.flightInfo;
	Accommodations.update(acc, function(result){
		if(result.status == 'ok' && result.messages == 'successed'){
			FlightInfos.update(flightInfo, function(result){
				if(result.status == 'ok' && result.messages == 'successed'){
					ShowGritterCenter('System Notification','Accommodation has been updated');
					setTimeout(function(){
						$window.location.reload();
					}, 2000); 	
				}
				else{
					ShowGritterCenter('System Notification','Fail');
				}
			});
		}
		else{
			ShowGritterCenter('System Notification','Fail');
		}
	});
}

$scope.createNewAccommdation = function(isValid){
	Accommodations.create({accommodation :$scope.accommodation, flightInfo : $scope.flightInfo, studentId : obj_id}, function(result){
		if(result.status == 'ok' && result.messages == 'successed'){
			ShowGritterCenter('System Notification','Accommodation has been created');
			setInterval(function(){
				$window.location.reload();
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
						$window.location='/agent/student/detail/'+ student_id;
					}, 2000); 
				}
			});
		}
	}

})


.controller("InvitationCtrl", function InvitationCtrl($rootScope,$scope,AgentTokens,$http,$window){
	var currentAgent_id = null;
	var token = sessionStorage.token;
	loading();

	function loading(){
		var token = sessionStorage.token;
		AgentTokens.post({token:token}, function(result){
			currentAgent_id = result.data._id;
		});
	}

	$scope.create = function() {
		$http.post('/api/invitation/sendEmail',{email:$scope.email, agentId: currentAgent_id})
		.success(function(data,status,headers,config){
			$scope.returnMessage = "email invitation has been sent successfully"
		})
		.error(function(data,status,headers,config){
			$scope.returnMessage = "fail to sent invitation"
		});
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
			$scope.course.year = String(new Date($scope.course.startDate).getFullYear());
			var startDate = fomateDate(new Date($scope.course.startDate));
			var month = startDate.toLocaleString("en-us", { month: "long" });
			var date = startDate.getUTCDate();
			$scope.course.startDate = month + " " + date;
			$scope.updateCourse = result.data;

			Courses.getCourstStartDateList({id:$scope.course.course,year:$scope.course.year},function(data){
				var listOfdates = data.data;
				for (var i = listOfdates.length - 1; i >= 0; i--) {
					listOfdates[i] = fomateDate(listOfdates[i])
				};
				$scope.course.startDates = listOfdates;
			});

			Courses.get({id:$scope.course.course}, function(data){
				$scope.durations = data.data.durations;
			});
		});
	}

	function fomateDate(datetime) {
		var datetime = new Date(datetime);
		var date = datetime.getDate();
		var month = datetime.getMonth()+1;
		var year = datetime.getFullYear();
		datetime = year + "-" + month + "-" +date;
		datetime = new Date(datetime)
		return datetime
	}


});





