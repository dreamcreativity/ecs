'use strict';
angular.module('AgentApp')

.controller('CommissionHistoryController', function CommissionHistoryController($scope, Commissions,AgentTokens){
	var token = sessionStorage.token;
	AgentTokens.post({token:token},function(agentInfo){
		Commissions.getByAgentId({ agentId: agentInfo.data._id},function(result){
			$scope.records = result.data;
		});
	});
})

.controller('StudentHistoryController', function StudentHistoryController($scope, Students,AgentTokens){
	var token = sessionStorage.token;

	AgentTokens.post({token:token},function(agentInfo){
		Students.getStudentsByAgent({id : agentInfo.data._id }, function(result){
			$scope.students = result.data;
			console.log(result);
		});

	});


})