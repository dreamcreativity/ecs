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


    setTimeout(function(){

    	console.log($rootScope.accountInfo);	
    },1000);
	

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
		var studentNumber = null;
		if($scope.agent) {
			$scope.student.agent = $scope.agent._id;
		}

		var agent_id = null;
		if(url_params.id){
			var agent_id = url_params.id;
		}
		$http.post('/api/student/register',{student : $scope.student, 
			agentId : agent_id,
			accommodation : $scope.accommodation, 
			flightInfo : $scope.flightInfo, 
			courseList : $scope.courseList})
		.success(function(data,status,headers,config){
			if(data.messages == "successed"){
				studentNumber = data.studentId;
				$http.post('/api/pdf',{registerId:null,studentId:data.data, type:"New Student"})
				.success(function(data,status,headers,config){
					if(data.status == "successed"){
						$http.post('/api/registration/sendEmail',{student:$scope.student,
							agent: $scope.agent.email,
							region : $scope.student.region,
							studentNumber : studentNumber,
							subject:"success registration", 
							context: "Welcome", 
							attachments : [data.data]})
						.success(function(data,status,headers,config){
							ShowGritterCenter('System Notification','Success to registration');
							setTimeout(function(){
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

.controller('StudentEditCtrl', function StudentEditCtrl($rootScope,$scope,$http,$location,Students,Accommodations,FlightInfos,Courses,Constants,$window) {
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
			// case "p3":
			// angular.element("#tab3").addClass("active");
			// angular.element("#p3").addClass("active");
			// break;
			default:
			angular.element("#tab1").addClass("active");
			angular.element("#p1").addClass("active");
		}
	}
	else {
		angular.element("#tab1").addClass("active");
		angular.element("#p1").addClass("active");
	}

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
		setTimeout(function(){
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
	Accommodations.create({accommodation :$scope.accommodation, flightInfo : $scope.flightInfo, studentId : student_id}, function(result){
		if(result.status == 'ok' && result.messages == 'successed'){
			ShowGritterCenter('System Notification','Accommodation has been created');
			setTimeout(function(){
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
					setTimeout(function(){
						// $window.location='/admin/student/edit/'+ student_id + "#/p3";
						$window.location.reload();
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
			$scope.course.year = String(new Date($scope.course.startDate).getFullYear());
			var startDate = new Date($scope.course.startDate);
   			var month = startDate.toLocaleString("en-us", { month: "long" });
   			var date = startDate.getUTCDate();
   			$scope.course.startDate = month + " " + date;
			$scope.updateCourse = result.data;

			Courses.getCourstStartDateList({id:$scope.course.course,year:$scope.course.year},function(data){
				var listOfdates = data.data;
				for (var i = listOfdates.length - 1; i >= 0; i--) {
					listOfdates[i] = new Date(listOfdates[i]);
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















































