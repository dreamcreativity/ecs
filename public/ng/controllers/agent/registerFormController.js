	'use strict';
	angular.module('AgentApp')

	.controller('StudentRegister', function StudentRegister($rootScope, $scope, $http, Students,Registrations,Courses,Accommodations,FlightInfos, $window){
	$scope.courseList =[];
	$scope.displayCourses = [];
	var today = new Date();
	$scope.availableYears = [
	today.getFullYear(),
	today.getFullYear()+1,
	today.getFullYear()+2
	];
	$scope.isDisabled = false;


	Registrations.query(function(result){
		$scope.registrations = result;
	});

	Courses.getSimpleList(function(data){
		$scope.courses = data.data;
	});

	//$scope.register = function(isValid){
		// $scope.student.coursesList = $scope.courseList;
		// Registrations.save($scope.student, function(result){
		// 	var message = result.messages;	  
		// 	if(message == "successed"){
		// 		$http.post('/api/pdf',{registerId:result.data._id})
		// 		.success(function(data,status,headers,config){
		// 			if(data.status == "successed"){
		// 				$http.post('/api/registration/sendEmail',{to:"stiron88@gmail.com",
		// 					subject:"success registration", 
		// 					context: "Welcome", 
		// 					attachments : [data.data]})
		// 				.success(function(data,status,headers,config){
		// 					ShowGritterCenter('System Notification','Success to registration');
		// 					setInterval(function(){
  // 							 $window.location='/agent/students';
		// 					}, 2000); 
		// 				})
		// 				.error(function(data,status,headers,config){
		// 					console.log("fail to send registration email")
		// 				});
		// 			}
		// 		})
		// 		.error(function(data,status,headers,config){
		// 			console.log("fail to pdf")
		// 		});
		// 	}
		// });
	//}

	$scope.register = function(isValid){
		Accommodations.save($scope.accommodation, function(result){
			if(result.messages == "successed"){
				var accommodationId = result.data._id;
				FlightInfos.save($scope.flightInfo, function(result1){
					if(result1.messages == "successed"){
						var flightInfoId = result.data._id;
						$scope.student.accommodation = accommodationId;
						$scope.student.flightInfo = flightInfoId;
						Students.save($scope.student, function(result2){
							if(result2.type == true){
								$http.post('/api/pdf',{registerId:result.data._id})
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
						});
					}
				});
			}
			});
			}

	$scope.addNewRow = function() {
		$scope.newrowShow = true;
		$("#addrow_button").attr("disabled", true)
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
			$scope.newrowShow = false
			$("#addrow_button").attr("disabled", false)
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
		$http.post('/api/pdf',{registerId:"55f5954d567102d80ee9b9dc"})
		.success(function(data,status,headers,config){
			if(data.status == "successed"){
			$http.post('/api/registration/sendEmail',{to:"stiron88@gmail.com",
				subject:"success registration", 
				context: "Welcome", 
				attachments : [data.data]})
			.success(function(data,status,headers,config){
				console.log("success to send registration email")
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