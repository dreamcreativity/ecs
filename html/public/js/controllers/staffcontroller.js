'use strict'

angular
	.module('controllers.staff',[])
	.controller('StaffController',StaffController);

 StaffController.$inject = ['$scope','$http','$location','Staffs'];

function StaffController($scope,$http,$location,Staffs){
	//Declarate all functions under staff controllers 
	$scope.staffs = Staffs.query();
	$scope.login = login;
	$scope.logout = logout;



	//Define login function 
	function login() {
		$http.post('http://localhost:3000/api/staffs/login',$scope.staff)
		.success(function(data,status,headers,config){
			if(data.status === "ok"){
				sessionStorage.setItem('token',data.data);
				$scope.staffInstance = Staffs.get({_id:"54d03229b35b9b2602829de3"});
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
		delete sessionStorage.token;
		$location.path('/login');
	}

	//Define 
	function getStaff(id){
		return Staffs.get({_id:id});
	}


}
