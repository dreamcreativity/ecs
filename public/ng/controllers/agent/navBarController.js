'use strict';

angular.module('AgentApp')

.controller('NavBarController',  function NavBarController($scope,$http,$window,$location,Agents,AgentTokens){
	getAgentInfo();

	$scope.logout = function(){
		sessionStorage.removeItem('token');
		location = '/agent/login'
	}

	function getAgentInfo(){
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
});

