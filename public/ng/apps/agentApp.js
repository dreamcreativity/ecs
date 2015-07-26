'use strict';

angular.module('agentApp', ['ngRoute','ngResource','ngBootbox'])


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
	 			//var message = result.messages;	    
	 		    //$scope.returnMessage = "profile is save successfully";
	 		    //$("#messageReturn").delay(2000).fadeOut('slow');
	 			// $window.location='/admin/agent/detail/'+ agent_id;
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


})

.factory('Agents',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/agent/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])

.factory('Students',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/student/agent/:agent_id', {}, {
		query:{ method: 'GET'},
	});
}])

.factory('StudentByAgent',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/student/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])


.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
	    config.headers = config.headers || {};
		if ($window.sessionStorage.token) {
			config.headers.api_token = sessionStorage.token ;
	    	console.log($window.sessionStorage.token );
		}
		return config;
    },
    responseError: function (response) {
      console.log(response.status);
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      if (response.status === 403) {
        //console.log('please log in ');
        window.location = '/admin/login';
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});






