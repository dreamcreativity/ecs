'use strict';
angular.module('ClientApp')
.controller('JuniorProgramCtrl',function JuniorProgramCtrl($rootScope,$scope,$http,JuniorPrograms,Constants,$window){
	Constants.get({name:"SummerProgramTorontoStartDate"}, function(result){
			 		var startdates = result.data;
			 		var list =[]
			 		for(var i=0; i<startdates.length; i++){
			 			list.push({"name" : startdates[i]});
			 		}
			 		$scope.SummerProgramTorontoStartDateList = list;
			 	});

	Constants.get({name:"SummerProgramTorontoDuration"}, function(result){
			 		var durations = result.data;
			 		var list =[]
			 		for(var i=0; i<durations.length; i++){
			 			list.push({"name" : durations[i]});
			 		}
			 		$scope.SummerProgramTorontoDurationList = list;
			 	});

	Constants.get({name:"SummerProgramKingstonStartDate"}, function(result){
			 		var startdates = result.data;
			 		var list =[]
			 		for(var i=0; i<startdates.length; i++){
			 			list.push({"name" : startdates[i]});
			 		}
			 		$scope.SummerProgramKingstonStartDateList = list;
			 	});

	Constants.get({name:"SummerProgramKingstonDuration"}, function(result){
			 		var durations = result.data;
			 		var list =[]
			 		for(var i=0; i<durations.length; i++){
			 			list.push({"name" : durations[i]});
			 		}
			 		$scope.SummerProgramKingstonDurationList = list;
			 	});

	$scope.register = function(isValid){
		var studentId = null;
		var studentNumber = null;
		var agentEmail = null;
		var email = $scope.email;
		$http.post('/api/juniorprogram/create',{student:$scope.student})
		.success(function(data,status,headers,config){
			if(data.messages == 'successed'){
				$http.post('/api/registration/sendEmail',{toemail:$scope.email})
				.success(function(data,status,headers,config){
					setInterval(function(){
					$window.location='/welcome';
						}, 2000); 
				});
			}
		});

	}
});
