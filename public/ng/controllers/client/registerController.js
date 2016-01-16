'use strict';
angular.module('ClientApp')
.controller('RegisterCtrl',function RegisterCtrl($rootScope,$scope,$http,Courses,Constants,Students,$window){
	var token =null;
	loading();

	//Loaded all info in register form
	function loading(){
		if(url_params) token = url_params.token;
		Constants.get({name:"Country"}, function(result){
			 		var regions = result.data;
			 		var list =[]
			 		for(var i=0; i<regions.length; i++){
			 			list.push({"name" : regions[i]});
			 		}
			 		$scope.regionsList = list;
			 	});
	}

	$scope.register = function(isValid){
		var studentId = null;
		var studentNumber = null;
		var agentEmail = null;
		$http.post('/api/student/register',{student:$scope.student, token:token ,courseList:[],accommodation:[]})
		.success(function(data,status,headers,config){
			if(data.messages == 'successed'){
				studentId = data.data;
				studentNumber = data.studentId;
				agentEmail = data.agentEmail;
				$http.post('/api/pdf',{registerId:null, studentId: data.data,type:'New Student'})
				.success(function(data,status,headers,config){
					if(data.status == "successed"){
						$http.post('/api/registration/sendEmail',{student:$scope.student,
								studentNumber : studentNumber,
								agent: agentEmail,
								subject:"success registration", 
								context: "Welcome", 
								attachments : [data.data]})
						.success(function(data,status,headers,config){
							setInterval(function(){
									$window.location='/welcome';
								}, 2000); 
						})
					}
				})
			}
		})

	}
})

.controller('SendEmailController', function SendEmailController($rootScope,$scope,$http,$window){
	$scope.sendEmail = function(isValid){
	$('#email-sending-warning1').removeClass('hidden');
	$http.post('/api/client/sendEmail', {messageForm : $scope.messageForm})
		.success(function(data,status,headers,config){
			$('#email-sending-warning1').addClass('hidden');
			$('#email-sending-warning2').removeClass('hidden');
			setTimeout(function(){
				$('#email-sending-warning2').addClass('hidden');
				$scope.$apply(function () {
            		$scope.messageForm.name=null;
					$scope.messageForm.email=null;
					$scope.messageForm.phone=null;
					$scope.messageForm.subject=null;
					$scope.messageForm.service=null;
					$scope.messageForm.message=null;
       			 });
 			}, 2000);
		});
	}
});

