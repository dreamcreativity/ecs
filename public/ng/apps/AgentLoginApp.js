'use strict';

angular.module('AgentLoginApp', ['ngRoute','esc.auth'])

.controller('LoginController',function LoginController($scope,$http,$window,$location){
	//Define login function 
	$scope.login = function() {
		$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');


		$http.post('/api/agent/login',$scope.agent)
		.success(function(data,status,headers,config){
			if(data.status === "resetpassword") {
				sessionStorage.token = data.token;
				$window.location = '/agent/setNewpassword';
			}

			else if(data.status === "ok"){
				sessionStorage.token = data.data.token;
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
		$http.post('/api/agent/resetpassword', $scope.agent)
		.success(function(data){
			if(data.status === "ok"){
				$scope.returnMessage = "success to reset password";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 		    setInterval(function(){
  					 $window.location='/agent/login';
				}, 2000);
			}
		})
	}

})

.directive('passwordVerify', function(){
	return {
		require : "ngModel",
		scope : {
			passwordVerify: '='
		},
		link: function(scope,element,attrs,ctrl){
			scope.$watch(function(){
				var combined;
				if(scope.passwordVerify || ctrl.$viewValue) {   //$viewValue is the value of element in controller
					combined = scope.passwordVerify + "_" + ctrl.$viewValue;
				}
				return combined;
			},function(value){

				if (value) {
				/**
			     * This function is added to the list of the $parsers.
			     * It will be executed the DOM (the view value) change.
			     * Array.unshift() put it in the beginning of the list, so
			     * it will be executed before all the other
			     */
			     ctrl.$parsers.unshift(function(viewValue) {
			     	var origin = scope.passwordVerify;
			     	if (origin !== viewValue) {
			     		ctrl.$setValidity("passwordVerify", false);
			     		return undefined;
			     	} else {
			     		ctrl.$setValidity("passwordVerify", true);
			     		return viewValue;
			     	}
			     });
			 }
			});
		}
	}
});





















