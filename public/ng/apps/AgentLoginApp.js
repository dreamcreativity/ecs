angular.module('AgentLoginApp', ['ngRoute'])

.controller('LoginController',function LoginController($scope,$http,$window,$location){
	//Define login function 
	$scope.login = function() {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');


		$http.post('http://localhost:3000/api/agent/login',$scope.agent)
		.success(function(data,status,headers,config){
			if(data.status === "resetpassword") {
				sessionStorage.token = data.token;
				$window.location = '/agent/resetpassword';
			}

			else if(data.status === "ok"){
				console.log(data.data);
				sessionStorage.token = data.token;
				console.log(sessionStorage.token);


				$window.location='/agent';
			}
			else {
				$scope.returnMessage = "username or password is incorrect";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
			}
		})
		.error(function(data,status,headers,config){
			$window.location='/agent/login';
		});
	};

	//Log out 
	$scope.logout = function(){
		var token = sessionStorage.token;
 		var tokenPayload = jwtHelper.decodeToken(token);
		delete sessionStorage.token;
		$window.location='/agent/login';
	};

	//Reset Password
	$scope.resetpassword =function(){
		var token = sessionStorage.token;
		$scope.agent.token = token;
		$http.post('http://localhost:3000/api/agent/resetpassword', $scope.agent)
		.success(function(data){
			if(data.status === "ok"){
				$scope.returnMessage = "success to reset password";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
			}
		})

	}

})


