'use strict'

var app = angular.module('controllers.staff',[]);
	

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
				sessionStorage.setItem('oid',data.OID);
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
		delete sessionStorage.oid;
		$location.path('/login');
	};
});


app.controller('DashboardController',function StaffController($rootScope,$scope,$http,$window,Staffs){
	if($rootScope.show_partial_view == false){
     	$window.location.reload()
		 }
    var oid = sessionStorage.oid;
    Staffs.get({id:oid}, function(result){
    	$scope.user = result.data
    })
});

app.controller('StaffController',function StaffController($rootScope,$scope,$routeParams,$http,Staffs,$location){
	 var token = sessionStorage.token;
	 $scope.staffs = getAllStaffs();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 if($routeParams.id !='undefined'){
	 	Staffs.get({id:$routeParams.id}, function(result){
	 		$scope.staff = result.data;
	 	});
	 	
	 }

	 $scope.create = function(isValid){
	 	Staffs.save($scope.newstaff,function(result){
	 		    var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$location.path('/staffs');
 		})
	 }

	 $scope.update = function(isValid) {
	 	Staffs.update($scope.staff, function(result){
	 		var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$location.path('/staffs');
	 	})
	 }

 	function getAllStaffs(){
 		return Staffs.query();
 	}


 	function getStaff(){

 	}
})



