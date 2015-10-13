'use strict';
angular.module('AgentApp')

.controller('AgentDetail', function AgentDetail($scope, $http, Agents,AgentTokens,$window){
	loading();

	function loading() {
		var token = sessionStorage.token;

		AgentTokens.post({token:token},function(data){
				if(data.status == "successed"){
					$scope.agent = data.data;
				}
				else {
					console.log("error");
				}
			});
	}

	$scope.update = function(isValid) {
		Agents.update($scope.agent, function(result){
			if(result.status == 'ok'){
					ShowGritterCenter('System Notification','Material document has been updated');
			 		    setInterval(function(){
		  					 $window.location='/agent/profile';
						}, 2000);
				}else{
					ShowGritterCenter('System Notification','Material document update fail : ' + result.messages.err);
				}
			});
	}

	//Reset Password
	$scope.resetpassword =function(ctrl){
		var val = $("#oldpassword").val();
		var token = sessionStorage.token;
		$scope.resetObj.token = token;
		$http.post('/api/agent/resetpasswordInProfile', $scope.resetObj)
		.success(function(data){
			if(data.status === "ok"){
				$scope.returnMessage = "success to reset password";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 		    setInterval(function(){
  					 $window.location='/agent/login';
				}, 2000);
			}
			else {
				$scope.returnMessage = 'old password is incorrect';
				$("#messageReturn").delay(2000).fadeOut('slow');
			}
		})
	}	
})

.controller('Dashboard', function ($scope, Students){

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








