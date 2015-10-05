'use strict';
angular.module('AgentApp')

.controller('MaterialsController', function ($scope, $http, Agents,Students, Meterials, AgentTokens, $window){

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

				}
				else {
					console.log("error");
				}
			});

		// $http.post('/api/agent/token',{token:token})
		// 	.success(function(data,status,headers,config){
		// 		if(data.status == "successed"){
		// 			var agent_id = data.data._id;
		// 			Meterials.getMaterialByAgentId({id:agent_id},function(result){
		// 				if(result.status ="ok"){
		// 					$scope.materials = result.data;
		// 				}	
		// 			});
		// 			Students.getStudentsByAgent({id:agent_id}, function(result){
		// 				if(result.status ="ok"){
		// 					$scope.students = result.data;
		// 				}
		// 			});

		// 		}
		// 		else {
		// 			console.log("error");
		// 		}
		// 	})
		// 	.error(function(data,status){
		// 	});

})

.controller('MaterialDetail',function ($scope,Meterials,$window){
	var id = url_params.id;

	$scope.material = Meterials.get(url_params, function(){
		$scope.material = $scope.material.data;	
	});
});