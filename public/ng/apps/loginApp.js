'use strict';

angular.module('loginApp', ['ngRoute'])


.controller('LoginController',function LoginController($scope,$http,$window,$location){
	//Define login function 
	$scope.login = function() {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');


		$http.post('http://localhost:3000/api/staffs/login',$scope.staff)
		.success(function(data,status,headers,config){
			if(data.status === "ok"){
				console.log(data.data);

				//$cookies.put('token', data.data.token);
				//sessionStorage.setItem('token',data.data.token);
				sessionStorage.token = data.data.token;
				console.log(sessionStorage.token);


				$window.location='/admin';
			}
			else {
				 $scope.returnMessage = "username or password is incorrect";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
			}
		})
		.error(function(data,status,headers,config){
			$window.location='/admin/login';
		});
	};

	//Log out 
	$scope.logout = function(){
		var token = sessionStorage.token;
 		var tokenPayload = jwtHelper.decodeToken(token);
		delete sessionStorage.token;
		$window.location='/admin/login';
	};
})




.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        config.headers.token = $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      if (response.status === 403) {
        console.log('please log in ');
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

