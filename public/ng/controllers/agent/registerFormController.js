'use strict';
angular.module('AgentApp')

.controller('StudentRegister', function StudentRegister($rootScope, $scope, $http, Registrations, $window){
	loading();

	$scope.register = function(isValid){
		Registrations.save($scope.student, function(result){
			var message = result.messages;	  
		});
	}

	function loading() {
		Registrations.query(function(result){
			$scope.registrations = result;
		});
	}
});
