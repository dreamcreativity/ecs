'use strict';
angular.module('AgentApp')

.controller('CommissionController',function CommissionController($rootScope,$scope,$http,Students,Courses,Payments,Constants,Registrations,Agents,$window){
	loading();

	function loading() {
		var token = sessionStorage.token;
		var registerId = url_params.id;

		Registrations.get({id : registerId}, function(result){
			$scope.registration = result.data;
			var programes = $scope.registration.programRegistration;
			var payments = $scope.registration.payments;
			 $scope.total =0;
			for (var i = 0; i < programes.length; i++) {
				$scope.total = $scope.total + (programes[i].price * programes[i].commissionRate); 
			};

		});
	}

});