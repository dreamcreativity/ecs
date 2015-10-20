'use strict';
angular.module('AdminApp')

.controller('PaymentController',function PaymentController($rootScope,$scope,$http,Students,Courses,Constants,Registrations,Agents,$window){
	loading();

	function loading() {
		var registerId = url_params.id;

		Registrations.get({id : registerId}, function(result){
			$scope.registration = result.data;
		});
	}
});