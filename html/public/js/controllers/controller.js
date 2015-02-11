'use strict'

angular
	.module('controllers.staff',[])
	.controller('StaffController',StaffController);

 StaffController.$inject = ['$scope','$http','Staffs'];

function StaffController($scope,$http,Staffs){

	//Declarate all functions under staff controllers 
	$scope.staffs = Staffs.query();
	$scope.login = login;


	//Define login function 
	function login() {
		$http.post('http://localhost:3000/api/staffs/login',$scope.staff)
		.success(function(data,status,headers,config){
			if(data.status === 'success'){
				console.log('login success');
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
		
	}

	//Define 
	function getStaff(){

	}


}

//--------------OR-----------------------
/* var ctrl = angular.module('controllers.staff',[]);

 ctrl.controller('StaffController',['$scope','Staffs', function($scope,Staffs){
	$scope.staffs = Staffs.query();
 }]);
 */