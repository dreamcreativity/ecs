'use strict';
angular.module('AgentApp')

.controller('DashboardController', function ($scope, $http, Agents, Students, Meterials, AgentTokens, $window){
	var token = sessionStorage.token;

	AgentTokens.post({token:token},function(result){
			if(result.status == "successed"){
					var agent_id = result.data._id;
					Meterials.getMaterialByAgentId({id:agent_id},function(result){
						if(result.status ="ok"){
							$scope.materials = result.data;
						}	
					});
					Students.getStudentsByAgent({id:agent_id}, function(result){
						if(result.status ="ok"){
							$scope.students = result.data;
						}
					});

					Students.getRegistrationsByAgent({id:agent_id}, function(result){
						if(result.status ="ok"){
							$scope.registrations = result.data;
						}
					});


				}
				else {
					console.log("error");
				}
			});


});