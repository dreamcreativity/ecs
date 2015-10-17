'use strict';
angular.module('ClientApp')
.controller('RegisterCtrl',function RegisterCtrl($rootScope,$scope,$http,Courses,Students,AgentTokens){
	var token =null;
	loading();

	//Loaded all info in register form
	function loading(){
		if(url_params) token = url_params.token;
		AgentTokens.post({token:token},function(data){
				if(data.status == "successed"){
					$scope.currentAgent = data.data;
				}
			});
	}

	$scope.register = function(isValid){
		$scope.student.agent = $scope.currentAgent._id;
		$http.post('/api/student/register',{student:$scope.student,courseList:[],accommodation:[]})
		.success(function(data,status,headers,config){
			if(data.messages == 'successed'){
				$http.post('/api/pdf',{registerId:data.data.student, type:'New Student'})
				.success(function(data,status,headers,config){
					if(data.status == "successed"){
						$http.post('/api/registration/sendEmail',{student:$scope.student, 
								agent: $scope.currentAgent,
								subject:"success registration", 
								context: "Welcome", 
								attachments : [data.data]})
						.success(function(data,status,headers,config){
							$scope.returnMessage = 'Successful Submit';
						})
					}
				})
			}
		})

	}
})