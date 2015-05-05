'use strict';
angular.module('AdminApp')

.controller('AgentCtrl',function AgentCtrl($rootScope,$scope,$http,Agents,$window){
	 $scope.agents = getAllAgents();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

 	function getAllAgents(){
 		return Agents.query();
 	}

 	$scope.create = function(isValid){
	 	Agents.save($scope.agent,function(result){
	 		    var message = result.messages;	    
	 		     $scope.returnMessage = "successfully";
	 			setInterval(function(){
  					 $window.location='/admin/agent/all';
				}, 2000); 
 		})
	 }

})



.controller('AgentDetailCtrl',function AgentDetailCtrl($rootScope,$scope,$http,Agents,Students,StudentByAgent,$window,$document){
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;
	 var agent_id = url_params.id;

	 if(agent_id !=null){
	 	Agents.get({id:agent_id}, function(result){
	 		$scope.agent = result.data;

	 		Students.get({agent_id : $scope.agent._id}, function(result){
	 			$scope.students = result.data;
	 		});
	 	});
	 	
	 }

	 $scope.update = function(isValid) {
	 	$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	Agents.update($scope.agent, function(result){
	 			var message = result.messages;	    
	 		    $scope.returnMessage = "profile is save successfully";
	 		    $("#messageReturn").delay(2000).fadeOut('slow');
	 			// $window.location='/admin/agent/detail/'+ agent_id;
	 	})
	 }

	 $scope.createStudent = function(isValid){
	 	$scope.student.agent_id = agent_id;
	 	StudentByAgent.save($scope.student,function(result){
	 		    var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/agent/detail/'+ agent_id;
 		})
	 }


});



