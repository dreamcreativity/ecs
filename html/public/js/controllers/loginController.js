'use strict'

angular
	.module('controllers',[])
	.controller('LoginController',LoginController);

 LoginController.$inject = ['$scope','$http','$location'];

function LoginController($scope,$http,$location){
	//Declarate all functions under staff controllers 
	$scope.login = login;
	$scope.logout = logout;

	//Define login function 
	function login() {
		$http.post('http://localhost:3000/api/staffs/login',$scope.staff)
		.success(function(data,status,headers,config){
			if(data.status === "ok"){
				sessionStorage.setItem('token',data.data);
				$location.path('/dashboard');
			}
			else {
				console.log('login fail');
			}
		})
		.error(function(data,status,headers,config){
			console.log('error : ' + data );
		});
	}

	//Log out 
	function logout(){
		var token = sessionStorage.token;
 	var tokenPayload = jwtHelper.decodeToken(token);
		delete sessionStorage.token;
		$location.path('/login');
	}


}
