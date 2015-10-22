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
		$http.post('/api/student/register',{student:$scope.student, token:token ,courseList:[],accommodation:[]})
		.success(function(data,status,headers,config){
			if(data.messages == 'successed'){
				$http.post('/api/pdf',{registerId:data.data, type:'New Student'})
				.success(function(data,status,headers,config){
					if(data.status == "successed"){
						$http.post('/api/registration/sendEmail',{student:$scope.student, 
								agent: $scope.currentAgent,
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