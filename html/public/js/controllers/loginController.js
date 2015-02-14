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


app.controller('StaffController',function StaffController($rootScope,$http,$window,jwtHelper,Staffs){
	if($rootScope.show_partial_view == false){
     	$window.location.reload()
		 }

	 var token = sessionStorage.token;
 //     //var tokenPayload = jwtHelper.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.eoaDVGTClRdfxUZXiPs3f8FmJDkDE_VCQFXqKxpLsts');
 //     $http.post('http://localhost:3000/api/staffs/decode/',token)
 //     .success(function(data,status,headers,config){
	// 		if(data.status === "ok"){
	// 			console.log('success');
	// 		}
	// 		else {
	// 			console.log('fail');
	// 		}
	// 	})
	// .error(function(data,status,headers,config){
	// 	console.log('error : ' + data );
	// });

 // 	$scope.staff = Staffs.get({id:'54d03229b35b9b2602829de3'});
 // 	$scope.staffs = getAllStaffs();

 	function getAllStaffs(){
 		return Staffs.query();
 	}

 	function getStaff(){

 	}
})



