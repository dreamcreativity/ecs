'use strict'

var app = angular.module('controllers.staff',['angular-jwt']);
	

app.controller('LoginController',function LoginController($rootScope,$scope,$http,$window,$location){
	if($rootScope.show_partial_view == true){
     	$window.location.reload()
		 }
	//Define login function 
	$scope.login = function() {
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
	};

	//Log out 
	$scope.logout = function(){
		var token = sessionStorage.token;
 		var tokenPayload = jwtHelper.decodeToken(token);
		delete sessionStorage.token;
		$location.path('/login');
	};
});


app.controller('DashboardController',function StaffController($rootScope,$http,$window,jwtHelper,Staffs){
	if($rootScope.show_partial_view == false){
     	$window.location.reload()
		 }
});

app.controller('StaffController',function StaffController($scope,$http,jwtHelper,Staffs){
	 var token = sessionStorage.token;
	 $scope.staffs = getAllStaffs();
	 $scope.create = function(){
	 	Staffs.save($scope.staff,function(){
 			console.log('save success!');
 		})
	 }

 	function getAllStaffs(){
 		return Staffs.query();
 	}


 	function getStaff(){

 	}
})



