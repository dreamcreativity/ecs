'use strict';
angular.module('AgentApp')

.controller('HistoryController', function HistoryController($rootScope, $scope, $http, Students,Constants, AgentTokens, $window){
	// loading();

	// function loading() {
	// 	var token = sessionStorage.token;
	// 	AgentTokens.post({token:token}, function(result){
	// 		$scope.currentAgent = result.data;

	// 		Students.getStudentsByAgent({_id : $scope.currentAgent._id}, function(err, result){
	// 		if(result.status == 'ok'){
	// 			$scope.students = result.data;
	// 		}
	// 		});

	// 		Students.getRegistrationsByAgent({_id : $scope.currentAgent._id}, function(err,result){
	// 			if(result.status == 'ok'){
	// 				$scope.registers = result.data;
	// 			}
	// 		})
			
	// 	});


	// }



});