'use strict';
angular.module('AdminApp')

.controller('AgentCtrl',function AgentCtrl($rootScope,$scope,$http,Regions,Agents,$window){
	 loading();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

 	function getAllAgents(){
 		return Agents.query();
 	}

 	function loading() {
 		var list =[];
 		Regions.query(function(regions){
 			for(var i=0; i<regions.data.length; i++){
	 			list.push({"text" : regions.data[i].name});
	 		}
	 		Agents.query(function(result){
	 			$scope.agents = result;
	 			$scope.region_tags = regions.data;
	 		});
 		});
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



.controller('AgentDetailCtrl',function AgentDetailCtrl($rootScope,$scope,$http,Agents,Students,StudentByAgent,Regions,$window,$document){
	 loading(); 
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;
	 var agent_id = url_params.id;

	 function loading() {
	 	var list = [];
	 	Regions.query(function(regions){
	 		for(var i=0; i<regions.data.length; i++){
	 			list.push({"text" : regions.data[i].name});
	 		}
	 		if(agent_id !=null){
	 			Agents.get({id:agent_id}, function(result){
	 				$scope.agent = result.data;
	 				$scope.region_tags = regions.data;
	 				Students.get({agent_id : $scope.agent._id}, function(result){
	 					$scope.students = result.data;
	 				});
	 			});
	 		}
	 	});
	 }

	 $scope.update = function(isValid) {
	 	$scope.returnMessage="";
	 	$("#messageReturn").fadeIn('slow');
	 	Agents.update($scope.agent, function(result){
	 			if(result.status == 'ok'){
					ShowGritterCenter('System Notification','Material document has been updated');
				}else{
					ShowGritterCenter('System Notification','Material document update fail : ' + result.messages.err);
				}
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



