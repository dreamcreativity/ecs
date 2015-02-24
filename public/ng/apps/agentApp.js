'use strict';

angular.module('agentApp', ['ngRoute','ngResource'])


.controller('AgentCtrl',function AgentCtrl($rootScope,$scope,$http,Agents,$window){
	 var agent_id = url_params.id;

	 if(agent_id !=null){
	 	Agents.get({id:agent_id}, function(result){
	 		$scope.agent = result.data;
	 	});
	 	
	 }
	 // $scope.create = function(isValid){
	 // 	Agents.save($scope.student,function(result){
	 // 		    var message = result.messages;	    
	 // 		    $rootScope.returnMessage = message;
	 // 			$window.location='/admin/student/all';
 	// 	})
	 // }


})

.factory('Agents',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/agent/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}]);