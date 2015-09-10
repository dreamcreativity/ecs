'use strict';
angular.module('AgentApp')

.controller('AgentDetail', function AgentDetail($scope, $http, Agents,$window){
	loading();
	var agent_id = url.params.id;

	function loading() {
		if(agent_id) {
			Agents.get({id:agent_id}, function(result){
				$scope.agent = result.data;
			});
		}
	}

	$scope.update = function(isValid) {
		Agents.update($scope.agent, function(result){
			if(result.status == 'ok'){
					ShowGritterCenter('System Notification','Material document has been updated');
				}else{
					ShowGritterCenter('System Notification','Material document update fail : ' + result.messages.err);
				}
			});
	}

	
})
