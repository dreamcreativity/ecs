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
	 		if(result.status == 'ok'){
	 			$http.post('/api/agent/register/sendEmail',{agent: $scope.agent, password:$scope.agent.password})
				.success(function(data,status,headers,config){
					ShowGritterCenter('System Notification','Agent has been created');
		 			setInterval(function(){
		 				$window.location='/admin/agent/detail/' + result.data._id;
		 			}, 2000); 
				})
	 		}
	 		else if(result.status == 'exist'){
	 			ShowGritterCenter('System Notification',result.messages);
	 		}
	 		else {
	 			ShowGritterCenter('System Notification','Agent create fail');
	 		}
 		})
	 }

	 $scope.generate = function() {
    	$scope.agent.password = randomPassword(8);
		}

		function randomPassword(length) {
			    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
			    var pass = "";
			    for (var x = 0; x < length; x++) {
			        var i = Math.floor(Math.random() * chars.length);
			        pass += chars.charAt(i);
			    }
			    $("#agent_pwd").get(0).type ='text';
			    return pass;
			}


})



.controller('AgentDetailCtrl',function AgentDetailCtrl($rootScope,$scope,$http,Agents,Students,StudentByAgent,Constants,$window,$document){
	 var agent_id = url_params.id;
	 loading(); 
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 function loading() {
	 		if(agent_id !=null){
	 			Agents.get({id:agent_id}, function(result){
	 				$scope.agent = result.data;
	 				Students.getStudentsByAgent({id : $scope.agent._id}, function(result){
	 					$scope.students = result.data;
	 				});
	 			});

	 			Constants.get({name:"Country"}, function(result){
			 		var regions = result.data;
			 		var list =[]
			 		for(var i=0; i<regions.length; i++){
			 			list.push({"name" : regions[i]});
			 		}
			 		$scope.regionsList = list;
			 	});
	 		}
	 }

	 $scope.update = function(isValid) {
	 	Agents.update($scope.agent, function(result){
	 			if(result.status == 'ok'){
					ShowGritterCenter('System Notification','Agent has been updated');
					setInterval(function(){
  					 $window.location='/admin/agent/detail/' + agent_id;
					}, 2000);
				}else{
					ShowGritterCenter('System Notification','Material document update fail : ' + result.messages.err);
				}
	 	})
	 }

	$scope.resetpwd = function(isValid) {
		$scope.agent.password = $scope.resetpassword;
	 	Agents.update($scope.agent, function(result){
	 			if(result.status == 'ok'){
					ShowGritterCenter('System Notification','Agent passowrd has been updated');
					$http.post('/api/agent/resetpassword/sendEmail',{agent: $scope.agent})
							.success(function(data,status,headers,config){
								setInterval(function(){
									$window.location='/admin/agent/detail/' + $scope.agent._id;
								}, 2000); 
							})
							.error(function(data,status,headers,config){
								console.log("fail to send registration email")
							});
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

	 $scope.generate = function() {
    	$scope.resetpassword = randomPassword(8);
		}

		function randomPassword(length) {
			    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
			    var pass = "";
			    for (var x = 0; x < length; x++) {
			        var i = Math.floor(Math.random() * chars.length);
			        pass += chars.charAt(i);
			    }
			    $("#agent_pwd").get(0).type ='text';
			    return pass;
			}


});



