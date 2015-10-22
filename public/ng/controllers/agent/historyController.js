'use strict';
angular.module('AgentApp')

.controller('CommissionHistoryController', function CommissionHistoryController($rootScope, $scope, $http, Students,Constants, AgentTokens, $window){
	var token = sessionStorage.token;

	AgentTokens.post({token:token},function(result){


		
		console.log('history');

	});


});