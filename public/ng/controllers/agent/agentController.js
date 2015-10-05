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
		// $http.post('/api/agent/resetpassword', $scope.resetObj)
		// .success(function(data){
		// 	if(data.status === "ok"){
		// 		$scope.returnMessage = "success to reset password";
	 // 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 // 		    setInterval(function(){
  // 					 $window.location='/agent/login';
		// 		}, 2000);
		// 	}
		// })
	}	
})

.controller('Dashboard', function ($scope, Students){

});








