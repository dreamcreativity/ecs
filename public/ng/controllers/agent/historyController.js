'use strict';
angular.module('AgentApp')

.controller('CommissionHistoryController', function CommissionHistoryController($rootScope, $scope, $http, Students,Constants, Commissions,AgentTokens, $window){
	var token = sessionStorage.token;

	AgentTokens.post({token:token},function(agentInfo){


		console.log(agentInfo);
		console.log('history');

		Commissions.getByAgentId({ agentId: agentInfo.data._id},function(result){

			console.log(result);

			$scope.records = result.data;


		});

	});


});