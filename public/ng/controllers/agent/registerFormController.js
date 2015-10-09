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
			$scope.currentAgent_id = result.data._id;
		});

		Students.query(function(result){
			$scope.registrations = result;
		});

		Courses.getSimpleList(function(data){
			$scope.courses = data.data;
		});

		Constants.get({name : "CourseLevel"}, function(result){
			if(result.status =="ok"){
				$scope.corseLevel = result.data;
			}
		});
	}

	//register action
	$scope.register = function(isValid){
		$scope.student.agent = $scope.currentAgent_id;
			$http.post('/api/student/register',{student : $scope.student, 
				accommodation : $scope.accommodation, 
				flightInfo : $scope.flightInfo, 
				courseList : $scope.courseList})
			.success(function(data,status,headers,config){
				if(data.messages == "successed"){
					$http.post('/api/pdf',{registerId:data.data.student,type:"New Student"})
					.success(function(data,status,headers,config){
						if(data.status == "successed"){
							$http.post('/api/registration/sendEmail',{to:"stiron88@gmail.com",
								subject:"success registration", 
								context: "Welcome", 
								attachments : [data.data]})
							.success(function(data,status,headers,config){
								ShowGritterCenter('System Notification','Success to registration');
								setInterval(function(){
									$window.location='/agent/students';
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

.controller('StudentRegisterDetail',function StudentRegisterDetail($rootScope,$scope,$http,Students,AgentTokens,$window){
	var obj_id = url_params.id;
	var currentAgent_id = null;
	var token = sessionStorage.token;
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
			});
		};
	}

	$scope.toggle = function() {
		console.log("here");
		var htmlContext = angular.element('#formPrint');
		$http.post('/api/pdf',{registerId:$scope.student._id})
		.success(function(data,status,headers,config){
			if(data.status == "successed"){
			// $http.post('/api/registration/sendEmail',{to:"stiron88@gmail.com",
			// 	subject:"success registration", 
			// 	context: "Welcome", 
			// 	attachments : [data.data]})
			// .success(function(data,status,headers,config){
			// 	console.log("success to send registration email")
			// })
			// .error(function(data,status,headers,config){
			// 	console.log("fail to send registration email")
			// });
	}
	}).error(function(data,status,headers,config){
			console.log("fail to pdf")
		});
	}}
)

.controller("InvitationCtrl", function InvitationCtrl($rootScope,$scope,$http,$window){
	var currentAgent_id = null;
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
			console.log("success to send invitation")
		})
		.error(function(data,status,headers,config){
			console.log("fail to send invitation")
		});
	}
});